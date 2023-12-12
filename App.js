import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import AddItem from "./AddItem";
import SearchItems from "./SearchItems";
import { useEffect } from "react";

function App() {
    const API_URl='http://localhost:3500/items';
    const [items, setItems]=useState([]);
    const [newItem, setNewItem]=useState('')
    const [search,setSearch]=useState('')
    const [fetchError,setFetchError]=useState(null)
  useEffect(()=>{
     const fetchItems = async()=>{
      try {
        const response=await fetch(API_URl);
        if(!response.ok) throw('data not recevied')
        const listItems=await response.json();
        setItems(listItems);
        setFetchError(null)
      } catch (error) {
        setFetchError(error.message)
      }
     }
    (async()=>await fetchItems())()
  },[])
  const addItem=(item)=>{
    const id=items.length?items[items.length-1].id+1:1;
    const addNewItem={id,checked:false,item}
    const listItems=[...items,addNewItem]
    setItems(listItems)
     
  }
  const handleCheck=(id)=>{
    const listItems=items.map((item)=>item.id===id?{...item,checked:!item.checked}:item)
    setItems(listItems)
     
  }
  const handleDelete=(id)=>{
    const listItems=items.filter((item)=>item.id!==id)
    setItems(listItems)
     
  }
 const handleSubmit=(e)=>{
    e.preventDefault()
  if(!newItem)return;
  console.log(newItem)
  addItem(newItem)
  //add
  setNewItem('')
  }
  
  return (
    <div className="App"> 
          <Header/>
          <AddItem
            newItem={newItem}
            setNewItem={setNewItem}
            handleSubmit={handleSubmit}
             />
             <SearchItems
             search={search}
             setSearch={setSearch}
             />
      <main> 
        {fetchError&&<p>{`Error:${fetchError}`}</p>}
           <Content 
           items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
           handleCheck={handleCheck}
           handleDelete={handleDelete}
          />
       </main>   
          <Footer
          length={items.length}/>
       
    </div>
    
  );
}

export default App;
