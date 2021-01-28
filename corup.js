const connection = require('./database.js')
const multer  = require('multer');
const fs = require('fs');

class ProtivCor {
  getMethod(func){
    connection.query("SELECT * FROM ProtivCor", (err, results, fields) => {
      func.send(results)  
    });
  }
  putMethod(req,res){
    const storageConfig = multer.diskStorage({
      destination: (req, file, cb) =>{ cb(null, "../corDoc");},
      filename: (req, file, cb) =>{ cb(null, file.originalname);}
    });
    const upload =  multer({storage:storageConfig}).single("files")
    upload(req,res,function(err) {
      if(err)
        return res.json({m:"Error uploading file."});
      
      const action = req.body.action;
      const name = req.body.select;
      const file = req.file.filename;
      const id = req.body.id || null; 

      if(action == 'add'){
        connection.query(`INSERT INTO ProtivCor (name, file) VALUES (?, ?)`, [name,file], (err, results, fields) => { 
          connection.query("SELECT * FROM ProtivCor", (err, results, fields) => {
            res.send(results)  
          });
        });
      }
    });
  }
  removeMethod(req,res){
    const id = req.body.id;
    connection.query("SELECT * FROM ProtivCor WHERE idCor =?", [id],(err, results, fields) => {
      let file = results[0].file
      fs.unlink(`../corDoc/${file}`, (err) => {
        let sql = "DELETE FROM ProtivCor WHERE idCor =?";
        connection.query(sql, [id], (err, results, fields) => { 
          this.getMethod(res)
        });      
      });
    });
  }
}

module.exports  = new ProtivCor();