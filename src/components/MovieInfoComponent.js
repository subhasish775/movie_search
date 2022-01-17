import React, { useEffect,useState } from 'react';
import {API_KEY} from '../App';
import styled from 'styled-components';
import axios from 'axios';
// const API_KEY=  "93fea1af";
const Container = styled.div`
display:flex;
flex-direction:row;
padding:20px 30px;
justify-content:center;
border-bottom:1px solid lightgray;
`;
const CoverImage = styled.img`
fit-object:cover;
height:400px;
`;
const InfoColumn = styled.div`
display:flex;
flex-direction:column;
margin:20px;
`
const MovieName= styled.span`
font-size:22px;
font-weight:600;
color:black;
margin:15px 0;
white-space:nowrap;
text-overflow:ellipsis;
overflow:hidden;
text-transform:capitalize;

`
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
 opacity:0.6;
  }
  `;
  const Close = styled.span`
  font-size:16px;
  font-weight:600;
  color:black;
  background:lightgray;
  height:fit-content;
  padding:8px;
  border-radius:50%;
  cursor:pointer;
  opacity:0.8;
  `
const MovieInfoComponent=(props)=>{
 
    const [movieInfo, setMovieInfo]= useState()
    const { selectMovie} = props;
    useEffect(() => {
        axios.get(
          `https://www.omdbapi.com/?i=${selectMovie}&apikey=${API_KEY}`
        ).then((response) => setMovieInfo(response.data));
      }, [selectMovie]);
    return (
     
        <Container>
         {movieInfo ? (
        <>
        <CoverImage src={movieInfo?.Poster}/>
        <InfoColumn>
            <MovieName>
             {movieInfo?.Type}: {movieInfo?.Title}
            </MovieName>
            <MovieInfo> IMDB Rating: <span>{movieInfo?.imdbRating}</span></MovieInfo>
            <MovieInfo> IMDB Rating: <span>{movieInfo?.Year}</span></MovieInfo>
            <MovieInfo> IMDB Rating: <span>{movieInfo?.Language}</span></MovieInfo>
            <MovieInfo> IMDB Rating: <span>{movieInfo?.Rated}</span></MovieInfo>
            <MovieInfo> IMDB Rating: <span>{movieInfo?.Released}</span></MovieInfo>
            <MovieInfo> IMDB Rating: <span>{movieInfo?.Runtime}</span></MovieInfo>
            <MovieInfo> IMDB Rating: <span>{movieInfo?.Genre}</span></MovieInfo>
            <MovieInfo> IMDB Rating: <span>{movieInfo?.Director}</span></MovieInfo>
            <MovieInfo> IMDB Rating: <span>{movieInfo?.Actors}</span></MovieInfo>
            <MovieInfo> IMDB Rating: <span>{movieInfo?.Plot}</span></MovieInfo>
        </InfoColumn>
        <Close onClick={()=>props.setSelectMovie()}>X</Close>
        </>
        ) : (
          "Loading..."
        )}
        </Container>
    )
}
export default MovieInfoComponent;