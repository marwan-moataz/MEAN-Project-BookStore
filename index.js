
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const url ="mongodb+srv://ITI-MEAM:MEAM-TEAM@mean-bookstore.u9dxp.mongodb.net/mean-bookStore?retryWrites=true&w=majority&appName=MEAN-bookStore";
mongoose.connect(url).then(()=> {
    console.log('mongodb server started')
});

app.use(cors());
app.use(express.json());

const categoriesRouter = require('./routes/categories.route');

app.use('/api/categories', categoriesRouter);

app.listen(5000, () => {
    console.log('listening on port: 5000')
});
