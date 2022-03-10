import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArtistAndGenresCount } from '../Action/Actions'

const Dashboard = () => {
    const dispatch = useDispatch()
  
    const ArtistCount = useSelector(state => state.ArtistCount)
    const GenresCount = useSelector(state => state.GenresCount)

    useEffect(() => {
      dispatch(getArtistAndGenresCount())  
    }, [])
  
  return (
    <>
      <div className='wrapper'>
                <h1>Artist</h1>                
                    <div className="mainDiv">
                        <div className="subDiv">                              
                        <h3>Total Number of Artists</h3>
                        <p>{ArtistCount}</p>                                                      
                        </div>
                    </div>
      </div>
      
      <div className='wrapper'>
                <h1>Genres</h1>                
                    <div className="mainDiv">
                        <div className="subDiv">                              
                          <h3>Total Number of Genres</h3>
                          <p>{GenresCount}</p>                                                     
                        </div>
                    </div>
            </div>
      
    </>
  )
}

export default Dashboard