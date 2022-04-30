require("dotenv").config();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

//console.log(process.env.MONGODB_URI);
export const MONGODB_URI = process.env.MONGODB_URI;
