import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../State/store';
import TEST_CAT_IMAGES from './catImage';
import TEST_FAVOURITES from './favourite';

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    catImageReducer: {
      catImages: TEST_CAT_IMAGES,
      loading: false,
    },
    favouritesReducer: {
      favourites: TEST_FAVOURITES,
      loading: false,
    },
  },
});

export default store;
