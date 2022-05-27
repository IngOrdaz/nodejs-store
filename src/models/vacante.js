import { Schema, model } from "mongoose";
import Strategy from "passport-local/lib";

const vacanteSchema = new Schema(
  {
    job: {
      type: String,
      required: true,
      trim: true,
    },
    experiencia: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    days: {
      type: Date
    },
  },
  {
    //permite agregar created at y updated at
    timestamps: true,
    versionKey: false,
  }
);

export default model("Vacantes", vacanteSchema);
