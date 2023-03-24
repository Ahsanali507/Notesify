import React,{useEffect} from 'react'
import {Link,useLocation,useNavigate} from "react-router-dom";

export default function Navbar() {
  const location=useLocation();
  let navigate=useNavigate();
  useEffect(() => {
    // console.log(location)
  }, [location]);

  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate('/login');
  }
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">My NoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          {localStorage.getItem("token")&&<Link className={`nav-link ${location.pathname==="/home"?"active":""}`} aria-current="page" to="/">Home</Link>}
        </li>
        <li className="nav-item">
          {localStorage.getItem("token")&&<Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>}
        </li>
        <li className="nav-item">
          {localStorage.getItem("token")&&<Link className={`nav-link ${location.pathname==="/addNote"?"active":""}`} aria-current="page" to="/addNote">AddNote</Link>}
        </li>
        <li className="nav-item">
          {localStorage.getItem("token")&&<Link className={`nav-link ${location.pathname==="/updateNote"?"active":""}`} aria-current="page" to="/updateNote">UpdateNote</Link>}
        </li>
        <li className="nav-item">
          {localStorage.getItem("token")&&<Link className={`nav-link ${location.pathname==="/viewAllNotes"?"active":""}`} aria-current="page" to="/viewAllNotes">ViewAllNotes</Link>}
        </li>
      </ul>
      {!localStorage.getItem("token")?<form className="d-flex" role="search">
        <Link className='btn btn-success mx-1' aria-current="page" to="/signup">Sign Up</Link>
        <Link className='btn btn-success mx-1' aria-current="page" to="/login">Login</Link>
      </form>
      :
      <button type='submit' className='btn btn-success' onClick={handleLogout}>Logout</button>}
    </div>
  </div>
</nav>
  )
}
