/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_NEW_UX?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
