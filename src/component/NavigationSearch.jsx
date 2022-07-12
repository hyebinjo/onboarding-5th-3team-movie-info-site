import React,{useState,useEffect,useRef} from "react";
import styled from "styled-components";
import { ReactComponent as SearchIco } from "../images/icons/search-svgrepo-com.svg";
import { useNavigate } from "react-router";
import { useMovieModel } from "../models/useMovieModel";

export default function NavigationSearch() {
  const {movies , getMovies} = useMovieModel();
  const searchRef = useRef();
  const searchBoxRef = useRef();
  const [relatedSearch, setRelatedSearch] = useState();
  const [searchReady, setSearchReady] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(()=>{
    getMovies();
  },[])
  const navigation = useNavigate();
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setSearchShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
  }, [searchBoxRef]);
  useEffect(() => {
    if (movies) {
      getRecentlySearch();
    }
  }, [movies]);
  const moveToSearchPath = (event) => {
    event.preventDefault();
    saveRecentlySearch(searchRef.current.value);
    navigation(`/search/${searchRef.current.value}`);
    searchRef.current.value = "";
  };
  const moveToSearchBoxPath = (event) => {
    const searchClick = event.target.innerText;
    navigation(`/search/${searchClick}`);
  };


  const getSearchMovieTitle = (searchInput) => {
    const result = movies?.results.filter((movie) => {
      return movie.original_title.toLowerCase().slice(0, searchInput.length).includes(searchInput.toLowerCase());
    });
    setRelatedSearch(result);
  };

  
  const getRecentlySearch = () => {
    const getRecent = localStorage.getItem("searchRecent");
    setRecentSearches(getRecent !== null && getRecent.split(","));
  };

  const saveRecentlySearch = (string) => {
    const getRecent = localStorage.getItem("searchRecent");
    const recentArr = `${getRecent === null ? string : string + "," + getRecent}`;
    localStorage.removeItem("searchRecent");
    localStorage.setItem("searchRecent", recentArr);
    setRecentSearches(getRecent !== null && getRecent.split(","));
  };

  const searchOnChange = () => {
    const searchInput = searchRef.current.value;
    if (searchInput === "") {
      setSearchReady(false);
      return;
    }
    setSearchReady(true);
    getSearchMovieTitle(searchInput);
  };
  return(
    
      <SearchWrap show={searchShow} ref={searchBoxRef}>
          <form onSubmit={(event) => moveToSearchPath(event)}>
            <SearchIco />
            <input ref={searchRef} placeholder="보고싶은 영화 ?" onChange={searchOnChange} onFocus={() => setSearchShow(true)} />
          </form>
          <SearchBox show={searchShow}>
            <RecentWrap show={searchShow}>
              <SearchOption show={searchShow}>{searchReady ? "추천 검색어" : "최근 검색어"}</SearchOption>
              {searchReady
                ? relatedSearch.map((item, index) => (
                    <SearchItem show={searchShow} onClick={(event) => moveToSearchBoxPath(event)} key={index}>
                      {item.original_title}
                    </SearchItem>
                  ))
                : recentSearches.length > 0 &&
                  recentSearches?.map((item, index) =>
                    index > 4 ? null : (
                      <SearchItem onClick={(event) => moveToSearchBoxPath(event)} show={searchShow} key={index}>
                        {item}
                      </SearchItem>
                    )
                  )}
            </RecentWrap>
          </SearchBox>
        </SearchWrap>
  )
}
const SearchWrap = styled.div`
  position: relative;
  @media (max-width: 768px) {
    display: none;
  }
  form {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18vw;
    border: 1px solid #d2cbcbcc;
    background-color: white;
    border-radius: ${(props) => (props.show ? "5px 5px 0 0" : "5px 5px 5px 5px")};
    input {
      width: 100%;
      margin-left: 10px;
      font-size: 16px;
      white-space: nowrap;
      border: none;
      border-radius: 5px;
      :focus {
        outline: 0;
      }
    }
  }
  svg {
    margin-left: 5px;
    fill: gray;
    width: 24px;
    height: 24px;
    padding: 4px;
  }
`;
const SearchBox = styled.div`
  position: absolute;
  display: flexbox;
  width: 18vw;
  font-size: 16px;
  border-radius: 0 0 5px 5px;
  background-color: white;
  visibility: hidden;
  border: 1px solid #d2cbcbcc;

  ${(props) =>
    props.show &&
    `
    visibility:visible;

  `}
  div {
    color: black;
  }
`;
const RecentWrap = styled.div`
  width: 100%;
  padding-bottom: 0px;
  overflow: hidden;
  color: black;
  background-color: white;
  /* transition: all 1s ease; */
  ${(props) =>
    props.show &&
    `
    padding-bottom: 5px;
  `}
`;
const SearchOption = styled.div`
  display: none;
  margin: 5px 5px;
  border: none;
  font-size: 0px;
  font-weight: bold;
  transition: all 2s ease;
  background-color: white;
  ${(props) =>
    props.show &&
    `
    display:block;
    font-size: 16px;
  `}
`;
const SearchItem = styled.div`
  background-color: white;
  display: none;
  animation: fadeInText 3s 2s ease-out forwards;
  padding: 5px 10px;
  margin: 5px 5px 0 5px;
  font-size: 16px;
  font-weight: 400;
  border-radius: 5px;
  border: 1px solid #d2cbcbcc;
  transition: all 1s ease;
  cursor: pointer;
  /* border: 1px solid black; */
  ${(props) =>
    props.show &&
    `
    display:block;
    border: 1px solid black
    font-size: 16px;
  `}
  :hover {
    background-color: rgb(0, 0, 0, 0.3);
  }
`;
