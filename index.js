require("dotenv").config({ path: "./.env" });
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
    const query = `SELECT * FROM cargos WHERE cargo_nombre = '${msg}'`;
    conexion.query(query, (error, results) => {
      if (error) {
        io.emit("chat", `Error: ${error.message}`);
      } else {
        if (results.length === 0) {
          io.emit(
            "chat",
            `No se encontró persona con ese número de teléfono: ${msg}`
          );
        } else {
          results.forEach((element) => {
            name = element.cargo_nombre;
            mini = element.cargo_sueldo_minimo;
            max = element.cargo_sueldo_maximo;
          });
          const info = `cargo a consultar: ${msg}, Nombre de el cargo: ${name}, sueldo minimo: ${mini}, sueldo maximo: ${max}`;
          io.emit("chat", info);
        }
      }
    });
  });
});

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  // Variable para manejar el estado del cliente
  let estadoActual = null;

  socket.on("info", async (data) => {
    try {
      switch (data) {
        case "listarEmpleados":
          // Actualiza el estado actual
          estadoActual = "esperandoDocumento";
          socket.emit(
            "info",
            "Por favor, envía el documento del empleado a listar"
          );
          break;

        default:
          socket.emit("info", "Acción no válida");
          break;
      }
    } catch (error) {
      console.error("Error en la operación:", error.message);
      socket.emit("info", "Error interno del servidor");
    }
  });

  socket.on("nuevoDatoListar", async (msg) => {
    if (estadoActual === "esperandoDocumento") {
      try {
        let empleado = await obtenerEmpleadoPorID(msg);
        if (empleado) {
          socket.emit(
            "info",
            `Empleado encontrado: ${JSON.stringify(empleado)}`
          );
        } else {
          socket.emit("info", "Empleado no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener el empleado:", error.message);
        socket.emit("info", "Error al procesar la solicitud");
      }

      // Resetea el estado después de procesar
      estadoActual = null;
    } else {
      socket.emit(
        "info",
        "No estás en el flujo adecuado para listar empleados."
      );
    }
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

const obtenerEmpleadoPorID = async (id) => {
  console.log("Obtener empleado");
  const query = `SELECT * FROM empleados WHERE empl_ID = ${id}`;
  let empl_ID;
  let empl_primer_nombre;
  let empl_segundo_nombre;
  let empl_email;
  let empl_fecha_nac;
  let empl_sueldo;
  let empl_comision;
  let empl_cargo_ID;
  let empl_Gerente_ID;
  let empl_dpto_ID;

  try {
    conexion.query(query, (error, results) => {
      if (error) {
        return ` Error: ${error.message}`;
      } else {
        if (results.length === 0) {
          return `No se encontró persona con ese número de documento: ${id}`;
        } else {
          results.forEach((element) => {
            empl_ID = element.empl_ID;
            empl_primer_nombre = element.empl_primer_nombre;
            empl_segundo_nombre = element.empl_segundo_nombre;
            empl_email = element.empl_email;
            empl_fecha_nac = element.empl_fecha_nac;
            empl_sueldo = element.empl_sueldo;
            empl_comision = element.empl_comision;
            empl_cargo_ID = element.empl_cargo_ID;
            empl_Gerente_ID = element.empl_Gerente_ID;
            empl_dpto_ID = element.empl_dpto_ID;
          });
          return `empleado  a consultar: ${id}, Nombre de el : ${empl_primer_nombre} ${empl_segundo_nombre}, email: ${empl_email}, fecha nacimiento ${empl_fecha_nac} ,sueldo    ${empl_sueldo}`;
        }
      }
    });
  } catch (error) {
    console.error(error.getMessage());

    return `Error al obtener empleado: ${error.message}`;
  }
};
server.listen(4000, () => {
  console.log("Listening on http://localhost:3000");
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
});

app.get("/datos", (req, res) => {
  res.sendFile(`${__dirname}/client/mostrarDatos.html`);
});
