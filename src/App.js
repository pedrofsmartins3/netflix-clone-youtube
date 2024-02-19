import React from 'react';
import HomeScreen from './screens/HomeScreen.js'
import LoginScreen from './screens/LoginScreen.js';
import ProfileScreen from './screens/ProfileScreen.js'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { auth } from './firebase.js';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice.js';

function App() {

  {/*simular que nao tenho login feito, vamos alterar mais tarde com firebase
  --> const user = null
  agora o certo: (usando o selector do Redux para obter o user state*/}
  const user = useSelector(selectUser);
  {/*por ter mudado isto automaticamente foi para o HomeScreen porque estava com uma conta loggada */}

  const dispatch = useDispatch();

  {/* useEffect é para o App "ouvir" que existe um login e aqui redirecionar para a "homeScreen" */}
  React.useEffect(() => {
    {/* Aqui este onath vai ouvir se existe alguma state change no auth da firebase e até guardar esse login no localstorage */}
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
      } else {
        // estou aqui a usar o dispatch redux para mudar o state e levar o user para "null" (criei esta função no features/userSlice)
        dispatch(logout())
      }
    })
    return unsubscribe;
  }, [dispatch])

  {/*caso não haja user vai para loginscreen, caso tenha user vai direto para HomeScreen*/}
  return (
    <div className="app">
      <BrowserRouter>
          {!user ? (<LoginScreen />) : (
            <Routes>
              <Route exact path="/" element={<HomeScreen />} />
              <Route path="/profile" element={<ProfileScreen />}/>
            </Routes>
          )}
      </BrowserRouter>
    </div>
  );
}

export default App;
