import React from 'react'

export const Display = ({text, value}) => {
  return (
    <div>
            <p>{text}</p>
            <p>Votes: {value}</p>
    </div>
  );
}