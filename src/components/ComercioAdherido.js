import React, {useEffect, useState} from 'react';

import './../../src/App.css';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField, Select, MenuItem, InputLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions  } from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import http from "../http-common";
import http_ from "../http-comercio_adherido"

const baseUrl='/comercioAdherido/';
const baseUrlLocalidad='/mainData/localidad/';
const baseUrlCliente='/mainData/cliente/';
const baseUrlCategoria='/mainData/categoria/';



const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 600,
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

    const [data, setData]                       = useState([]);
    const [dataId, setDataId]                   = useState([]);

    const [modalEliminar, setModalEliminar]     = useState(false);
    const [modalInsertar, setModalInsertar]     = useState(false);
    const [modalEditar, setModalEditar]         = useState(false);
    const [modalVerMas, setModalVerMas]         = useState(false);

    const [itemSelected, setItemSelected]       = useState();
    const [items, setItems]                     = useState([]);
    const [itemsClientes, setItemsClientes]     = useState([]);
    const [itemsCategorias, setItemsCategorias] = useState([]);

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


    const [file, setFile ] = useState();
    const [open, setOpen ] = useState(false);
    
    const saveFile = (e) => {
      setFile(e.target.files[0]);
    };

    const handleChange=e=>{
      const {name, value}=e.target;
      
      setComercioSeleccionado(prevState=>({
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

    const seleccionarUsuario=(usuario, caso)=>{

      setComercioSeleccionado(usuario);

       if(caso === 'Editar'){
        abrirCerrarModalEditar()
       }else if(caso=== 'Eliminar'){
        abrirCerrarModalEliminar()
       }else{
        abrirCerrarModalVerMas(usuario)
       }
    }

      useEffect(() => {
          (async () => {
             getComercioAdherido();
          })();
          getLocalidad();
          getCliente();
          getCategoria(); 
      }, []);

    async function getLocalidad(){
      const datos_ = await http.get(baseUrlLocalidad);
      const {data} = datos_.data;
      
      setItems(data);
    }

    async function getCliente(){
      const datos_ = await http.get(baseUrlCliente);
      const {data} = datos_.data;
      
      setItemsClientes(data);
    }

    async function getCategoria(){
      const datos_ = await http.get(baseUrlCategoria);
      const {data} = datos_.data;
      
      setItemsCategorias(data);
    }

    const getComercioAdherido = async()=>{
      await http_.get(baseUrl)
      .then(response=>{
        const {data:{data}} = response;
        setData(data);
      })
    }

    const getComercioAdheridoId = async(id)=>{
      await http_.get(baseUrl + id)
      .then(response=>{
        const {data:{data}} = response;
        setDataId(data);
      })
    }

    const insertComercioAdherido = async()=>{

      const formData = new FormData();
      formData.append("detalle_comercio_adherido", file);
      for(let key in comercioSeleccionado){
        formData.append(key,comercioSeleccionado[key]);
      }

      await http_.post(baseUrl, formData)
      .then(response=>{
        setData(data.concat(response.data))
        abrirCerrarModalInsertar();
        getComercioAdherido();
        handleClickOpen();
        
      })
      .catch(error=>{
        this.setState({ errorMessage: error.message });
        window.alert("Ha ocurrido un error al registrar el Comercio Adherido")

            console.error('There was an error!', error);
      });
    }

    const editComercioAdherido = async()=>{
      await http_.put(baseUrl + comercioSeleccionado.id_comercio_adherido,comercioSeleccionado)
      .then(response=>{
        // setData(data.concat(response.data))
        setData(data.concat(response.data));
        abrirCerrarModalEditar();
        getComercioAdherido();
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

    const abrirCerrarModalVerMas=(usuario)=>{
      setModalVerMas(!modalVerMas);
      if(usuario){
        getComercioAdheridoId(usuario.id_comercio_adherido);
      }
    }

    const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
    }

    const abrirCerrarModalInsertar=()=>{
      setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEditar=()=>{
      setModalEditar(!modalEditar);
    }

    const bodyVerMas=(
      <div className={styles.modal}>
        <h3>Más detalles comercio adherido</h3>

        <TextField name="nombre_comercio_adherido" className={styles.inputMaterial} label="Nombre Comercio Adherido" onChange={handleChange} value={dataId.map(e=>(
          e.nombre_comercio_adherido
        ))} disabled="true"/>
        <br />
        
        <TextField name="descripcion_comercio_adherido" className={styles.inputMaterial} label="Descripción Comercio Adherido" onChange={handleChange} value={dataId.map(e=>(
          e.descripcion_comercio_adherido
        ))} disabled="true"/>
        <br />

        <TextField name="direccion_comercio_adherido" className={styles.inputMaterial} label="Dirección Comercio Adherido" onChange={handleChange} value={dataId.map(e=>(
          e.direccion_comercio_adherido
        ))} disabled="true"/>
        <br />

        <TextField name="numero_direccion_comercio_adherido" className={styles.inputMaterial} label="Numero Dirección Comercio Adherido" onChange={handleChange} value={dataId.map(e=>(
          e.numero_direccion_comercio_adherido
        ))} disabled="true"/>
        <br />

        <TextField name="localidad_comercio_adherido" className={styles.inputMaterial} label="Localidad Comercio Adherido" onChange={handleChange} value={dataId.map(e=>(
          e.nombre_localidad
        ))} disabled="true"/>
        <br />

        <TextField name="cliente_comercio_adherido" className={styles.inputMaterial} label="Cliente Comercio Adherido" onChange={handleChange} value={dataId.map(e=>(
          e.nombre_cliente
        ))} disabled="true"/>
        <br />

        <TextField name="categoria_comercio_adherido" className={styles.inputMaterial} label="Categoría Comercio Adherido" onChange={handleChange} value={dataId.map(e=>(
          e.nombre_categoria
        ))} disabled="true"/>
        <br />
        <TextField name="url_facebook_comercio_adherido" className={styles.inputMaterial} label="Facebook Comercio Adherido" onChange={handleChange} value={dataId.map(e=>(
          e.url_facebook_comercio_adherido
        ))} disabled="true"/>
        <br />

        <TextField name="url_twitter_comercio_adherido" className={styles.inputMaterial} label="Twitter Comercio Adherido" onChange={handleChange} value={dataId.map(e=>(
          e.url_twitter_comercio_adherido
        ))} disabled="true"/>
        <br />

        <TextField name="url_youtube_comercio_adherido" className={styles.inputMaterial} label="Youtube Comercio Adherido" onChange={handleChange} value={dataId.map(e=>(
          e.url_youtube_comercio_adherido
        ))} disabled="true"/>
        <br />

        <TextField name="url_whatsapp_comercio_adherido" className={styles.inputMaterial} label="Whatsapp Comercio Adherido" onChange={handleChange} value={dataId.map(e=>(
          e.url_whatsapp_comercio_adherido
        ))} disabled="true"/>
        <br />

        <TextField name="url_instagram_comercio_adherido" className={styles.inputMaterial} label="Instagram Comercio Adherido" onChange={handleChange} value={dataId.map(e=>(
          e.url_instagram_comercio_adherido
        ))} disabled="true"/>
        <br />

        <TextField name="url_web_comercio_adherido" className={styles.inputMaterial} label="Web Comercio Adherido" onChange={handleChange} value={dataId.map(e=>(
          e.url_web_comercio_adherido
        ))} disabled="true"/>
        <br />

        <div align="right">
          <Button onClick={()=>abrirCerrarModalVerMas()}>Aceptar</Button>
          </div>

      </div>
    )
    const bodyInsertar=(
    <div className={styles.modal}>
    
        <h3>Agregar Nuevo Comercio</h3>

              <TextField name="nombre_comercio_adherido" className={styles.inputMaterial} label="Nombre Comercio Adherido" onChange={handleChange}/>
              <br />
              
              <InputLabel className={styles.inputMaterial}>Localidad</InputLabel>
              <Select
                    labelId="Localidad"
                    id="id_localidad"
                    value={itemSelected}
                    onChange={handleChange}
                    className={styles.inputMaterial}
                    name="id_localidad">

                    {items.map((row, index) => (
                    <MenuItem key={index} value={row.id_localidad}>
                      {row.nombre_localidad}
                    </MenuItem>))}
              </Select>
                  <InputLabel className={styles.inputMaterial}>Cliente</InputLabel>
              <Select
                    labelId="Cliente"
                    id="id_cliente"
                    value={itemSelected}
                    onChange={handleChange}
                    className={styles.inputMaterial}
                    name="id_cliente">

                    {itemsClientes.map((row, index) => (
                    <MenuItem key={index} value={row.id_cliente}>
                      {row.nombre_cliente}
                    </MenuItem>))}
                  </Select>
                  <InputLabel className={styles.inputMaterial}>Categoría</InputLabel>

              <Select
                    labelId="Categoría"
                    id="categorias"
                    value={itemSelected}
                    onChange={handleChange}
                    className={styles.inputMaterial}
                    name="categorias">

                    {itemsCategorias.map((row, index) => (
                    <MenuItem key={index} value={row.id_categoria}>
                      {row.nombre_categoria}
                    </MenuItem>))}
              </Select>
             
              <TextField name="descripcion_comercio_adherido" className={styles.inputMaterial} label="Descripción Comercio Adherido" onChange={handleChange}/>
              <br />

              <TextField name="direccion_comercio_adherido" className={styles.inputMaterial} label="Dirección Comercio Adherido" onChange={handleChange}/>
              <br />

              <TextField name="numero_direccion_comercio_adherido" className={styles.inputMaterial} label="Número Dirección Comercio Adherido" onChange={handleChange}/>
              <br />
              <InputLabel className={styles.inputMaterial}>Imagen Comercio Adherido</InputLabel>

              <TextField name="detalle_comercio_adherido" className={styles.inputMaterial} label="" onChange={saveFile} type="file" accept="image/png,image/jpeg" type="file"/>         

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

    const bodyEditar=(
      <div className={styles.modal}>
      
          <h3>Editar Comercio</h3>
          <TextField name="nombre_comercio_adherido" className={styles.inputMaterial}  onChange={handleChange} value={comercioSeleccionado.nombre_comercio_adherido}disabled="true"/>
          <br />
          <InputLabel className={styles.inputMaterial}>Localidad</InputLabel>
          <Select
                labelId="Localidad"
                id="id_localidad"
                value={itemSelected}
                onChange={handleChange}
                className={styles.inputMaterial}
                name="id_localidad">
  
                {items.map((row, index) => (
                <MenuItem key={index} value={row.id_localidad}>
                  {row.nombre_localidad}
                </MenuItem>))}
              </Select>
              <InputLabel className={styles.inputMaterial}>Cliente</InputLabel>
              <Select
                labelId="Cliente"
                id="id_cliente"
                value={itemSelected}
                onChange={handleChange}
                className={styles.inputMaterial}
                name="id_cliente">
  
                {itemsClientes.map((row, index) => (
                <MenuItem key={index} value={row.id_cliente}>
                  {row.nombre_cliente}
                </MenuItem>))}
              </Select>
              <InputLabel className={styles.inputMaterial}>Categoría</InputLabel>
  
              <Select
                labelId="Categoría"
                id="categorias"
                value={itemSelected}
                onChange={handleChange}
                className={styles.inputMaterial}
                name="categorias">
  
                {itemsCategorias.map((row, index) => (
                <MenuItem key={index} value={row.id_categoria}>
                  {row.nombre_categoria}
                </MenuItem>))}
              </Select>
          
          <TextField name="descripcion_comercio_adherido" className={styles.inputMaterial} label="Descripción Comercio Adherido" onChange={handleChange}
          value={comercioSeleccionado.descripcion_comercio_adherido}/>
          <br />
  
          <TextField name="direccion_comercio_adherido" className={styles.inputMaterial} label="Dirección Comercio Adherido" onChange={handleChange}/>
          <br />
  
          <TextField name="numero_direccion_comercio_adherido" className={styles.inputMaterial} label="Número Dirección Comercio Adherido" onChange={handleChange}/>
          <br />
          <InputLabel className={styles.inputMaterial}>Imagen Comercio Adherido</InputLabel>
  
          <TextField name="detalle_comercio_adherido" className={styles.inputMaterial} label="Imagen Comercio Adherido" onChange={handleChange} type="file"/>
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
            <Button color="primary" onClick={()=>editComercioAdherido()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
          </div>
        </div>
      )
    
return(

  <div className="usuarios">
  <br />
<Button  className={styles.root} onClick={()=>abrirCerrarModalInsertar() }>Insertar</Button>
  <br /><br />
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
       {data.map(usuario=>(
         <TableRow key={usuario.id_comercio_adherido}>
           
           <TableCell>{usuario.nombre_comercio_adherido}</TableCell>
           <TableCell>{usuario.descripcion_comercio_adherido}</TableCell>
           <TableCell>{usuario.direccion_comercio_adherido}</TableCell>
           <TableCell>{usuario.numero_direccion_comercio_adherido}</TableCell>
           <TableCell>{usuario.nombre_localidad}</TableCell>


           <TableCell>
           <Button  className={styles.root} onClick={()=>seleccionarUsuario(usuario,'Ver Mas') }>Ver Más</Button>
           </TableCell>
           <TableCell>

             <Edit className={styles.iconos} onClick={()=>seleccionarUsuario(usuario, 'Editar') }/>
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

 <Modal
    open={modalVerMas}
    onClose={abrirCerrarModalVerMas}>
    {bodyVerMas}
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

  export default FormularioComercioAdherido;