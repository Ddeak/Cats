import React from 'react';

import { PageContent } from '../../Components/Templates/Page';
import CatList from '../../Components/Cats/CatList';
import { useAppData } from '../../Hooks';

const CatListPage: React.FC = () => {
  useAppData();

  return (
    <PageContent>
      <CatList />
    </PageContent>
  );
};

export default CatListPage;
