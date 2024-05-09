const { Router } = require("express");
const SalesController = require("../controllers/SalesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

// Importamos o middleware responsavel pela autorização do tipo de usuário
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const salesRoutes = Router();

const salesController = new SalesController();

salesRoutes.use(ensureAuthenticated);

// Utilizamos o middleware para todas as rotas, onde podemos colocar qual perfil tem acesso
salesRoutes.use(verifyUserAuthorization("admin"));

salesRoutes.get("/", salesController.index);

module.exports = salesRoutes;