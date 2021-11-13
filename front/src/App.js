import { Route } from 'react-router-dom';
import CreateSurveyPage from './pages/CreateSurveyPage';
import FindIDPage from './pages/FindIDPage';
import FindPWPage from './pages/FindPWPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MySurveyPage from './pages/MySurveyPage';
import RegisterPage from './pages/RegisterPage';
import ResultPage from './pages/ResultPage';
import SurveySubmitPage from './pages/SurveySubmitPage';

const App = () => {
  return (
    <>
        <Route path="/" component={MainPage} exact/>
        <Route path="/LoginPage" component={LoginPage} />
        <Route path="/RegisterPage" component={RegisterPage} />
        <Route path="/FindIDPage" component={FindIDPage} />
        <Route path="/FindPWPage" component={FindPWPage} />
        <Route path="/CreateSurveyPage" component={CreateSurveyPage} />
        <Route path="/ResultPage" component={ResultPage} />
        <Route path="/MySurveyPage" component={MySurveyPage} />
        
        {/* surveykey : 응답하려는 설문지의 고유번호(PK)를 의미 */}
        <Route path="/SurveySubmitPage/:surveykey" component={SurveySubmitPage} /> 
    </>
  );
}

export default App;
