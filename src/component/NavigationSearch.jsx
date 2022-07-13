import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIco } from "../images/icons/search-svgrepo-com.svg";
import { useNavigate } from "react-router";
import { useMovieModel } from "../models/useMovieModel";
import HighlightText, { getRegex } from "./HighlightText";

export default function NavigationSearch() {
  const { movies, getMovies } = useMovieModel();
  const searchRef = useRef();
  const searchBoxRef = useRef();
  const [relatedSearch, setRelatedSearch] = useState();
  const [searchReady, setSearchReady] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMovies();
  },[])
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
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
    const path = searchRef.current.value;
    event.preventDefault();
    saveRecentlySearch(searchRef.current.value);
    searchRef.current.value = "";
    setSearchReady(false)
    setSearchShow(false)
    searchRef.current.blur()
    navigate(`/search/${path}`);
  };

  const moveToSearchBoxPath = (event) => {
    const searchClick = event.target.innerText.split("\n",1).toString();
    navigate(`/search/${searchClick}`);
    
    setSearchShow(false)
    
  };

  const checkFuzzyStringMatch = (term) => {
    return movies?.filter((movie) => getRegex(term).test(movie.title));
  };

  const getSearchMovieTitle = (searchInput) => {
    const result = checkFuzzyStringMatch(searchInput);
    setRelatedSearch(result);
  };

  const getRecentlySearch = () => {
    const getRecent = localStorage.getItem("searchRecent");
    setRecentSearches(getRecent !== null && getRecent !== ""  && getRecent.split(","));
  };

  const saveRecentlySearch = (string) => {
    const getRecent = localStorage.getItem("searchRecent");
    console.log(getRecent);
    const recentArr = `${
      getRecent === null || getRecent === "" ? string : string + "," + getRecent
    }`;
    handleLocalStorage(recentArr)
    setRecentSearches(recentArr !== null && recentArr.split(","));
  };

  const removeRecentlySearch = (event) => {
    if(recentSearches.length === 1) setSearchShow(false) // 마지막 검색어 삭제되면 searchBox 삭제 !!
    event.stopPropagation();
    const targetRecently = event.target.parentElement.innerText.split("\n",1).toString()
    const recentArr = recentSearches.filter((word) => word !== targetRecently);
    handleLocalStorage(recentArr)
    setRecentSearches(recentArr);
    
    
  }
  const handleLocalStorage = (value) => {
    localStorage.removeItem("searchRecent");
    localStorage.setItem("searchRecent", value);
  }
  const searchOnChange = () => {
    const searchInput = searchRef.current.value;
    if (searchInput === "") {
      setSearchReady(false);
      return;
    }
    setSearchReady(true);
    setSearchShow(true);
    processChanges(searchInput)
  };
  
  const debounce = (callback,delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(()=> 
        {console.log("args",...args)
        callback(...args)}
      ,delay)
    }
  }
  const processChanges = debounce((value) => getSearchMovieTitle(value),200);
  return (
    <SearchWrap show={searchShow} ref={searchBoxRef}>
      <form onSubmit={(event) => moveToSearchPath(event)}>
        <SearchIco />
        <input
          ref={searchRef}
          placeholder="보고싶은 영화 ?"
          onChange={searchOnChange}
          onFocus={() => {
            if(recentSearches.length > 0)
            setSearchShow(true)
          }}
        />
      </form>
      <SearchBox show={searchShow}>
        <RecentWrap show={searchShow}>
          <SearchOption show={searchShow}>
            {searchReady ? "추천 검색어" : "최근 검색어"}
          </SearchOption>
          {searchReady
            ? relatedSearch?.map((item, index) => (
                <SearchItem
                  show={searchShow}
                  onClick={(event) => moveToSearchBoxPath(event)}
                  key={index}
                  style={{display: searchShow && "block"}}
                >
                  <HighlightText
                    title={item.original_title}
                    term={searchRef.current.value}
                  />
                </SearchItem>
              ))
            : recentSearches.length > 0 &&
              recentSearches?.map((item, index) =>
                index > 4 ? null : (
                  <SearchItem
                    onClick={(event) => moveToSearchBoxPath(event)}
                    show={searchShow}
                    key={index}
                    style={{display: searchShow && "flex"}}
                  >
                    <Item>{item}</Item>
                    <ItemRemove onClick={removeRecentlySearch}>
                      X
                    </ItemRemove>
                  </SearchItem>
                )
              )}
        </RecentWrap>
      </SearchBox>
    </SearchWrap>
  );
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
    border-radius: ${(props) =>
      props.show ? "5px 5px 0 0" : "5px 5px 5px 5px"};
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
  height: 12rem;
  overflow-y: scroll;
  color: black;
  background-color: white;
  /* transition: all 1s ease; */
  ${(props) =>
    props.show &&
    `
    padding-bottom: 5px;
  `}
  ::-webkit-scrollbar {
    display: none;
  }
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
    
    border: 1px solid black
    font-size: 16px;
    justify-content: space-between;
  `}
  :hover {
    background-color: rgb(0, 0, 0, 0.3);
  }
`;
const Item = styled.div`
  background-color: transparent;
`;
const ItemRemove = styled.div`
  background-color: transparent;
  color: black;
  :hover{
    color: red;
  }
`;