import React, { useState } from 'react';
import { uploadCatImage } from '../../Services/CatAPIService';

import UploadCatView from './UploadCatView';

const UploadCat: React.FC = () => {
  const [error, setError] = useState<string>();

  const onUpload = async (file: File) => {
    const response = await uploadCatImage({
      file,
      sub_id: 'TempUser-4321',
    });

    if (!response) return false;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, error] = response;

    if (error) {
      setError(error.message);
      return false;
    }

    return true;
  };

  return <UploadCatView onUpload={onUpload} error={error} />;
};

export default UploadCat;
