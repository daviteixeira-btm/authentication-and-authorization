const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers;

  // Verifica se tem um cookie
  if (!authHeader.cookie) {
    throw new AppError('JWT token não informado', 401);
  }

  const [, token] = authHeader.split('token=');

  try {
    // Recuperamos a informação de 'role' do usuário
    const { role, sub: user_id } = verify(token, authConfig.jwt.secret);

    /* Depois a inserimos na requisição, assim poderemos verificar qual 
    o perfil do usuário para saber se ele pode ou não executar funções dentro da API */
    request.user = {
      id: Number(user_id),
      role
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}

module.exports = ensureAuthenticated;