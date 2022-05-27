export type Application = {
  name: string;
  url: string;
  image?: string;
  endpoint?: string;
  type?: string;
  apiKey?: string;
  subtitle?: string;
  endpoints?: string[];
  customLinks?: CustomLink[];
};

type CustomLink = {
  name: string;
  path: string;
  icon?: string;
};
