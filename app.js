const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer  = require('multer');
const upload = multer();

const middleWare = require('./middleWare.js');
const users = require('./users.js');
const news = require('./news.js');
const about = require('./about.js');
const contact = require('./contact.js');
const corup = require('./corup.js');
const recviz = require('./rec.js');
const sending = require('./sending.js')
const app = express();

app.use(cors())
app.use(bodyParser())
app.use(express.static(path.join(__dirname, 'build')));

app.route('/api/')
    .get((req,res) =>{
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    })
    .post(upload.none(), (req, res) => {
        users.getAuth(req,res);
    })
app.route(/users/)
    .post(middleWare, upload.none(), (req, res) => {
        users.updateUser(req,res)   
    })


app.route('/api/news/')
    .get((req,res) => {
        news.getMethod(res);
    })
    .post(middleWare,upload.none(),(req,res) => {
        news.putMethod(req, res);
    })

app.route('/api/about/')
    .get((req,res) => {
        about.getMethod(res);
    })
    .post(middleWare,upload.none(),(req,res) => {
        about.putMethod(req, res);
    })
app.route('/api/about/doc/')
    .get((req,res) => {
        about.getDoc(res);
    })
    .post(middleWare,(req,res) => {
        about.putDocMethod(req, res);
    })
    .put(middleWare, upload.none(),(req,res) => {
        about.removeDocMethod(req, res);
    })
    
app.route('/api/about/img/')
    .get((req,res) => {
        about.getImg(res);
    })
    .post(middleWare,(req,res) => {
        about.putImgMethod(req, res);
    })
    .put(middleWare, upload.none(),(req,res) => {
        about.removeImgMethod(req, res);
    })


app.route('/api/contact/')
    .get((req,res) => {
        contact.getMethod(res);
    })
    .post(middleWare,upload.none(),(req,res) => {
        contact.putMethod(req, res);
    })


app.route('/api/corup/')
    .get((req,res) => {
        corup.getMethod(res);
    })
    .post(middleWare,(req,res) => {
        corup.putMethod(req, res);
    })
    .put(middleWare, upload.none(),(req,res) => {
        corup.removeMethod(req, res);
    })


app.route('/api/recviz/')
    .get((req,res) => {
        recviz.getMethod(res);
    })
    .post(middleWare,upload.none(),(req,res) => {
        recviz.putMethod(req, res);
    })

app.route('/api/asking')
    .post(upload.none(),(req,res) => {
        sending.asking(req, res);
    })
    
app.route('/api/sending')
    .post(upload.none(),(req,res) => {
        sending.sending(req, res);
    })

app.listen(3000)

