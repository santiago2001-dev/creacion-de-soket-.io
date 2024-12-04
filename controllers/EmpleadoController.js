const conexion = require('../database/db');
const crearEmpleado = async (empleado) => {
  const {
    primerNombre,
    segundoNombre,
    email,
    fechaNacimiento,
    sueldo,
    comision,
    cargoID,
    gerenteID,
    departamentoID,
  } = empleado;

  const query = `
    INSERT INTO empleados 
    (empl_primer_nombre, empl_segundo_nombre, empl_email, empl_fecha_nac, empl_sueldo, empl_comision, empl_cargo_ID, empl_Gerente_ID, empl_dpto_ID) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    const [result] = await pool.query(query, [
      primerNombre,
      segundoNombre,
      email,
      fechaNacimiento,
      sueldo,
      comision,
      cargoID,
      gerenteID,
      departamentoID,
    ]);

    return { id: result.insertId, message: 'Empleado creado exitosamente' };
  } catch (error) {
    throw new Error(`Error al crear empleado: ${error.message}`);
  }
};

// Obtener todos los empleados
const listarEmpleados = async () => {
  console.log("Listar empleados ejecute")
  const query = 'SELECT * FROM empleados';

  try {
    pool.query(query, (error, results) => {
      if (error) {
        return `Error: ${error.message}`
      } else {
        if (results.length === 0) {
          return `No results found`
         
        } else {
           return results[0]
          // let empleadosInfo = results.map(element => {
          //   return `ID: ${element.empl_ID}, Primer Nombre: ${element.empl_primer_nombre}, Segundo Nombre: ${element.empl_segundo_nombre || "N/A"}, Email: ${element.empl_email || "N/A"}, Fecha de Nacimiento: ${element.empl_fecha_nac || "N/A"}, Sueldo: ${element.empl_sueldo || "N/A"}, Comisión: ${element.empl_comision || "N/A"}, Cargo ID: ${element.empl_cargo_ID || "N/A"}, Gerente ID: ${element.empl_Gerente_ID || "N/A"}, Departamento ID: ${element.empl_dpto_ID || "N/A"}`;
          // }).join('\n'); 
          // return empleadosInfo
        }
      }
    });
  } catch (error) {
    return (`Error al listar empleados: ${error.message}`);
  }
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
        return resolve(`No se encontró persona con ese número de documento: ${id}`);
      }

      const empleado = results.map((element) => ({
        empl_ID: element.empl_ID,
        empl_primer_nombre: element.empl_primer_nombre,
        empl_segundo_nombre: element.empl_segundo_nombre,
        empl_email: element.empl_email,
        empl_fecha_nac: element.empl_fecha_nac,
        empl_sueldo: element.empl_sueldo,
        empl_comision: element.empl_comision,
        empl_cargo_ID: element.empl_cargo_ID,
        empl_Gerente_ID: element.empl_Gerente_ID,
        empl_dpto_ID: element.empl_dpto_ID,
      }));

      return resolve(empleado);
    });
  });
};

// Actualizar un empleado
const actualizarEmpleado = async (id, empleado) => {
  const {
    primerNombre,
    segundoNombre,
    email,
    fechaNacimiento,
    sueldo,
    comision,
    cargoID,
    gerenteID,
    departamentoID,
  } = empleado;

  const query = `
    UPDATE empleados 
    SET empl_primer_nombre = ?, empl_segundo_nombre = ?, empl_email = ?, 
        empl_fecha_nac = ?, empl_sueldo = ?, empl_comision = ?, 
        empl_cargo_ID = ?, empl_Gerente_ID = ?, empl_dpto_ID = ?
    WHERE empl_ID = ?`;

  try {
    const [result] = await pool.query(query, [
      primerNombre,
      segundoNombre,
      email,
      fechaNacimiento,
      sueldo,
      comision,
      cargoID,
      gerenteID,
      departamentoID,
      id,
    ]);

    if (result.affectedRows === 0) {
      throw new Error('Empleado no encontrado para actualizar');
    }
    return { message: 'Empleado actualizado exitosamente' };
  } catch (error) {
    throw new Error(`Error al actualizar empleado: ${error.message}`);
  }
};

// Eliminar un empleado
const eliminarEmpleado = async (id) => {
  const query = 'DELETE FROM empleados WHERE empl_ID = ?';

  try {
    const [result] = await pool.query(query, [id]);
    if (result.affectedRows === 0) {
      throw new Error('Empleado no encontrado para eliminar');
    }
    return { message: 'Empleado eliminado exitosamente' };
  } catch (error) {
    throw new Error(`Error al eliminar empleado: ${error.message}`);
  }
};

module.exports = {
  crearEmpleado,
  listarEmpleados,
  obtenerEmpleadoPorID,
  actualizarEmpleado,
  eliminarEmpleado,
};
