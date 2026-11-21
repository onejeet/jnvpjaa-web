import { gql } from '@apollo/client';

export type JobType = 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'CONTRACT';
export type WorkMode = 'ONSITE' | 'REMOTE' | 'HYBRID';
export type JobExperience = 'FRESHER' | 'JUNIOR' | 'MID' | 'SENIOR';
export type JobStatus = 'OPEN' | 'CLOSED';
export type JobPosterRelation = 'HIRING_AT_COMPANY' | 'REFERRAL_LEAD';
export type SalaryPeriod = 'YEAR' | 'MONTH';

export interface JobPoster {
  id: string;
  publicUsername?: string | null;
  firstName: string;
  lastName: string;
  profileImage?: string | null;
  batch?: number | null;
}

export interface JobApplicant {
  id: string;
  firstName: string;
  lastName: string;
  profileImage?: string | null;
  batch?: number | null;
  email: string;
  mobile?: string | null;
  whatsAppMobile?: string | null;
  city?: string | null;
  state?: string | null;
  aboutMe?: string | null;
  socialMedia?: Record<string, string> | null;
  companyName?: string | null;
  position?: string | null;
}

export interface JobApplication {
  id: string;
  jobId: string;
  resumeUrl?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  portfolioUrl?: string | null;
  note?: string | null;
  createdAt: string;
  applicant?: JobApplicant | null;
}

export interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyWebsite?: string | null;
  type: JobType;
  workMode: WorkMode;
  location?: string | null;
  experience: JobExperience;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryPeriod?: SalaryPeriod | null;
  description?: string;
  skills: string[];
  posterRelation: JobPosterRelation;
  applyUrl?: string | null;
  deadline?: string | null;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  postedBy: JobPoster;
  applicationCount: number;
  isAccepting: boolean;
  viewerCanManage?: boolean;
  viewerHasApplied?: boolean;
  viewerApplication?: JobApplication | null;
}

export interface JobInput {
  id?: string | null;
  title: string;
  company: string;
  companyWebsite?: string | null;
  type: JobType;
  workMode: WorkMode;
  location?: string | null;
  experience: JobExperience;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryPeriod?: SalaryPeriod | null;
  description: string;
  skills: string[];
  posterRelation: JobPosterRelation;
  applyUrl?: string | null;
  deadlineDate?: string | null;
}

export interface JobApplicationInput {
  resumeUrl?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  portfolioUrl?: string | null;
  note?: string | null;
}

export interface JobsVariables {
  type?: JobType | null;
  workMode?: WorkMode | null;
  experience?: JobExperience | null;
  search?: string | null;
  mine?: boolean;
  applied?: boolean;
  limit?: number;
  offset?: number;
}

const CARD_FIELDS = gql`
  fragment JobCardFields on Job {
    id
    slug
    title
    company
    type
    workMode
    location
    experience
    salaryMin
    salaryMax
    salaryPeriod
    skills
    deadline
    status
    createdAt
    updatedAt
    applicationCount
    isAccepting
    postedBy {
      id
      publicUsername
      firstName
      lastName
      profileImage
      batch
    }
  }
`;

const FULL_FIELDS = gql`
  fragment JobFullFields on Job {
    ...JobCardFields
    companyWebsite
    description
    posterRelation
    applyUrl
  }
  ${CARD_FIELDS}
`;

export const JOBS = gql`
  query Jobs(
    $type: JobType
    $workMode: WorkMode
    $experience: JobExperience
    $search: String
    $mine: Boolean
    $applied: Boolean
    $limit: Int
    $offset: Int
  ) {
    jobs(
      type: $type
      workMode: $workMode
      experience: $experience
      search: $search
      mine: $mine
      applied: $applied
      limit: $limit
      offset: $offset
    ) {
      total
      data {
        ...JobCardFields
      }
    }
  }
  ${CARD_FIELDS}
`;

export const JOB = gql`
  query Job($slug: String!) {
    job(slug: $slug) {
      ...JobFullFields
      viewerCanManage
      viewerHasApplied
      viewerApplication {
        id
        jobId
        createdAt
      }
    }
  }
  ${FULL_FIELDS}
`;

export const JOB_APPLICANTS = gql`
  query JobApplicants($jobId: String!) {
    jobApplicants(jobId: $jobId) {
      id
      jobId
      resumeUrl
      linkedinUrl
      githubUrl
      portfolioUrl
      note
      createdAt
      applicant {
        id
        firstName
        lastName
        profileImage
        batch
        email
        mobile
        whatsAppMobile
        city
        state
        aboutMe
        socialMedia
        companyName
        position
      }
    }
  }
`;

export const SAVE_JOB = gql`
  mutation SaveJob($input: JobInput!) {
    saveJob(input: $input) {
      ...JobFullFields
    }
  }
  ${FULL_FIELDS}
`;

export const SET_JOB_STATUS = gql`
  mutation SetJobStatus($id: String!, $status: JobStatus!) {
    setJobStatus(id: $id, status: $status) {
      id
      status
      isAccepting
    }
  }
`;

export const DELETE_JOB = gql`
  mutation DeleteJob($id: String!) {
    deleteJob(id: $id)
  }
`;

export const APPLY_TO_JOB = gql`
  mutation ApplyToJob($jobId: String!, $input: JobApplicationInput!) {
    applyToJob(jobId: $jobId, input: $input) {
      id
      jobId
      createdAt
    }
  }
`;

export const WITHDRAW_APPLICATION = gql`
  mutation WithdrawApplication($jobId: String!) {
    withdrawApplication(jobId: $jobId)
  }
`;
