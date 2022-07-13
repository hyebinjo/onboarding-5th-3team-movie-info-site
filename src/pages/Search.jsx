import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMovieModel } from "../models/useMovieModel";
import Contents from "../component/Contents";
import styled from "styled-components";
import useIntersectionObserver from "../utils/useIntersectionObserver";
import Footer from "../component/Footer";

export default function Search() {
  const { movies, searchMovies } = useMovieModel();
  const pageNo = useRef(1);
  const endOfPageRef = useRef();
  const { movieTitle } = useParams();
  const [hasReachedLastPage, setHasReachedLastPage] = useState(false);

  const noPageReceived = (response) => !response.data.results.length;

  const initiatePage = () => {
    pageNo.current = 1;
    setHasReachedLastPage(false);
    console.log("page:", pageNo, "movieTitle: ", movieTitle);
    window.scrollTo(0, 0);
  };

  const loadPage = () => {
    searchMovies(movieTitle, pageNo.current++).then((response) => {
      if (noPageReceived(response)) setHasReachedLastPage(true);
    });
  };

  useEffect(() => {
    initiatePage();
    loadPage();
  }, [movieTitle]);

  const [ref] = useIntersectionObserver(
    endOfPageRef,
    () => {
      if (!hasReachedLastPage) loadPage();
    },
    [movies]
  );

  return (
    <>
      <Contents movies={movies} />
      {hasReachedLastPage || movies.length < 20 ? <Footer /> : <EndOfPageDetector ref={ref} />}
    </>
  );
}

const EndOfPageDetector = styled.div`
  width: 100%;
  height: 30px;
`;
