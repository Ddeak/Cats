import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage } from '../Pages';
import NavigationBar from '../Components/Navigation/NavigationBar';
import { PageWrapper, PageContent } from '../Components/Templates/Page';

const Layout = () => {
  return (
    <Router>
      <PageWrapper>
        <NavigationBar />

        <PageContent>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>
        </PageContent>
      </PageWrapper>
    </Router>
  );
};

export default Layout;
