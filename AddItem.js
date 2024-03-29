 import React from 'react'
 import { FaPlus } from 'react-icons/fa'
 import { useRef } from 'react'

const AddItem = ({newItem,setNewItem,handleSubmit}) => {
   const inputRef=useRef()
  return (
     <form className="addForm" onSubmit={handleSubmit}>
        <label htmlFor="addForm"></label>
        <input  
           autoFocus
           ref={inputRef}
           id='addItem'
           type='text'
           placeholder='add Item'
           required
           value={newItem}
           onChange={(e)=> setNewItem(e.target.value)}
         />
         <button 
            type="submit"
            aria-label='Add Item'
            onClick={()=>inputRef.current.focus()}>
            <FaPlus/>

               
         </button>
     </form>
  )
}

export default AddItem