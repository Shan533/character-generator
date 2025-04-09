declare module 'morgan' {
  import { Handler } from 'express';
  
  function morgan(format: string, options?: morgan.Options): Handler;
  
  namespace morgan {
    interface Options {
      stream?: { write: (str: string) => void };
      skip?: (req: any, res: any) => boolean;
    }
  }
  
  export = morgan;
} 