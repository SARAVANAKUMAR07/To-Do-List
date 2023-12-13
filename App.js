 import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import AddItem from "./AddItem";
import SearchItems from "./SearchItems";
import { useEffect } from "react";
import apiRequest from "./apiRequest";

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
  const addItem=async(item)=>{
    const id=items.length?items[items.length-1].id+1:1;
    const addNewItem={id,checked:false,item}
    const listItems=[...items,addNewItem]
    setItems(listItems)

    const postOption={
      method:'POST',
      headers:{
        'Content-Type':'application/json'  
      }, 
      body:JSON.stringify(addNewItem)
    }
    const result= await apiRequest(API_URl,postOption)
    if(result) setFetchError(result)

     
  }
  const handleCheck=async (id)=>{
    const listItems=items.map((item)=>item.id===id?{...item,checked:!item.checked}:item)
    setItems(listItems)
    const myItem=listItems.filter((item)=>item.t=id===id)
    const updateOption={
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'  
      }, 
      body:JSON.stringify({checked:myItem[0].checked})
    }
    const reqUrl=`${API_URl}/${id}`
    const result= await apiRequest(reqUrl,updateOption)
    if(result) setFetchError(result)
     
  }
  const handleDelete=async(id)=>{
    const listItems=items.filter((item)=>item.id!==id)
    setItems(listItems)
    const deleteOption={method:'DELETE'}
    const reqUrl=`${API_URl}/${id}`
    const result= await apiRequest(reqUrl,deleteOption)
    if(result) setFetchError(result)
     
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
