import { createSelector } from '@reduxjs/toolkit';
import { Vote } from '../../Types/vote';
import { RootState } from '../store';

export const catImagesSelector = (state: RootState) => state.catImageReducer;
export const favouritesSelector = (state: RootState) =>
  state.favouritesReducer.favourites;
export const votesSelector = (state: RootState) => state.votesReducer.votes;

export const isCatImageFavourited = (image_id: string) =>
  createSelector(favouritesSelector, (favourites) => {
    const favourite = favourites.find((fav) => fav.image_id === image_id);
    return favourite?.id;
  });

export const getVoteForImage = (image_id: string) =>
  createSelector(votesSelector, (votes): [Vote, number] => {
    // TODO: DevNote - This should be refactored when the delete-vote API
    // correctly deletes votes. Currently the API returns all votes for
    // an image. To work correctly, we get the most recent.
    const filtered = votes.filter((vote) => vote.image_id === image_id);
    const score = filtered.reduce(
      (acc, currentVote) => (currentVote.value ? (acc += 1) : (acc -= 1)),
      0
    );
    return [filtered[filtered.length - 1], score];
  });

export const getInteractionLoading = (state: RootState): boolean => {
  return state.votesReducer.loading || state.favouritesReducer.loading;
};
