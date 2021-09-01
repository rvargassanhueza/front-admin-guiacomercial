import React from 'react'

const EditarComercio = () => {
    return (
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
}

export default EditarComercio
