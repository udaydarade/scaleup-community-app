import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, db } from './mockDB';

const StoreContext = createContext(null);

export function StoreProvider({ children }){
  const [communities, setCommunities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = api.currentUser();

  const refresh = async ()=>{
    setLoading(true);
    const list = await api.listCommunities();
    const notifs = await api.listNotifications();
    setCommunities(list);
    setNotifications(notifs);
    setLoading(false);
  };

  useEffect(()=>{ refresh(); }, []);

  // 2. Add db to the value object
  const value = { user, db, communities, setCommunities, notifications, setNotifications, loading, refresh, api };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);