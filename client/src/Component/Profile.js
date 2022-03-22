import React, { useEffect } from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { update_User_Profile } from '../Action/Actions';

const Profile = () => {
  const dispatch = useDispatch()

    const authenticateUser = useSelector(state => state.authenticateUser)

    const validationSchema = Yup.object().shape({
      firstName: Yup.string()
            .max(20, "must be 20 character or less")
            .required("Firstname is Required!"),

      lastName: Yup.string()
            .max(20, "must be 20 character or less")
            .required('Lastname is Required!'),
      
      phone: Yup.string()
            .min(10, 'too short')
            .max(12, "too long")
            .required("Phone Number is Required"),    
    })
  //////////////////////////////// Formik Values ///////////////////////////////
  const initialValues = {
            firstName: "",
            lastName:"",            
            phone: "",
        }
  
  const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit: (values) => {
            // console.log("values", values);
            dispatch(update_User_Profile(authenticateUser._id,authenticateUser.email, values))
        },   
      })
  
  useEffect(() => {
    formik.setValues(authenticateUser)
  }, [])
        

  return (
    <div className='wrapper'>
                <h1>User Pofile</h1>                
                    <div className="mainDiv">
                        <div className="subDiv">
                              <form className='registerform' onSubmit={formik.handleSubmit}>
                                  <input type="text"
                                    id="firstName"
                                    name="firstName"
                                    disabled= {false}            
                                    {...formik.getFieldProps("firstName")}
                                /><br />                                        

                                <input type="text"
                                    name="lastName"
                                    id="lastName"
                                    disabled= {false}
                                    {...formik.getFieldProps("lastName")}
                                /><br />                                

                                <input type="text"
                                    name="userName"
                                    id="userName"
                                    disabled= {false}
                                    {...formik.getFieldProps("userName")}
                                /><br />
                                 
                                <input type="email"
                                    name="email"
                                    id="email"
                                    disabled= {true}
                                    {...formik.getFieldProps("email")}
                                /><br />                                
                            
                                <input type="Number"
                                    name="phone"
                                    id="phone"
                                    disabled= {false}            
                                    {...formik.getFieldProps("phone")}
                                /><br />
                                                                                                                                                                                                                    
                                                                                                                    
                            <button type='submit' className="registerbtn">Edit Profile</button>

                            </form><br />                            
                        </div>
                    </div>
            </div> 
  )
}

export default Profile