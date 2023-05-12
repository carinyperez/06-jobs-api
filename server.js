require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

// extra security packages 
const helmet = require('helmet');
const cors = require('cors'); 
const xss  = require('xss-clean'); 
const rateLimiter = require('express-rate-limit');


// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(helmet())
app.use(cors())
app.use(xss())
app.set('trust proxy', 1);
// limit each IP to 100 requests per windowMs 
app.use(rateLimiter({
	windowsMs: 15 * 60 * 1000,
	max: 100,
}))

app.use(express.json());
// app.use(express.static('frontend/build'))
// extra packages

app.get('/', function(req, res){
	res.send('jobs api')
})

// app.get('/*', function(req, res){
// 	res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'))
// })

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
	await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();


