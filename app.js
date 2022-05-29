const express = require("express");
const path = require("path");
const app = express();
const mongoose= require("mongoose")
// const bodyparser=require("body-parser")
mongoose.connect("mongodb://localhost/contactdance",{useNewUrlParser: true})
const port = 8000;
var danceschema=new mongoose.Schema({
    name:String,
    phone: Number,
    address:String,
    desc:String
})
var dancecontact=mongoose.model("dancecontact",danceschema)
app.use('/static', express.static('static'))
app.use(express.urlencoded())
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req, res)=>{
    // const params = {}
    res.status(200).render('home.pug');
})
app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
})
app.post('/contact', (req, res)=>{
    var mydata=new dancecontact(req.body)
    mydata.save().then(()=>{
        res.send("this has been saved")
    }).catch(()=>{
        res.status(400).send("this has not been saved")
    })
    // res.status(200).render('contact.pug');
});
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});