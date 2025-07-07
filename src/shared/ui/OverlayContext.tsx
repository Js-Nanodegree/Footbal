import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

interface OverlayContextValue {
  overlayStack: ReactNode[];
  showOverlay: (node: ReactNode) => void;
  hideOverlay: () => void;
  hideAllOverlay: () => void;
}

const OverlayContext = createContext<OverlayContextValue | undefined>(undefined);

export const OverlayProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [overlayStack, setOverlayStack] = useState<ReactNode[]>([]);

  const showOverlay = (node: ReactNode) => setOverlayStack(stack => [...stack, node]);
  const hideOverlay = () => setOverlayStack(stack => stack.slice(0, -1));
  const hideAllOverlay = () => setOverlayStack([]);

  return (
    <OverlayContext.Provider value={{ overlayStack, showOverlay, hideOverlay, hideAllOverlay }}>
      {children}
      {overlayStack.map((node, i) => (
        <React.Fragment key={i}>{node}</React.Fragment>
      ))}
    </OverlayContext.Provider>
  );
};

export function useOverlay() {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error('useOverlay must be used within OverlayProvider');
  return ctx;
} 