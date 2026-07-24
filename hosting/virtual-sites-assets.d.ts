declare module 'virtual:sites-assets' {
  export const snapshot: unknown
  export const assets: Record<
    string,
    {
      body: string
      contentType: string
    }
  >
}
