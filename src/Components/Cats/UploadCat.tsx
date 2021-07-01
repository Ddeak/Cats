import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CAT_API_SUB_ID } from '../../app-config';
import Routes from '../../Layout/Routes';
import { uploadCatImage } from '../../Services/CatAPIService';

import UploadCatView from './UploadCatView';

const UploadCat: React.FC = () => {
  const history = useHistory();
  const [error, setError] = useState<string>();

  const onUpload = async (file: File) => {
    const response = await uploadCatImage({
      file,
      sub_id: CAT_API_SUB_ID || '',
    });

    if (!response) return;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, error] = response;

    if (error) {
      setError(error.message);
      return;
    }
    history.push(Routes.Landing);
  };

  return <UploadCatView onUpload={onUpload} error={error} />;
};

export default UploadCat;
