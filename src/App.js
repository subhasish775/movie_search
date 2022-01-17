import axios from 'axios';
import React, { useState } from 'react';
import styled from "styled-components";
import MovieComponent from './components/MovieComponent';
import MovieInfoComponent from './components/MovieInfoComponent';
export const API_KEY = "93fea1af";
const Container =styled.div`
display:flex;
flex-direction:column;
`;
const Header = styled.div`
display:flex;
flex-direction:row;
align-items:center;
background-color:black;
color:white;
padding:10px;
font-size:25px;
font-weight:bold;
justify-content:space-between;
box-shadow:0 3px 6px 0 #555;
`;
const AppName= styled.div`
display:flex;
flex-direction:row;
align-items:center;
`;
const MovieImage = styled.img`
width:48px;
height:48px;
margin:15px;
`;
const SearchBox= styled.div`
display:flex;
flex-direction:row;
background-color:white;
padding:10px 10px;
margin-left:20px;
width:50%;
border-radius:15px;
align-items:center;
`;
const SearchIcon = styled.img`
width:32px;
height:32px;
`;
const SearchInput = styled.input`
color:black;
font-size:16px;
font-weight:bold;
border:none;
outline:none;
margin-left:15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
`;
const Placeholder = styled.img`
width:120px;
height:120px;
margin:150px;
opacity:50%;
`;
function App() {
  const [searchQuery, setSearchQuery] = useState();
  const [timeoutId, setTimeoutId]= useState()
  const [movieList, setMovieList] =useState([])
  const [selectMovie, setSelectMovie] =useState()
  const fetchData = async (searchString)=>{
    const response =await axios.get(`http://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
    setMovieList(response.data.Search)
  }
  const onTextChange =(e)=>{
    clearTimeout(timeoutId)
    e.preventDefault();
  setSearchQuery(e.target.value);
  const timeout= setTimeout(()=> fetchData(e.target.value),500
  )
setTimeoutId(timeout);
  };
  return (
    <Container>
    <Header>
    <AppName>
    <MovieImage src="/movie-icon.svg" />
    React Movie App
    </AppName>
    <SearchBox>
    <SearchIcon  src="/search-icon.svg"/>
    <SearchInput placeholder="Search Movies" 
    value={searchQuery}
    onChange={onTextChange}/>
    </SearchBox>
    </Header>
    {selectMovie && <MovieInfoComponent selectMovie={selectMovie} setSelectMovie={setSelectMovie}/>}
      <MovieListContainer>
     {movieList?.length ? movieList.map((movie, index)=><MovieComponent key={index} movie={movie}
       setSelectMovie={setSelectMovie}
     />): (
       <Placeholder src="/movie-icon.svg" />
     )}
     
      </MovieListContainer>
    </Container>
  );
}

export default App;
