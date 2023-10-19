const express = require("express");
const cors = require("cors");
const database = require("./db/database.js");
database.connectToDatabase();

const dotenv = require('dotenv');
dotenv.config();
// console.log(`Your port is ${process.env.PORT}`); 

const app = express();
app.use(express.json());
app.use(cors()); 

const book = require("./routes/bookRoute.js");
const user = require("./routes/userRoute.js");

app.use("/api/v1/user",user);
app.use("/api/v1",book);


app.listen(process.env.PORT, () => { console.log(`server is running on ${process.env.PORT} port`) });