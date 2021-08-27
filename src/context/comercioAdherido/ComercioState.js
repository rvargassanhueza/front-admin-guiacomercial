import React, { useReducer, useEffect } from 'react'
import ComercioContext from './ComercioContext'
import ComercioReducer from './ComercioReducer'
import http_ , { baseUrl } from '../../common/http-comercio_adherido'

import { GET_COMERCIO_ADHERIDO, LOADING_DATA_COMERCIO } from '../../types/comercios'

let initialState = {
    dataComerciosAdheridos: [],
    isLoadingComercios: true
}

const ComercioProvider = ({children}) => {

    const [state, dispatch] = useReducer(ComercioReducer, initialState);

    useEffect(() => {
        getComercioAdherido();
    }, [initialState.dataComerciosAdheridos]);

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

    return (
        <ComercioContext.Provider
            value={{
                dataComerciosAdheridos: state.dataComerciosAdheridos,
                isLoadingComercios: state.isLoadingComercios
            }}
        >
            { children }
        </ComercioContext.Provider>
    )
}

export default ComercioProvider
