import { Route, Switch } from 'react-router-dom';
import { MakeThemeProvider } from './components/common/Function';
import { Container } from './lib/styels/MyStyles';
import ChangePWPage from './pages/ChangePWPage';
import CreateSurveyPage from './pages/CreateSurveyPage';
import FindIDPage from './pages/FindIDPage';
import FindPWPage from './pages/FindPWPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MySurveyPage from './pages/MySurveyPage';
import NotFoundPage from './pages/NotFoundPage';
import ReadOnlyPage from './pages/ReadOnlyPage';
import RegisterPage from './pages/RegisterPage';
import ResultPage from './pages/ResultPage';
import SurveySubmitPage from './pages/SurveySubmitPage';
import UpdatePage from './pages/UpdatePage';

const App = () => {
  return (
    <MakeThemeProvider>
      <Container>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/LoginPage" component={LoginPage} />
          <Route exact path="/RegisterPage" component={RegisterPage} />
          <Route exact path="/FindIDPage" component={FindIDPage} />
          <Route exact path="/FindPWPage" component={FindPWPage} />
          <Route exact path="/ChangePWPage" component={ChangePWPage} />
          <Route exact path="/CreateSurveyPage" component={CreateSurveyPage} />
          <Route exact path="/MySurveyPage" component={MySurveyPage} />
          
          <Route exact path="/SurveySubmitPage/:surveykey" component={SurveySubmitPage} /> 
          <Route exact path="/ReadOnlyPage/:surveykey" component={ReadOnlyPage} /> 
          <Route exact path="/UpdatePage/:surveykey" component={UpdatePage} /> 
          <Route exact path="/ResultPage/:surveykey" component={ResultPage} />

          <Route component={NotFoundPage}/>
        </Switch>
      </Container>
    </MakeThemeProvider>
  );
}

export default App;
