const express = require('express') //import express
const cors = require("cors"); // import cors
const bodyParser = require("body-parser"); // import bodyParser (middleware)


// setup route middlewares
var cookieParser = require('cookie-parser')
var csrf = require('csurf')

//define port
const port = 3000;
const router = require('./routes')

//init app
const app = express()



// setup cors, upload file 
// ===========================================================================================
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
// ===========================================================================================


// setup csrf
app.use(cookieParser())
app.use(csrf({ cookie: true }))
app.get('/api/csrf-token', function (req, res) {
  res.status(200).send({ csrfToken: req.csrfToken() })
})

// mount api before csrf is appended to the app stack
app.use('/api', router)










app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.use(router)





//start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})