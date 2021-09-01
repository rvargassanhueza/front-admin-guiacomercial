import React, { useReducer, useEffect } from 'react'
import ComercioContext from './ComercioContext'
import ComercioReducer from './ComercioReducer'
import http from '../../common/http-common'
import http_ , { baseUrl, baseUrlCategoria, baseUrlCliente, baseUrlLocalidad } from '../../common/http-comercio_adherido'

import { 
    GET_COMERCIO_ADHERIDO, 
    GET_LOCALIDAD,
    GET_CLIENTE,
    GET_CATEGORIA,
    LOADING_DATA_COMERCIO,
    INSERTAR_COMERCIO 
} from '../../types/comercios'

let initialState = {
    dataComerciosAdheridos: [],
    dataLocalidad: [],
    dataCliente: [],
    dataCategoria: [],
    isLoadingComercios: true
}

const ComercioProvider = ({children}) => {

    const [state, dispatch] = useReducer(ComercioReducer, initialState);

    useEffect(() => {
        getComercioAdherido();
    }, [initialState.dataComerciosAdheridos]);

    useEffect(() => {
        getLocalidad();
        getCliente();
        getCategoria();
    }, []);

    const getComercioAdherido = async () => {
        try {
            const response = await http_.get(baseUrl);
            const {data:{data}} = response;
            dispatch({
                type: GET_COMERCIO_ADHERIDO,
                payload: data
            });
            dispatch({
                type: LOADING_DATA_COMERCIO
            });
        } catch (error) {
            console.log({error})
        }
    }

    const getLocalidad = async () => {
        try {
            const res = await http.get(baseUrlLocalidad);
            const { data } = res.data;
            dispatch({
                type: GET_LOCALIDAD,
                payload: data
            });
        } catch (error) {
            console.log({error})
        }
    }

    const getCliente = async () => {
        try {
            const res = await http.get(baseUrlCliente);
            const { data } = res.data;
            dispatch({
                type: GET_CLIENTE,
                payload: data
            });
        } catch (error) {
           console.log({error}) 
        }
    }

    const getCategoria = async () => {
        try {
            const res = await http.get(baseUrlCategoria);
            const { data } = res.data;
            dispatch({
                type: GET_CATEGORIA,
                payload: data
            });
        } catch (error) {
            console.log({error});
        }
    }

    const insertarComercio = async (nuevoComercio, callbackModal) => {
        try {
            const res = await http_.post(baseUrl, nuevoComercio, {
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            });
            dispatch({
                type: INSERTAR_COMERCIO,
                payload: nuevoComercio
            });
            console.log({res});
        } catch (error) {
            console.log({error});   
        } finally{
            callbackModal();
        }
    }

    return (
        <ComercioContext.Provider
            value={{
                dataComerciosAdheridos: state.dataComerciosAdheridos,
                dataLocalidad: state.dataLocalidad,
                dataCliente: state.dataCliente,
                dataCategoria: state.dataCategoria,
                isLoadingComercios: state.isLoadingComercios,
                insertarComercio
            }}
        >
            { children }
        </ComercioContext.Provider>
    )
}

export default ComercioProvider
