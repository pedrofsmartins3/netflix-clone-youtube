import React from 'react'
import "./LoginScreen.css";
import SignUpScreen from "./SignUpScreen.js"
import netflixImg from "../assets/netflix.png"

function LoginScreen() {

    const [signIn, setSignIn] = React.useState(false)

  return (
    <div className='loginScreen'>
        <div className='loginScreen_background'>
            <img 
                className='loginScreen_logo'
                src={netflixImg} 
                alt="Netflix"
            />
            <button className='loginScreen_button' onClick={() => {setSignIn(true)}}>
                Sign in
            </button>  
        </div>

        <div className='loginScreen_body'>

                {/* */}
                {signIn ? (
                    <SignUpScreen />
                ) : (
                    <>
                        <h1>Unlimited films, TV programmes and more.</h1>
                        <h2>Whatch anywhere. Cancel at any time.</h2>
                        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                        <div className='loginScreen_input'>
                            <form>
                                <input type="email" placeholder='Email Adress'/>
                                <button className='loginScreen_getStarted' onClick={() => {setSignIn(true)}}>GET STARTED</button>
                            </form>
                        </div>
                 </> 
                )}
               
        </div>        
    </div>
  )
}

export default LoginScreen