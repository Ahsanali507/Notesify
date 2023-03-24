import React from 'react';

const Home = () => {
    return (
        <div className='container my-3'>
            <h3 style={{margin:"270px 460px"}}>Welcome {localStorage.getItem("userName")} to MyNoteBook</h3>
        </div>
    );
}

export default Home;
