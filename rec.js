const connection = require('./database.js')
class Rec {
  getMethod(func){
    connection.query("SELECT * FROM Rec", (err, results, fields) => {
      func.send(results)  
    });
  }
  putMethod(req,res){
    const action = req.body.action;
    const firstRec = req.body.firstRec;
    const secondRec = req.body.secondRec;
    const id = req.body.id || null;        


    if(action == 'add'){
      this.addObject(firstRec, secondRec, res)
    }
    else if(action == 'remove'){
      this.removeObject(res,id)
    }
    else if(action == 'update'){
      this.updateObject(res, firstRec, secondRec,id)
    }

  }
  addObject(firstRec, secondRec, res){
    connection.query(`INSERT INTO Rec (firstRec,secondRec) VALUES (?,?)`, 
    [firstRec, secondRec], (err, results, fields) => { 
      this.getMethod(res)
    });
  }
  removeObject(res,id){
    let sql = "DELETE FROM Rec WHERE idR =?";
    connection.query(sql, [id], (err, results, fields) => { 
      this.getMethod(res)
    });
  }
  updateObject(res, firstRec, secondRec,id){
    let sql = "UPDATE Rec set firstRec =?, secondRec =? WHERE idR = ?";
    connection.query(sql, [firstRec,secondRec, id], (err, results, fields) => { 
      this.getMethod(res)
    });
  }
}

module.exports  = new Rec();