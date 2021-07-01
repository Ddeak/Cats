import React from 'react';

import UploadCat from '../../Components/Cats/UploadCat';
import { PageContent } from '../../Components/Templates/Page';

const UploadCatPage: React.FC = () => {
  return (
    <PageContent>
      <UploadCat />
    </PageContent>
  );
};

export default UploadCatPage;
