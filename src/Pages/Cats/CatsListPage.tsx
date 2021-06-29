import React from 'react';

import { PageContent } from '../../Components/Templates/Page';
import CatList from '../../Components/Cats/CatList';

const CatListPage: React.FC = () => {
  return (
    <PageContent>
      <CatList />
    </PageContent>
  );
};

export default CatListPage;
