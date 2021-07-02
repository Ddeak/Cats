import { CAT_API, CAT_API_SUB_ID, TOKEN } from '../app-config';
import {
  CatImage,
  CatImageAPIError,
  CatImageAPIInteractionResponse,
  CatImageUploadBody,
} from '../Types/catImage';

const getHeader = (): Headers => {
  if (!TOKEN) throw new Error('CAT_API_TOKEN is not set.');

  const headers = new Headers();
  headers.append('x-api-key', TOKEN);
  headers.append('Content-Type', 'application/json');
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

export const favouriteImage = async (
  image_id: string
): Promise<
  [CatImageAPIInteractionResponse | null, CatImageAPIError | null]
> => {
  return await http<CatImageAPIInteractionResponse>(`${CAT_API}/favourites`, {
    method: 'post',
    headers: getHeader(),
    body: JSON.stringify({ image_id, sub_id: CAT_API_SUB_ID }),
  });
};

export const unfavouriteImage = async (
  favourite_id: number
): Promise<
  [CatImageAPIInteractionResponse | null, CatImageAPIError | null]
> => {
  return await http<CatImageAPIInteractionResponse>(
    `${CAT_API}/favourites/${favourite_id}`,
    {
      method: 'delete',
      headers: getHeader(),
    }
  );
};

export const voteImage = async (
  vote: 0 | 1,
  image_id: string
): Promise<
  [CatImageAPIInteractionResponse | null, CatImageAPIError | null]
> => {
  return await http<CatImageAPIInteractionResponse>(`${CAT_API}/votes`, {
    method: 'post',
    headers: getHeader(),
    body: JSON.stringify({ image_id, sub_id: CAT_API_SUB_ID, value: vote }),
  });
};
