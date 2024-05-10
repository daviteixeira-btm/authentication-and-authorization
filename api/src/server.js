require("express-async-errors");

const cors = require("cors");
const express = require("express");
const routes = require("./routes");

const cookieParser = require("cookie-parser");

const AppError = require("./utils/AppError");

const app = express();
app.use(express.json());
app.use(cookieParser()); // Middleware que vai auxiliar o parser do cookie
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Conseguimos definir os endereços que vão acessar o backend
  credentials: true // Quando o backend devolver a resposta para o frontend ele vai enviar o cookie que vai ser utilizado 
}));

app.use(routes);

app.use((err, request, response, next) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }
  
    console.error(err);
  
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
});


const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));