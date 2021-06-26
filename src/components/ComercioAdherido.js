import React, {useEffect, useState} from 'react';

import './../../src/App.css';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import http from "../http-common";
import http_ from "../http-comercio_adherido"

const baseUrl='/comercioAdherido/';

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    },
    root: {
      background: 'linear-gradient(45deg, #060b26 30%, #060b26 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    }
  }));

  function FormularioComercioAdherido(){

    const styles= useStyles();

    const [data, setData] = useState([]);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);

    const [comercioSeleccionado, setComercioSeleccionado] = useState({
      id_comercio_adherido: '',
      // id_tipo_usuario: '',
      nombre_comercio_adherido: '',
      descripcion_comercio_adherido:'',
      direccion_comercio_adherido:'',
      numero_direccion_comercio_adherido:'',
      detalle_comercio_adherido:'',
      url_facebook_comercio_adherido:'',
      url_twitter_comercio_adherido:'',
      url_youtube_comercio_adherido:'',
      url_whatsapp_comercio_adherido:'',
      url_instagram_comercio_adherido:'',
      url_web_comercio_adherido:'',
      id_localidad:'',
      id_cliente:'',
    })

    const handleChange=e=>{
      const {name, value}=e.target;
      setComercioSeleccionado(prevState=>({
        ...prevState,
        [name]: value
      }))
      console.log(comercioSeleccionado);
    }

    const seleccionarUsuario=(usuario, caso)=>{
      setComercioSeleccionado(usuario);
      // (caso==='Editar')?null:abrirCerrarModalEliminar()
      abrirCerrarModalEliminar();
    }

    const getComercioAdherido = async()=>{
      await http_.get(baseUrl)
      .then(response=>{
        const {data:{data}} = response;
        setData(data);
      })
    }

    const insertComercioAdherido = async()=>{
      await http_.post(baseUrl, comercioSeleccionado)
      .then(response=>{
        setData(data.concat(response.data))
        abrirCerrarModalInsertar()
      })
      .catch(error=>{
        this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
      });
    }

    const deleteComercioAdherido = async()=>{
      await http_.delete(baseUrl + comercioSeleccionado.id_comercio_adherido)
      .then(response =>{
        setData(data.filter(usuario=>usuario.id_comercio_adherido!==comercioSeleccionado.id_comercio_adherido));
        abrirCerrarModalEliminar();
        getComercioAdherido();
      })
    }

    const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
    }

    const abrirCerrarModalInsertar=()=>{
      setModalInsertar(!modalInsertar);
    }

    const bodyInsertar=(
      <div className={styles.modal}>
        <h3>Agregar Nuevo Comercio</h3>
        <TextField name="nombre_comercio_adherido" className={styles.inputMaterial} label="Nombre Comercio Adherido" onChange={handleChange}/>
        <br />
        
        <TextField name="descripcion_comercio_adherido" className={styles.inputMaterial} label="Descripción Comercio Adherido" onChange={handleChange}/>
        <br />

        <TextField name="direccion_comercio_adherido" className={styles.inputMaterial} label="Dirección Comercio Adherido" onChange={handleChange}/>
        <br />

        <TextField name="numero_direccion_comercio_adherido" className={styles.inputMaterial} label="Número Dirección Comercio Adherido" onChange={handleChange}/>
        <br />

        <TextField name="detalle_comercio_adherido" className={styles.inputMaterial} label="Detalle Comercio Adherido" onChange={handleChange}/>
        <br />

        <TextField name="url_facebook_comercio_adherido" className={styles.inputMaterial} label="Url Facebook Comercio Adherido" onChange={handleChange}/>
        <br />

        <TextField name="url_twitter_comercio_adherido" className={styles.inputMaterial} label="Url Twitter Comercio Adherido" onChange={handleChange}/>
        <br />

        <TextField name="url_twitter_comercio_adherido" className={styles.inputMaterial} label="Url Twitter Comercio Adherido" onChange={handleChange}/>
        <br />

        <TextField name="url_youtube_comercio_adherido" className={styles.inputMaterial} label="Url Youtube Comercio Adherido" onChange={handleChange}/>
        <br />

        <TextField name="url_whatsapp_comercio_adherido" className={styles.inputMaterial} label="Url Whatsapp Comercio Adherido" onChange={handleChange}/>
        <br />

        <TextField name="url_instagram_comercio_adherido" className={styles.inputMaterial} label="Url Instagram Comercio Adherido" onChange={handleChange}/>
        <br />

        <TextField name="url_web_comercio_adherido" className={styles.inputMaterial} label="Url Web Comercio Adherido" onChange={handleChange}/>
        <br />

        <TextField name="url_web_comercio_adherido" className={styles.inputMaterial} label="Url Web Comercio Adherido" onChange={handleChange}/>
        <br />
        <div align="right">
          <Button color="primary" onClick={()=>insertComercioAdherido()}>Insertar</Button>
          <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
      </div>
    )

    const bodyEliminar=(
      <div className={styles.modal}>
        <p>Estás seguro que deseas eliminar al Comercio <b>{comercioSeleccionado && comercioSeleccionado.nombre_comercio_adherido}</b> ? </p>
        <div align="right">
          <Button color="secondary" onClick={()=>deleteComercioAdherido()} >Sí</Button>
          <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
        </div>
      </div>
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
      await getComercioAdherido();
        },[])
return(

  <div className="usuarios">
  <br />
<Button  className={styles.root} onClick={()=>abrirCerrarModalInsertar() }>Insertar</Button>
  <br /><br />
 <TableContainer>
   <Table>
     <TableHead>
       <TableRow>
         <TableCell>Id Comercio Adherido</TableCell>
         <TableCell>Nombre Comercio Adherido</TableCell>
         <TableCell>Descripción Comercio Adherido</TableCell>
         <TableCell>Dirección Comercio Adherido</TableCell>
         <TableCell>Número dirección Comercio Adherido</TableCell>


         <TableCell>Acciones</TableCell>
       </TableRow>
     </TableHead>

     <TableBody>
       {data.map(usuario=>(
         <TableRow key={usuario.id_comercio_adherido}>
           <TableCell>{usuario.id_comercio_adherido}</TableCell>
           <TableCell>{usuario.nombre_comercio_adherido}</TableCell>
           <TableCell>{usuario.descripcion_comercio_adherido}</TableCell>
           <TableCell>{usuario.direccion_comercio_adherido}</TableCell>
           <TableCell>{usuario.numero_direccion_comercio_adherido}</TableCell>


           {/* <TableCell>{consola.lanzamiento}</TableCell>
           <TableCell>{consola.unidades_vendidas}</TableCell> */}
           <TableCell>
             <Edit className={styles.iconos} onClick={console.log("Editar")}/>
             &nbsp;&nbsp;&nbsp;
             <Delete  className={styles.iconos} onClick={()=>seleccionarUsuario(usuario, 'Eliminar')}/>
             </TableCell>
         </TableRow>
       ))}
     </TableBody>
   </Table>
 </TableContainer>
 
  <Modal
 open={modalInsertar}
 onClose={abrirCerrarModalInsertar}>
    {bodyInsertar}
 </Modal>

 {/* <Modal
 open={modalEditar}
 onClose={abrirCerrarModalEditar}>
    {bodyEditar}
 </Modal> */}

 <Modal
 open={modalEliminar}
 onClose={abrirCerrarModalEliminar}>
    {bodyEliminar}
 </Modal> 
</div>
 );
}

  export default FormularioComercioAdherido;