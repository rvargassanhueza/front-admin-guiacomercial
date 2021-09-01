import { 
    GET_COMERCIO_ADHERIDO, 
    GET_LOCALIDAD,
    GET_CLIENTE,
    GET_CATEGORIA,
    LOADING_DATA_COMERCIO,
    INSERTAR_COMERCIO
} from "../../types/comercios"

const ComercioReducer = (state, action) => {
    switch (action.type) {
        case GET_COMERCIO_ADHERIDO:
            return {
                ...state,
                dataComerciosAdheridos: action.payload
            };

        case GET_LOCALIDAD:
            return {
                ...state,
                dataLocalidad: action.payload
            };

        case GET_CLIENTE:
            return {
                ...state,
                dataCliente: action.payload
            };

        case GET_CATEGORIA:
            return {
                ...state,
                dataCategoria: action.payload
            };

        case LOADING_DATA_COMERCIO:
            return {
                ...state,
                isLoadingComercios: false
            }
        
        case INSERTAR_COMERCIO:
            return {
                ...state,
                dataComerciosAdheridos:[...state.dataComerciosAdheridos, action.payload]
            }

        default:
            return state;
    }
}

export default ComercioReducer;