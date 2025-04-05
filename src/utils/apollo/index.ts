import { ApolloClient, DocumentNode, NormalizedCacheObject, Unmasked } from '@apollo/client';

export const updateCache = ({
  client,
  query,
  data,
  variables,
}: {
  client: ApolloClient<object>;
  query: DocumentNode;
  data: any;
  variables?: Record<string, any>;
}) => {
  console.log('ZZ: CACHE', query, data);
  client.writeQuery<any>({
    query,
    data,
    variables,
  });
};
