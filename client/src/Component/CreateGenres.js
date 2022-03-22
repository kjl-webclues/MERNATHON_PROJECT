import React, { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch, useSelector } from "react-redux";
import { add_Genres, edit_Genres, update_Genres } from "../Action/Actions";

const CreateGenres = () => {
    const { id } = queryString.parse(window.location.search)
    
    const dispatch = useDispatch()
    const history = useHistory()

    const [editObject, setEditObject] = useState([]);

    const Toggle = useSelector(state => state.Toggle)

    const genres = useSelector(state => state.genres)


    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .max(20, "must be 20 character or less")
            .required("Title is Required!"),
        
        description: Yup.string()
            .max(255, "must be 255 character or less")
            .required("Genres Description is Required!"),
    })

    //=======================Formik Values====================//
    const initialValues = {
        title: '',
        description: ''
    }

    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit: (values) => {
            if (id) {
                dispatch(update_Genres(id, values))
            } else {
                dispatch(add_Genres(values))                
            }            
        }
    })
    
    //============================= get selectedEdit object =============================//

    useEffect(() => {
        if (id) {
            setEditObject(edit_Genres)
        }
    }, [id])
    const edit_Genres = genres.find((elem) => elem._id === id ? elem : null)
    // console.log("edit_Genres", edit_Genres);


    //============================= set update values =============================//
    useEffect(() => {
        if (id && editObject) {
            formik.setValues(editObject)
        }
    }, [editObject, id])

    //============================= toggle UseEffect =============================//
    useEffect(() => {
    if(Toggle === true){
      //============================= Navigate to profile =============================//
      history.push('/adminGenres');
    }
    }, [Toggle, history])    

    return (
        <>
            <div className='wrapper'>
                {id ? <h1>Update Genres</h1> :<h1>Create Genres</h1>}                
                    <div className="mainDiv">
                        <div className="subDiv">
                            <form className='registerform' onSubmit={formik.handleSubmit}>
                                <input type="text"
                                    name="title"
                                    placeholder='Enter Title'
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps("title")}
                                /><br />
                                {formik.touched.title && formik.errors.title ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.title}
                                        </div>
                                    </div>
                                ) : null}        

                                <input type="text"
                                    name="description"
                                    placeholder='Enter Descriptin'
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps("description")}
                                /><br />
                                {formik.touched.description && formik.errors.description ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.description}
                                        </div>
                                    </div>
                                ) : null}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                            {!id ? (
                                    <button className='registerbtn' type='submit'>Submit</button>)
                                    :
                                    (<button className='registerbtn' type='update'>Update</button>)
                                }

                            </form><br />                            
                        </div>
                    </div>
            </div> 
        </>
    )
}

export default CreateGenres