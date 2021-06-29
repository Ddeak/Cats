export interface CatImage {
  id: string;
  url: string;
  sub_id: string;
  created_at: string;
  original_filename: string;

  categories: {
    id: number;
    name: string;
  };
}

export type CatImageAPIError = {
  level: string;
  message: string;
  status: number;
};
