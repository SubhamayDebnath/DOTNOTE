import { Router } from "express";
import {
  allNotes,
  singleNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/",allNotes);
router.post("/create-note",createNote);
router.put("/update-note/:id",updateNote);
router.delete("/delete-note/:id",deleteNote);
router.get("/single-note/:id",singleNote);

export default router;
