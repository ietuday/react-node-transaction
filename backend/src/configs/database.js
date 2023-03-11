config = {
    uri: 'mongodb+srv://todo-api:hZkweFmNN2Lq1cJD@cluster0.lwtdotm.mongodb.net/wallet_app?retryWrites=true&w=majority',
    options: {
        dbName: 'wallet_app',
        useNewUrlParser: true
    },
}

JWT_SECRETE =  'kjahdkjafdjawgfkjsgfkjsgfkjsgfjsgfhjfnmmzbjshfkjgsf'

const getMailConfig = {    
      MAIL_SETTINGS: {
        service: 'gmail',
        auth: {
          user: 'udayaditya.singh@gmail.com',
          pass: 'eyelkzjbgqllegkt',
        },
      }
    
  }

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

module.exports = {config,JWT_SECRETE,getMailConfig,emailRegex,passwordRegex}
// DB_USER=todo-api
// DB_PWD=hZkweFmNN2Lq1cJD
// DB_HOST=cluster0.lwtdotm.mongodb.net
// DB_NAME=todo

//mongodb+srv://todo-api:hZkweFmNN2Lq1cJD@$cluster0.lwtdotm.mongodb.net/todo?retryWrites=true&w=majority