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

export interface CatImageAPIError extends Error {
  level: string;
  message: string;
  status: number;
}

export type CatImageUploadBody = {
  file: File;
  sub_id?: string;
};

export type CatImageAPIInteractionBody = {
  image_id: string;
};

export type CatImageAPIInteractionResponse = {
  message: string;
  id: number;
};
