import { useState, useEffect } from 'react'
import http from '../common/http-common'

export const useFetch = url => {

    let usuariosStorage = JSON.parse(localStorage.getItem('usuarios')) || [];

    const [data, setData] = useState(usuariosStorage);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        localStorage.setItem('usuarios', JSON.stringify(data));
    }, [data]);

    useEffect(() => {
        const getUser = async() => {
            try {
                const resp = await http.get(url);
                const { data } = resp.data;
                setData(data);
                setIsLoadingData(false);
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, [url]);

    return {
        data,
        isLoadingData
    }
}