import React, { useContext } from "react";
import PropTypes from 'prop-types';
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";

import Usuarios from "./Usuarios";
import UserContext from "../../context/usuarios/UserContext";

import { ClipLoader } from 'react-spinners';

const TableUsuario = ({isLoadingData, abrirCerrarModalEliminar }) => {

  const { seleccionarUsuario, dataUsuarios } = useContext(UserContext);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tipo Usuario</TableCell>
            <TableCell>Nombre Usuario</TableCell>
            <TableCell>Descripción Usuario</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {!isLoadingData ? (
            dataUsuarios.map((usuario, i) => (
              <Usuarios
                key={usuario.id_usuario}
                usuario={usuario}
                abrirCerrarModalEliminar={abrirCerrarModalEliminar}
                seleccionarUsuario={seleccionarUsuario}
              />
            ))
          ):(<ClipLoader size={100} color="red" />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableUsuario.defaultProps = {
  isLoadingData: true,
  abrirCerrarModalEliminar: () => {}
};

TableUsuario.propTypes = {
  isLoadingData: PropTypes.bool.isRequired,
  abrirCerrarModalEliminar: PropTypes.func.isRequired
};

export default TableUsuario;
