const { mongoConnect } = require('./database/mongodb')

const userRoute = require('./routes/User/user.routes')
const authRoute = require('./routes/Auth/auth.routes')
const courseRoute = require('./routes/Course/course.routes')
const companyRoute = require('./routes/Company/company.routes')
const classRoute = require('./routes/Class/class.routes')
const technologyRoute = require('./routes/Technology/technology.routes')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./swagger')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')

dotenv.config()

mongoConnect()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({ extended: true }))

// Carregando rotas
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/api', authRoute)
app.use('/api', userRoute)
app.use('/api', courseRoute)
app.use('/api', classRoute)
app.use('/api', companyRoute)
app.use('/api', technologyRoute)

app.listen(process.env.PORT)
console.log('Servidor rodando na porta ' + process.env.PORT)
