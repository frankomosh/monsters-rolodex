import { useState, useEffect, ChangeEvent } from 'react';
// import logo from './logo.svg';
import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';
import { getData } from './utils/data.utils';
import './App.css';

export type Monster={
  id:string;
  name:string;
  email:string;
}



const App=()=>{
    const [searchField, setSearchField] = useState('');//[value, setValue]
  const [monsters, setMonsters]=useState<Monster[]>([]); 
  const [filteredMonsters, setFilterMonsters]= useState(monsters);
  console.log('Renedered')
  
  useEffect(()=>{
    
    const fetchUsers=async()=>{
      const users=await getData<Monster[]>('https://jsonplaceholder.typicode.com/users');
      setMonsters(users);

    };
    fetchUsers();
  }, []);

  useEffect(()=>{
    const newfilteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchField);
      
  }); 
  setFilterMonsters(newfilteredMonsters);

  }, [monsters, searchField])

  
       
  const onSearchChange=(event: ChangeEvent<HTMLInputElement>): void=>{
    const searchFieldString = event.target.value.toLocaleLowerCase();       
       setSearchField(searchFieldString);
  };    
 
  return(
    <div className='App'>
      <h1 className="app-title">Monsters Rolodex</h1>
           
      <SearchBox 
      className='monsters-search-box'
      onChangeHandler={onSearchChange} 
      placeholder='search monsters'
      
      /> 
      <CardList monsters={filteredMonsters} />  
      </div>


  );
}


export default App;
