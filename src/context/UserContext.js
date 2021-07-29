import React, { createContext } from 'react'
import useFetchUsuario from '../hooks/useFetchUsuario'

export const UserContext = createContext();

const UserProvider= ({children}) => {

    const { data, setData, isLoadingData } = useFetchUsuario();
    
    return (
        <UserContext.Provider value={{
            data,
            setData,
            isLoadingData
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
