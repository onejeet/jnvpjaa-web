import { gql } from '@apollo/client';

export const ACTIVITY_FEED = gql`
  query ActivityFeed(
    $limit: Int
    $offset: Int
    $action: String
    $entityType: String
    $actorUserId: String
    $targetUserId: String
    $person: String
    $batch: Int
  ) {
    activityFeed(
      limit: $limit
      offset: $offset
      action: $action
      entityType: $entityType
      actorUserId: $actorUserId
      targetUserId: $targetUserId
      person: $person
      batch: $batch
    ) {
      total
      items {
        id
        action
        entityType
        entityId
        actorUserId
        actorName
        actorBatch
        targetUserId
        targetName
        batch
        reason
        createdAt
      }
    }
  }
`;
