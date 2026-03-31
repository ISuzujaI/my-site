import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface ContentContextType {
  refreshContent: () => void;
  contentVersion: number;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contentVersion, setContentVersion] = useState(0);

  const refreshContent = useCallback(() => {
    setContentVersion(prev => prev + 1);
  }, []);

  return (
    <ContentContext.Provider value={{ refreshContent, contentVersion }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};
