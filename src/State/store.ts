import { combineReducers, configureStore } from '@reduxjs/toolkit';
import catImageReducer from './reducers/catImage';
import favouritesReducer from './reducers/favourites';
import votesReducer from './reducers/votes';

export const rootReducer = combineReducers({
  catImageReducer,
  favouritesReducer,
  votesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
