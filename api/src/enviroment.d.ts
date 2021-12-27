declare global {
    namespace NodeJS {
      interface ProcessEnv {
        MONGO_URL: string;
        SECRET_KEY: string
        PORT: string;
      }
    }
  }

  export {}