import React from 'react';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useFetch(api, key) {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [key],
        queryFn: () => getRecentProducts(),

    });


    async function getRecentProducts() {
        return axios.get(api);
    }

    return { data, isLoading, isError, error };
}
