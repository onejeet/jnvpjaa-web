// tenants/$TENANT/*.json, aliased by next.config.js. Shape is checked at load by parseTenant (src/config/tenant.schema.ts).
declare module '@tenant/*' {
  const value: unknown;
  export default value;
}
