import express from 'express';
import path from 'path'; 
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import connectDb from './db.js';
import {router} from './controllers/book_controller.js';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routing
app.use('/books' , router)

//configure view engine
app.set ('views' , path.join(__dirname , 'views'))
app.engine('.hbs', engine({
    extname:'hbs',
    layoutsDir: path.join(__dirname , 'views/layouts'),
    defaultLayout: 'mainLayout.hbs'
}));
app.set('view engine', '.hbs')


connectDb()
  .then(() => {
    console.log('DB connection succeeded.');

    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}.`);
    }).on('error', (err) => {
      console.error('Server ignition failed:\n', err);
    });
  })
  .catch((err) => {
    console.error('Error in connecting to the DB:\n', err);
  });
