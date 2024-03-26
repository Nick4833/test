import React, { createContext, useState, useContext } from 'react';

 export const AppContext = createContext({
    id: '',
    setId: () => {}
 });

 export const AppProvider = ({ children }) => {
 const [id, setId] = useState('');
 const value = {
 id,
 setId,
 };
return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
 };
 export const useAppContext=()=> useContext(AppContext)
