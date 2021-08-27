import React from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import Comercios from './Comercios'

export const TableComercios = ({data, seleccionarUsuario}) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre Comercio Adherido</TableCell>
                        <TableCell>Descripción Comercio Adherido</TableCell>
                        <TableCell>Dirección Comercio Adherido</TableCell>
                        <TableCell>Número dirección Comercio Adherido</TableCell>
                        <TableCell>Localidad Comercio Adherido</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((usuario, i) => (
                        <Comercios
                            key={i}
                            usuario={usuario}
                            seleccionarUsuario={seleccionarUsuario}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
