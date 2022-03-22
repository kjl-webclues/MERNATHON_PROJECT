import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './Component/Navbar';
import HomePage from './Component/HomePage';
import LoginForm from './Component/LoginForm';
import RegisterForm from './Component/RegisterForm';
import Profile from './Component/Profile';
import Dashboard from './Component/Dashboard'
import Genres from './Component/Genres';
import Artists from './Component/Artists';
import AdminsArtist from './Component/AdminsArtist';
import ChangePassword from './Component/ChangePassword';
import ArtistProfile from './Component/ArtistProfile';
import CreateGenres from './Component/CreateGenres';
import VisitorGenres from './Component/VisitorGenres';
import CreateNFT from './Component/CreateNFT';
import Error404 from './Component/Error'
import ProtectedRoute from './Component/ProtectedRoutes'
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';


const App = () => {
  const authenticateUser = useSelector(state => state.authenticateUser)

  const loginStatus = useSelector(state => state.loginStatus)

  const cookie = Cookies.get("jwtLogin");
  return (
    <>    
      <Navbar />
      <hr/>
      <Switch>
        
        <Route exact path='/' component={HomePage} />
       
        {
          authenticateUser.role === 'admin' ? (
            <>
              <ProtectedRoute exact path='/changePassword' component={ChangePassword} isAuth={cookie} />
              <ProtectedRoute exact path='/dashboard' component={Dashboard} isAuth={cookie} />
              <ProtectedRoute exact path='/createGenres' component={CreateGenres} isAuth={cookie} />
              <ProtectedRoute exact path='/adminGenres' component={Genres} isAuth={cookie} />
              <ProtectedRoute exact path='/adminArtist' component={AdminsArtist} isAuth={cookie} />
              <ProtectedRoute exact path='/editGenres/:id' component={CreateGenres} isAuth={cookie} />
              <ProtectedRoute exact path='/profile' component={Profile} isAuth={cookie} />
              <ProtectedRoute exact path='/artistProfile' component={ArtistProfile} isAuth={cookie} />
            </>
          ) : null
        }

        {
          authenticateUser.role === 'artist' ? (
            <>
              <ProtectedRoute exact path='/genres' component={VisitorGenres} isAuth={cookie} />
              <ProtectedRoute exact path='/createNFT' component={CreateNFT} isAuth={cookie} />
              <ProtectedRoute exact path='/artist' component={Artists} isAuth={cookie} />
              <ProtectedRoute exact path='/artistProfile' component={ArtistProfile} isAuth={cookie} />              
            </>
          ): null
        }

         {
          cookie === undefined || loginStatus === false ? (
            <>
              <Route exact path='/' component={HomePage} />              
              <ProtectedRoute exact path='/changePassword' component={ChangePassword} isAuth={cookie} />
              <ProtectedRoute exact path='/dashboard' component={Dashboard} isAuth={cookie} />
              <ProtectedRoute exact path='/createGenres' component={CreateGenres} isAuth={cookie} />
              <ProtectedRoute exact path='/adminGenres' component={Genres} isAuth={cookie} />
              <ProtectedRoute exact path='/adminArtist' component={AdminsArtist} isAuth={cookie} />
              <ProtectedRoute exact path='/editGenres/:id' component={CreateGenres} />
              <ProtectedRoute exact path='/profile' component={Profile} isAuth={cookie} />
              <ProtectedRoute exact path='/createNFT' component={CreateNFT} isAuth={cookie} />
              <ProtectedRoute exact path='/artistProfile' component={ArtistProfile} isAuth={cookie} />



              

              <Route exact path='/registerPage' component={RegisterForm} />
              <Route exact path='/loginPage' component={LoginForm} />
              <Route exact path='/artist' component={Artists} />
              <Route exact path='/genres' component={VisitorGenres} />


            </>
          ) : <Redirect to='/' />
        }        
                <Route component={Error404} />
      </Switch>
    </>
  )
}

export default App