import { CatImage } from '../Types/catImage';

const TEST_CAT_IMAGES: CatImage[] = [
  {
    id: '0',
    sub_id: '0',
    url: 'testUrl',
    original_filename: 'testName',
    created_at: '2021-01-01T00:00:00Z',

    categories: {
      id: 0,
      name: 'testCategory',
    },
  },
  {
    id: '1',
    sub_id: '1',
    url: 'testUrl2',
    original_filename: 'testName2',
    created_at: '2021-01-02T00:00:00Z',

    categories: {
      id: 1,
      name: 'testCategory2',
    },
  },
];

export default TEST_CAT_IMAGES;
