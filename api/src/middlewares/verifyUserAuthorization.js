  /* Middleware onde deixamos a lógica de autorização, para fazer a verificação se um usuário tem 
    permição ou não de executar as rotas, as funções dentro da API */

const AppError = require("../utils/AppError");

// recebemos uma array de quais perfils queremos dar acesso
function verifyUserAuthorization(roleToVerify){
    return (request, response, next) => {
        const { role } = request.user;

        // Se o perfil não estiver dentro da array, é dado uma excessão
        if(!roleToVerify.includes(role)){
            throw new AppError("Unathorized", 401);
        }

        return next();
    }
}

module.exports = verifyUserAuthorization;