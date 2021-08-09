import React, {useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Search from './components/Search';
import Header from './components/Header';
import Pagination from './components/Pagination';
import CharacterGrid from './components/character/CharacterGrid';

const App = () =>  {
  const [items,setItems] = useState([])
  const [isLoading,setIsLoading] = useState(true) 
  const [query,setQuery] = useState("") 
  const [currentPage,setCurrentPage] = useState(1) 
  const [postsPage] = useState(10) 

  useEffect(() =>{
    const fetchItems = async () =>{
      const result = await axios(`https://www.breakingbadapi.com/api/characters?name=${query}`)

      console.log(result.data)

      setItems(result.data)
      setIsLoading(false)
    }

    fetchItems()
  }, [query])

  // Pagination
  const indexOfLastImg = currentPage * postsPage;
  const indexOfFirstImg = indexOfLastImg - postsPage;
  const currentImg = items.slice(indexOfFirstImg, indexOfLastImg)
 
  // change page
const paginate = pageNumbers => setCurrentPage(pageNumbers)

  return (
    <div className="container">
      <Header/>
      <Search getQuery={(q) =>{
        setQuery(q)
      }}/>
      <CharacterGrid isLoading={isLoading} items={currentImg}/>
      <Pagination postsPage={postsPage} totalposts={items.length} paginate={paginate}/>
    </div>
  );
}

export default App;
