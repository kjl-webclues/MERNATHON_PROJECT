import React, { useEffect, useState} from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register_user, valid_Register } from "../Action/Actions";
import Checkbox from "./CheckBox";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    const validRegister = useSelector(state => state.validRegister)

    const [checkGenres, setCheckGenres] = useState([]);

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
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        
        email: Yup.string()
            .email('E-mail is not valid!')
            .required('E-mail is required!'),
        
        phone: Yup.string()
            .min(10, 'too short')
            .max(12, "too long")
            .required("Phone Number is Required"),
        
        bio: Yup.string()
            .max(500, "must be 500 character or less")
            .required('Bio is required!'),
        
        role: Yup.string()
            .required('Role is Required'),
        
        password: Yup.string()
            .min(8, 'should be 8 chars minimum.')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
            .required('Password is required!'),                
        
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('Password is required!'),
        
    })

    //////////////////////////////// Formik Values ///////////////////////////////
    const initialValues = {
            firstName: "",
            lastName: "",
            userName:"",
            email: "",
            phone: "",
            bio:"",
            role: "",
            password: "",
            confirmpassword: "",
    }
    

    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit: (values) => {
            console.log("values", values);
            dispatch(register_user(values))
        },   
    })

    
    useEffect(() => {
        if (validRegister === true) {
            history.push('/loginPage')
            dispatch(valid_Register());
        }
    }, [validRegister, dispatch, history])

    return (
        <>
            <div className='wrapper'>
                <h1>Artist Form</h1>                
                    <div className="mainDiv">
                        <div className="subDiv">
                            <form className='registerform' onSubmit={formik.handleSubmit}>
                                <input type="text"
                                    name="firstName"
                                    placeholder='Enter FirstName'
                                    onChange={formik.handleChange}
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
                                    placeholder='Enter LastName'
                                    onChange={formik.handleChange}
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
                                    placeholder='Enter UserName'
                                    onChange={formik.handleChange}
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
                                    placeholder='Enter Email'
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps("email")}
                                /><br />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.email}
                                        </div>
                                    </div>
                                ) : null}
                            
                                <input type="Number"
                                    name="phone"
                                    placeholder='Enter Phone Number'
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps("phone")}
                                /><br />
                                {formik.touched.phone && formik.errors.phone ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.phone}
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
                                    
                                <h4>Genres</h4>
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
                            
                                <select className='dropdown' {...formik.getFieldProps("role")} name="role">
                                    <option value="">Select Role</option>                                                                                                                        
                                        <option value="artist">Artist</option>
                                </select><br />
                                {formik.touched.role && formik.errors.role ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.role}
                                        </div>
                                    </div>
                                ) : null}    


                                <input type="password"
                                    name='password'
                                    placeholder='Enter Password'
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
                                    name='confirmpassword'
                                    placeholder='Enter Confirm Password'
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
                                                                                                                    
                            <button type="submit" className="registerbtn">Submit</button>

                            </form><br />
                            <div className='paragrapg'>                   
                                <p>already registered <NavLink to='/loginpage'><button>Login</button></NavLink></p>
                            </div>
                        </div>
                    </div>
            </div> 
        </>
    )

}

export default RegisterForm