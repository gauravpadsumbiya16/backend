const express = require("express");

const { addBook,
    updateBook,
    deleteBook,
    getBookById,
    getAllBooks,
    searchBook,
    invalidRouteHandle,
    getAllBooksAdmin,
    updateBookMark,
    findBookbyMark,
    findBookbyUnMark,
    marksbooks,
    unmarkbooks} = require("../controller/bookController");
const router = express.Router();

router.route("/books").get(getAllBooksAdmin);
router.route("/books/:id").get(getAllBooks);
router.route("/books/getmarkbook/:id").get(findBookbyMark);
router.route("/books/getunmarkbook/:id").get(findBookbyUnMark);
router.route("/markbooks").get(marksbooks);
router.route("/unmarkbooks").get(unmarkbooks);
router.route("/addBook").post(addBook);
router.route("/book/:_id/:id").put(updateBook);
router.route("/book/updateBookMark/:_id/:id").put(updateBookMark);
router.route("/book/:_id/:id").delete(deleteBook);
router.route("/book/:_id/:id").get(getBookById);
router.route("/search/:id/:key").get(searchBook);
router.route("*").get(invalidRouteHandle);

module.exports = router;