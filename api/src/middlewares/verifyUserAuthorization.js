  /* Middleware onde deixamos a lógica de autorização, para fazer a verificação se um usuário tem 
    permição ou não de executar as rotas, as funções dentro da API */

const AppError = require("../utils/AppError");

function verifyUserAuthorization(roleToVerify){
    return (request, response, next) => {
        const { role } = request.user;

        if(role !== roleToVerify){
            throw new AppError("Unathorized", 401);
        }

        return next();
    }
}

module.exports = verifyUserAuthorization;