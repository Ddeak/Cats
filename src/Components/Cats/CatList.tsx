import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Routes from '../../Layout/Routes';

import { getCatImages } from '../../Services/CatAPIService';
import { CatImage } from '../../Types/catImage';
import CatListView from './CatListView';

const CatList: React.FC = () => {
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [error, setError] = useState<string>();
  const history = useHistory();

  useEffect(() => {
    const fetchImages = async () => {
      const response = await getCatImages();
      if (!response) return;

      const [images, error] = response;
      if (error) setError(error.message);
      else setCatImages(images || []);
    };

    fetchImages();
  }, []);

  const onNewImage = () => history.push(Routes.Upload);

  return (
    <CatListView images={catImages} error={error} onNewImage={onNewImage} />
  );
};

export default CatList;
