import React from 'react';
import styled from 'styled-components';

import Thumbnail from './Thumbnail';

const Contents = ({ movies }) => {
  return (
    <Container>
      {movies.results?.length ? (
        movies.results.map((movie) => (
          <Thumbnail key={movie.id} movie={movie} />
        ))
      ) : (
        <p>영화 목록이 없습니다</p>
      )}
    </Container>
  );
};

export default Contents;

const Container = styled.div`
  overflow-y: scroll;
  padding: 0 2rem;
  gap: 2rem;
  height: 100%;
  padding-top: 80px;
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
