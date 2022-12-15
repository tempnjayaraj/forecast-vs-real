import './LoginForm.css';
// import SignUp from './SignUp.js';
import {Link} from 'react-router-dom';
import './plain.js';

function LoginForm() {

    return <div id="LoginFormContainer"><div class="container" id="LoginForm">
    <div class="form-container sign-up-container">
      <form action="#">
        <h1>Contact Form</h1>
        <br></br>
        {/* <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
          <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <span>or use your email for registration</span> */}
        <input type="text" placeholder="Company's Name" />
        <input type="text" placeholder="Company Domain" />
        <input type="text" placeholder="Address" />
        <input type="text" placeholder="Contact Person's Name" />
        <input type="email" placeholder="Contact Person's Email-ID" />
        {/* <input type="password" placeholder="Password" /> */}
        <button>Submit Request</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form action="#">
        <h1>Come and get <font color="red">DZPLIN</font>ed</h1>
        <br></br>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <Link to="/form"><button><font color="white">Sign In</font></button></Link>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Already have account?</h1>
          <br></br>
          {/* <p>To keep connected with us please login with your personal info</p> */}
          <button class="ghost" id="signIn"  onClick={() => document.getElementById('LoginForm').classList.remove("right-panel-active")}>Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Compliance made EASY</h1>
          <p>We can help you to get your company 100% compliant with the Rules and Regulations of your Government<hr></hr></p>
          
          <button class="ghost" id="signUp" onClick={() => document.getElementById('LoginForm').classList.add("right-panel-active")}><font color="white">I'm interested</font></button>
        </div>
      </div>
    </div>
  </div>
  </div>;
  }
  export default LoginForm;