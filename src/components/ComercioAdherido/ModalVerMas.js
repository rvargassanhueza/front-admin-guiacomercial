import React from 'react'
import { TextField, Button } from '@material-ui/core';
import { useStyles } from "../css/ComercioAdheridoStyles";

const ModalVerMas = ({handleChange, dataId, abrirCerrarModalVerMas}) => {

  const styles = useStyles();

    return (
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
            <Button onClick={ () => abrirCerrarModalVerMas }>Aceptar</Button>
            </div>
  
        </div>
      )
}

export default ModalVerMas
