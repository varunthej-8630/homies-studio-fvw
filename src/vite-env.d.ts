/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID: string
  readonly VITE_EMAILJS_TEMPLATE_ID: string
  readonly VITE_EMAILJS_PUBLIC_KEY: string
  readonly VITE_CONTACT_EMAIL: string
  readonly VITE_WHATSAPP_NUMBER: string
  readonly VITE_RECRUITMENT_TARGET_EMAIL: string
  readonly VITE_TAWKTO_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
