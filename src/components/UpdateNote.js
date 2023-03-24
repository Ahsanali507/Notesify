import React,{useContext,useState} from 'react';
import NoteContext from '../context/notes/NoteContext';

const UpdateNote = (props) => {
    const context=useContext(NoteContext);
    const {editNote}=context;
    const [note, setNote] = useState({id:"",title:"",description:"",tag:""});
    // const [btnUpdate,setbtnUpdate] = useState("block");
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
    const handleClick=(e)=>{
        e.preventDefault();
        if(note.id!==""&&note.title!==""&&note.description!==""&&note.tag!==""){
            editNote(note.id,note.title,note.description,note.tag);
            props.showalert("Note updated successfully","success");
            setNote({id:"",title:"",description:"",tag:""});
        }
        else{
            props.showalert("Note does not updated, please try again","danger");
        }
        
        // setbtnUpdate('none');
    }
    
    return (
        <div className='my-3'>
            <h2>Update note here</h2>
            <hr />
            <form>
                <div className="mb-3">
                  <label htmlFor="id" className="form-label">Id</label>
                  <input type="text" className="form-control" id="id" name='id' value={note.id} onChange={onChange}/>
                </div>
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
                <button type="submit" className="btn" onClick={handleClick} style={{backgroundColor:"black",color:"white"}}>Update Note</button>
            </form>
            <hr />
        </div>
    );
}

export default UpdateNote;
