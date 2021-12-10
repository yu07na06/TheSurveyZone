import { Route } from 'react-router-dom';
import { MakeThemeProvider } from './components/common/Function';
import { Container } from './lib/styels/MyStyles';
import ChangePWPage from './pages/ChangePWPage';
import CreateSurveyPage from './pages/CreateSurveyPage';
import FindIDPage from './pages/FindIDPage';
import FindPWPage from './pages/FindPWPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MySurveyPage from './pages/MySurveyPage';
import ReadOnlyPage from './pages/ReadOnlyPage';
import RegisterPage from './pages/RegisterPage';
import ResultPage from './pages/ResultPage';
import SurveySubmitPage from './pages/SurveySubmitPage';
import UpdatePage from './pages/UpdatePage';
import NotFound from './components/common/modules/NotFound';

const App = () => {
  return (
    <>
      <MakeThemeProvider>
        <Container>
          <Route path="/" component={MainPage} exact/>
          <Route path="/LoginPage" component={LoginPage} />
          <Route path="/RegisterPage" component={RegisterPage} />
          <Route path="/FindIDPage" component={FindIDPage} />
          <Route path="/FindPWPage" component={FindPWPage} />
          <Route path="/ChangePWPage" component={ChangePWPage} />
          <Route path="/CreateSurveyPage" component={CreateSurveyPage} />
          <Route path="/MySurveyPage" component={MySurveyPage} />
          
          {/* surveykey : 응답하려는 설문지의 고유번호(PK)를 의미 */}
          <Route path="/SurveySubmitPage/:surveykey" component={SurveySubmitPage} /> 
          <Route path="/ReadOnlyPage/:surveykey" component={ReadOnlyPage} /> 
          <Route path="/UpdatePage/:surveykey" component={UpdatePage} /> 
          <Route path="/ResultPage/:surveykey" component={ResultPage} />

          <Route path="*" component={NotFound}/>
        </Container>
      </MakeThemeProvider>
    </>
  );
}

export default App;
