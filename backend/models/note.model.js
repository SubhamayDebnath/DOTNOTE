import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: "String",
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: "String",
      required: [true, "Description is required"],

      trim: true,
    },
    colorCode: {
      type: "String",
      default: "#DC143C",
    },
    noteType: {
      type: "String",
      enum: ["PRIVATE", "PUBLIC"],
      default: "PRIVATE",
    },
    userID:{
      type: "String",
      required: [true, "user id is required"]
    }
  },
  {
    timestamps: true,
  }
);

const Note = model("Notes", noteSchema);

export default Note;
