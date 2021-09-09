import React, { useContext } from 'react'
import { TextField, Button, InputLabel } from '@material-ui/core';
import { useParams } from "react-router-dom";

//Styles
import ContainerModal from "../Container";
import { useStyles } from "../css/UsuariosStyles";

//Context
import comercioContext from '../../context/comercioAdherido/ComercioContext';

//Form
import { useForm } from '../../hooks/useForm';

const EditarComercio = ({ history }) => {

  const styles = useStyles();
  const { id } = useParams();
  console.log({ id });

  const { dataLocalidad, dataCliente, dataCategoria, insertarComercio } = useContext(comercioContext);

  const [formValues, handleInputChange, setFormState, handleResetForm] = useForm({
    nombre_comercio_adherido: '',
    id_localidad: '',
    id_cliente: '',
    categorias: '',
    descripcion_comercio_adherido: '',
    direccion_comercio_adherido: '',
    numero_direccion_comercio_adherido: 0,
    url_facebook_comercio_adherido: '',
    url_twitter_comercio_adherido: '',
    url_youtube_comercio_adherido: '',
    url_whatsapp_comercio_adherido: '',
    url_instagram_comercio_adherido: '',
    url_web_comercio_adherido: ''
  });

  const { nombre_comercio_adherido, id_localidad, id_cliente, categorias,
    descripcion_comercio_adherido, direccion_comercio_adherido, numero_direccion_comercio_adherido,
    url_facebook_comercio_adherido, url_twitter_comercio_adherido, url_youtube_comercio_adherido,
    url_whatsapp_comercio_adherido, url_instagram_comercio_adherido, url_web_comercio_adherido
  } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <ContainerModal>
      <form onSubmit={handleSubmit}>
        <h3>Editar Comercio</h3>
        <TextField name="nombre_comercio_adherido" value={nombre_comercio_adherido} onChange={handleInputChange} className={styles.inputMaterial} disabled="true" />
        <br />
        <InputLabel className={styles.inputMaterial}>Localidad</InputLabel>
        <select
          id="id_localidad"
          name="id_localidad"
          value={id_localidad}
          onChange={handleInputChange}
          className={styles.inputMaterial}
        >
          <option value="">Seleccione localidad</option>
          {dataLocalidad.map((row, index) => (
            <option key={index} value={row.id_localidad}>
              {row.nombre_localidad}
            </option>))}
        </select>
        <InputLabel className={styles.inputMaterial}>Cliente</InputLabel>
        <select
          id="id_cliente"
          value={id_cliente}
          onChange={handleInputChange}
          className={styles.inputMaterial}
          name="id_cliente"
        >
          <option value="">Seleccione cliente</option>
          {dataCliente.map((row, index) => (
            <option key={index} value={row.id_cliente}>
              {row.nombre_cliente}
            </option>))}
        </select>
        <InputLabel className={styles.inputMaterial}>Categoría</InputLabel>

        <select
          id="categorias"
          name="categorias"
          value={categorias}
          onChange={handleInputChange}
          className={styles.inputMaterial}
        >
          <option value="">Seleccione categoria</option>
          {dataCategoria.map((row, index) => (
            <option key={index} value={row.id_categoria}>
              {row.nombre_categoria}
            </option>))}
        </select>

        <TextField name="descripcion_comercio_adherido" className={styles.inputMaterial} label="Descripción Comercio Adherido" onChange={handleInputChange}
          value={descripcion_comercio_adherido} />
        <br />

        <TextField name="direccion_comercio_adherido" className={styles.inputMaterial} label="Dirección Comercio Adherido" onChange={handleInputChange} />
        <br />

        <TextField name="numero_direccion_comercio_adherido" className={styles.inputMaterial} label="Número Dirección Comercio Adherido" onChange={handleInputChange} />
        <br />
        <InputLabel className={styles.inputMaterial}>Imagen Comercio Adherido</InputLabel>

        <TextField name="detalle_comercio_adherido" className={styles.inputMaterial} label="Imagen Comercio Adherido" onChange={handleInputChange} type="file" />
        <br />

        <TextField name="url_facebook_comercio_adherido" className={styles.inputMaterial} label="Url Facebook Comercio Adherido" onChange={handleInputChange} />
        <br />

        <TextField name="url_twitter_comercio_adherido" className={styles.inputMaterial} label="Url Twitter Comercio Adherido" onChange={handleInputChange} />
        <br />

        <TextField name="url_twitter_comercio_adherido" className={styles.inputMaterial} label="Url Twitter Comercio Adherido" onChange={handleInputChange} />
        <br />

        <TextField name="url_youtube_comercio_adherido" className={styles.inputMaterial} label="Url Youtube Comercio Adherido" onChange={handleInputChange} />
        <br />

        <TextField name="url_whatsapp_comercio_adherido" className={styles.inputMaterial} label="Url Whatsapp Comercio Adherido" onChange={handleInputChange} />
        <br />

        <TextField name="url_instagram_comercio_adherido" className={styles.inputMaterial} label="Url Instagram Comercio Adherido" onChange={handleInputChange} />
        <br />

        <TextField name="url_web_comercio_adherido" className={styles.inputMaterial} label="Url Web Comercio Adherido" onChange={handleInputChange} />
        <br />

        <TextField name="url_web_comercio_adherido" className={styles.inputMaterial} label="Url Web Comercio Adherido" onChange={handleInputChange} />
        <br />


        <div align="right">
          <Button
            type="submit"
            color="primary"
          >
            Editar
          </Button>
          <Button
            color="secondary"
            onClick={() => history.push('/comercios')}
          >
            Cancelar
          </Button>
        </div>

      </form>
    </ContainerModal>
  )
}

export default EditarComercio
