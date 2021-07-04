import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CatImageAPIError } from '../../Types/catImage';
import { Vote, VoteValue } from '../../Types/vote';
import { deleteVote, getVote, voteImage } from '../../Services/CatAPIService';

export const setVotes = createAction<Vote[]>('setVotes');
export const setLoading = createAction<boolean>('setVoteLoading');
export const setError = createAction<string>('setVoteError');

export const voteByImageId = createAsyncThunk(
  'voteByImageId',
  async ({
    vote,
    image_id,
    newValue,
  }: {
    vote?: Vote;
    newValue: VoteValue;
    image_id: string;
  }): Promise<[Vote | null, CatImageAPIError | null]> => {
    if (vote?.value === 0 || vote?.value === 1) await deleteVote(vote.id);
    const [data, error] = await voteImage(newValue, image_id);

    if (error || !data) return [null, error];

    return await getVote(data.id);
  }
);
