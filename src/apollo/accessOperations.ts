import { gql } from '@apollo/client';

export const VIEWER_ACCESS_CONTEXT = gql`
  query viewerAccessContext {
    viewerAccessContext {
      userId
      hasFullAccess
      permissions
      roles {
        assignmentId
        code
        name
        scopeType
        scopeBatch
        validFrom
        validUntil
      }
      positions {
        assignmentId
        code
        name
        termId
        termName
        validFrom
        validUntil
      }
    }
  }
`;

export const ACCESS_CATALOG_QUERY = gql`
  query accessCatalog {
    systemRoles {
      id
      code
      name
      description
      isActive
    }
    executiveTerms {
      id
      name
      status
      startDate
      endDate
    }
    executivePositions {
      id
      code
      name
      isSingleSeat
      isActive
    }
  }
`;

export const ROLE_ASSIGNMENTS_QUERY = gql`
  query roleAssignments($filter: RoleAssignmentFilterInput) {
    roleAssignments(filter: $filter) {
      id
      userId
      scopeType
      scopeBatch
      validFrom
      validUntil
      assignmentReason
      revokedAt
      role {
        id
        code
        name
      }
      user {
        id
        firstName
        lastName
        batch
        profileImage
        isVerified
        isFaculty
      }
    }
  }
`;

export const BATCH_COORDINATOR_ROLE_ASSIGNMENTS_QUERY = gql`
  query batchCoordinatorRoleAssignments($options: ListInput) {
    getAllBatchCoordinators(options: $options) {
      id
      userId
      batch
      assignedAt
      user {
        id
        firstName
        lastName
        gender
        batch
        profileImage
        isVerified
        isFaculty
        email
        mobile
        whatsAppMobile
        emergencyMobile
        role {
          id
          name
          code
        }
      }
    }
  }
`;

export const EXECUTIVE_POSITION_ASSIGNMENTS_QUERY = gql`
  query executivePositionAssignments {
    executivePositionAssignments {
      id
      userId
      validFrom
      validUntil
      assignmentReason
      position {
        id
        code
        name
        isSingleSeat
      }
      executiveTerm {
        id
        name
        status
      }
      user {
        id
        firstName
        lastName
        batch
        profileImage
        isVerified
        isFaculty
      }
    }
  }
`;

export const PUBLIC_EXECUTIVE_COMMITTEE_QUERY = gql`
  query publicExecutiveCommittee {
    publicExecutiveCommittee {
      assignmentId
      userId
      name
      designation
      batch
      profilePicture
      email
      mobile
      positionCode
      positionName
      termId
      termName
      validFrom
      validUntil
    }
  }
`;

export const ASSIGN_USER_ROLE_MUTATION = gql`
  mutation assignUserRole($input: AssignUserRoleInput!) {
    assignUserRole(input: $input) {
      id
    }
  }
`;

export const REVOKE_USER_ROLE_MUTATION = gql`
  mutation revokeUserRole($input: RevokeUserRoleInput!) {
    revokeUserRole(input: $input) {
      id
    }
  }
`;

export const ASSIGN_EXECUTIVE_POSITION_MUTATION = gql`
  mutation assignExecutivePosition($input: AssignExecutivePositionInput!) {
    assignExecutivePosition(input: $input) {
      id
    }
  }
`;

export const REVOKE_EXECUTIVE_POSITION_MUTATION = gql`
  mutation revokeExecutivePosition($input: RevokeExecutivePositionInput!) {
    revokeExecutivePosition(input: $input) {
      id
    }
  }
`;
