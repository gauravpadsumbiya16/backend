const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    Booktitle: {
        type: String,
        required: true
    },
    Bookprice: {
        type: String,
        required: true
    },
    BookColor:{
        type : String,
        default : "danger"
    },
    Bookpages: String,
    Bookdescription: String,
    Bookauthor: String,
    Bookimage: String,
    UserId : String
})

module.exports = mongoose.model("bookData", bookSchema);
