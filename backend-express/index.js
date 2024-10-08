const express = require('express') //import express
const router = require('./routes');
const corsConfig = require('./config/corsConfig');
const { csrfProtection, cookieParser } = require('./config/csrfConfig');
const limiter = require('./config/rateLimitingConfig');
const app = express() //init app



//define port
const port = 3000;

// Percaya pada proxy
// app.set('trust proxy', true);
app.use(limiter)
// setup,upload file 
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// setup cors, csrf
app.use(corsConfig)
app.use(cookieParser())
// app.use(csrfMiddleware()); // Gunakan csrfMiddleware untuk rute yang memerlukannya


// ===========================================================================================
// setup csrf
app.get('/api/csrf-token', csrfProtection, function (req, res) {
  res.status(200).send({ csrfToken: req.csrfToken() })
})

// mount api before csrf is appended to the app stack
app.use('/api', router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})






//start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})