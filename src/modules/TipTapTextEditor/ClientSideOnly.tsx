'use client';

import React, { useEffect, useState } from 'react';

interface ClientSideOnlyProps {
  children: React.ReactNode;
}

/**
 * Component that only renders its children on the client side.
 * This is useful for components that use browser APIs like document or window.
 */
const ClientSideOnly: React.FC<ClientSideOnlyProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <>{children}</> : null;
};

export default ClientSideOnly;
