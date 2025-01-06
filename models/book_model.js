import mongoose from "mongoose";

const Book = mongoose.model('Book' , {
    title:String,
    author:String,
    publishedYear:Number,
    price:Number,
})
export default Book;