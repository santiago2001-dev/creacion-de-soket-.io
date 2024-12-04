const conexion = require("../database/db");
const crearEmpleado = (empleadoString) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Dividir el string recibido y asignar valores
      const [
        empl_ID,
        primerNombre,
        segundoNombre,
        email,
        fechaNacimiento,
        sueldo,
        comision,
        cargoID,
        gerenteID,
        departamentoID,
      ] = empleadoString.split(",");
      console.log(primerNombre, segundoNombre);

      const query = `
        INSERT INTO empleados 
        (empl_ID,empl_primer_nombre, empl_segundo_nombre, empl_email, empl_fecha_nac, empl_sueldo, empl_comision, empl_cargo_ID, empl_Gerente_ID, empl_dpto_ID) 
        VALUES ( 
        ${empl_ID},
        '${primerNombre}',
        '${segundoNombre}',
        '${email}',
        '${fechaNacimiento}',
        ${parseFloat(sueldo)},
        ${parseFloat(comision)},
        ${parseInt(cargoID)},
        ${parseInt(gerenteID)},
        ${parseInt(departamentoID)})`;

      // Ejecutar la consulta utilizando un conexion
      conexion.query(query);
      conexion.removeAllListeners();

      // Resolver con los detalles del nuevo empleado
      return resolve(`Empleado creado exitosamente `);
    } catch (error) {
      return reject(`Error al crear empleado: ${error}`);
    }
  });
};

const crearPais = (paisString) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Dividir el string recibido y asignar valores
      const [pais_nombre, pais_ID] = paisString.split(",");

      const query = `
        INSERT INTO paises 
        (pais_nombre,pais_ID) 
        VALUES ( 
        '${pais_nombre}',
        ${parseFloat(pais_ID)})`;

      // Ejecutar la consulta utilizando un conexion
      conexion.query(query);
      conexion.removeAllListeners();

      // Resolver con los detalles del nuevo empleado
      return resolve(`pais creado exitosamente `);
    } catch (error) {
      return reject(`Error al crear empleado: ${error}`);
    }
  });
};

// Obtener un empleado por su ID
const obtenerEmpleadoPorID = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM empleados WHERE empl_ID = ${id}`;
    conexion.query(query, (error, results) => {
      if (error) {
        return reject(`Error: ${error.message}`);
      }

      if (results.length === 0) {
        return resolve(
          `No se encontró persona con ese número de documento: ${id}`
        );
      }

      // Generar un string concatenado con las variables separadas por ":"
      const empleadoString = results
        .map(
          (element) =>
            `${element.empl_ID},${element.empl_primer_nombre},${element.empl_segundo_nombre},${element.empl_email},${element.empl_fecha_nac},${element.empl_sueldo},${element.empl_comision},${element.empl_cargo_ID},${element.empl_Gerente_ID},${element.empl_dpto_ID}`
        )
        .join("\n"); // En caso de múltiples resultados, unirlos con saltos de línea

      return resolve(empleadoString);
    });
  });
};
// Eliminar un empleado
const eliminarEmpleado = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM empleados WHERE empl_ID = ?";

    conexion.query(query, [id], (error, results) => {
      if (error) {
        return reject(`Error al eliminar empleado: ${error.message}`);
      }

      resolve("Empleado eliminado exitosamente");
    });
  });
};

module.exports = {
  crearEmpleado,
  obtenerEmpleadoPorID,
  eliminarEmpleado,
  crearPais,
};
