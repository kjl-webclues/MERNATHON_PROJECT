import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delete_Genres, get_Genres, user_Profile } from '../Action/Actions'
import { Pagination } from '@material-ui/lab';
import { NavLink } from 'react-router-dom';


const Genres = () => {
  const dispatch = useDispatch()
  //=============================useState Start==================================//
  const [page, setPage] = useState(1)

  const genres = useSelector(state => state.genres)
  const totalPage = useSelector(state => state.totalPage)
  const deleteToggle = useSelector(state => state.deleteToggle)
  
  // console.log("genres", genres);
  // console.log("deleteToggle", deleteToggle);

  //=============================Delete Genres Api==================================//
  const handleDeleteGenres = (id) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(delete_Genres(id))      
    }
  }

  //=============================Get Genres Api==================================//
  useEffect(() => {
    dispatch(get_Genres(page))
  }, [page, deleteToggle, dispatch])

  useEffect(() => {
      dispatch(user_Profile())
    }, [dispatch])

  return (
    <>
      <h1>Genres List</h1>
      <div>
        {
          <>
                {
                  genres && genres.map((elem) => {
                    return (
                      <>
                        <div className='wrraper'>
                          <div className="mainGenres">
                            <div className="midDiv">
                                <div key={elem._id}>                                                                                                            
                                  <label>{elem.title}</label>   
                                  <p>{elem.description}</p>                                                      
                                </div>
                                <NavLink to={`editGenres/:?id=${elem._id}`}><button className='editbtn'>Edit</button></NavLink>
                                <button className='deletebtn' onClick={() => handleDeleteGenres(elem._id)}>Delete</button>
                            </div>
                          </div>
                        </div>  
                      </>
                    )
                  })
                }
              </>  
        }
      </div><br/>
      <Pagination
        count={totalPage}                            
        shape='rounded'
        variant='outlined'                    
        onChange={(event, value) => { setPage(value) }}
      /> 
    </>
  )
}

export default Genres