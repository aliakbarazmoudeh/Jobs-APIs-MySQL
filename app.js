require('express-async-errors');
require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./db/connectDB');
const port = process.PORT || 5000;

// swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// rest packages
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

// use packages
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(cors());
app.use(mongoSanitize());
app.use(cookieParser(process.env.JWT_SECRET));

// routes
const authRouter = require('./routes/authRoutes');
const jobRouter = require('./routes/jobRoutes');
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/job', jobRouter);

// middleware
const errorHandler = require('./middleware/error-handler');
const notFoundHanlder = require('./middleware/not-found');
const Job = require('./models/Job');
const User = require('./models/User');
app.use(notFoundHanlder);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB.sync();
    await Job.sync();
    await User.sync();
    app.listen(port, () => {
      console.log(
        `connected to database ... \napp is listening on port ${port} ...`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
