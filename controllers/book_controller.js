import express from 'express';
import Book from '../models/book_model.js';

export const  router = express.Router();

router.get('/', (req , res) =>{
    Book.find().lean()
        .then(data =>{
            res.render('books/index',{books:data});
        })
        .catch(err => console.log('Error during fetching operation' , err))
})

router.get('/addOrEdit' , (req , res ) => {
    res.render('books/addOrEdit', { book: {} });
})

router.get('/addOrEdit/:id', (req , res) =>{
     Book.findById(req.params.id).lean()
        .then(data => res.render('books/addOrEdit',{book:data}))
        .catch(err => console.log('Error during fetching operation' , err))
})


router.post('/addOrEdit' , (req , res ) => {
    const book = {
        title:req.body.title,
        author:req.body.author,
        publishedYear:req.body.publishedYear,
         price:req.body.price
    }

    const {_id} = req.body
    if(_id == '')
    new Book({...book}).save()
    .then(data =>res.redirect('/books'))
    .catch(err => console.log("Error during insertion\n" , err))
    else 
    Book.findByIdAndUpdate(_id ,book)
    .then(data =>res.redirect('/books'))
    .catch(err => console.log("Error during update operation\n" , err))
})

router.post('/delete/:id' , (req , res ) => {
        Book.findByIdAndDelete(req.params.id)
        .then(data =>res.redirect('/books'))
        .catch(err => console.log("Error during delete operation\n" , err))
})