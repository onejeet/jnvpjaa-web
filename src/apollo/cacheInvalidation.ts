import type { ApolloClient } from '@apollo/client';

export const invalidateActiveQueryFields = (client: ApolloClient<any>, fieldNames: readonly string[]) =>
  client.refetchQueries({
    updateCache(cache) {
      new Set(fieldNames).forEach((fieldName) => {
        cache.evict({ id: 'ROOT_QUERY', fieldName });
      });
    },
    onQueryUpdated(observableQuery) {
      return observableQuery.refetch();
    },
  });

export const invalidateBillingLedgerQueries = (
  client: ApolloClient<any>,
  options: { invalidateWallet?: boolean; additionalFields?: readonly string[] } = {}
) =>
  client.refetchQueries({
    updateCache(cache) {
      cache.evict({ id: 'ROOT_QUERY', fieldName: 'getBillingDashboard' });
      if (options.invalidateWallet !== false) {
        cache.evict({ id: 'ROOT_QUERY', fieldName: 'getAssociationWalletSummary' });
      }
      options.additionalFields?.forEach((fieldName) => {
        cache.evict({ id: 'ROOT_QUERY', fieldName });
      });
      cache.modify({
        id: 'ROOT_QUERY',
        fields: {
          getAssociationTransactions(existing, { DELETE, storeFieldName }) {
            return storeFieldName.includes('"filter"') ? existing : DELETE;
          },
        },
      });
    },
    onQueryUpdated(observableQuery) {
      return observableQuery.refetch();
    },
  });
