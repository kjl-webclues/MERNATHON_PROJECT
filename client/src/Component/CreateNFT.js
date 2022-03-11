import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { add_NftImage, upload_AudioFile, upload_NFT } from '../Action/Actions';

const CreateNFT = () => {
    const [coverImage, setCoverImage] = useState(''); //For Get Banner
    const [audioFile, setAudioFile] = useState('')//For Get AudioFile 
    const [value, setvalue] = useState(''); //For Get Banner

    console.log("coverImage", coverImage);
    console.log("audioFile", audioFile);

    
    const dispatch = useDispatch()
    const history = useHistory()

    const Toggle = useSelector(state => state.Toggle)
    const authenticateUser = useSelector(state => state.authenticateUser)

    const CoverImage = useSelector(state => state.CoverImage)
    const AudioFile = useSelector(state => state.AudioFile)

    const userId = authenticateUser._id
    console.log("userId", userId);

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .max(20, "must be 20 character or less")
            .required("Title is Required!"),
        
        description: Yup.string()
            .max(255, "must be 255 character or less")
            .required("NFT Description is Required!"),
        
        price: Yup.string()
            .required("Price is Requird!")
    })

    //=======================Formik Values====================//
    const initialValues = {
        title: '',
        description: '',
        price: ''
    }

    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit: (values) => {   
            console.log("values", values);
                const formData = new FormData();
                formData.append('audio', audioFile[0]);
                setvalue(values)                                             
                dispatch(upload_AudioFile(formData))
        }     
    })

    
    useEffect(() => {
        if (AudioFile.length !== 0) {
            const formData = new FormData();
            formData.append('image', coverImage[0]);
            dispatch(add_NftImage(formData));
        }
    }, [AudioFile]);

    useEffect(() => {
        if (AudioFile.length !== 0 && CoverImage.length !== 0) {
            dispatch(upload_NFT(userId, value, AudioFile, CoverImage));
            setvalue('')
        }
    }, [AudioFile, CoverImage]);

    //============================= toggle UseEffect =============================//
    useEffect(() => {
    if(Toggle === true){
      //============================= Navigate to profile =============================//
      history.push('/');
    }
}, [Toggle, history])

  return (
      <>
          <div className='wrapper'>
              <h1>Create NFT</h1>
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

                                <input type="number"
                                    name="price"
                                    placeholder='Enter Price'
                                    onChange={formik.handleChange}
                                    {...formik.getFieldProps("price")}
                                /><br />
                                {formik.touched.price && formik.errors.price ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block error">
                                            {formik.errors.price}
                                        </div>
                                    </div>
                                ) : null}    
                                <label>AudioFile</label><br/>
                                <input type="file"   onChange={(e) => setAudioFile(e.target.files)} /><br />

                                <label>CoverImage</label><br/>                            
                                <input type="file"  className="nftImage" onChange={(e) => setCoverImage(e.target.files)} /><br />
                                                            
                                <button className='registerbtn' type='submit'>Publish</button>                                 

                            </form><br />                            
                        </div>
                    </div>
            </div> 
    </>
  )
}

export default CreateNFT