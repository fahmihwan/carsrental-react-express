//import express
const express = require('express')
// import cors
const cors = require("cors");
// import bodyParser (middleware)
const bodyParser = require("body-parser");
//init app
const app = express()

app.use(cors())
//define port
const port = 3000;

const router = require('./routes')


//route
// untuk testing postman
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', router)

//start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})