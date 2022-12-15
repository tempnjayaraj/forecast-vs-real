
import LoginForm from './LoginForm';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import RegistrationForm from './RegistrationFrom';
import CompanyDetailForm from './CompanyDetailForm';
import ThinkingVSexecution from './TVSE';
import Output from './modern';
import Forecast from './Forecast';
import Real from './Real';
// import Combined from './Combined';
import Comb from './Comb';

function App() {
   return <Router>
            <Routes>
               <Route path="/" exact element={<LoginForm/>}/>
               <Route path="/thinkingVSexecution" exact element={<ThinkingVSexecution/>}/>
               <Route path="/forecast" exact element={<Forecast/>}/>
               <Route path="/real" exact element={<Real/>}/>
               <Route path="/combined" exact element={<Comb/>}/>
               <Route path="/form" exact element={<RegistrationForm/>}/>
               <Route path="/company" exact element={<CompanyDetailForm/>}/>
               <Route path="/react" exact element={<Output/>}/>
            </Routes>
         </Router>;
}

export default App;
