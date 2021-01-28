const nodemailer = require('nodemailer');

class Sending {

  async sending(req,res){

    let {name, lastname, secondname, phone, adress, number, prevData, nowData} = req.body.params
    let user = ``;
    let pass = ``;

    try{
      let transporter = nodemailer.createTransport({
        host: '',
        port: 465,
        secure: true,
        auth: {
          user: user,
          pass: pass
        }
      });
      await transporter.sendMail({
        from: user,
        to: "",
        subject: "",
        text: `Пользователь:
        ${name ? ('Имя: '+ name) : '' }
        ${secondname ? ('Отчество: '+ secondname) : '' }
        ${lastname ? ('Фамилия: '+ lastname) : '' }
        ${phone ? ('Телефон: '+'8' +phone) : '' }
        ${adress ? ('Адресс: '+ adress) : '' }
        ${number ? ('Лицевой счет: '+number) : ''}`,
      });
      res.send({status:'success'})
    }catch(e){
      res.send({status:'error', data:e})
    }
  }


  async asking(req,res){
    let {email,num, text} = req.body.params

    let user = ``;
    let pass = ``
    try{
      let transporter = nodemailer.createTransport({
        host: '',
        port: 465,
        secure: true,
        auth: {
          user: user,
          pass: pass
        }
      });
      await transporter.sendMail({
        from: user,
        to: "",
        subject: "Вопрос от пользователя",
        text: `Пользователь с ${email ? ('почтой '+ email) : '' }  и с ${num ? num : 'не указнным'} лицевым счетом.
          Спрашивает "${text}".`,
      });
      res.send({status:'success'})
    }catch(e){
      res.send({status:'error', data:e})
    }
  }
}





module.exports  = new Sending();