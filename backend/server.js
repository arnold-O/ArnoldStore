const mongoose = require('mongoose')
const app = require('./app')
const dotenv = require('dotenv')
// 
dotenv.config({path: './config.env'})

const DB = process.env.DATABASE_LOCAL

mongoose.connect(DB, {
  
}).then(conn =>{
  console.log(conn.connections)
})



const port = process.env || 4000;

 const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);

});

process.on('unhandledRejection', err=>{
  console.log(`Error: ${err.message}`)
  console.log(`shutting dowm due to unhandled promises`)
  server.close(()=>{
    process.exit(1)
  })
})
// this is amazing


