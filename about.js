const connection = require('./database.js')
const multer  = require('multer');
const fs = require('fs');
class About {
  getMethod(res){
    connection.query("SELECT * FROM About", (err, results, fields) => {
      res.send(results)
    });
  }
  getDoc(res){
    connection.query("SELECT * FROM FileAndDocument WHERE nameFD =?",['2'], (err, results, fields) => {
      res.send(results)
    });         
  }
  getImg(res){
    connection.query("SELECT * FROM FileAndDocument WHERE nameFD =?",['1'], (err, results, fields) => {
      res.send(results)
    });         
  }
  putMethod(req,res){
    const action = req.body.action;
    const text = req.body.firstText;
    const id = req.body.id || null; 

    if(action == 'add_info'){
      connection.query(`INSERT INTO About (firstText) VALUES (?)`, [text], 
      (err, results, fields) => { 
        this.getMethod(res)
      });
    }
    else if(action == 'remove_info'){
      let sql = "DELETE FROM About WHERE idA =?";
      connection.query(sql, [id],
        (err, results, fields) => { 
          this.getMethod(res)
        });
    }
    else if(action == 'update_info'){
      let sql = "UPDATE About set firstText =?   WHERE idA = ?";
      connection.query(sql, [text, id],
        (err, results, fields) => { 
          this.getMethod(res)
        });
    }    
  }
  putDocMethod(req,res){
    const storageConfig = multer.diskStorage({
      destination: (req, file, cb) =>{ cb(null, "../fd"); },
      filename: (req, file, cb) =>{ cb(null, file.originalname); }
    });

    const upload =  multer({storage:storageConfig}).single("files")
      upload(req,res,function(err) {
        if(err)
          return res.json({m:"Error uploading file."});
        
        const action = req.body.action;
        const name = req.body.name;
        const file = req.file.filename;
        const id = req.body.id || null;
        const year = req.body.year

        if(action == 'add_doc'){
          connection.query(`INSERT INTO FileAndDocument (nameFD,FotoAndDocument, year ) VALUES (?, ?, ?)`, [name,file,year], 
            (err, results, fields) => { 
            connection.query("SELECT * FROM FileAndDocument WHERE nameFD =?",['2'], (err, results, fields) => {
            res.send(results)
            });    
          });
        }
    });
  }
  removeDocMethod(req,res){
    const id = req.body.id;

    connection.query("SELECT * FROM FileAndDocument WHERE idFD =?", [id],(err, results, fields) => {
    let file = results[0].FotoAndDocument
    fs.unlink(`../fd/${file}`, (err) => {
      let sql = "DELETE FROM FileAndDocument WHERE idFD =?";
      connection.query(sql, [id],(err, results, fields) => { 
        connection.query("SELECT * FROM FileAndDocument WHERE nameFD =?",['2'], (err, results, fields) => {
        res.send(results)
      });    
      });      
    });
  });
  }
  putImgMethod(req,res){
    const storageConfig = multer.diskStorage({
      destination: (req, file, cb) =>{ cb(null, "../fd") },
      filename: (req, file, cb) =>{ cb(null, file.originalname)}
    });

    const upload =  multer({storage:storageConfig}).single("files")
    upload(req,res,function(err) {
      if(err)
        return res.json({m:"Error uploading file."});
    
      const action = req.body.action;
      const name = req.body.name;
      const file = req.file.filename;
      const year = new Date().getFullYear()
      const id = req.body.id || null; 

      if(action == 'add_img'){
        connection.query(`INSERT INTO FileAndDocument (nameFD, FotoAndDocument, year) VALUES (?, ?, ?)`, [name,file, year], 
          (err, results, fields) => { 
            connection.query("SELECT * FROM FileAndDocument WHERE nameFD =?",['1'], (err, results, fields) => {
            res.send(results)
          });       
        });
      }
    });
  }
  removeImgMethod(req,res){
    const id = req.body.id;

    connection.query("SELECT * FROM FileAndDocument WHERE idFD =?", [id],(err, results, fields) => {
      let file = results[0].FotoAndDocument
      fs.unlink(`../fd/${file}`, (err) => {
      let sql = "DELETE FROM FileAndDocument WHERE idFD =?";
      connection.query(sql, [id], (err, results, fields) => { 
        connection.query("SELECT * FROM FileAndDocument WHERE nameFD =?",['1'], (err, results, fields) => {
          res.send(results)
        });       
      });      
    });
    });
  }
}

module.exports  = new About();