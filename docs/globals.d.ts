declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      REPO_ROOT: string;
      DATA_DIR: string;
      DEFAULT_BRANCH: string;
    }
  }
}
