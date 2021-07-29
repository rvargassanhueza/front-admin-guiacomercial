import { useState, useEffect } from 'react'
import http from '../components/common/http-common'

const baseUrl='/usuario/';

const useFetchUsuario = () => {

    const [data, setData] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true)

    const getUser = async() => {
        try {
            const resp = await http.get(baseUrl);
            const { data } = resp.data;
            setData(data);
            setIsLoadingData(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return {
        data, 
        setData,
        isLoadingData
    }
}

export default useFetchUsuario
