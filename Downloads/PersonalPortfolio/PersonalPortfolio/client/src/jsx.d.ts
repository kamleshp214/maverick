declare module '*.jsx' {
  import React from 'react';
  const Component: React.ComponentType<any>;
  export default Component;
  export const usePage: any;
  export const PageProvider: React.ComponentType<any>;
}