"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '@/services/axiosConfig';
const UriContext = createContext(null);

export const useUriContext = () => {
    const useUri = useContext(UriContext);
    return useUri;
  };
  

export const UriProvider = ({ children }) => {
    const [uri, setUri] = useState('');

    useEffect(() => {
        fetchUri();
    }, []);

    const fetchUri = async () => {
        try {
            const response = await axiosInstance.post('/users/workspace/subdomain', {
                mulltiplyURL: 'stomize',
            });
            // console.log('response',response.data.data)
            const fetchedUri = response.data.data.uri.uri;
            localStorage.setItem('uri', fetchedUri);
            localStorage.setItem("SellerDetails", JSON.stringify(response.data.data));
            localStorage.setItem("SellerId", response.data.data.customerId);
            localStorage.setItem("SellerWorkspace",response.data.data._id);
            // console.log('fetchedUri..',fetchedUri)
            setUri(fetchedUri);
        } catch (error) {
            console.error('Error fetching URI:', error);
        }
    };

    return (
        <UriContext.Provider value={{ uri, setUri }}>
            {children}
        </UriContext.Provider>
    );
};

// export const useUri = () => useContext(UriContext);
