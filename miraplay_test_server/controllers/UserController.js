import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// import { validationResult } from 'express-validator';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
  try {


  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const doc = new UserModel({
    email: req.body.email,
    login: req.body.login,
    passwordHash: hash,
  });

  const user = await doc.save();

  const token = jwt.sign({
    id_: user._id
  },
  'secret_key',
  {
    expiresIn: '10d'
  })

  const { passwordHash, ...userData } = user._doc;

  res.json({...userData,
    token,
  })
  } catch (error) {
    console.log(error)
    res.status(500);
    res.json({
      message: 'Не вдалось зареєструватись, можливо такий користувач вже існує'
    })
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)

    if(!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }
    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
    
  } catch (error) {

    console.log(err)

    return res.status(500).json({
      message: 'No access'
    })
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({login: req.body.login })

    if(!user) {
      return res.status(404).json({
        message: 'Користувача не знайдено'
      })
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

    if(!isValidPass) {
      return res.status(404).json({
        message: 'Wrong login or password'
      })
    }

    const token = jwt.sign({
      id_: user._id
    },
    'secret_key',
    {
      expiresIn: '10d'
    })

    const { passwordHash, ...userData } = user._doc;

    res.json({...userData,
      token,
    })

  } catch (error) {
    console.log(error)
    res.status(500);
    res.json({
      message: 'auth failed'
    })
  }
};

