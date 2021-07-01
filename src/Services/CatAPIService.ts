import { CAT_API, TOKEN } from '../app-config';
import {
  CatImage,
  CatImageAPIError,
  CatImageUploadBody,
} from '../Types/catImage';

const getHeader = (): Headers => {
  if (!TOKEN) throw new Error('CAT_API_TOKEN is not set.');

  const headers = new Headers();
  headers.append('x-api-key', TOKEN);
  return headers;
};

const http = async <T>(
  path: string,
  args: RequestInit
): Promise<[T | null, CatImageAPIError | null]> => {
  try {
    const response = await fetch(new Request(path, args));
    const data = await response.json();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export const getCatImages = async (): Promise<
  [CatImage[] | null, CatImageAPIError | null]
> => {
  return await http<CatImage[]>(`${CAT_API}/images/`, {
    method: 'get',
    headers: getHeader(),
  });
};

export const uploadCatImage = async (
  data: CatImageUploadBody
): Promise<[CatImage[] | null, CatImageAPIError | null]> => {
  const body = new FormData();
  body.append('file', data.file);
  body.append('sub_id', data.sub_id);

  return await http<CatImage[]>(`${CAT_API}/images/upload`, {
    method: 'post',
    headers: getHeader(),
    body,
  });
};
