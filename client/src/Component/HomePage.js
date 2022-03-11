import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_NFT } from '../Action/Actions'

const HomePage = () => {
  const dispatch = useDispatch()
  const AudioFile = useSelector(state => state.AudioFile)
  console.log("AudioFile", AudioFile);

  useEffect(() => {
    dispatch(get_NFT())
  }, [dispatch])
  return (
    <>
        {
          AudioFile && AudioFile.map((elem) => {
            return (
                <>                  
                <div className='wrraper'>
                          <div className="mainGenres">
                            <div className="midDiv">
                                <div key={elem._id}>                                                                                                            
                                    <img width="100%" height="300vh" src={elem.NFT.coverImage} alt='coverImage'/>
                                    <h3>{elem.NFT.title}</h3>
                                    <h4 id='nftUserName'>{elem.NFT.price}</h4>
                                    <h4 id='nftUserName'>By:- @{elem.userName}</h4>
                                </div>
                            </div>
                          </div>
                    </div>  
                </>
              )
            })
        }
    </>
  )
}

export default HomePage