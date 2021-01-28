const connection = require('./database.js')
const jwt = require('jsonwebtoken');
const { v4: v4 } = require('uuid');
const { jwtSecret } = require('./conf.js')


class Users {

  getAuth(req, res ){
    let name= req.body.user_name;
    let password = req.body.user_password;
    connection.query(`SELECT * FROM users WHERE (user_name = '${name}' AND user_password = '${password}' )`, (err, results, fields) => {
      try{
        if(results.length > 0){
          let email = results.user_email;
          const token = jwt.sign( {name:name.toString(),email: email}, 
            jwtSecret, 
            {
              expiresIn: '2h',
              jwtid: v4(),
            }
          )

          res.json({token, message:'Вход успешен!', success: true})
        }else 
          res.status(401).json({message:"Неверный логин или пароль", success:false})


      }catch(err){
        res.status(500).json({messege:err.message})
      }

    });
  }
  getUsers(req,res){
    connection.query("SELECT * FROM News", (err, results, fields) => {
    let data = {}
    for (var i = 0; i < results.length; i++) {
      data['email'] = results[i].user_email;
      data['login'] = results[i].user_name;
    }
      res.json(data)  
    });
  }
  updateUser(req,res){
    let name= req.body.user_name;
    let email = req.body.user_email;
    let { data_name, data_email, data_password } = req.body.data
    connection.query(`SELECT * FROM users WHERE (user_name = '${name}' AND user_email = '${email}' )`, (err, results, fields) => {
      if(results.length > 0)
        connection.query(`UPDATE users SET 'user_name'= '${data_name}', 'user_password'='${data_password}', 'user_email'='${data_email}' WHERE ('user_name'='${name}' and 'user_email'='${email}')`, (err, results, fields) => {})        
      else
        connection.query(`INSERT INTO users ('user_name', 'user_password', 'user_email') VALUES '${name}', '${password}', '${email}'`, (err, results, fields) => {})
    });
  }
  deleteUser(req,res){
    connection.query(`DELETE FROM users  WHERE ('user_name'='${data_name}' and 'user_email'='${data_email}')`, (err, results, fields) => {})
  }
}

module.exports  = new Users();