import { useState, useEffect } from 'react';
import logo from './logo.svg';
import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';
import './App.css';



const App=()=>{
    const [searchField, setSearchField] = useState('');//[value, setValue]
  const [monsters, setMonsters]=useState([]); 
  const [filteredMonsters, setFilterMonsters]= useState(monsters);
  console.log('Renedered')
  
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
     .then((response)=> response.json())
     .then((users)=>setMonsters(users));    
  }, []);

  useEffect(()=>{
    const newfilteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchField);
      
  }); 
  setFilterMonsters(newfilteredMonsters);

  }, [monsters, searchField])

  
       
  const onSearchChange=(event)=>{
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







// class App extends Component{ 
//   constructor(){
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     };
   
//   }
//   componentDidMount(){
    
//     fetch('https://jsonplaceholder.typicode.com/users').then((response)=> 
//     response.json())
//     .then((users)=> this.setState(()=> {
//       return {monsters: users}
//     },
//     ()=>{
//       // console.log(this.state);
//     }
//     ));
//   }
//   onSearchChange = (event)=>{
        
//     const searchField=event.target.value.toLocaleLowerCase();       
//     this.setState(()=>{
//      return {searchField};

//     });
//   }
 
//   render() {
//     const {monsters, searchField}=this.state;
//     const {onSearchChange}=this;

//     const filteredMonsters = this.state.monsters.filter((monster)=>{
//       return monster.name.toLocaleLowerCase().includes(searchField);

//      })

//     return <div className='App'>
//       <h1 className="app-title">Monsters Rolodex</h1>
      
//       {/* {
//         filteredMonsters.map((monster)=>{
//           return <div key={monster.id}>
//             <h1>{monster.name }</h1>
//           </div>;
//         })
//       }
//               */}
//       <SearchBox 
//       onChangeHandler={onSearchChange} 
//       placeholder='search monster'
//       className="search-box"
//       />
//       <CardList monsters={filteredMonsters} />
//       </div>;

//     }
//   }
  

export default App;
