import React, { useReducer, useEffect, useState } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'
import { useFetch } from '../../hooks/useFetch';

import { INSERTAR_USUARIO, BORRAR_USUARIO, USUARIO_ERROR, SELECCIONAR_USUARIO, EDITAR_USUARIO } from '../../types'
import http, { BASE_URL_TIPO_USUARIO, BASE_URL_USUARIO } from '../../common/http-common';

//State de usuarios
let initialState = {
    dataUsuarios: [],
    errorUsuario: false,
    usuarioSeleccionado: 0
}

const UserProvider= ({children}) => {
    const [items, setItems] = useState([]);
    const [usuarioDetail, setUsuarioDetail] = useState({});
    const [isLoadingUsuarioID, setIsLoadingUsuarioID] = useState(true);
    const { data, isLoadingData } = useFetch(BASE_URL_USUARIO);

    useEffect(() => {
        initialState.dataUsuarios = data;
    }, [data]);

    useEffect(() => {
        getTipoUsuario();
    }, []);

    const [ state, dispatch ] = useReducer(UserReducer, initialState);

    const getTipoUsuario = async () => {
        try {
            const datos_ = await http.get(BASE_URL_TIPO_USUARIO);
            const { data } = datos_.data;
        
            setItems(data);
            
        } catch (error) {
            console.log({error})
        }
    }

    const insertarUsuario =  async (newUser, callbackModal) => {
        try {
            await http.post(BASE_URL_USUARIO, newUser);
            dispatch({
                type: INSERTAR_USUARIO,
                payload: newUser
            });
        } catch (error) {
            dispatch({
                type: USUARIO_ERROR
            });
            console.log({error});
        } finally{
            callbackModal();
        }
    }

    const editarUsuario =  async usuario => {
        try {
            await http.put(`${BASE_URL_USUARIO}${usuario.id_usuario}`, usuario);
            dispatch({
                type: EDITAR_USUARIO,
                payload: usuario
            });
        } catch (error) {
            dispatch({
                type: USUARIO_ERROR
            });
            console.log({error});
        } 
    }

    const borrarUsuario = async (id, callbackModal) => {
        try {
            await http.delete(`${BASE_URL_USUARIO}${id}`);
            dispatch({
                type: BORRAR_USUARIO,
                payload: id
            });
        } catch (error) {
            dispatch({
                type: USUARIO_ERROR
            });
            console.log({error});
        } finally{
            callbackModal();
        }
    }

    const seleccionarUsuario = (usuario, callbackModal) => {
        dispatch({
            type: SELECCIONAR_USUARIO,
            payload: usuario
        })

        callbackModal();
    }

    const getUsuarioByID = async id => {
        try {
            const resp = await http.get(`${BASE_URL_USUARIO}${id}`);
            const { data } = resp.data;
            const dataFinal = !!data && data[0];
            setUsuarioDetail(dataFinal);
            setIsLoadingUsuarioID(false);
        } catch (error) {
            console.log('error', error)
        }
    }
    return (
        <UserContext.Provider value={{
            dataUsuarios: state.dataUsuarios,
            errorUsuario: state.errorUsuario,
            usuarioSeleccionado: state.usuarioSeleccionado,
            items,
            usuarioDetail,
            isLoadingData,
            isLoadingUsuarioID,
            getUsuarioByID,
            insertarUsuario,
            editarUsuario,
            borrarUsuario,
            seleccionarUsuario,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider