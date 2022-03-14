import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_Artist, user_Profile } from '../Action/Actions'
import { Pagination } from '@material-ui/lab';
import queryString from 'query-string'
import debounce from 'lodash.debounce'



const Artists = () => {

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState(" ");
  console.log("search", search);

  const dispatch = useDispatch()

  const Artists = useSelector(state => state.Artists)
  const totalPage = useSelector(state => state.totalPage)

  console.log("totalPage", totalPage);
  console.log("Artists", Artists);


  //============================= Get Edited User Id =============================
  const {id} = queryString.parse(window.location.search);

  const handleSearch = debounce((value) => {
    setSearch(value)
  }, 500)
  
  useEffect(() => {
    dispatch(get_Artist(page, search))
  }, [page, search, dispatch])
  

  return (
    <>
      <h1>Artist List </h1>
      <div className='searchbar'>
        <input type="search" placeholder='Search Here...' onChange={(e) => handleSearch(e.target.value)} />        
      </div>
      {
        Artists && Artists.map((elem) => {
          return (
                        
            <div className='wrraper'>
              <div className="mainGenres">
                <div className="midDiv">
                  <div key={elem._id}>                                                                                                            
                    <label>{elem.userName}</label>   
                      <p>{elem.bio}</p>
                      <p>{elem.email}</p>
                      <label id="generesName">{elem.genres}</label>        
                  </div>
                </div>
              </div>
          </div>             
          )
        })
      }
      <Pagination
        count={totalPage}                            
        shape='rounded'
        variant='outlined'                    
        onChange={(event, value) => { setPage(value) }}
      /> 
    </>    
  )
  
}

export default Artists