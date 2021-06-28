import React from 'react';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { PageContent } from '../../Components/Templates/Page';
import Routes from '../../Layout/Routes';

const NotFoundPage: React.FC = () => {
  const history = useHistory();

  const onBackClick = () => history.push(Routes.Landing);

  return (
    <PageContent>
      <Typography variant="h1">Ooops!</Typography>
      <Typography>That page was not found!</Typography>
      <Button onClick={onBackClick}>Go Back</Button>
    </PageContent>
  );
};

export default NotFoundPage;
