declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (config: {
          portalId: string
          formId: string
          region?: string
          target?: string
          [key: string]: any
        }) => void
        onFormReady: () => void
        onFormSubmit: () => void
      }
    }
    fbq: (track: string, event: string, params?: any) => void
  }
}

export {}
