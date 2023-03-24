const express=require('express');
const fetchuser = require('../middleware/fetchuser');
const router=express.Router();
const Notes=require('../models/Notes');
const{body,validationResult}=require('express-validator');

// route 1: get request localhost:8000/api/notes/fetchallnotes to get allnotes relative to specific user using specific user id
router.get('/fetchallnotes',fetchuser, async (req, res) => {
  const notes=await Notes.find({user:req.user.id});
  res.json(notes);
})

// route 2: post request localhost:8000/api/notes/addnote to add note relative to specific user using specific user id
router.post('/addnote',fetchuser,[
  body('title',"Enter valid title").isLength({min:3}),
  body('description',"Description must be atleast 5 words").isLength({min:5}),
], async (req, res) => {
  try {
    const {title,description,tag}=req.body;
    // check if errors then return status and those errors
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({error:errors.array()});
    }
    // else create note for specific user
    const note=new Notes({
      user:req.user.id,
      title,
      description,
      tag
    })
    // and then save it and send as a response
    const saveNote=await note.save();
    res.json(saveNote);
  } catch (error) {
    res.send(error.message);   // if any other error occur then send res as error
  }
})

// route 3: put request localhost:8000/api/notes/updatenote/:id to edit or update existing note relative to specific user using specific user id
router.put('/updatenote/:id',fetchuser,[
  body('title',"Enter valid title").isLength({min:3}),
  body('description',"Description must be atleast 5 words").isLength({min:5}),
], async (req, res) => {
  try {
    const {title,description,tag}=req.body;
    // check if errors then return status and those errors
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({error:errors.array()});
    }

    //else create a new object NewNote
    const newNote={};
    if(title){newNote.title=title;}
    if(description){newNote.description=description;}
    if(tag){newNote.tag=tag;}

    // find the note to be updated
    let note=await Notes.findById(req.params.id);
    if(!note){res.status(404).send("Note is not found")};

    if(note.user.toString()!==req.user.id){
      res.status(401).send("This user is not allowed bcz it is not logged in");
    }

    //update note that you find
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json(note);
  } catch (error) {
    res.send(error.message);   // if any other error occur then send res as error
  }
})


// route 4: delete request localhost:8000/api/notes/deletenote/:id to delete existing note relative to specific user using specific user id
router.delete('/deletenote/:id',fetchuser, async (req, res) => {
  try {
    // check if errors then return status and those errors
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({error:errors.array()});
    }

    // find the note to be deleted
    let note=await Notes.findById(req.params.id);
    if(!note){res.status(404).send("Note is not found")};

    if(note.user.toString()!==req.user.id){
      res.status(401).send("This user is not allowed bcz it is not logged in");
    }

    //delete note that you find
    note=await Notes.findByIdAndDelete(req.params.id);
    res.json({"message":"Note has been deleted successfully"});
  } catch (error) {
    res.send(error.message);   // if any other error occur then send res as error
  }
})


module.exports=router