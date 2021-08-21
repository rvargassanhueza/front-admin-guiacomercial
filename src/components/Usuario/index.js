import React, { useContext, useState } from "react";
import { Modal, Button } from "@material-ui/core";

// Css Global
import ContainerModal from "../Container";
import { useStyles } from "../css/UsuariosStyles";

//Context
import UserContext from "../../context/usuarios/UserContext";

//Components
import InsertarUsuario from "./InsertarUsuario";
import TableUsuario from "./TableUsuario";

const MainUsuarios = () => {

  const styles = useStyles();

  const { isLoadingData, usuarioSeleccionado, borrarUsuario } = useContext(UserContext);

  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const abrirCerrarModalEliminar = () => setModalEliminar(!modalEliminar)
  const abrirCerrarModalInsertar = () => setModalInsertar(!modalInsertar)

  const bodyInsertar = ( 
    <InsertarUsuario  
      abrirCerrarModalInsertar={abrirCerrarModalInsertar}
    />
  );

  const bodyEliminar = (
    <ContainerModal>
      <p>
        Estás seguro que deseas eliminar al usuario{" "}
        <b>{usuarioSeleccionado && usuarioSeleccionado.nombre_usuario}</b> ?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarUsuario(usuarioSeleccionado, abrirCerrarModalEliminar)}>
          Sí
        </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </ContainerModal>
  );

  return (
    <div className="usuarios">
      <br />
      <Button
        className={styles.root}
        onClick={() => abrirCerrarModalInsertar()}
      >
        Insertar
      </Button>
      <br />
      <br />

      <TableUsuario  
        isLoadingData={isLoadingData} 
        abrirCerrarModalEliminar={abrirCerrarModalEliminar} 
      />

      <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>{bodyInsertar}</Modal>
      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>{bodyEliminar}</Modal>
    </div>
  );
};

export default MainUsuarios;
