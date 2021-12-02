// import { Route } from 'react-router-dom';
// import Footer from './components/common/UI/Footer';
// import Header from './components/common/UI/Header';
// import ChangePWPage from './pages/ChangePWPage';
// import CreateSurveyPage from './pages/CreateSurveyPage';
// import FindIDPage from './pages/FindIDPage';
// import FindPWPage from './pages/FindPWPage';
// import LoginPage from './pages/LoginPage';
// import MainPage from './pages/MainPage';
// import MySurveyPage from './pages/MySurveyPage';
// import ReadOnlyPage from './pages/ReadOnlyPage';
// import RegisterPage from './pages/RegisterPage';
// import ResultPage from './pages/ResultPage';
// import SurveySubmitPage from './pages/SurveySubmitPage';
// import UpdatePage from './pages/UpdatePage';
// import { Chart, PieSeries, Title, } from '@devexpress/dx-react-chart-material-ui';
// import { Animation } from '@devexpress/dx-react-chart';
// import { Grid } from '@mui/material';

// const App = () => {
//   return (
//     <>
//       <Header />
//       <Grid container >
//         <Grid item xs={1}>
//           <Chart
//               data={[{age:'10대', people:20}]}
//           >
//               <PieSeries
//                   argumentField="age"
//                   valueField="people"
//                   innerRadius={0.6}
//               />
//               <Title
//                   text="누적 이용자"
//               />
//               <Animation />
//           </Chart>

//         </Grid>
//       </Grid>
//       <Footer />
//     </>
//   );
// }

// export default App;




import { Route } from 'react-router-dom';
import { MakeThemeProvider } from './components/common/Function';
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

const App = () => {
  return (
    <>
      <MakeThemeProvider>
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
        {/* surveykey : 설문지의 고유번호(PK)를 의미 */}
        <Route path="/ReadOnlyPage/:surveykey" component={ReadOnlyPage} /> 
        {/* surveykey : 설문지의 고유번호(PK)를 의미 */}
        <Route path="/UpdatePage/:surveykey" component={UpdatePage} /> 
        {/* surveykey : 설문지의 고유번호(PK)를 의미 */}
        <Route path="/ResultPage/:surveykey" component={ResultPage} />
      </MakeThemeProvider>
    </>
  );
}

export default App;
