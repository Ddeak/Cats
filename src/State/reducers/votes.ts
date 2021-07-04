import { createReducer } from '@reduxjs/toolkit';
import { Vote } from '../../Types/vote';
import {
  setVotes,
  setLoading,
  setError,
  voteByImageId,
} from '../actions/votes';

type StateType = {
  votes: Vote[];
  loading: boolean;
  error?: string;
};

const initialState: StateType = {
  votes: [],
  loading: false,
};

const catImageReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setVotes, (_, action) => ({
      votes: action.payload,
      loading: false,
    }))
    .addCase(setLoading, (state, action) => ({
      ...state,
      loading: action.payload,
    }))
    .addCase(setError, (state, action) => ({
      ...state,
      error: action.payload,
    }))
    .addCase(voteByImageId.fulfilled, (state, action) => {
      const [vote, error] = action.payload;

      if (error || !vote)
        return {
          ...state,
          error: error?.message || 'Something went wrong while voting!',
        };

      const alreadyInArray = state.votes.find((v) => v.id === vote?.id);
      if (!alreadyInArray && vote)
        return {
          votes: [...state.votes, vote],
          loading: false,
        };
    })
    .addCase(voteByImageId.pending, (state, _) => ({
      ...state,
      loading: true,
    }))
);

export default catImageReducer;
