import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

type PropsType = {
  onUpload: (file: File) => Promise<boolean>;
  error?: string;
};

type FileState = {
  raw: File;
  url: string;
};

const useStyles = makeStyles({
  input: { display: 'none' },
});

const UploadCatView: React.FC<PropsType> = ({ onUpload, error }) => {
  const classes = useStyles();
  const [file, setFile] = useState<FileState>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setFile({
      raw: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  };

  const uploadClick = async () => {
    if (!file) return;

    const success = await onUpload(file.raw);
    if (success) setFile(undefined);
  };

  return (
    <div className="container">
      {error && <div className="error">{error}</div>}
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

      <div>
        {file && (
          <>
            <Typography>{file.raw.name}</Typography>
            <img src={file.url} alt="Upload" />
            <Button
              onClick={uploadClick}
              variant="contained"
              startIcon={<CloudUploadIcon />}
              disabled={!file}
            >
              Upload
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadCatView;
