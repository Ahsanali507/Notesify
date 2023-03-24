import React,{useState} from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
    const hosturl='http://localhost:8000';
    const initialNotes=[];
    const [notes, setNotes] = useState(initialNotes);

    //fetchAllNotes
    const fetchAllNotes=async ()=>{
        //api call for fetchAllNotes
        const response = await fetch(`${hosturl}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
        });
        const json=await response.json();
        setNotes(json);
    }

    //addNote
    const addNote=async (title,description,tag)=>{
        //api call for add note   ==>'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyd2l0aHRoaXNlbWFpbCI6eyJpZCI6IjYzY2ZkZWZiY2EwNzIzNjY3OGZiZTJiZSJ9LCJpYXQiOjE2NzQ1NzAwNTh9.KftkyaZqVQ7V3Cgn5ACMuoJGhAKfYaXnHqWBv0ix19I'
        const response = await fetch(`${hosturl}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const note=await response.json();
        // const note={
        //     "_id": "63d74547594c20ed3666a401",
        //     "user": "63cfdefbca07236678fbe2be",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "__v": 0
        // }
        setNotes(notes.concat(note));
    }

    //deleteNote
    const deleteNote=async (id)=>{
        //api call for delete note
        const response = await fetch(`${hosturl}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
        });
        const json=await response.json();

        const deleten=notes.filter((note)=>{return note._id!==id});
        setNotes(deleten);
        props.showalert("Note deleted successfully","success");
    }
    
    //editNote
    const editNote=async (id,title,description,tag)=>{
        //api call for update note
        const response = await fetch(`${hosturl}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const json=await response.json();
        let newNote=JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < newNote.length; i++) {
            const element = newNote[i];
            if(element._id===id){
                newNote[i].title=title;
                newNote[i].description=description;
                newNote[i].tag=tag;
                break;
            }
        }
        console.log(localStorage.getItem("token"));
        setNotes(newNote);
    }


    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,fetchAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;