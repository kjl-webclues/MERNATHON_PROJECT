import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout_User, user_Profile } from "../Action/Actions";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';


const Navbar = () => {
    const history = useHistory()

    const dispatch = useDispatch()
    const authenticateUser = useSelector(state => state.authenticateUser)
    const loginStatus = useSelector(state => state.loginStatus)
  
    const cookie = Cookies.get("jwtLogin");



    const logout = () => {
      dispatch(logout_User())
      history.push('/')
    }
    
    useEffect(() => {
      dispatch(user_Profile())
    }, [dispatch, cookie])

    return (
      <div className='nav_div'>
            {
              loginStatus === false && cookie === undefined ? (
              <>
                <NavLink to='/registerPage'><button>Sign Up</button></NavLink>        
                <NavLink to='/loginPage'><button>Sign In</button></NavLink>
                <NavLink to='/'><button>Home</button></NavLink>              
                <NavLink to='/artist'><button>Artist</button></NavLink>
                <NavLink to='/genres'><button>Genres</button></NavLink>
              </>
              ): null
            }
        
            {
              authenticateUser.role === "admin" && cookie !== undefined && loginStatus === true ? (
                <>
                    <NavLink to='/dashboard'><button>Dashboard</button></NavLink>
                    <NavLink to='/profile'><button>Profile</button></NavLink>              
                    <NavLink to='/changePassword'><button>Change Password</button></NavLink>
                    <NavLink to='/createGenres'><button>Create Genres</button></NavLink>
                    <NavLink to='/adminGenres'><button>Genres</button></NavLink>
                    <NavLink to='/artist'><button>Artist</button></NavLink>
                    <button  onClick={logout}>Logout</button>
                </>
              ) : null
            }
        
            {
              authenticateUser.role === "artist" && cookie !== undefined && loginStatus === true ? (
              <>
                <NavLink to='/'><button>Home</button></NavLink>
                <NavLink to='/artist'><button>Artist</button></NavLink>
                <NavLink to='/genres'><button>Genres</button></NavLink>
                <NavLink to='/createNFT'><button>CreateNFT</button></NavLink>
                <button  onClick={logout}>Logout</button>
              </>
              ): null
            }                                                   
                            
      </div>
    )
}

export default Navbar