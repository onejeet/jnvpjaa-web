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

export const SCHOLARSHIP_DASHBOARD_FIELDS = gql`
  fragment ScholarshipDashboardFields on ScholarshipDashboard {
    totalApplications
    requestedAmount
    disbursedAmount
    exceptionCount
    draftRequests
    submittedApplications
    submittedOrUnderReview
    underReviewApplications
    needsInformation
    awaitingPaymentConfirmation
    paymentConfirmationPendingApplications
    proofDue
    partialProof
    overdueProof
    completedApplications
    rejectedApplications
    routingPendingApplications
    wrongDisbursementApplications
    applicationsAwaitingReview
    fullProofsAwaitingVerification
    partialReceiptMismatchCount
    beneficiaryNonReceiptCount
    openRefundCaseCount
    refundResponsePendingCount
    refundReconciliationPendingCount
    missingMentorRoutingCount
    allocationDisputeCount
    failedNotificationCount
    disputedMentorAllocations
    activeBeneficiaryCount
    activeMentorCount
    pendingBeneficiaryConfirmationCount
    completedTransactionCount
    totalAllocationRecorded
    confirmedAllocation
    pendingIncomingAllocation
    disputedIncomingAllocation
    mentorCustodyBalance
    pendingBeneficiaryConfirmation
    confirmedBeneficiaryDisbursement
    returnedAmount
    approvedAdjustments
    approvalCapacity
    totalCompletedAfterProofVerification
    overdueProofAmount
    wrongDisbursementAmount
    refundRequestedAmount
    refundConfirmedAmount
    byStatus {
      key
      count
    }
    byProofStatus {
      key
      count
    }
    byRefundStatus {
      key
      count
    }
    byAllocationStatus {
      key
      count
    }
    byTransactionStatus {
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
`;

export const GET_MY_SCHOLARSHIP_DASHBOARD = gql`
  ${SCHOLARSHIP_DASHBOARD_FIELDS}
  query getMyScholarshipDashboard {
    getMyScholarshipDashboard {
      ...ScholarshipDashboardFields
    }
  }
`;

export const GET_SCHOLARSHIP_ORG_DASHBOARD = gql`
  ${SCHOLARSHIP_DASHBOARD_FIELDS}
  query getScholarshipOrganizationDashboard {
    getScholarshipOrganizationDashboard {
      ...ScholarshipDashboardFields
    }
  }
`;

export const GET_MENTOR_SCHOLARSHIP_DASHBOARD = gql`
  ${SCHOLARSHIP_DASHBOARD_FIELDS}
  query getMentorScholarshipDashboard {
    getMentorScholarshipDashboard {
      ...ScholarshipDashboardFields
    }
  }
`;

export const GET_BATCH_COORDINATOR_SCHOLARSHIP_DASHBOARD = gql`
  ${SCHOLARSHIP_DASHBOARD_FIELDS}
  query getBatchCoordinatorScholarshipDashboard($batch: Int!) {
    getBatchCoordinatorScholarshipDashboard(batch: $batch) {
      ...ScholarshipDashboardFields
    }
  }
`;

export const GET_SCHOLARSHIP_MENTOR_SUMMARIES = gql`
  ${SCHOLARSHIP_DASHBOARD_FIELDS}
  query getScholarshipMentorSummaries {
    getScholarshipMentorSummaries {
      mentorUserId
      assignedBatches
      mentor {
        id
        firstName
        lastName
        email
        batch
        profileImage
      }
      summary {
        ...ScholarshipDashboardFields
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

export const GET_MENTOR_FUND_ALLOCATIONS = gql`
  query getMentorFundAllocations($mentorUserId: String, $batch: Int, $options: ListInput) {
    getMentorFundAllocations(mentorUserId: $mentorUserId, batch: $batch, options: $options) {
      id
      mentorUserId
      batch
      amount
      confirmedAmount
      disputedAmount
      transferDate
      method
      reference
      notes
      status
      createdAt
    }
  }
`;
