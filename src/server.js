const { mongoConnect } = require('./database/mongodb');

const userRoute = require('./routes/user.routes');
const courseRoute = require('./routes/course.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

mongoConnect();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carregando rotas
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', userRoute);
app.use('/api', courseRoute);

app.listen(process.env.PORT);
console.log("Servidor rodando na porta " + process.env.PORT);