import { gql } from '@apollo/client';

export const BILLING_REFETCH_QUERIES = [
  'getBillingDashboard',
  'getAssociationOpeningBalanceStatus',
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
        scholarshipApplicationId
        scholarshipMentor {
          id
          firstName
          lastName
          batch
          profileImage
        }
        scholarshipBeneficiary {
          id
          firstName
          lastName
          batch
          profileImage
        }
        attachments {
          id
          originalFilename
          mimeType
          sizeBytes
          status
          uploadedAt
        }
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

export const GET_ASSOCIATION_OPENING_BALANCE_STATUS = gql`
  query getAssociationOpeningBalanceStatus {
    getAssociationTransactions(
      options: { limit: 1, offset: 0 }
      filter: { billingCategory: OPENING_BALANCE, walletImpact: true }
    ) {
      total
      data {
        id
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
      attachments {
        id
      }
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
      attachments {
        id
      }
    }
  }
`;

export const CREATE_TRANSACTION_ATTACHMENT_UPLOAD = gql`
  mutation createTransactionAttachmentUpload(
    $transactionId: String!
    $filename: String!
    $mimeType: String!
    $sizeBytes: Int!
  ) {
    createTransactionAttachmentUpload(
      transactionId: $transactionId
      filename: $filename
      mimeType: $mimeType
      sizeBytes: $sizeBytes
    ) {
      uploadUrl
      attachment {
        id
        originalFilename
        mimeType
        sizeBytes
      }
    }
  }
`;

export const FINALIZE_TRANSACTION_ATTACHMENT_UPLOAD = gql`
  mutation finalizeTransactionAttachmentUpload($attachmentId: String!) {
    finalizeTransactionAttachmentUpload(attachmentId: $attachmentId) {
      id
      status
      uploadedAt
    }
  }
`;

export const GET_TRANSACTION_ATTACHMENT_READ_URL = gql`
  query getTransactionAttachmentReadUrl($attachmentId: String!) {
    getTransactionAttachmentReadUrl(attachmentId: $attachmentId)
  }
`;

export const SET_ASSOCIATION_OPENING_BALANCE = gql`
  mutation setAssociationOpeningBalance(
    $amount: Float!
    $transactionDate: String
    $referenceId: String
    $method: String
    $description: String
  ) {
    setAssociationOpeningBalance(
      amount: $amount
      transactionDate: $transactionDate
      referenceId: $referenceId
      method: $method
      description: $description
    ) {
      id
      amount
      currency
      type
      billingCategory
      walletImpact
      transactionDate
    }
  }
`;
