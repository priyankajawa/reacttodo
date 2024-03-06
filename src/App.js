import Footer from './Footer';
import { useEffect, useState } from 'react';
import Main from './Main';
import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

function App() {
    const API_URL = 'http://localhost:3500/';
    const [items , setItems] = useState([]);
    const [newItem , setNewItem] = useState('');
    const [search , setSearch] = useState('');
    const [fetchError , setFetchError] = useState(null);
    const [isLoading , setIsLoading] = useState(true);

    useEffect(() =>{
        const fetchItems = async () => {
          try{
            const response = await fetch(API_URL);
            if(!response.ok) throw Error("Data not Received yet");
            const listItems = await response.json();
            console.log(listItems);
            setItems(listItems);
            setFetchError(null);
          }catch (err){
            setFetchError(err.message);
          }finally{
            setIsLoading(false)
          }
        };
          setTimeout(() => {
            (async () => await fetchItems())() ;
          } ,2000);
          
    } , []);



    const addItem = async (item) => {
    const newId = Math.max(...items.map(item => parseInt(item.id)), 0) + 1;
    const addNewItem = { id: newId.toString(), checked: false, item: item };
    const listItems =[...items , addNewItem]
    setItems(listItems)
   
    const postOptions ={
      method :'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(addNewItem)
    }
    
     const result = await apiRequest(API_URL , postOptions)
     if (result) setFetchError(result); 
    }
    
    
  const handleCheck = async (id) => {
    const listItems = items.map(( item) => 
    item.id===id ? { ...item,checked:!item.checked}:item)
    setItems(listItems)
    
  const myItem = listItems.filter((item) => item.id===id)
  const updateOptions ={
    method :'PATCH',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({checked : myItem[0].checked})
  }
   const reqURL = `${API_URL}/${id}`
   const result = await apiRequest(reqURL , updateOptions)
   if (result) setFetchError(result) 
  }

   
  const handleDelete = async (id) => {
    const listItems = items.filter((item) =>
    item.id!==id)
    setItems(listItems)
    
   const deleteOptions ={
    method : 'DELETE'
  }

   const reqURL = `${API_URL}/${id}`
   const result = await apiRequest(reqURL , deleteOptions)
   if (result) setFetchError(result) 

  }
  const handleSubmit = (e) => {
    e.preventDefault ()
    if(!newItem) return;
    addItem(newItem)
    setNewItem('')
  }
  

  return (
    <div className="App">
   <Header title = "My first to do List"/>
   <AddItem 
   newItem = {newItem} 
   setNewItem = {setNewItem}
   handleSubmit = {handleSubmit}
   />
   <SearchItem
   search = {search}
   setSearch = {setSearch}
    />
    <main>
    {isLoading && <p> Items are Loading....</p>}
    {fetchError && <p>{`Error: ${fetchError}`}</p>}
    {!isLoading && !fetchError && <Main
   items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase())) }
   handleCheck = {handleCheck}
   handleDelete = {handleDelete}
  />}
  </main>



  <Footer
  length = {items.length} />
    </div>
  );
    }

export default App
