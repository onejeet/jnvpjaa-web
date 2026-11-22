import { gql } from '@apollo/client';

export type AiSurface = 'blog' | 'news' | 'page' | 'job' | 'event';

export interface AiAllowance {
  limit: number;
  remaining: number;
  resetsAt: string;
  enabled: boolean;
  available: boolean;
}

export interface AiResult {
  result?: string | null;
  titles?: string[] | null;
  remaining: number;
  resetsAt: string;
}

export const AI_ALLOWANCE = gql`
  query AiAllowance {
    aiAllowance {
      limit
      remaining
      resetsAt
      enabled
      available
    }
  }
`;

export const AI_ASSIST = gql`
  mutation AiAssist($taskId: String!, $text: String!, $fields: JSON, $fresh: Boolean) {
    aiAssist(taskId: $taskId, text: $text, fields: $fields, fresh: $fresh) {
      result
      titles
      remaining
      resetsAt
    }
  }
`;

const AI_SETTINGS_FIELDS = `
  aiEnabled
  aiKeyConfigured
  aiMemberDaily
  aiAdminDaily
  aiDailyCap
`;

export interface AiSettings {
  aiEnabled: boolean;
  aiKeyConfigured: boolean;
  aiMemberDaily: number;
  aiAdminDaily: number;
  aiDailyCap: number;
}

export const AI_SETTINGS = gql`
  query AiSettings {
    platformSettings {
      ${AI_SETTINGS_FIELDS}
    }
  }
`;

export const UPDATE_AI_SETTINGS = gql`
  mutation UpdateAiSettings($enabled: Boolean, $memberDaily: Int, $adminDaily: Int, $dailyCap: Int) {
    updateAiSettings(enabled: $enabled, memberDaily: $memberDaily, adminDaily: $adminDaily, dailyCap: $dailyCap) {
      ${AI_SETTINGS_FIELDS}
    }
  }
`;
