import React,{useContext,useState} from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context=useContext(NoteContext);
    const {addNote}=context;
    const [note, setNote] = useState({title:"",description:"",tag:""});
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
    const handleClick=(e)=>{
        e.preventDefault();
        if(note.title!==""&&note.description!==""&&note.tag!==""){
          props.showalert("Note added successfully","success");
          addNote(note.title,note.description,note.tag);
          setNote({title:"",description:"",tag:""});
        }
        else{
          props.showalert("Note does not added, please try again","danger");
        }
    }

    return (
        <div className='my-3'>
            <h2>Add note</h2>
            <hr />
            <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
                </div>
                <button type="submit" className="btn" onClick={handleClick} style={{backgroundColor:"black",color:"white"}}>Add Note</button>
            </form>
            <hr />
        </div>
    );
}

export default AddNote;
