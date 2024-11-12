import { APIClient } from '@/service/api-client';
import React, { createContext, ReactNode, useContext } from 'react';

const APIClientContext = createContext<APIClient | undefined>(undefined);

type APIClientProviderProps = {
    children: ReactNode;
};

export const APIClientProvider: React.FC<APIClientProviderProps> = ({ children }) => {
    const apiClient = new APIClient();
    return (
        <APIClientContext.Provider value={apiClient}>
            {children}
        </APIClientContext.Provider>
    );
};

export const useAPIClient = (): APIClient => {
    const context = useContext(APIClientContext);
    if (!context) {
        throw new Error('useAPIClient must be used within an APIClientProvider');
    }
    return context;
};
