import React, { useState } from 'react';
import { Modal, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

import { useStyles } from "../css/ComercioAdheridoStyles";

import http_, { baseUrl } from "../../common/http-comercio_adherido"

import ModalVerMas from './ModalVerMas';
import InsertarComercio from './InsertarComercio';

import { TableComercios } from './TableComercios';
import EliminarComercio from './EliminarComercio';

const Comercios = () => {

  const styles = useStyles();

  const [data, setData] = useState([]);
  const [dataId, setDataId] = useState([]);

  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalVerMas, setModalVerMas] = useState(false);

  const [itemSelected, setItemSelected] = useState();

  const [comercioSeleccionado, setComercioSeleccionado] = useState({

    // id_comercio_adherido: '', 
    // nombre_comercio_adherido: '',
    // descripcion_comercio_adherido:'',
    // direccion_comercio_adherido:'',
    // numero_direccion_comercio_adherido:'',
    // detalle_comercio_adherido:'',
    // url_facebook_comercio_adherido:'',
    // url_twitter_comercio_adherido:'',
    // url_youtube_comercio_adherido:'',
    // url_whatsapp_comercio_adherido:'',
    // url_instagram_comercio_adherido:'',
    // url_web_comercio_adherido:'',
    // nombre_localidad:'',
    // nombre_cliente:'',
    // nombre_categoria:''

  })

  const [open, setOpen] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;

    setComercioSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const seleccionarUsuario = (usuario, caso) => {

    setComercioSeleccionado(usuario);

    if (caso === 'Editar') {
      abrirCerrarModalEditar()
    } else if (caso === 'Eliminar') {
      abrirCerrarModalEliminar()
    } else {
      abrirCerrarModalVerMas(usuario)
    }
  }

  const getComercioAdheridoId = async (id) => {
    await http_.get(baseUrl + id)
      .then(response => {
        const { data: { data } } = response;
        setDataId(data);
      })
  }

  const insertComercioAdherido = async () => {

    const formData = new FormData();
    for (let key in comercioSeleccionado) {
      formData.append(key, comercioSeleccionado[key]);
    }

    await http_.post(baseUrl, formData)
      .then(response => {
        setData(data.concat(response.data))
        abrirCerrarModalInsertar();
        //getComercioAdherido();
        handleClickOpen();

      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
        window.alert("Ha ocurrido un error al registrar el Comercio Adherido")

        console.error('There was an error!', error);
      });
  }

  const editComercioAdherido = async () => {
    await http_.put(baseUrl + comercioSeleccionado.id_comercio_adherido, comercioSeleccionado)
      .then(response => {
        // setData(data.concat(response.data))
        setData(data.concat(response.data));
        abrirCerrarModalEditar();
        //getComercioAdherido();
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
        console.error('There was an error!', error);
      });
  }

  const deleteComercioAdherido = async () => {
    await http_.delete(baseUrl + comercioSeleccionado.id_comercio_adherido)
      .then(response => {
        setData(data.filter(usuario => usuario.id_comercio_adherido !== comercioSeleccionado.id_comercio_adherido));
        abrirCerrarModalEliminar();
        //getComercioAdherido();
      })
  }

  const abrirCerrarModalVerMas = (usuario) => {
    setModalVerMas(!modalVerMas);
    if (usuario) {
      getComercioAdheridoId(usuario.id_comercio_adherido);
    }
  }

  const abrirCerrarModalEliminar = () => setModalEliminar(!modalEliminar);
  const abrirCerrarModalInsertar = () => setModalInsertar(!modalInsertar);
  const abrirCerrarModalEditar = () => setModalEditar(!modalEditar);

  return (

    <div className="usuarios">
      <br />
      <Button className={styles.root} onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
      <br /><br />

      <TableComercios seleccionarUsuario={seleccionarUsuario} />

      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}>
        { <InsertarComercio abrirCerrarModalInsertar={abrirCerrarModalInsertar} /> }
      </Modal>

      {/* <Modal
    open={modalEditar}
    onClose={abrirCerrarModalEditar}>
    {bodyEditar}
 </Modal> */}

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}>
        {
          <EliminarComercio
            comercioSeleccionado={comercioSeleccionado}
            deleteComercioAdherido={deleteComercioAdherido}
            abrirCerrarModalEliminar={abrirCerrarModalEliminar}
          />
        }
      </Modal>

      <Modal
        open={modalVerMas}
        onClose={abrirCerrarModalVerMas}>
        {
          <ModalVerMas
            handleChange={handleChange}
            dataId={dataId}
            abrirCerrarModalVerMas={abrirCerrarModalVerMas}
          />
        }
      </Modal>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogTitle id="alert-dialog-title">{"Comercio Adherido Agregado Correctamente"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Comercio Adherido Agregado Correctamente
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default Comercios;