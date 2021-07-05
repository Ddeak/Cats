import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Routes from '../../Layout/Routes';
import { uploadCatImage } from '../../Services/CatAPIService';
import {
  setError,
  uploadSuccess,
  setLoading,
} from '../../State/actions/catImage';
import { catImagesSelector } from '../../State/selectors';

import UploadCatView from './UploadCatView';
import Snackbar from '../Feedback/Snackbar';

const UploadCat: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { error, loading } = useSelector(catImagesSelector);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setSnackbarOpen(!!error);
  }, [error]);

  const onUpload = async (file: File) => {
    dispatch(setLoading(true));

    const [data, error] = await uploadCatImage({
      file,
    });

    if (error || !data)
      dispatch(setError(error?.message || 'Failed to upload that image!'));
    else {
      dispatch(uploadSuccess(data));
      history.push(Routes.Landing);
    }
  };

  return (
    <>
      <UploadCatView onUpload={onUpload} loading={loading} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={error}
      />
    </>
  );
};

export default UploadCat;
