import createError from 'http-errors';
import express,{Request,Response,NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from "./v1/routes/index";
import dotenv from 'dotenv'
import { connectDB } from './config/db';



dotenv.config();

connectDB()

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler// error handler
app.use(function(err: { message: any; status: any; }, req: Request, res: Response, next: NextFunction) {
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error"
    }
  });
});


export default app;
