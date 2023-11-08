import React, { useState } from "react";
import axios from 'axios'
const Leave = () => {
    const [projectID, setProjectID] = useState('')
    const joinProject = () =>{
        axios
      .post(
        "http://127.0.0.1:5000/leave-project",
        {
          projectID: projectID,
          user: localStorage.getItem('username')
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Check if the response status is OK (status code 200)
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return response.data; // Axios automatically parses the response data as JSON
      })
      .then((data) => {
        // Work with the JSON data here
        console.log(data);
      })
      .catch((error) => {
        // Handle errors, e.g., network errors or API errors
        console.error("There was a problem with the fetch operation:", error);
      });
    }
    return (
        <div>
            <input
                type="text"
                placeholder="Project ID"
                onChange={(e) => setProjectID(e.target.value)}
            ></input>
            <br></br>
            <button type="button" className="btn btn-primary" onClick={joinProject}>
                Leave
            </button>
        </div>
    );
};

export default Leave;