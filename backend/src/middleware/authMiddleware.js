import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'No autorizado: no se proporcionó un token válido' });
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token expirado. Por favor, vuelve a iniciar sesión' });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Token inválido' });
    }

    res.status(403).json({ message: 'No autorizado', error: error.message });
  }
};
