import React,{useContext,useEffect} from 'react';
import NoteItem from './NoteItem';
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';
// import AddNote from './AddNote';
// import UpdateNote from './UpdateNote';
const Note = (props) => {
    const context=useContext(NoteContext);
    const {notes,fetchAllNotes} = context;
    let navigate=useNavigate();
    useEffect(() => {
      if(localStorage.getItem('token')!==null){
        fetchAllNotes();
      }
      else{
        props.showalert("You have to login first","danger");
        navigate('/login');
      }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const updateNote=(note)=>{
    //     ref.current.click();
    // }

    // const ref=useRef(null)
    return (
        <>
        {/* <AddNote/>
        <UpdateNote/> */}
        {/* <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#exampleModal">
            launch modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Edit Note Here</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">Title</label>
                          <input type="text" className="form-control" id="title" name='title'/>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">Description</label>
                          <input type="text" className="form-control" id="description" name='description'/>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="tag" className="form-label">Tag</label>
                          <input type="text" className="form-control" id="tag" name='tag'/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary">Update Note</button>
                </div>
              </div>
            </div>
        </div> */}
        <div className='row my-3'>
            <h2>Your notes</h2>
            {notes.length===0 && "No notes to display please add notes first"}
            {notes.map((note)=>{
                return <NoteItem key={note._id} note={note}/>
            })}
        </div>
        </>
    );
}

export default Note;
