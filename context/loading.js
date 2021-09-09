import React, { useContext } from 'react';
export const LoadingContext = React.createContext();
export const useLoading = () => useContext(LoadingContext);