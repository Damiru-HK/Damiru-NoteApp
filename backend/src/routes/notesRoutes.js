import express from "express"
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/notesController.js";

// Initialize express router
// This router will handle all routes related to notes
// It will be mounted on the /api/notes path in the main server file
// For example, a GET request to /api/notes will be handled by the getAll
const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;

