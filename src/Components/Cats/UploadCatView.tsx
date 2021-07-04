import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useEffect } from 'react';

import Snackbar from '../Snackbar';

type PropsType = {
  onUpload: (file: File) => void;
  error?: string;
  loading: boolean;
};

type FileState = {
  raw: File;
  url: string;
};

const useStyles = makeStyles((theme) => ({
  input: { display: 'none' },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 275,
    maxWidth: 350,
    justifyContent: 'space-between',
  },
  card: {
    display: 'grid',
    gridGap: '2rem',
    padding: '2rem',
    borderRadius: 16,
    minWidth: 212,
    maxWidth: 286,
  },
  image: {
    width: '100%',
    borderRadius: 16,
  },
}));

const UploadCatView: React.FC<PropsType> = ({ onUpload, error, loading }) => {
  const classes = useStyles();
  const [file, setFile] = useState<FileState>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setSnackbarOpen(!!error);
  }, [error]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setFile({
      raw: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  };

  const uploadClick = async () => {
    if (!file) return;
    onUpload(file.raw);
  };

  return (
    <>
      <div className="container">
        <div className={classes.buttonRow}>
          <input
            accept="image/*"
            className={classes.input}
            id="image-upload-input"
            type="file"
            onChange={onChange}
          />
          <label htmlFor="image-upload-input">
            <Button variant="contained" component="span">
              Choose Image
            </Button>
          </label>

          <Button
            onClick={uploadClick}
            variant="contained"
            startIcon={<CloudUploadIcon />}
            disabled={!file || loading}
          >
            Upload
          </Button>
        </div>

        {file && (
          <Card className={classes.card}>
            <Typography>{file.raw.name}</Typography>
            <img src={file.url} alt="Upload" className={classes.image} />
          </Card>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={error}
      />
    </>
  );
};

export default UploadCatView;
