import React from 'react';
import './ToDo.css';

function ToDo({ userId, id, title, completed, handleCompletedChange }) {
  return (
    <div className="task">
      <p className="task-title">{title}</p>
      
      {completed ? (
        <button
          className="btn undo"
          onClick={() => handleCompletedChange(id)}
        >
          Incomplete
        </button>
      ) : (
        <button
          className="btn complete"
          onClick={() => handleCompletedChange(id)}
        >
          Complete
        </button>
      )}
    </div>
  );
}

export default ToDo;
