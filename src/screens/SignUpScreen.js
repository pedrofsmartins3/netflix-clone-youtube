import React, {useRef} from 'react'
import "./SignUpScreen.css"
import { auth } from '../firebase';

function SignUpScreen() {

  const [signUp, setSignUp] = React.useState(false)

  // criar constantes para reter o valor do input
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // botão registar, aqui eu estou a criar um usuário no auth do firebase
  const register = (e) => {
    e.preventDefault();
    // aqui uso o createUser...
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      ).then((authUser) => {
        console.log(authUser)
      }).catch(error => {
        alert(error.message)
      });
  };

  //botão para fazer sign up, caso não tenha esse email registado na firebase
  // irá dar um erro!
  const signIn = (e) => {
    // aqui uso o loginUser...
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser)
      })
      .catch(error => alert(error.message))

      e.preventDefault();
  }

  return (
    <div className='signupScreen'>
          <form>
            <h1>{signUp ? "Sign Up" : "Sign In"}</h1>
            {/*uso o ref={nomeConst} para o ref saber que é este input que é para dar "current.value"*/ }
            <input ref={emailRef} placeholder='Email' type="Email"/>
            <input ref={passwordRef} placeholder='Password' type="password"/>
            <button type="submit" onClick={signUp ? register : signIn}>Sign In</button>
            <h4>
              <span className='signupScreen_gray'>{signUp ? "Already have an account? " : "New to Netflix? "}</span>
              <span className='signupScreen_link' onClick={() => setSignUp(!signUp)}>{signUp ? "Login in now." : "Sign up now."}</span></h4>
          </form> 
    </div>
    )
  }

export default SignUpScreen