import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";

import ListItemUsuario from "./ListItemUsuario";

const TableUsuario = ({ dataUsuarios, isLoadingData, seleccionarUsuario }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id Usuario</TableCell>
            <TableCell>Nombre Usuario</TableCell>
            <TableCell>Descripción Usuario</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoadingData ? (
            <p>Cargando data ...</p>
          ) : (
            dataUsuarios.map((usuario, i) => (
              <ListItemUsuario
                key={i}
                usuario={usuario}
                seleccionarUsuario={seleccionarUsuario}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableUsuario;
