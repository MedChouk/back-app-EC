const express = require('express');
const env = require('dotenv');
const path = require('path');
const cors = require('cors');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes
const userRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require("./routes/admin/initialData");

const app = express();

// db Connection
mongoose.connect(`mongodb+srv://userdb:userdb@e-commerce-db.fzcwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Connected to database !!');
      })
      .catch((err)=>{
        console.log('Connection failed !!'+ err.message);
        console.log(err.message);
      });


// environement variable or you can say constants :
env.config();

// app.use(express.json());

//app.use(bodyParser());
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use("/api", initialDataRoutes);


//test route : 

/* app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello from Server'
    });
});

app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body
    });
}); */

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    // console.log(process.env.PORT);
});