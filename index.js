const express = require("express")
const path = require("path")
const morgan = require("morgan")
const app = express()

//Middlewares
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use("/API/", require("./routes/usuario"))

app.get("/", (req, res) => {
  res.send("Datos usuario")
})

app.set("puerto", 8081)

app.listen (app.get ("puerto"), () => {
  console.log(`Servidor corriendo en el puerto ${app.get("puerto")}`)
})