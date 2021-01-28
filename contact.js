const connection = require('./database.js')
class Cont {
getMethod(func){

  connection.query("SELECT * FROM Cont", (err, results, fields) => {
    func.send(results)    
  });
  }
  putMethod(req,res){
    const action = req.body.action;
    const text = req.body.text;
    const id = req.body.id || null;        

    switch(action){
      case 'add':
        this.addObject(text, res);
        break;
      case 'remove': 
        this.removeObject(res,id)
        break;
      case 'update':
        this.updateObject(res, text,id)
        break;
      default:
        break;
    }
  }
  addObject(text, res){ connection.query(`INSERT INTO Cont (firstCont) VALUES (?)`, [text], 
    (err, results, fields) => { 
      this.getMethod(res)
    });
  }
  removeObject(res,id){
    let sql = "DELETE FROM Cont WHERE idC =?";
    connection.query(sql, [id], (err, results, fields) => { 
      this.getMethod(res)
    });
  }
  updateObject(res,text, id){
    let sql = "UPDATE Cont set firstCont =?   WHERE idC = ?";
    connection.query(sql, [text, id], (err, results, fields) => { 
      this.getMethod(res)
    });
  }
}

module.exports  = new Cont();