export {}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    handleCredentialResponse: (response: any) => void;
  }
}
