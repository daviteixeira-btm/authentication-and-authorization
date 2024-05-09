const { Router } = require("express");
const ProductsController = require("../controllers/ProductsController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

// Importamos o middleware responsavel pela autorização do tipo de usuário
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const productsRoutes = Router();

const productsController = new ProductsController();

productsRoutes.use(ensureAuthenticated);

productsRoutes.get("/", productsController.index);

// Somente o perfil de admin pode acessar e criar novos produtos
productsRoutes.post("/", verifyUserAuthorization("admin"), productsController.create);

module.exports = productsRoutes;