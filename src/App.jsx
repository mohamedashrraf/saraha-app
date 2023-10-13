import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import Notfound from './components/Notfound/Notfound'
import { useContext,useEffect } from 'react';
import { tokenContext } from './Context/tokenContext';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import SendMessage from './components/SendMessage/SendMessage';


function App() {


  const routes = createBrowserRouter([{
    path: "", element: <Layout />, children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "profile", element: <ProtectedRoutes> <Profile /></ProtectedRoutes> },
      { path: "message/:userId", element:<SendMessage /> },
      { path: "*", element: <Notfound /> },

    ]
  }])


  let {setToken}= useContext(tokenContext);
  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      setToken(localStorage.getItem("userToken"))
    }
  }, [])
  
  return (
    <>
      <RouterProvider router={routes}>
      </RouterProvider>
    </>
  );
}

export default App;

