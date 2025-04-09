import React, { useState } from 'react';

interface GeneratedImage {
  _id: string;
  imageUrl: string;
}

interface RefineImageModalProps {
  image: GeneratedImage;
  initialPrompt: string;
  onClose: () => void;
  onSubmit: (refinedPrompt: string) => void;
}

const RefineImageModal: React.FC<RefineImageModalProps> = ({
  image,
  initialPrompt,
  onClose,
  onSubmit,
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit(prompt);
  };
  
  return (
    <div className="fixed inset-0 overflow-y-auto z-50">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div 
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium" id="modal-headline">
                  Refine Image Prompt
                </h3>
                
                <div className="mt-4">
                  <img 
                    src={image.imageUrl} 
                    alt="Image to refine" 
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="refined-prompt" className="block text-sm font-medium text-gray-700 mb-1">
                      Edit the prompt to refine your image
                    </label>
                    <textarea
                      id="refined-prompt"
                      rows={4}
                      className="form-input"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      required
                    />
                    
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        {isSubmitting ? 'Generating...' : 'Generate New Version'}
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefineImageModal; 