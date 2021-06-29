import { CatImage, CatImageAPIError } from '../Types/catImage';

const CAT_API = 'https://api.thecatapi.com/v1';
const TOKEN = '423611ae-32ca-4975-8f74-5af272244b62';

const getHeader = (): Headers => {
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
