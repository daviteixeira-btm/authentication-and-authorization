const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const knex = require("../database/knex");
const authConfig = require("../configs/auth");
const AppError = require("../utils/AppError");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    // Repassamos para dentro do token a role do usuário, ou seja, o tipo de perfil
    const token = sign({ role: user.role}, secret, {
      subject: String(user.id),
      expiresIn
    });

    // Quardamos o token dentro de um cookie para deixa-lo mais seguro
    response.cookie("token", token, {
      httpOnly: true, // Medida de segurança que impede do cookie ser acessado por scripts no navegador
      sameSite: "none",
      secure: true,
      maxAge: 15 * 60 * 1000 // Tempo de validade do cookie de 15 minutes (convertidos de milissegundos)
    });

    // Removemos da resposta da requisição a senha do usuário
    delete user.password;

    response.status(201).json({ user });
  }
}

module.exports = SessionsController;