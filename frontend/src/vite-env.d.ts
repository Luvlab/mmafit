/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_MODE?: string
  readonly VITE_API_URL?: string
  readonly VITE_SA_PASS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
