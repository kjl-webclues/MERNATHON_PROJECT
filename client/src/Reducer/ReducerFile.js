import { ADD_GENRES, CHANGE_PASSWORD, DELETE_GENERS, EDIT_GENRES, GET_ARTIST_AND_GENRES_COUNT, GET_GENRES, GET_NFT, LOGIN_USER, LOGIN_USER_PROFILE, LOGOUT_USER, REGISTER_USER, UPDATE_GENRES, UPDATE_USER_PROFILE, UPLOAD_NFT, UPLOAD_NFT_AUDIO, UPLOAD_NFT_IMAGE } from "../Action/ActionType"

const initialState = {
    loginStatus: false,
    validRegister: false,
    authenticateUser: '',
    genres: [],
    totalPage: [],
    deleteToggle: false,
    Toggle: false,
    CoverImage: [],
    AudioFile: [],
    nft: [],
    ArtistCount: "",
    GenresCount: ""
}

const ReducerFile = (state = initialState, action) => {
    switch (action.type) {
        
        case REGISTER_USER: {
            return {
                ...state,
                validRegister: true,
                Toggle:false
            }
        }

        case LOGIN_USER: {
            return {
                ...state, 
                loginStatus: true,
                // validRegister: false
            }
        }
            
        case LOGIN_USER_PROFILE: {
            return {
                ...state,
                loginStatus: true,
                authenticateUser: action.payload.LoginUser, 
            }
        }
        
        case UPDATE_USER_PROFILE: {
            return {
                ...state
            }
        }
        
        case CHANGE_PASSWORD: {
            return {
                ...state
            }
        }
            
        case ADD_GENRES: {
            return {
                ...state,
                Toggle:true
            }
        }
        
        case GET_GENRES: {
            return {
                ...state,
                genres: action.payload.genres,
                totalPage: action.payload.totalPage,
                Toggle: false,
                deleteToggle: false
            }
        }
            
        case EDIT_GENRES: {
            return {
                ...state, 
                Toggle:true
            }
        }
        
        case UPDATE_GENRES: {
            return {
                ...state,
                Toggle:true
            }
        }
            
        case DELETE_GENERS: {
            return {
                ...state,
                deleteToggle: true
            }
        }
        
        case UPLOAD_NFT: {
            return {
                ...state,
                CoverImage: [],
                AudioFile: [],
                Toggle : true
            }
        }
        
        case UPLOAD_NFT_IMAGE: {
            return {
                ...state,
                CoverImage: action.payload,
                Toggle : false
            }
        }
            
        case UPLOAD_NFT_AUDIO: {
            return {
                ...state,
                AudioFile: action.payload,
                Toggle : false

            }
        }
            
        case GET_ARTIST_AND_GENRES_COUNT: {
            return {
                ...state,
                ArtistCount: action.payload.ArtistCount,
                GenresCount: action.payload.GenresCount
            }
        }
            
        case GET_NFT: {
            return {
                ...state,
                AudioFile: action.payload
            }
        }
        
        case LOGOUT_USER: {
            return {
                ...state,
                loginStatus: false,
                authenticateUser: ""
            }
        }

        default:
            return state

        
    }
}

export default ReducerFile