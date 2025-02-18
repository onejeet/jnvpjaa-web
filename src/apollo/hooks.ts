import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any };
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  user?: Maybe<User>;
};

export type BatchCoordinator = {
  __typename?: 'BatchCoordinator';
  /** Timestamp when the record was created */
  assignedAt: Scalars['DateTime']['output'];
  batch?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type Event = {
  __typename?: 'Event';
  attendees?: Maybe<Array<Maybe<User>>>;
  category?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the record was created */
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  medium: Scalars['String']['output'];
  organizers?: Maybe<Array<Maybe<User>>>;
  price?: Maybe<Scalars['Float']['output']>;
  startDate: Scalars['DateTime']['output'];
  status?: Maybe<Scalars['String']['output']>;
  summary: Scalars['String']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  ticketUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  /** Timestamp when the record was last updated */
  updatedAt: Scalars['DateTime']['output'];
};

export type FilterInput = {
  query?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ListEventResponse = {
  __typename?: 'ListEventResponse';
  data?: Maybe<Array<Maybe<Event>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type ListInput = {
  filter?: InputMaybe<FilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ListUserResponse = {
  __typename?: 'ListUserResponse';
  data?: Maybe<Array<Maybe<User>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  assignBatchCoordinator?: Maybe<BatchCoordinator>;
  attendEvent?: Maybe<Event>;
  createEvent?: Maybe<Event>;
  deleteUser?: Maybe<User>;
  forgotPassword?: Maybe<Scalars['Boolean']['output']>;
  logout?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<AuthPayload>;
  removeBatchCoordinator?: Maybe<Scalars['Boolean']['output']>;
  resetPassword?: Maybe<Scalars['Boolean']['output']>;
  signin?: Maybe<AuthPayload>;
  signup?: Maybe<User>;
  updateBatchCoordinator?: Maybe<BatchCoordinator>;
  updateUser?: Maybe<User>;
  verifyUser?: Maybe<Scalars['Boolean']['output']>;
};

export type MutationAssignBatchCoordinatorArgs = {
  batch: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};

export type MutationAttendEventArgs = {
  eventId: Scalars['String']['input'];
};

export type MutationCreateEventArgs = {
  category: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  isPublish?: InputMaybe<Scalars['Boolean']['input']>;
  medium: Scalars['String']['input'];
  price?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['String']['input'];
  summary: Scalars['String']['input'];
  tags?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};

export type MutationRemoveBatchCoordinatorArgs = {
  batch: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};

export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type MutationSigninArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationSignupArgs = {
  batch?: InputMaybe<Scalars['Int']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationUpdateBatchCoordinatorArgs = {
  newBatch: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};

export type MutationUpdateUserArgs = {
  aboutMe?: InputMaybe<Scalars['String']['input']>;
  batch?: InputMaybe<Scalars['Int']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  emergencyMobile?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  nickName?: InputMaybe<Scalars['String']['input']>;
  profileImage?: InputMaybe<Scalars['String']['input']>;
};

export type MutationVerifyUserArgs = {
  user_id: Scalars['String']['input'];
  verified: Scalars['Boolean']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllBatchCoordinators?: Maybe<Array<Maybe<BatchCoordinator>>>;
  getBatchCoordinatorByUserId?: Maybe<BatchCoordinator>;
  getBatchCoordinatorsByBatch?: Maybe<Array<Maybe<BatchCoordinator>>>;
  getEventDetails?: Maybe<Event>;
  getEventList?: Maybe<ListEventResponse>;
  getUserDetails?: Maybe<User>;
  getUserList?: Maybe<ListUserResponse>;
};

export type QueryGetBatchCoordinatorByUserIdArgs = {
  userId: Scalars['String']['input'];
};

export type QueryGetBatchCoordinatorsByBatchArgs = {
  batch: Scalars['Int']['input'];
};

export type QueryGetEventDetailsArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetEventListArgs = {
  options?: InputMaybe<ListInput>;
};

export type QueryGetUserDetailsArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetUserListArgs = {
  options?: InputMaybe<ListInput>;
};

export type Role = {
  __typename?: 'Role';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  aboutMe?: Maybe<Scalars['String']['output']>;
  batch?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was created */
  createdAt: Scalars['DateTime']['output'];
  disabled?: Maybe<Scalars['Boolean']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  dob?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emergency_mobile?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  google_auth_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  membershipYear?: Maybe<Scalars['Int']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  nickName?: Maybe<Scalars['String']['output']>;
  profileImage?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  /** Timestamp when the record was last updated */
  updatedAt: Scalars['DateTime']['output'];
};

export type AssignBatchCoordinatorMutationVariables = Exact<{
  batch: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
}>;

export type AssignBatchCoordinatorMutation = {
  __typename?: 'Mutation';
  assignBatchCoordinator?:
    | {
        __typename?: 'BatchCoordinator';
        assignedAt: any;
        batch?: number | undefined;
        id?: string | undefined;
        userId?: string | undefined;
        user?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: string | undefined;
              email?: string | undefined;
              emergency_mobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              id?: string | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              updatedAt: any;
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type AttendEventMutationVariables = Exact<{
  eventId: Scalars['String']['input'];
}>;

export type AttendEventMutation = {
  __typename?: 'Mutation';
  attendEvent?:
    | {
        __typename?: 'Event';
        category?: string | undefined;
        createdAt: any;
        createdBy: string;
        description?: string | undefined;
        endDate?: any | undefined;
        id: string;
        image?: string | undefined;
        location?: string | undefined;
        medium: string;
        price?: number | undefined;
        startDate: any;
        status?: string | undefined;
        summary: string;
        tags?: Array<string | undefined> | undefined;
        ticketUrl?: string | undefined;
        title: string;
        updatedAt: any;
        attendees?:
          | Array<
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: string | undefined;
                  email?: string | undefined;
                  emergency_mobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  id?: string | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  updatedAt: any;
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
                }
              | undefined
            >
          | undefined;
        organizers?:
          | Array<
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: string | undefined;
                  email?: string | undefined;
                  emergency_mobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  id?: string | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  updatedAt: any;
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type CreateEventMutationVariables = Exact<{
  category: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  isPublish?: InputMaybe<Scalars['Boolean']['input']>;
  medium: Scalars['String']['input'];
  price?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['String']['input'];
  summary: Scalars['String']['input'];
  tags?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
}>;

export type CreateEventMutation = {
  __typename?: 'Mutation';
  createEvent?:
    | {
        __typename?: 'Event';
        category?: string | undefined;
        createdAt: any;
        createdBy: string;
        description?: string | undefined;
        endDate?: any | undefined;
        id: string;
        image?: string | undefined;
        location?: string | undefined;
        medium: string;
        price?: number | undefined;
        startDate: any;
        status?: string | undefined;
        summary: string;
        tags?: Array<string | undefined> | undefined;
        ticketUrl?: string | undefined;
        title: string;
        updatedAt: any;
        attendees?:
          | Array<
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: string | undefined;
                  email?: string | undefined;
                  emergency_mobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  id?: string | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  updatedAt: any;
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
                }
              | undefined
            >
          | undefined;
        organizers?:
          | Array<
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: string | undefined;
                  email?: string | undefined;
                  emergency_mobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  id?: string | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  updatedAt: any;
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type DeleteUserMutation = {
  __typename?: 'Mutation';
  deleteUser?:
    | {
        __typename?: 'User';
        aboutMe?: string | undefined;
        batch?: number | undefined;
        createdAt: any;
        disabled?: boolean | undefined;
        displayName?: string | undefined;
        dob?: string | undefined;
        email?: string | undefined;
        emergency_mobile?: string | undefined;
        firstName?: string | undefined;
        gender?: string | undefined;
        google_auth_id?: string | undefined;
        id?: string | undefined;
        isVerified?: boolean | undefined;
        lastName?: string | undefined;
        membershipYear?: number | undefined;
        mobile?: string | undefined;
        nickName?: string | undefined;
        profileImage?: string | undefined;
        updatedAt: any;
        role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
      }
    | undefined;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type ForgotPasswordMutation = { __typename?: 'Mutation'; forgotPassword?: boolean | undefined };

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout?: string | undefined };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never }>;

export type RefreshTokenMutation = {
  __typename?: 'Mutation';
  refreshToken?:
    | {
        __typename?: 'AuthPayload';
        user?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: string | undefined;
              email?: string | undefined;
              emergency_mobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              id?: string | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              updatedAt: any;
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type RemoveBatchCoordinatorMutationVariables = Exact<{
  batch: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
}>;

export type RemoveBatchCoordinatorMutation = { __typename?: 'Mutation'; removeBatchCoordinator?: boolean | undefined };

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;

export type ResetPasswordMutation = { __typename?: 'Mutation'; resetPassword?: boolean | undefined };

export type SigninMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type SigninMutation = {
  __typename?: 'Mutation';
  signin?:
    | {
        __typename?: 'AuthPayload';
        user?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: string | undefined;
              email?: string | undefined;
              emergency_mobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              id?: string | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              updatedAt: any;
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type SignupMutationVariables = Exact<{
  batch?: InputMaybe<Scalars['Int']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type SignupMutation = {
  __typename?: 'Mutation';
  signup?:
    | {
        __typename?: 'User';
        aboutMe?: string | undefined;
        batch?: number | undefined;
        createdAt: any;
        disabled?: boolean | undefined;
        displayName?: string | undefined;
        dob?: string | undefined;
        email?: string | undefined;
        emergency_mobile?: string | undefined;
        firstName?: string | undefined;
        gender?: string | undefined;
        google_auth_id?: string | undefined;
        id?: string | undefined;
        isVerified?: boolean | undefined;
        lastName?: string | undefined;
        membershipYear?: number | undefined;
        mobile?: string | undefined;
        nickName?: string | undefined;
        profileImage?: string | undefined;
        updatedAt: any;
        role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
      }
    | undefined;
};

export type UpdateBatchCoordinatorMutationVariables = Exact<{
  newBatch: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
}>;

export type UpdateBatchCoordinatorMutation = {
  __typename?: 'Mutation';
  updateBatchCoordinator?:
    | {
        __typename?: 'BatchCoordinator';
        assignedAt: any;
        batch?: number | undefined;
        id?: string | undefined;
        userId?: string | undefined;
        user?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: string | undefined;
              email?: string | undefined;
              emergency_mobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              id?: string | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              updatedAt: any;
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type UpdateUserMutationVariables = Exact<{
  aboutMe?: InputMaybe<Scalars['String']['input']>;
  batch?: InputMaybe<Scalars['Int']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  emergencyMobile?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  nickName?: InputMaybe<Scalars['String']['input']>;
  profileImage?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser?:
    | {
        __typename?: 'User';
        aboutMe?: string | undefined;
        batch?: number | undefined;
        createdAt: any;
        disabled?: boolean | undefined;
        displayName?: string | undefined;
        dob?: string | undefined;
        email?: string | undefined;
        emergency_mobile?: string | undefined;
        firstName?: string | undefined;
        gender?: string | undefined;
        google_auth_id?: string | undefined;
        id?: string | undefined;
        isVerified?: boolean | undefined;
        lastName?: string | undefined;
        membershipYear?: number | undefined;
        mobile?: string | undefined;
        nickName?: string | undefined;
        profileImage?: string | undefined;
        updatedAt: any;
        role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
      }
    | undefined;
};

export type VerifyUserMutationVariables = Exact<{
  user_id: Scalars['String']['input'];
  verified: Scalars['Boolean']['input'];
}>;

export type VerifyUserMutation = { __typename?: 'Mutation'; verifyUser?: boolean | undefined };

export type GetAllBatchCoordinatorsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllBatchCoordinatorsQuery = {
  __typename?: 'Query';
  getAllBatchCoordinators?:
    | Array<
        | {
            __typename?: 'BatchCoordinator';
            assignedAt: any;
            batch?: number | undefined;
            id?: string | undefined;
            userId?: string | undefined;
            user?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: string | undefined;
                  email?: string | undefined;
                  emergency_mobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  id?: string | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  updatedAt: any;
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
                }
              | undefined;
          }
        | undefined
      >
    | undefined;
};

export type GetBatchCoordinatorByUserIdQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;

export type GetBatchCoordinatorByUserIdQuery = {
  __typename?: 'Query';
  getBatchCoordinatorByUserId?:
    | {
        __typename?: 'BatchCoordinator';
        assignedAt: any;
        batch?: number | undefined;
        id?: string | undefined;
        userId?: string | undefined;
        user?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: string | undefined;
              email?: string | undefined;
              emergency_mobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              id?: string | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              updatedAt: any;
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type GetBatchCoordinatorsByBatchQueryVariables = Exact<{
  batch: Scalars['Int']['input'];
}>;

export type GetBatchCoordinatorsByBatchQuery = {
  __typename?: 'Query';
  getBatchCoordinatorsByBatch?:
    | Array<
        | {
            __typename?: 'BatchCoordinator';
            assignedAt: any;
            batch?: number | undefined;
            id?: string | undefined;
            userId?: string | undefined;
            user?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: string | undefined;
                  email?: string | undefined;
                  emergency_mobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  id?: string | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  updatedAt: any;
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
                }
              | undefined;
          }
        | undefined
      >
    | undefined;
};

export type GetEventDetailsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type GetEventDetailsQuery = {
  __typename?: 'Query';
  getEventDetails?:
    | {
        __typename?: 'Event';
        category?: string | undefined;
        createdAt: any;
        createdBy: string;
        description?: string | undefined;
        endDate?: any | undefined;
        id: string;
        image?: string | undefined;
        location?: string | undefined;
        medium: string;
        price?: number | undefined;
        startDate: any;
        status?: string | undefined;
        summary: string;
        tags?: Array<string | undefined> | undefined;
        ticketUrl?: string | undefined;
        title: string;
        updatedAt: any;
        attendees?:
          | Array<
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: string | undefined;
                  email?: string | undefined;
                  emergency_mobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  id?: string | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  updatedAt: any;
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
                }
              | undefined
            >
          | undefined;
        organizers?:
          | Array<
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: string | undefined;
                  email?: string | undefined;
                  emergency_mobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  id?: string | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  updatedAt: any;
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type GetEventListQueryVariables = Exact<{
  options?: InputMaybe<ListInput>;
}>;

export type GetEventListQuery = {
  __typename?: 'Query';
  getEventList?:
    | {
        __typename?: 'ListEventResponse';
        total?: number | undefined;
        data?:
          | Array<
              | {
                  __typename?: 'Event';
                  category?: string | undefined;
                  createdAt: any;
                  createdBy: string;
                  description?: string | undefined;
                  endDate?: any | undefined;
                  id: string;
                  image?: string | undefined;
                  location?: string | undefined;
                  medium: string;
                  price?: number | undefined;
                  startDate: any;
                  status?: string | undefined;
                  summary: string;
                  tags?: Array<string | undefined> | undefined;
                  ticketUrl?: string | undefined;
                  title: string;
                  updatedAt: any;
                  attendees?:
                    | Array<
                        | {
                            __typename?: 'User';
                            aboutMe?: string | undefined;
                            batch?: number | undefined;
                            createdAt: any;
                            disabled?: boolean | undefined;
                            displayName?: string | undefined;
                            dob?: string | undefined;
                            email?: string | undefined;
                            emergency_mobile?: string | undefined;
                            firstName?: string | undefined;
                            gender?: string | undefined;
                            google_auth_id?: string | undefined;
                            id?: string | undefined;
                            isVerified?: boolean | undefined;
                            lastName?: string | undefined;
                            membershipYear?: number | undefined;
                            mobile?: string | undefined;
                            nickName?: string | undefined;
                            profileImage?: string | undefined;
                            updatedAt: any;
                            role?:
                              | { __typename?: 'Role'; id?: string | undefined; name?: string | undefined }
                              | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  organizers?:
                    | Array<
                        | {
                            __typename?: 'User';
                            aboutMe?: string | undefined;
                            batch?: number | undefined;
                            createdAt: any;
                            disabled?: boolean | undefined;
                            displayName?: string | undefined;
                            dob?: string | undefined;
                            email?: string | undefined;
                            emergency_mobile?: string | undefined;
                            firstName?: string | undefined;
                            gender?: string | undefined;
                            google_auth_id?: string | undefined;
                            id?: string | undefined;
                            isVerified?: boolean | undefined;
                            lastName?: string | undefined;
                            membershipYear?: number | undefined;
                            mobile?: string | undefined;
                            nickName?: string | undefined;
                            profileImage?: string | undefined;
                            updatedAt: any;
                            role?:
                              | { __typename?: 'Role'; id?: string | undefined; name?: string | undefined }
                              | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type GetUserDetailsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetUserDetailsQuery = {
  __typename?: 'Query';
  getUserDetails?:
    | {
        __typename?: 'User';
        aboutMe?: string | undefined;
        batch?: number | undefined;
        createdAt: any;
        disabled?: boolean | undefined;
        displayName?: string | undefined;
        dob?: string | undefined;
        email?: string | undefined;
        emergency_mobile?: string | undefined;
        firstName?: string | undefined;
        gender?: string | undefined;
        google_auth_id?: string | undefined;
        id?: string | undefined;
        isVerified?: boolean | undefined;
        lastName?: string | undefined;
        membershipYear?: number | undefined;
        mobile?: string | undefined;
        nickName?: string | undefined;
        profileImage?: string | undefined;
        updatedAt: any;
        role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
      }
    | undefined;
};

export type GetUserListQueryVariables = Exact<{
  options?: InputMaybe<ListInput>;
}>;

export type GetUserListQuery = {
  __typename?: 'Query';
  getUserList?:
    | {
        __typename?: 'ListUserResponse';
        total?: number | undefined;
        data?:
          | Array<
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: string | undefined;
                  email?: string | undefined;
                  emergency_mobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  id?: string | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  updatedAt: any;
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export const AssignBatchCoordinatorDocument = gql`
  mutation assignBatchCoordinator($batch: Int!, $userId: String!) {
    assignBatchCoordinator(batch: $batch, userId: $userId) {
      assignedAt
      batch
      id
      user {
        aboutMe
        batch
        createdAt
        disabled
        displayName
        dob
        email
        emergency_mobile
        firstName
        gender
        google_auth_id
        id
        isVerified
        lastName
        membershipYear
        mobile
        nickName
        profileImage
        role {
          id
          name
        }
        updatedAt
      }
      userId
    }
  }
`;
export type AssignBatchCoordinatorMutationFn = Apollo.MutationFunction<
  AssignBatchCoordinatorMutation,
  AssignBatchCoordinatorMutationVariables
>;

/**
 * __useAssignBatchCoordinatorMutation__
 *
 * To run a mutation, you first call `useAssignBatchCoordinatorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignBatchCoordinatorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignBatchCoordinatorMutation, { data, loading, error }] = useAssignBatchCoordinatorMutation({
 *   variables: {
 *      batch: // value for 'batch'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAssignBatchCoordinatorMutation(
  baseOptions?: Apollo.MutationHookOptions<AssignBatchCoordinatorMutation, AssignBatchCoordinatorMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AssignBatchCoordinatorMutation, AssignBatchCoordinatorMutationVariables>(
    AssignBatchCoordinatorDocument,
    options
  );
}
export type AssignBatchCoordinatorMutationHookResult = ReturnType<typeof useAssignBatchCoordinatorMutation>;
export type AssignBatchCoordinatorMutationResult = Apollo.MutationResult<AssignBatchCoordinatorMutation>;
export type AssignBatchCoordinatorMutationOptions = Apollo.BaseMutationOptions<
  AssignBatchCoordinatorMutation,
  AssignBatchCoordinatorMutationVariables
>;
export const AttendEventDocument = gql`
  mutation attendEvent($eventId: String!) {
    attendEvent(eventId: $eventId) {
      attendees {
        aboutMe
        batch
        createdAt
        disabled
        displayName
        dob
        email
        emergency_mobile
        firstName
        gender
        google_auth_id
        id
        isVerified
        lastName
        membershipYear
        mobile
        nickName
        profileImage
        role {
          id
          name
        }
        updatedAt
      }
      category
      createdAt
      createdBy
      description
      endDate
      id
      image
      location
      medium
      organizers {
        aboutMe
        batch
        createdAt
        disabled
        displayName
        dob
        email
        emergency_mobile
        firstName
        gender
        google_auth_id
        id
        isVerified
        lastName
        membershipYear
        mobile
        nickName
        profileImage
        role {
          id
          name
        }
        updatedAt
      }
      price
      startDate
      status
      summary
      tags
      ticketUrl
      title
      updatedAt
    }
  }
`;
export type AttendEventMutationFn = Apollo.MutationFunction<AttendEventMutation, AttendEventMutationVariables>;

/**
 * __useAttendEventMutation__
 *
 * To run a mutation, you first call `useAttendEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttendEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attendEventMutation, { data, loading, error }] = useAttendEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAttendEventMutation(
  baseOptions?: Apollo.MutationHookOptions<AttendEventMutation, AttendEventMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AttendEventMutation, AttendEventMutationVariables>(AttendEventDocument, options);
}
export type AttendEventMutationHookResult = ReturnType<typeof useAttendEventMutation>;
export type AttendEventMutationResult = Apollo.MutationResult<AttendEventMutation>;
export type AttendEventMutationOptions = Apollo.BaseMutationOptions<AttendEventMutation, AttendEventMutationVariables>;
export const CreateEventDocument = gql`
  mutation createEvent(
    $category: String!
    $description: String
    $endDate: String
    $isPublish: Boolean
    $medium: String!
    $price: String
    $startDate: String!
    $summary: String!
    $tags: String
    $title: String!
  ) {
    createEvent(
      category: $category
      description: $description
      endDate: $endDate
      isPublish: $isPublish
      medium: $medium
      price: $price
      startDate: $startDate
      summary: $summary
      tags: $tags
      title: $title
    ) {
      attendees {
        aboutMe
        batch
        createdAt
        disabled
        displayName
        dob
        email
        emergency_mobile
        firstName
        gender
        google_auth_id
        id
        isVerified
        lastName
        membershipYear
        mobile
        nickName
        profileImage
        role {
          id
          name
        }
        updatedAt
      }
      category
      createdAt
      createdBy
      description
      endDate
      id
      image
      location
      medium
      organizers {
        aboutMe
        batch
        createdAt
        disabled
        displayName
        dob
        email
        emergency_mobile
        firstName
        gender
        google_auth_id
        id
        isVerified
        lastName
        membershipYear
        mobile
        nickName
        profileImage
        role {
          id
          name
        }
        updatedAt
      }
      price
      startDate
      status
      summary
      tags
      ticketUrl
      title
      updatedAt
    }
  }
`;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      category: // value for 'category'
 *      description: // value for 'description'
 *      endDate: // value for 'endDate'
 *      isPublish: // value for 'isPublish'
 *      medium: // value for 'medium'
 *      price: // value for 'price'
 *      startDate: // value for 'startDate'
 *      summary: // value for 'summary'
 *      tags: // value for 'tags'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateEventMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
}
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const DeleteUserDocument = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      aboutMe
      batch
      createdAt
      disabled
      displayName
      dob
      email
      emergency_mobile
      firstName
      gender
      google_auth_id
      id
      isVerified
      lastName
      membershipYear
      mobile
      nickName
      profileImage
      role {
        id
        name
      }
      updatedAt
    }
  }
`;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
}
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const ForgotPasswordDocument = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const LogoutDocument = gql`
  mutation logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokenDocument = gql`
  mutation refreshToken {
    refreshToken {
      user {
        aboutMe
        batch
        createdAt
        disabled
        displayName
        dob
        email
        emergency_mobile
        firstName
        gender
        google_auth_id
        id
        isVerified
        lastName
        membershipYear
        mobile
        nickName
        profileImage
        role {
          id
          name
        }
        updatedAt
      }
    }
  }
`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
}
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
export const RemoveBatchCoordinatorDocument = gql`
  mutation removeBatchCoordinator($batch: Int!, $userId: String!) {
    removeBatchCoordinator(batch: $batch, userId: $userId)
  }
`;
export type RemoveBatchCoordinatorMutationFn = Apollo.MutationFunction<
  RemoveBatchCoordinatorMutation,
  RemoveBatchCoordinatorMutationVariables
>;

/**
 * __useRemoveBatchCoordinatorMutation__
 *
 * To run a mutation, you first call `useRemoveBatchCoordinatorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBatchCoordinatorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBatchCoordinatorMutation, { data, loading, error }] = useRemoveBatchCoordinatorMutation({
 *   variables: {
 *      batch: // value for 'batch'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveBatchCoordinatorMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveBatchCoordinatorMutation, RemoveBatchCoordinatorMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveBatchCoordinatorMutation, RemoveBatchCoordinatorMutationVariables>(
    RemoveBatchCoordinatorDocument,
    options
  );
}
export type RemoveBatchCoordinatorMutationHookResult = ReturnType<typeof useRemoveBatchCoordinatorMutation>;
export type RemoveBatchCoordinatorMutationResult = Apollo.MutationResult<RemoveBatchCoordinatorMutation>;
export type RemoveBatchCoordinatorMutationOptions = Apollo.BaseMutationOptions<
  RemoveBatchCoordinatorMutation,
  RemoveBatchCoordinatorMutationVariables
>;
export const ResetPasswordDocument = gql`
  mutation resetPassword($newPassword: String!, $token: String!) {
    resetPassword(newPassword: $newPassword, token: $token)
  }
`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
export const SigninDocument = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      user {
        aboutMe
        batch
        createdAt
        disabled
        displayName
        dob
        email
        emergency_mobile
        firstName
        gender
        google_auth_id
        id
        isVerified
        lastName
        membershipYear
        mobile
        nickName
        profileImage
        role {
          id
          name
        }
        updatedAt
      }
    }
  }
`;
export type SigninMutationFn = Apollo.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, options);
}
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const SignupDocument = gql`
  mutation signup(
    $batch: Int
    $email: String!
    $firstName: String!
    $gender: String!
    $lastName: String!
    $mobile: String!
    $password: String!
  ) {
    signup(
      batch: $batch
      email: $email
      firstName: $firstName
      gender: $gender
      lastName: $lastName
      mobile: $mobile
      password: $password
    ) {
      aboutMe
      batch
      createdAt
      disabled
      displayName
      dob
      email
      emergency_mobile
      firstName
      gender
      google_auth_id
      id
      isVerified
      lastName
      membershipYear
      mobile
      nickName
      profileImage
      role {
        id
        name
      }
      updatedAt
    }
  }
`;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      batch: // value for 'batch'
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      gender: // value for 'gender'
 *      lastName: // value for 'lastName'
 *      mobile: // value for 'mobile'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UpdateBatchCoordinatorDocument = gql`
  mutation updateBatchCoordinator($newBatch: Int!, $userId: String!) {
    updateBatchCoordinator(newBatch: $newBatch, userId: $userId) {
      assignedAt
      batch
      id
      user {
        aboutMe
        batch
        createdAt
        disabled
        displayName
        dob
        email
        emergency_mobile
        firstName
        gender
        google_auth_id
        id
        isVerified
        lastName
        membershipYear
        mobile
        nickName
        profileImage
        role {
          id
          name
        }
        updatedAt
      }
      userId
    }
  }
`;
export type UpdateBatchCoordinatorMutationFn = Apollo.MutationFunction<
  UpdateBatchCoordinatorMutation,
  UpdateBatchCoordinatorMutationVariables
>;

/**
 * __useUpdateBatchCoordinatorMutation__
 *
 * To run a mutation, you first call `useUpdateBatchCoordinatorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBatchCoordinatorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBatchCoordinatorMutation, { data, loading, error }] = useUpdateBatchCoordinatorMutation({
 *   variables: {
 *      newBatch: // value for 'newBatch'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateBatchCoordinatorMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateBatchCoordinatorMutation, UpdateBatchCoordinatorMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateBatchCoordinatorMutation, UpdateBatchCoordinatorMutationVariables>(
    UpdateBatchCoordinatorDocument,
    options
  );
}
export type UpdateBatchCoordinatorMutationHookResult = ReturnType<typeof useUpdateBatchCoordinatorMutation>;
export type UpdateBatchCoordinatorMutationResult = Apollo.MutationResult<UpdateBatchCoordinatorMutation>;
export type UpdateBatchCoordinatorMutationOptions = Apollo.BaseMutationOptions<
  UpdateBatchCoordinatorMutation,
  UpdateBatchCoordinatorMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation updateUser(
    $aboutMe: String
    $batch: Int
    $displayName: String
    $dob: String
    $emergencyMobile: String
    $firstName: String
    $gender: String
    $id: String
    $lastName: String
    $mobile: String
    $nickName: String
    $profileImage: String
  ) {
    updateUser(
      aboutMe: $aboutMe
      batch: $batch
      displayName: $displayName
      dob: $dob
      emergencyMobile: $emergencyMobile
      firstName: $firstName
      gender: $gender
      id: $id
      lastName: $lastName
      mobile: $mobile
      nickName: $nickName
      profileImage: $profileImage
    ) {
      aboutMe
      batch
      createdAt
      disabled
      displayName
      dob
      email
      emergency_mobile
      firstName
      gender
      google_auth_id
      id
      isVerified
      lastName
      membershipYear
      mobile
      nickName
      profileImage
      role {
        id
        name
      }
      updatedAt
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      aboutMe: // value for 'aboutMe'
 *      batch: // value for 'batch'
 *      displayName: // value for 'displayName'
 *      dob: // value for 'dob'
 *      emergencyMobile: // value for 'emergencyMobile'
 *      firstName: // value for 'firstName'
 *      gender: // value for 'gender'
 *      id: // value for 'id'
 *      lastName: // value for 'lastName'
 *      mobile: // value for 'mobile'
 *      nickName: // value for 'nickName'
 *      profileImage: // value for 'profileImage'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const VerifyUserDocument = gql`
  mutation verifyUser($user_id: String!, $verified: Boolean!) {
    verifyUser(user_id: $user_id, verified: $verified)
  }
`;
export type VerifyUserMutationFn = Apollo.MutationFunction<VerifyUserMutation, VerifyUserMutationVariables>;

/**
 * __useVerifyUserMutation__
 *
 * To run a mutation, you first call `useVerifyUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyUserMutation, { data, loading, error }] = useVerifyUserMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      verified: // value for 'verified'
 *   },
 * });
 */
export function useVerifyUserMutation(
  baseOptions?: Apollo.MutationHookOptions<VerifyUserMutation, VerifyUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VerifyUserMutation, VerifyUserMutationVariables>(VerifyUserDocument, options);
}
export type VerifyUserMutationHookResult = ReturnType<typeof useVerifyUserMutation>;
export type VerifyUserMutationResult = Apollo.MutationResult<VerifyUserMutation>;
export type VerifyUserMutationOptions = Apollo.BaseMutationOptions<VerifyUserMutation, VerifyUserMutationVariables>;
export const GetAllBatchCoordinatorsDocument = gql`
  query getAllBatchCoordinators {
    getAllBatchCoordinators {
      assignedAt
      batch
      id
      user {
        aboutMe
        batch
        createdAt
        disabled
        displayName
        dob
        email
        emergency_mobile
        firstName
        gender
        google_auth_id
        id
        isVerified
        lastName
        membershipYear
        mobile
        nickName
        profileImage
        role {
          id
          name
        }
        updatedAt
      }
      userId
    }
  }
`;

/**
 * __useGetAllBatchCoordinatorsQuery__
 *
 * To run a query within a React component, call `useGetAllBatchCoordinatorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBatchCoordinatorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBatchCoordinatorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllBatchCoordinatorsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAllBatchCoordinatorsQuery, GetAllBatchCoordinatorsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllBatchCoordinatorsQuery, GetAllBatchCoordinatorsQueryVariables>(
    GetAllBatchCoordinatorsDocument,
    options
  );
}
export function useGetAllBatchCoordinatorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAllBatchCoordinatorsQuery, GetAllBatchCoordinatorsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllBatchCoordinatorsQuery, GetAllBatchCoordinatorsQueryVariables>(
    GetAllBatchCoordinatorsDocument,
    options
  );
}
export function useGetAllBatchCoordinatorsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetAllBatchCoordinatorsQuery, GetAllBatchCoordinatorsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAllBatchCoordinatorsQuery, GetAllBatchCoordinatorsQueryVariables>(
    GetAllBatchCoordinatorsDocument,
    options
  );
}
export type GetAllBatchCoordinatorsQueryHookResult = ReturnType<typeof useGetAllBatchCoordinatorsQuery>;
export type GetAllBatchCoordinatorsLazyQueryHookResult = ReturnType<typeof useGetAllBatchCoordinatorsLazyQuery>;
export type GetAllBatchCoordinatorsSuspenseQueryHookResult = ReturnType<typeof useGetAllBatchCoordinatorsSuspenseQuery>;
export type GetAllBatchCoordinatorsQueryResult = Apollo.QueryResult<
  GetAllBatchCoordinatorsQuery,
  GetAllBatchCoordinatorsQueryVariables
>;
export const GetBatchCoordinatorByUserIdDocument = gql`
  query getBatchCoordinatorByUserId($userId: String!) {
    getBatchCoordinatorByUserId(userId: $userId) {
      assignedAt
      batch
      id
      user {
        aboutMe
        batch
        createdAt
        disabled
        displayName
        dob
        email
        emergency_mobile
        firstName
        gender
        google_auth_id
        id
        isVerified
        lastName
        membershipYear
        mobile
        nickName
        profileImage
        role {
          id
          name
        }
        updatedAt
      }
      userId
    }
  }
`;

/**
 * __useGetBatchCoordinatorByUserIdQuery__
 *
 * To run a query within a React component, call `useGetBatchCoordinatorByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBatchCoordinatorByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBatchCoordinatorByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetBatchCoordinatorByUserIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetBatchCoordinatorByUserIdQuery, GetBatchCoordinatorByUserIdQueryVariables> &
    ({ variables: GetBatchCoordinatorByUserIdQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBatchCoordinatorByUserIdQuery, GetBatchCoordinatorByUserIdQueryVariables>(
    GetBatchCoordinatorByUserIdDocument,
    options
  );
}
export function useGetBatchCoordinatorByUserIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBatchCoordinatorByUserIdQuery, GetBatchCoordinatorByUserIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetBatchCoordinatorByUserIdQuery, GetBatchCoordinatorByUserIdQueryVariables>(
    GetBatchCoordinatorByUserIdDocument,
    options
  );
}
export function useGetBatchCoordinatorByUserIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetBatchCoordinatorByUserIdQuery, GetBatchCoordinatorByUserIdQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetBatchCoordinatorByUserIdQuery, GetBatchCoordinatorByUserIdQueryVariables>(
    GetBatchCoordinatorByUserIdDocument,
    options
  );
}
export type GetBatchCoordinatorByUserIdQueryHookResult = ReturnType<typeof useGetBatchCoordinatorByUserIdQuery>;
export type GetBatchCoordinatorByUserIdLazyQueryHookResult = ReturnType<typeof useGetBatchCoordinatorByUserIdLazyQuery>;
export type GetBatchCoordinatorByUserIdSuspenseQueryHookResult = ReturnType<
  typeof useGetBatchCoordinatorByUserIdSuspenseQuery
>;
export type GetBatchCoordinatorByUserIdQueryResult = Apollo.QueryResult<
  GetBatchCoordinatorByUserIdQuery,
  GetBatchCoordinatorByUserIdQueryVariables
>;
export const GetBatchCoordinatorsByBatchDocument = gql`
  query getBatchCoordinatorsByBatch($batch: Int!) {
    getBatchCoordinatorsByBatch(batch: $batch) {
      assignedAt
      batch
      id
      user {
        aboutMe
        batch
        createdAt
        disabled
        displayName
        dob
        email
        emergency_mobile
        firstName
        gender
        google_auth_id
        id
        isVerified
        lastName
        membershipYear
        mobile
        nickName
        profileImage
        role {
          id
          name
        }
        updatedAt
      }
      userId
    }
  }
`;

/**
 * __useGetBatchCoordinatorsByBatchQuery__
 *
 * To run a query within a React component, call `useGetBatchCoordinatorsByBatchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBatchCoordinatorsByBatchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBatchCoordinatorsByBatchQuery({
 *   variables: {
 *      batch: // value for 'batch'
 *   },
 * });
 */
export function useGetBatchCoordinatorsByBatchQuery(
  baseOptions: Apollo.QueryHookOptions<GetBatchCoordinatorsByBatchQuery, GetBatchCoordinatorsByBatchQueryVariables> &
    ({ variables: GetBatchCoordinatorsByBatchQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBatchCoordinatorsByBatchQuery, GetBatchCoordinatorsByBatchQueryVariables>(
    GetBatchCoordinatorsByBatchDocument,
    options
  );
}
export function useGetBatchCoordinatorsByBatchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBatchCoordinatorsByBatchQuery, GetBatchCoordinatorsByBatchQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetBatchCoordinatorsByBatchQuery, GetBatchCoordinatorsByBatchQueryVariables>(
    GetBatchCoordinatorsByBatchDocument,
    options
  );
}
export function useGetBatchCoordinatorsByBatchSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetBatchCoordinatorsByBatchQuery, GetBatchCoordinatorsByBatchQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetBatchCoordinatorsByBatchQuery, GetBatchCoordinatorsByBatchQueryVariables>(
    GetBatchCoordinatorsByBatchDocument,
    options
  );
}
export type GetBatchCoordinatorsByBatchQueryHookResult = ReturnType<typeof useGetBatchCoordinatorsByBatchQuery>;
export type GetBatchCoordinatorsByBatchLazyQueryHookResult = ReturnType<typeof useGetBatchCoordinatorsByBatchLazyQuery>;
export type GetBatchCoordinatorsByBatchSuspenseQueryHookResult = ReturnType<
  typeof useGetBatchCoordinatorsByBatchSuspenseQuery
>;
export type GetBatchCoordinatorsByBatchQueryResult = Apollo.QueryResult<
  GetBatchCoordinatorsByBatchQuery,
  GetBatchCoordinatorsByBatchQueryVariables
>;
export const GetEventDetailsDocument = gql`
  query getEventDetails($id: Int!) {
    getEventDetails(id: $id) {
      attendees {
        aboutMe
        batch
        createdAt
        disabled
        displayName
        dob
        email
        emergency_mobile
        firstName
        gender
        google_auth_id
        id
        isVerified
        lastName
        membershipYear
        mobile
        nickName
        profileImage
        role {
          id
          name
        }
        updatedAt
      }
      category
      createdAt
      createdBy
      description
      endDate
      id
      image
      location
      medium
      organizers {
        aboutMe
        batch
        createdAt
        disabled
        displayName
        dob
        email
        emergency_mobile
        firstName
        gender
        google_auth_id
        id
        isVerified
        lastName
        membershipYear
        mobile
        nickName
        profileImage
        role {
          id
          name
        }
        updatedAt
      }
      price
      startDate
      status
      summary
      tags
      ticketUrl
      title
      updatedAt
    }
  }
`;

/**
 * __useGetEventDetailsQuery__
 *
 * To run a query within a React component, call `useGetEventDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEventDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<GetEventDetailsQuery, GetEventDetailsQueryVariables> &
    ({ variables: GetEventDetailsQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetEventDetailsQuery, GetEventDetailsQueryVariables>(GetEventDetailsDocument, options);
}
export function useGetEventDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetEventDetailsQuery, GetEventDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetEventDetailsQuery, GetEventDetailsQueryVariables>(GetEventDetailsDocument, options);
}
export function useGetEventDetailsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventDetailsQuery, GetEventDetailsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetEventDetailsQuery, GetEventDetailsQueryVariables>(GetEventDetailsDocument, options);
}
export type GetEventDetailsQueryHookResult = ReturnType<typeof useGetEventDetailsQuery>;
export type GetEventDetailsLazyQueryHookResult = ReturnType<typeof useGetEventDetailsLazyQuery>;
export type GetEventDetailsSuspenseQueryHookResult = ReturnType<typeof useGetEventDetailsSuspenseQuery>;
export type GetEventDetailsQueryResult = Apollo.QueryResult<GetEventDetailsQuery, GetEventDetailsQueryVariables>;
export const GetEventListDocument = gql`
  query getEventList($options: ListInput) {
    getEventList(options: $options) {
      data {
        attendees {
          aboutMe
          batch
          createdAt
          disabled
          displayName
          dob
          email
          emergency_mobile
          firstName
          gender
          google_auth_id
          id
          isVerified
          lastName
          membershipYear
          mobile
          nickName
          profileImage
          role {
            id
            name
          }
          updatedAt
        }
        category
        createdAt
        createdBy
        description
        endDate
        id
        image
        location
        medium
        organizers {
          aboutMe
          batch
          createdAt
          disabled
          displayName
          dob
          email
          emergency_mobile
          firstName
          gender
          google_auth_id
          id
          isVerified
          lastName
          membershipYear
          mobile
          nickName
          profileImage
          role {
            id
            name
          }
          updatedAt
        }
        price
        startDate
        status
        summary
        tags
        ticketUrl
        title
        updatedAt
      }
      total
    }
  }
`;

/**
 * __useGetEventListQuery__
 *
 * To run a query within a React component, call `useGetEventListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventListQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetEventListQuery(
  baseOptions?: Apollo.QueryHookOptions<GetEventListQuery, GetEventListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetEventListQuery, GetEventListQueryVariables>(GetEventListDocument, options);
}
export function useGetEventListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetEventListQuery, GetEventListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetEventListQuery, GetEventListQueryVariables>(GetEventListDocument, options);
}
export function useGetEventListSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventListQuery, GetEventListQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetEventListQuery, GetEventListQueryVariables>(GetEventListDocument, options);
}
export type GetEventListQueryHookResult = ReturnType<typeof useGetEventListQuery>;
export type GetEventListLazyQueryHookResult = ReturnType<typeof useGetEventListLazyQuery>;
export type GetEventListSuspenseQueryHookResult = ReturnType<typeof useGetEventListSuspenseQuery>;
export type GetEventListQueryResult = Apollo.QueryResult<GetEventListQuery, GetEventListQueryVariables>;
export const GetUserDetailsDocument = gql`
  query getUserDetails($id: String) {
    getUserDetails(id: $id) {
      aboutMe
      batch
      createdAt
      disabled
      displayName
      dob
      email
      emergency_mobile
      firstName
      gender
      google_auth_id
      id
      isVerified
      lastName
      membershipYear
      mobile
      nickName
      profileImage
      role {
        id
        name
      }
      updatedAt
    }
  }
`;

/**
 * __useGetUserDetailsQuery__
 *
 * To run a query within a React component, call `useGetUserDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserDetailsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUserDetailsQuery, GetUserDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>(GetUserDetailsDocument, options);
}
export function useGetUserDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserDetailsQuery, GetUserDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>(GetUserDetailsDocument, options);
}
export function useGetUserDetailsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserDetailsQuery, GetUserDetailsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>(GetUserDetailsDocument, options);
}
export type GetUserDetailsQueryHookResult = ReturnType<typeof useGetUserDetailsQuery>;
export type GetUserDetailsLazyQueryHookResult = ReturnType<typeof useGetUserDetailsLazyQuery>;
export type GetUserDetailsSuspenseQueryHookResult = ReturnType<typeof useGetUserDetailsSuspenseQuery>;
export type GetUserDetailsQueryResult = Apollo.QueryResult<GetUserDetailsQuery, GetUserDetailsQueryVariables>;
export const GetUserListDocument = gql`
  query getUserList($options: ListInput) {
    getUserList(options: $options) {
      data {
        aboutMe
        batch
        createdAt
        disabled
        displayName
        dob
        email
        emergency_mobile
        firstName
        gender
        google_auth_id
        id
        isVerified
        lastName
        membershipYear
        mobile
        nickName
        profileImage
        role {
          id
          name
        }
        updatedAt
      }
      total
    }
  }
`;

/**
 * __useGetUserListQuery__
 *
 * To run a query within a React component, call `useGetUserListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserListQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetUserListQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUserListQuery, GetUserListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserListQuery, GetUserListQueryVariables>(GetUserListDocument, options);
}
export function useGetUserListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserListQuery, GetUserListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserListQuery, GetUserListQueryVariables>(GetUserListDocument, options);
}
export function useGetUserListSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserListQuery, GetUserListQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUserListQuery, GetUserListQueryVariables>(GetUserListDocument, options);
}
export type GetUserListQueryHookResult = ReturnType<typeof useGetUserListQuery>;
export type GetUserListLazyQueryHookResult = ReturnType<typeof useGetUserListLazyQuery>;
export type GetUserListSuspenseQueryHookResult = ReturnType<typeof useGetUserListSuspenseQuery>;
export type GetUserListQueryResult = Apollo.QueryResult<GetUserListQuery, GetUserListQueryVariables>;
