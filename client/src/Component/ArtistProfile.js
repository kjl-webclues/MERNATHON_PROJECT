import React, {useEffect, useState} from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from './CheckBox';
import { update_Artist_Profile, user_Profile} from '../Action/Actions'

const ArtistProfile = () => {

    const dispatch = useDispatch()

    const authenticateUser = useSelector(state => state.authenticateUser)
    const genres = useSelector(state => state.genres)
    console.log("authenticateUser", authenticateUser);

    //===================Store Edit User Data =====================//
    const [checkGenres, setCheckGenres] = useState([]);
    console.log("checkGenres", checkGenres);

    const handleClick = (e) => {
        const { id, checked } = e.target;
        setCheckGenres([...checkGenres, id]);
        if (!checked) {
            setCheckGenres(checkGenres.filter((i) =>i !== id))
        }
    }

    const validationSchema = Yup.object().shape({
      firstName: Yup.string()
            .max(20, "must be 20 character or less")
            .required("Firstname is Required!"),

      lastName: Yup.string()
            .max(20, "must be 20 character or less")
            .required('Lastname is Required!'),
      
      userName: Yup.string()
            .required("Username is Required"),
      
      email: Yup.string()
            .email('E-mail is not valid!')
            .required('E-mail is required!'),
      
      bio: Yup.string()
            .max(500, "must be 500 character or less")
            .required('Bio is required!'),
    })

    //////////////////////////////// Formik Values ///////////////////////////////
    const initialValues = {
            firstName: "",
            lastName:"",            
            userName: "",
            email: "",
            bio: ""            
        }
  
    const formik = useFormik({
            validationSchema,
            initialValues,
        onSubmit: (values) => {
            dispatch(update_Artist_Profile(authenticateUser._id, values, checkGenres))
            },   
    })        
    
    useEffect(() => {          
        let genres = authenticateUser.genres && authenticateUser.genres.map((elem) => elem)
        setCheckGenres(genres)
        formik.setValues(authenticateUser)
    }, [])

     useEffect(() => {      
      dispatch(user_Profile())         
     }, [])
    
    return (
      <>
          <div className='wrapper'>
                <h1>Edit Artist</h1>                
                    <div className="mainDiv">
                        <div className="subDiv">
                              <form className='registerform' onSubmit={formik.handleSubmit}>
                                  <input type="text"
                                    id="firstName"
                                    name="firstName"
                                    disabled= {false}            
                                    {...formik.getFieldProps("firstName")}
                                /><br />
                                {formik.touched.firstName && formik.errors.firstName ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.firstName}
                                        </div>
                                    </div>
                                ) : null}

                                <input type="text"
                                    name="lastName"
                                    id="lastName"
                                    disabled= {false}
                                    {...formik.getFieldProps("lastName")}
                                /><br />                                
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.lastName}
                                        </div>
                                    </div>
                                ) : null}
                                
                                <input type="text"
                                    name="userName"
                                    id="userName"
                                    disabled= {false}
                                    {...formik.getFieldProps("userName")}
                                /><br />
                                {formik.touched.userName && formik.errors.userName ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.userName}
                                        </div>
                                    </div>
                                ) : null}
                                
                                <input type="email"
                                    name="email"
                                    id="email"
                                    disabled= {true}
                                    {...formik.getFieldProps("email")}
                                /><br />                                
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.email}
                                        </div>
                                    </div>
                                ) : null}
                                    
                                <input type="text"
                                    name="bio"
                                    placeholder='Enter Bio of Artist'
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps("bio")}
                                /><br />
                                {formik.touched.bio && formik.errors.bio ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.bio}
                                        </div>
                                    </div>
                                ) : null}
                            
                                    
                                <label>Genres</label><br />                          
                                <Checkbox
                                type='checkbox'
                                id={'Jazz Music'}
                                handleClick={handleClick}
                                isChecked={checkGenres.includes('Jazz Music')} />
                                <label>Jazz Music</label><br />
                                
                                <Checkbox
                                type='checkbox'
                                id={'K-pop'}
                                handleClick={handleClick}
                                isChecked={checkGenres.includes('K-pop')} />
                                <label>K-pop Music</label><br />
                                
                                <Checkbox
                                type='checkbox'
                                id={'Techno Music'}
                                handleClick={handleClick}
                                isChecked={checkGenres.includes('Techno Music')} />
                                <label>Techno Music</label><br />

                                <Checkbox
                                type='checkbox'
                                id={'Trance music'}
                                handleClick={handleClick}
                                isChecked={checkGenres.includes('Trance music')} />
                                <label>Trance Music</label><br />    

                                <Checkbox
                                type='checkbox'
                                id={'Country Music'}
                                handleClick={handleClick}
                                isChecked={checkGenres.includes('Country Music')} />
                                <label>Country Music</label><br />

                                <Checkbox
                                type='checkbox'
                                id={'Latin music'}
                                handleClick={handleClick}
                                isChecked={checkGenres.includes('Latin music')} />
                                <label>Latin Music</label><br />    
                                
                                <Checkbox
                                type='checkbox'
                                id={'Electronic music'}
                                handleClick={handleClick}
                                isChecked={checkGenres.includes('Electronic music')} />
                                <label>Electronic Music</label><br />
                                
                                <Checkbox                                
                                type='checkbox'
                                id={'Folk music'}
                                handleClick={handleClick}
                                isChecked={checkGenres.includes('Folk music')} />
                                <label>Folk Music</label><br />
                            
                                {/* {
                                    genres && checkGenres !== undefined && genres.map((elem) => {
                                        return (
                                            <>
                                                <label>{ elem.title}</label>
                                                <div>
                                                    <Checkbox
                                                        type='checkbox'
                                                        id={elem.title}
                                                        name={elem.title}
                                                        handleClick={handleClick}
                                                        isChecked={checkGenres.includes(elem.title)}
                                                    />
                                                </div>
                                            </>
                                        )
                                    })
                                }                                                                                                                                                                                                                                                                                                                                                                                                     */}
                            <button type='submit' className="registerbtn">Update Profile</button>

                            </form><br />                            
                        </div>
                    </div>
            </div> 
    </>
  )
}

export default ArtistProfile