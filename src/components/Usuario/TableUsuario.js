import React, { useContext } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";

import ListItemUsuario from "./ListItemUsuario";
import UserContext from "../../context/usuarios/UserContext";

const TableUsuario = ({ dataUsuarios, isLoadingData, abrirCerrarModalEliminar }) => {

  const { seleccionarUsuario } = useContext(UserContext);

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
                abrirCerrarModalEliminar={abrirCerrarModalEliminar}
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
