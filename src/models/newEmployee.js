import { Schema, model } from "mongoose";
const bcrypt = require("bcryptjs");
import Strategy from "passport-local/lib";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },
    fatherLastName: {
      type: String,
      trim: true,
      require: true,
    },
    motherLastName: {
      type: String,
      trim: true,
      require: true,
    },
    birthDate: {
      type: Date,
    },
    curp: {
      type: String,
      trim: true,
      require: true
    },
    rfc: {
      type: String,
      require: true,
      trim:true,
      unique:true
    },
    email: {
      type: String,
      trim: true,
      require: true,
      unique: true,
    },
    phone: {
      type: Number,
      require: true,
      trim: true,
    },
    startDate: {
      type: Date,
    },
    job: {
      type: String,
      require: true,
      trim: true,
    },
    salary: {
      type: Number,
      require: true,
      trim: true,
    },
    workingHoursStart: {
      type: Date,
    },
    workingHoursEnd: {
      type: Date,
    },
    rol: {
      type: String,
      require: true,
    },
    user: {
      type: String,
      trim: true,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      require: true,
    },
  },
  {
    //permite agregar created at y updated at
    timestamps: true,
    versionKey: false,
  }
);

//encripta contraseña
employeeSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

employeeSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default model("Employee", employeeSchema);
