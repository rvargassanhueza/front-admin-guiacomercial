import React, { useContext, useState } from 'react'
import { TextField, Button, InputLabel } from '@material-ui/core';

//Context
import comercioContext from '../../context/comercioAdherido/ComercioContext';

import { useForm } from '../../hooks/useForm';
import { useStyles } from "../css/ComercioAdheridoStyles";

const InsertarComercio = ({ abrirCerrarModalInsertar }) => {

    const styles = useStyles();
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

    const [archivo, guardarArchivo] = useState('');

    const handleImagenFile = ({ target }) => guardarArchivo(target.files[0]);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!archivo) {
            console.log('No hay imagen');
            return;
        }

        const typeImagen = archivo.type.split('/');
        const [, extension] = typeImagen;

        if (extension !== "png" && extension !== "jpeg") {
            console.log('Inserte una imagen valida');
            return;
        }

        const formData = new FormData();
        formData.append('imagenComercio', archivo);

        insertarComercio(formData, abrirCerrarModalInsertar);
        handleResetForm();
    }

    return (
        <div className={styles.modal}>
            <form onSubmit={handleSubmit}>
                <h3>Agregar Nuevo Comercio</h3>

                <TextField name="nombre_comercio_adherido" value={nombre_comercio_adherido} className={styles.inputMaterial} label="Nombre Comercio Adherido" onChange={handleInputChange} />
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

                <TextField name="descripcion_comercio_adherido" value={descripcion_comercio_adherido} className={styles.inputMaterial} label="Descripción Comercio Adherido" onChange={handleInputChange} />
                <br />

                <TextField name="direccion_comercio_adherido" value={direccion_comercio_adherido} className={styles.inputMaterial} label="Dirección Comercio Adherido" onChange={handleInputChange} />
                <br />

                <TextField name="numero_direccion_comercio_adherido" value={numero_direccion_comercio_adherido} className={styles.inputMaterial} label="Número Dirección Comercio Adherido" onChange={handleInputChange} />
                <br />

                <InputLabel className={styles.inputMaterial}>Imagen Comercio Adherido</InputLabel>

                <TextField type="file" id="imagenComercio" name="imagenComercio" className={styles.inputMaterial} label="" onChange={handleImagenFile} accept="image/png,image/jpeg" />

                <TextField name="url_facebook_comercio_adherido" value={url_facebook_comercio_adherido} className={styles.inputMaterial} label="Url Facebook Comercio Adherido" onChange={handleInputChange} />
                <br />

                <TextField name="url_twitter_comercio_adherido" value={url_twitter_comercio_adherido} className={styles.inputMaterial} label="Url Twitter Comercio Adherido" onChange={handleInputChange} />
                <br />

                <TextField name="url_youtube_comercio_adherido" value={url_youtube_comercio_adherido} className={styles.inputMaterial} label="Url Youtube Comercio Adherido" onChange={handleInputChange} />
                <br />

                <TextField name="url_whatsapp_comercio_adherido" value={url_whatsapp_comercio_adherido} className={styles.inputMaterial} label="Url Whatsapp Comercio Adherido" onChange={handleInputChange} />
                <br />

                <TextField name="url_instagram_comercio_adherido" value={url_instagram_comercio_adherido} className={styles.inputMaterial} label="Url Instagram Comercio Adherido" onChange={handleInputChange} />
                <br />

                <TextField name="url_web_comercio_adherido" value={url_web_comercio_adherido} className={styles.inputMaterial} label="Url Web Comercio Adherido" onChange={handleInputChange} />
                <br />

                <div align="right">
                    <Button color="primary" type="submit">Insertar</Button>
                    <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
                </div>
            </form>
        </div>
    )
}

export default InsertarComercio
