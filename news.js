const connection = require('./database.js')
const multer  = require('multer');
const upload = multer();
const moment = require('moment');
require('moment/locale/ru.js');

class News {
  getMethod(func){
    connection.query("SELECT * FROM News", (err, results, fields) => {
    func.json(results)  
    });
  }
  putMethod(req,res){
    upload.none();
    const action = req.body.action;
    const header = req.body.nameNews;
    const news = req.body.news;
    const id = req.body.id || null;        


    if(action == 'add'){
      this.addObject(header, news, res)
    }
    else if(action == 'remove'){
      this.removeObject(res,id)
    }
    else if(action == 'update'){
      this.updateObject(header, news, res,id)
    }
  }
  addObject(header,news, res){
    connection.query(`INSERT INTO News (nameNews, news, timeD) VALUES (?, ?, ?)`, [header,news, moment().local('ru').format('LLLL')], 
    (err, results, fields) => { 
      this.getMethod(res)
    });
  }
  removeObject(res,id){
    let sql = "DELETE FROM News WHERE id =?";
    connection.query(sql, [id], (err, results, fields) => { 
      this.getMethod(res)
    });
  }
  updateObject(header, news, res, id){
    let sql = "UPDATE News set nameNews =? , news =?  WHERE id = ?";
    connection.query(sql, [header, news, id], (err, results, fields) => { 
      this.getMethod(res)
    });
  }
}

module.exports  = new News();