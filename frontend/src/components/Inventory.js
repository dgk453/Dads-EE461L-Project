import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Inventory = () => {
    const [quantity1, setQuantity1] = useState(0)
    const [capacity1, setCapacity1] = useState(100)
    const [quantity2, setQuantity2] = useState(0)
    const [capacity2, setCapacity2] = useState(100)
    useEffect = () =>{
        axios
      .post(
        "http://127.0.0.1:5000/get-sets",
      )
      .then((response) => {
        // Check if the response status is OK (status code 200)
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return response.data; // Axios automatically parses the response data as JSON
      })
      .then((data) => {
        // "quantity1" : quantity1,
        // "quantity2" : quantity2,
        // "capacity1" : capacity1,
        // "capacity2" : capacity2
        setQuantity1(data.quantity1);
        setQuantity2(data.quantity2);
        setCapacity1(data.capacity1);
        setCapacity2(data.capacity2);

        console.log(data);
      })
      .catch((error) => {
        // Handle errors, e.g., network errors or API errors
        console.error("There was a problem with the fetch operation:", error);
      });
    }
  return (
    <div>
        <h1>Inventory</h1>
        <h2>HWSet1: {quantity1}/{capacity1}</h2>
        <h2>HWSet2: {quantity2}/{capacity2}</h2>


    </div>
  )
}

export default Inventory