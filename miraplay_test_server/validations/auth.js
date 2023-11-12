import { body } from "express-validator";

export const registerValidator = [
  body('email').isEmail(),
  body('password', 'Пароль занадто корткий').isLength({min: 5}),
  body('login').isLength({min: 3})  
];
