import React, { createContext, useState } from 'react';

interface ListContextProps {
  list: string | null;
  updateList: (newList: string | null) => void;
}

export const ListContext = createContext<ListContextProps>({
  list: null,
  updateList: () => {},
});

export const ListProvider = ({ children }: any) => {
  const [list, setList] = useState<string | null>(localStorage.getItem('list'));

  const updateList = (newList: string | null) => {
    setList(newList);
    console.log('111', list)
  };

  return (
    <ListContext.Provider value={{ list, updateList }}>
      {children}
    </ListContext.Provider>
  );
};