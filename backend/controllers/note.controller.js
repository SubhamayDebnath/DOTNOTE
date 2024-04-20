import Note from "../models/note.model.js";
import AppError from "../utils/error.utils.js";

const allNotes = async(req,res,next) =>{
    try {
        const {id}=req.user.id
        const notes = await Note.find({userID:id});
        if(!notes){
            return next(
                new AppError("Notes not found", 400)
            );
        }
        res.status(200).json({
            success:true,
            messages:"All Notes",
            notes
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const singleNote = async(req,res,next) =>{
    try {
        const {id} = req.params;
        const note = await Note.findById(id);
        if(!note){
            return next(
                new AppError("Note not found", 400)
            );
        }
        res.status(200).json({
            success:true,
            messages:"Fetch note details successfully",
            note
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const createNote = async(req,res,next) =>{
    try {
        const {title,description,colorCode,userID} = req.body;
        if(!title || !description ){
            return next(new AppError("All Fields are required", 400));
        }
        const note = await Note.create({
            title,
            description,
            colorCode,
            userID
        });
    
        if(!note){
            return next(
                new AppError("Note could not created", 400)
            );
        }
        await note.save();
        res.status(200).json({
            success:true,
            messages:"Note created successfully",
            note
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
    
};
const updateNote = async(req,res,next) =>{
    try {
        const {id}=req.params;
        const note= await Note.findByIdAndUpdate(id,{
            $set:req.body
        },{
            runValidators:true
        });
        if(!note){
            return next(
                new AppError("Note not found", 400)
            );
        }
        await note.save();
        res.status(200).json({
            success:true,
            messages:"Note updated successfully",
            note
        });

    } catch (error) {
        return next(new AppError(error.message, 500));
    }

};

const deleteNote = async(req,res,next) =>{
    try {
        const {id}=req.params;
        const note = await Note.findById(id);
        if(!note){
            return next(
                new AppError("Note not found", 400)
            );
        }
        await note.deleteOne();
        res.status(200).json({
            success:true,
            messages:"Note deleted successfully",
            note
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

export{
    allNotes,
    singleNote,
    createNote,
    updateNote,
    deleteNote
}