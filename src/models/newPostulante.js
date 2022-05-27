import { Schema, model } from "mongoose";

const postulanteSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      fatherLastName: {
        type: String,
        required: true,
        trim: true,
      },
      motherLastName: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: Number,
        required: true,
        trim: true,
      },
      cv: {
        type: File,
        required: true,
        trim: true,
      },
        email: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      //permite agregar created at y updated at
      timestamps: true,
      versionKey: false,
    }
  );
  
  export default model("Postulantes", postulanteSchema);