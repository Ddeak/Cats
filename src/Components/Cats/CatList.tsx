import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Routes from '../../Layout/Routes';

import {
  favouriteByImageId,
  removeFavourite,
} from '../../State/actions/favourites';
import { voteByImageId } from '../../State/actions/votes';
import {
  catImagesSelector,
  getInteractionLoading,
} from '../../State/selectors';
import { Vote, VoteValue } from '../../Types/vote';
import CatListView from './CatListView';

const CatList: React.FC = () => {
  const { catImages, error, loading } = useSelector(catImagesSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  const interactionLoading = useSelector(getInteractionLoading);

  const onNewImage = () => history.push(Routes.Upload);

  const onFavouriteImage = async (image_id: string, favourite_id?: number) => {
    dispatch(
      favourite_id
        ? removeFavourite(favourite_id)
        : favouriteByImageId(image_id)
    );
  };

  const onVoteImage = async (
    image_id: string,
    newValue: VoteValue,
    vote?: Vote
  ) => {
    dispatch(voteByImageId({ vote, image_id, newValue }));
  };

  return (
    <CatListView
      images={catImages}
      error={error}
      onNewImage={onNewImage}
      onFavouriteImage={onFavouriteImage}
      onVoteImage={onVoteImage}
      imagesLoading={loading}
      interactionLoading={interactionLoading}
    />
  );
};

export default CatList;
