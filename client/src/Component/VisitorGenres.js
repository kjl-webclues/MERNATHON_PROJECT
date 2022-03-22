import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_Genres, user_Profile } from '../Action/Actions'
import { Pagination } from '@material-ui/lab';
import debounce from 'lodash.debounce'


const Genres = () => {
  const dispatch = useDispatch()
  
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("");

  const genres = useSelector(state => state.genres)
  const totalPage = useSelector(state => state.totalPage)
  
  // console.log("genres", genres);
  console.log("search", search);

  const handleSearch = debounce((e) => {
    setSearch(e.target.value)
  }, 500)
  useEffect(() => {
    dispatch(get_Genres(page,search))
  }, [page,search, dispatch])

  useEffect(() => {
      dispatch(user_Profile())
    }, [])

  return (
    <>
      <h1>Genres List</h1>
       <div className='searchbar'>
        <input type="search" placeholder='Search Here...' onChange={(e) => handleSearch(e)} />        
      </div>
      <div>
        {
          <>
                {
                  genres && genres.map((elem) => {
                    return (
                      <>
                        <div className="mainGenres">
                          <div className="midDiv">
                              <div key={elem._id}>                                                                                                            
                                <label>{elem.title}</label>   
                                <p>{elem.description}</p>                                                      
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