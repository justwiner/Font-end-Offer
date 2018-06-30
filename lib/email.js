var nodemailer = require('nodemailer');

// 创建一个SMTP客户端配置
var config = {
        host: 'smtp.163.com', 
        port: 25,
        secureConnection: true,
        auth: {
            user: 'luywfront@163.com',
            pass: 'luyw39211'
        }
    };
    
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);

// 发送邮件
module.exports = function (mail){
    transporter.sendMail(mail, function(error, info){
        if(error) {
            return console.log(error);
        }
        console.log('mail sent:', info.response);
    });
};