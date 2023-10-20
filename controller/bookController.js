const Book = require("../models/bookModel");

//getAllBooksAdmin
exports.getAllBooksAdmin = async (req, res) => {
    try {
        let books = await Book.find();
        if (books.length > 0) {
            res.send(books);
        }
        else {
            res.send({ result: "No book found !!" })
        }
    }
    catch (error) {
        console.log("error ", error)
    }
}

//getAllBooks
exports.getAllBooks = async (req, res) => {
    try {
        let books = await Book.find({ UserId: req.params.id });
        if (books.length > 0) {
            res.send(books);
        }
        else {
            res.send({ result: "No book found !!" })
        }
    }
    catch (error) {
        console.log("error ", error)
    }
}

//getBookById
exports.getBookById = async (req, res) => {
    try {
        let result = await Book.findOne({ "$and": [{ _id: req.params._id }, { UserId: req.params.id }] })
        if (result) {
            res.send(result);
        }
        else {
            res.send({ result: "No record found !! " })
        }
    } catch (error) {
        console.log("error ", error)
    }

}


//addBook
exports.addBook = async (req, res) => {
    try {
        console.log("req.body = ", req.body)
        var data = req.body;
        var bookdata = await Book.create(data);
        res.status(200).json({
            status: "OK",
            data
        })
    } catch (error) {
        console.log("error = ", error)
    }
}

//updateBook
exports.updateBook = async (req, res) => {
    try {
        let result = await Book.updateOne(
            { "$and": [{ _id: req.params._id }, { UserId: req.params.id }] },
            {
                $set: req.body
            }
        )
        res.status(200).send(result);
    }
    catch (error) {
        console.log("error ", error)
    }
}

//deleteBook
exports.deleteBook = async (req, res) => {
    try {
        let result = await Book.findOne({ "$and": [{ _id: req.params._id }, { UserId: req.params.id }] })
        const deleteBook = await Book.deleteOne(result);
        res.send(deleteBook);
    }
    catch (error) {
        console.log("error ", error)
    }
}

//seachBook
exports.searchBook = async (req, res) => {
    try {
        let result = await Book.find({
            "$and": [{ UserId: req.params.id }, {
                "$or": [
                    { Booktitle: { $regex: req.params.key } },
                    { Bookpages: { $regex: req.params.key } },
                    { Bookdescription: { $regex: req.params.key } },
                    { Bookauthor: { $regex: req.params.key } },
                    { Bookprice: { $regex: req.params.key } },
                    { Bookimage: { $regex: req.params.key } },

                ]
            }]

        });
        res.send(result);
    } catch (error) {
        console.log("error ", error)
    }
}

//seachBookAdmin
exports.searchBookAdmin = async (req, res) => {
    try {
        let result = await Book.find({
            "$or": [
                { Booktitle: { $regex: req.params.key } },
                { Bookpages: { $regex: req.params.key } },
                { Bookdescription: { $regex: req.params.key } },
                { Bookauthor: { $regex: req.params.key } },
                { Bookprice: { $regex: req.params.key } },
                { Bookimage: { $regex: req.params.key } },
            ]
        });
        res.send(result);
    } catch (error) {
        console.log("error ", error)
    }
}

//invalidRouteHandle 
exports.invalidRouteHandle = (req, res) => {
    try {
        console.log("this is called of books");
        res.end(`404 page not found`);
    } catch (error) {
        console.log("error ", error)
    }
}

//updateBookMark
exports.updateBookMark = async (req,res) => {

    const newBookData = req.body ;
    
    const newMark = ( newBookData.BookColor === "danger") ? "success" : "danger";
    
    newBookData.BookColor = newMark ;
    
    const book = await Book.findByIdAndUpdate(req.params._id, newBookData,{
        new:true,
        runValidators:true,
        userFindAndModify:false,
    });

    console.log(book);
    
    res.status(200).json({
        success:true,
    });
}; 


//findBookbyMark
exports.findBookbyMark = async (req, res) => {
    try {
        let result = await Book.find({ "$and": [{ UserId: req.params.id },{BookColor:"success"}] })
        if (result) {
            res.send(result);
        }
        else {
            res.send({ result: "No record found !! " })
        }
    } catch (error) {
        console.log("error of correct ", error)
    }

}

//findBookbyUnMark
exports.findBookbyUnMark = async (req, res) => {
    try {
        let result = await Book.find({ "$and": [{ UserId: req.params.id },{BookColor:"danger"}] })
        if (result) {
            res.send(result);
        }
        else {
            res.send({ result: "No record found !! " })
        }
    } catch (error) {
        console.log("error ", error)
    }
}

//findBookbyMarkAdmin
exports.marksbooks = async (req, res) => {
    try {
        
        let result = await Book.find({BookColor:"success"})
        if (result) {
            res.send(result);
            console.log(result);
        }
        else {
            res.send({ result: "No record found !! " })
        }
    } catch (error) {
        console.log("error of correct ", error)
    }
}

//findBookbyUnMarkAdmin
exports.unmarkbooks = async (req, res) => {
    try {
        let result = await Book.find({BookColor:"danger"})
        if (result) {
            res.send(result);
            console.log(result);
        }
        else {
            res.send({ result: "No record found !! " })
        }
    } catch (error) {
        console.log("error ", error)
    }
}