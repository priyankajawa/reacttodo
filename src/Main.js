import React from 'react'
import UnListitems from './UnListitems'
const Main = ({items , handleCheck ,handleDelete}) => {
  return (
    <>
    {(items.length)?(
 <UnListitems
 items = {items}
 handleCheck = {handleCheck}
 handleDelete = {handleDelete}
/>
):(
<p>Your to do list is Empty</p>
)
}

</>
  )
}

export default Main