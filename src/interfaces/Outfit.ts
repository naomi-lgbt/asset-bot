export interface Outfit {
  name: string;
  fileName: string;
  description: string;
  alt: string;
  credits: {
    [key: string]: string;
  };
}
