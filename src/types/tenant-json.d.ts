// tenants/$TENANT/*.json, aliased by next.config.js. Shape is checked at load by parseTenant (src/config/tenant.schema.ts).
declare module '@tenant/*' {
  const value: unknown;
  export default value;
}

// The home page layout named in tenants/$TENANT/landing.json; next.config.js aliases this to src/containers/Landing/home/<layout>.tsx.
// Declared here, not as a tsconfig path, because Next resolves tsconfig paths before webpack aliases.
declare module '@landing/Home' {
  const Home: () => Promise<React.JSX.Element>;
  export default Home;
}
