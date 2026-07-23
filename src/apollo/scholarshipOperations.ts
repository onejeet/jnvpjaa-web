import { gql } from '@apollo/client';

export const SCHOLARSHIP_APPLICATION_FIELDS = gql`
  fragment ScholarshipApplicationFields on ScholarshipApplication {
    id
    referenceNumber
    applicantUserId
    beneficiaryUserId
    batchSnapshot
    assignedMentorUserId
    requestedAmount
    paymentMode
    requestedFirstInstallmentAmount
    purpose
    reason
    proposedProofDays
    approvedProofDays
    approvedTotalAmount
    approvedAmountDisbursed
    payoutMethod
    payoutMaskedSnapshot
    status
    proofStatus
    refundStatus
    submittedAt
    approvedAt
    rejectedAt
    rejectionReason
    lastActivityAt
    beneficiary {
      id
      firstName
      lastName
      email
      batch
      profileImage
    }
    assignedMentor {
      id
      firstName
      lastName
      email
      batch
      profileImage
    }
  }
`;

export const SCHOLARSHIP_TRANSACTION_FIELDS = gql`
  fragment ScholarshipTransactionFields on Transaction {
    id
    title
    amount
    status
    transactionDate
    scholarshipApplicationId
    scholarshipInstallmentSequence
    scholarshipMaskedPayoutDestination
    scholarshipStatus
    scholarshipConfirmedAmount
    scholarshipProofDueAt
    scholarshipProofStatus
    scholarshipCompletedAt
  }
`;

export const GET_MY_SCHOLARSHIP_DASHBOARD = gql`
  query getMyScholarshipDashboard {
    getMyScholarshipDashboard {
      totalApplications
      requestedAmount
      disbursedAmount
      byStatus {
        key
        count
      }
    }
  }
`;

export const GET_SCHOLARSHIP_ORG_DASHBOARD = gql`
  query getScholarshipOrganizationDashboard {
    getScholarshipOrganizationDashboard {
      totalApplications
      requestedAmount
      disbursedAmount
      exceptionCount
      byStatus {
        key
        count
      }
    }
  }
`;

export const GET_MENTOR_SCHOLARSHIP_DASHBOARD = gql`
  query getMentorScholarshipDashboard {
    getMentorScholarshipDashboard {
      totalApplications
      requestedAmount
      disbursedAmount
      byStatus {
        key
        count
      }
      capacity {
        allocated
        committed
        returned
        available
      }
    }
  }
`;

export const GET_SCHOLARSHIP_APPLICATIONS = gql`
  ${SCHOLARSHIP_APPLICATION_FIELDS}
  query getScholarshipApplications($filter: ScholarshipApplicationFilterInput, $options: ListInput) {
    getScholarshipApplications(filter: $filter, options: $options) {
      ...ScholarshipApplicationFields
    }
  }
`;

export const GET_MY_SCHOLARSHIP_APPLICATIONS = gql`
  ${SCHOLARSHIP_APPLICATION_FIELDS}
  query getMyScholarshipApplications($options: ListInput) {
    getMyScholarshipApplications(options: $options) {
      ...ScholarshipApplicationFields
    }
  }
`;

export const GET_SCHOLARSHIP_APPLICATION = gql`
  ${SCHOLARSHIP_APPLICATION_FIELDS}
  query getScholarshipApplication($id: String!) {
    getScholarshipApplication(id: $id) {
      ...ScholarshipApplicationFields
    }
  }
`;

export const GET_SCHOLARSHIP_APPLICATION_TRANSACTIONS = gql`
  ${SCHOLARSHIP_TRANSACTION_FIELDS}
  query getScholarshipApplicationTransactions($applicationId: String!) {
    getScholarshipApplicationTransactions(applicationId: $applicationId) {
      ...ScholarshipTransactionFields
    }
  }
`;

export const CREATE_SCHOLARSHIP_DRAFT = gql`
  ${SCHOLARSHIP_APPLICATION_FIELDS}
  mutation createScholarshipApplicationDraft($input: ScholarshipApplicationInput!) {
    createScholarshipApplicationDraft(input: $input) {
      ...ScholarshipApplicationFields
    }
  }
`;

export const UPDATE_SCHOLARSHIP_DRAFT = gql`
  ${SCHOLARSHIP_APPLICATION_FIELDS}
  mutation updateScholarshipApplicationDraft($applicationId: String!, $input: ScholarshipApplicationInput!) {
    updateScholarshipApplicationDraft(applicationId: $applicationId, input: $input) {
      ...ScholarshipApplicationFields
    }
  }
`;

export const SUBMIT_SCHOLARSHIP_APPLICATION = gql`
  ${SCHOLARSHIP_APPLICATION_FIELDS}
  mutation submitScholarshipApplication($applicationId: String!) {
    submitScholarshipApplication(applicationId: $applicationId) {
      ...ScholarshipApplicationFields
    }
  }
`;

export const START_SCHOLARSHIP_REVIEW = gql`
  ${SCHOLARSHIP_APPLICATION_FIELDS}
  mutation startScholarshipApplicationReview($applicationId: String!) {
    startScholarshipApplicationReview(applicationId: $applicationId) {
      ...ScholarshipApplicationFields
    }
  }
`;

export const APPROVE_SCHOLARSHIP_APPLICATION = gql`
  ${SCHOLARSHIP_APPLICATION_FIELDS}
  mutation approveScholarshipApplication(
    $applicationId: String!
    $approvedTotalAmount: Float!
    $installmentAmount: Float!
    $proofDueDays: Int
    $note: String
  ) {
    approveScholarshipApplication(
      applicationId: $applicationId
      approvedTotalAmount: $approvedTotalAmount
      installmentAmount: $installmentAmount
      proofDueDays: $proofDueDays
      note: $note
    ) {
      ...ScholarshipApplicationFields
    }
  }
`;

export const CONFIRM_SCHOLARSHIP_RECEIPT = gql`
  ${SCHOLARSHIP_TRANSACTION_FIELDS}
  mutation confirmScholarshipTransactionReceipt($transactionId: String!, $confirmedAmount: Float!, $note: String) {
    confirmScholarshipTransactionReceipt(
      transactionId: $transactionId
      confirmedAmount: $confirmedAmount
      note: $note
    ) {
      ...ScholarshipTransactionFields
    }
  }
`;

export const REQUEST_SCHOLARSHIP_FOLLOWUP = gql`
  mutation requestScholarshipDisbursalFollowup($transactionId: String!) {
    requestScholarshipDisbursalFollowup(transactionId: $transactionId)
  }
`;

export const RECORD_MENTOR_FUND_ALLOCATION = gql`
  mutation recordMentorFundAllocation($input: RecordMentorFundAllocationInput!) {
    recordMentorFundAllocation(input: $input) {
      id
      mentorUserId
      batch
      amount
      confirmedAmount
      status
    }
  }
`;
