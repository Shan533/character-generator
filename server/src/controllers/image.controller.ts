import { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import GeneratedImage from '../models/image.model';
import Character from '../models/character.model';

// Ensure environment variables are loaded
dotenv.config();

// For fallback if API key is not provided or API call fails
const PLACEHOLDER_IMAGES = [
  'https://placehold.co/512x512?text=Character+1',
  'https://placehold.co/512x512?text=Character+2',
  'https://placehold.co/512x512?text=Character+3'
];

// Generate images using OpenAI API
const generateImagesWithOpenAI = async (prompt: string, count = 1): Promise<string[]> => {
  // Access API key directly from process.env each time
  const apiKey = process.env.OPENAI_API_KEY;
  console.log('正在检查 OpenAI API 密钥...:', apiKey ? '密钥存在' : '密钥不存在');
  
  if (!apiKey) {
    console.warn('OpenAI API密钥未提供。使用占位图像。');
    return PLACEHOLDER_IMAGES.slice(0, count);
  }

  try {
    console.log(`正在使用DALL-E生成${count}张图像，提示: "${prompt.substring(0, 50)}..."`);
    
    // 初始化 OpenAI 客户端
    const openai = new OpenAI({
      apiKey: apiKey,
    });
    
    // DALL-E 3 only supports 1 image per request, so we need to make multiple requests
    const imagePromises = Array(count).fill(0).map(async (_, i) => {
      try {
        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1024",
          quality: "standard",
          response_format: "url",
        });
        
        console.log(`图像 ${i+1}/${count} 生成成功`);
        // Ensure we return a string
        const imageUrl = response.data[0].url;
        if (!imageUrl) {
          throw new Error('没有返回图像URL');
        }
        return imageUrl;
      } catch (err: any) {
        console.error(`生成图像 ${i+1}/${count} 时出错:`, err.message);
        return PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length];
      }
    });
    
    // Explicitly cast to string array
    const images = await Promise.all(imagePromises) as string[];
    console.log(`成功获取${images.length}张图像URL`);
    return images;
  } catch (error: any) {
    console.error('使用OpenAI生成图像时出错:', error.message);
    if (error.response) {
      console.error('API响应状态:', error.response.status);
      console.error('API响应数据:', error.response.data);
    }
    // Fallback to placeholder images if API call fails
    console.warn('使用占位图像作为备选');
    return PLACEHOLDER_IMAGES.slice(0, count);
  }
};

// Generate images for a character
export const generateImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { characterId } = req.params;
    const { count = 1 } = req.body;
    
    console.log(`收到为角色 ${characterId} 生成 ${count} 张图像的请求`);
    
    // Find the character
    const character = await Character.findById(characterId);
    if (!character) {
      console.log(`未找到ID为 ${characterId} 的角色`);
      res.status(404).json({ message: 'Character not found' });
      return;
    }

    console.log(`找到角色: ${character.name}`);
    console.log(`使用提示: "${character.prompt.substring(0, 50)}..."`);

    // Generate images using OpenAI
    const imageUrls = await generateImagesWithOpenAI(character.prompt, count);
    
    // Save the generated images to the database
    const savedImages = await Promise.all(
      imageUrls.map(async (imageUrl, index) => {
        const image = new GeneratedImage({
          characterId,
          imageUrl,
          version: 1,
          refinedPrompt: character.prompt
        });
        return image.save();
      })
    );
    
    console.log(`成功保存 ${savedImages.length} 张图像到数据库`);
    res.status(201).json(savedImages);
  } catch (error) {
    console.error('生成图像时出错:', error);
    res.status(500).json({ message: 'Error generating images', error });
  }
};

// Get all images for a character
export const getImagesByCharacterId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { characterId } = req.params;
    const images = await GeneratedImage.find({ characterId }).sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error });
  }
};

// Toggle favorite status of an image
export const toggleFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const image = await GeneratedImage.findById(id);
    
    if (!image) {
      res.status(404).json({ message: 'Image not found' });
      return;
    }
    
    image.isFavorite = !image.isFavorite;
    const updatedImage = await image.save();
    
    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling favorite status', error });
  }
};

// Refine an image with a new prompt
export const refineImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { refinedPrompt } = req.body;
    
    // Find the original image
    const originalImage = await GeneratedImage.findById(id);
    if (!originalImage) {
      res.status(404).json({ message: 'Image not found' });
      return;
    }
    
    // Generate a new image with the refined prompt
    const imageUrls = await generateImagesWithOpenAI(refinedPrompt, 1);
    
    // Create a new image record with the refined prompt
    const refinedImage = new GeneratedImage({
      characterId: originalImage.characterId,
      imageUrl: imageUrls[0],
      version: originalImage.version + 1,
      refinedPrompt
    });
    
    const savedImage = await refinedImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: 'Error refining image', error });
  }
}; 