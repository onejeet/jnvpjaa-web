import { gql } from '@apollo/client';

export const BILLING_REFETCH_QUERIES = [
  'getBillingDashboard',
  'getAssociationWalletSummary',
  'getAssociationTransactions',
  'getTransactions',
  'getScholarshipOrganizationDashboard',
  'getScholarshipMentorSummaries',
  'getMentorFundAllocations',
];

export const GET_BILLING_DASHBOARD = gql`
  query getBillingDashboard {
    getBillingDashboard {
      currency
      totalCredits
      totalDebits
      availableFunds
      pendingDebits
      scholarshipReleasedToMentors
      scholarshipPaidToBeneficiaries
      otherActivitySpending
      donationsReceived
      membershipReceived
      eventReceived
      adjustmentsAndRefunds
      pendingMentorReleaseAmount
      disputedMentorReleaseAmount
    }
  }
`;

export const GET_ASSOCIATION_WALLET_SUMMARY = gql`
  query getAssociationWalletSummary {
    getAssociationWalletSummary {
      currency
      totalCredits
      totalDebits
      availableFunds
      pendingDebits
    }
  }
`;

export const GET_ASSOCIATION_TRANSACTIONS = gql`
  query getAssociationTransactions($options: ListInput, $filter: AssociationTransactionFilter) {
    getAssociationTransactions(options: $options, filter: $filter) {
      total
      data {
        id
        title
        amount
        currency
        type
        status
        transactionDate
        referenceId
        method
        description
        sourceType
        billingCategory
        walletImpact
        recordedByUserId
        recordedBy {
          id
          firstName
          lastName
          batch
          profileImage
        }
        user {
          id
          firstName
          lastName
          batch
          profileImage
        }
      }
    }
  }
`;

export const CREATE_ASSOCIATION_CREDIT = gql`
  mutation createAssociationCredit(
    $title: String!
    $amount: Float!
    $transactionDate: String
    $billingCategory: BillingCategory
    $referenceId: String
    $method: String
    $description: String
  ) {
    createAssociationCredit(
      title: $title
      amount: $amount
      transactionDate: $transactionDate
      billingCategory: $billingCategory
      referenceId: $referenceId
      method: $method
      description: $description
    ) {
      id
    }
  }
`;

export const CREATE_ASSOCIATION_DEBIT = gql`
  mutation createAssociationDebit(
    $title: String!
    $amount: Float!
    $transactionDate: String
    $billingCategory: BillingCategory
    $referenceId: String
    $method: String
    $description: String
  ) {
    createAssociationDebit(
      title: $title
      amount: $amount
      transactionDate: $transactionDate
      billingCategory: $billingCategory
      referenceId: $referenceId
      method: $method
      description: $description
    ) {
      id
    }
  }
`;
