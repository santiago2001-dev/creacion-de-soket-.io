require("dotenv").config({ path: "./.env" });
const { Socket } = require("dgram");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const conexion = require("./database/db");
const {
  obtenerEmpleadoPorID,
  crearEmpleado,
  eliminarEmpleado,
  crearPais,
} = require("./controllers/EmpleadoController");

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  // Variable para manejar el estado del cliente
  let estadoActual = null;

  socket.on("oninfo", async (data) => {
    try {
      switch (data[0]) {
        case "listarEmpleados":
          // Actualiza el estado actual
          estadoActual = "esperandoDocumento";
          socket.emit("emitinfo", [
            "Por favor, envía el documento del empleado a listar ",
            estadoActual,
          ]);
          break;

        case "esperandoDocumento":
          // Actualiza el estado actual
          estadoActual = null;
          let empleado = await obtenerEmpleadoPorID(data[1]);
          console.log(empleado);
          socket.emit("emitinfo", [empleado, estadoActual]);
          break;

        case "crearEmpleado":
          // Actualiza el estado actual
          estadoActual = "esperandoDocumentoCrear";
          socket.emit("emitinfo", [
            "Por favor, envía el datos del empleado a cargar seperados por ,  ",
            estadoActual,
          ]);
          break;

        case "esperandoDocumentoCrear":
          // Actualiza el estado actual
          estadoActual = null;
          let response = await crearEmpleado(data[1]);
          socket.emit("emitinfo", [response, estadoActual]);
          break;

        case "eliminarEmpleado":
          // Actualiza el estado actual
          estadoActual = "esperandoDocumentoElmin";
          socket.emit("emitinfo", [
            "Por favor, envía el documento del empleado a eliminar ",
            estadoActual,
          ]);
          break;

        case "eliminarEmpleado":
          // Actualiza el estado actual
          estadoActual = "esperandoDocumentoElmin";
          socket.emit("emitinfo", [
            "Por favor, envía el documento del empleado a eliminar ",
            estadoActual,
          ]);
          break;

        case "esperandoDocumentoElmin":
          // Actualiza el estado actual
          estadoActual = null;
          let responseelm = await eliminarEmpleado(data[1]);
          socket.emit("emitinfo", [responseelm, estadoActual]);
          break;


          case "crearPais":
            // Actualiza el estado actual
            estadoActual = "esperandoPaisoCrear";
            socket.emit("emitinfo", [
              "Por favor, envía el datos del pais a cargar seperados por ,  ",
              estadoActual,
            ]);
            break;
  
          case "esperandoPaisoCrear":
            // Actualiza el estado actual
            estadoActual = null;
            let responsePais = await crearPais(data[1]);
            socket.emit("emitinfo", [responsePais, estadoActual]);
            break;

        default:
          socket.emit("info", "Acción no válida");
          break;
      }
    } catch (error) {
      console.error("Error en la operación:", error);
      socket.emit("info", "Error interno del servidor");
    }
  });

  // socket.on("emitinfo", async (msg) => {
  //   console.log(msg[1])
  //   if (estadoActual === "esperandoDocumento") {
  //     try {
  //       let empleado = await obtenerEmpleadoPorID(msg);
  //       if (empleado) {
  //         socket.emit(
  //           "info",
  //           `Empleado encontrado: ${JSON.stringify(empleado)}`
  //         );
  //       } else {
  //         socket.emit("info", "Empleado no encontrado");
  //       }
  //     } catch (error) {
  //       console.error("Error al obtener el empleado:", error.message);
  //       socket.emit("info", "Error al procesar la solicitud");
  //     }

  //     // Resetea el estado después de procesar
  //     estadoActual = null;
  //   } else {
  //     socket.emit(
  //       "info",
  //       "No estás en el flujo adecuado para listar empleados."
  //     );
  //   }
  // });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
});

app.get("/datos", (req, res) => {
  res.sendFile(`${__dirname}/client/mostrarDatos.html`);
});
