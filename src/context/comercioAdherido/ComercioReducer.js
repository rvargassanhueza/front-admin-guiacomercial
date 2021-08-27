import { GET_COMERCIO_ADHERIDO, LOADING_DATA_COMERCIO } from "../../types/comercios"

const ComercioReducer = (state, action) => {
    switch (action.type) {
            case GET_COMERCIO_ADHERIDO:
            return {
                ...state,
                dataComerciosAdheridos: action.payload
            };

            case LOADING_DATA_COMERCIO:
                return{
                    ...state,
                    isLoadingComercios: false
                }
    
        default:
            return state;
    }
}

export default ComercioReducer;