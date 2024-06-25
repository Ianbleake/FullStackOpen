import React from "react";

const Part = ({name,exercises, id})=>{
  return(
    <li>
      <p>Part {id}: {name}</p>
      <p>Num. Exercises: {exercises}</p>
    </li>
  )
}

export default Part;