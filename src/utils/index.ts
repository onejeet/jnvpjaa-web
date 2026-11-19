export const encodeBase64 = (data: string) => Buffer.from(data).toString('base64');
export const decodeBase64 = (data: string) => Buffer.from(data, 'base64').toString('ascii');

// The API puts an error's code at the top level (`{ message, code }`) rather than under `extensions`; read either.
export const graphqlErrorCode = (error?: { extensions?: Record<string, unknown> | null } | null) =>
  (error?.extensions?.code ?? (error as { code?: unknown } | null | undefined)?.code) as string | undefined;
