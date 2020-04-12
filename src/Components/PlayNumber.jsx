import React from 'react'


const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };
  

function PlayNumber(props) {
    return (
        <button 
        className="number"
        style={{background:colors[props.status]}}
        onClick ={() => props.onClick(props.number,props.status)}
        >
        {props.number}
        </button>
    )
}
export default PlayNumber