import React from 'react'
import Listitems from './Listitems'
 
const UnListitems = ({items ,handleCheck ,handleDelete}) => {
  return (
    <>
    
    {items.map((item) => (
<ul key={item.id}>
     < Listitems
     item = {item}
     handleCheck = {handleCheck}
     handleDelete = {handleDelete}
     />
     </ul>
    ))}
   </>
    )
  
}

export default UnListitems