import React from 'react'
import { TableRow, TableCell, Button } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

const Comercios = ({ usuario, seleccionarUsuario }) => {

    console.log(usuario);

    const { id_comercio_adherido, nombre_comercio_adherido, descripcion_comercio_adherido,
        direccion_comercio_adherido, numero_direccion_comercio_adherido, nombre_localidad } = usuario;

    return (
        <TableRow key={id_comercio_adherido}>
            <TableCell>{nombre_comercio_adherido}</TableCell>
            <TableCell>{descripcion_comercio_adherido}</TableCell>
            <TableCell>{direccion_comercio_adherido}</TableCell>
            <TableCell>{numero_direccion_comercio_adherido}</TableCell>
            <TableCell>{nombre_localidad}</TableCell>
            <TableCell>
                <Button className={styles.root} onClick={() => seleccionarUsuario(usuario, 'Ver Mas')}>Ver Más</Button>
            </TableCell>
            <TableCell>
                <Edit className={styles.iconos} onClick={() => seleccionarUsuario(usuario, 'Editar')} />
                &nbsp;&nbsp;&nbsp;
                <Delete className={styles.iconos} onClick={() => seleccionarUsuario(usuario, 'Eliminar')} />
            </TableCell>
        </TableRow>
    )
}

export default Comercios
