import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { registerValidator } from './validations/auth.js';

import * as UserController from './controllers/UserController.js';

import checkAuth from './utils/checkAuth.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose.connect('mongodb+srv://Admin:admin@trainapp.acptxbv.mongodb.net/miraplay?retryWrites=true&w=majority',)
.then(() => {console.log('Connect to db')})
.catch((err) => {console.log('Db error', err)})

const app = express();

app.use(express.json());
app.use(cors());

app.post('/auth/login', handleValidationErrors, UserController.login);

app.post('/auth/register', registerValidator, handleValidationErrors, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe)

app.listen(4444, (err) => {
  if(err) {
    return console.log(err);
  }

  console.log('Server OK')
})