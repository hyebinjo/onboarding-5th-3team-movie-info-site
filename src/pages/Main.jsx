import React, { useEffect, useRef, useState } from "react";
import { useMovieModel } from "../models/useMovieModel";
import Contents from "../component/Contents";
import Footer from "../component/Footer";
import styled from "styled-components";
import useIntersectionObserver from "../utils/useIntersectionObserver";
export default function Main() {
  const { movies, getMovies } = useMovieModel();
  const [pageNo, setPageNo] = useState(1);
  const endOfPageRef = useRef();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [hasReachedLastPage, setHasReachedLastPage] = useState(false);

  useEffect(() => {
    setIsDataLoaded(false);
    getMovies(pageNo).then((response) => {
      !response.data.results.length && setHasReachedLastPage(true);
      setIsDataLoaded(true);
    });
  }, [pageNo]);

  const [ref] = useIntersectionObserver(
    endOfPageRef,
    () => {
      if (isDataLoaded) setPageNo(pageNo + 1);
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
