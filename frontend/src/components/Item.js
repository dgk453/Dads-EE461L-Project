import React, { useState } from 'react'
import './Item.css'
const Item = ({data}) => {
    const [itemName, setItemName] = useState('HWSet')
    const [buttonText, setButtonText] = useState({color: "blue"})
    const [buttonValue, setButtonValue] = useState('join')

  return (
    <div>
      <div className='itemRow'>
        <h3 className='itemElement'>{itemName}: {data.value}/100</h3>
        <input className ='itemElement' placeholder="Enter qty"></input>
        <button className='itemElement'>Check In</button>
        <button className='itemElement'>Check Out</button>
      </div>
    </div>
  )
}

export default Item