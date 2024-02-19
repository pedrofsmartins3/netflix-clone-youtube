import React, { useEffect, useState } from 'react'
import './Nav.css'
import { useNavigate } from 'react-router-dom'
import netflixImg from "../assets/netflix.png"

function Nav({ login }){

  const navigate = useNavigate()
  const [isLogin] = useState(login, false)
  console.log(isLogin)

  // 1º useState para quando quisermos mostrar a navbar black
  const [show, handleShow] = useState(false)

  // 2º função para quando scroll no eixo Y passar os 100 ativar o state
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false)
    }
  }

  // 3º useEffect para chamar a função onMount e limpala 
  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar)
    return () => window.removeEventListener("scroll", transitionNavBar)
  }, [])

  const avatarBtn = (e) => {
    e.preventDefault() 
    !isLogin && navigate("./profile")
  }

  return (
    // 4º quando o show for true adicionar o "nav black" e a nav fica preta (css)
    <div className={`nav ${show && 'nav_black'}`}>
        <div className='nav_contents'>
            <img 
              onClick={avatarBtn}
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
              alt="avatar" 
              className='nav_avatar'
              />
            <img
              onClick={() => navigate("/")}
              src={netflixImg}
              className="nav_logo" 
              alt="Netflix Logo"/>
        </div>
    </div>
  )
}

export default Nav