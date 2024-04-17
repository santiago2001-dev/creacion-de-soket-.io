const { Socket } = require("dgram");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const conexion = require("./database/db");
const io = new Server(server);

io.on("connection", (socket) => {

    //busqueda de persona por telefono
  socket.on("chat", (msg) => {
    let name, tel, dir, ciudad;
    const query = `SELECT dir_tel, dir_nombre, dir_direccion FROM personas WHERE dir_tel = '${msg}'`;
    conexion.query(query, (error, results) => {
      if (error) {
        io.emit("chat", `Error: ${error.message}`);
      } else {
        if (results.length === 0) {
          io.emit("chat", `No se encontró persona con ese número de teléfono: ${msg}`);
        } else {
          results.forEach((element) => {
            name = element.dir_nombre;
            tel = element.dir_tel;
            dir = element.dir_direccion;
          });
          const info = `Número a consultar: ${msg}, Nombre de la persona: ${name}, Teléfono: ${tel}, Dirección: ${dir}`;
          io.emit("chat", info);
        }
      }
    });
  });

 
})



io.on("connection", (socket) => {
 //muestra de informacion de persona enviada desde el cliente 
 socket.on("info", (msg) => {
   
    console.log("usario conectado");

 console.log(`informacion recibida: ${msg}`)
      io.emit("info", `informacion recibida: ${msg}`);
    
  })


})


server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});



app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/client/index.html`);
  });


  app.get("/datos", (req, res) => {
    res.sendFile(`${__dirname}/client/mostrarDatos.html`);
  });