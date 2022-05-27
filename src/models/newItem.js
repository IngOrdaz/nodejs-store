import { Schema, model } from "mongoose";

const itemsSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    cantidad: {
      type: Number,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    //permite agregar created at y updated at
    timestamps: true,
    versionKey: false,
  }
);

export default model("Items", itemsSchema);