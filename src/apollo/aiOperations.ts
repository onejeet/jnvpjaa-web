import { gql } from '@apollo/client';

export type AiSurface = 'blog' | 'news' | 'page' | 'job' | 'event' | 'profile';

export interface AiAllowance {
  limit: number;
  remaining: number;
  resetsAt: string;
  enabled: boolean;
  available: boolean;
}

export interface AiResult {
  /** Text answer: the improved comment, or the proofread body. */
  result?: string | null;
  /** Field values for the form, by field key (draft and polish). */
  draft?: Record<string, unknown> | null;
  /** Facts the brief did not give, worth adding by hand. */
  gaps: string[];
  /** How many corrections a proofread made. */
  fixes?: number | null;
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
  mutation AiAssist($taskId: String!, $text: String, $context: JSON, $fresh: Boolean) {
    aiAssist(taskId: $taskId, text: $text, context: $context, fresh: $fresh) {
      result
      draft
      gaps
      fixes
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
