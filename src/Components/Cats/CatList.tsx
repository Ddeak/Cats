import React, { useEffect, useState } from 'react';

import { getCatImages } from '../../Services/CatAPIService';
import { CatImage } from '../../Types/catImage';
import CatListView from './CatListView';

const CatList: React.FC = () => {
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [error, setError] = useState<string>();

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

  return <CatListView images={catImages} error={error} />;
};

export default CatList;
