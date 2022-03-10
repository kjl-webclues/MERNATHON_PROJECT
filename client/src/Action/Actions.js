import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ADD_GENRES, CHANGE_PASSWORD, DELETE_GENERS, EDIT_GENRES, GET_ARTIST_AND_GENRES_COUNT, GET_GENRES, LOGIN_USER, LOGIN_USER_PROFILE, LOGOUT_USER, REGISTER_USER, UPDATE_GENRES, UPDATE_USER_PROFILE, UPLOAD_NFT, UPLOAD_NFT_AUDIO, UPLOAD_NFT_IMAGE, VALIDE_REGISTER } from "./ActionType";
toast.configure()


//==================================Register User Action start =============================//
export const register_user = (user, genres) => dispatch => {
       axios.post(`/signUp`, {user, genres})
            .then((res) => {
                const result = res.data
                // console.log(result);
                if (result === "Email already Exists") {
                toast.error(result, { position: toast.POSITION.TOP_LEFT, autoClose:2000 })
                } else {
                    toast.success(result, { position: toast.POSITION.TOP_LEFT, autoClose: 2000 });
                    dispatch({ type: REGISTER_USER, payload: result })                    
                }
            })
            .catch(error => {
                console.log('error', error);
            })

}
//============================= End =============================//

//============================= Valid Register Toggle =============================//
export const valid_Register = () => dispatch => {
    dispatch({type: VALIDE_REGISTER})
}
//============================= End =============================//

//==================================Login User Action Start =============================//
export const login_User = (values) => dispatch => {
       axios.post(`/signIn`, values)
            .then((res) => {
                // console.log("values", values)                
                toast.success("Login Successful", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });
                dispatch({ type: LOGIN_USER })
            })
            .catch(error => {
                toast.error("Invalid Credentials", { position: toast.POSITION.TOP_LEFT, autoClose:2000 })
                console.log('error', error);
            })
    
}
//============================= End =============================//

//================================== Get Login UserProfile Action Start =============================//
export const user_Profile = () => dispatch => {
        axios.get('/getUserProfile')
            .then((res) => {
                dispatch({ type: LOGIN_USER_PROFILE, payload: res.data})
            })
            .catch((error) => {
                console.log("error", error);
            })

}

//================================== Get Login UserProfile Action Start =============================//
export const update_User_Profile = (id, email, values) => dispatch => {
    
        axios.put(`/updateUserProfile/${id}/${email}`, values)
            .then(res => {
                toast.success("Profile Updated Successfully!", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });                
                dispatch({ type: UPDATE_USER_PROFILE })
            })
            .catch(error => {
                toast.error("Profile Not Updated", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });
                console.log("error", error);
            })
    
}
//================================== Change pasword Action Start =============================//
export const change_Password = (id, values) => dispatch => {
        console.log("values", values);
        axios.put(`/changePasword/${id}`, values)
            .then((res) => {
                toast.success("Password Changed", { position: toast.POSITION.TOP_LEFT, autoClose: 2000 });
                dispatch({type: CHANGE_PASSWORD})
            })
            .catch(error => {
                toast.error("Old Password dosn't match!", { position: toast.POSITION.TOP_LEFT, autoClose: 2000 });
                console.log(error);
            })
}

//================================== Add genres Action Start =============================//
export const add_Genres = (genres) => dispatch => {
    axios.post(`/addGenres`, genres)
        .then((res) => {
            toast.success("Genres Add", { position: toast.POSITION.TOP_LEFT, autoClose: 2000 });
            dispatch({ type: ADD_GENRES })
        })
        .catch(error => {
            toast.error("Genres Not  Add", { position: toast.POSITION.TOP_LEFT, autoClose: 2000 });
            console.log(error);
        })
}
//================================== Get genres Action Start =============================//
export const get_Genres = (page) => dispatch => {
    axios.get(`/getGenres/?page=${page}`)
        .then((res) => {
            // console.log("res.data ", res.data );
            dispatch({ type: GET_GENRES, payload: res.data })
        })
        .catch(error => {
            console.log(error);
        })
}
//================================== Edit genres Action Start =============================//
export const edit_Genres = (id) => dispatch => {
    return (
        axios.get(`/editGenres/${id}`)
            .then(res => {
                const editUserData = res.data;
                toast.success("Genres Updated Successfull", { position: toast.POSITION.TOP_LEFT, autoClose: 2000 });
                dispatch({type: EDIT_GENRES, payload:editUserData})
            })
            .catch(error => {
                toast.error("Genres Not Updated", { position: toast.POSITION.TOP_LEFT, autoClose: 2000 });                    
                console.log("error", error);
            })
    )
}
//================================== Update genres Action Start =============================//
export const update_Genres = (id, values) => dispatch => {
    return (
        axios.put(`/updateGenres/?id=${id}`, values)
            .then(res => {
                const editUserData = res.data;
                toast.success("Genres Updated Successfully!", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });                
                dispatch({type: UPDATE_GENRES, payload:editUserData})
            })
                .catch(error => {
                toast.error("Genres Not Updated!", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });                                    
                console.log("error", error);
            })
    )
}
//================================== Delete genres Action Start =============================//
export const delete_Genres = (id) => dispatch => {
    axios.delete(`/deleteGenres/?id=${id}`)
        .then((res) => {
            toast.success("Delete Genres Successfully!", { position: toast.POSITION.TOP_LEFT, autoClose: 2000 });
            dispatch({ type: DELETE_GENERS, payload: res.data })
        })
        .catch(error => {
            toast.success("Genres not Deleted!", { position: toast.POSITION.TOP_LEFT, autoClose: 2000 });
            console.log(error);
        })
}

//================================== Upload NFT Action Start =============================//
export const upload_NFT = (userId, values, AudioFile, CoverImage) => dispatch => {
    axios.post(`/createBlog/?userId=${userId}`, {values, AudioFile, CoverImage})
        .then((res) => {                
                toast.success("Upload NFT Successfully!", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });                            
                dispatch({ type: UPLOAD_NFT })
            })
        .catch(error => {
                toast.error("NFT Can Not Upload", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });
                console.log('error', error);
            })
}

//================================== Add NFT IMAge Action Start =============================//
export const add_NftImage = (CoverImage) => dispatch => {
    axios.post(`/AddBlogBanner`, CoverImage)
        .then(res => {
            // console.log("banner", res.data);
            dispatch({ type: UPLOAD_NFT_IMAGE, payload: res.data})            
            })
        .catch(error => {
            console.log("error", error);            
            })
}
//================================== Add NFT AudioFile Action Start =============================//
export const upload_AudioFile = (values) => dispatch => {
        axios.post(`/uploadAudioFile`, values)
            .then((res) => {
                dispatch({ type: UPLOAD_NFT_AUDIO, payload: res.data })
            })
            .catch(err => {
                toast.error("File Is Not An Audio file!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });

            })
    
}
//================================== get getArtistAndGenresCount Action Start =============================//

export const getArtistAndGenresCount = () => {

    return (dispatch) => {
        axios.get(`/getArtistAndGenresCount`)
            .then((res) => {
                dispatch({ type: GET_ARTIST_AND_GENRES_COUNT, payload: res.data })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

//================================== Logout User Action Start =============================//
export const logout_User = () => dispatch => {
    return (
        axios.get(`/logout`)
            .then(res => {
                toast.success("User Logout", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });
                dispatch({ type: LOGOUT_USER})
            })
            .catch(error => {
                toast.error("User Can Not Logout", { position: toast.POSITION.TOP_LEFT, autoClose:2000 });
                console.log("error", error);
            })
    )
}
//============================= End =============================//