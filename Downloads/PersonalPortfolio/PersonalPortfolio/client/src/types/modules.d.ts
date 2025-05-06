declare module '*.jsx' {
  const component: any;
  export default component;
  
  // For named exports
  export const usePage: any;
  export const PageProvider: any;
}

// Allow SVG imports
declare module '*.svg' {
  const content: string;
  export default content;
}

// Allow image imports
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}