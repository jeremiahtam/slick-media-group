import React, { useEffect, useCallback, useState } from 'react'
import { Container, Alert, Accordion, FormControl, Navbar, Form, Card, Button, Stack, Image, Row, Col, Pagination } from 'react-bootstrap'
import axios from 'axios'

const HomeScreen = (props) => {

  const [movieTitle, setMovieTitle] = useState('');
  const [searchError, setSearchError] = useState('');
  const [movies, setMovies] = useState();

  // const [allPeople, setAllPeople] = useState([]);
  // const [diplayedList, setDisplayedList] = useState([]);
  // const [savedList, setSavedList] = useState([]);
  // const [removedList, setRemovedList] = useState([]);

  // const perPageOptions = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  // const [paginatedDisplay, setPaginatedDisplay] = useState({
  //   totalItems: [],
  //   totalPages: 1
  // });

  // const { totalItems } = paginatedDisplay;

  // const [frontEndPagination, setFrontEndPagination] = useState({
  //   usersPerPage: 10,
  //   currentPage: 1,
  // });
  // useEffect(() => {
  //   paginatedlDisplay()
  // }, [frontEndPagination, diplayedList])

  // const paginatedlDisplay = () => {
  //   const indexOfLastItem = frontEndPagination.currentPage * frontEndPagination.usersPerPage;
  //   const indexOfFirstItem = indexOfLastItem - frontEndPagination.usersPerPage;
  //   const currentList = diplayedList.slice(indexOfFirstItem, indexOfLastItem);
  //   const totalPages = Math.ceil(diplayedList.length / frontEndPagination.usersPerPage);
  //   setPaginatedDisplay({ ...paginatedDisplay, ...{ totalItems: currentList, totalPages: totalPages } })
  // }

  // useEffect(() => {
  //   filterPeople()
  // }, [allPeople, removedList])

  // const filterPeople = () => {
  //   const removedItems = removedList.map(i => { return i.uuid; });
  //   const displayedPeople = allPeople.filter(people => !removedItems.includes(people.uuid));
  //   setDisplayedList(displayedPeople)
  // }

  useEffect(() => {
    getPeopleHandler()
    console.log(movies)
  }, [movieTitle])

  // /* get data from database */
  const getPeopleHandler = async () => {

    try {
      const res = await axios.get('http://www.omdbapi.com/', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        params: {
          s: movieTitle,
          apikey: 94288670
        }
      })
      const resData = await res.data
      console.log(resData)
      if (resData.Response == 'True') {
        setMovies(resData.Search)
      } else {
        return {
          'error': true,
          'message': 'Empty search query'
        };
      }
    } catch (error) {
      return {
        'error': true,
        'message': 'Fetch Error: ' + error
      };
    }
  }

  return (
    <div className='main-container'>
      <div className='heading'>
        <div className='rectangle1'></div>
        <div className='logo'>
          <img src={process.env.PUBLIC_URL + '/images/MyTestApp.png'} className='image' />
          <div className='rectangle2'></div>
        </div>
      </div>
      <div className='hero'>
        <div className='hero-text'>
          Watch something incredible.
        </div>
        <div className='rectangle5' style={{ backgroundImage: 'url(' + '/images/rectangle5.png' + ')' }}></div>
      </div>
      <div className='search'>
        <div className='search-text'>Search</div>
        <input type='text' className='search-bar' value={movieTitle} onChange={(e) => {
          setMovieTitle(e.target.value)
        }} />
      </div>
      <div className='movieset'>
        <div className='movieset-category'>Movies</div>
        <div className='movieset-frame'>
          {movies && movies.map((item, key) => {
            return (
              <div key={key}>
                <div className='movie'>
                  <div className='movie-name'>{item.Title}</div>
                </div>

              </div>
            )
          })
          }
        </div>
      </div>
    </div >
  )
}

export default HomeScreen
