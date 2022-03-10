import React, { useEffect } from 'react'
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import { change_Password, user_Profile } from '../Action/Actions';

const ChangePassword = () => {

    const dispatch = useDispatch()
    
    const authenticateUser = useSelector(state => state.authenticateUser)
    
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, 'Password must be at least 8 charaters')
            .required('Password is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Confirm Password Not Match')
            .required('Confirm password is required'),
    })

    //////////////////////////////// Formik Values ///////////////////////////////
    const initialValues = {
        oldPassword: "",
        password: "",
        confirmpassword: "",
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log("values", values);
            dispatch(change_Password(authenticateUser._id, values))
        }
    })

    useEffect(() => {
        dispatch(user_Profile())
    }, [])

  return (
    <>
       <div className='wrapper'>
                <h1>Change Password</h1>                
                    <div className="mainDiv">
                        <div className="subDiv">
                            <form className='registerform' onSubmit={formik.handleSubmit}>
                          
                                <input type="password"
                                    id="oldPassword"
                                    name="oldPassword"
                                    placeholder='Old Password'
                                    disabled={false}
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps("oldPassword")}
                                /><br />

                                <input type="password"
                                    id="password"
                                    name="password"
                                    disabled={false}
                                    placeholder=' Password'
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps("password")}
                                /><br />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.password}
                                        </div>
                                    </div>
                                ) : null}

                                <input type="password"
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    disabled={false}
                                    placeholder='confirmpassword'                              
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps("confirmpassword")}
                                /><br />
                                {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.confirmpassword}
                                        </div>
                                    </div>
                                ) : null}
                                                                                                                    
                            <button type='submit' className="registerbtn">Change Password</button>

                            </form><br />                            
                        </div>
                    </div>
            </div>    
    </>
  )
}

export default ChangePassword