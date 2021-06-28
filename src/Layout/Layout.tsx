import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationBar from '../Components/Navigation/NavigationBar';
import { PageWrapper } from '../Components/Templates/Page';
import { CatsListPage, UploadCatPage, NotFoundPage } from '../Pages';
import Routes from './Routes';

const Layout = () => {
  return (
    <Router>
      <PageWrapper>
        <NavigationBar />

        <Switch>
          <Route exact path={Routes.Landing}>
            <CatsListPage />
          </Route>
          <Route exact path={Routes.Upload}>
            <UploadCatPage />
          </Route>

          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </PageWrapper>
    </Router>
  );
};

export default Layout;
