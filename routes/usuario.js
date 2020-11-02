const {Router} = require ("express")
const router = Router()
const fs = require("fs")
const FileUser = fs.readFileSync ('./usuario.json', 'utf-8')
const JSONUser = JSON.parse(FileUser)

console.log(JSONUser)

router.get("/api", (req, res) => {
  res.send("API REST ESTUDIANTES")
})

router.get("/usuario", (req, res) => {
  res.json(JSONUser)
})

router.post("/usuario", (req, res) => {
  let id = JSONUser.length + 1
  let {correo, clave, placa, vehiculo, html} = req.body
  let nuevoUsuario =
    {
    "id" : id,
    "correo" : correo,
    "clave" : clave,
    "placa" : placa,
    "vehiculo" : vehiculo,
    "html" : html,
  }
  
  JSONUser.push(nuevoUsuario)

  fs.writeFileSync('./usuario.json',
  JSON.stringify(JSONUser), 'utf-8')
  res.json(nuevoUsuario)
})

router.get("/usuario/:id", (req, res) => {
let id = req.params.id
let usuarioEncontrado = JSONUser.find(usuario => usuario.id ==id)

if(usuarioEncontrado != undefined)
  res.status(200).json(usuarioEncontrado)
  else
  res.json(`El ID ${id} no existe`)
})

router.put("/usuario/:id", (req,res) => {
  let id = req.params.id 
  let {correo, clave, placa, vehiculo, html} = req.body

  let usuarioModifcado = JSONUser.find(usuario => {
    if(usuario.id == id){
      usuario.correo = correo
      usuario.clave = clave
      usuario.placa = placa
      usuario.vehiculo = vehiculo
      usuario.html = html
      return usuario
    }
  })

  if(usuarioModifcado != undefined){
    fs.writeFileSync('./usuario.json', JSON.stringify(JSONUser), 'utf-8')
    res.status(201).json(usuarioModifcado)
  }else{
    res.status(200).json(`El ID ${id} no existe`)
  }

})

router.delete("/usuario/:id", (req, res) => {
  let id = req.params.id
  let indexUsuario = JSONUser.findIndex(usuario => usuario.id == id)
  if(indexUsuario != -1){
    JSONUser.splice(indexUsuario, 1)
    fs.writeFileSync('./usuario.json', JSON.stringify(JSONUser), 'utf-8')
    res.status(200).json({mensaje : `usuario ${id} fue eliminado`})
  }else{
    res.json(`El id ${id} no existe`)
  }
})

module.exports = router