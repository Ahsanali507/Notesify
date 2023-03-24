import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
}  from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import AddNote from './components/AddNote';
import UpdateNote from './components/UpdateNote';
import Note from './components/Note';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const [alert, setalert] = useState(null);
  const showAlert=(message,type)=>{
    setalert({
      message:message,
      type:type
    })
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }
  return (
    <>
    <NoteState>
      <Router>
        <Navbar/>
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route exact path='/home' element={<Home/>}></Route>
          <Route exact path='/about' element={<About/>}></Route>
          <Route exact path='/viewAllNotes' element={<Note showalert={showAlert}/>}></Route>
          <Route exact path='/addNote' element={<AddNote showalert={showAlert}/>}></Route>
          <Route exact path='/updateNote' element={<UpdateNote showalert={showAlert}/>}></Route>
          <Route exact path='/signup' element={<Signup showalert={showAlert}/>}></Route>
          <Route exact path='/login' element={<Login showalert={showAlert}/>}></Route>
        </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
