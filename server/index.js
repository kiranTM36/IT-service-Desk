require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { OAuth2Client } = require("google-auth-library");
const db = require("./db");

const app = express();

//modules
const roleModules = require('./modules/roleModules')
const userModules = require('./modules/userModules')
const categoryModules = require('./modules/categoryModule')
const ticketModule = require('./modules/ticketModule')

roleModules()
userModules()
categoryModules()
ticketModule()

//route
const roleRoute = require('./routes/role.route')
const userRoute = require('./routes/user.route')
const categoryRoute = require('./routes/category.route')
const ticketRoute = require('./routes/ticket.route')

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use('/role', roleRoute )
app.use('/user', userRoute )
app.use('/category' , categoryRoute)
app.use('/ticket' , ticketRoute)


app.listen(process.env.PORT, () => {
    console.log("Server is running ");
});