const express = require("express");
const app = express();
const connectDB= require('./config/db');
const router=require('./routes/index');

connectDB();
app.use(express.json()); 
app.use("/",router);

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
