  // Insertar datos
  socket.on('crear', async (datos) => {
    const { tipo, payload } = datos;

    try {
      switch (tipo) {
      

        case 'ciudad':
          await db.execute("INSERT INTO ciudades (ciud_ID, ciud_pais_ID, ciud_nombre) VALUES (?, ?, ?)", [
            payload.id, payload.paisId, payload.nombre
          ]);
          socket.emit('respuesta', { mensaje: 'Ciudad creada correctamente.' });
          break;

        case 'empleado':
          await db.execute(`
            INSERT INTO empleados (empl_ID, empl_primer_nombre, empl_segundo_nombre, empl_email, empl_fecha_nac, empl_sueldo, empl_cargo_ID, empl_dpto_ID) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            payload.id, payload.primerNombre, payload.segundoNombre, payload.email, payload.fechaNac,
            payload.sueldo, payload.cargoId, payload.departamentoId
          ]);
          socket.emit('respuesta', { mensaje: 'Empleado creado correctamente.' });
          break;

        default:
          socket.emit('respuesta', { error: 'Operación no reconocida.' });
          break;
      }
    } catch (error) {
      console.error('Error en operación de creación:', error);
      socket.emit('respuesta', { error: 'Error al realizar la operación.' });
    }
  });

  // Consultar empleado
  socket.on('consultar_empleado', async (id) => {
    try {
      const [empleado] = await db.execute("SELECT * FROM empleados WHERE empl_ID = ?", [id]);
      socket.emit('respuesta', { empleado: empleado[0] || null });
    } catch (error) {
      console.error('Error al consultar empleado:', error);
      socket.emit('respuesta', { error: 'No se pudo consultar al empleado.' });
    }
  });

  // Retirar empleado
  socket.on('retirar_empleado', async (id) => {
    try {
      await db.execute("UPDATE empleados SET activo = 0 WHERE empl_ID = ?", [id]);
      await db.execute(`
        INSERT INTO historico_empleados (empl_ID, accion, fecha) 
        VALUES (?, 'Retiro', NOW())
      `, [id]);
      socket.emit('respuesta', { mensaje: 'Empleado retirado y registrado en el histórico.' });
    } catch (error) {
      console.error('Error al retirar empleado:', error);
      socket.emit('respuesta', { error: 'No se pudo retirar al empleado.' });
    }
  });

  // Actualizar dirección y ciudad
  socket.on('actualizar_direccion', async (datos) => {
    const { id, nuevaDireccion, nuevaCiudadId } = datos;

    try {
      await db.execute("UPDATE empleados SET direccion = ?, ciud_ID = ? WHERE empl_ID = ?", [
        nuevaDireccion, nuevaCiudadId, id
      ]);
      const [empleado] = await db.execute("SELECT * FROM empleados WHERE empl_ID = ?", [id]);
      socket.emit('respuesta', { mensaje: 'Dirección actualizada correctamente.', empleado: empleado[0] });
    } catch (error) {
      console.error('Error al actualizar dirección:', error);
      socket.emit('respuesta', { error: 'No se pudo actualizar la dirección.' });
    }
  });