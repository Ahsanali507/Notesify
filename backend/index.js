const express = require('express')
const connectMongo = require('./db')
const app = express()
const port=8000;
const cors = require('cors');  

connectMongo();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})