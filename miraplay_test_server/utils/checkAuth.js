import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret_key');

      req.userId = decoded.id_

      console.log(decoded);
      next();
    } catch (error) {
      return res.status(403).json({
        message: 'No acces'
      })
    }
  } else {
    return res.status(403).json({
      message: 'No acces'
    })
  }
}