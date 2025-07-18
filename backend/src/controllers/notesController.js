import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1}); // Sort by createdAt in descending order (newest one)
        res.status(200).json(notes);

    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({title, content});

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function updateNote(req, res) {
    try {

        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new:true});

        // print if the note does not exists
        if(!updatedNote) return res.status(404).json({message:"Note not found"});

        res.status(200).json(updatedNote);

    } catch (error) {

        console.error("Error in updateNote controller", error);
        res.status(500).json({message:"Internal server error"});

    }
}

export async function deleteNote(req, res) {
    try {

        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message:"Note not found"});

        // status by defualt is 200 anyway
        res.status(200).json({message:"Note deleted successfully"});

    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function getNoteById(req, res) {
    try {

        const foundNote = await Note.findById(req.params.id);
        if(!foundNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json(foundNote);

    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}