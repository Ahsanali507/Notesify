import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
  const context=useContext(NoteContext);
  const {deleteNote}=context;
  const {note}=props;
  const navigate=useNavigate();
    return (
      <>
        {/* {localStorage.getItem("token")?:navigate('/login')} */}
        <div className="card col-md-3 my-3 mx-3">
            <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <p className="card-text">{note.description}</p>
              <p className="card-tag">{note.tag}</p>
              <i className="fa-solid fa-pen-to-square edit-icon"/>
              <i className="fa-solid fa-trash delete-icon mx-3" onClick={()=>{deleteNote(note._id)}} />
            </div>
        </div>
      </>
    );
}

export default NoteItem;
