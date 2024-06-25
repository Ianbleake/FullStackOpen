import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <ul>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} id={part.id} />
      ))}
      <li>Total Exercises: {total}</li>
    </ul>
  );
};

export default Content;
