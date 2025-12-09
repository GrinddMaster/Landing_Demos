/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPACE_ID: string;
  readonly VITE_SDK_KEY: string;
  readonly VITE_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}