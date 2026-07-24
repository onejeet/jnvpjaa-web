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
  /** A custom scalar to handle decimal values */
  Decimal: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export type AccessAuditLog = {
  __typename?: 'AccessAuditLog';
  action?: Maybe<Scalars['String']['output']>;
  actorUserId?: Maybe<Scalars['String']['output']>;
  after?: Maybe<Scalars['JSON']['output']>;
  before?: Maybe<Scalars['JSON']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  entityId?: Maybe<Scalars['String']['output']>;
  entityType?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  ipAddress?: Maybe<Scalars['String']['output']>;
  isHighRisk?: Maybe<Scalars['Boolean']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  requestId?: Maybe<Scalars['String']['output']>;
  targetUserId?: Maybe<Scalars['String']['output']>;
  userAgent?: Maybe<Scalars['String']['output']>;
};

export type AccessRole = {
  __typename?: 'AccessRole';
  code?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isSystem?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export enum AccessScopeType {
  Batch = 'BATCH',
  Global = 'GLOBAL',
}

export type Address = {
  __typename?: 'Address';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type AddressInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type AddressListResponse = {
  __typename?: 'AddressListResponse';
  data?: Maybe<Array<Maybe<Address>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Album = {
  __typename?: 'Album';
  contributors?: Maybe<Array<Maybe<UserBasic>>>;
  coverImage?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<UserBasic>;
  description?: Maybe<Scalars['String']['output']>;
  event?: Maybe<EventBasic>;
  id?: Maybe<Scalars['String']['output']>;
  photos?: Maybe<Array<Maybe<Photo>>>;
  title?: Maybe<Scalars['String']['output']>;
  total_photos?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AlbumBasic = {
  __typename?: 'AlbumBasic';
  contributors?: Maybe<Array<Maybe<UserBasic>>>;
  coverImage?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<UserBasic>;
  description?: Maybe<Scalars['String']['output']>;
  event?: Maybe<EventBasic>;
  id?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  total_photos?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AssignExecutivePositionInput = {
  executiveTermId: Scalars['String']['input'];
  positionCode: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
  validFrom: Scalars['String']['input'];
  validUntil?: InputMaybe<Scalars['String']['input']>;
};

export type AssignUserRoleInput = {
  reason?: InputMaybe<Scalars['String']['input']>;
  roleCode: Scalars['String']['input'];
  scopeBatch?: InputMaybe<Scalars['Int']['input']>;
  scopeType: AccessScopeType;
  userId: Scalars['String']['input'];
  validFrom?: InputMaybe<Scalars['String']['input']>;
  validUntil?: InputMaybe<Scalars['String']['input']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  user?: Maybe<User>;
};

export type BatchCoordinator = {
  __typename?: 'BatchCoordinator';
  /** Timestamp when the record was created */
  assignedAt?: Maybe<Scalars['DateTime']['output']>;
  batch?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type Blog = {
  __typename?: 'Blog';
  adminRemark?: Maybe<Scalars['String']['output']>;
  author?: Maybe<UserBasic>;
  authorId?: Maybe<Scalars['String']['output']>;
  categoryId?: Maybe<Scalars['String']['output']>;
  claps?: Maybe<Scalars['Int']['output']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  content?: Maybe<Scalars['String']['output']>;
  cover?: Maybe<Scalars['JSON']['output']>;
  /** Timestamp when the record was created */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  shortUrl?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status: BlogStatus;
  summary?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  /** Timestamp when the record was last updated */
  updatedAt: Scalars['DateTime']['output'];
};

export type BlogBasic = {
  __typename?: 'BlogBasic';
  author?: Maybe<UserBasic>;
  authorId: Scalars['String']['output'];
  categoryId?: Maybe<Scalars['String']['output']>;
  claps?: Maybe<Scalars['Int']['output']>;
  cover?: Maybe<Scalars['JSON']['output']>;
  /** Timestamp when the record was created */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  shortUrl?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  status: BlogStatus;
  summary?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  /** Timestamp when the record was last updated */
  updatedAt: Scalars['DateTime']['output'];
};

export type BlogListResponse = {
  __typename?: 'BlogListResponse';
  data?: Maybe<Array<Maybe<BlogBasic>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export enum BlogStatus {
  Approved = 'APPROVED',
  Draft = 'DRAFT',
  PendingApproval = 'PENDING_APPROVAL',
  Published = 'PUBLISHED',
  RequestChanges = 'REQUEST_CHANGES',
}

export type Business = {
  __typename?: 'Business';
  address?: Maybe<Scalars['String']['output']>;
  category: Scalars['String']['output'];
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  googleReviews?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  isVerified: Scalars['Boolean']['output'];
  logoUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  socialMedia?: Maybe<Scalars['JSON']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<UserBasic>;
  userId: Scalars['String']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type BusinessListResponse = {
  __typename?: 'BusinessListResponse';
  data?: Maybe<Array<Maybe<Business>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<UserBasic>;
  authorId?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  targetId?: Maybe<Scalars['String']['output']>;
  targetType?: Maybe<CommentTargetType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CommentListResponse = {
  __typename?: 'CommentListResponse';
  data?: Maybe<Array<Maybe<Comment>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export enum CommentTargetType {
  Album = 'ALBUM',
  Blog = 'BLOG',
  Photo = 'PHOTO',
}

export type CompanyInfo = {
  __typename?: 'CompanyInfo';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  companyName: Scalars['String']['output'];
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  endedWorking?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  isCurrent: Scalars['Boolean']['output'];
  position?: Maybe<Scalars['String']['output']>;
  startedWorking?: Maybe<Scalars['DateTime']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<UserBasic>;
  userId: Scalars['String']['output'];
};

export type CompanyInfoBasic = {
  __typename?: 'CompanyInfoBasic';
  companyName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  position?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type CompanyInfoInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  endedWorking?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  isCurrent?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  startedWorking?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyInfoListResponse = {
  __typename?: 'CompanyInfoListResponse';
  data?: Maybe<Array<Maybe<CompanyInfo>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type CreateBusinessInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  category: Scalars['String']['input'];
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  socialMedia?: InputMaybe<Scalars['JSON']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export enum Currency {
  Eur = 'EUR',
  Inr = 'INR',
  Usd = 'USD',
}

export type EffectivePosition = {
  __typename?: 'EffectivePosition';
  assignmentId?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  termId?: Maybe<Scalars['String']['output']>;
  termName?: Maybe<Scalars['String']['output']>;
  validFrom?: Maybe<Scalars['DateTime']['output']>;
  validUntil?: Maybe<Scalars['DateTime']['output']>;
};

export type EffectiveRole = {
  __typename?: 'EffectiveRole';
  assignmentId?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  scopeBatch?: Maybe<Scalars['Int']['output']>;
  scopeType?: Maybe<Scalars['String']['output']>;
  validFrom?: Maybe<Scalars['DateTime']['output']>;
  validUntil?: Maybe<Scalars['DateTime']['output']>;
};

export type Event = {
  __typename?: 'Event';
  adminRemark?: Maybe<Scalars['String']['output']>;
  attendees?: Maybe<Array<Maybe<UserBasic>>>;
  category?: Maybe<Scalars['String']['output']>;
  cover?: Maybe<Scalars['JSON']['output']>;
  /** Timestamp when the record was created */
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  medium: Scalars['String']['output'];
  organizers?: Maybe<Array<Maybe<UserBasic>>>;
  price?: Maybe<Scalars['Float']['output']>;
  shortUrl?: Maybe<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
  status?: Maybe<EventStatus>;
  summary: Scalars['String']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  ticketUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  total_attendies?: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the record was last updated */
  updatedAt: Scalars['DateTime']['output'];
};

export type EventBasic = {
  __typename?: 'EventBasic';
  adminRemark?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  cover?: Maybe<Scalars['JSON']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isGoing?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  medium: Scalars['String']['output'];
  shortUrl?: Maybe<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
  status?: Maybe<EventStatus>;
  summary: Scalars['String']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title: Scalars['String']['output'];
  total_attendies?: Maybe<Scalars['Int']['output']>;
};

export enum EventStatus {
  Closed = 'CLOSED',
  Draft = 'DRAFT',
  PendingApproval = 'PENDING_APPROVAL',
  Published = 'PUBLISHED',
  RequestChanges = 'REQUEST_CHANGES',
}

export type ExecutiveCommitteeMember = {
  __typename?: 'ExecutiveCommitteeMember';
  assignmentId?: Maybe<Scalars['ID']['output']>;
  batch?: Maybe<Scalars['String']['output']>;
  designation?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  positionCode?: Maybe<Scalars['String']['output']>;
  positionName?: Maybe<Scalars['String']['output']>;
  profilePicture?: Maybe<Scalars['String']['output']>;
  termId?: Maybe<Scalars['String']['output']>;
  termName?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  validFrom?: Maybe<Scalars['DateTime']['output']>;
  validUntil?: Maybe<Scalars['DateTime']['output']>;
};

export type ExecutivePosition = {
  __typename?: 'ExecutivePosition';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isSingleSeat?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ExecutivePositionAssignment = {
  __typename?: 'ExecutivePositionAssignment';
  assignedByUserId?: Maybe<Scalars['String']['output']>;
  assignmentReason?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  executiveTerm?: Maybe<ExecutiveTerm>;
  executiveTermId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  position?: Maybe<ExecutivePosition>;
  positionId?: Maybe<Scalars['String']['output']>;
  revocationReason?: Maybe<Scalars['String']['output']>;
  revokedAt?: Maybe<Scalars['DateTime']['output']>;
  revokedByUserId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
  validFrom?: Maybe<Scalars['DateTime']['output']>;
  validUntil?: Maybe<Scalars['DateTime']['output']>;
};

export type ExecutiveTerm = {
  __typename?: 'ExecutiveTerm';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdByUserId?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<ExecutiveTermStatus>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum ExecutiveTermStatus {
  Active = 'ACTIVE',
  Closed = 'CLOSED',
  Draft = 'DRAFT',
}

export type FilterInput = {
  batch?: InputMaybe<Scalars['Int']['input']>;
  blogId?: InputMaybe<Scalars['String']['input']>;
  excludeBatch?: InputMaybe<Scalars['Int']['input']>;
  excludeBatches?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  query?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ListAlbumResponse = {
  __typename?: 'ListAlbumResponse';
  data?: Maybe<Array<Maybe<AlbumBasic>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type ListEventResponse = {
  __typename?: 'ListEventResponse';
  data?: Maybe<Array<Maybe<EventBasic>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type ListInput = {
  filter?: InputMaybe<FilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type MentorFundAllocation = {
  __typename?: 'MentorFundAllocation';
  amount?: Maybe<Scalars['Decimal']['output']>;
  batch?: Maybe<Scalars['Int']['output']>;
  confirmedAmount?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  disputedAmount?: Maybe<Scalars['Decimal']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  mentorUserId?: Maybe<Scalars['String']['output']>;
  method?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  recordedByUserId?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  transferDate?: Maybe<Scalars['DateTime']['output']>;
};

export type MentorFundAllocationDispute = {
  __typename?: 'MentorFundAllocationDispute';
  allocationId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  disputedAmount?: Maybe<Scalars['Decimal']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  raisedByUserId?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  resolutionNote?: Maybe<Scalars['String']['output']>;
  resolutionType?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activateExecutiveTerm?: Maybe<ExecutiveTerm>;
  addAlbumContributor?: Maybe<Album>;
  addComment?: Maybe<Comment>;
  addPhoto?: Maybe<Photo>;
  approveBlog?: Maybe<Blog>;
  approveMemberRegistration?: Maybe<Scalars['Boolean']['output']>;
  approveScholarshipApplication?: Maybe<ScholarshipApplication>;
  assignBatchCoordinator?: Maybe<BatchCoordinator>;
  assignExecutivePosition?: Maybe<ExecutivePositionAssignment>;
  assignUserRole?: Maybe<RoleAssignment>;
  attendEvent?: Maybe<Scalars['Boolean']['output']>;
  closeExecutiveTerm?: Maybe<ExecutiveTerm>;
  closeScholarshipRemainder?: Maybe<ScholarshipApplication>;
  confirmMentorFundAllocation?: Maybe<MentorFundAllocation>;
  confirmScholarshipRefundReceived?: Maybe<ScholarshipRefund>;
  confirmScholarshipTransactionReceipt?: Maybe<Transaction>;
  createAddress?: Maybe<Address>;
  createAlbum?: Maybe<Album>;
  createBlog?: Maybe<Blog>;
  createBusiness: Business;
  createCompanyInfo?: Maybe<CompanyInfo>;
  createEvent?: Maybe<EventBasic>;
  createExecutiveTerm?: Maybe<ExecutiveTerm>;
  createNextScholarshipInstallment?: Maybe<ScholarshipApplication>;
  createScholarshipApplicationDraft?: Maybe<ScholarshipApplication>;
  createScholarshipDocumentUpload?: Maybe<ScholarshipDocumentUploadResponse>;
  createTransaction?: Maybe<Transaction>;
  deleteAddress?: Maybe<Address>;
  deleteBlog?: Maybe<Blog>;
  deleteCompanyInfo?: Maybe<CompanyInfo>;
  deleteEvent?: Maybe<Scalars['Boolean']['output']>;
  deleteTransaction?: Maybe<Transaction>;
  deleteUser?: Maybe<User>;
  disputeMentorFundAllocation?: Maybe<MentorFundAllocationDispute>;
  finalizeScholarshipDocumentUpload?: Maybe<ScholarshipDocument>;
  forgotPassword?: Maybe<Scalars['Boolean']['output']>;
  getPresignedUrl: Scalars['String']['output'];
  logout?: Maybe<Scalars['String']['output']>;
  manageScholarshipRefundCase?: Maybe<ScholarshipRefund>;
  markScholarshipWrongDisbursement?: Maybe<ScholarshipWrongDisbursementCase>;
  publishEvent?: Maybe<Scalars['Boolean']['output']>;
  reassignScholarshipApplication?: Maybe<ScholarshipApplication>;
  recordMentorFundAllocation?: Maybe<MentorFundAllocation>;
  refreshToken?: Maybe<AuthPayload>;
  rejectMemberRegistration?: Maybe<Scalars['Boolean']['output']>;
  rejectScholarshipApplication?: Maybe<ScholarshipApplication>;
  removeBatchCoordinator?: Maybe<Scalars['Boolean']['output']>;
  requestChangesBlog?: Maybe<Blog>;
  requestScholarshipApplicationInfo?: Maybe<ScholarshipApplication>;
  requestScholarshipDisbursalFollowup?: Maybe<Scalars['Boolean']['output']>;
  resetPassword?: Maybe<Scalars['Boolean']['output']>;
  resolveMentorAllocationDispute?: Maybe<MentorFundAllocationDispute>;
  respondToScholarshipRefund?: Maybe<ScholarshipRefund>;
  resubmitScholarshipApplication?: Maybe<ScholarshipApplication>;
  reviewScholarshipUsageProof?: Maybe<ScholarshipReceiptSubmission>;
  revokeExecutivePosition?: Maybe<ExecutivePositionAssignment>;
  revokeUserRole?: Maybe<RoleAssignment>;
  sendMassEmail?: Maybe<Scalars['Boolean']['output']>;
  setScholarshipPrimaryMentor?: Maybe<ScholarshipApplication>;
  signin?: Maybe<AuthPayload>;
  signup?: Maybe<User>;
  startScholarshipApplicationReview?: Maybe<ScholarshipApplication>;
  submitScholarshipApplication?: Maybe<ScholarshipApplication>;
  submitScholarshipUsageProof?: Maybe<ScholarshipReceiptSubmission>;
  updateAddress?: Maybe<Address>;
  updateAlbum?: Maybe<Album>;
  updateBatchCoordinator?: Maybe<BatchCoordinator>;
  updateBlog?: Maybe<Blog>;
  updateBusiness: Business;
  updateClaps?: Maybe<Scalars['Boolean']['output']>;
  updateCompanyInfo?: Maybe<CompanyInfo>;
  updateEvent?: Maybe<EventBasic>;
  updateScholarshipApplicationDraft?: Maybe<ScholarshipApplication>;
  updateTransaction?: Maybe<Transaction>;
  updateUser?: Maybe<User>;
  upsertMultipleAddresses?: Maybe<Array<Maybe<Address>>>;
  verifyBusiness: Business;
  verifyEvent?: Maybe<Scalars['Boolean']['output']>;
  verifyUser?: Maybe<Scalars['Boolean']['output']>;
};

export type MutationActivateExecutiveTermArgs = {
  reason: Scalars['String']['input'];
  termId: Scalars['String']['input'];
};

export type MutationAddAlbumContributorArgs = {
  albumId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type MutationAddCommentArgs = {
  content: Scalars['String']['input'];
  targetId: Scalars['String']['input'];
  targetType: CommentTargetType;
};

export type MutationAddPhotoArgs = {
  albumId: Scalars['String']['input'];
  caption?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type MutationApproveBlogArgs = {
  id: Scalars['String']['input'];
};

export type MutationApproveMemberRegistrationArgs = {
  reason: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type MutationApproveScholarshipApplicationArgs = {
  applicationId: Scalars['String']['input'];
  approvedTotalAmount: Scalars['Float']['input'];
  installmentAmount: Scalars['Float']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  proofDueDays?: InputMaybe<Scalars['Int']['input']>;
};

export type MutationAssignBatchCoordinatorArgs = {
  batch: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};

export type MutationAssignExecutivePositionArgs = {
  input: AssignExecutivePositionInput;
};

export type MutationAssignUserRoleArgs = {
  input: AssignUserRoleInput;
};

export type MutationAttendEventArgs = {
  eventId: Scalars['Int']['input'];
};

export type MutationCloseExecutiveTermArgs = {
  reason: Scalars['String']['input'];
  termId: Scalars['String']['input'];
};

export type MutationCloseScholarshipRemainderArgs = {
  applicationId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};

export type MutationConfirmMentorFundAllocationArgs = {
  allocationId: Scalars['String']['input'];
  confirmedAmount?: InputMaybe<Scalars['Float']['input']>;
};

export type MutationConfirmScholarshipRefundReceivedArgs = {
  confirmedAmount: Scalars['Float']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
  refundId: Scalars['String']['input'];
};

export type MutationConfirmScholarshipTransactionReceiptArgs = {
  confirmedAmount: Scalars['Float']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  transactionId: Scalars['String']['input'];
};

export type MutationCreateAddressArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type MutationCreateAlbumArgs = {
  coverImage?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type MutationCreateBlogArgs = {
  authorId: Scalars['String']['input'];
  categoryId: Scalars['String']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  cover?: InputMaybe<Scalars['JSON']['input']>;
  status?: InputMaybe<BlogStatus>;
  title: Scalars['String']['input'];
};

export type MutationCreateBusinessArgs = {
  body: CreateBusinessInput;
};

export type MutationCreateCompanyInfoArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  endedWorking?: InputMaybe<Scalars['DateTime']['input']>;
  isCurrent?: InputMaybe<Scalars['Boolean']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  startedWorking?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationCreateEventArgs = {
  category: Scalars['String']['input'];
  cover?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  medium: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  startDate: Scalars['String']['input'];
  status: EventStatus;
  summary: Scalars['String']['input'];
  tags?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type MutationCreateExecutiveTermArgs = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};

export type MutationCreateNextScholarshipInstallmentArgs = {
  applicationId: Scalars['String']['input'];
  approvedTotalAmount: Scalars['Float']['input'];
  installmentAmount: Scalars['Float']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  proofDueDays?: InputMaybe<Scalars['Int']['input']>;
};

export type MutationCreateScholarshipApplicationDraftArgs = {
  input: ScholarshipApplicationInput;
};

export type MutationCreateScholarshipDocumentUploadArgs = {
  input: ScholarshipDocumentUploadInput;
};

export type MutationCreateTransactionArgs = {
  amount: Scalars['Float']['input'];
  currency: Currency;
  description?: InputMaybe<Scalars['String']['input']>;
  isDonation?: InputMaybe<Scalars['Boolean']['input']>;
  method?: InputMaybe<Scalars['String']['input']>;
  referenceId?: InputMaybe<Scalars['String']['input']>;
  status: TransactionStatus;
  title: Scalars['String']['input'];
  transactionDate: Scalars['String']['input'];
  type: TransactionType;
  userId: Scalars['String']['input'];
};

export type MutationDeleteAddressArgs = {
  id: Scalars['String']['input'];
};

export type MutationDeleteBlogArgs = {
  id: Scalars['String']['input'];
};

export type MutationDeleteCompanyInfoArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type MutationDeleteEventArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteTransactionArgs = {
  id: Scalars['String']['input'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};

export type MutationDisputeMentorFundAllocationArgs = {
  allocationId: Scalars['String']['input'];
  disputedAmount: Scalars['Float']['input'];
  reason: Scalars['String']['input'];
};

export type MutationFinalizeScholarshipDocumentUploadArgs = {
  checksum?: InputMaybe<Scalars['String']['input']>;
  documentId: Scalars['String']['input'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};

export type MutationGetPresignedUrlArgs = {
  contentType: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
  imageCategory?: InputMaybe<Scalars['String']['input']>;
};

export type MutationManageScholarshipRefundCaseArgs = {
  note?: InputMaybe<Scalars['String']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
  refundId: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

export type MutationMarkScholarshipWrongDisbursementArgs = {
  affectedDocumentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  disputedAmount: Scalars['Float']['input'];
  reason: Scalars['String']['input'];
  refundRequested?: InputMaybe<Scalars['Boolean']['input']>;
  requestedRefundAmount?: InputMaybe<Scalars['Float']['input']>;
  transactionId: Scalars['String']['input'];
};

export type MutationPublishEventArgs = {
  eventId: Scalars['Int']['input'];
  status: EventStatus;
};

export type MutationReassignScholarshipApplicationArgs = {
  applicationId: Scalars['String']['input'];
  mentorUserId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};

export type MutationRecordMentorFundAllocationArgs = {
  input: RecordMentorFundAllocationInput;
};

export type MutationRejectMemberRegistrationArgs = {
  reason: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type MutationRejectScholarshipApplicationArgs = {
  applicationId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};

export type MutationRemoveBatchCoordinatorArgs = {
  batch: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};

export type MutationRequestChangesBlogArgs = {
  adminRemark?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

export type MutationRequestScholarshipApplicationInfoArgs = {
  applicationId: Scalars['String']['input'];
  message: Scalars['String']['input'];
};

export type MutationRequestScholarshipDisbursalFollowupArgs = {
  transactionId: Scalars['String']['input'];
};

export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token?: InputMaybe<Scalars['String']['input']>;
};

export type MutationResolveMentorAllocationDisputeArgs = {
  disputeId: Scalars['String']['input'];
  resolutionNote?: InputMaybe<Scalars['String']['input']>;
  resolutionType: Scalars['String']['input'];
};

export type MutationRespondToScholarshipRefundArgs = {
  proofDocumentId?: InputMaybe<Scalars['String']['input']>;
  refundId: Scalars['String']['input'];
  response: Scalars['String']['input'];
};

export type MutationResubmitScholarshipApplicationArgs = {
  applicationId: Scalars['String']['input'];
};

export type MutationReviewScholarshipUsageProofArgs = {
  action: ScholarshipProofReviewAction;
  note?: InputMaybe<Scalars['String']['input']>;
  submissionId: Scalars['String']['input'];
};

export type MutationRevokeExecutivePositionArgs = {
  input: RevokeExecutivePositionInput;
};

export type MutationRevokeUserRoleArgs = {
  input: RevokeUserRoleInput;
};

export type MutationSendMassEmailArgs = {
  context?: InputMaybe<Scalars['JSON']['input']>;
  subject: Scalars['String']['input'];
  template: Scalars['String']['input'];
};

export type MutationSetScholarshipPrimaryMentorArgs = {
  batch: Scalars['Int']['input'];
  mentorUserId: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  validFrom?: InputMaybe<Scalars['String']['input']>;
  validUntil?: InputMaybe<Scalars['String']['input']>;
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
  isFaculty?: InputMaybe<Scalars['Boolean']['input']>;
  lastName: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationStartScholarshipApplicationReviewArgs = {
  applicationId: Scalars['String']['input'];
};

export type MutationSubmitScholarshipApplicationArgs = {
  applicationId: Scalars['String']['input'];
};

export type MutationSubmitScholarshipUsageProofArgs = {
  documentIds: Array<Scalars['String']['input']>;
  transactionId: Scalars['String']['input'];
};

export type MutationUpdateAddressArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type MutationUpdateAlbumArgs = {
  albumId: Scalars['String']['input'];
  coverImage?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUpdateBatchCoordinatorArgs = {
  newBatch: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};

export type MutationUpdateBlogArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  cover?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['String']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<BlogStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUpdateBusinessArgs = {
  body: UpdateBusinessInput;
  id: Scalars['String']['input'];
};

export type MutationUpdateClapsArgs = {
  claps: Scalars['Int']['input'];
  slug: Scalars['String']['input'];
};

export type MutationUpdateCompanyInfoArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  endedWorking?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isCurrent?: InputMaybe<Scalars['Boolean']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  startedWorking?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUpdateEventArgs = {
  category: Scalars['String']['input'];
  cover?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['Int']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  medium: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  startDate: Scalars['String']['input'];
  status?: InputMaybe<EventStatus>;
  summary: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type MutationUpdateScholarshipApplicationDraftArgs = {
  applicationId: Scalars['String']['input'];
  input: ScholarshipApplicationInput;
};

export type MutationUpdateTransactionArgs = {
  id: Scalars['String']['input'];
  status: TransactionStatus;
};

export type MutationUpdateUserArgs = {
  aboutMe?: InputMaybe<Scalars['String']['input']>;
  batch?: InputMaybe<Scalars['Int']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  emergencyMobile?: InputMaybe<Scalars['String']['input']>;
  extraMobile?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isConfidential?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  nickName?: InputMaybe<Scalars['String']['input']>;
  profileImage?: InputMaybe<Scalars['String']['input']>;
  sociaMedia?: InputMaybe<Scalars['JSON']['input']>;
  whatsAppMobile?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUpsertMultipleAddressesArgs = {
  updates: Array<AddressInput>;
};

export type MutationVerifyBusinessArgs = {
  id: Scalars['String']['input'];
  isVerified: Scalars['Boolean']['input'];
};

export type MutationVerifyEventArgs = {
  adminRemark?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['Int']['input'];
  status: EventStatus;
};

export type MutationVerifyUserArgs = {
  user_id: Scalars['String']['input'];
  verified: Scalars['Boolean']['input'];
};

export type Permission = {
  __typename?: 'Permission';
  category?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Photo = {
  __typename?: 'Photo';
  album?: Maybe<AlbumBasic>;
  altDescription?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  crdits?: Maybe<PhotoCredit>;
  id?: Maybe<Scalars['String']['output']>;
  thumbUrl?: Maybe<Scalars['String']['output']>;
  uploadedAt?: Maybe<Scalars['DateTime']['output']>;
  uploader?: Maybe<User>;
  url?: Maybe<Scalars['String']['output']>;
};

export type PhotoCredit = {
  __typename?: 'PhotoCredit';
  license_type?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  source_url?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  GetCompanyInfoListByUser: Array<CompanyInfo>;
  accessAuditEvents?: Maybe<Array<Maybe<AccessAuditLog>>>;
  executivePositionAssignments?: Maybe<Array<Maybe<ExecutivePositionAssignment>>>;
  executivePositions?: Maybe<Array<Maybe<ExecutivePosition>>>;
  executiveTerms?: Maybe<Array<Maybe<ExecutiveTerm>>>;
  getAlbum?: Maybe<Album>;
  getAlbums?: Maybe<ListAlbumResponse>;
  getAllBatchCoordinators?: Maybe<Array<Maybe<BatchCoordinator>>>;
  getBatchCoordinatorByUserId?: Maybe<BatchCoordinator>;
  getBatchCoordinatorScholarshipDashboard?: Maybe<ScholarshipDashboard>;
  getBatchCoordinatorsByBatch?: Maybe<Array<Maybe<BatchCoordinator>>>;
  getBlog?: Maybe<Blog>;
  getBlogList?: Maybe<BlogListResponse>;
  getBusiness?: Maybe<Business>;
  getBusinesses?: Maybe<BusinessListResponse>;
  getClapsCount?: Maybe<Scalars['Int']['output']>;
  getComments?: Maybe<Array<Maybe<Comment>>>;
  getCompanyInfo?: Maybe<CompanyInfo>;
  getCompanyInfoList: Array<CompanyInfo>;
  getCompletedScholarshipTransactions?: Maybe<Array<Maybe<Transaction>>>;
  getEventDetails?: Maybe<Event>;
  getEventList?: Maybe<ListEventResponse>;
  getMentorFundAllocations?: Maybe<Array<Maybe<MentorFundAllocation>>>;
  getMentorScholarshipApplications?: Maybe<Array<Maybe<ScholarshipApplication>>>;
  getMentorScholarshipDashboard?: Maybe<ScholarshipDashboard>;
  getMyPhotos?: Maybe<Array<Maybe<Photo>>>;
  getMyScholarshipApplications?: Maybe<Array<Maybe<ScholarshipApplication>>>;
  getMyScholarshipDashboard?: Maybe<ScholarshipDashboard>;
  getScholarshipActivity?: Maybe<Array<Maybe<ScholarshipActivityLog>>>;
  getScholarshipApplication?: Maybe<ScholarshipApplication>;
  getScholarshipApplicationTransactions?: Maybe<Array<Maybe<Transaction>>>;
  getScholarshipApplications?: Maybe<Array<Maybe<ScholarshipApplication>>>;
  getScholarshipBeneficiaryList?: Maybe<Array<Maybe<ScholarshipApplication>>>;
  getScholarshipDocumentReadUrl?: Maybe<Scalars['String']['output']>;
  getScholarshipExceptionQueue?: Maybe<Array<Maybe<ScholarshipApplication>>>;
  getScholarshipMentorSummary?: Maybe<ScholarshipDashboard>;
  getScholarshipOrganizationDashboard?: Maybe<ScholarshipDashboard>;
  getScholarshipRefundCases?: Maybe<Array<Maybe<ScholarshipRefund>>>;
  getScholarshipWrongDisbursementCases?: Maybe<Array<Maybe<ScholarshipWrongDisbursementCase>>>;
  getTransaction?: Maybe<Transaction>;
  getTransactions?: Maybe<TransactionListResponse>;
  getUserAddresses?: Maybe<AddressListResponse>;
  getUserDetails?: Maybe<User>;
  getUserList?: Maybe<UserListResponse>;
  publicExecutiveCommittee?: Maybe<Array<Maybe<ExecutiveCommitteeMember>>>;
  roleAssignments?: Maybe<Array<Maybe<RoleAssignment>>>;
  systemPermissions?: Maybe<Array<Maybe<Permission>>>;
  systemRoles?: Maybe<Array<Maybe<AccessRole>>>;
  upcomingBirthdays: Array<Maybe<UserBirthday>>;
  userExecutivePositionAssignments?: Maybe<Array<Maybe<ExecutivePositionAssignment>>>;
  userRoleAssignments?: Maybe<Array<Maybe<RoleAssignment>>>;
  viewerAccessContext?: Maybe<ViewerAccessContext>;
};

export type QueryGetCompanyInfoListByUserArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetAlbumArgs = {
  id: Scalars['String']['input'];
};

export type QueryGetAlbumsArgs = {
  options?: InputMaybe<ListInput>;
};

export type QueryGetAllBatchCoordinatorsArgs = {
  options?: InputMaybe<ListInput>;
};

export type QueryGetBatchCoordinatorByUserIdArgs = {
  userId: Scalars['String']['input'];
};

export type QueryGetBatchCoordinatorScholarshipDashboardArgs = {
  batch: Scalars['Int']['input'];
};

export type QueryGetBatchCoordinatorsByBatchArgs = {
  batch: Scalars['Int']['input'];
};

export type QueryGetBlogArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetBlogListArgs = {
  options?: InputMaybe<ListInput>;
};

export type QueryGetBusinessArgs = {
  id: Scalars['String']['input'];
};

export type QueryGetBusinessesArgs = {
  options?: InputMaybe<ListInput>;
};

export type QueryGetClapsCountArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetCommentsArgs = {
  targetId: Scalars['String']['input'];
  targetType: CommentTargetType;
};

export type QueryGetCompanyInfoArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetCompletedScholarshipTransactionsArgs = {
  options?: InputMaybe<ListInput>;
};

export type QueryGetEventDetailsArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetEventListArgs = {
  options?: InputMaybe<ListInput>;
};

export type QueryGetMentorFundAllocationsArgs = {
  batch?: InputMaybe<Scalars['Int']['input']>;
  mentorUserId?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<ListInput>;
};

export type QueryGetMentorScholarshipApplicationsArgs = {
  filter?: InputMaybe<ScholarshipApplicationFilterInput>;
  options?: InputMaybe<ListInput>;
};

export type QueryGetMyScholarshipApplicationsArgs = {
  options?: InputMaybe<ListInput>;
};

export type QueryGetScholarshipActivityArgs = {
  entityId?: InputMaybe<Scalars['String']['input']>;
  entityType?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetScholarshipApplicationArgs = {
  id: Scalars['String']['input'];
};

export type QueryGetScholarshipApplicationTransactionsArgs = {
  applicationId: Scalars['String']['input'];
};

export type QueryGetScholarshipApplicationsArgs = {
  filter?: InputMaybe<ScholarshipApplicationFilterInput>;
  options?: InputMaybe<ListInput>;
};

export type QueryGetScholarshipBeneficiaryListArgs = {
  filter?: InputMaybe<ScholarshipApplicationFilterInput>;
  options?: InputMaybe<ListInput>;
};

export type QueryGetScholarshipDocumentReadUrlArgs = {
  documentId: Scalars['String']['input'];
};

export type QueryGetScholarshipMentorSummaryArgs = {
  mentorUserId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetTransactionArgs = {
  id: Scalars['String']['input'];
};

export type QueryGetTransactionsArgs = {
  options?: InputMaybe<ListInput>;
};

export type QueryGetUserDetailsArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetUserListArgs = {
  options?: InputMaybe<ListInput>;
};

export type QueryRoleAssignmentsArgs = {
  filter?: InputMaybe<RoleAssignmentFilterInput>;
};

export type QueryUserExecutivePositionAssignmentsArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryUserRoleAssignmentsArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type RecordMentorFundAllocationInput = {
  amount: Scalars['Float']['input'];
  batch: Scalars['Int']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  mentorUserId: Scalars['String']['input'];
  method: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
  transferDate: Scalars['String']['input'];
};

export type RevokeExecutivePositionInput = {
  assignmentId: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type RevokeUserRoleInput = {
  assignmentId: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type Role = {
  __typename?: 'Role';
  code?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type RoleAssignment = {
  __typename?: 'RoleAssignment';
  assignedByUserId?: Maybe<Scalars['String']['output']>;
  assignmentReason?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  revocationReason?: Maybe<Scalars['String']['output']>;
  revokedAt?: Maybe<Scalars['DateTime']['output']>;
  revokedByUserId?: Maybe<Scalars['String']['output']>;
  role?: Maybe<AccessRole>;
  roleId?: Maybe<Scalars['String']['output']>;
  scopeBatch?: Maybe<Scalars['Int']['output']>;
  scopeType?: Maybe<AccessScopeType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
  validFrom?: Maybe<Scalars['DateTime']['output']>;
  validUntil?: Maybe<Scalars['DateTime']['output']>;
};

export type RoleAssignmentFilterInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  roleCode?: InputMaybe<Scalars['String']['input']>;
  scopeBatch?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type ScholarshipActivityLog = {
  __typename?: 'ScholarshipActivityLog';
  action?: Maybe<Scalars['String']['output']>;
  actorUserId?: Maybe<Scalars['String']['output']>;
  after?: Maybe<Scalars['JSON']['output']>;
  before?: Maybe<Scalars['JSON']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  entityId?: Maybe<Scalars['String']['output']>;
  entityType?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isHighRisk?: Maybe<Scalars['Boolean']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
};

export type ScholarshipApplication = {
  __typename?: 'ScholarshipApplication';
  applicantUserId?: Maybe<Scalars['String']['output']>;
  approvedAmountDisbursed?: Maybe<Scalars['Decimal']['output']>;
  approvedAt?: Maybe<Scalars['DateTime']['output']>;
  approvedByUserId?: Maybe<Scalars['String']['output']>;
  approvedProofDays?: Maybe<Scalars['Int']['output']>;
  approvedTotalAmount?: Maybe<Scalars['Decimal']['output']>;
  assignedMentor?: Maybe<User>;
  assignedMentorUserId?: Maybe<Scalars['String']['output']>;
  batchSnapshot?: Maybe<Scalars['Int']['output']>;
  beneficiary?: Maybe<User>;
  beneficiaryUserId?: Maybe<Scalars['String']['output']>;
  closedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastActivityAt?: Maybe<Scalars['DateTime']['output']>;
  paymentMode?: Maybe<ScholarshipPaymentMode>;
  payoutMaskedSnapshot?: Maybe<Scalars['String']['output']>;
  payoutMethod?: Maybe<ScholarshipPayoutMethod>;
  payoutSnapshot?: Maybe<Scalars['JSON']['output']>;
  proofStatus?: Maybe<Scalars['String']['output']>;
  proposedProofDays?: Maybe<Scalars['Int']['output']>;
  purpose?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  referenceNumber?: Maybe<Scalars['String']['output']>;
  refundStatus?: Maybe<Scalars['String']['output']>;
  rejectedAt?: Maybe<Scalars['DateTime']['output']>;
  rejectedByUserId?: Maybe<Scalars['String']['output']>;
  rejectionReason?: Maybe<Scalars['String']['output']>;
  requestedAmount?: Maybe<Scalars['Decimal']['output']>;
  requestedFirstInstallmentAmount?: Maybe<Scalars['Decimal']['output']>;
  reviewStartedAt?: Maybe<Scalars['DateTime']['output']>;
  reviewedByUserId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ScholarshipApplicationStatus>;
  submittedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ScholarshipApplicationFilterInput = {
  batch?: InputMaybe<Scalars['Int']['input']>;
  beneficiaryUserId?: InputMaybe<Scalars['String']['input']>;
  mentorUserId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ScholarshipApplicationStatus>;
};

export type ScholarshipApplicationInput = {
  paymentMode: ScholarshipPaymentMode;
  payoutMethod: ScholarshipPayoutMethod;
  payoutSnapshot: Scalars['JSON']['input'];
  proposedProofDays: Scalars['Int']['input'];
  purpose: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  requestedAmount: Scalars['Float']['input'];
  requestedFirstInstallmentAmount?: InputMaybe<Scalars['Float']['input']>;
};

export enum ScholarshipApplicationStatus {
  Approved = 'APPROVED',
  Cancelled = 'CANCELLED',
  Closed = 'CLOSED',
  Draft = 'DRAFT',
  MoreInfoRequired = 'MORE_INFO_REQUIRED',
  PaymentConfirmationPending = 'PAYMENT_CONFIRMATION_PENDING',
  PaymentConfirmedProofDue = 'PAYMENT_CONFIRMED_PROOF_DUE',
  ProofFullSubmitted = 'PROOF_FULL_SUBMITTED',
  ProofMoreInfoRequired = 'PROOF_MORE_INFO_REQUIRED',
  ProofPartial = 'PROOF_PARTIAL',
  ProofRejected = 'PROOF_REJECTED',
  ProofVerified = 'PROOF_VERIFIED',
  RefundInProgress = 'REFUND_IN_PROGRESS',
  Rejected = 'REJECTED',
  Resubmitted = 'RESUBMITTED',
  RoutingPending = 'ROUTING_PENDING',
  Submitted = 'SUBMITTED',
  UnderReview = 'UNDER_REVIEW',
  WrongDisbursement = 'WRONG_DISBURSEMENT',
}

export type ScholarshipDashboard = {
  __typename?: 'ScholarshipDashboard';
  byStatus?: Maybe<Array<Maybe<ScholarshipStatusCount>>>;
  capacity?: Maybe<ScholarshipMentorCapacity>;
  disbursedAmount?: Maybe<Scalars['Float']['output']>;
  exceptionCount?: Maybe<Scalars['Int']['output']>;
  requestedAmount?: Maybe<Scalars['Float']['output']>;
  totalApplications?: Maybe<Scalars['Int']['output']>;
};

export type ScholarshipDocument = {
  __typename?: 'ScholarshipDocument';
  applicationId?: Maybe<Scalars['String']['output']>;
  category?: Maybe<ScholarshipDocumentCategory>;
  checksum?: Maybe<Scalars['String']['output']>;
  claimedAmount?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  originalFilename?: Maybe<Scalars['String']['output']>;
  receiptDate?: Maybe<Scalars['DateTime']['output']>;
  sizeBytes?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  transactionId?: Maybe<Scalars['String']['output']>;
  uploadedAt?: Maybe<Scalars['DateTime']['output']>;
  uploadedByUserId?: Maybe<Scalars['String']['output']>;
  vendorName?: Maybe<Scalars['String']['output']>;
};

export enum ScholarshipDocumentCategory {
  AdditionalInformation = 'ADDITIONAL_INFORMATION',
  ApplicationSupport = 'APPLICATION_SUPPORT',
  BeneficiaryCreditProof = 'BENEFICIARY_CREDIT_PROOF',
  RefundProof = 'REFUND_PROOF',
  UsageReceipt = 'USAGE_RECEIPT',
}

export type ScholarshipDocumentUploadInput = {
  applicationId: Scalars['String']['input'];
  category: ScholarshipDocumentCategory;
  claimedAmount?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  filename: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
  receiptDate?: InputMaybe<Scalars['String']['input']>;
  sizeBytes: Scalars['Int']['input'];
  transactionId?: InputMaybe<Scalars['String']['input']>;
  vendorName?: InputMaybe<Scalars['String']['input']>;
};

export type ScholarshipDocumentUploadResponse = {
  __typename?: 'ScholarshipDocumentUploadResponse';
  document?: Maybe<ScholarshipDocument>;
  uploadUrl?: Maybe<Scalars['String']['output']>;
};

export type ScholarshipMentorCapacity = {
  __typename?: 'ScholarshipMentorCapacity';
  allocated?: Maybe<Scalars['Float']['output']>;
  available?: Maybe<Scalars['Float']['output']>;
  committed?: Maybe<Scalars['Float']['output']>;
  returned?: Maybe<Scalars['Float']['output']>;
};

export enum ScholarshipPaymentMode {
  Full = 'FULL',
  Installment = 'INSTALLMENT',
}

export enum ScholarshipPayoutMethod {
  BankTransfer = 'BANK_TRANSFER',
  Upi = 'UPI',
}

export enum ScholarshipProofReviewAction {
  Reject = 'REJECT',
  RequestInfo = 'REQUEST_INFO',
  Verify = 'VERIFY',
}

export type ScholarshipReceiptSubmission = {
  __typename?: 'ScholarshipReceiptSubmission';
  applicationId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  reviewNote?: Maybe<Scalars['String']['output']>;
  reviewedAt?: Maybe<Scalars['DateTime']['output']>;
  reviewedByUserId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  submissionSequence?: Maybe<Scalars['Int']['output']>;
  submittedAt?: Maybe<Scalars['DateTime']['output']>;
  submittedByUserId?: Maybe<Scalars['String']['output']>;
  submittedCoverage?: Maybe<Scalars['Decimal']['output']>;
  transactionId?: Maybe<Scalars['String']['output']>;
};

export type ScholarshipRefund = {
  __typename?: 'ScholarshipRefund';
  beneficiaryRefundProofDocumentId?: Maybe<Scalars['String']['output']>;
  beneficiaryUserId?: Maybe<Scalars['String']['output']>;
  confirmedRefundAmount?: Maybe<Scalars['Decimal']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  linkedRefundTransactionId?: Maybe<Scalars['String']['output']>;
  originalTransactionId?: Maybe<Scalars['String']['output']>;
  refundPaymentReference?: Maybe<Scalars['String']['output']>;
  requestedAmount?: Maybe<Scalars['Decimal']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  wrongDisbursementCaseId?: Maybe<Scalars['String']['output']>;
};

export type ScholarshipStatusCount = {
  __typename?: 'ScholarshipStatusCount';
  count?: Maybe<Scalars['Int']['output']>;
  key?: Maybe<Scalars['String']['output']>;
};

export type ScholarshipWrongDisbursementCase = {
  __typename?: 'ScholarshipWrongDisbursementCase';
  affectedDocumentIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  applicationId?: Maybe<Scalars['String']['output']>;
  beneficiaryResponse?: Maybe<Scalars['String']['output']>;
  disputedAmount?: Maybe<Scalars['Decimal']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  originalTransactionId?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  refundRequested?: Maybe<Scalars['Boolean']['output']>;
  reportedAt?: Maybe<Scalars['DateTime']['output']>;
  reportedByUserId?: Maybe<Scalars['String']['output']>;
  requestedRefundAmount?: Maybe<Scalars['Decimal']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  amount?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Currency>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isDonation?: Maybe<Scalars['Boolean']['output']>;
  method?: Maybe<Scalars['String']['output']>;
  referenceId?: Maybe<Scalars['String']['output']>;
  scholarshipApplicationId?: Maybe<Scalars['String']['output']>;
  scholarshipApprovedAt?: Maybe<Scalars['DateTime']['output']>;
  scholarshipBatchSnapshot?: Maybe<Scalars['Int']['output']>;
  scholarshipBeneficiaryUserId?: Maybe<Scalars['String']['output']>;
  scholarshipCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  scholarshipConfirmedAmount?: Maybe<Scalars['Decimal']['output']>;
  scholarshipConfirmedAt?: Maybe<Scalars['DateTime']['output']>;
  scholarshipImmutableAt?: Maybe<Scalars['DateTime']['output']>;
  scholarshipInstallmentSequence?: Maybe<Scalars['Int']['output']>;
  scholarshipMaskedPayoutDestination?: Maybe<Scalars['String']['output']>;
  scholarshipMentorUserId?: Maybe<Scalars['String']['output']>;
  scholarshipOriginalTransactionId?: Maybe<Scalars['String']['output']>;
  scholarshipPayoutMethod?: Maybe<Scalars['String']['output']>;
  scholarshipProofDueAt?: Maybe<Scalars['DateTime']['output']>;
  scholarshipProofDueDays?: Maybe<Scalars['Int']['output']>;
  scholarshipProofStatus?: Maybe<Scalars['String']['output']>;
  scholarshipPurposeSnapshot?: Maybe<Scalars['String']['output']>;
  scholarshipReceivedAt?: Maybe<Scalars['DateTime']['output']>;
  scholarshipStatus?: Maybe<Scalars['String']['output']>;
  sourceType?: Maybe<Scalars['String']['output']>;
  status?: Maybe<TransactionStatus>;
  title?: Maybe<Scalars['String']['output']>;
  transactionDate?: Maybe<Scalars['DateTime']['output']>;
  type?: Maybe<TransactionType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type TransactionListResponse = {
  __typename?: 'TransactionListResponse';
  data?: Maybe<Array<Maybe<Transaction>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export enum TransactionStatus {
  Approved = 'APPROVED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  NotReceivedReported = 'NOT_RECEIVED_REPORTED',
  PartiallyReceived = 'PARTIALLY_RECEIVED',
  Pending = 'PENDING',
  PendingBeneficiaryConfirmation = 'PENDING_BENEFICIARY_CONFIRMATION',
  Refunded = 'REFUNDED',
  Reversed = 'REVERSED',
}

export enum TransactionType {
  Credit = 'CREDIT',
  Debit = 'DEBIT',
}

export type UpdateBusinessInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  socialMedia?: InputMaybe<Scalars['JSON']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  aboutMe?: Maybe<Scalars['String']['output']>;
  batch?: Maybe<Scalars['Int']['output']>;
  companyInfo?: Maybe<Array<Maybe<CompanyInfoBasic>>>;
  /** Timestamp when the record was created */
  createdAt: Scalars['DateTime']['output'];
  disabled?: Maybe<Scalars['Boolean']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  dob?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emergencyMobile?: Maybe<Scalars['String']['output']>;
  extraEmail?: Maybe<Scalars['String']['output']>;
  extraMobile?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  google_auth_id?: Maybe<Scalars['String']['output']>;
  hasBusiness?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isConfidential?: Maybe<Scalars['Boolean']['output']>;
  isFaculty?: Maybe<Scalars['Boolean']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  membershipYear?: Maybe<Scalars['Int']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  nickName?: Maybe<Scalars['String']['output']>;
  positions?: Maybe<Array<Maybe<EffectivePosition>>>;
  profileImage?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  roles?: Maybe<Array<Maybe<EffectiveRole>>>;
  socialMedia?: Maybe<Scalars['JSON']['output']>;
  /** Timestamp when the record was last updated */
  updatedAt: Scalars['DateTime']['output'];
  whatsAppMobile?: Maybe<Scalars['String']['output']>;
};

export type UserBasic = {
  __typename?: 'UserBasic';
  batch?: Maybe<Scalars['Int']['output']>;
  disabled?: Maybe<Scalars['Boolean']['output']>;
  dob?: Maybe<Scalars['DateTime']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isConfidential?: Maybe<Scalars['Boolean']['output']>;
  isFaculty?: Maybe<Scalars['Boolean']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  profileImage?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
};

export type UserBirthday = {
  __typename?: 'UserBirthday';
  batch?: Maybe<Scalars['Int']['output']>;
  birthday?: Maybe<Scalars['String']['output']>;
  disabled?: Maybe<Scalars['Boolean']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isConfidential?: Maybe<Scalars['Boolean']['output']>;
  isFaculty?: Maybe<Scalars['Boolean']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  profileImage?: Maybe<Scalars['String']['output']>;
};

export type UserListResponse = {
  __typename?: 'UserListResponse';
  data?: Maybe<Array<Maybe<User>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type ViewerAccessContext = {
  __typename?: 'ViewerAccessContext';
  hasFullAccess?: Maybe<Scalars['Boolean']['output']>;
  permissions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  positions?: Maybe<Array<Maybe<EffectivePosition>>>;
  roles?: Maybe<Array<Maybe<EffectiveRole>>>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ActivateExecutiveTermMutationVariables = Exact<{
  reason: Scalars['String']['input'];
  termId: Scalars['String']['input'];
}>;

export type ActivateExecutiveTermMutation = {
  __typename?: 'Mutation';
  activateExecutiveTerm?:
    | {
        __typename?: 'ExecutiveTerm';
        createdAt?: any | undefined;
        createdByUserId?: string | undefined;
        endDate?: any | undefined;
        id?: string | undefined;
        name?: string | undefined;
        startDate?: any | undefined;
        status?: ExecutiveTermStatus | undefined;
        updatedAt?: any | undefined;
      }
    | undefined;
};

export type AddAlbumContributorMutationVariables = Exact<{
  albumId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;

export type AddAlbumContributorMutation = {
  __typename?: 'Mutation';
  addAlbumContributor?:
    | {
        __typename?: 'Album';
        coverImage?: string | undefined;
        createdAt?: any | undefined;
        description?: string | undefined;
        id?: string | undefined;
        title?: string | undefined;
        total_photos?: number | undefined;
        updatedAt?: any | undefined;
        contributors?:
          | Array<
              | {
                  __typename?: 'UserBasic';
                  batch?: number | undefined;
                  disabled?: boolean | undefined;
                  dob?: any | undefined;
                  firstName?: string | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  profileImage?: string | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
        creator?:
          | {
              __typename?: 'UserBasic';
              batch?: number | undefined;
              disabled?: boolean | undefined;
              dob?: any | undefined;
              firstName?: string | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              profileImage?: string | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
            }
          | undefined;
        event?:
          | {
              __typename?: 'EventBasic';
              adminRemark?: string | undefined;
              category?: string | undefined;
              cover?: any | undefined;
              createdBy?: string | undefined;
              description?: string | undefined;
              endDate?: any | undefined;
              id: number;
              image?: string | undefined;
              isGoing?: boolean | undefined;
              location?: string | undefined;
              medium: string;
              shortUrl?: string | undefined;
              startDate: any;
              status?: EventStatus | undefined;
              summary: string;
              tags?: Array<string | undefined> | undefined;
              title: string;
              total_attendies?: number | undefined;
            }
          | undefined;
        photos?:
          | Array<
              | {
                  __typename?: 'Photo';
                  altDescription?: string | undefined;
                  caption?: string | undefined;
                  id?: string | undefined;
                  thumbUrl?: string | undefined;
                  uploadedAt?: any | undefined;
                  url?: string | undefined;
                  album?:
                    | {
                        __typename?: 'AlbumBasic';
                        coverImage?: string | undefined;
                        createdAt?: any | undefined;
                        description?: string | undefined;
                        id?: string | undefined;
                        title?: string | undefined;
                        total_photos?: number | undefined;
                        updatedAt?: any | undefined;
                        contributors?:
                          | Array<
                              | {
                                  __typename?: 'UserBasic';
                                  batch?: number | undefined;
                                  disabled?: boolean | undefined;
                                  dob?: any | undefined;
                                  firstName?: string | undefined;
                                  id?: string | undefined;
                                  isConfidential?: boolean | undefined;
                                  isFaculty?: boolean | undefined;
                                  isVerified?: boolean | undefined;
                                  lastName?: string | undefined;
                                  profileImage?: string | undefined;
                                }
                              | undefined
                            >
                          | undefined;
                        creator?:
                          | {
                              __typename?: 'UserBasic';
                              batch?: number | undefined;
                              disabled?: boolean | undefined;
                              dob?: any | undefined;
                              firstName?: string | undefined;
                              id?: string | undefined;
                              isConfidential?: boolean | undefined;
                              isFaculty?: boolean | undefined;
                              isVerified?: boolean | undefined;
                              lastName?: string | undefined;
                              profileImage?: string | undefined;
                            }
                          | undefined;
                        event?:
                          | {
                              __typename?: 'EventBasic';
                              adminRemark?: string | undefined;
                              category?: string | undefined;
                              cover?: any | undefined;
                              createdBy?: string | undefined;
                              description?: string | undefined;
                              endDate?: any | undefined;
                              id: number;
                              image?: string | undefined;
                              isGoing?: boolean | undefined;
                              location?: string | undefined;
                              medium: string;
                              shortUrl?: string | undefined;
                              startDate: any;
                              status?: EventStatus | undefined;
                              summary: string;
                              tags?: Array<string | undefined> | undefined;
                              title: string;
                              total_attendies?: number | undefined;
                            }
                          | undefined;
                      }
                    | undefined;
                  crdits?:
                    | {
                        __typename?: 'PhotoCredit';
                        license_type?: string | undefined;
                        name?: string | undefined;
                        source?: string | undefined;
                        source_url?: string | undefined;
                        url?: string | undefined;
                      }
                    | undefined;
                  uploader?:
                    | {
                        __typename?: 'User';
                        aboutMe?: string | undefined;
                        batch?: number | undefined;
                        createdAt: any;
                        disabled?: boolean | undefined;
                        displayName?: string | undefined;
                        dob?: any | undefined;
                        email?: string | undefined;
                        emergencyMobile?: string | undefined;
                        extraEmail?: string | undefined;
                        extraMobile?: string | undefined;
                        firstName?: string | undefined;
                        gender?: string | undefined;
                        google_auth_id?: string | undefined;
                        hasBusiness?: boolean | undefined;
                        id?: string | undefined;
                        isConfidential?: boolean | undefined;
                        isFaculty?: boolean | undefined;
                        isVerified?: boolean | undefined;
                        lastName?: string | undefined;
                        membershipYear?: number | undefined;
                        metadata?: any | undefined;
                        mobile?: string | undefined;
                        nickName?: string | undefined;
                        profileImage?: string | undefined;
                        socialMedia?: any | undefined;
                        updatedAt: any;
                        whatsAppMobile?: string | undefined;
                        companyInfo?:
                          | Array<
                              | {
                                  __typename?: 'CompanyInfoBasic';
                                  companyName: string;
                                  id: string;
                                  position?: string | undefined;
                                  userId: string;
                                }
                              | undefined
                            >
                          | undefined;
                        positions?:
                          | Array<
                              | {
                                  __typename?: 'EffectivePosition';
                                  assignmentId?: string | undefined;
                                  code?: string | undefined;
                                  name?: string | undefined;
                                  termId?: string | undefined;
                                  termName?: string | undefined;
                                  validFrom?: any | undefined;
                                  validUntil?: any | undefined;
                                }
                              | undefined
                            >
                          | undefined;
                        role?:
                          | {
                              __typename?: 'Role';
                              code?: string | undefined;
                              id?: string | undefined;
                              name?: string | undefined;
                            }
                          | undefined;
                        roles?:
                          | Array<
                              | {
                                  __typename?: 'EffectiveRole';
                                  assignmentId?: string | undefined;
                                  code?: string | undefined;
                                  name?: string | undefined;
                                  scopeBatch?: number | undefined;
                                  scopeType?: string | undefined;
                                  validFrom?: any | undefined;
                                  validUntil?: any | undefined;
                                }
                              | undefined
                            >
                          | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type AddCommentMutationVariables = Exact<{
  content: Scalars['String']['input'];
  targetId: Scalars['String']['input'];
  targetType: CommentTargetType;
}>;

export type AddCommentMutation = {
  __typename?: 'Mutation';
  addComment?:
    | {
        __typename?: 'Comment';
        authorId?: string | undefined;
        content?: string | undefined;
        createdAt?: any | undefined;
        id?: string | undefined;
        isVerified?: boolean | undefined;
        targetId?: string | undefined;
        targetType?: CommentTargetType | undefined;
        updatedAt?: any | undefined;
        author?:
          | {
              __typename?: 'UserBasic';
              batch?: number | undefined;
              disabled?: boolean | undefined;
              dob?: any | undefined;
              firstName?: string | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              profileImage?: string | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type AddPhotoMutationVariables = Exact<{
  albumId: Scalars['String']['input'];
  caption?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
}>;

export type AddPhotoMutation = {
  __typename?: 'Mutation';
  addPhoto?:
    | {
        __typename?: 'Photo';
        altDescription?: string | undefined;
        caption?: string | undefined;
        id?: string | undefined;
        thumbUrl?: string | undefined;
        uploadedAt?: any | undefined;
        url?: string | undefined;
        album?:
          | {
              __typename?: 'AlbumBasic';
              coverImage?: string | undefined;
              createdAt?: any | undefined;
              description?: string | undefined;
              id?: string | undefined;
              title?: string | undefined;
              total_photos?: number | undefined;
              updatedAt?: any | undefined;
              contributors?:
                | Array<
                    | {
                        __typename?: 'UserBasic';
                        batch?: number | undefined;
                        disabled?: boolean | undefined;
                        dob?: any | undefined;
                        firstName?: string | undefined;
                        id?: string | undefined;
                        isConfidential?: boolean | undefined;
                        isFaculty?: boolean | undefined;
                        isVerified?: boolean | undefined;
                        lastName?: string | undefined;
                        profileImage?: string | undefined;
                        role?:
                          | {
                              __typename?: 'Role';
                              code?: string | undefined;
                              id?: string | undefined;
                              name?: string | undefined;
                            }
                          | undefined;
                      }
                    | undefined
                  >
                | undefined;
              creator?:
                | {
                    __typename?: 'UserBasic';
                    batch?: number | undefined;
                    disabled?: boolean | undefined;
                    dob?: any | undefined;
                    firstName?: string | undefined;
                    id?: string | undefined;
                    isConfidential?: boolean | undefined;
                    isFaculty?: boolean | undefined;
                    isVerified?: boolean | undefined;
                    lastName?: string | undefined;
                    profileImage?: string | undefined;
                    role?:
                      | {
                          __typename?: 'Role';
                          code?: string | undefined;
                          id?: string | undefined;
                          name?: string | undefined;
                        }
                      | undefined;
                  }
                | undefined;
              event?:
                | {
                    __typename?: 'EventBasic';
                    adminRemark?: string | undefined;
                    category?: string | undefined;
                    cover?: any | undefined;
                    createdBy?: string | undefined;
                    description?: string | undefined;
                    endDate?: any | undefined;
                    id: number;
                    image?: string | undefined;
                    isGoing?: boolean | undefined;
                    location?: string | undefined;
                    medium: string;
                    shortUrl?: string | undefined;
                    startDate: any;
                    status?: EventStatus | undefined;
                    summary: string;
                    tags?: Array<string | undefined> | undefined;
                    title: string;
                    total_attendies?: number | undefined;
                  }
                | undefined;
            }
          | undefined;
        crdits?:
          | {
              __typename?: 'PhotoCredit';
              license_type?: string | undefined;
              name?: string | undefined;
              source?: string | undefined;
              source_url?: string | undefined;
              url?: string | undefined;
            }
          | undefined;
        uploader?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type ApproveBlogMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type ApproveBlogMutation = {
  __typename?: 'Mutation';
  approveBlog?:
    | {
        __typename?: 'Blog';
        adminRemark?: string | undefined;
        authorId?: string | undefined;
        categoryId?: string | undefined;
        claps?: number | undefined;
        content?: string | undefined;
        cover?: any | undefined;
        createdAt: any;
        id: string;
        shortUrl?: string | undefined;
        slug?: string | undefined;
        status: BlogStatus;
        summary?: string | undefined;
        title: string;
        updatedAt: any;
        author?:
          | {
              __typename?: 'UserBasic';
              batch?: number | undefined;
              disabled?: boolean | undefined;
              dob?: any | undefined;
              firstName?: string | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              profileImage?: string | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
            }
          | undefined;
        comments?:
          | Array<
              | {
                  __typename?: 'Comment';
                  authorId?: string | undefined;
                  content?: string | undefined;
                  createdAt?: any | undefined;
                  id?: string | undefined;
                  isVerified?: boolean | undefined;
                  targetId?: string | undefined;
                  targetType?: CommentTargetType | undefined;
                  updatedAt?: any | undefined;
                  author?:
                    | {
                        __typename?: 'UserBasic';
                        batch?: number | undefined;
                        disabled?: boolean | undefined;
                        dob?: any | undefined;
                        firstName?: string | undefined;
                        id?: string | undefined;
                        isConfidential?: boolean | undefined;
                        isFaculty?: boolean | undefined;
                        isVerified?: boolean | undefined;
                        lastName?: string | undefined;
                        profileImage?: string | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type ApproveMemberRegistrationMutationVariables = Exact<{
  reason: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;

export type ApproveMemberRegistrationMutation = {
  __typename?: 'Mutation';
  approveMemberRegistration?: boolean | undefined;
};

export type ApproveScholarshipApplicationMutationVariables = Exact<{
  applicationId: Scalars['String']['input'];
  approvedTotalAmount: Scalars['Float']['input'];
  installmentAmount: Scalars['Float']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  proofDueDays?: InputMaybe<Scalars['Int']['input']>;
}>;

export type ApproveScholarshipApplicationMutation = {
  __typename?: 'Mutation';
  approveScholarshipApplication?:
    | {
        __typename?: 'ScholarshipApplication';
        applicantUserId?: string | undefined;
        approvedAmountDisbursed?: any | undefined;
        approvedAt?: any | undefined;
        approvedByUserId?: string | undefined;
        approvedProofDays?: number | undefined;
        approvedTotalAmount?: any | undefined;
        assignedMentorUserId?: string | undefined;
        batchSnapshot?: number | undefined;
        beneficiaryUserId?: string | undefined;
        closedAt?: any | undefined;
        createdAt?: any | undefined;
        id?: string | undefined;
        lastActivityAt?: any | undefined;
        paymentMode?: ScholarshipPaymentMode | undefined;
        payoutMaskedSnapshot?: string | undefined;
        payoutMethod?: ScholarshipPayoutMethod | undefined;
        payoutSnapshot?: any | undefined;
        proofStatus?: string | undefined;
        proposedProofDays?: number | undefined;
        purpose?: string | undefined;
        reason?: string | undefined;
        referenceNumber?: string | undefined;
        refundStatus?: string | undefined;
        rejectedAt?: any | undefined;
        rejectedByUserId?: string | undefined;
        rejectionReason?: string | undefined;
        requestedAmount?: any | undefined;
        requestedFirstInstallmentAmount?: any | undefined;
        reviewStartedAt?: any | undefined;
        reviewedByUserId?: string | undefined;
        status?: ScholarshipApplicationStatus | undefined;
        submittedAt?: any | undefined;
        updatedAt?: any | undefined;
        assignedMentor?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
        beneficiary?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
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
        assignedAt?: any | undefined;
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
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type AssignExecutivePositionMutationVariables = Exact<{
  input: AssignExecutivePositionInput;
}>;

export type AssignExecutivePositionMutation = {
  __typename?: 'Mutation';
  assignExecutivePosition?:
    | {
        __typename?: 'ExecutivePositionAssignment';
        assignedByUserId?: string | undefined;
        assignmentReason?: string | undefined;
        createdAt?: any | undefined;
        executiveTermId?: string | undefined;
        id?: string | undefined;
        positionId?: string | undefined;
        revocationReason?: string | undefined;
        revokedAt?: any | undefined;
        revokedByUserId?: string | undefined;
        updatedAt?: any | undefined;
        userId?: string | undefined;
        validFrom?: any | undefined;
        validUntil?: any | undefined;
        executiveTerm?:
          | {
              __typename?: 'ExecutiveTerm';
              createdAt?: any | undefined;
              createdByUserId?: string | undefined;
              endDate?: any | undefined;
              id?: string | undefined;
              name?: string | undefined;
              startDate?: any | undefined;
              status?: ExecutiveTermStatus | undefined;
              updatedAt?: any | undefined;
            }
          | undefined;
        position?:
          | {
              __typename?: 'ExecutivePosition';
              code?: string | undefined;
              createdAt?: any | undefined;
              id?: string | undefined;
              isActive?: boolean | undefined;
              isSingleSeat?: boolean | undefined;
              name?: string | undefined;
              updatedAt?: any | undefined;
            }
          | undefined;
        user?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type AssignUserRoleMutationVariables = Exact<{
  input: AssignUserRoleInput;
}>;

export type AssignUserRoleMutation = {
  __typename?: 'Mutation';
  assignUserRole?:
    | {
        __typename?: 'RoleAssignment';
        assignedByUserId?: string | undefined;
        assignmentReason?: string | undefined;
        createdAt?: any | undefined;
        id?: string | undefined;
        revocationReason?: string | undefined;
        revokedAt?: any | undefined;
        revokedByUserId?: string | undefined;
        roleId?: string | undefined;
        scopeBatch?: number | undefined;
        scopeType?: AccessScopeType | undefined;
        updatedAt?: any | undefined;
        userId?: string | undefined;
        validFrom?: any | undefined;
        validUntil?: any | undefined;
        role?:
          | {
              __typename?: 'AccessRole';
              code?: string | undefined;
              description?: string | undefined;
              id?: string | undefined;
              isActive?: boolean | undefined;
              isSystem?: boolean | undefined;
              name?: string | undefined;
            }
          | undefined;
        user?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type AttendEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;

export type AttendEventMutation = { __typename?: 'Mutation'; attendEvent?: boolean | undefined };

export type CloseExecutiveTermMutationVariables = Exact<{
  reason: Scalars['String']['input'];
  termId: Scalars['String']['input'];
}>;

export type CloseExecutiveTermMutation = {
  __typename?: 'Mutation';
  closeExecutiveTerm?:
    | {
        __typename?: 'ExecutiveTerm';
        createdAt?: any | undefined;
        createdByUserId?: string | undefined;
        endDate?: any | undefined;
        id?: string | undefined;
        name?: string | undefined;
        startDate?: any | undefined;
        status?: ExecutiveTermStatus | undefined;
        updatedAt?: any | undefined;
      }
    | undefined;
};

export type CloseScholarshipRemainderMutationVariables = Exact<{
  applicationId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
}>;

export type CloseScholarshipRemainderMutation = {
  __typename?: 'Mutation';
  closeScholarshipRemainder?:
    | {
        __typename?: 'ScholarshipApplication';
        applicantUserId?: string | undefined;
        approvedAmountDisbursed?: any | undefined;
        approvedAt?: any | undefined;
        approvedByUserId?: string | undefined;
        approvedProofDays?: number | undefined;
        approvedTotalAmount?: any | undefined;
        assignedMentorUserId?: string | undefined;
        batchSnapshot?: number | undefined;
        beneficiaryUserId?: string | undefined;
        closedAt?: any | undefined;
        createdAt?: any | undefined;
        id?: string | undefined;
        lastActivityAt?: any | undefined;
        paymentMode?: ScholarshipPaymentMode | undefined;
        payoutMaskedSnapshot?: string | undefined;
        payoutMethod?: ScholarshipPayoutMethod | undefined;
        payoutSnapshot?: any | undefined;
        proofStatus?: string | undefined;
        proposedProofDays?: number | undefined;
        purpose?: string | undefined;
        reason?: string | undefined;
        referenceNumber?: string | undefined;
        refundStatus?: string | undefined;
        rejectedAt?: any | undefined;
        rejectedByUserId?: string | undefined;
        rejectionReason?: string | undefined;
        requestedAmount?: any | undefined;
        requestedFirstInstallmentAmount?: any | undefined;
        reviewStartedAt?: any | undefined;
        reviewedByUserId?: string | undefined;
        status?: ScholarshipApplicationStatus | undefined;
        submittedAt?: any | undefined;
        updatedAt?: any | undefined;
        assignedMentor?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
        beneficiary?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type ConfirmMentorFundAllocationMutationVariables = Exact<{
  allocationId: Scalars['String']['input'];
  confirmedAmount?: InputMaybe<Scalars['Float']['input']>;
}>;

export type ConfirmMentorFundAllocationMutation = {
  __typename?: 'Mutation';
  confirmMentorFundAllocation?:
    | {
        __typename?: 'MentorFundAllocation';
        amount?: any | undefined;
        batch?: number | undefined;
        confirmedAmount?: any | undefined;
        createdAt?: any | undefined;
        currency?: string | undefined;
        disputedAmount?: any | undefined;
        id?: string | undefined;
        mentorUserId?: string | undefined;
        method?: string | undefined;
        notes?: string | undefined;
        recordedByUserId?: string | undefined;
        reference?: string | undefined;
        status?: string | undefined;
        transferDate?: any | undefined;
      }
    | undefined;
};

export type ConfirmScholarshipRefundReceivedMutationVariables = Exact<{
  confirmedAmount: Scalars['Float']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
  refundId: Scalars['String']['input'];
}>;

export type ConfirmScholarshipRefundReceivedMutation = {
  __typename?: 'Mutation';
  confirmScholarshipRefundReceived?:
    | {
        __typename?: 'ScholarshipRefund';
        beneficiaryRefundProofDocumentId?: string | undefined;
        beneficiaryUserId?: string | undefined;
        confirmedRefundAmount?: any | undefined;
        id?: string | undefined;
        linkedRefundTransactionId?: string | undefined;
        originalTransactionId?: string | undefined;
        refundPaymentReference?: string | undefined;
        requestedAmount?: any | undefined;
        status?: string | undefined;
        wrongDisbursementCaseId?: string | undefined;
      }
    | undefined;
};

export type ConfirmScholarshipTransactionReceiptMutationVariables = Exact<{
  confirmedAmount: Scalars['Float']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  transactionId: Scalars['String']['input'];
}>;

export type ConfirmScholarshipTransactionReceiptMutation = {
  __typename?: 'Mutation';
  confirmScholarshipTransactionReceipt?:
    | {
        __typename?: 'Transaction';
        amount?: any | undefined;
        createdAt?: any | undefined;
        currency?: Currency | undefined;
        description?: string | undefined;
        id?: string | undefined;
        isDonation?: boolean | undefined;
        method?: string | undefined;
        referenceId?: string | undefined;
        scholarshipApplicationId?: string | undefined;
        scholarshipApprovedAt?: any | undefined;
        scholarshipBatchSnapshot?: number | undefined;
        scholarshipBeneficiaryUserId?: string | undefined;
        scholarshipCompletedAt?: any | undefined;
        scholarshipConfirmedAmount?: any | undefined;
        scholarshipConfirmedAt?: any | undefined;
        scholarshipImmutableAt?: any | undefined;
        scholarshipInstallmentSequence?: number | undefined;
        scholarshipMaskedPayoutDestination?: string | undefined;
        scholarshipMentorUserId?: string | undefined;
        scholarshipOriginalTransactionId?: string | undefined;
        scholarshipPayoutMethod?: string | undefined;
        scholarshipProofDueAt?: any | undefined;
        scholarshipProofDueDays?: number | undefined;
        scholarshipProofStatus?: string | undefined;
        scholarshipPurposeSnapshot?: string | undefined;
        scholarshipReceivedAt?: any | undefined;
        scholarshipStatus?: string | undefined;
        sourceType?: string | undefined;
        status?: TransactionStatus | undefined;
        title?: string | undefined;
        transactionDate?: any | undefined;
        type?: TransactionType | undefined;
        updatedAt?: any | undefined;
        userId?: string | undefined;
        user?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type CreateAddressMutationVariables = Exact<{
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
}>;

export type CreateAddressMutation = {
  __typename?: 'Mutation';
  createAddress?:
    | {
        __typename?: 'Address';
        address?: string | undefined;
        city?: string | undefined;
        country?: string | undefined;
        id: string;
        postalCode?: string | undefined;
        state?: string | undefined;
        type: string;
        userId: string;
      }
    | undefined;
};

export type CreateAlbumMutationVariables = Exact<{
  coverImage?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
}>;

export type CreateAlbumMutation = {
  __typename?: 'Mutation';
  createAlbum?:
    | {
        __typename?: 'Album';
        coverImage?: string | undefined;
        createdAt?: any | undefined;
        description?: string | undefined;
        id?: string | undefined;
        title?: string | undefined;
        total_photos?: number | undefined;
        updatedAt?: any | undefined;
        contributors?:
          | Array<
              | {
                  __typename?: 'UserBasic';
                  batch?: number | undefined;
                  disabled?: boolean | undefined;
                  dob?: any | undefined;
                  firstName?: string | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  profileImage?: string | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
        creator?:
          | {
              __typename?: 'UserBasic';
              batch?: number | undefined;
              disabled?: boolean | undefined;
              dob?: any | undefined;
              firstName?: string | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              profileImage?: string | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
            }
          | undefined;
        event?:
          | {
              __typename?: 'EventBasic';
              adminRemark?: string | undefined;
              category?: string | undefined;
              cover?: any | undefined;
              createdBy?: string | undefined;
              description?: string | undefined;
              endDate?: any | undefined;
              id: number;
              image?: string | undefined;
              isGoing?: boolean | undefined;
              location?: string | undefined;
              medium: string;
              shortUrl?: string | undefined;
              startDate: any;
              status?: EventStatus | undefined;
              summary: string;
              tags?: Array<string | undefined> | undefined;
              title: string;
              total_attendies?: number | undefined;
            }
          | undefined;
        photos?:
          | Array<
              | {
                  __typename?: 'Photo';
                  altDescription?: string | undefined;
                  caption?: string | undefined;
                  id?: string | undefined;
                  thumbUrl?: string | undefined;
                  uploadedAt?: any | undefined;
                  url?: string | undefined;
                  album?:
                    | {
                        __typename?: 'AlbumBasic';
                        coverImage?: string | undefined;
                        createdAt?: any | undefined;
                        description?: string | undefined;
                        id?: string | undefined;
                        title?: string | undefined;
                        total_photos?: number | undefined;
                        updatedAt?: any | undefined;
                        contributors?:
                          | Array<
                              | {
                                  __typename?: 'UserBasic';
                                  batch?: number | undefined;
                                  disabled?: boolean | undefined;
                                  dob?: any | undefined;
                                  firstName?: string | undefined;
                                  id?: string | undefined;
                                  isConfidential?: boolean | undefined;
                                  isFaculty?: boolean | undefined;
                                  isVerified?: boolean | undefined;
                                  lastName?: string | undefined;
                                  profileImage?: string | undefined;
                                }
                              | undefined
                            >
                          | undefined;
                        creator?:
                          | {
                              __typename?: 'UserBasic';
                              batch?: number | undefined;
                              disabled?: boolean | undefined;
                              dob?: any | undefined;
                              firstName?: string | undefined;
                              id?: string | undefined;
                              isConfidential?: boolean | undefined;
                              isFaculty?: boolean | undefined;
                              isVerified?: boolean | undefined;
                              lastName?: string | undefined;
                              profileImage?: string | undefined;
                            }
                          | undefined;
                        event?:
                          | {
                              __typename?: 'EventBasic';
                              adminRemark?: string | undefined;
                              category?: string | undefined;
                              cover?: any | undefined;
                              createdBy?: string | undefined;
                              description?: string | undefined;
                              endDate?: any | undefined;
                              id: number;
                              image?: string | undefined;
                              isGoing?: boolean | undefined;
                              location?: string | undefined;
                              medium: string;
                              shortUrl?: string | undefined;
                              startDate: any;
                              status?: EventStatus | undefined;
                              summary: string;
                              tags?: Array<string | undefined> | undefined;
                              title: string;
                              total_attendies?: number | undefined;
                            }
                          | undefined;
                      }
                    | undefined;
                  crdits?:
                    | {
                        __typename?: 'PhotoCredit';
                        license_type?: string | undefined;
                        name?: string | undefined;
                        source?: string | undefined;
                        source_url?: string | undefined;
                        url?: string | undefined;
                      }
                    | undefined;
                  uploader?:
                    | {
                        __typename?: 'User';
                        aboutMe?: string | undefined;
                        batch?: number | undefined;
                        createdAt: any;
                        disabled?: boolean | undefined;
                        displayName?: string | undefined;
                        dob?: any | undefined;
                        email?: string | undefined;
                        emergencyMobile?: string | undefined;
                        extraEmail?: string | undefined;
                        extraMobile?: string | undefined;
                        firstName?: string | undefined;
                        gender?: string | undefined;
                        google_auth_id?: string | undefined;
                        hasBusiness?: boolean | undefined;
                        id?: string | undefined;
                        isConfidential?: boolean | undefined;
                        isFaculty?: boolean | undefined;
                        isVerified?: boolean | undefined;
                        lastName?: string | undefined;
                        membershipYear?: number | undefined;
                        metadata?: any | undefined;
                        mobile?: string | undefined;
                        nickName?: string | undefined;
                        profileImage?: string | undefined;
                        socialMedia?: any | undefined;
                        updatedAt: any;
                        whatsAppMobile?: string | undefined;
                        companyInfo?:
                          | Array<
                              | {
                                  __typename?: 'CompanyInfoBasic';
                                  companyName: string;
                                  id: string;
                                  position?: string | undefined;
                                  userId: string;
                                }
                              | undefined
                            >
                          | undefined;
                        positions?:
                          | Array<
                              | {
                                  __typename?: 'EffectivePosition';
                                  assignmentId?: string | undefined;
                                  code?: string | undefined;
                                  name?: string | undefined;
                                  termId?: string | undefined;
                                  termName?: string | undefined;
                                  validFrom?: any | undefined;
                                  validUntil?: any | undefined;
                                }
                              | undefined
                            >
                          | undefined;
                        role?:
                          | {
                              __typename?: 'Role';
                              code?: string | undefined;
                              id?: string | undefined;
                              name?: string | undefined;
                            }
                          | undefined;
                        roles?:
                          | Array<
                              | {
                                  __typename?: 'EffectiveRole';
                                  assignmentId?: string | undefined;
                                  code?: string | undefined;
                                  name?: string | undefined;
                                  scopeBatch?: number | undefined;
                                  scopeType?: string | undefined;
                                  validFrom?: any | undefined;
                                  validUntil?: any | undefined;
                                }
                              | undefined
                            >
                          | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type CreateBlogMutationVariables = Exact<{
  authorId: Scalars['String']['input'];
  categoryId: Scalars['String']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  cover?: InputMaybe<Scalars['JSON']['input']>;
  status?: InputMaybe<BlogStatus>;
  title: Scalars['String']['input'];
}>;

export type CreateBlogMutation = {
  __typename?: 'Mutation';
  createBlog?:
    | {
        __typename?: 'Blog';
        adminRemark?: string | undefined;
        authorId?: string | undefined;
        categoryId?: string | undefined;
        claps?: number | undefined;
        content?: string | undefined;
        cover?: any | undefined;
        createdAt: any;
        id: string;
        shortUrl?: string | undefined;
        slug?: string | undefined;
        status: BlogStatus;
        summary?: string | undefined;
        title: string;
        updatedAt: any;
        author?:
          | {
              __typename?: 'UserBasic';
              batch?: number | undefined;
              disabled?: boolean | undefined;
              dob?: any | undefined;
              firstName?: string | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              profileImage?: string | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
            }
          | undefined;
        comments?:
          | Array<
              | {
                  __typename?: 'Comment';
                  authorId?: string | undefined;
                  content?: string | undefined;
                  createdAt?: any | undefined;
                  id?: string | undefined;
                  isVerified?: boolean | undefined;
                  targetId?: string | undefined;
                  targetType?: CommentTargetType | undefined;
                  updatedAt?: any | undefined;
                  author?:
                    | {
                        __typename?: 'UserBasic';
                        batch?: number | undefined;
                        disabled?: boolean | undefined;
                        dob?: any | undefined;
                        firstName?: string | undefined;
                        id?: string | undefined;
                        isConfidential?: boolean | undefined;
                        isFaculty?: boolean | undefined;
                        isVerified?: boolean | undefined;
                        lastName?: string | undefined;
                        profileImage?: string | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type CreateBusinessMutationVariables = Exact<{
  body: CreateBusinessInput;
}>;

export type CreateBusinessMutation = {
  __typename?: 'Mutation';
  createBusiness: {
    __typename?: 'Business';
    address?: string | undefined;
    category: string;
    city?: string | undefined;
    country?: string | undefined;
    createdAt: any;
    description: string;
    email?: string | undefined;
    googleReviews?: number | undefined;
    id: string;
    isVerified: boolean;
    logoUrl?: string | undefined;
    name: string;
    phone?: string | undefined;
    postalCode?: string | undefined;
    socialMedia?: any | undefined;
    state?: string | undefined;
    tags?: Array<string> | undefined;
    updatedAt: any;
    userId: string;
    website?: string | undefined;
    user?:
      | {
          __typename?: 'UserBasic';
          batch?: number | undefined;
          disabled?: boolean | undefined;
          dob?: any | undefined;
          firstName?: string | undefined;
          id?: string | undefined;
          isConfidential?: boolean | undefined;
          isFaculty?: boolean | undefined;
          isVerified?: boolean | undefined;
          lastName?: string | undefined;
          profileImage?: string | undefined;
          role?:
            | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
            | undefined;
        }
      | undefined;
  };
};

export type CreateCompanyInfoMutationVariables = Exact<{
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  endedWorking?: InputMaybe<Scalars['DateTime']['input']>;
  isCurrent?: InputMaybe<Scalars['Boolean']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  startedWorking?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
}>;

export type CreateCompanyInfoMutation = {
  __typename?: 'Mutation';
  createCompanyInfo?:
    | {
        __typename?: 'CompanyInfo';
        address?: string | undefined;
        city?: string | undefined;
        companyName: string;
        country?: string | undefined;
        createdAt?: any | undefined;
        endedWorking?: any | undefined;
        id: string;
        isCurrent: boolean;
        position?: string | undefined;
        startedWorking?: any | undefined;
        state?: string | undefined;
        updatedAt?: any | undefined;
        userId: string;
        user?:
          | {
              __typename?: 'UserBasic';
              batch?: number | undefined;
              disabled?: boolean | undefined;
              dob?: any | undefined;
              firstName?: string | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              profileImage?: string | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type CreateEventMutationVariables = Exact<{
  category: Scalars['String']['input'];
  cover?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  medium: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  startDate: Scalars['String']['input'];
  status: EventStatus;
  summary: Scalars['String']['input'];
  tags?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
}>;

export type CreateEventMutation = {
  __typename?: 'Mutation';
  createEvent?:
    | {
        __typename?: 'EventBasic';
        adminRemark?: string | undefined;
        category?: string | undefined;
        cover?: any | undefined;
        createdBy?: string | undefined;
        description?: string | undefined;
        endDate?: any | undefined;
        id: number;
        image?: string | undefined;
        isGoing?: boolean | undefined;
        location?: string | undefined;
        medium: string;
        shortUrl?: string | undefined;
        startDate: any;
        status?: EventStatus | undefined;
        summary: string;
        tags?: Array<string | undefined> | undefined;
        title: string;
        total_attendies?: number | undefined;
      }
    | undefined;
};

export type CreateExecutiveTermMutationVariables = Exact<{
  endDate?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
}>;

export type CreateExecutiveTermMutation = {
  __typename?: 'Mutation';
  createExecutiveTerm?:
    | {
        __typename?: 'ExecutiveTerm';
        createdAt?: any | undefined;
        createdByUserId?: string | undefined;
        endDate?: any | undefined;
        id?: string | undefined;
        name?: string | undefined;
        startDate?: any | undefined;
        status?: ExecutiveTermStatus | undefined;
        updatedAt?: any | undefined;
      }
    | undefined;
};

export type CreateNextScholarshipInstallmentMutationVariables = Exact<{
  applicationId: Scalars['String']['input'];
  approvedTotalAmount: Scalars['Float']['input'];
  installmentAmount: Scalars['Float']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  proofDueDays?: InputMaybe<Scalars['Int']['input']>;
}>;

export type CreateNextScholarshipInstallmentMutation = {
  __typename?: 'Mutation';
  createNextScholarshipInstallment?:
    | {
        __typename?: 'ScholarshipApplication';
        applicantUserId?: string | undefined;
        approvedAmountDisbursed?: any | undefined;
        approvedAt?: any | undefined;
        approvedByUserId?: string | undefined;
        approvedProofDays?: number | undefined;
        approvedTotalAmount?: any | undefined;
        assignedMentorUserId?: string | undefined;
        batchSnapshot?: number | undefined;
        beneficiaryUserId?: string | undefined;
        closedAt?: any | undefined;
        createdAt?: any | undefined;
        id?: string | undefined;
        lastActivityAt?: any | undefined;
        paymentMode?: ScholarshipPaymentMode | undefined;
        payoutMaskedSnapshot?: string | undefined;
        payoutMethod?: ScholarshipPayoutMethod | undefined;
        payoutSnapshot?: any | undefined;
        proofStatus?: string | undefined;
        proposedProofDays?: number | undefined;
        purpose?: string | undefined;
        reason?: string | undefined;
        referenceNumber?: string | undefined;
        refundStatus?: string | undefined;
        rejectedAt?: any | undefined;
        rejectedByUserId?: string | undefined;
        rejectionReason?: string | undefined;
        requestedAmount?: any | undefined;
        requestedFirstInstallmentAmount?: any | undefined;
        reviewStartedAt?: any | undefined;
        reviewedByUserId?: string | undefined;
        status?: ScholarshipApplicationStatus | undefined;
        submittedAt?: any | undefined;
        updatedAt?: any | undefined;
        assignedMentor?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
        beneficiary?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type CreateScholarshipApplicationDraftMutationVariables = Exact<{
  input: ScholarshipApplicationInput;
}>;

export type CreateScholarshipApplicationDraftMutation = {
  __typename?: 'Mutation';
  createScholarshipApplicationDraft?:
    | {
        __typename?: 'ScholarshipApplication';
        applicantUserId?: string | undefined;
        approvedAmountDisbursed?: any | undefined;
        approvedAt?: any | undefined;
        approvedByUserId?: string | undefined;
        approvedProofDays?: number | undefined;
        approvedTotalAmount?: any | undefined;
        assignedMentorUserId?: string | undefined;
        batchSnapshot?: number | undefined;
        beneficiaryUserId?: string | undefined;
        closedAt?: any | undefined;
        createdAt?: any | undefined;
        id?: string | undefined;
        lastActivityAt?: any | undefined;
        paymentMode?: ScholarshipPaymentMode | undefined;
        payoutMaskedSnapshot?: string | undefined;
        payoutMethod?: ScholarshipPayoutMethod | undefined;
        payoutSnapshot?: any | undefined;
        proofStatus?: string | undefined;
        proposedProofDays?: number | undefined;
        purpose?: string | undefined;
        reason?: string | undefined;
        referenceNumber?: string | undefined;
        refundStatus?: string | undefined;
        rejectedAt?: any | undefined;
        rejectedByUserId?: string | undefined;
        rejectionReason?: string | undefined;
        requestedAmount?: any | undefined;
        requestedFirstInstallmentAmount?: any | undefined;
        reviewStartedAt?: any | undefined;
        reviewedByUserId?: string | undefined;
        status?: ScholarshipApplicationStatus | undefined;
        submittedAt?: any | undefined;
        updatedAt?: any | undefined;
        assignedMentor?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
        beneficiary?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type CreateScholarshipDocumentUploadMutationVariables = Exact<{
  input: ScholarshipDocumentUploadInput;
}>;

export type CreateScholarshipDocumentUploadMutation = {
  __typename?: 'Mutation';
  createScholarshipDocumentUpload?:
    | {
        __typename?: 'ScholarshipDocumentUploadResponse';
        uploadUrl?: string | undefined;
        document?:
          | {
              __typename?: 'ScholarshipDocument';
              applicationId?: string | undefined;
              category?: ScholarshipDocumentCategory | undefined;
              checksum?: string | undefined;
              claimedAmount?: any | undefined;
              createdAt?: any | undefined;
              description?: string | undefined;
              id?: string | undefined;
              mimeType?: string | undefined;
              originalFilename?: string | undefined;
              receiptDate?: any | undefined;
              sizeBytes?: number | undefined;
              status?: string | undefined;
              transactionId?: string | undefined;
              uploadedAt?: any | undefined;
              uploadedByUserId?: string | undefined;
              vendorName?: string | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type CreateTransactionMutationVariables = Exact<{
  amount: Scalars['Float']['input'];
  currency: Currency;
  description?: InputMaybe<Scalars['String']['input']>;
  isDonation?: InputMaybe<Scalars['Boolean']['input']>;
  method?: InputMaybe<Scalars['String']['input']>;
  referenceId?: InputMaybe<Scalars['String']['input']>;
  status: TransactionStatus;
  title: Scalars['String']['input'];
  transactionDate: Scalars['String']['input'];
  type: TransactionType;
  userId: Scalars['String']['input'];
}>;

export type CreateTransactionMutation = {
  __typename?: 'Mutation';
  createTransaction?:
    | {
        __typename?: 'Transaction';
        amount?: any | undefined;
        createdAt?: any | undefined;
        currency?: Currency | undefined;
        description?: string | undefined;
        id?: string | undefined;
        isDonation?: boolean | undefined;
        method?: string | undefined;
        referenceId?: string | undefined;
        scholarshipApplicationId?: string | undefined;
        scholarshipApprovedAt?: any | undefined;
        scholarshipBatchSnapshot?: number | undefined;
        scholarshipBeneficiaryUserId?: string | undefined;
        scholarshipCompletedAt?: any | undefined;
        scholarshipConfirmedAmount?: any | undefined;
        scholarshipConfirmedAt?: any | undefined;
        scholarshipImmutableAt?: any | undefined;
        scholarshipInstallmentSequence?: number | undefined;
        scholarshipMaskedPayoutDestination?: string | undefined;
        scholarshipMentorUserId?: string | undefined;
        scholarshipOriginalTransactionId?: string | undefined;
        scholarshipPayoutMethod?: string | undefined;
        scholarshipProofDueAt?: any | undefined;
        scholarshipProofDueDays?: number | undefined;
        scholarshipProofStatus?: string | undefined;
        scholarshipPurposeSnapshot?: string | undefined;
        scholarshipReceivedAt?: any | undefined;
        scholarshipStatus?: string | undefined;
        sourceType?: string | undefined;
        status?: TransactionStatus | undefined;
        title?: string | undefined;
        transactionDate?: any | undefined;
        type?: TransactionType | undefined;
        updatedAt?: any | undefined;
        userId?: string | undefined;
        user?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type DeleteAddressMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type DeleteAddressMutation = {
  __typename?: 'Mutation';
  deleteAddress?:
    | {
        __typename?: 'Address';
        address?: string | undefined;
        city?: string | undefined;
        country?: string | undefined;
        id: string;
        postalCode?: string | undefined;
        state?: string | undefined;
        type: string;
        userId: string;
      }
    | undefined;
};

export type DeleteBlogMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type DeleteBlogMutation = {
  __typename?: 'Mutation';
  deleteBlog?:
    | {
        __typename?: 'Blog';
        adminRemark?: string | undefined;
        authorId?: string | undefined;
        categoryId?: string | undefined;
        claps?: number | undefined;
        content?: string | undefined;
        cover?: any | undefined;
        createdAt: any;
        id: string;
        shortUrl?: string | undefined;
        slug?: string | undefined;
        status: BlogStatus;
        summary?: string | undefined;
        title: string;
        updatedAt: any;
        author?:
          | {
              __typename?: 'UserBasic';
              batch?: number | undefined;
              disabled?: boolean | undefined;
              dob?: any | undefined;
              firstName?: string | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              profileImage?: string | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
            }
          | undefined;
        comments?:
          | Array<
              | {
                  __typename?: 'Comment';
                  authorId?: string | undefined;
                  content?: string | undefined;
                  createdAt?: any | undefined;
                  id?: string | undefined;
                  isVerified?: boolean | undefined;
                  targetId?: string | undefined;
                  targetType?: CommentTargetType | undefined;
                  updatedAt?: any | undefined;
                  author?:
                    | {
                        __typename?: 'UserBasic';
                        batch?: number | undefined;
                        disabled?: boolean | undefined;
                        dob?: any | undefined;
                        firstName?: string | undefined;
                        id?: string | undefined;
                        isConfidential?: boolean | undefined;
                        isFaculty?: boolean | undefined;
                        isVerified?: boolean | undefined;
                        lastName?: string | undefined;
                        profileImage?: string | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type DeleteCompanyInfoMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
}>;

export type DeleteCompanyInfoMutation = {
  __typename?: 'Mutation';
  deleteCompanyInfo?:
    | {
        __typename?: 'CompanyInfo';
        address?: string | undefined;
        city?: string | undefined;
        companyName: string;
        country?: string | undefined;
        createdAt?: any | undefined;
        endedWorking?: any | undefined;
        id: string;
        isCurrent: boolean;
        position?: string | undefined;
        startedWorking?: any | undefined;
        state?: string | undefined;
        updatedAt?: any | undefined;
        userId: string;
        user?:
          | {
              __typename?: 'UserBasic';
              batch?: number | undefined;
              disabled?: boolean | undefined;
              dob?: any | undefined;
              firstName?: string | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              profileImage?: string | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteEventMutation = { __typename?: 'Mutation'; deleteEvent?: boolean | undefined };

export type DeleteTransactionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type DeleteTransactionMutation = {
  __typename?: 'Mutation';
  deleteTransaction?:
    | {
        __typename?: 'Transaction';
        amount?: any | undefined;
        createdAt?: any | undefined;
        currency?: Currency | undefined;
        description?: string | undefined;
        id?: string | undefined;
        isDonation?: boolean | undefined;
        method?: string | undefined;
        referenceId?: string | undefined;
        scholarshipApplicationId?: string | undefined;
        scholarshipApprovedAt?: any | undefined;
        scholarshipBatchSnapshot?: number | undefined;
        scholarshipBeneficiaryUserId?: string | undefined;
        scholarshipCompletedAt?: any | undefined;
        scholarshipConfirmedAmount?: any | undefined;
        scholarshipConfirmedAt?: any | undefined;
        scholarshipImmutableAt?: any | undefined;
        scholarshipInstallmentSequence?: number | undefined;
        scholarshipMaskedPayoutDestination?: string | undefined;
        scholarshipMentorUserId?: string | undefined;
        scholarshipOriginalTransactionId?: string | undefined;
        scholarshipPayoutMethod?: string | undefined;
        scholarshipProofDueAt?: any | undefined;
        scholarshipProofDueDays?: number | undefined;
        scholarshipProofStatus?: string | undefined;
        scholarshipPurposeSnapshot?: string | undefined;
        scholarshipReceivedAt?: any | undefined;
        scholarshipStatus?: string | undefined;
        sourceType?: string | undefined;
        status?: TransactionStatus | undefined;
        title?: string | undefined;
        transactionDate?: any | undefined;
        type?: TransactionType | undefined;
        updatedAt?: any | undefined;
        userId?: string | undefined;
        user?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
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
        dob?: any | undefined;
        email?: string | undefined;
        emergencyMobile?: string | undefined;
        extraEmail?: string | undefined;
        extraMobile?: string | undefined;
        firstName?: string | undefined;
        gender?: string | undefined;
        google_auth_id?: string | undefined;
        hasBusiness?: boolean | undefined;
        id?: string | undefined;
        isConfidential?: boolean | undefined;
        isFaculty?: boolean | undefined;
        isVerified?: boolean | undefined;
        lastName?: string | undefined;
        membershipYear?: number | undefined;
        metadata?: any | undefined;
        mobile?: string | undefined;
        nickName?: string | undefined;
        profileImage?: string | undefined;
        socialMedia?: any | undefined;
        updatedAt: any;
        whatsAppMobile?: string | undefined;
        companyInfo?:
          | Array<
              | {
                  __typename?: 'CompanyInfoBasic';
                  companyName: string;
                  id: string;
                  position?: string | undefined;
                  userId: string;
                }
              | undefined
            >
          | undefined;
        positions?:
          | Array<
              | {
                  __typename?: 'EffectivePosition';
                  assignmentId?: string | undefined;
                  code?: string | undefined;
                  name?: string | undefined;
                  termId?: string | undefined;
                  termName?: string | undefined;
                  validFrom?: any | undefined;
                  validUntil?: any | undefined;
                }
              | undefined
            >
          | undefined;
        role?:
          | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
          | undefined;
        roles?:
          | Array<
              | {
                  __typename?: 'EffectiveRole';
                  assignmentId?: string | undefined;
                  code?: string | undefined;
                  name?: string | undefined;
                  scopeBatch?: number | undefined;
                  scopeType?: string | undefined;
                  validFrom?: any | undefined;
                  validUntil?: any | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type DisputeMentorFundAllocationMutationVariables = Exact<{
  allocationId: Scalars['String']['input'];
  disputedAmount: Scalars['Float']['input'];
  reason: Scalars['String']['input'];
}>;

export type DisputeMentorFundAllocationMutation = {
  __typename?: 'Mutation';
  disputeMentorFundAllocation?:
    | {
        __typename?: 'MentorFundAllocationDispute';
        allocationId?: string | undefined;
        createdAt?: any | undefined;
        disputedAmount?: any | undefined;
        id?: string | undefined;
        raisedByUserId?: string | undefined;
        reason?: string | undefined;
        resolutionNote?: string | undefined;
        resolutionType?: string | undefined;
        status?: string | undefined;
      }
    | undefined;
};

export type FinalizeScholarshipDocumentUploadMutationVariables = Exact<{
  checksum?: InputMaybe<Scalars['String']['input']>;
  documentId: Scalars['String']['input'];
}>;

export type FinalizeScholarshipDocumentUploadMutation = {
  __typename?: 'Mutation';
  finalizeScholarshipDocumentUpload?:
    | {
        __typename?: 'ScholarshipDocument';
        applicationId?: string | undefined;
        category?: ScholarshipDocumentCategory | undefined;
        checksum?: string | undefined;
        claimedAmount?: any | undefined;
        createdAt?: any | undefined;
        description?: string | undefined;
        id?: string | undefined;
        mimeType?: string | undefined;
        originalFilename?: string | undefined;
        receiptDate?: any | undefined;
        sizeBytes?: number | undefined;
        status?: string | undefined;
        transactionId?: string | undefined;
        uploadedAt?: any | undefined;
        uploadedByUserId?: string | undefined;
        vendorName?: string | undefined;
      }
    | undefined;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type ForgotPasswordMutation = { __typename?: 'Mutation'; forgotPassword?: boolean | undefined };

export type GetPresignedUrlMutationVariables = Exact<{
  contentType: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
  imageCategory?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetPresignedUrlMutation = { __typename?: 'Mutation'; getPresignedUrl: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout?: string | undefined };

export type ManageScholarshipRefundCaseMutationVariables = Exact<{
  note?: InputMaybe<Scalars['String']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
  refundId: Scalars['String']['input'];
  status: Scalars['String']['input'];
}>;

export type ManageScholarshipRefundCaseMutation = {
  __typename?: 'Mutation';
  manageScholarshipRefundCase?:
    | {
        __typename?: 'ScholarshipRefund';
        beneficiaryRefundProofDocumentId?: string | undefined;
        beneficiaryUserId?: string | undefined;
        confirmedRefundAmount?: any | undefined;
        id?: string | undefined;
        linkedRefundTransactionId?: string | undefined;
        originalTransactionId?: string | undefined;
        refundPaymentReference?: string | undefined;
        requestedAmount?: any | undefined;
        status?: string | undefined;
        wrongDisbursementCaseId?: string | undefined;
      }
    | undefined;
};

export type MarkScholarshipWrongDisbursementMutationVariables = Exact<{
  affectedDocumentIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  disputedAmount: Scalars['Float']['input'];
  reason: Scalars['String']['input'];
  refundRequested?: InputMaybe<Scalars['Boolean']['input']>;
  requestedRefundAmount?: InputMaybe<Scalars['Float']['input']>;
  transactionId: Scalars['String']['input'];
}>;

export type MarkScholarshipWrongDisbursementMutation = {
  __typename?: 'Mutation';
  markScholarshipWrongDisbursement?:
    | {
        __typename?: 'ScholarshipWrongDisbursementCase';
        affectedDocumentIds?: Array<string | undefined> | undefined;
        applicationId?: string | undefined;
        beneficiaryResponse?: string | undefined;
        disputedAmount?: any | undefined;
        id?: string | undefined;
        originalTransactionId?: string | undefined;
        reason?: string | undefined;
        refundRequested?: boolean | undefined;
        reportedAt?: any | undefined;
        reportedByUserId?: string | undefined;
        requestedRefundAmount?: any | undefined;
        status?: string | undefined;
      }
    | undefined;
};

export type PublishEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
  status: EventStatus;
}>;

export type PublishEventMutation = { __typename?: 'Mutation'; publishEvent?: boolean | undefined };

export type ReassignScholarshipApplicationMutationVariables = Exact<{
  applicationId: Scalars['String']['input'];
  mentorUserId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
}>;

export type ReassignScholarshipApplicationMutation = {
  __typename?: 'Mutation';
  reassignScholarshipApplication?:
    | {
        __typename?: 'ScholarshipApplication';
        applicantUserId?: string | undefined;
        approvedAmountDisbursed?: any | undefined;
        approvedAt?: any | undefined;
        approvedByUserId?: string | undefined;
        approvedProofDays?: number | undefined;
        approvedTotalAmount?: any | undefined;
        assignedMentorUserId?: string | undefined;
        batchSnapshot?: number | undefined;
        beneficiaryUserId?: string | undefined;
        closedAt?: any | undefined;
        createdAt?: any | undefined;
        id?: string | undefined;
        lastActivityAt?: any | undefined;
        paymentMode?: ScholarshipPaymentMode | undefined;
        payoutMaskedSnapshot?: string | undefined;
        payoutMethod?: ScholarshipPayoutMethod | undefined;
        payoutSnapshot?: any | undefined;
        proofStatus?: string | undefined;
        proposedProofDays?: number | undefined;
        purpose?: string | undefined;
        reason?: string | undefined;
        referenceNumber?: string | undefined;
        refundStatus?: string | undefined;
        rejectedAt?: any | undefined;
        rejectedByUserId?: string | undefined;
        rejectionReason?: string | undefined;
        requestedAmount?: any | undefined;
        requestedFirstInstallmentAmount?: any | undefined;
        reviewStartedAt?: any | undefined;
        reviewedByUserId?: string | undefined;
        status?: ScholarshipApplicationStatus | undefined;
        submittedAt?: any | undefined;
        updatedAt?: any | undefined;
        assignedMentor?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
        beneficiary?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type RecordMentorFundAllocationMutationVariables = Exact<{
  input: RecordMentorFundAllocationInput;
}>;

export type RecordMentorFundAllocationMutation = {
  __typename?: 'Mutation';
  recordMentorFundAllocation?:
    | {
        __typename?: 'MentorFundAllocation';
        amount?: any | undefined;
        batch?: number | undefined;
        confirmedAmount?: any | undefined;
        createdAt?: any | undefined;
        currency?: string | undefined;
        disputedAmount?: any | undefined;
        id?: string | undefined;
        mentorUserId?: string | undefined;
        method?: string | undefined;
        notes?: string | undefined;
        recordedByUserId?: string | undefined;
        reference?: string | undefined;
        status?: string | undefined;
        transferDate?: any | undefined;
      }
    | undefined;
};

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
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type RejectMemberRegistrationMutationVariables = Exact<{
  reason: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;

export type RejectMemberRegistrationMutation = {
  __typename?: 'Mutation';
  rejectMemberRegistration?: boolean | undefined;
};

export type RejectScholarshipApplicationMutationVariables = Exact<{
  applicationId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
}>;

export type RejectScholarshipApplicationMutation = {
  __typename?: 'Mutation';
  rejectScholarshipApplication?:
    | {
        __typename?: 'ScholarshipApplication';
        applicantUserId?: string | undefined;
        approvedAmountDisbursed?: any | undefined;
        approvedAt?: any | undefined;
        approvedByUserId?: string | undefined;
        approvedProofDays?: number | undefined;
        approvedTotalAmount?: any | undefined;
        assignedMentorUserId?: string | undefined;
        batchSnapshot?: number | undefined;
        beneficiaryUserId?: string | undefined;
        closedAt?: any | undefined;
        createdAt?: any | undefined;
        id?: string | undefined;
        lastActivityAt?: any | undefined;
        paymentMode?: ScholarshipPaymentMode | undefined;
        payoutMaskedSnapshot?: string | undefined;
        payoutMethod?: ScholarshipPayoutMethod | undefined;
        payoutSnapshot?: any | undefined;
        proofStatus?: string | undefined;
        proposedProofDays?: number | undefined;
        purpose?: string | undefined;
        reason?: string | undefined;
        referenceNumber?: string | undefined;
        refundStatus?: string | undefined;
        rejectedAt?: any | undefined;
        rejectedByUserId?: string | undefined;
        rejectionReason?: string | undefined;
        requestedAmount?: any | undefined;
        requestedFirstInstallmentAmount?: any | undefined;
        reviewStartedAt?: any | undefined;
        reviewedByUserId?: string | undefined;
        status?: ScholarshipApplicationStatus | undefined;
        submittedAt?: any | undefined;
        updatedAt?: any | undefined;
        assignedMentor?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
        beneficiary?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
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

export type RequestChangesBlogMutationVariables = Exact<{
  adminRemark?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
}>;

export type RequestChangesBlogMutation = {
  __typename?: 'Mutation';
  requestChangesBlog?:
    | {
        __typename?: 'Blog';
        adminRemark?: string | undefined;
        authorId?: string | undefined;
        categoryId?: string | undefined;
        claps?: number | undefined;
        content?: string | undefined;
        cover?: any | undefined;
        createdAt: any;
        id: string;
        shortUrl?: string | undefined;
        slug?: string | undefined;
        status: BlogStatus;
        summary?: string | undefined;
        title: string;
        updatedAt: any;
        author?:
          | {
              __typename?: 'UserBasic';
              batch?: number | undefined;
              disabled?: boolean | undefined;
              dob?: any | undefined;
              firstName?: string | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              profileImage?: string | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
            }
          | undefined;
        comments?:
          | Array<
              | {
                  __typename?: 'Comment';
                  authorId?: string | undefined;
                  content?: string | undefined;
                  createdAt?: any | undefined;
                  id?: string | undefined;
                  isVerified?: boolean | undefined;
                  targetId?: string | undefined;
                  targetType?: CommentTargetType | undefined;
                  updatedAt?: any | undefined;
                  author?:
                    | {
                        __typename?: 'UserBasic';
                        batch?: number | undefined;
                        disabled?: boolean | undefined;
                        dob?: any | undefined;
                        firstName?: string | undefined;
                        id?: string | undefined;
                        isConfidential?: boolean | undefined;
                        isFaculty?: boolean | undefined;
                        isVerified?: boolean | undefined;
                        lastName?: string | undefined;
                        profileImage?: string | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type RequestScholarshipApplicationInfoMutationVariables = Exact<{
  applicationId: Scalars['String']['input'];
  message: Scalars['String']['input'];
}>;

export type RequestScholarshipApplicationInfoMutation = {
  __typename?: 'Mutation';
  requestScholarshipApplicationInfo?:
    | {
        __typename?: 'ScholarshipApplication';
        applicantUserId?: string | undefined;
        approvedAmountDisbursed?: any | undefined;
        approvedAt?: any | undefined;
        approvedByUserId?: string | undefined;
        approvedProofDays?: number | undefined;
        approvedTotalAmount?: any | undefined;
        assignedMentorUserId?: string | undefined;
        batchSnapshot?: number | undefined;
        beneficiaryUserId?: string | undefined;
        closedAt?: any | undefined;
        createdAt?: any | undefined;
        id?: string | undefined;
        lastActivityAt?: any | undefined;
        paymentMode?: ScholarshipPaymentMode | undefined;
        payoutMaskedSnapshot?: string | undefined;
        payoutMethod?: ScholarshipPayoutMethod | undefined;
        payoutSnapshot?: any | undefined;
        proofStatus?: string | undefined;
        proposedProofDays?: number | undefined;
        purpose?: string | undefined;
        reason?: string | undefined;
        referenceNumber?: string | undefined;
        refundStatus?: string | undefined;
        rejectedAt?: any | undefined;
        rejectedByUserId?: string | undefined;
        rejectionReason?: string | undefined;
        requestedAmount?: any | undefined;
        requestedFirstInstallmentAmount?: any | undefined;
        reviewStartedAt?: any | undefined;
        reviewedByUserId?: string | undefined;
        status?: ScholarshipApplicationStatus | undefined;
        submittedAt?: any | undefined;
        updatedAt?: any | undefined;
        assignedMentor?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
        beneficiary?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type RequestScholarshipDisbursalFollowupMutationVariables = Exact<{
  transactionId: Scalars['String']['input'];
}>;

export type RequestScholarshipDisbursalFollowupMutation = {
  __typename?: 'Mutation';
  requestScholarshipDisbursalFollowup?: boolean | undefined;
};

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  token?: InputMaybe<Scalars['String']['input']>;
}>;

export type ResetPasswordMutation = { __typename?: 'Mutation'; resetPassword?: boolean | undefined };

export type ResolveMentorAllocationDisputeMutationVariables = Exact<{
  disputeId: Scalars['String']['input'];
  resolutionNote?: InputMaybe<Scalars['String']['input']>;
  resolutionType: Scalars['String']['input'];
}>;

export type ResolveMentorAllocationDisputeMutation = {
  __typename?: 'Mutation';
  resolveMentorAllocationDispute?:
    | {
        __typename?: 'MentorFundAllocationDispute';
        allocationId?: string | undefined;
        createdAt?: any | undefined;
        disputedAmount?: any | undefined;
        id?: string | undefined;
        raisedByUserId?: string | undefined;
        reason?: string | undefined;
        resolutionNote?: string | undefined;
        resolutionType?: string | undefined;
        status?: string | undefined;
      }
    | undefined;
};

export type RespondToScholarshipRefundMutationVariables = Exact<{
  proofDocumentId?: InputMaybe<Scalars['String']['input']>;
  refundId: Scalars['String']['input'];
  response: Scalars['String']['input'];
}>;

export type RespondToScholarshipRefundMutation = {
  __typename?: 'Mutation';
  respondToScholarshipRefund?:
    | {
        __typename?: 'ScholarshipRefund';
        beneficiaryRefundProofDocumentId?: string | undefined;
        beneficiaryUserId?: string | undefined;
        confirmedRefundAmount?: any | undefined;
        id?: string | undefined;
        linkedRefundTransactionId?: string | undefined;
        originalTransactionId?: string | undefined;
        refundPaymentReference?: string | undefined;
        requestedAmount?: any | undefined;
        status?: string | undefined;
        wrongDisbursementCaseId?: string | undefined;
      }
    | undefined;
};

export type ResubmitScholarshipApplicationMutationVariables = Exact<{
  applicationId: Scalars['String']['input'];
}>;

export type ResubmitScholarshipApplicationMutation = {
  __typename?: 'Mutation';
  resubmitScholarshipApplication?:
    | {
        __typename?: 'ScholarshipApplication';
        applicantUserId?: string | undefined;
        approvedAmountDisbursed?: any | undefined;
        approvedAt?: any | undefined;
        approvedByUserId?: string | undefined;
        approvedProofDays?: number | undefined;
        approvedTotalAmount?: any | undefined;
        assignedMentorUserId?: string | undefined;
        batchSnapshot?: number | undefined;
        beneficiaryUserId?: string | undefined;
        closedAt?: any | undefined;
        createdAt?: any | undefined;
        id?: string | undefined;
        lastActivityAt?: any | undefined;
        paymentMode?: ScholarshipPaymentMode | undefined;
        payoutMaskedSnapshot?: string | undefined;
        payoutMethod?: ScholarshipPayoutMethod | undefined;
        payoutSnapshot?: any | undefined;
        proofStatus?: string | undefined;
        proposedProofDays?: number | undefined;
        purpose?: string | undefined;
        reason?: string | undefined;
        referenceNumber?: string | undefined;
        refundStatus?: string | undefined;
        rejectedAt?: any | undefined;
        rejectedByUserId?: string | undefined;
        rejectionReason?: string | undefined;
        requestedAmount?: any | undefined;
        requestedFirstInstallmentAmount?: any | undefined;
        reviewStartedAt?: any | undefined;
        reviewedByUserId?: string | undefined;
        status?: ScholarshipApplicationStatus | undefined;
        submittedAt?: any | undefined;
        updatedAt?: any | undefined;
        assignedMentor?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
        beneficiary?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type ReviewScholarshipUsageProofMutationVariables = Exact<{
  action: ScholarshipProofReviewAction;
  note?: InputMaybe<Scalars['String']['input']>;
  submissionId: Scalars['String']['input'];
}>;

export type ReviewScholarshipUsageProofMutation = {
  __typename?: 'Mutation';
  reviewScholarshipUsageProof?:
    | {
        __typename?: 'ScholarshipReceiptSubmission';
        applicationId?: string | undefined;
        id?: string | undefined;
        reviewNote?: string | undefined;
        reviewedAt?: any | undefined;
        reviewedByUserId?: string | undefined;
        status?: string | undefined;
        submissionSequence?: number | undefined;
        submittedAt?: any | undefined;
        submittedByUserId?: string | undefined;
        submittedCoverage?: any | undefined;
        transactionId?: string | undefined;
      }
    | undefined;
};

export type RevokeExecutivePositionMutationVariables = Exact<{
  input: RevokeExecutivePositionInput;
}>;

export type RevokeExecutivePositionMutation = {
  __typename?: 'Mutation';
  revokeExecutivePosition?:
    | {
        __typename?: 'ExecutivePositionAssignment';
        assignedByUserId?: string | undefined;
        assignmentReason?: string | undefined;
        createdAt?: any | undefined;
        executiveTermId?: string | undefined;
        id?: string | undefined;
        positionId?: string | undefined;
        revocationReason?: string | undefined;
        revokedAt?: any | undefined;
        revokedByUserId?: string | undefined;
        updatedAt?: any | undefined;
        userId?: string | undefined;
        validFrom?: any | undefined;
        validUntil?: any | undefined;
        executiveTerm?:
          | {
              __typename?: 'ExecutiveTerm';
              createdAt?: any | undefined;
              createdByUserId?: string | undefined;
              endDate?: any | undefined;
              id?: string | undefined;
              name?: string | undefined;
              startDate?: any | undefined;
              status?: ExecutiveTermStatus | undefined;
              updatedAt?: any | undefined;
            }
          | undefined;
        position?:
          | {
              __typename?: 'ExecutivePosition';
              code?: string | undefined;
              createdAt?: any | undefined;
              id?: string | undefined;
              isActive?: boolean | undefined;
              isSingleSeat?: boolean | undefined;
              name?: string | undefined;
              updatedAt?: any | undefined;
            }
          | undefined;
        user?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type RevokeUserRoleMutationVariables = Exact<{
  input: RevokeUserRoleInput;
}>;

export type RevokeUserRoleMutation = {
  __typename?: 'Mutation';
  revokeUserRole?:
    | {
        __typename?: 'RoleAssignment';
        assignedByUserId?: string | undefined;
        assignmentReason?: string | undefined;
        createdAt?: any | undefined;
        id?: string | undefined;
        revocationReason?: string | undefined;
        revokedAt?: any | undefined;
        revokedByUserId?: string | undefined;
        roleId?: string | undefined;
        scopeBatch?: number | undefined;
        scopeType?: AccessScopeType | undefined;
        updatedAt?: any | undefined;
        userId?: string | undefined;
        validFrom?: any | undefined;
        validUntil?: any | undefined;
        role?:
          | {
              __typename?: 'AccessRole';
              code?: string | undefined;
              description?: string | undefined;
              id?: string | undefined;
              isActive?: boolean | undefined;
              isSystem?: boolean | undefined;
              name?: string | undefined;
            }
          | undefined;
        user?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type SendMassEmailMutationVariables = Exact<{
  context?: InputMaybe<Scalars['JSON']['input']>;
  subject: Scalars['String']['input'];
  template: Scalars['String']['input'];
}>;

export type SendMassEmailMutation = { __typename?: 'Mutation'; sendMassEmail?: boolean | undefined };

export type SetScholarshipPrimaryMentorMutationVariables = Exact<{
  batch: Scalars['Int']['input'];
  mentorUserId: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  validFrom?: InputMaybe<Scalars['String']['input']>;
  validUntil?: InputMaybe<Scalars['String']['input']>;
}>;

export type SetScholarshipPrimaryMentorMutation = {
  __typename?: 'Mutation';
  setScholarshipPrimaryMentor?:
    | {
        __typename?: 'ScholarshipApplication';
        applicantUserId?: string | undefined;
        approvedAmountDisbursed?: any | undefined;
        approvedAt?: any | undefined;
        approvedByUserId?: string | undefined;
        approvedProofDays?: number | undefined;
        approvedTotalAmount?: any | undefined;
        assignedMentorUserId?: string | undefined;
        batchSnapshot?: number | undefined;
        beneficiaryUserId?: string | undefined;
        closedAt?: any | undefined;
        createdAt?: any | undefined;
        id?: string | undefined;
        lastActivityAt?: any | undefined;
        paymentMode?: ScholarshipPaymentMode | undefined;
        payoutMaskedSnapshot?: string | undefined;
        payoutMethod?: ScholarshipPayoutMethod | undefined;
        payoutSnapshot?: any | undefined;
        proofStatus?: string | undefined;
        proposedProofDays?: number | undefined;
        purpose?: string | undefined;
        reason?: string | undefined;
        referenceNumber?: string | undefined;
        refundStatus?: string | undefined;
        rejectedAt?: any | undefined;
        rejectedByUserId?: string | undefined;
        rejectionReason?: string | undefined;
        requestedAmount?: any | undefined;
        requestedFirstInstallmentAmount?: any | undefined;
        reviewStartedAt?: any | undefined;
        reviewedByUserId?: string | undefined;
        status?: ScholarshipApplicationStatus | undefined;
        submittedAt?: any | undefined;
        updatedAt?: any | undefined;
        assignedMentor?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
        beneficiary?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

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
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
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
  isFaculty?: InputMaybe<Scalars['Boolean']['input']>;
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
        dob?: any | undefined;
        email?: string | undefined;
        emergencyMobile?: string | undefined;
        extraEmail?: string | undefined;
        extraMobile?: string | undefined;
        firstName?: string | undefined;
        gender?: string | undefined;
        google_auth_id?: string | undefined;
        hasBusiness?: boolean | undefined;
        id?: string | undefined;
        isConfidential?: boolean | undefined;
        isFaculty?: boolean | undefined;
        isVerified?: boolean | undefined;
        lastName?: string | undefined;
        membershipYear?: number | undefined;
        metadata?: any | undefined;
        mobile?: string | undefined;
        nickName?: string | undefined;
        profileImage?: string | undefined;
        socialMedia?: any | undefined;
        updatedAt: any;
        whatsAppMobile?: string | undefined;
        companyInfo?:
          | Array<
              | {
                  __typename?: 'CompanyInfoBasic';
                  companyName: string;
                  id: string;
                  position?: string | undefined;
                  userId: string;
                }
              | undefined
            >
          | undefined;
        positions?:
          | Array<
              | {
                  __typename?: 'EffectivePosition';
                  assignmentId?: string | undefined;
                  code?: string | undefined;
                  name?: string | undefined;
                  termId?: string | undefined;
                  termName?: string | undefined;
                  validFrom?: any | undefined;
                  validUntil?: any | undefined;
                }
              | undefined
            >
          | undefined;
        role?:
          | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
          | undefined;
        roles?:
          | Array<
              | {
                  __typename?: 'EffectiveRole';
                  assignmentId?: string | undefined;
                  code?: string | undefined;
                  name?: string | undefined;
                  scopeBatch?: number | undefined;
                  scopeType?: string | undefined;
                  validFrom?: any | undefined;
                  validUntil?: any | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type StartScholarshipApplicationReviewMutationVariables = Exact<{
  applicationId: Scalars['String']['input'];
}>;

export type StartScholarshipApplicationReviewMutation = {
  __typename?: 'Mutation';
  startScholarshipApplicationReview?:
    | {
        __typename?: 'ScholarshipApplication';
        applicantUserId?: string | undefined;
        approvedAmountDisbursed?: any | undefined;
        approvedAt?: any | undefined;
        approvedByUserId?: string | undefined;
        approvedProofDays?: number | undefined;
        approvedTotalAmount?: any | undefined;
        assignedMentorUserId?: string | undefined;
        batchSnapshot?: number | undefined;
        beneficiaryUserId?: string | undefined;
        closedAt?: any | undefined;
        createdAt?: any | undefined;
        id?: string | undefined;
        lastActivityAt?: any | undefined;
        paymentMode?: ScholarshipPaymentMode | undefined;
        payoutMaskedSnapshot?: string | undefined;
        payoutMethod?: ScholarshipPayoutMethod | undefined;
        payoutSnapshot?: any | undefined;
        proofStatus?: string | undefined;
        proposedProofDays?: number | undefined;
        purpose?: string | undefined;
        reason?: string | undefined;
        referenceNumber?: string | undefined;
        refundStatus?: string | undefined;
        rejectedAt?: any | undefined;
        rejectedByUserId?: string | undefined;
        rejectionReason?: string | undefined;
        requestedAmount?: any | undefined;
        requestedFirstInstallmentAmount?: any | undefined;
        reviewStartedAt?: any | undefined;
        reviewedByUserId?: string | undefined;
        status?: ScholarshipApplicationStatus | undefined;
        submittedAt?: any | undefined;
        updatedAt?: any | undefined;
        assignedMentor?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
        beneficiary?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type SubmitScholarshipApplicationMutationVariables = Exact<{
  applicationId: Scalars['String']['input'];
}>;

export type SubmitScholarshipApplicationMutation = {
  __typename?: 'Mutation';
  submitScholarshipApplication?:
    | {
        __typename?: 'ScholarshipApplication';
        applicantUserId?: string | undefined;
        approvedAmountDisbursed?: any | undefined;
        approvedAt?: any | undefined;
        approvedByUserId?: string | undefined;
        approvedProofDays?: number | undefined;
        approvedTotalAmount?: any | undefined;
        assignedMentorUserId?: string | undefined;
        batchSnapshot?: number | undefined;
        beneficiaryUserId?: string | undefined;
        closedAt?: any | undefined;
        createdAt?: any | undefined;
        id?: string | undefined;
        lastActivityAt?: any | undefined;
        paymentMode?: ScholarshipPaymentMode | undefined;
        payoutMaskedSnapshot?: string | undefined;
        payoutMethod?: ScholarshipPayoutMethod | undefined;
        payoutSnapshot?: any | undefined;
        proofStatus?: string | undefined;
        proposedProofDays?: number | undefined;
        purpose?: string | undefined;
        reason?: string | undefined;
        referenceNumber?: string | undefined;
        refundStatus?: string | undefined;
        rejectedAt?: any | undefined;
        rejectedByUserId?: string | undefined;
        rejectionReason?: string | undefined;
        requestedAmount?: any | undefined;
        requestedFirstInstallmentAmount?: any | undefined;
        reviewStartedAt?: any | undefined;
        reviewedByUserId?: string | undefined;
        status?: ScholarshipApplicationStatus | undefined;
        submittedAt?: any | undefined;
        updatedAt?: any | undefined;
        assignedMentor?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
        beneficiary?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type SubmitScholarshipUsageProofMutationVariables = Exact<{
  documentIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
  transactionId: Scalars['String']['input'];
}>;

export type SubmitScholarshipUsageProofMutation = {
  __typename?: 'Mutation';
  submitScholarshipUsageProof?:
    | {
        __typename?: 'ScholarshipReceiptSubmission';
        applicationId?: string | undefined;
        id?: string | undefined;
        reviewNote?: string | undefined;
        reviewedAt?: any | undefined;
        reviewedByUserId?: string | undefined;
        status?: string | undefined;
        submissionSequence?: number | undefined;
        submittedAt?: any | undefined;
        submittedByUserId?: string | undefined;
        submittedCoverage?: any | undefined;
        transactionId?: string | undefined;
      }
    | undefined;
};

export type UpdateAddressMutationVariables = Exact<{
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
}>;

export type UpdateAddressMutation = {
  __typename?: 'Mutation';
  updateAddress?:
    | {
        __typename?: 'Address';
        address?: string | undefined;
        city?: string | undefined;
        country?: string | undefined;
        id: string;
        postalCode?: string | undefined;
        state?: string | undefined;
        type: string;
        userId: string;
      }
    | undefined;
};

export type UpdateAlbumMutationVariables = Exact<{
  albumId: Scalars['String']['input'];
  coverImage?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateAlbumMutation = {
  __typename?: 'Mutation';
  updateAlbum?:
    | {
        __typename?: 'Album';
        coverImage?: string | undefined;
        createdAt?: any | undefined;
        description?: string | undefined;
        id?: string | undefined;
        title?: string | undefined;
        total_photos?: number | undefined;
        updatedAt?: any | undefined;
        contributors?:
          | Array<
              | {
                  __typename?: 'UserBasic';
                  batch?: number | undefined;
                  disabled?: boolean | undefined;
                  dob?: any | undefined;
                  firstName?: string | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  profileImage?: string | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
        creator?:
          | {
              __typename?: 'UserBasic';
              batch?: number | undefined;
              disabled?: boolean | undefined;
              dob?: any | undefined;
              firstName?: string | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              profileImage?: string | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
            }
          | undefined;
        event?:
          | {
              __typename?: 'EventBasic';
              adminRemark?: string | undefined;
              category?: string | undefined;
              cover?: any | undefined;
              createdBy?: string | undefined;
              description?: string | undefined;
              endDate?: any | undefined;
              id: number;
              image?: string | undefined;
              isGoing?: boolean | undefined;
              location?: string | undefined;
              medium: string;
              shortUrl?: string | undefined;
              startDate: any;
              status?: EventStatus | undefined;
              summary: string;
              tags?: Array<string | undefined> | undefined;
              title: string;
              total_attendies?: number | undefined;
            }
          | undefined;
        photos?:
          | Array<
              | {
                  __typename?: 'Photo';
                  altDescription?: string | undefined;
                  caption?: string | undefined;
                  id?: string | undefined;
                  thumbUrl?: string | undefined;
                  uploadedAt?: any | undefined;
                  url?: string | undefined;
                  album?:
                    | {
                        __typename?: 'AlbumBasic';
                        coverImage?: string | undefined;
                        createdAt?: any | undefined;
                        description?: string | undefined;
                        id?: string | undefined;
                        title?: string | undefined;
                        total_photos?: number | undefined;
                        updatedAt?: any | undefined;
                        contributors?:
                          | Array<
                              | {
                                  __typename?: 'UserBasic';
                                  batch?: number | undefined;
                                  disabled?: boolean | undefined;
                                  dob?: any | undefined;
                                  firstName?: string | undefined;
                                  id?: string | undefined;
                                  isConfidential?: boolean | undefined;
                                  isFaculty?: boolean | undefined;
                                  isVerified?: boolean | undefined;
                                  lastName?: string | undefined;
                                  profileImage?: string | undefined;
                                }
                              | undefined
                            >
                          | undefined;
                        creator?:
                          | {
                              __typename?: 'UserBasic';
                              batch?: number | undefined;
                              disabled?: boolean | undefined;
                              dob?: any | undefined;
                              firstName?: string | undefined;
                              id?: string | undefined;
                              isConfidential?: boolean | undefined;
                              isFaculty?: boolean | undefined;
                              isVerified?: boolean | undefined;
                              lastName?: string | undefined;
                              profileImage?: string | undefined;
                            }
                          | undefined;
                        event?:
                          | {
                              __typename?: 'EventBasic';
                              adminRemark?: string | undefined;
                              category?: string | undefined;
                              cover?: any | undefined;
                              createdBy?: string | undefined;
                              description?: string | undefined;
                              endDate?: any | undefined;
                              id: number;
                              image?: string | undefined;
                              isGoing?: boolean | undefined;
                              location?: string | undefined;
                              medium: string;
                              shortUrl?: string | undefined;
                              startDate: any;
                              status?: EventStatus | undefined;
                              summary: string;
                              tags?: Array<string | undefined> | undefined;
                              title: string;
                              total_attendies?: number | undefined;
                            }
                          | undefined;
                      }
                    | undefined;
                  crdits?:
                    | {
                        __typename?: 'PhotoCredit';
                        license_type?: string | undefined;
                        name?: string | undefined;
                        source?: string | undefined;
                        source_url?: string | undefined;
                        url?: string | undefined;
                      }
                    | undefined;
                  uploader?:
                    | {
                        __typename?: 'User';
                        aboutMe?: string | undefined;
                        batch?: number | undefined;
                        createdAt: any;
                        disabled?: boolean | undefined;
                        displayName?: string | undefined;
                        dob?: any | undefined;
                        email?: string | undefined;
                        emergencyMobile?: string | undefined;
                        extraEmail?: string | undefined;
                        extraMobile?: string | undefined;
                        firstName?: string | undefined;
                        gender?: string | undefined;
                        google_auth_id?: string | undefined;
                        hasBusiness?: boolean | undefined;
                        id?: string | undefined;
                        isConfidential?: boolean | undefined;
                        isFaculty?: boolean | undefined;
                        isVerified?: boolean | undefined;
                        lastName?: string | undefined;
                        membershipYear?: number | undefined;
                        metadata?: any | undefined;
                        mobile?: string | undefined;
                        nickName?: string | undefined;
                        profileImage?: string | undefined;
                        socialMedia?: any | undefined;
                        updatedAt: any;
                        whatsAppMobile?: string | undefined;
                        companyInfo?:
                          | Array<
                              | {
                                  __typename?: 'CompanyInfoBasic';
                                  companyName: string;
                                  id: string;
                                  position?: string | undefined;
                                  userId: string;
                                }
                              | undefined
                            >
                          | undefined;
                        positions?:
                          | Array<
                              | {
                                  __typename?: 'EffectivePosition';
                                  assignmentId?: string | undefined;
                                  code?: string | undefined;
                                  name?: string | undefined;
                                  termId?: string | undefined;
                                  termName?: string | undefined;
                                  validFrom?: any | undefined;
                                  validUntil?: any | undefined;
                                }
                              | undefined
                            >
                          | undefined;
                        role?:
                          | {
                              __typename?: 'Role';
                              code?: string | undefined;
                              id?: string | undefined;
                              name?: string | undefined;
                            }
                          | undefined;
                        roles?:
                          | Array<
                              | {
                                  __typename?: 'EffectiveRole';
                                  assignmentId?: string | undefined;
                                  code?: string | undefined;
                                  name?: string | undefined;
                                  scopeBatch?: number | undefined;
                                  scopeType?: string | undefined;
                                  validFrom?: any | undefined;
                                  validUntil?: any | undefined;
                                }
                              | undefined
                            >
                          | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
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
        assignedAt?: any | undefined;
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
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type UpdateBlogMutationVariables = Exact<{
  content?: InputMaybe<Scalars['String']['input']>;
  cover?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['String']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<BlogStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateBlogMutation = {
  __typename?: 'Mutation';
  updateBlog?:
    | {
        __typename?: 'Blog';
        adminRemark?: string | undefined;
        authorId?: string | undefined;
        categoryId?: string | undefined;
        claps?: number | undefined;
        content?: string | undefined;
        cover?: any | undefined;
        createdAt: any;
        id: string;
        shortUrl?: string | undefined;
        slug?: string | undefined;
        status: BlogStatus;
        summary?: string | undefined;
        title: string;
        updatedAt: any;
        author?:
          | {
              __typename?: 'UserBasic';
              batch?: number | undefined;
              disabled?: boolean | undefined;
              dob?: any | undefined;
              firstName?: string | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              profileImage?: string | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
            }
          | undefined;
        comments?:
          | Array<
              | {
                  __typename?: 'Comment';
                  authorId?: string | undefined;
                  content?: string | undefined;
                  createdAt?: any | undefined;
                  id?: string | undefined;
                  isVerified?: boolean | undefined;
                  targetId?: string | undefined;
                  targetType?: CommentTargetType | undefined;
                  updatedAt?: any | undefined;
                  author?:
                    | {
                        __typename?: 'UserBasic';
                        batch?: number | undefined;
                        disabled?: boolean | undefined;
                        dob?: any | undefined;
                        firstName?: string | undefined;
                        id?: string | undefined;
                        isConfidential?: boolean | undefined;
                        isFaculty?: boolean | undefined;
                        isVerified?: boolean | undefined;
                        lastName?: string | undefined;
                        profileImage?: string | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type UpdateBusinessMutationVariables = Exact<{
  body: UpdateBusinessInput;
  id: Scalars['String']['input'];
}>;

export type UpdateBusinessMutation = {
  __typename?: 'Mutation';
  updateBusiness: {
    __typename?: 'Business';
    address?: string | undefined;
    category: string;
    city?: string | undefined;
    country?: string | undefined;
    createdAt: any;
    description: string;
    email?: string | undefined;
    googleReviews?: number | undefined;
    id: string;
    isVerified: boolean;
    logoUrl?: string | undefined;
    name: string;
    phone?: string | undefined;
    postalCode?: string | undefined;
    socialMedia?: any | undefined;
    state?: string | undefined;
    tags?: Array<string> | undefined;
    updatedAt: any;
    userId: string;
    website?: string | undefined;
    user?:
      | {
          __typename?: 'UserBasic';
          batch?: number | undefined;
          disabled?: boolean | undefined;
          dob?: any | undefined;
          firstName?: string | undefined;
          id?: string | undefined;
          isConfidential?: boolean | undefined;
          isFaculty?: boolean | undefined;
          isVerified?: boolean | undefined;
          lastName?: string | undefined;
          profileImage?: string | undefined;
          role?:
            | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
            | undefined;
        }
      | undefined;
  };
};

export type UpdateClapsMutationVariables = Exact<{
  claps: Scalars['Int']['input'];
  slug: Scalars['String']['input'];
}>;

export type UpdateClapsMutation = { __typename?: 'Mutation'; updateClaps?: boolean | undefined };

export type UpdateCompanyInfoMutationVariables = Exact<{
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  endedWorking?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isCurrent?: InputMaybe<Scalars['Boolean']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  startedWorking?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateCompanyInfoMutation = {
  __typename?: 'Mutation';
  updateCompanyInfo?:
    | {
        __typename?: 'CompanyInfo';
        address?: string | undefined;
        city?: string | undefined;
        companyName: string;
        country?: string | undefined;
        createdAt?: any | undefined;
        endedWorking?: any | undefined;
        id: string;
        isCurrent: boolean;
        position?: string | undefined;
        startedWorking?: any | undefined;
        state?: string | undefined;
        updatedAt?: any | undefined;
        userId: string;
        user?:
          | {
              __typename?: 'UserBasic';
              batch?: number | undefined;
              disabled?: boolean | undefined;
              dob?: any | undefined;
              firstName?: string | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              profileImage?: string | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type UpdateEventMutationVariables = Exact<{
  category: Scalars['String']['input'];
  cover?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['Int']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  medium: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  startDate: Scalars['String']['input'];
  status?: InputMaybe<EventStatus>;
  summary: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  title: Scalars['String']['input'];
}>;

export type UpdateEventMutation = {
  __typename?: 'Mutation';
  updateEvent?:
    | {
        __typename?: 'EventBasic';
        adminRemark?: string | undefined;
        category?: string | undefined;
        cover?: any | undefined;
        createdBy?: string | undefined;
        description?: string | undefined;
        endDate?: any | undefined;
        id: number;
        image?: string | undefined;
        isGoing?: boolean | undefined;
        location?: string | undefined;
        medium: string;
        shortUrl?: string | undefined;
        startDate: any;
        status?: EventStatus | undefined;
        summary: string;
        tags?: Array<string | undefined> | undefined;
        title: string;
        total_attendies?: number | undefined;
      }
    | undefined;
};

export type UpdateScholarshipApplicationDraftMutationVariables = Exact<{
  applicationId: Scalars['String']['input'];
  input: ScholarshipApplicationInput;
}>;

export type UpdateScholarshipApplicationDraftMutation = {
  __typename?: 'Mutation';
  updateScholarshipApplicationDraft?:
    | {
        __typename?: 'ScholarshipApplication';
        applicantUserId?: string | undefined;
        approvedAmountDisbursed?: any | undefined;
        approvedAt?: any | undefined;
        approvedByUserId?: string | undefined;
        approvedProofDays?: number | undefined;
        approvedTotalAmount?: any | undefined;
        assignedMentorUserId?: string | undefined;
        batchSnapshot?: number | undefined;
        beneficiaryUserId?: string | undefined;
        closedAt?: any | undefined;
        createdAt?: any | undefined;
        id?: string | undefined;
        lastActivityAt?: any | undefined;
        paymentMode?: ScholarshipPaymentMode | undefined;
        payoutMaskedSnapshot?: string | undefined;
        payoutMethod?: ScholarshipPayoutMethod | undefined;
        payoutSnapshot?: any | undefined;
        proofStatus?: string | undefined;
        proposedProofDays?: number | undefined;
        purpose?: string | undefined;
        reason?: string | undefined;
        referenceNumber?: string | undefined;
        refundStatus?: string | undefined;
        rejectedAt?: any | undefined;
        rejectedByUserId?: string | undefined;
        rejectionReason?: string | undefined;
        requestedAmount?: any | undefined;
        requestedFirstInstallmentAmount?: any | undefined;
        reviewStartedAt?: any | undefined;
        reviewedByUserId?: string | undefined;
        status?: ScholarshipApplicationStatus | undefined;
        submittedAt?: any | undefined;
        updatedAt?: any | undefined;
        assignedMentor?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
        beneficiary?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type UpdateTransactionMutationVariables = Exact<{
  id: Scalars['String']['input'];
  status: TransactionStatus;
}>;

export type UpdateTransactionMutation = {
  __typename?: 'Mutation';
  updateTransaction?:
    | {
        __typename?: 'Transaction';
        amount?: any | undefined;
        createdAt?: any | undefined;
        currency?: Currency | undefined;
        description?: string | undefined;
        id?: string | undefined;
        isDonation?: boolean | undefined;
        method?: string | undefined;
        referenceId?: string | undefined;
        scholarshipApplicationId?: string | undefined;
        scholarshipApprovedAt?: any | undefined;
        scholarshipBatchSnapshot?: number | undefined;
        scholarshipBeneficiaryUserId?: string | undefined;
        scholarshipCompletedAt?: any | undefined;
        scholarshipConfirmedAmount?: any | undefined;
        scholarshipConfirmedAt?: any | undefined;
        scholarshipImmutableAt?: any | undefined;
        scholarshipInstallmentSequence?: number | undefined;
        scholarshipMaskedPayoutDestination?: string | undefined;
        scholarshipMentorUserId?: string | undefined;
        scholarshipOriginalTransactionId?: string | undefined;
        scholarshipPayoutMethod?: string | undefined;
        scholarshipProofDueAt?: any | undefined;
        scholarshipProofDueDays?: number | undefined;
        scholarshipProofStatus?: string | undefined;
        scholarshipPurposeSnapshot?: string | undefined;
        scholarshipReceivedAt?: any | undefined;
        scholarshipStatus?: string | undefined;
        sourceType?: string | undefined;
        status?: TransactionStatus | undefined;
        title?: string | undefined;
        transactionDate?: any | undefined;
        type?: TransactionType | undefined;
        updatedAt?: any | undefined;
        userId?: string | undefined;
        user?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
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
  extraMobile?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isConfidential?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  nickName?: InputMaybe<Scalars['String']['input']>;
  profileImage?: InputMaybe<Scalars['String']['input']>;
  sociaMedia?: InputMaybe<Scalars['JSON']['input']>;
  whatsAppMobile?: InputMaybe<Scalars['String']['input']>;
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
        dob?: any | undefined;
        email?: string | undefined;
        emergencyMobile?: string | undefined;
        extraEmail?: string | undefined;
        extraMobile?: string | undefined;
        firstName?: string | undefined;
        gender?: string | undefined;
        google_auth_id?: string | undefined;
        hasBusiness?: boolean | undefined;
        id?: string | undefined;
        isConfidential?: boolean | undefined;
        isFaculty?: boolean | undefined;
        isVerified?: boolean | undefined;
        lastName?: string | undefined;
        membershipYear?: number | undefined;
        metadata?: any | undefined;
        mobile?: string | undefined;
        nickName?: string | undefined;
        profileImage?: string | undefined;
        socialMedia?: any | undefined;
        updatedAt: any;
        whatsAppMobile?: string | undefined;
        companyInfo?:
          | Array<
              | {
                  __typename?: 'CompanyInfoBasic';
                  companyName: string;
                  id: string;
                  position?: string | undefined;
                  userId: string;
                }
              | undefined
            >
          | undefined;
        positions?:
          | Array<
              | {
                  __typename?: 'EffectivePosition';
                  assignmentId?: string | undefined;
                  code?: string | undefined;
                  name?: string | undefined;
                  termId?: string | undefined;
                  termName?: string | undefined;
                  validFrom?: any | undefined;
                  validUntil?: any | undefined;
                }
              | undefined
            >
          | undefined;
        role?:
          | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
          | undefined;
        roles?:
          | Array<
              | {
                  __typename?: 'EffectiveRole';
                  assignmentId?: string | undefined;
                  code?: string | undefined;
                  name?: string | undefined;
                  scopeBatch?: number | undefined;
                  scopeType?: string | undefined;
                  validFrom?: any | undefined;
                  validUntil?: any | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type UpsertMultipleAddressesMutationVariables = Exact<{
  updates: Array<AddressInput> | AddressInput;
}>;

export type UpsertMultipleAddressesMutation = {
  __typename?: 'Mutation';
  upsertMultipleAddresses?:
    | Array<
        | {
            __typename?: 'Address';
            address?: string | undefined;
            city?: string | undefined;
            country?: string | undefined;
            id: string;
            postalCode?: string | undefined;
            state?: string | undefined;
            type: string;
            userId: string;
          }
        | undefined
      >
    | undefined;
};

export type VerifyBusinessMutationVariables = Exact<{
  id: Scalars['String']['input'];
  isVerified: Scalars['Boolean']['input'];
}>;

export type VerifyBusinessMutation = {
  __typename?: 'Mutation';
  verifyBusiness: {
    __typename?: 'Business';
    address?: string | undefined;
    category: string;
    city?: string | undefined;
    country?: string | undefined;
    createdAt: any;
    description: string;
    email?: string | undefined;
    googleReviews?: number | undefined;
    id: string;
    isVerified: boolean;
    logoUrl?: string | undefined;
    name: string;
    phone?: string | undefined;
    postalCode?: string | undefined;
    socialMedia?: any | undefined;
    state?: string | undefined;
    tags?: Array<string> | undefined;
    updatedAt: any;
    userId: string;
    website?: string | undefined;
    user?:
      | {
          __typename?: 'UserBasic';
          batch?: number | undefined;
          disabled?: boolean | undefined;
          dob?: any | undefined;
          firstName?: string | undefined;
          id?: string | undefined;
          isConfidential?: boolean | undefined;
          isFaculty?: boolean | undefined;
          isVerified?: boolean | undefined;
          lastName?: string | undefined;
          profileImage?: string | undefined;
          role?:
            | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
            | undefined;
        }
      | undefined;
  };
};

export type VerifyEventMutationVariables = Exact<{
  adminRemark?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['Int']['input'];
  status: EventStatus;
}>;

export type VerifyEventMutation = { __typename?: 'Mutation'; verifyEvent?: boolean | undefined };

export type VerifyUserMutationVariables = Exact<{
  user_id: Scalars['String']['input'];
  verified: Scalars['Boolean']['input'];
}>;

export type VerifyUserMutation = { __typename?: 'Mutation'; verifyUser?: boolean | undefined };

export type GetCompanyInfoListByUserQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetCompanyInfoListByUserQuery = {
  __typename?: 'Query';
  GetCompanyInfoListByUser: Array<{
    __typename?: 'CompanyInfo';
    address?: string | undefined;
    city?: string | undefined;
    companyName: string;
    country?: string | undefined;
    createdAt?: any | undefined;
    endedWorking?: any | undefined;
    id: string;
    isCurrent: boolean;
    position?: string | undefined;
    startedWorking?: any | undefined;
    state?: string | undefined;
    updatedAt?: any | undefined;
    userId: string;
    user?:
      | {
          __typename?: 'UserBasic';
          batch?: number | undefined;
          disabled?: boolean | undefined;
          dob?: any | undefined;
          firstName?: string | undefined;
          id?: string | undefined;
          isConfidential?: boolean | undefined;
          isFaculty?: boolean | undefined;
          isVerified?: boolean | undefined;
          lastName?: string | undefined;
          profileImage?: string | undefined;
          role?:
            | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
            | undefined;
        }
      | undefined;
  }>;
};

export type AccessAuditEventsQueryVariables = Exact<{ [key: string]: never }>;

export type AccessAuditEventsQuery = {
  __typename?: 'Query';
  accessAuditEvents?:
    | Array<
        | {
            __typename?: 'AccessAuditLog';
            action?: string | undefined;
            actorUserId?: string | undefined;
            after?: any | undefined;
            before?: any | undefined;
            createdAt?: any | undefined;
            entityId?: string | undefined;
            entityType?: string | undefined;
            id?: string | undefined;
            ipAddress?: string | undefined;
            isHighRisk?: boolean | undefined;
            reason?: string | undefined;
            requestId?: string | undefined;
            targetUserId?: string | undefined;
            userAgent?: string | undefined;
          }
        | undefined
      >
    | undefined;
};

export type ExecutivePositionAssignmentsQueryVariables = Exact<{ [key: string]: never }>;

export type ExecutivePositionAssignmentsQuery = {
  __typename?: 'Query';
  executivePositionAssignments?:
    | Array<
        | {
            __typename?: 'ExecutivePositionAssignment';
            assignedByUserId?: string | undefined;
            assignmentReason?: string | undefined;
            createdAt?: any | undefined;
            executiveTermId?: string | undefined;
            id?: string | undefined;
            positionId?: string | undefined;
            revocationReason?: string | undefined;
            revokedAt?: any | undefined;
            revokedByUserId?: string | undefined;
            updatedAt?: any | undefined;
            userId?: string | undefined;
            validFrom?: any | undefined;
            validUntil?: any | undefined;
            executiveTerm?:
              | {
                  __typename?: 'ExecutiveTerm';
                  createdAt?: any | undefined;
                  createdByUserId?: string | undefined;
                  endDate?: any | undefined;
                  id?: string | undefined;
                  name?: string | undefined;
                  startDate?: any | undefined;
                  status?: ExecutiveTermStatus | undefined;
                  updatedAt?: any | undefined;
                }
              | undefined;
            position?:
              | {
                  __typename?: 'ExecutivePosition';
                  code?: string | undefined;
                  createdAt?: any | undefined;
                  id?: string | undefined;
                  isActive?: boolean | undefined;
                  isSingleSeat?: boolean | undefined;
                  name?: string | undefined;
                  updatedAt?: any | undefined;
                }
              | undefined;
            user?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined;
          }
        | undefined
      >
    | undefined;
};

export type ExecutivePositionsQueryVariables = Exact<{ [key: string]: never }>;

export type ExecutivePositionsQuery = {
  __typename?: 'Query';
  executivePositions?:
    | Array<
        | {
            __typename?: 'ExecutivePosition';
            code?: string | undefined;
            createdAt?: any | undefined;
            id?: string | undefined;
            isActive?: boolean | undefined;
            isSingleSeat?: boolean | undefined;
            name?: string | undefined;
            updatedAt?: any | undefined;
          }
        | undefined
      >
    | undefined;
};

export type ExecutiveTermsQueryVariables = Exact<{ [key: string]: never }>;

export type ExecutiveTermsQuery = {
  __typename?: 'Query';
  executiveTerms?:
    | Array<
        | {
            __typename?: 'ExecutiveTerm';
            createdAt?: any | undefined;
            createdByUserId?: string | undefined;
            endDate?: any | undefined;
            id?: string | undefined;
            name?: string | undefined;
            startDate?: any | undefined;
            status?: ExecutiveTermStatus | undefined;
            updatedAt?: any | undefined;
          }
        | undefined
      >
    | undefined;
};

export type GetAlbumQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetAlbumQuery = {
  __typename?: 'Query';
  getAlbum?:
    | {
        __typename?: 'Album';
        coverImage?: string | undefined;
        createdAt?: any | undefined;
        description?: string | undefined;
        id?: string | undefined;
        title?: string | undefined;
        total_photos?: number | undefined;
        updatedAt?: any | undefined;
        contributors?:
          | Array<
              | {
                  __typename?: 'UserBasic';
                  batch?: number | undefined;
                  disabled?: boolean | undefined;
                  dob?: any | undefined;
                  firstName?: string | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  profileImage?: string | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
        creator?:
          | {
              __typename?: 'UserBasic';
              batch?: number | undefined;
              disabled?: boolean | undefined;
              dob?: any | undefined;
              firstName?: string | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              profileImage?: string | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
            }
          | undefined;
        event?:
          | {
              __typename?: 'EventBasic';
              adminRemark?: string | undefined;
              category?: string | undefined;
              cover?: any | undefined;
              createdBy?: string | undefined;
              description?: string | undefined;
              endDate?: any | undefined;
              id: number;
              image?: string | undefined;
              isGoing?: boolean | undefined;
              location?: string | undefined;
              medium: string;
              shortUrl?: string | undefined;
              startDate: any;
              status?: EventStatus | undefined;
              summary: string;
              tags?: Array<string | undefined> | undefined;
              title: string;
              total_attendies?: number | undefined;
            }
          | undefined;
        photos?:
          | Array<
              | {
                  __typename?: 'Photo';
                  altDescription?: string | undefined;
                  caption?: string | undefined;
                  id?: string | undefined;
                  thumbUrl?: string | undefined;
                  uploadedAt?: any | undefined;
                  url?: string | undefined;
                  album?:
                    | {
                        __typename?: 'AlbumBasic';
                        coverImage?: string | undefined;
                        createdAt?: any | undefined;
                        description?: string | undefined;
                        id?: string | undefined;
                        title?: string | undefined;
                        total_photos?: number | undefined;
                        updatedAt?: any | undefined;
                        contributors?:
                          | Array<
                              | {
                                  __typename?: 'UserBasic';
                                  batch?: number | undefined;
                                  disabled?: boolean | undefined;
                                  dob?: any | undefined;
                                  firstName?: string | undefined;
                                  id?: string | undefined;
                                  isConfidential?: boolean | undefined;
                                  isFaculty?: boolean | undefined;
                                  isVerified?: boolean | undefined;
                                  lastName?: string | undefined;
                                  profileImage?: string | undefined;
                                }
                              | undefined
                            >
                          | undefined;
                        creator?:
                          | {
                              __typename?: 'UserBasic';
                              batch?: number | undefined;
                              disabled?: boolean | undefined;
                              dob?: any | undefined;
                              firstName?: string | undefined;
                              id?: string | undefined;
                              isConfidential?: boolean | undefined;
                              isFaculty?: boolean | undefined;
                              isVerified?: boolean | undefined;
                              lastName?: string | undefined;
                              profileImage?: string | undefined;
                            }
                          | undefined;
                        event?:
                          | {
                              __typename?: 'EventBasic';
                              adminRemark?: string | undefined;
                              category?: string | undefined;
                              cover?: any | undefined;
                              createdBy?: string | undefined;
                              description?: string | undefined;
                              endDate?: any | undefined;
                              id: number;
                              image?: string | undefined;
                              isGoing?: boolean | undefined;
                              location?: string | undefined;
                              medium: string;
                              shortUrl?: string | undefined;
                              startDate: any;
                              status?: EventStatus | undefined;
                              summary: string;
                              tags?: Array<string | undefined> | undefined;
                              title: string;
                              total_attendies?: number | undefined;
                            }
                          | undefined;
                      }
                    | undefined;
                  crdits?:
                    | {
                        __typename?: 'PhotoCredit';
                        license_type?: string | undefined;
                        name?: string | undefined;
                        source?: string | undefined;
                        source_url?: string | undefined;
                        url?: string | undefined;
                      }
                    | undefined;
                  uploader?:
                    | {
                        __typename?: 'User';
                        aboutMe?: string | undefined;
                        batch?: number | undefined;
                        createdAt: any;
                        disabled?: boolean | undefined;
                        displayName?: string | undefined;
                        dob?: any | undefined;
                        email?: string | undefined;
                        emergencyMobile?: string | undefined;
                        extraEmail?: string | undefined;
                        extraMobile?: string | undefined;
                        firstName?: string | undefined;
                        gender?: string | undefined;
                        google_auth_id?: string | undefined;
                        hasBusiness?: boolean | undefined;
                        id?: string | undefined;
                        isConfidential?: boolean | undefined;
                        isFaculty?: boolean | undefined;
                        isVerified?: boolean | undefined;
                        lastName?: string | undefined;
                        membershipYear?: number | undefined;
                        metadata?: any | undefined;
                        mobile?: string | undefined;
                        nickName?: string | undefined;
                        profileImage?: string | undefined;
                        socialMedia?: any | undefined;
                        updatedAt: any;
                        whatsAppMobile?: string | undefined;
                        companyInfo?:
                          | Array<
                              | {
                                  __typename?: 'CompanyInfoBasic';
                                  companyName: string;
                                  id: string;
                                  position?: string | undefined;
                                  userId: string;
                                }
                              | undefined
                            >
                          | undefined;
                        positions?:
                          | Array<
                              | {
                                  __typename?: 'EffectivePosition';
                                  assignmentId?: string | undefined;
                                  code?: string | undefined;
                                  name?: string | undefined;
                                  termId?: string | undefined;
                                  termName?: string | undefined;
                                  validFrom?: any | undefined;
                                  validUntil?: any | undefined;
                                }
                              | undefined
                            >
                          | undefined;
                        role?:
                          | {
                              __typename?: 'Role';
                              code?: string | undefined;
                              id?: string | undefined;
                              name?: string | undefined;
                            }
                          | undefined;
                        roles?:
                          | Array<
                              | {
                                  __typename?: 'EffectiveRole';
                                  assignmentId?: string | undefined;
                                  code?: string | undefined;
                                  name?: string | undefined;
                                  scopeBatch?: number | undefined;
                                  scopeType?: string | undefined;
                                  validFrom?: any | undefined;
                                  validUntil?: any | undefined;
                                }
                              | undefined
                            >
                          | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type GetAlbumsQueryVariables = Exact<{
  options?: InputMaybe<ListInput>;
}>;

export type GetAlbumsQuery = {
  __typename?: 'Query';
  getAlbums?:
    | {
        __typename?: 'ListAlbumResponse';
        total?: number | undefined;
        data?:
          | Array<
              | {
                  __typename?: 'AlbumBasic';
                  coverImage?: string | undefined;
                  createdAt?: any | undefined;
                  description?: string | undefined;
                  id?: string | undefined;
                  title?: string | undefined;
                  total_photos?: number | undefined;
                  updatedAt?: any | undefined;
                  contributors?:
                    | Array<
                        | {
                            __typename?: 'UserBasic';
                            batch?: number | undefined;
                            disabled?: boolean | undefined;
                            dob?: any | undefined;
                            firstName?: string | undefined;
                            id?: string | undefined;
                            isConfidential?: boolean | undefined;
                            isFaculty?: boolean | undefined;
                            isVerified?: boolean | undefined;
                            lastName?: string | undefined;
                            profileImage?: string | undefined;
                            role?:
                              | {
                                  __typename?: 'Role';
                                  code?: string | undefined;
                                  id?: string | undefined;
                                  name?: string | undefined;
                                }
                              | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  creator?:
                    | {
                        __typename?: 'UserBasic';
                        batch?: number | undefined;
                        disabled?: boolean | undefined;
                        dob?: any | undefined;
                        firstName?: string | undefined;
                        id?: string | undefined;
                        isConfidential?: boolean | undefined;
                        isFaculty?: boolean | undefined;
                        isVerified?: boolean | undefined;
                        lastName?: string | undefined;
                        profileImage?: string | undefined;
                        role?:
                          | {
                              __typename?: 'Role';
                              code?: string | undefined;
                              id?: string | undefined;
                              name?: string | undefined;
                            }
                          | undefined;
                      }
                    | undefined;
                  event?:
                    | {
                        __typename?: 'EventBasic';
                        adminRemark?: string | undefined;
                        category?: string | undefined;
                        cover?: any | undefined;
                        createdBy?: string | undefined;
                        description?: string | undefined;
                        endDate?: any | undefined;
                        id: number;
                        image?: string | undefined;
                        isGoing?: boolean | undefined;
                        location?: string | undefined;
                        medium: string;
                        shortUrl?: string | undefined;
                        startDate: any;
                        status?: EventStatus | undefined;
                        summary: string;
                        tags?: Array<string | undefined> | undefined;
                        title: string;
                        total_attendies?: number | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type GetAllBatchCoordinatorsQueryVariables = Exact<{
  options?: InputMaybe<ListInput>;
}>;

export type GetAllBatchCoordinatorsQuery = {
  __typename?: 'Query';
  getAllBatchCoordinators?:
    | Array<
        | {
            __typename?: 'BatchCoordinator';
            assignedAt?: any | undefined;
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
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
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
        assignedAt?: any | undefined;
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
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type GetBatchCoordinatorScholarshipDashboardQueryVariables = Exact<{
  batch: Scalars['Int']['input'];
}>;

export type GetBatchCoordinatorScholarshipDashboardQuery = {
  __typename?: 'Query';
  getBatchCoordinatorScholarshipDashboard?:
    | {
        __typename?: 'ScholarshipDashboard';
        disbursedAmount?: number | undefined;
        exceptionCount?: number | undefined;
        requestedAmount?: number | undefined;
        totalApplications?: number | undefined;
        byStatus?:
          | Array<
              | { __typename?: 'ScholarshipStatusCount'; count?: number | undefined; key?: string | undefined }
              | undefined
            >
          | undefined;
        capacity?:
          | {
              __typename?: 'ScholarshipMentorCapacity';
              allocated?: number | undefined;
              available?: number | undefined;
              committed?: number | undefined;
              returned?: number | undefined;
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
            assignedAt?: any | undefined;
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
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined;
          }
        | undefined
      >
    | undefined;
};

export type GetBlogQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetBlogQuery = {
  __typename?: 'Query';
  getBlog?:
    | {
        __typename?: 'Blog';
        adminRemark?: string | undefined;
        authorId?: string | undefined;
        categoryId?: string | undefined;
        claps?: number | undefined;
        content?: string | undefined;
        cover?: any | undefined;
        createdAt: any;
        id: string;
        shortUrl?: string | undefined;
        slug?: string | undefined;
        status: BlogStatus;
        summary?: string | undefined;
        title: string;
        updatedAt: any;
        author?:
          | {
              __typename?: 'UserBasic';
              batch?: number | undefined;
              disabled?: boolean | undefined;
              dob?: any | undefined;
              firstName?: string | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              profileImage?: string | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
            }
          | undefined;
        comments?:
          | Array<
              | {
                  __typename?: 'Comment';
                  authorId?: string | undefined;
                  content?: string | undefined;
                  createdAt?: any | undefined;
                  id?: string | undefined;
                  isVerified?: boolean | undefined;
                  targetId?: string | undefined;
                  targetType?: CommentTargetType | undefined;
                  updatedAt?: any | undefined;
                  author?:
                    | {
                        __typename?: 'UserBasic';
                        batch?: number | undefined;
                        disabled?: boolean | undefined;
                        dob?: any | undefined;
                        firstName?: string | undefined;
                        id?: string | undefined;
                        isConfidential?: boolean | undefined;
                        isFaculty?: boolean | undefined;
                        isVerified?: boolean | undefined;
                        lastName?: string | undefined;
                        profileImage?: string | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type GetBlogListQueryVariables = Exact<{
  options?: InputMaybe<ListInput>;
}>;

export type GetBlogListQuery = {
  __typename?: 'Query';
  getBlogList?:
    | {
        __typename?: 'BlogListResponse';
        total?: number | undefined;
        data?:
          | Array<
              | {
                  __typename?: 'BlogBasic';
                  authorId: string;
                  categoryId?: string | undefined;
                  claps?: number | undefined;
                  cover?: any | undefined;
                  createdAt: any;
                  id: string;
                  shortUrl?: string | undefined;
                  slug: string;
                  status: BlogStatus;
                  summary?: string | undefined;
                  title: string;
                  updatedAt: any;
                  author?:
                    | {
                        __typename?: 'UserBasic';
                        batch?: number | undefined;
                        disabled?: boolean | undefined;
                        dob?: any | undefined;
                        firstName?: string | undefined;
                        id?: string | undefined;
                        isConfidential?: boolean | undefined;
                        isFaculty?: boolean | undefined;
                        isVerified?: boolean | undefined;
                        lastName?: string | undefined;
                        profileImage?: string | undefined;
                        role?:
                          | {
                              __typename?: 'Role';
                              code?: string | undefined;
                              id?: string | undefined;
                              name?: string | undefined;
                            }
                          | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type GetBusinessQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetBusinessQuery = {
  __typename?: 'Query';
  getBusiness?:
    | {
        __typename?: 'Business';
        address?: string | undefined;
        category: string;
        city?: string | undefined;
        country?: string | undefined;
        createdAt: any;
        description: string;
        email?: string | undefined;
        googleReviews?: number | undefined;
        id: string;
        isVerified: boolean;
        logoUrl?: string | undefined;
        name: string;
        phone?: string | undefined;
        postalCode?: string | undefined;
        socialMedia?: any | undefined;
        state?: string | undefined;
        tags?: Array<string> | undefined;
        updatedAt: any;
        userId: string;
        website?: string | undefined;
        user?:
          | {
              __typename?: 'UserBasic';
              batch?: number | undefined;
              disabled?: boolean | undefined;
              dob?: any | undefined;
              firstName?: string | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              profileImage?: string | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type GetBusinessesQueryVariables = Exact<{
  options?: InputMaybe<ListInput>;
}>;

export type GetBusinessesQuery = {
  __typename?: 'Query';
  getBusinesses?:
    | {
        __typename?: 'BusinessListResponse';
        total?: number | undefined;
        data?:
          | Array<
              | {
                  __typename?: 'Business';
                  address?: string | undefined;
                  category: string;
                  city?: string | undefined;
                  country?: string | undefined;
                  createdAt: any;
                  description: string;
                  email?: string | undefined;
                  googleReviews?: number | undefined;
                  id: string;
                  isVerified: boolean;
                  logoUrl?: string | undefined;
                  name: string;
                  phone?: string | undefined;
                  postalCode?: string | undefined;
                  socialMedia?: any | undefined;
                  state?: string | undefined;
                  tags?: Array<string> | undefined;
                  updatedAt: any;
                  userId: string;
                  website?: string | undefined;
                  user?:
                    | {
                        __typename?: 'UserBasic';
                        batch?: number | undefined;
                        disabled?: boolean | undefined;
                        dob?: any | undefined;
                        firstName?: string | undefined;
                        id?: string | undefined;
                        isConfidential?: boolean | undefined;
                        isFaculty?: boolean | undefined;
                        isVerified?: boolean | undefined;
                        lastName?: string | undefined;
                        profileImage?: string | undefined;
                        role?:
                          | {
                              __typename?: 'Role';
                              code?: string | undefined;
                              id?: string | undefined;
                              name?: string | undefined;
                            }
                          | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type GetClapsCountQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetClapsCountQuery = { __typename?: 'Query'; getClapsCount?: number | undefined };

export type GetCommentsQueryVariables = Exact<{
  targetId: Scalars['String']['input'];
  targetType: CommentTargetType;
}>;

export type GetCommentsQuery = {
  __typename?: 'Query';
  getComments?:
    | Array<
        | {
            __typename?: 'Comment';
            authorId?: string | undefined;
            content?: string | undefined;
            createdAt?: any | undefined;
            id?: string | undefined;
            isVerified?: boolean | undefined;
            targetId?: string | undefined;
            targetType?: CommentTargetType | undefined;
            updatedAt?: any | undefined;
            author?:
              | {
                  __typename?: 'UserBasic';
                  batch?: number | undefined;
                  disabled?: boolean | undefined;
                  dob?: any | undefined;
                  firstName?: string | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  profileImage?: string | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                }
              | undefined;
          }
        | undefined
      >
    | undefined;
};

export type GetCompanyInfoQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetCompanyInfoQuery = {
  __typename?: 'Query';
  getCompanyInfo?:
    | {
        __typename?: 'CompanyInfo';
        address?: string | undefined;
        city?: string | undefined;
        companyName: string;
        country?: string | undefined;
        createdAt?: any | undefined;
        endedWorking?: any | undefined;
        id: string;
        isCurrent: boolean;
        position?: string | undefined;
        startedWorking?: any | undefined;
        state?: string | undefined;
        updatedAt?: any | undefined;
        userId: string;
        user?:
          | {
              __typename?: 'UserBasic';
              batch?: number | undefined;
              disabled?: boolean | undefined;
              dob?: any | undefined;
              firstName?: string | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              profileImage?: string | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type GetCompanyInfoListQueryVariables = Exact<{ [key: string]: never }>;

export type GetCompanyInfoListQuery = {
  __typename?: 'Query';
  getCompanyInfoList: Array<{
    __typename?: 'CompanyInfo';
    address?: string | undefined;
    city?: string | undefined;
    companyName: string;
    country?: string | undefined;
    createdAt?: any | undefined;
    endedWorking?: any | undefined;
    id: string;
    isCurrent: boolean;
    position?: string | undefined;
    startedWorking?: any | undefined;
    state?: string | undefined;
    updatedAt?: any | undefined;
    userId: string;
    user?:
      | {
          __typename?: 'UserBasic';
          batch?: number | undefined;
          disabled?: boolean | undefined;
          dob?: any | undefined;
          firstName?: string | undefined;
          id?: string | undefined;
          isConfidential?: boolean | undefined;
          isFaculty?: boolean | undefined;
          isVerified?: boolean | undefined;
          lastName?: string | undefined;
          profileImage?: string | undefined;
          role?:
            | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
            | undefined;
        }
      | undefined;
  }>;
};

export type GetCompletedScholarshipTransactionsQueryVariables = Exact<{
  options?: InputMaybe<ListInput>;
}>;

export type GetCompletedScholarshipTransactionsQuery = {
  __typename?: 'Query';
  getCompletedScholarshipTransactions?:
    | Array<
        | {
            __typename?: 'Transaction';
            amount?: any | undefined;
            createdAt?: any | undefined;
            currency?: Currency | undefined;
            description?: string | undefined;
            id?: string | undefined;
            isDonation?: boolean | undefined;
            method?: string | undefined;
            referenceId?: string | undefined;
            scholarshipApplicationId?: string | undefined;
            scholarshipApprovedAt?: any | undefined;
            scholarshipBatchSnapshot?: number | undefined;
            scholarshipBeneficiaryUserId?: string | undefined;
            scholarshipCompletedAt?: any | undefined;
            scholarshipConfirmedAmount?: any | undefined;
            scholarshipConfirmedAt?: any | undefined;
            scholarshipImmutableAt?: any | undefined;
            scholarshipInstallmentSequence?: number | undefined;
            scholarshipMaskedPayoutDestination?: string | undefined;
            scholarshipMentorUserId?: string | undefined;
            scholarshipOriginalTransactionId?: string | undefined;
            scholarshipPayoutMethod?: string | undefined;
            scholarshipProofDueAt?: any | undefined;
            scholarshipProofDueDays?: number | undefined;
            scholarshipProofStatus?: string | undefined;
            scholarshipPurposeSnapshot?: string | undefined;
            scholarshipReceivedAt?: any | undefined;
            scholarshipStatus?: string | undefined;
            sourceType?: string | undefined;
            status?: TransactionStatus | undefined;
            title?: string | undefined;
            transactionDate?: any | undefined;
            type?: TransactionType | undefined;
            updatedAt?: any | undefined;
            userId?: string | undefined;
            user?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
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
        adminRemark?: string | undefined;
        category?: string | undefined;
        cover?: any | undefined;
        createdAt: any;
        createdBy?: string | undefined;
        description?: string | undefined;
        endDate?: any | undefined;
        id: number;
        image?: string | undefined;
        location?: string | undefined;
        medium: string;
        price?: number | undefined;
        shortUrl?: string | undefined;
        startDate: any;
        status?: EventStatus | undefined;
        summary: string;
        tags?: Array<string | undefined> | undefined;
        ticketUrl?: string | undefined;
        title: string;
        total_attendies?: number | undefined;
        updatedAt: any;
        attendees?:
          | Array<
              | {
                  __typename?: 'UserBasic';
                  batch?: number | undefined;
                  disabled?: boolean | undefined;
                  dob?: any | undefined;
                  firstName?: string | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  profileImage?: string | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
        organizers?:
          | Array<
              | {
                  __typename?: 'UserBasic';
                  batch?: number | undefined;
                  disabled?: boolean | undefined;
                  dob?: any | undefined;
                  firstName?: string | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  profileImage?: string | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
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
                  __typename?: 'EventBasic';
                  adminRemark?: string | undefined;
                  category?: string | undefined;
                  cover?: any | undefined;
                  createdBy?: string | undefined;
                  description?: string | undefined;
                  endDate?: any | undefined;
                  id: number;
                  image?: string | undefined;
                  isGoing?: boolean | undefined;
                  location?: string | undefined;
                  medium: string;
                  shortUrl?: string | undefined;
                  startDate: any;
                  status?: EventStatus | undefined;
                  summary: string;
                  tags?: Array<string | undefined> | undefined;
                  title: string;
                  total_attendies?: number | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type GetMentorFundAllocationsQueryVariables = Exact<{
  batch?: InputMaybe<Scalars['Int']['input']>;
  mentorUserId?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<ListInput>;
}>;

export type GetMentorFundAllocationsQuery = {
  __typename?: 'Query';
  getMentorFundAllocations?:
    | Array<
        | {
            __typename?: 'MentorFundAllocation';
            amount?: any | undefined;
            batch?: number | undefined;
            confirmedAmount?: any | undefined;
            createdAt?: any | undefined;
            currency?: string | undefined;
            disputedAmount?: any | undefined;
            id?: string | undefined;
            mentorUserId?: string | undefined;
            method?: string | undefined;
            notes?: string | undefined;
            recordedByUserId?: string | undefined;
            reference?: string | undefined;
            status?: string | undefined;
            transferDate?: any | undefined;
          }
        | undefined
      >
    | undefined;
};

export type GetMentorScholarshipApplicationsQueryVariables = Exact<{
  filter?: InputMaybe<ScholarshipApplicationFilterInput>;
  options?: InputMaybe<ListInput>;
}>;

export type GetMentorScholarshipApplicationsQuery = {
  __typename?: 'Query';
  getMentorScholarshipApplications?:
    | Array<
        | {
            __typename?: 'ScholarshipApplication';
            applicantUserId?: string | undefined;
            approvedAmountDisbursed?: any | undefined;
            approvedAt?: any | undefined;
            approvedByUserId?: string | undefined;
            approvedProofDays?: number | undefined;
            approvedTotalAmount?: any | undefined;
            assignedMentorUserId?: string | undefined;
            batchSnapshot?: number | undefined;
            beneficiaryUserId?: string | undefined;
            closedAt?: any | undefined;
            createdAt?: any | undefined;
            id?: string | undefined;
            lastActivityAt?: any | undefined;
            paymentMode?: ScholarshipPaymentMode | undefined;
            payoutMaskedSnapshot?: string | undefined;
            payoutMethod?: ScholarshipPayoutMethod | undefined;
            payoutSnapshot?: any | undefined;
            proofStatus?: string | undefined;
            proposedProofDays?: number | undefined;
            purpose?: string | undefined;
            reason?: string | undefined;
            referenceNumber?: string | undefined;
            refundStatus?: string | undefined;
            rejectedAt?: any | undefined;
            rejectedByUserId?: string | undefined;
            rejectionReason?: string | undefined;
            requestedAmount?: any | undefined;
            requestedFirstInstallmentAmount?: any | undefined;
            reviewStartedAt?: any | undefined;
            reviewedByUserId?: string | undefined;
            status?: ScholarshipApplicationStatus | undefined;
            submittedAt?: any | undefined;
            updatedAt?: any | undefined;
            assignedMentor?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined;
            beneficiary?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined;
          }
        | undefined
      >
    | undefined;
};

export type GetMentorScholarshipDashboardQueryVariables = Exact<{ [key: string]: never }>;

export type GetMentorScholarshipDashboardQuery = {
  __typename?: 'Query';
  getMentorScholarshipDashboard?:
    | {
        __typename?: 'ScholarshipDashboard';
        disbursedAmount?: number | undefined;
        exceptionCount?: number | undefined;
        requestedAmount?: number | undefined;
        totalApplications?: number | undefined;
        byStatus?:
          | Array<
              | { __typename?: 'ScholarshipStatusCount'; count?: number | undefined; key?: string | undefined }
              | undefined
            >
          | undefined;
        capacity?:
          | {
              __typename?: 'ScholarshipMentorCapacity';
              allocated?: number | undefined;
              available?: number | undefined;
              committed?: number | undefined;
              returned?: number | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type GetMyPhotosQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyPhotosQuery = {
  __typename?: 'Query';
  getMyPhotos?:
    | Array<
        | {
            __typename?: 'Photo';
            altDescription?: string | undefined;
            caption?: string | undefined;
            id?: string | undefined;
            thumbUrl?: string | undefined;
            uploadedAt?: any | undefined;
            url?: string | undefined;
            album?:
              | {
                  __typename?: 'AlbumBasic';
                  coverImage?: string | undefined;
                  createdAt?: any | undefined;
                  description?: string | undefined;
                  id?: string | undefined;
                  title?: string | undefined;
                  total_photos?: number | undefined;
                  updatedAt?: any | undefined;
                  contributors?:
                    | Array<
                        | {
                            __typename?: 'UserBasic';
                            batch?: number | undefined;
                            disabled?: boolean | undefined;
                            dob?: any | undefined;
                            firstName?: string | undefined;
                            id?: string | undefined;
                            isConfidential?: boolean | undefined;
                            isFaculty?: boolean | undefined;
                            isVerified?: boolean | undefined;
                            lastName?: string | undefined;
                            profileImage?: string | undefined;
                            role?:
                              | {
                                  __typename?: 'Role';
                                  code?: string | undefined;
                                  id?: string | undefined;
                                  name?: string | undefined;
                                }
                              | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  creator?:
                    | {
                        __typename?: 'UserBasic';
                        batch?: number | undefined;
                        disabled?: boolean | undefined;
                        dob?: any | undefined;
                        firstName?: string | undefined;
                        id?: string | undefined;
                        isConfidential?: boolean | undefined;
                        isFaculty?: boolean | undefined;
                        isVerified?: boolean | undefined;
                        lastName?: string | undefined;
                        profileImage?: string | undefined;
                        role?:
                          | {
                              __typename?: 'Role';
                              code?: string | undefined;
                              id?: string | undefined;
                              name?: string | undefined;
                            }
                          | undefined;
                      }
                    | undefined;
                  event?:
                    | {
                        __typename?: 'EventBasic';
                        adminRemark?: string | undefined;
                        category?: string | undefined;
                        cover?: any | undefined;
                        createdBy?: string | undefined;
                        description?: string | undefined;
                        endDate?: any | undefined;
                        id: number;
                        image?: string | undefined;
                        isGoing?: boolean | undefined;
                        location?: string | undefined;
                        medium: string;
                        shortUrl?: string | undefined;
                        startDate: any;
                        status?: EventStatus | undefined;
                        summary: string;
                        tags?: Array<string | undefined> | undefined;
                        title: string;
                        total_attendies?: number | undefined;
                      }
                    | undefined;
                }
              | undefined;
            crdits?:
              | {
                  __typename?: 'PhotoCredit';
                  license_type?: string | undefined;
                  name?: string | undefined;
                  source?: string | undefined;
                  source_url?: string | undefined;
                  url?: string | undefined;
                }
              | undefined;
            uploader?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined;
          }
        | undefined
      >
    | undefined;
};

export type GetMyScholarshipApplicationsQueryVariables = Exact<{
  options?: InputMaybe<ListInput>;
}>;

export type GetMyScholarshipApplicationsQuery = {
  __typename?: 'Query';
  getMyScholarshipApplications?:
    | Array<
        | {
            __typename?: 'ScholarshipApplication';
            applicantUserId?: string | undefined;
            approvedAmountDisbursed?: any | undefined;
            approvedAt?: any | undefined;
            approvedByUserId?: string | undefined;
            approvedProofDays?: number | undefined;
            approvedTotalAmount?: any | undefined;
            assignedMentorUserId?: string | undefined;
            batchSnapshot?: number | undefined;
            beneficiaryUserId?: string | undefined;
            closedAt?: any | undefined;
            createdAt?: any | undefined;
            id?: string | undefined;
            lastActivityAt?: any | undefined;
            paymentMode?: ScholarshipPaymentMode | undefined;
            payoutMaskedSnapshot?: string | undefined;
            payoutMethod?: ScholarshipPayoutMethod | undefined;
            payoutSnapshot?: any | undefined;
            proofStatus?: string | undefined;
            proposedProofDays?: number | undefined;
            purpose?: string | undefined;
            reason?: string | undefined;
            referenceNumber?: string | undefined;
            refundStatus?: string | undefined;
            rejectedAt?: any | undefined;
            rejectedByUserId?: string | undefined;
            rejectionReason?: string | undefined;
            requestedAmount?: any | undefined;
            requestedFirstInstallmentAmount?: any | undefined;
            reviewStartedAt?: any | undefined;
            reviewedByUserId?: string | undefined;
            status?: ScholarshipApplicationStatus | undefined;
            submittedAt?: any | undefined;
            updatedAt?: any | undefined;
            assignedMentor?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined;
            beneficiary?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined;
          }
        | undefined
      >
    | undefined;
};

export type GetMyScholarshipDashboardQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyScholarshipDashboardQuery = {
  __typename?: 'Query';
  getMyScholarshipDashboard?:
    | {
        __typename?: 'ScholarshipDashboard';
        disbursedAmount?: number | undefined;
        exceptionCount?: number | undefined;
        requestedAmount?: number | undefined;
        totalApplications?: number | undefined;
        byStatus?:
          | Array<
              | { __typename?: 'ScholarshipStatusCount'; count?: number | undefined; key?: string | undefined }
              | undefined
            >
          | undefined;
        capacity?:
          | {
              __typename?: 'ScholarshipMentorCapacity';
              allocated?: number | undefined;
              available?: number | undefined;
              committed?: number | undefined;
              returned?: number | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type GetScholarshipActivityQueryVariables = Exact<{
  entityId?: InputMaybe<Scalars['String']['input']>;
  entityType?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetScholarshipActivityQuery = {
  __typename?: 'Query';
  getScholarshipActivity?:
    | Array<
        | {
            __typename?: 'ScholarshipActivityLog';
            action?: string | undefined;
            actorUserId?: string | undefined;
            after?: any | undefined;
            before?: any | undefined;
            createdAt?: any | undefined;
            entityId?: string | undefined;
            entityType?: string | undefined;
            id?: string | undefined;
            isHighRisk?: boolean | undefined;
            reason?: string | undefined;
          }
        | undefined
      >
    | undefined;
};

export type GetScholarshipApplicationQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetScholarshipApplicationQuery = {
  __typename?: 'Query';
  getScholarshipApplication?:
    | {
        __typename?: 'ScholarshipApplication';
        applicantUserId?: string | undefined;
        approvedAmountDisbursed?: any | undefined;
        approvedAt?: any | undefined;
        approvedByUserId?: string | undefined;
        approvedProofDays?: number | undefined;
        approvedTotalAmount?: any | undefined;
        assignedMentorUserId?: string | undefined;
        batchSnapshot?: number | undefined;
        beneficiaryUserId?: string | undefined;
        closedAt?: any | undefined;
        createdAt?: any | undefined;
        id?: string | undefined;
        lastActivityAt?: any | undefined;
        paymentMode?: ScholarshipPaymentMode | undefined;
        payoutMaskedSnapshot?: string | undefined;
        payoutMethod?: ScholarshipPayoutMethod | undefined;
        payoutSnapshot?: any | undefined;
        proofStatus?: string | undefined;
        proposedProofDays?: number | undefined;
        purpose?: string | undefined;
        reason?: string | undefined;
        referenceNumber?: string | undefined;
        refundStatus?: string | undefined;
        rejectedAt?: any | undefined;
        rejectedByUserId?: string | undefined;
        rejectionReason?: string | undefined;
        requestedAmount?: any | undefined;
        requestedFirstInstallmentAmount?: any | undefined;
        reviewStartedAt?: any | undefined;
        reviewedByUserId?: string | undefined;
        status?: ScholarshipApplicationStatus | undefined;
        submittedAt?: any | undefined;
        updatedAt?: any | undefined;
        assignedMentor?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
        beneficiary?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type GetScholarshipApplicationTransactionsQueryVariables = Exact<{
  applicationId: Scalars['String']['input'];
}>;

export type GetScholarshipApplicationTransactionsQuery = {
  __typename?: 'Query';
  getScholarshipApplicationTransactions?:
    | Array<
        | {
            __typename?: 'Transaction';
            amount?: any | undefined;
            createdAt?: any | undefined;
            currency?: Currency | undefined;
            description?: string | undefined;
            id?: string | undefined;
            isDonation?: boolean | undefined;
            method?: string | undefined;
            referenceId?: string | undefined;
            scholarshipApplicationId?: string | undefined;
            scholarshipApprovedAt?: any | undefined;
            scholarshipBatchSnapshot?: number | undefined;
            scholarshipBeneficiaryUserId?: string | undefined;
            scholarshipCompletedAt?: any | undefined;
            scholarshipConfirmedAmount?: any | undefined;
            scholarshipConfirmedAt?: any | undefined;
            scholarshipImmutableAt?: any | undefined;
            scholarshipInstallmentSequence?: number | undefined;
            scholarshipMaskedPayoutDestination?: string | undefined;
            scholarshipMentorUserId?: string | undefined;
            scholarshipOriginalTransactionId?: string | undefined;
            scholarshipPayoutMethod?: string | undefined;
            scholarshipProofDueAt?: any | undefined;
            scholarshipProofDueDays?: number | undefined;
            scholarshipProofStatus?: string | undefined;
            scholarshipPurposeSnapshot?: string | undefined;
            scholarshipReceivedAt?: any | undefined;
            scholarshipStatus?: string | undefined;
            sourceType?: string | undefined;
            status?: TransactionStatus | undefined;
            title?: string | undefined;
            transactionDate?: any | undefined;
            type?: TransactionType | undefined;
            updatedAt?: any | undefined;
            userId?: string | undefined;
            user?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined;
          }
        | undefined
      >
    | undefined;
};

export type GetScholarshipApplicationsQueryVariables = Exact<{
  filter?: InputMaybe<ScholarshipApplicationFilterInput>;
  options?: InputMaybe<ListInput>;
}>;

export type GetScholarshipApplicationsQuery = {
  __typename?: 'Query';
  getScholarshipApplications?:
    | Array<
        | {
            __typename?: 'ScholarshipApplication';
            applicantUserId?: string | undefined;
            approvedAmountDisbursed?: any | undefined;
            approvedAt?: any | undefined;
            approvedByUserId?: string | undefined;
            approvedProofDays?: number | undefined;
            approvedTotalAmount?: any | undefined;
            assignedMentorUserId?: string | undefined;
            batchSnapshot?: number | undefined;
            beneficiaryUserId?: string | undefined;
            closedAt?: any | undefined;
            createdAt?: any | undefined;
            id?: string | undefined;
            lastActivityAt?: any | undefined;
            paymentMode?: ScholarshipPaymentMode | undefined;
            payoutMaskedSnapshot?: string | undefined;
            payoutMethod?: ScholarshipPayoutMethod | undefined;
            payoutSnapshot?: any | undefined;
            proofStatus?: string | undefined;
            proposedProofDays?: number | undefined;
            purpose?: string | undefined;
            reason?: string | undefined;
            referenceNumber?: string | undefined;
            refundStatus?: string | undefined;
            rejectedAt?: any | undefined;
            rejectedByUserId?: string | undefined;
            rejectionReason?: string | undefined;
            requestedAmount?: any | undefined;
            requestedFirstInstallmentAmount?: any | undefined;
            reviewStartedAt?: any | undefined;
            reviewedByUserId?: string | undefined;
            status?: ScholarshipApplicationStatus | undefined;
            submittedAt?: any | undefined;
            updatedAt?: any | undefined;
            assignedMentor?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined;
            beneficiary?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined;
          }
        | undefined
      >
    | undefined;
};

export type GetScholarshipBeneficiaryListQueryVariables = Exact<{
  filter?: InputMaybe<ScholarshipApplicationFilterInput>;
  options?: InputMaybe<ListInput>;
}>;

export type GetScholarshipBeneficiaryListQuery = {
  __typename?: 'Query';
  getScholarshipBeneficiaryList?:
    | Array<
        | {
            __typename?: 'ScholarshipApplication';
            applicantUserId?: string | undefined;
            approvedAmountDisbursed?: any | undefined;
            approvedAt?: any | undefined;
            approvedByUserId?: string | undefined;
            approvedProofDays?: number | undefined;
            approvedTotalAmount?: any | undefined;
            assignedMentorUserId?: string | undefined;
            batchSnapshot?: number | undefined;
            beneficiaryUserId?: string | undefined;
            closedAt?: any | undefined;
            createdAt?: any | undefined;
            id?: string | undefined;
            lastActivityAt?: any | undefined;
            paymentMode?: ScholarshipPaymentMode | undefined;
            payoutMaskedSnapshot?: string | undefined;
            payoutMethod?: ScholarshipPayoutMethod | undefined;
            payoutSnapshot?: any | undefined;
            proofStatus?: string | undefined;
            proposedProofDays?: number | undefined;
            purpose?: string | undefined;
            reason?: string | undefined;
            referenceNumber?: string | undefined;
            refundStatus?: string | undefined;
            rejectedAt?: any | undefined;
            rejectedByUserId?: string | undefined;
            rejectionReason?: string | undefined;
            requestedAmount?: any | undefined;
            requestedFirstInstallmentAmount?: any | undefined;
            reviewStartedAt?: any | undefined;
            reviewedByUserId?: string | undefined;
            status?: ScholarshipApplicationStatus | undefined;
            submittedAt?: any | undefined;
            updatedAt?: any | undefined;
            assignedMentor?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined;
            beneficiary?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined;
          }
        | undefined
      >
    | undefined;
};

export type GetScholarshipDocumentReadUrlQueryVariables = Exact<{
  documentId: Scalars['String']['input'];
}>;

export type GetScholarshipDocumentReadUrlQuery = {
  __typename?: 'Query';
  getScholarshipDocumentReadUrl?: string | undefined;
};

export type GetScholarshipExceptionQueueQueryVariables = Exact<{ [key: string]: never }>;

export type GetScholarshipExceptionQueueQuery = {
  __typename?: 'Query';
  getScholarshipExceptionQueue?:
    | Array<
        | {
            __typename?: 'ScholarshipApplication';
            applicantUserId?: string | undefined;
            approvedAmountDisbursed?: any | undefined;
            approvedAt?: any | undefined;
            approvedByUserId?: string | undefined;
            approvedProofDays?: number | undefined;
            approvedTotalAmount?: any | undefined;
            assignedMentorUserId?: string | undefined;
            batchSnapshot?: number | undefined;
            beneficiaryUserId?: string | undefined;
            closedAt?: any | undefined;
            createdAt?: any | undefined;
            id?: string | undefined;
            lastActivityAt?: any | undefined;
            paymentMode?: ScholarshipPaymentMode | undefined;
            payoutMaskedSnapshot?: string | undefined;
            payoutMethod?: ScholarshipPayoutMethod | undefined;
            payoutSnapshot?: any | undefined;
            proofStatus?: string | undefined;
            proposedProofDays?: number | undefined;
            purpose?: string | undefined;
            reason?: string | undefined;
            referenceNumber?: string | undefined;
            refundStatus?: string | undefined;
            rejectedAt?: any | undefined;
            rejectedByUserId?: string | undefined;
            rejectionReason?: string | undefined;
            requestedAmount?: any | undefined;
            requestedFirstInstallmentAmount?: any | undefined;
            reviewStartedAt?: any | undefined;
            reviewedByUserId?: string | undefined;
            status?: ScholarshipApplicationStatus | undefined;
            submittedAt?: any | undefined;
            updatedAt?: any | undefined;
            assignedMentor?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined;
            beneficiary?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined;
          }
        | undefined
      >
    | undefined;
};

export type GetScholarshipMentorSummaryQueryVariables = Exact<{
  mentorUserId?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetScholarshipMentorSummaryQuery = {
  __typename?: 'Query';
  getScholarshipMentorSummary?:
    | {
        __typename?: 'ScholarshipDashboard';
        disbursedAmount?: number | undefined;
        exceptionCount?: number | undefined;
        requestedAmount?: number | undefined;
        totalApplications?: number | undefined;
        byStatus?:
          | Array<
              | { __typename?: 'ScholarshipStatusCount'; count?: number | undefined; key?: string | undefined }
              | undefined
            >
          | undefined;
        capacity?:
          | {
              __typename?: 'ScholarshipMentorCapacity';
              allocated?: number | undefined;
              available?: number | undefined;
              committed?: number | undefined;
              returned?: number | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type GetScholarshipOrganizationDashboardQueryVariables = Exact<{ [key: string]: never }>;

export type GetScholarshipOrganizationDashboardQuery = {
  __typename?: 'Query';
  getScholarshipOrganizationDashboard?:
    | {
        __typename?: 'ScholarshipDashboard';
        disbursedAmount?: number | undefined;
        exceptionCount?: number | undefined;
        requestedAmount?: number | undefined;
        totalApplications?: number | undefined;
        byStatus?:
          | Array<
              | { __typename?: 'ScholarshipStatusCount'; count?: number | undefined; key?: string | undefined }
              | undefined
            >
          | undefined;
        capacity?:
          | {
              __typename?: 'ScholarshipMentorCapacity';
              allocated?: number | undefined;
              available?: number | undefined;
              committed?: number | undefined;
              returned?: number | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type GetScholarshipRefundCasesQueryVariables = Exact<{ [key: string]: never }>;

export type GetScholarshipRefundCasesQuery = {
  __typename?: 'Query';
  getScholarshipRefundCases?:
    | Array<
        | {
            __typename?: 'ScholarshipRefund';
            beneficiaryRefundProofDocumentId?: string | undefined;
            beneficiaryUserId?: string | undefined;
            confirmedRefundAmount?: any | undefined;
            id?: string | undefined;
            linkedRefundTransactionId?: string | undefined;
            originalTransactionId?: string | undefined;
            refundPaymentReference?: string | undefined;
            requestedAmount?: any | undefined;
            status?: string | undefined;
            wrongDisbursementCaseId?: string | undefined;
          }
        | undefined
      >
    | undefined;
};

export type GetScholarshipWrongDisbursementCasesQueryVariables = Exact<{ [key: string]: never }>;

export type GetScholarshipWrongDisbursementCasesQuery = {
  __typename?: 'Query';
  getScholarshipWrongDisbursementCases?:
    | Array<
        | {
            __typename?: 'ScholarshipWrongDisbursementCase';
            affectedDocumentIds?: Array<string | undefined> | undefined;
            applicationId?: string | undefined;
            beneficiaryResponse?: string | undefined;
            disputedAmount?: any | undefined;
            id?: string | undefined;
            originalTransactionId?: string | undefined;
            reason?: string | undefined;
            refundRequested?: boolean | undefined;
            reportedAt?: any | undefined;
            reportedByUserId?: string | undefined;
            requestedRefundAmount?: any | undefined;
            status?: string | undefined;
          }
        | undefined
      >
    | undefined;
};

export type GetTransactionQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetTransactionQuery = {
  __typename?: 'Query';
  getTransaction?:
    | {
        __typename?: 'Transaction';
        amount?: any | undefined;
        createdAt?: any | undefined;
        currency?: Currency | undefined;
        description?: string | undefined;
        id?: string | undefined;
        isDonation?: boolean | undefined;
        method?: string | undefined;
        referenceId?: string | undefined;
        scholarshipApplicationId?: string | undefined;
        scholarshipApprovedAt?: any | undefined;
        scholarshipBatchSnapshot?: number | undefined;
        scholarshipBeneficiaryUserId?: string | undefined;
        scholarshipCompletedAt?: any | undefined;
        scholarshipConfirmedAmount?: any | undefined;
        scholarshipConfirmedAt?: any | undefined;
        scholarshipImmutableAt?: any | undefined;
        scholarshipInstallmentSequence?: number | undefined;
        scholarshipMaskedPayoutDestination?: string | undefined;
        scholarshipMentorUserId?: string | undefined;
        scholarshipOriginalTransactionId?: string | undefined;
        scholarshipPayoutMethod?: string | undefined;
        scholarshipProofDueAt?: any | undefined;
        scholarshipProofDueDays?: number | undefined;
        scholarshipProofStatus?: string | undefined;
        scholarshipPurposeSnapshot?: string | undefined;
        scholarshipReceivedAt?: any | undefined;
        scholarshipStatus?: string | undefined;
        sourceType?: string | undefined;
        status?: TransactionStatus | undefined;
        title?: string | undefined;
        transactionDate?: any | undefined;
        type?: TransactionType | undefined;
        updatedAt?: any | undefined;
        userId?: string | undefined;
        user?:
          | {
              __typename?: 'User';
              aboutMe?: string | undefined;
              batch?: number | undefined;
              createdAt: any;
              disabled?: boolean | undefined;
              displayName?: string | undefined;
              dob?: any | undefined;
              email?: string | undefined;
              emergencyMobile?: string | undefined;
              extraEmail?: string | undefined;
              extraMobile?: string | undefined;
              firstName?: string | undefined;
              gender?: string | undefined;
              google_auth_id?: string | undefined;
              hasBusiness?: boolean | undefined;
              id?: string | undefined;
              isConfidential?: boolean | undefined;
              isFaculty?: boolean | undefined;
              isVerified?: boolean | undefined;
              lastName?: string | undefined;
              membershipYear?: number | undefined;
              metadata?: any | undefined;
              mobile?: string | undefined;
              nickName?: string | undefined;
              profileImage?: string | undefined;
              socialMedia?: any | undefined;
              updatedAt: any;
              whatsAppMobile?: string | undefined;
              companyInfo?:
                | Array<
                    | {
                        __typename?: 'CompanyInfoBasic';
                        companyName: string;
                        id: string;
                        position?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              positions?:
                | Array<
                    | {
                        __typename?: 'EffectivePosition';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        termId?: string | undefined;
                        termName?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
              role?:
                | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
                | undefined;
              roles?:
                | Array<
                    | {
                        __typename?: 'EffectiveRole';
                        assignmentId?: string | undefined;
                        code?: string | undefined;
                        name?: string | undefined;
                        scopeBatch?: number | undefined;
                        scopeType?: string | undefined;
                        validFrom?: any | undefined;
                        validUntil?: any | undefined;
                      }
                    | undefined
                  >
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type GetTransactionsQueryVariables = Exact<{
  options?: InputMaybe<ListInput>;
}>;

export type GetTransactionsQuery = {
  __typename?: 'Query';
  getTransactions?:
    | {
        __typename?: 'TransactionListResponse';
        total?: number | undefined;
        data?:
          | Array<
              | {
                  __typename?: 'Transaction';
                  amount?: any | undefined;
                  createdAt?: any | undefined;
                  currency?: Currency | undefined;
                  description?: string | undefined;
                  id?: string | undefined;
                  isDonation?: boolean | undefined;
                  method?: string | undefined;
                  referenceId?: string | undefined;
                  scholarshipApplicationId?: string | undefined;
                  scholarshipApprovedAt?: any | undefined;
                  scholarshipBatchSnapshot?: number | undefined;
                  scholarshipBeneficiaryUserId?: string | undefined;
                  scholarshipCompletedAt?: any | undefined;
                  scholarshipConfirmedAmount?: any | undefined;
                  scholarshipConfirmedAt?: any | undefined;
                  scholarshipImmutableAt?: any | undefined;
                  scholarshipInstallmentSequence?: number | undefined;
                  scholarshipMaskedPayoutDestination?: string | undefined;
                  scholarshipMentorUserId?: string | undefined;
                  scholarshipOriginalTransactionId?: string | undefined;
                  scholarshipPayoutMethod?: string | undefined;
                  scholarshipProofDueAt?: any | undefined;
                  scholarshipProofDueDays?: number | undefined;
                  scholarshipProofStatus?: string | undefined;
                  scholarshipPurposeSnapshot?: string | undefined;
                  scholarshipReceivedAt?: any | undefined;
                  scholarshipStatus?: string | undefined;
                  sourceType?: string | undefined;
                  status?: TransactionStatus | undefined;
                  title?: string | undefined;
                  transactionDate?: any | undefined;
                  type?: TransactionType | undefined;
                  updatedAt?: any | undefined;
                  userId?: string | undefined;
                  user?:
                    | {
                        __typename?: 'User';
                        aboutMe?: string | undefined;
                        batch?: number | undefined;
                        createdAt: any;
                        disabled?: boolean | undefined;
                        displayName?: string | undefined;
                        dob?: any | undefined;
                        email?: string | undefined;
                        emergencyMobile?: string | undefined;
                        extraEmail?: string | undefined;
                        extraMobile?: string | undefined;
                        firstName?: string | undefined;
                        gender?: string | undefined;
                        google_auth_id?: string | undefined;
                        hasBusiness?: boolean | undefined;
                        id?: string | undefined;
                        isConfidential?: boolean | undefined;
                        isFaculty?: boolean | undefined;
                        isVerified?: boolean | undefined;
                        lastName?: string | undefined;
                        membershipYear?: number | undefined;
                        metadata?: any | undefined;
                        mobile?: string | undefined;
                        nickName?: string | undefined;
                        profileImage?: string | undefined;
                        socialMedia?: any | undefined;
                        updatedAt: any;
                        whatsAppMobile?: string | undefined;
                        companyInfo?:
                          | Array<
                              | {
                                  __typename?: 'CompanyInfoBasic';
                                  companyName: string;
                                  id: string;
                                  position?: string | undefined;
                                  userId: string;
                                }
                              | undefined
                            >
                          | undefined;
                        positions?:
                          | Array<
                              | {
                                  __typename?: 'EffectivePosition';
                                  assignmentId?: string | undefined;
                                  code?: string | undefined;
                                  name?: string | undefined;
                                  termId?: string | undefined;
                                  termName?: string | undefined;
                                  validFrom?: any | undefined;
                                  validUntil?: any | undefined;
                                }
                              | undefined
                            >
                          | undefined;
                        role?:
                          | {
                              __typename?: 'Role';
                              code?: string | undefined;
                              id?: string | undefined;
                              name?: string | undefined;
                            }
                          | undefined;
                        roles?:
                          | Array<
                              | {
                                  __typename?: 'EffectiveRole';
                                  assignmentId?: string | undefined;
                                  code?: string | undefined;
                                  name?: string | undefined;
                                  scopeBatch?: number | undefined;
                                  scopeType?: string | undefined;
                                  validFrom?: any | undefined;
                                  validUntil?: any | undefined;
                                }
                              | undefined
                            >
                          | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export type GetUserAddressesQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserAddressesQuery = {
  __typename?: 'Query';
  getUserAddresses?:
    | {
        __typename?: 'AddressListResponse';
        total?: number | undefined;
        data?:
          | Array<
              | {
                  __typename?: 'Address';
                  address?: string | undefined;
                  city?: string | undefined;
                  country?: string | undefined;
                  id: string;
                  postalCode?: string | undefined;
                  state?: string | undefined;
                  type: string;
                  userId: string;
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
        dob?: any | undefined;
        email?: string | undefined;
        emergencyMobile?: string | undefined;
        extraEmail?: string | undefined;
        extraMobile?: string | undefined;
        firstName?: string | undefined;
        gender?: string | undefined;
        google_auth_id?: string | undefined;
        hasBusiness?: boolean | undefined;
        id?: string | undefined;
        isConfidential?: boolean | undefined;
        isFaculty?: boolean | undefined;
        isVerified?: boolean | undefined;
        lastName?: string | undefined;
        membershipYear?: number | undefined;
        metadata?: any | undefined;
        mobile?: string | undefined;
        nickName?: string | undefined;
        profileImage?: string | undefined;
        socialMedia?: any | undefined;
        updatedAt: any;
        whatsAppMobile?: string | undefined;
        companyInfo?:
          | Array<
              | {
                  __typename?: 'CompanyInfoBasic';
                  companyName: string;
                  id: string;
                  position?: string | undefined;
                  userId: string;
                }
              | undefined
            >
          | undefined;
        positions?:
          | Array<
              | {
                  __typename?: 'EffectivePosition';
                  assignmentId?: string | undefined;
                  code?: string | undefined;
                  name?: string | undefined;
                  termId?: string | undefined;
                  termName?: string | undefined;
                  validFrom?: any | undefined;
                  validUntil?: any | undefined;
                }
              | undefined
            >
          | undefined;
        role?:
          | { __typename?: 'Role'; code?: string | undefined; id?: string | undefined; name?: string | undefined }
          | undefined;
        roles?:
          | Array<
              | {
                  __typename?: 'EffectiveRole';
                  assignmentId?: string | undefined;
                  code?: string | undefined;
                  name?: string | undefined;
                  scopeBatch?: number | undefined;
                  scopeType?: string | undefined;
                  validFrom?: any | undefined;
                  validUntil?: any | undefined;
                }
              | undefined
            >
          | undefined;
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
        __typename?: 'UserListResponse';
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
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
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

export type PublicExecutiveCommitteeQueryVariables = Exact<{ [key: string]: never }>;

export type PublicExecutiveCommitteeQuery = {
  __typename?: 'Query';
  publicExecutiveCommittee?:
    | Array<
        | {
            __typename?: 'ExecutiveCommitteeMember';
            assignmentId?: string | undefined;
            batch?: string | undefined;
            designation?: string | undefined;
            email?: string | undefined;
            mobile?: string | undefined;
            name?: string | undefined;
            positionCode?: string | undefined;
            positionName?: string | undefined;
            profilePicture?: string | undefined;
            termId?: string | undefined;
            termName?: string | undefined;
            userId?: string | undefined;
            validFrom?: any | undefined;
            validUntil?: any | undefined;
          }
        | undefined
      >
    | undefined;
};

export type RoleAssignmentsQueryVariables = Exact<{
  filter?: InputMaybe<RoleAssignmentFilterInput>;
}>;

export type RoleAssignmentsQuery = {
  __typename?: 'Query';
  roleAssignments?:
    | Array<
        | {
            __typename?: 'RoleAssignment';
            assignedByUserId?: string | undefined;
            assignmentReason?: string | undefined;
            createdAt?: any | undefined;
            id?: string | undefined;
            revocationReason?: string | undefined;
            revokedAt?: any | undefined;
            revokedByUserId?: string | undefined;
            roleId?: string | undefined;
            scopeBatch?: number | undefined;
            scopeType?: AccessScopeType | undefined;
            updatedAt?: any | undefined;
            userId?: string | undefined;
            validFrom?: any | undefined;
            validUntil?: any | undefined;
            role?:
              | {
                  __typename?: 'AccessRole';
                  code?: string | undefined;
                  description?: string | undefined;
                  id?: string | undefined;
                  isActive?: boolean | undefined;
                  isSystem?: boolean | undefined;
                  name?: string | undefined;
                }
              | undefined;
            user?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined;
          }
        | undefined
      >
    | undefined;
};

export type SystemPermissionsQueryVariables = Exact<{ [key: string]: never }>;

export type SystemPermissionsQuery = {
  __typename?: 'Query';
  systemPermissions?:
    | Array<
        | {
            __typename?: 'Permission';
            category?: string | undefined;
            code?: string | undefined;
            createdAt: any;
            description?: string | undefined;
            id?: string | undefined;
            isActive?: boolean | undefined;
            name?: string | undefined;
            updatedAt: any;
          }
        | undefined
      >
    | undefined;
};

export type SystemRolesQueryVariables = Exact<{ [key: string]: never }>;

export type SystemRolesQuery = {
  __typename?: 'Query';
  systemRoles?:
    | Array<
        | {
            __typename?: 'AccessRole';
            code?: string | undefined;
            description?: string | undefined;
            id?: string | undefined;
            isActive?: boolean | undefined;
            isSystem?: boolean | undefined;
            name?: string | undefined;
          }
        | undefined
      >
    | undefined;
};

export type UpcomingBirthdaysQueryVariables = Exact<{ [key: string]: never }>;

export type UpcomingBirthdaysQuery = {
  __typename?: 'Query';
  upcomingBirthdays: Array<
    | {
        __typename?: 'UserBirthday';
        batch?: number | undefined;
        birthday?: string | undefined;
        disabled?: boolean | undefined;
        firstName?: string | undefined;
        id?: string | undefined;
        isConfidential?: boolean | undefined;
        isFaculty?: boolean | undefined;
        isVerified?: boolean | undefined;
        lastName?: string | undefined;
        profileImage?: string | undefined;
      }
    | undefined
  >;
};

export type UserExecutivePositionAssignmentsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;

export type UserExecutivePositionAssignmentsQuery = {
  __typename?: 'Query';
  userExecutivePositionAssignments?:
    | Array<
        | {
            __typename?: 'ExecutivePositionAssignment';
            assignedByUserId?: string | undefined;
            assignmentReason?: string | undefined;
            createdAt?: any | undefined;
            executiveTermId?: string | undefined;
            id?: string | undefined;
            positionId?: string | undefined;
            revocationReason?: string | undefined;
            revokedAt?: any | undefined;
            revokedByUserId?: string | undefined;
            updatedAt?: any | undefined;
            userId?: string | undefined;
            validFrom?: any | undefined;
            validUntil?: any | undefined;
            executiveTerm?:
              | {
                  __typename?: 'ExecutiveTerm';
                  createdAt?: any | undefined;
                  createdByUserId?: string | undefined;
                  endDate?: any | undefined;
                  id?: string | undefined;
                  name?: string | undefined;
                  startDate?: any | undefined;
                  status?: ExecutiveTermStatus | undefined;
                  updatedAt?: any | undefined;
                }
              | undefined;
            position?:
              | {
                  __typename?: 'ExecutivePosition';
                  code?: string | undefined;
                  createdAt?: any | undefined;
                  id?: string | undefined;
                  isActive?: boolean | undefined;
                  isSingleSeat?: boolean | undefined;
                  name?: string | undefined;
                  updatedAt?: any | undefined;
                }
              | undefined;
            user?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined;
          }
        | undefined
      >
    | undefined;
};

export type UserRoleAssignmentsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;

export type UserRoleAssignmentsQuery = {
  __typename?: 'Query';
  userRoleAssignments?:
    | Array<
        | {
            __typename?: 'RoleAssignment';
            assignedByUserId?: string | undefined;
            assignmentReason?: string | undefined;
            createdAt?: any | undefined;
            id?: string | undefined;
            revocationReason?: string | undefined;
            revokedAt?: any | undefined;
            revokedByUserId?: string | undefined;
            roleId?: string | undefined;
            scopeBatch?: number | undefined;
            scopeType?: AccessScopeType | undefined;
            updatedAt?: any | undefined;
            userId?: string | undefined;
            validFrom?: any | undefined;
            validUntil?: any | undefined;
            role?:
              | {
                  __typename?: 'AccessRole';
                  code?: string | undefined;
                  description?: string | undefined;
                  id?: string | undefined;
                  isActive?: boolean | undefined;
                  isSystem?: boolean | undefined;
                  name?: string | undefined;
                }
              | undefined;
            user?:
              | {
                  __typename?: 'User';
                  aboutMe?: string | undefined;
                  batch?: number | undefined;
                  createdAt: any;
                  disabled?: boolean | undefined;
                  displayName?: string | undefined;
                  dob?: any | undefined;
                  email?: string | undefined;
                  emergencyMobile?: string | undefined;
                  extraEmail?: string | undefined;
                  extraMobile?: string | undefined;
                  firstName?: string | undefined;
                  gender?: string | undefined;
                  google_auth_id?: string | undefined;
                  hasBusiness?: boolean | undefined;
                  id?: string | undefined;
                  isConfidential?: boolean | undefined;
                  isFaculty?: boolean | undefined;
                  isVerified?: boolean | undefined;
                  lastName?: string | undefined;
                  membershipYear?: number | undefined;
                  metadata?: any | undefined;
                  mobile?: string | undefined;
                  nickName?: string | undefined;
                  profileImage?: string | undefined;
                  socialMedia?: any | undefined;
                  updatedAt: any;
                  whatsAppMobile?: string | undefined;
                  companyInfo?:
                    | Array<
                        | {
                            __typename?: 'CompanyInfoBasic';
                            companyName: string;
                            id: string;
                            position?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  positions?:
                    | Array<
                        | {
                            __typename?: 'EffectivePosition';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            termId?: string | undefined;
                            termName?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                  role?:
                    | {
                        __typename?: 'Role';
                        code?: string | undefined;
                        id?: string | undefined;
                        name?: string | undefined;
                      }
                    | undefined;
                  roles?:
                    | Array<
                        | {
                            __typename?: 'EffectiveRole';
                            assignmentId?: string | undefined;
                            code?: string | undefined;
                            name?: string | undefined;
                            scopeBatch?: number | undefined;
                            scopeType?: string | undefined;
                            validFrom?: any | undefined;
                            validUntil?: any | undefined;
                          }
                        | undefined
                      >
                    | undefined;
                }
              | undefined;
          }
        | undefined
      >
    | undefined;
};

export type ViewerAccessContextQueryVariables = Exact<{ [key: string]: never }>;

export type ViewerAccessContextQuery = {
  __typename?: 'Query';
  viewerAccessContext?:
    | {
        __typename?: 'ViewerAccessContext';
        hasFullAccess?: boolean | undefined;
        permissions?: Array<string | undefined> | undefined;
        userId?: string | undefined;
        positions?:
          | Array<
              | {
                  __typename?: 'EffectivePosition';
                  assignmentId?: string | undefined;
                  code?: string | undefined;
                  name?: string | undefined;
                  termId?: string | undefined;
                  termName?: string | undefined;
                  validFrom?: any | undefined;
                  validUntil?: any | undefined;
                }
              | undefined
            >
          | undefined;
        roles?:
          | Array<
              | {
                  __typename?: 'EffectiveRole';
                  assignmentId?: string | undefined;
                  code?: string | undefined;
                  name?: string | undefined;
                  scopeBatch?: number | undefined;
                  scopeType?: string | undefined;
                  validFrom?: any | undefined;
                  validUntil?: any | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

export const ActivateExecutiveTermDocument = gql`
  mutation activateExecutiveTerm($reason: String!, $termId: String!) {
    activateExecutiveTerm(reason: $reason, termId: $termId) {
      createdAt
      createdByUserId
      endDate
      id
      name
      startDate
      status
      updatedAt
    }
  }
`;
export type ActivateExecutiveTermMutationFn = Apollo.MutationFunction<
  ActivateExecutiveTermMutation,
  ActivateExecutiveTermMutationVariables
>;

/**
 * __useActivateExecutiveTermMutation__
 *
 * To run a mutation, you first call `useActivateExecutiveTermMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateExecutiveTermMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateExecutiveTermMutation, { data, loading, error }] = useActivateExecutiveTermMutation({
 *   variables: {
 *      reason: // value for 'reason'
 *      termId: // value for 'termId'
 *   },
 * });
 */
export function useActivateExecutiveTermMutation(
  baseOptions?: Apollo.MutationHookOptions<ActivateExecutiveTermMutation, ActivateExecutiveTermMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ActivateExecutiveTermMutation, ActivateExecutiveTermMutationVariables>(
    ActivateExecutiveTermDocument,
    options
  );
}
export type ActivateExecutiveTermMutationHookResult = ReturnType<typeof useActivateExecutiveTermMutation>;
export type ActivateExecutiveTermMutationResult = Apollo.MutationResult<ActivateExecutiveTermMutation>;
export type ActivateExecutiveTermMutationOptions = Apollo.BaseMutationOptions<
  ActivateExecutiveTermMutation,
  ActivateExecutiveTermMutationVariables
>;
export const AddAlbumContributorDocument = gql`
  mutation addAlbumContributor($albumId: String!, $userId: String!) {
    addAlbumContributor(albumId: $albumId, userId: $userId) {
      contributors {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      coverImage
      createdAt
      creator {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      description
      event {
        adminRemark
        category
        cover
        createdBy
        description
        endDate
        id
        image
        isGoing
        location
        medium
        shortUrl
        startDate
        status
        summary
        tags
        title
        total_attendies
      }
      id
      photos {
        album {
          contributors {
            batch
            disabled
            dob
            firstName
            id
            isConfidential
            isFaculty
            isVerified
            lastName
            profileImage
          }
          coverImage
          createdAt
          creator {
            batch
            disabled
            dob
            firstName
            id
            isConfidential
            isFaculty
            isVerified
            lastName
            profileImage
          }
          description
          event {
            adminRemark
            category
            cover
            createdBy
            description
            endDate
            id
            image
            isGoing
            location
            medium
            shortUrl
            startDate
            status
            summary
            tags
            title
            total_attendies
          }
          id
          title
          total_photos
          updatedAt
        }
        altDescription
        caption
        crdits {
          license_type
          name
          source
          source_url
          url
        }
        id
        thumbUrl
        uploadedAt
        uploader {
          aboutMe
          batch
          companyInfo {
            companyName
            id
            position
            userId
          }
          createdAt
          disabled
          displayName
          dob
          email
          emergencyMobile
          extraEmail
          extraMobile
          firstName
          gender
          google_auth_id
          hasBusiness
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          membershipYear
          metadata
          mobile
          nickName
          positions {
            assignmentId
            code
            name
            termId
            termName
            validFrom
            validUntil
          }
          profileImage
          role {
            code
            id
            name
          }
          roles {
            assignmentId
            code
            name
            scopeBatch
            scopeType
            validFrom
            validUntil
          }
          socialMedia
          updatedAt
          whatsAppMobile
        }
        url
      }
      title
      total_photos
      updatedAt
    }
  }
`;
export type AddAlbumContributorMutationFn = Apollo.MutationFunction<
  AddAlbumContributorMutation,
  AddAlbumContributorMutationVariables
>;

/**
 * __useAddAlbumContributorMutation__
 *
 * To run a mutation, you first call `useAddAlbumContributorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAlbumContributorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAlbumContributorMutation, { data, loading, error }] = useAddAlbumContributorMutation({
 *   variables: {
 *      albumId: // value for 'albumId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddAlbumContributorMutation(
  baseOptions?: Apollo.MutationHookOptions<AddAlbumContributorMutation, AddAlbumContributorMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddAlbumContributorMutation, AddAlbumContributorMutationVariables>(
    AddAlbumContributorDocument,
    options
  );
}
export type AddAlbumContributorMutationHookResult = ReturnType<typeof useAddAlbumContributorMutation>;
export type AddAlbumContributorMutationResult = Apollo.MutationResult<AddAlbumContributorMutation>;
export type AddAlbumContributorMutationOptions = Apollo.BaseMutationOptions<
  AddAlbumContributorMutation,
  AddAlbumContributorMutationVariables
>;
export const AddCommentDocument = gql`
  mutation addComment($content: String!, $targetId: String!, $targetType: CommentTargetType!) {
    addComment(content: $content, targetId: $targetId, targetType: $targetType) {
      author {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      authorId
      content
      createdAt
      id
      isVerified
      targetId
      targetType
      updatedAt
    }
  }
`;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      content: // value for 'content'
 *      targetId: // value for 'targetId'
 *      targetType: // value for 'targetType'
 *   },
 * });
 */
export function useAddCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, options);
}
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const AddPhotoDocument = gql`
  mutation addPhoto($albumId: String!, $caption: String, $url: String!) {
    addPhoto(albumId: $albumId, caption: $caption, url: $url) {
      album {
        contributors {
          batch
          disabled
          dob
          firstName
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          profileImage
          role {
            code
            id
            name
          }
        }
        coverImage
        createdAt
        creator {
          batch
          disabled
          dob
          firstName
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          profileImage
          role {
            code
            id
            name
          }
        }
        description
        event {
          adminRemark
          category
          cover
          createdBy
          description
          endDate
          id
          image
          isGoing
          location
          medium
          shortUrl
          startDate
          status
          summary
          tags
          title
          total_attendies
        }
        id
        title
        total_photos
        updatedAt
      }
      altDescription
      caption
      crdits {
        license_type
        name
        source
        source_url
        url
      }
      id
      thumbUrl
      uploadedAt
      uploader {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      url
    }
  }
`;
export type AddPhotoMutationFn = Apollo.MutationFunction<AddPhotoMutation, AddPhotoMutationVariables>;

/**
 * __useAddPhotoMutation__
 *
 * To run a mutation, you first call `useAddPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPhotoMutation, { data, loading, error }] = useAddPhotoMutation({
 *   variables: {
 *      albumId: // value for 'albumId'
 *      caption: // value for 'caption'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useAddPhotoMutation(
  baseOptions?: Apollo.MutationHookOptions<AddPhotoMutation, AddPhotoMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddPhotoMutation, AddPhotoMutationVariables>(AddPhotoDocument, options);
}
export type AddPhotoMutationHookResult = ReturnType<typeof useAddPhotoMutation>;
export type AddPhotoMutationResult = Apollo.MutationResult<AddPhotoMutation>;
export type AddPhotoMutationOptions = Apollo.BaseMutationOptions<AddPhotoMutation, AddPhotoMutationVariables>;
export const ApproveBlogDocument = gql`
  mutation approveBlog($id: String!) {
    approveBlog(id: $id) {
      adminRemark
      author {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      authorId
      categoryId
      claps
      comments {
        author {
          batch
          disabled
          dob
          firstName
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          profileImage
        }
        authorId
        content
        createdAt
        id
        isVerified
        targetId
        targetType
        updatedAt
      }
      content
      cover
      createdAt
      id
      shortUrl
      slug
      status
      summary
      title
      updatedAt
    }
  }
`;
export type ApproveBlogMutationFn = Apollo.MutationFunction<ApproveBlogMutation, ApproveBlogMutationVariables>;

/**
 * __useApproveBlogMutation__
 *
 * To run a mutation, you first call `useApproveBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveBlogMutation, { data, loading, error }] = useApproveBlogMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApproveBlogMutation(
  baseOptions?: Apollo.MutationHookOptions<ApproveBlogMutation, ApproveBlogMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ApproveBlogMutation, ApproveBlogMutationVariables>(ApproveBlogDocument, options);
}
export type ApproveBlogMutationHookResult = ReturnType<typeof useApproveBlogMutation>;
export type ApproveBlogMutationResult = Apollo.MutationResult<ApproveBlogMutation>;
export type ApproveBlogMutationOptions = Apollo.BaseMutationOptions<ApproveBlogMutation, ApproveBlogMutationVariables>;
export const ApproveMemberRegistrationDocument = gql`
  mutation approveMemberRegistration($reason: String!, $userId: String!) {
    approveMemberRegistration(reason: $reason, userId: $userId)
  }
`;
export type ApproveMemberRegistrationMutationFn = Apollo.MutationFunction<
  ApproveMemberRegistrationMutation,
  ApproveMemberRegistrationMutationVariables
>;

/**
 * __useApproveMemberRegistrationMutation__
 *
 * To run a mutation, you first call `useApproveMemberRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveMemberRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveMemberRegistrationMutation, { data, loading, error }] = useApproveMemberRegistrationMutation({
 *   variables: {
 *      reason: // value for 'reason'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useApproveMemberRegistrationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ApproveMemberRegistrationMutation,
    ApproveMemberRegistrationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ApproveMemberRegistrationMutation, ApproveMemberRegistrationMutationVariables>(
    ApproveMemberRegistrationDocument,
    options
  );
}
export type ApproveMemberRegistrationMutationHookResult = ReturnType<typeof useApproveMemberRegistrationMutation>;
export type ApproveMemberRegistrationMutationResult = Apollo.MutationResult<ApproveMemberRegistrationMutation>;
export type ApproveMemberRegistrationMutationOptions = Apollo.BaseMutationOptions<
  ApproveMemberRegistrationMutation,
  ApproveMemberRegistrationMutationVariables
>;
export const ApproveScholarshipApplicationDocument = gql`
  mutation approveScholarshipApplication(
    $applicationId: String!
    $approvedTotalAmount: Float!
    $installmentAmount: Float!
    $note: String
    $proofDueDays: Int
  ) {
    approveScholarshipApplication(
      applicationId: $applicationId
      approvedTotalAmount: $approvedTotalAmount
      installmentAmount: $installmentAmount
      note: $note
      proofDueDays: $proofDueDays
    ) {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;
export type ApproveScholarshipApplicationMutationFn = Apollo.MutationFunction<
  ApproveScholarshipApplicationMutation,
  ApproveScholarshipApplicationMutationVariables
>;

/**
 * __useApproveScholarshipApplicationMutation__
 *
 * To run a mutation, you first call `useApproveScholarshipApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveScholarshipApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveScholarshipApplicationMutation, { data, loading, error }] = useApproveScholarshipApplicationMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      approvedTotalAmount: // value for 'approvedTotalAmount'
 *      installmentAmount: // value for 'installmentAmount'
 *      note: // value for 'note'
 *      proofDueDays: // value for 'proofDueDays'
 *   },
 * });
 */
export function useApproveScholarshipApplicationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ApproveScholarshipApplicationMutation,
    ApproveScholarshipApplicationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ApproveScholarshipApplicationMutation, ApproveScholarshipApplicationMutationVariables>(
    ApproveScholarshipApplicationDocument,
    options
  );
}
export type ApproveScholarshipApplicationMutationHookResult = ReturnType<
  typeof useApproveScholarshipApplicationMutation
>;
export type ApproveScholarshipApplicationMutationResult = Apollo.MutationResult<ApproveScholarshipApplicationMutation>;
export type ApproveScholarshipApplicationMutationOptions = Apollo.BaseMutationOptions<
  ApproveScholarshipApplicationMutation,
  ApproveScholarshipApplicationMutationVariables
>;
export const AssignBatchCoordinatorDocument = gql`
  mutation assignBatchCoordinator($batch: Int!, $userId: String!) {
    assignBatchCoordinator(batch: $batch, userId: $userId) {
      assignedAt
      batch
      id
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
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
export const AssignExecutivePositionDocument = gql`
  mutation assignExecutivePosition($input: AssignExecutivePositionInput!) {
    assignExecutivePosition(input: $input) {
      assignedByUserId
      assignmentReason
      createdAt
      executiveTerm {
        createdAt
        createdByUserId
        endDate
        id
        name
        startDate
        status
        updatedAt
      }
      executiveTermId
      id
      position {
        code
        createdAt
        id
        isActive
        isSingleSeat
        name
        updatedAt
      }
      positionId
      revocationReason
      revokedAt
      revokedByUserId
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      userId
      validFrom
      validUntil
    }
  }
`;
export type AssignExecutivePositionMutationFn = Apollo.MutationFunction<
  AssignExecutivePositionMutation,
  AssignExecutivePositionMutationVariables
>;

/**
 * __useAssignExecutivePositionMutation__
 *
 * To run a mutation, you first call `useAssignExecutivePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignExecutivePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignExecutivePositionMutation, { data, loading, error }] = useAssignExecutivePositionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignExecutivePositionMutation(
  baseOptions?: Apollo.MutationHookOptions<AssignExecutivePositionMutation, AssignExecutivePositionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AssignExecutivePositionMutation, AssignExecutivePositionMutationVariables>(
    AssignExecutivePositionDocument,
    options
  );
}
export type AssignExecutivePositionMutationHookResult = ReturnType<typeof useAssignExecutivePositionMutation>;
export type AssignExecutivePositionMutationResult = Apollo.MutationResult<AssignExecutivePositionMutation>;
export type AssignExecutivePositionMutationOptions = Apollo.BaseMutationOptions<
  AssignExecutivePositionMutation,
  AssignExecutivePositionMutationVariables
>;
export const AssignUserRoleDocument = gql`
  mutation assignUserRole($input: AssignUserRoleInput!) {
    assignUserRole(input: $input) {
      assignedByUserId
      assignmentReason
      createdAt
      id
      revocationReason
      revokedAt
      revokedByUserId
      role {
        code
        description
        id
        isActive
        isSystem
        name
      }
      roleId
      scopeBatch
      scopeType
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      userId
      validFrom
      validUntil
    }
  }
`;
export type AssignUserRoleMutationFn = Apollo.MutationFunction<AssignUserRoleMutation, AssignUserRoleMutationVariables>;

/**
 * __useAssignUserRoleMutation__
 *
 * To run a mutation, you first call `useAssignUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignUserRoleMutation, { data, loading, error }] = useAssignUserRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignUserRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<AssignUserRoleMutation, AssignUserRoleMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AssignUserRoleMutation, AssignUserRoleMutationVariables>(AssignUserRoleDocument, options);
}
export type AssignUserRoleMutationHookResult = ReturnType<typeof useAssignUserRoleMutation>;
export type AssignUserRoleMutationResult = Apollo.MutationResult<AssignUserRoleMutation>;
export type AssignUserRoleMutationOptions = Apollo.BaseMutationOptions<
  AssignUserRoleMutation,
  AssignUserRoleMutationVariables
>;
export const AttendEventDocument = gql`
  mutation attendEvent($eventId: Int!) {
    attendEvent(eventId: $eventId)
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
export const CloseExecutiveTermDocument = gql`
  mutation closeExecutiveTerm($reason: String!, $termId: String!) {
    closeExecutiveTerm(reason: $reason, termId: $termId) {
      createdAt
      createdByUserId
      endDate
      id
      name
      startDate
      status
      updatedAt
    }
  }
`;
export type CloseExecutiveTermMutationFn = Apollo.MutationFunction<
  CloseExecutiveTermMutation,
  CloseExecutiveTermMutationVariables
>;

/**
 * __useCloseExecutiveTermMutation__
 *
 * To run a mutation, you first call `useCloseExecutiveTermMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseExecutiveTermMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeExecutiveTermMutation, { data, loading, error }] = useCloseExecutiveTermMutation({
 *   variables: {
 *      reason: // value for 'reason'
 *      termId: // value for 'termId'
 *   },
 * });
 */
export function useCloseExecutiveTermMutation(
  baseOptions?: Apollo.MutationHookOptions<CloseExecutiveTermMutation, CloseExecutiveTermMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CloseExecutiveTermMutation, CloseExecutiveTermMutationVariables>(
    CloseExecutiveTermDocument,
    options
  );
}
export type CloseExecutiveTermMutationHookResult = ReturnType<typeof useCloseExecutiveTermMutation>;
export type CloseExecutiveTermMutationResult = Apollo.MutationResult<CloseExecutiveTermMutation>;
export type CloseExecutiveTermMutationOptions = Apollo.BaseMutationOptions<
  CloseExecutiveTermMutation,
  CloseExecutiveTermMutationVariables
>;
export const CloseScholarshipRemainderDocument = gql`
  mutation closeScholarshipRemainder($applicationId: String!, $reason: String!) {
    closeScholarshipRemainder(applicationId: $applicationId, reason: $reason) {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;
export type CloseScholarshipRemainderMutationFn = Apollo.MutationFunction<
  CloseScholarshipRemainderMutation,
  CloseScholarshipRemainderMutationVariables
>;

/**
 * __useCloseScholarshipRemainderMutation__
 *
 * To run a mutation, you first call `useCloseScholarshipRemainderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseScholarshipRemainderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeScholarshipRemainderMutation, { data, loading, error }] = useCloseScholarshipRemainderMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useCloseScholarshipRemainderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CloseScholarshipRemainderMutation,
    CloseScholarshipRemainderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CloseScholarshipRemainderMutation, CloseScholarshipRemainderMutationVariables>(
    CloseScholarshipRemainderDocument,
    options
  );
}
export type CloseScholarshipRemainderMutationHookResult = ReturnType<typeof useCloseScholarshipRemainderMutation>;
export type CloseScholarshipRemainderMutationResult = Apollo.MutationResult<CloseScholarshipRemainderMutation>;
export type CloseScholarshipRemainderMutationOptions = Apollo.BaseMutationOptions<
  CloseScholarshipRemainderMutation,
  CloseScholarshipRemainderMutationVariables
>;
export const ConfirmMentorFundAllocationDocument = gql`
  mutation confirmMentorFundAllocation($allocationId: String!, $confirmedAmount: Float) {
    confirmMentorFundAllocation(allocationId: $allocationId, confirmedAmount: $confirmedAmount) {
      amount
      batch
      confirmedAmount
      createdAt
      currency
      disputedAmount
      id
      mentorUserId
      method
      notes
      recordedByUserId
      reference
      status
      transferDate
    }
  }
`;
export type ConfirmMentorFundAllocationMutationFn = Apollo.MutationFunction<
  ConfirmMentorFundAllocationMutation,
  ConfirmMentorFundAllocationMutationVariables
>;

/**
 * __useConfirmMentorFundAllocationMutation__
 *
 * To run a mutation, you first call `useConfirmMentorFundAllocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmMentorFundAllocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmMentorFundAllocationMutation, { data, loading, error }] = useConfirmMentorFundAllocationMutation({
 *   variables: {
 *      allocationId: // value for 'allocationId'
 *      confirmedAmount: // value for 'confirmedAmount'
 *   },
 * });
 */
export function useConfirmMentorFundAllocationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmMentorFundAllocationMutation,
    ConfirmMentorFundAllocationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ConfirmMentorFundAllocationMutation, ConfirmMentorFundAllocationMutationVariables>(
    ConfirmMentorFundAllocationDocument,
    options
  );
}
export type ConfirmMentorFundAllocationMutationHookResult = ReturnType<typeof useConfirmMentorFundAllocationMutation>;
export type ConfirmMentorFundAllocationMutationResult = Apollo.MutationResult<ConfirmMentorFundAllocationMutation>;
export type ConfirmMentorFundAllocationMutationOptions = Apollo.BaseMutationOptions<
  ConfirmMentorFundAllocationMutation,
  ConfirmMentorFundAllocationMutationVariables
>;
export const ConfirmScholarshipRefundReceivedDocument = gql`
  mutation confirmScholarshipRefundReceived(
    $confirmedAmount: Float!
    $note: String
    $reference: String
    $refundId: String!
  ) {
    confirmScholarshipRefundReceived(
      confirmedAmount: $confirmedAmount
      note: $note
      reference: $reference
      refundId: $refundId
    ) {
      beneficiaryRefundProofDocumentId
      beneficiaryUserId
      confirmedRefundAmount
      id
      linkedRefundTransactionId
      originalTransactionId
      refundPaymentReference
      requestedAmount
      status
      wrongDisbursementCaseId
    }
  }
`;
export type ConfirmScholarshipRefundReceivedMutationFn = Apollo.MutationFunction<
  ConfirmScholarshipRefundReceivedMutation,
  ConfirmScholarshipRefundReceivedMutationVariables
>;

/**
 * __useConfirmScholarshipRefundReceivedMutation__
 *
 * To run a mutation, you first call `useConfirmScholarshipRefundReceivedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmScholarshipRefundReceivedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmScholarshipRefundReceivedMutation, { data, loading, error }] = useConfirmScholarshipRefundReceivedMutation({
 *   variables: {
 *      confirmedAmount: // value for 'confirmedAmount'
 *      note: // value for 'note'
 *      reference: // value for 'reference'
 *      refundId: // value for 'refundId'
 *   },
 * });
 */
export function useConfirmScholarshipRefundReceivedMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmScholarshipRefundReceivedMutation,
    ConfirmScholarshipRefundReceivedMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ConfirmScholarshipRefundReceivedMutation,
    ConfirmScholarshipRefundReceivedMutationVariables
  >(ConfirmScholarshipRefundReceivedDocument, options);
}
export type ConfirmScholarshipRefundReceivedMutationHookResult = ReturnType<
  typeof useConfirmScholarshipRefundReceivedMutation
>;
export type ConfirmScholarshipRefundReceivedMutationResult =
  Apollo.MutationResult<ConfirmScholarshipRefundReceivedMutation>;
export type ConfirmScholarshipRefundReceivedMutationOptions = Apollo.BaseMutationOptions<
  ConfirmScholarshipRefundReceivedMutation,
  ConfirmScholarshipRefundReceivedMutationVariables
>;
export const ConfirmScholarshipTransactionReceiptDocument = gql`
  mutation confirmScholarshipTransactionReceipt($confirmedAmount: Float!, $note: String, $transactionId: String!) {
    confirmScholarshipTransactionReceipt(
      confirmedAmount: $confirmedAmount
      note: $note
      transactionId: $transactionId
    ) {
      amount
      createdAt
      currency
      description
      id
      isDonation
      method
      referenceId
      scholarshipApplicationId
      scholarshipApprovedAt
      scholarshipBatchSnapshot
      scholarshipBeneficiaryUserId
      scholarshipCompletedAt
      scholarshipConfirmedAmount
      scholarshipConfirmedAt
      scholarshipImmutableAt
      scholarshipInstallmentSequence
      scholarshipMaskedPayoutDestination
      scholarshipMentorUserId
      scholarshipOriginalTransactionId
      scholarshipPayoutMethod
      scholarshipProofDueAt
      scholarshipProofDueDays
      scholarshipProofStatus
      scholarshipPurposeSnapshot
      scholarshipReceivedAt
      scholarshipStatus
      sourceType
      status
      title
      transactionDate
      type
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      userId
    }
  }
`;
export type ConfirmScholarshipTransactionReceiptMutationFn = Apollo.MutationFunction<
  ConfirmScholarshipTransactionReceiptMutation,
  ConfirmScholarshipTransactionReceiptMutationVariables
>;

/**
 * __useConfirmScholarshipTransactionReceiptMutation__
 *
 * To run a mutation, you first call `useConfirmScholarshipTransactionReceiptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmScholarshipTransactionReceiptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmScholarshipTransactionReceiptMutation, { data, loading, error }] = useConfirmScholarshipTransactionReceiptMutation({
 *   variables: {
 *      confirmedAmount: // value for 'confirmedAmount'
 *      note: // value for 'note'
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useConfirmScholarshipTransactionReceiptMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmScholarshipTransactionReceiptMutation,
    ConfirmScholarshipTransactionReceiptMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ConfirmScholarshipTransactionReceiptMutation,
    ConfirmScholarshipTransactionReceiptMutationVariables
  >(ConfirmScholarshipTransactionReceiptDocument, options);
}
export type ConfirmScholarshipTransactionReceiptMutationHookResult = ReturnType<
  typeof useConfirmScholarshipTransactionReceiptMutation
>;
export type ConfirmScholarshipTransactionReceiptMutationResult =
  Apollo.MutationResult<ConfirmScholarshipTransactionReceiptMutation>;
export type ConfirmScholarshipTransactionReceiptMutationOptions = Apollo.BaseMutationOptions<
  ConfirmScholarshipTransactionReceiptMutation,
  ConfirmScholarshipTransactionReceiptMutationVariables
>;
export const CreateAddressDocument = gql`
  mutation createAddress(
    $address: String
    $city: String
    $country: String
    $postalCode: String
    $state: String
    $type: String!
  ) {
    createAddress(
      address: $address
      city: $city
      country: $country
      postalCode: $postalCode
      state: $state
      type: $type
    ) {
      address
      city
      country
      id
      postalCode
      state
      type
      userId
    }
  }
`;
export type CreateAddressMutationFn = Apollo.MutationFunction<CreateAddressMutation, CreateAddressMutationVariables>;

/**
 * __useCreateAddressMutation__
 *
 * To run a mutation, you first call `useCreateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAddressMutation, { data, loading, error }] = useCreateAddressMutation({
 *   variables: {
 *      address: // value for 'address'
 *      city: // value for 'city'
 *      country: // value for 'country'
 *      postalCode: // value for 'postalCode'
 *      state: // value for 'state'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useCreateAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateAddressMutation, CreateAddressMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateAddressMutation, CreateAddressMutationVariables>(CreateAddressDocument, options);
}
export type CreateAddressMutationHookResult = ReturnType<typeof useCreateAddressMutation>;
export type CreateAddressMutationResult = Apollo.MutationResult<CreateAddressMutation>;
export type CreateAddressMutationOptions = Apollo.BaseMutationOptions<
  CreateAddressMutation,
  CreateAddressMutationVariables
>;
export const CreateAlbumDocument = gql`
  mutation createAlbum($coverImage: String, $description: String, $eventId: Int, $title: String!) {
    createAlbum(coverImage: $coverImage, description: $description, eventId: $eventId, title: $title) {
      contributors {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      coverImage
      createdAt
      creator {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      description
      event {
        adminRemark
        category
        cover
        createdBy
        description
        endDate
        id
        image
        isGoing
        location
        medium
        shortUrl
        startDate
        status
        summary
        tags
        title
        total_attendies
      }
      id
      photos {
        album {
          contributors {
            batch
            disabled
            dob
            firstName
            id
            isConfidential
            isFaculty
            isVerified
            lastName
            profileImage
          }
          coverImage
          createdAt
          creator {
            batch
            disabled
            dob
            firstName
            id
            isConfidential
            isFaculty
            isVerified
            lastName
            profileImage
          }
          description
          event {
            adminRemark
            category
            cover
            createdBy
            description
            endDate
            id
            image
            isGoing
            location
            medium
            shortUrl
            startDate
            status
            summary
            tags
            title
            total_attendies
          }
          id
          title
          total_photos
          updatedAt
        }
        altDescription
        caption
        crdits {
          license_type
          name
          source
          source_url
          url
        }
        id
        thumbUrl
        uploadedAt
        uploader {
          aboutMe
          batch
          companyInfo {
            companyName
            id
            position
            userId
          }
          createdAt
          disabled
          displayName
          dob
          email
          emergencyMobile
          extraEmail
          extraMobile
          firstName
          gender
          google_auth_id
          hasBusiness
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          membershipYear
          metadata
          mobile
          nickName
          positions {
            assignmentId
            code
            name
            termId
            termName
            validFrom
            validUntil
          }
          profileImage
          role {
            code
            id
            name
          }
          roles {
            assignmentId
            code
            name
            scopeBatch
            scopeType
            validFrom
            validUntil
          }
          socialMedia
          updatedAt
          whatsAppMobile
        }
        url
      }
      title
      total_photos
      updatedAt
    }
  }
`;
export type CreateAlbumMutationFn = Apollo.MutationFunction<CreateAlbumMutation, CreateAlbumMutationVariables>;

/**
 * __useCreateAlbumMutation__
 *
 * To run a mutation, you first call `useCreateAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAlbumMutation, { data, loading, error }] = useCreateAlbumMutation({
 *   variables: {
 *      coverImage: // value for 'coverImage'
 *      description: // value for 'description'
 *      eventId: // value for 'eventId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateAlbumMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateAlbumMutation, CreateAlbumMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateAlbumMutation, CreateAlbumMutationVariables>(CreateAlbumDocument, options);
}
export type CreateAlbumMutationHookResult = ReturnType<typeof useCreateAlbumMutation>;
export type CreateAlbumMutationResult = Apollo.MutationResult<CreateAlbumMutation>;
export type CreateAlbumMutationOptions = Apollo.BaseMutationOptions<CreateAlbumMutation, CreateAlbumMutationVariables>;
export const CreateBlogDocument = gql`
  mutation createBlog(
    $authorId: String!
    $categoryId: String!
    $content: String
    $cover: JSON
    $status: BlogStatus
    $title: String!
  ) {
    createBlog(
      authorId: $authorId
      categoryId: $categoryId
      content: $content
      cover: $cover
      status: $status
      title: $title
    ) {
      adminRemark
      author {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      authorId
      categoryId
      claps
      comments {
        author {
          batch
          disabled
          dob
          firstName
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          profileImage
        }
        authorId
        content
        createdAt
        id
        isVerified
        targetId
        targetType
        updatedAt
      }
      content
      cover
      createdAt
      id
      shortUrl
      slug
      status
      summary
      title
      updatedAt
    }
  }
`;
export type CreateBlogMutationFn = Apollo.MutationFunction<CreateBlogMutation, CreateBlogMutationVariables>;

/**
 * __useCreateBlogMutation__
 *
 * To run a mutation, you first call `useCreateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlogMutation, { data, loading, error }] = useCreateBlogMutation({
 *   variables: {
 *      authorId: // value for 'authorId'
 *      categoryId: // value for 'categoryId'
 *      content: // value for 'content'
 *      cover: // value for 'cover'
 *      status: // value for 'status'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateBlogMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateBlogMutation, CreateBlogMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateBlogMutation, CreateBlogMutationVariables>(CreateBlogDocument, options);
}
export type CreateBlogMutationHookResult = ReturnType<typeof useCreateBlogMutation>;
export type CreateBlogMutationResult = Apollo.MutationResult<CreateBlogMutation>;
export type CreateBlogMutationOptions = Apollo.BaseMutationOptions<CreateBlogMutation, CreateBlogMutationVariables>;
export const CreateBusinessDocument = gql`
  mutation createBusiness($body: CreateBusinessInput!) {
    createBusiness(body: $body) {
      address
      category
      city
      country
      createdAt
      description
      email
      googleReviews
      id
      isVerified
      logoUrl
      name
      phone
      postalCode
      socialMedia
      state
      tags
      updatedAt
      user {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      userId
      website
    }
  }
`;
export type CreateBusinessMutationFn = Apollo.MutationFunction<CreateBusinessMutation, CreateBusinessMutationVariables>;

/**
 * __useCreateBusinessMutation__
 *
 * To run a mutation, you first call `useCreateBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBusinessMutation, { data, loading, error }] = useCreateBusinessMutation({
 *   variables: {
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateBusinessMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateBusinessMutation, CreateBusinessMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateBusinessMutation, CreateBusinessMutationVariables>(CreateBusinessDocument, options);
}
export type CreateBusinessMutationHookResult = ReturnType<typeof useCreateBusinessMutation>;
export type CreateBusinessMutationResult = Apollo.MutationResult<CreateBusinessMutation>;
export type CreateBusinessMutationOptions = Apollo.BaseMutationOptions<
  CreateBusinessMutation,
  CreateBusinessMutationVariables
>;
export const CreateCompanyInfoDocument = gql`
  mutation createCompanyInfo(
    $address: String
    $city: String
    $companyName: String
    $country: String
    $endedWorking: DateTime
    $isCurrent: Boolean
    $position: String
    $startedWorking: DateTime
    $state: String
    $userId: String
  ) {
    createCompanyInfo(
      address: $address
      city: $city
      companyName: $companyName
      country: $country
      endedWorking: $endedWorking
      isCurrent: $isCurrent
      position: $position
      startedWorking: $startedWorking
      state: $state
      userId: $userId
    ) {
      address
      city
      companyName
      country
      createdAt
      endedWorking
      id
      isCurrent
      position
      startedWorking
      state
      updatedAt
      user {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      userId
    }
  }
`;
export type CreateCompanyInfoMutationFn = Apollo.MutationFunction<
  CreateCompanyInfoMutation,
  CreateCompanyInfoMutationVariables
>;

/**
 * __useCreateCompanyInfoMutation__
 *
 * To run a mutation, you first call `useCreateCompanyInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyInfoMutation, { data, loading, error }] = useCreateCompanyInfoMutation({
 *   variables: {
 *      address: // value for 'address'
 *      city: // value for 'city'
 *      companyName: // value for 'companyName'
 *      country: // value for 'country'
 *      endedWorking: // value for 'endedWorking'
 *      isCurrent: // value for 'isCurrent'
 *      position: // value for 'position'
 *      startedWorking: // value for 'startedWorking'
 *      state: // value for 'state'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateCompanyInfoMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCompanyInfoMutation, CreateCompanyInfoMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCompanyInfoMutation, CreateCompanyInfoMutationVariables>(
    CreateCompanyInfoDocument,
    options
  );
}
export type CreateCompanyInfoMutationHookResult = ReturnType<typeof useCreateCompanyInfoMutation>;
export type CreateCompanyInfoMutationResult = Apollo.MutationResult<CreateCompanyInfoMutation>;
export type CreateCompanyInfoMutationOptions = Apollo.BaseMutationOptions<
  CreateCompanyInfoMutation,
  CreateCompanyInfoMutationVariables
>;
export const CreateEventDocument = gql`
  mutation createEvent(
    $category: String!
    $cover: JSON
    $description: String
    $endDate: String
    $image: String
    $location: String
    $medium: String!
    $price: Float
    $startDate: String!
    $status: EventStatus!
    $summary: String!
    $tags: String
    $title: String!
  ) {
    createEvent(
      category: $category
      cover: $cover
      description: $description
      endDate: $endDate
      image: $image
      location: $location
      medium: $medium
      price: $price
      startDate: $startDate
      status: $status
      summary: $summary
      tags: $tags
      title: $title
    ) {
      adminRemark
      category
      cover
      createdBy
      description
      endDate
      id
      image
      isGoing
      location
      medium
      shortUrl
      startDate
      status
      summary
      tags
      title
      total_attendies
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
 *      cover: // value for 'cover'
 *      description: // value for 'description'
 *      endDate: // value for 'endDate'
 *      image: // value for 'image'
 *      location: // value for 'location'
 *      medium: // value for 'medium'
 *      price: // value for 'price'
 *      startDate: // value for 'startDate'
 *      status: // value for 'status'
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
export const CreateExecutiveTermDocument = gql`
  mutation createExecutiveTerm($endDate: String, $name: String!, $reason: String!, $startDate: String!) {
    createExecutiveTerm(endDate: $endDate, name: $name, reason: $reason, startDate: $startDate) {
      createdAt
      createdByUserId
      endDate
      id
      name
      startDate
      status
      updatedAt
    }
  }
`;
export type CreateExecutiveTermMutationFn = Apollo.MutationFunction<
  CreateExecutiveTermMutation,
  CreateExecutiveTermMutationVariables
>;

/**
 * __useCreateExecutiveTermMutation__
 *
 * To run a mutation, you first call `useCreateExecutiveTermMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExecutiveTermMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExecutiveTermMutation, { data, loading, error }] = useCreateExecutiveTermMutation({
 *   variables: {
 *      endDate: // value for 'endDate'
 *      name: // value for 'name'
 *      reason: // value for 'reason'
 *      startDate: // value for 'startDate'
 *   },
 * });
 */
export function useCreateExecutiveTermMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateExecutiveTermMutation, CreateExecutiveTermMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateExecutiveTermMutation, CreateExecutiveTermMutationVariables>(
    CreateExecutiveTermDocument,
    options
  );
}
export type CreateExecutiveTermMutationHookResult = ReturnType<typeof useCreateExecutiveTermMutation>;
export type CreateExecutiveTermMutationResult = Apollo.MutationResult<CreateExecutiveTermMutation>;
export type CreateExecutiveTermMutationOptions = Apollo.BaseMutationOptions<
  CreateExecutiveTermMutation,
  CreateExecutiveTermMutationVariables
>;
export const CreateNextScholarshipInstallmentDocument = gql`
  mutation createNextScholarshipInstallment(
    $applicationId: String!
    $approvedTotalAmount: Float!
    $installmentAmount: Float!
    $note: String
    $proofDueDays: Int
  ) {
    createNextScholarshipInstallment(
      applicationId: $applicationId
      approvedTotalAmount: $approvedTotalAmount
      installmentAmount: $installmentAmount
      note: $note
      proofDueDays: $proofDueDays
    ) {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;
export type CreateNextScholarshipInstallmentMutationFn = Apollo.MutationFunction<
  CreateNextScholarshipInstallmentMutation,
  CreateNextScholarshipInstallmentMutationVariables
>;

/**
 * __useCreateNextScholarshipInstallmentMutation__
 *
 * To run a mutation, you first call `useCreateNextScholarshipInstallmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNextScholarshipInstallmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNextScholarshipInstallmentMutation, { data, loading, error }] = useCreateNextScholarshipInstallmentMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      approvedTotalAmount: // value for 'approvedTotalAmount'
 *      installmentAmount: // value for 'installmentAmount'
 *      note: // value for 'note'
 *      proofDueDays: // value for 'proofDueDays'
 *   },
 * });
 */
export function useCreateNextScholarshipInstallmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNextScholarshipInstallmentMutation,
    CreateNextScholarshipInstallmentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateNextScholarshipInstallmentMutation,
    CreateNextScholarshipInstallmentMutationVariables
  >(CreateNextScholarshipInstallmentDocument, options);
}
export type CreateNextScholarshipInstallmentMutationHookResult = ReturnType<
  typeof useCreateNextScholarshipInstallmentMutation
>;
export type CreateNextScholarshipInstallmentMutationResult =
  Apollo.MutationResult<CreateNextScholarshipInstallmentMutation>;
export type CreateNextScholarshipInstallmentMutationOptions = Apollo.BaseMutationOptions<
  CreateNextScholarshipInstallmentMutation,
  CreateNextScholarshipInstallmentMutationVariables
>;
export const CreateScholarshipApplicationDraftDocument = gql`
  mutation createScholarshipApplicationDraft($input: ScholarshipApplicationInput!) {
    createScholarshipApplicationDraft(input: $input) {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;
export type CreateScholarshipApplicationDraftMutationFn = Apollo.MutationFunction<
  CreateScholarshipApplicationDraftMutation,
  CreateScholarshipApplicationDraftMutationVariables
>;

/**
 * __useCreateScholarshipApplicationDraftMutation__
 *
 * To run a mutation, you first call `useCreateScholarshipApplicationDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateScholarshipApplicationDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createScholarshipApplicationDraftMutation, { data, loading, error }] = useCreateScholarshipApplicationDraftMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateScholarshipApplicationDraftMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateScholarshipApplicationDraftMutation,
    CreateScholarshipApplicationDraftMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateScholarshipApplicationDraftMutation,
    CreateScholarshipApplicationDraftMutationVariables
  >(CreateScholarshipApplicationDraftDocument, options);
}
export type CreateScholarshipApplicationDraftMutationHookResult = ReturnType<
  typeof useCreateScholarshipApplicationDraftMutation
>;
export type CreateScholarshipApplicationDraftMutationResult =
  Apollo.MutationResult<CreateScholarshipApplicationDraftMutation>;
export type CreateScholarshipApplicationDraftMutationOptions = Apollo.BaseMutationOptions<
  CreateScholarshipApplicationDraftMutation,
  CreateScholarshipApplicationDraftMutationVariables
>;
export const CreateScholarshipDocumentUploadDocument = gql`
  mutation createScholarshipDocumentUpload($input: ScholarshipDocumentUploadInput!) {
    createScholarshipDocumentUpload(input: $input) {
      document {
        applicationId
        category
        checksum
        claimedAmount
        createdAt
        description
        id
        mimeType
        originalFilename
        receiptDate
        sizeBytes
        status
        transactionId
        uploadedAt
        uploadedByUserId
        vendorName
      }
      uploadUrl
    }
  }
`;
export type CreateScholarshipDocumentUploadMutationFn = Apollo.MutationFunction<
  CreateScholarshipDocumentUploadMutation,
  CreateScholarshipDocumentUploadMutationVariables
>;

/**
 * __useCreateScholarshipDocumentUploadMutation__
 *
 * To run a mutation, you first call `useCreateScholarshipDocumentUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateScholarshipDocumentUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createScholarshipDocumentUploadMutation, { data, loading, error }] = useCreateScholarshipDocumentUploadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateScholarshipDocumentUploadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateScholarshipDocumentUploadMutation,
    CreateScholarshipDocumentUploadMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateScholarshipDocumentUploadMutation, CreateScholarshipDocumentUploadMutationVariables>(
    CreateScholarshipDocumentUploadDocument,
    options
  );
}
export type CreateScholarshipDocumentUploadMutationHookResult = ReturnType<
  typeof useCreateScholarshipDocumentUploadMutation
>;
export type CreateScholarshipDocumentUploadMutationResult =
  Apollo.MutationResult<CreateScholarshipDocumentUploadMutation>;
export type CreateScholarshipDocumentUploadMutationOptions = Apollo.BaseMutationOptions<
  CreateScholarshipDocumentUploadMutation,
  CreateScholarshipDocumentUploadMutationVariables
>;
export const CreateTransactionDocument = gql`
  mutation createTransaction(
    $amount: Float!
    $currency: Currency!
    $description: String
    $isDonation: Boolean
    $method: String
    $referenceId: String
    $status: TransactionStatus!
    $title: String!
    $transactionDate: String!
    $type: TransactionType!
    $userId: String!
  ) {
    createTransaction(
      amount: $amount
      currency: $currency
      description: $description
      isDonation: $isDonation
      method: $method
      referenceId: $referenceId
      status: $status
      title: $title
      transactionDate: $transactionDate
      type: $type
      userId: $userId
    ) {
      amount
      createdAt
      currency
      description
      id
      isDonation
      method
      referenceId
      scholarshipApplicationId
      scholarshipApprovedAt
      scholarshipBatchSnapshot
      scholarshipBeneficiaryUserId
      scholarshipCompletedAt
      scholarshipConfirmedAmount
      scholarshipConfirmedAt
      scholarshipImmutableAt
      scholarshipInstallmentSequence
      scholarshipMaskedPayoutDestination
      scholarshipMentorUserId
      scholarshipOriginalTransactionId
      scholarshipPayoutMethod
      scholarshipProofDueAt
      scholarshipProofDueDays
      scholarshipProofStatus
      scholarshipPurposeSnapshot
      scholarshipReceivedAt
      scholarshipStatus
      sourceType
      status
      title
      transactionDate
      type
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      userId
    }
  }
`;
export type CreateTransactionMutationFn = Apollo.MutationFunction<
  CreateTransactionMutation,
  CreateTransactionMutationVariables
>;

/**
 * __useCreateTransactionMutation__
 *
 * To run a mutation, you first call `useCreateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransactionMutation, { data, loading, error }] = useCreateTransactionMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *      currency: // value for 'currency'
 *      description: // value for 'description'
 *      isDonation: // value for 'isDonation'
 *      method: // value for 'method'
 *      referenceId: // value for 'referenceId'
 *      status: // value for 'status'
 *      title: // value for 'title'
 *      transactionDate: // value for 'transactionDate'
 *      type: // value for 'type'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateTransactionMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateTransactionMutation, CreateTransactionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTransactionMutation, CreateTransactionMutationVariables>(
    CreateTransactionDocument,
    options
  );
}
export type CreateTransactionMutationHookResult = ReturnType<typeof useCreateTransactionMutation>;
export type CreateTransactionMutationResult = Apollo.MutationResult<CreateTransactionMutation>;
export type CreateTransactionMutationOptions = Apollo.BaseMutationOptions<
  CreateTransactionMutation,
  CreateTransactionMutationVariables
>;
export const DeleteAddressDocument = gql`
  mutation deleteAddress($id: String!) {
    deleteAddress(id: $id) {
      address
      city
      country
      id
      postalCode
      state
      type
      userId
    }
  }
`;
export type DeleteAddressMutationFn = Apollo.MutationFunction<DeleteAddressMutation, DeleteAddressMutationVariables>;

/**
 * __useDeleteAddressMutation__
 *
 * To run a mutation, you first call `useDeleteAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAddressMutation, { data, loading, error }] = useDeleteAddressMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteAddressMutation, DeleteAddressMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteAddressMutation, DeleteAddressMutationVariables>(DeleteAddressDocument, options);
}
export type DeleteAddressMutationHookResult = ReturnType<typeof useDeleteAddressMutation>;
export type DeleteAddressMutationResult = Apollo.MutationResult<DeleteAddressMutation>;
export type DeleteAddressMutationOptions = Apollo.BaseMutationOptions<
  DeleteAddressMutation,
  DeleteAddressMutationVariables
>;
export const DeleteBlogDocument = gql`
  mutation deleteBlog($id: String!) {
    deleteBlog(id: $id) {
      adminRemark
      author {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      authorId
      categoryId
      claps
      comments {
        author {
          batch
          disabled
          dob
          firstName
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          profileImage
        }
        authorId
        content
        createdAt
        id
        isVerified
        targetId
        targetType
        updatedAt
      }
      content
      cover
      createdAt
      id
      shortUrl
      slug
      status
      summary
      title
      updatedAt
    }
  }
`;
export type DeleteBlogMutationFn = Apollo.MutationFunction<DeleteBlogMutation, DeleteBlogMutationVariables>;

/**
 * __useDeleteBlogMutation__
 *
 * To run a mutation, you first call `useDeleteBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBlogMutation, { data, loading, error }] = useDeleteBlogMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBlogMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteBlogMutation, DeleteBlogMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteBlogMutation, DeleteBlogMutationVariables>(DeleteBlogDocument, options);
}
export type DeleteBlogMutationHookResult = ReturnType<typeof useDeleteBlogMutation>;
export type DeleteBlogMutationResult = Apollo.MutationResult<DeleteBlogMutation>;
export type DeleteBlogMutationOptions = Apollo.BaseMutationOptions<DeleteBlogMutation, DeleteBlogMutationVariables>;
export const DeleteCompanyInfoDocument = gql`
  mutation deleteCompanyInfo($id: String) {
    deleteCompanyInfo(id: $id) {
      address
      city
      companyName
      country
      createdAt
      endedWorking
      id
      isCurrent
      position
      startedWorking
      state
      updatedAt
      user {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      userId
    }
  }
`;
export type DeleteCompanyInfoMutationFn = Apollo.MutationFunction<
  DeleteCompanyInfoMutation,
  DeleteCompanyInfoMutationVariables
>;

/**
 * __useDeleteCompanyInfoMutation__
 *
 * To run a mutation, you first call `useDeleteCompanyInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCompanyInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCompanyInfoMutation, { data, loading, error }] = useDeleteCompanyInfoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCompanyInfoMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCompanyInfoMutation, DeleteCompanyInfoMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteCompanyInfoMutation, DeleteCompanyInfoMutationVariables>(
    DeleteCompanyInfoDocument,
    options
  );
}
export type DeleteCompanyInfoMutationHookResult = ReturnType<typeof useDeleteCompanyInfoMutation>;
export type DeleteCompanyInfoMutationResult = Apollo.MutationResult<DeleteCompanyInfoMutation>;
export type DeleteCompanyInfoMutationOptions = Apollo.BaseMutationOptions<
  DeleteCompanyInfoMutation,
  DeleteCompanyInfoMutationVariables
>;
export const DeleteEventDocument = gql`
  mutation deleteEvent($id: Int!) {
    deleteEvent(id: $id)
  }
`;
export type DeleteEventMutationFn = Apollo.MutationFunction<DeleteEventMutation, DeleteEventMutationVariables>;

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEventMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteEventMutation, DeleteEventMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument, options);
}
export type DeleteEventMutationHookResult = ReturnType<typeof useDeleteEventMutation>;
export type DeleteEventMutationResult = Apollo.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<DeleteEventMutation, DeleteEventMutationVariables>;
export const DeleteTransactionDocument = gql`
  mutation deleteTransaction($id: String!) {
    deleteTransaction(id: $id) {
      amount
      createdAt
      currency
      description
      id
      isDonation
      method
      referenceId
      scholarshipApplicationId
      scholarshipApprovedAt
      scholarshipBatchSnapshot
      scholarshipBeneficiaryUserId
      scholarshipCompletedAt
      scholarshipConfirmedAmount
      scholarshipConfirmedAt
      scholarshipImmutableAt
      scholarshipInstallmentSequence
      scholarshipMaskedPayoutDestination
      scholarshipMentorUserId
      scholarshipOriginalTransactionId
      scholarshipPayoutMethod
      scholarshipProofDueAt
      scholarshipProofDueDays
      scholarshipProofStatus
      scholarshipPurposeSnapshot
      scholarshipReceivedAt
      scholarshipStatus
      sourceType
      status
      title
      transactionDate
      type
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      userId
    }
  }
`;
export type DeleteTransactionMutationFn = Apollo.MutationFunction<
  DeleteTransactionMutation,
  DeleteTransactionMutationVariables
>;

/**
 * __useDeleteTransactionMutation__
 *
 * To run a mutation, you first call `useDeleteTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTransactionMutation, { data, loading, error }] = useDeleteTransactionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTransactionMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteTransactionMutation, DeleteTransactionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteTransactionMutation, DeleteTransactionMutationVariables>(
    DeleteTransactionDocument,
    options
  );
}
export type DeleteTransactionMutationHookResult = ReturnType<typeof useDeleteTransactionMutation>;
export type DeleteTransactionMutationResult = Apollo.MutationResult<DeleteTransactionMutation>;
export type DeleteTransactionMutationOptions = Apollo.BaseMutationOptions<
  DeleteTransactionMutation,
  DeleteTransactionMutationVariables
>;
export const DeleteUserDocument = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      aboutMe
      batch
      companyInfo {
        companyName
        id
        position
        userId
      }
      createdAt
      disabled
      displayName
      dob
      email
      emergencyMobile
      extraEmail
      extraMobile
      firstName
      gender
      google_auth_id
      hasBusiness
      id
      isConfidential
      isFaculty
      isVerified
      lastName
      membershipYear
      metadata
      mobile
      nickName
      positions {
        assignmentId
        code
        name
        termId
        termName
        validFrom
        validUntil
      }
      profileImage
      role {
        code
        id
        name
      }
      roles {
        assignmentId
        code
        name
        scopeBatch
        scopeType
        validFrom
        validUntil
      }
      socialMedia
      updatedAt
      whatsAppMobile
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
export const DisputeMentorFundAllocationDocument = gql`
  mutation disputeMentorFundAllocation($allocationId: String!, $disputedAmount: Float!, $reason: String!) {
    disputeMentorFundAllocation(allocationId: $allocationId, disputedAmount: $disputedAmount, reason: $reason) {
      allocationId
      createdAt
      disputedAmount
      id
      raisedByUserId
      reason
      resolutionNote
      resolutionType
      status
    }
  }
`;
export type DisputeMentorFundAllocationMutationFn = Apollo.MutationFunction<
  DisputeMentorFundAllocationMutation,
  DisputeMentorFundAllocationMutationVariables
>;

/**
 * __useDisputeMentorFundAllocationMutation__
 *
 * To run a mutation, you first call `useDisputeMentorFundAllocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisputeMentorFundAllocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disputeMentorFundAllocationMutation, { data, loading, error }] = useDisputeMentorFundAllocationMutation({
 *   variables: {
 *      allocationId: // value for 'allocationId'
 *      disputedAmount: // value for 'disputedAmount'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useDisputeMentorFundAllocationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DisputeMentorFundAllocationMutation,
    DisputeMentorFundAllocationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DisputeMentorFundAllocationMutation, DisputeMentorFundAllocationMutationVariables>(
    DisputeMentorFundAllocationDocument,
    options
  );
}
export type DisputeMentorFundAllocationMutationHookResult = ReturnType<typeof useDisputeMentorFundAllocationMutation>;
export type DisputeMentorFundAllocationMutationResult = Apollo.MutationResult<DisputeMentorFundAllocationMutation>;
export type DisputeMentorFundAllocationMutationOptions = Apollo.BaseMutationOptions<
  DisputeMentorFundAllocationMutation,
  DisputeMentorFundAllocationMutationVariables
>;
export const FinalizeScholarshipDocumentUploadDocument = gql`
  mutation finalizeScholarshipDocumentUpload($checksum: String, $documentId: String!) {
    finalizeScholarshipDocumentUpload(checksum: $checksum, documentId: $documentId) {
      applicationId
      category
      checksum
      claimedAmount
      createdAt
      description
      id
      mimeType
      originalFilename
      receiptDate
      sizeBytes
      status
      transactionId
      uploadedAt
      uploadedByUserId
      vendorName
    }
  }
`;
export type FinalizeScholarshipDocumentUploadMutationFn = Apollo.MutationFunction<
  FinalizeScholarshipDocumentUploadMutation,
  FinalizeScholarshipDocumentUploadMutationVariables
>;

/**
 * __useFinalizeScholarshipDocumentUploadMutation__
 *
 * To run a mutation, you first call `useFinalizeScholarshipDocumentUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinalizeScholarshipDocumentUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finalizeScholarshipDocumentUploadMutation, { data, loading, error }] = useFinalizeScholarshipDocumentUploadMutation({
 *   variables: {
 *      checksum: // value for 'checksum'
 *      documentId: // value for 'documentId'
 *   },
 * });
 */
export function useFinalizeScholarshipDocumentUploadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    FinalizeScholarshipDocumentUploadMutation,
    FinalizeScholarshipDocumentUploadMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    FinalizeScholarshipDocumentUploadMutation,
    FinalizeScholarshipDocumentUploadMutationVariables
  >(FinalizeScholarshipDocumentUploadDocument, options);
}
export type FinalizeScholarshipDocumentUploadMutationHookResult = ReturnType<
  typeof useFinalizeScholarshipDocumentUploadMutation
>;
export type FinalizeScholarshipDocumentUploadMutationResult =
  Apollo.MutationResult<FinalizeScholarshipDocumentUploadMutation>;
export type FinalizeScholarshipDocumentUploadMutationOptions = Apollo.BaseMutationOptions<
  FinalizeScholarshipDocumentUploadMutation,
  FinalizeScholarshipDocumentUploadMutationVariables
>;
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
export const GetPresignedUrlDocument = gql`
  mutation getPresignedUrl($contentType: String!, $fileName: String!, $imageCategory: String) {
    getPresignedUrl(contentType: $contentType, fileName: $fileName, imageCategory: $imageCategory)
  }
`;
export type GetPresignedUrlMutationFn = Apollo.MutationFunction<
  GetPresignedUrlMutation,
  GetPresignedUrlMutationVariables
>;

/**
 * __useGetPresignedUrlMutation__
 *
 * To run a mutation, you first call `useGetPresignedUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetPresignedUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getPresignedUrlMutation, { data, loading, error }] = useGetPresignedUrlMutation({
 *   variables: {
 *      contentType: // value for 'contentType'
 *      fileName: // value for 'fileName'
 *      imageCategory: // value for 'imageCategory'
 *   },
 * });
 */
export function useGetPresignedUrlMutation(
  baseOptions?: Apollo.MutationHookOptions<GetPresignedUrlMutation, GetPresignedUrlMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<GetPresignedUrlMutation, GetPresignedUrlMutationVariables>(
    GetPresignedUrlDocument,
    options
  );
}
export type GetPresignedUrlMutationHookResult = ReturnType<typeof useGetPresignedUrlMutation>;
export type GetPresignedUrlMutationResult = Apollo.MutationResult<GetPresignedUrlMutation>;
export type GetPresignedUrlMutationOptions = Apollo.BaseMutationOptions<
  GetPresignedUrlMutation,
  GetPresignedUrlMutationVariables
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
export const ManageScholarshipRefundCaseDocument = gql`
  mutation manageScholarshipRefundCase($note: String, $reference: String, $refundId: String!, $status: String!) {
    manageScholarshipRefundCase(note: $note, reference: $reference, refundId: $refundId, status: $status) {
      beneficiaryRefundProofDocumentId
      beneficiaryUserId
      confirmedRefundAmount
      id
      linkedRefundTransactionId
      originalTransactionId
      refundPaymentReference
      requestedAmount
      status
      wrongDisbursementCaseId
    }
  }
`;
export type ManageScholarshipRefundCaseMutationFn = Apollo.MutationFunction<
  ManageScholarshipRefundCaseMutation,
  ManageScholarshipRefundCaseMutationVariables
>;

/**
 * __useManageScholarshipRefundCaseMutation__
 *
 * To run a mutation, you first call `useManageScholarshipRefundCaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useManageScholarshipRefundCaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [manageScholarshipRefundCaseMutation, { data, loading, error }] = useManageScholarshipRefundCaseMutation({
 *   variables: {
 *      note: // value for 'note'
 *      reference: // value for 'reference'
 *      refundId: // value for 'refundId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useManageScholarshipRefundCaseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ManageScholarshipRefundCaseMutation,
    ManageScholarshipRefundCaseMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ManageScholarshipRefundCaseMutation, ManageScholarshipRefundCaseMutationVariables>(
    ManageScholarshipRefundCaseDocument,
    options
  );
}
export type ManageScholarshipRefundCaseMutationHookResult = ReturnType<typeof useManageScholarshipRefundCaseMutation>;
export type ManageScholarshipRefundCaseMutationResult = Apollo.MutationResult<ManageScholarshipRefundCaseMutation>;
export type ManageScholarshipRefundCaseMutationOptions = Apollo.BaseMutationOptions<
  ManageScholarshipRefundCaseMutation,
  ManageScholarshipRefundCaseMutationVariables
>;
export const MarkScholarshipWrongDisbursementDocument = gql`
  mutation markScholarshipWrongDisbursement(
    $affectedDocumentIds: [String!]
    $disputedAmount: Float!
    $reason: String!
    $refundRequested: Boolean
    $requestedRefundAmount: Float
    $transactionId: String!
  ) {
    markScholarshipWrongDisbursement(
      affectedDocumentIds: $affectedDocumentIds
      disputedAmount: $disputedAmount
      reason: $reason
      refundRequested: $refundRequested
      requestedRefundAmount: $requestedRefundAmount
      transactionId: $transactionId
    ) {
      affectedDocumentIds
      applicationId
      beneficiaryResponse
      disputedAmount
      id
      originalTransactionId
      reason
      refundRequested
      reportedAt
      reportedByUserId
      requestedRefundAmount
      status
    }
  }
`;
export type MarkScholarshipWrongDisbursementMutationFn = Apollo.MutationFunction<
  MarkScholarshipWrongDisbursementMutation,
  MarkScholarshipWrongDisbursementMutationVariables
>;

/**
 * __useMarkScholarshipWrongDisbursementMutation__
 *
 * To run a mutation, you first call `useMarkScholarshipWrongDisbursementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkScholarshipWrongDisbursementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markScholarshipWrongDisbursementMutation, { data, loading, error }] = useMarkScholarshipWrongDisbursementMutation({
 *   variables: {
 *      affectedDocumentIds: // value for 'affectedDocumentIds'
 *      disputedAmount: // value for 'disputedAmount'
 *      reason: // value for 'reason'
 *      refundRequested: // value for 'refundRequested'
 *      requestedRefundAmount: // value for 'requestedRefundAmount'
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useMarkScholarshipWrongDisbursementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MarkScholarshipWrongDisbursementMutation,
    MarkScholarshipWrongDisbursementMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    MarkScholarshipWrongDisbursementMutation,
    MarkScholarshipWrongDisbursementMutationVariables
  >(MarkScholarshipWrongDisbursementDocument, options);
}
export type MarkScholarshipWrongDisbursementMutationHookResult = ReturnType<
  typeof useMarkScholarshipWrongDisbursementMutation
>;
export type MarkScholarshipWrongDisbursementMutationResult =
  Apollo.MutationResult<MarkScholarshipWrongDisbursementMutation>;
export type MarkScholarshipWrongDisbursementMutationOptions = Apollo.BaseMutationOptions<
  MarkScholarshipWrongDisbursementMutation,
  MarkScholarshipWrongDisbursementMutationVariables
>;
export const PublishEventDocument = gql`
  mutation publishEvent($eventId: Int!, $status: EventStatus!) {
    publishEvent(eventId: $eventId, status: $status)
  }
`;
export type PublishEventMutationFn = Apollo.MutationFunction<PublishEventMutation, PublishEventMutationVariables>;

/**
 * __usePublishEventMutation__
 *
 * To run a mutation, you first call `usePublishEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishEventMutation, { data, loading, error }] = usePublishEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function usePublishEventMutation(
  baseOptions?: Apollo.MutationHookOptions<PublishEventMutation, PublishEventMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PublishEventMutation, PublishEventMutationVariables>(PublishEventDocument, options);
}
export type PublishEventMutationHookResult = ReturnType<typeof usePublishEventMutation>;
export type PublishEventMutationResult = Apollo.MutationResult<PublishEventMutation>;
export type PublishEventMutationOptions = Apollo.BaseMutationOptions<
  PublishEventMutation,
  PublishEventMutationVariables
>;
export const ReassignScholarshipApplicationDocument = gql`
  mutation reassignScholarshipApplication($applicationId: String!, $mentorUserId: String!, $reason: String!) {
    reassignScholarshipApplication(applicationId: $applicationId, mentorUserId: $mentorUserId, reason: $reason) {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;
export type ReassignScholarshipApplicationMutationFn = Apollo.MutationFunction<
  ReassignScholarshipApplicationMutation,
  ReassignScholarshipApplicationMutationVariables
>;

/**
 * __useReassignScholarshipApplicationMutation__
 *
 * To run a mutation, you first call `useReassignScholarshipApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReassignScholarshipApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reassignScholarshipApplicationMutation, { data, loading, error }] = useReassignScholarshipApplicationMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      mentorUserId: // value for 'mentorUserId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useReassignScholarshipApplicationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ReassignScholarshipApplicationMutation,
    ReassignScholarshipApplicationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ReassignScholarshipApplicationMutation, ReassignScholarshipApplicationMutationVariables>(
    ReassignScholarshipApplicationDocument,
    options
  );
}
export type ReassignScholarshipApplicationMutationHookResult = ReturnType<
  typeof useReassignScholarshipApplicationMutation
>;
export type ReassignScholarshipApplicationMutationResult =
  Apollo.MutationResult<ReassignScholarshipApplicationMutation>;
export type ReassignScholarshipApplicationMutationOptions = Apollo.BaseMutationOptions<
  ReassignScholarshipApplicationMutation,
  ReassignScholarshipApplicationMutationVariables
>;
export const RecordMentorFundAllocationDocument = gql`
  mutation recordMentorFundAllocation($input: RecordMentorFundAllocationInput!) {
    recordMentorFundAllocation(input: $input) {
      amount
      batch
      confirmedAmount
      createdAt
      currency
      disputedAmount
      id
      mentorUserId
      method
      notes
      recordedByUserId
      reference
      status
      transferDate
    }
  }
`;
export type RecordMentorFundAllocationMutationFn = Apollo.MutationFunction<
  RecordMentorFundAllocationMutation,
  RecordMentorFundAllocationMutationVariables
>;

/**
 * __useRecordMentorFundAllocationMutation__
 *
 * To run a mutation, you first call `useRecordMentorFundAllocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecordMentorFundAllocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recordMentorFundAllocationMutation, { data, loading, error }] = useRecordMentorFundAllocationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRecordMentorFundAllocationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RecordMentorFundAllocationMutation,
    RecordMentorFundAllocationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RecordMentorFundAllocationMutation, RecordMentorFundAllocationMutationVariables>(
    RecordMentorFundAllocationDocument,
    options
  );
}
export type RecordMentorFundAllocationMutationHookResult = ReturnType<typeof useRecordMentorFundAllocationMutation>;
export type RecordMentorFundAllocationMutationResult = Apollo.MutationResult<RecordMentorFundAllocationMutation>;
export type RecordMentorFundAllocationMutationOptions = Apollo.BaseMutationOptions<
  RecordMentorFundAllocationMutation,
  RecordMentorFundAllocationMutationVariables
>;
export const RefreshTokenDocument = gql`
  mutation refreshToken {
    refreshToken {
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
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
export const RejectMemberRegistrationDocument = gql`
  mutation rejectMemberRegistration($reason: String!, $userId: String!) {
    rejectMemberRegistration(reason: $reason, userId: $userId)
  }
`;
export type RejectMemberRegistrationMutationFn = Apollo.MutationFunction<
  RejectMemberRegistrationMutation,
  RejectMemberRegistrationMutationVariables
>;

/**
 * __useRejectMemberRegistrationMutation__
 *
 * To run a mutation, you first call `useRejectMemberRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectMemberRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectMemberRegistrationMutation, { data, loading, error }] = useRejectMemberRegistrationMutation({
 *   variables: {
 *      reason: // value for 'reason'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRejectMemberRegistrationMutation(
  baseOptions?: Apollo.MutationHookOptions<RejectMemberRegistrationMutation, RejectMemberRegistrationMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RejectMemberRegistrationMutation, RejectMemberRegistrationMutationVariables>(
    RejectMemberRegistrationDocument,
    options
  );
}
export type RejectMemberRegistrationMutationHookResult = ReturnType<typeof useRejectMemberRegistrationMutation>;
export type RejectMemberRegistrationMutationResult = Apollo.MutationResult<RejectMemberRegistrationMutation>;
export type RejectMemberRegistrationMutationOptions = Apollo.BaseMutationOptions<
  RejectMemberRegistrationMutation,
  RejectMemberRegistrationMutationVariables
>;
export const RejectScholarshipApplicationDocument = gql`
  mutation rejectScholarshipApplication($applicationId: String!, $reason: String!) {
    rejectScholarshipApplication(applicationId: $applicationId, reason: $reason) {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;
export type RejectScholarshipApplicationMutationFn = Apollo.MutationFunction<
  RejectScholarshipApplicationMutation,
  RejectScholarshipApplicationMutationVariables
>;

/**
 * __useRejectScholarshipApplicationMutation__
 *
 * To run a mutation, you first call `useRejectScholarshipApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectScholarshipApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectScholarshipApplicationMutation, { data, loading, error }] = useRejectScholarshipApplicationMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useRejectScholarshipApplicationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RejectScholarshipApplicationMutation,
    RejectScholarshipApplicationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RejectScholarshipApplicationMutation, RejectScholarshipApplicationMutationVariables>(
    RejectScholarshipApplicationDocument,
    options
  );
}
export type RejectScholarshipApplicationMutationHookResult = ReturnType<typeof useRejectScholarshipApplicationMutation>;
export type RejectScholarshipApplicationMutationResult = Apollo.MutationResult<RejectScholarshipApplicationMutation>;
export type RejectScholarshipApplicationMutationOptions = Apollo.BaseMutationOptions<
  RejectScholarshipApplicationMutation,
  RejectScholarshipApplicationMutationVariables
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
export const RequestChangesBlogDocument = gql`
  mutation requestChangesBlog($adminRemark: String, $id: String!) {
    requestChangesBlog(adminRemark: $adminRemark, id: $id) {
      adminRemark
      author {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      authorId
      categoryId
      claps
      comments {
        author {
          batch
          disabled
          dob
          firstName
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          profileImage
        }
        authorId
        content
        createdAt
        id
        isVerified
        targetId
        targetType
        updatedAt
      }
      content
      cover
      createdAt
      id
      shortUrl
      slug
      status
      summary
      title
      updatedAt
    }
  }
`;
export type RequestChangesBlogMutationFn = Apollo.MutationFunction<
  RequestChangesBlogMutation,
  RequestChangesBlogMutationVariables
>;

/**
 * __useRequestChangesBlogMutation__
 *
 * To run a mutation, you first call `useRequestChangesBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestChangesBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestChangesBlogMutation, { data, loading, error }] = useRequestChangesBlogMutation({
 *   variables: {
 *      adminRemark: // value for 'adminRemark'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRequestChangesBlogMutation(
  baseOptions?: Apollo.MutationHookOptions<RequestChangesBlogMutation, RequestChangesBlogMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RequestChangesBlogMutation, RequestChangesBlogMutationVariables>(
    RequestChangesBlogDocument,
    options
  );
}
export type RequestChangesBlogMutationHookResult = ReturnType<typeof useRequestChangesBlogMutation>;
export type RequestChangesBlogMutationResult = Apollo.MutationResult<RequestChangesBlogMutation>;
export type RequestChangesBlogMutationOptions = Apollo.BaseMutationOptions<
  RequestChangesBlogMutation,
  RequestChangesBlogMutationVariables
>;
export const RequestScholarshipApplicationInfoDocument = gql`
  mutation requestScholarshipApplicationInfo($applicationId: String!, $message: String!) {
    requestScholarshipApplicationInfo(applicationId: $applicationId, message: $message) {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;
export type RequestScholarshipApplicationInfoMutationFn = Apollo.MutationFunction<
  RequestScholarshipApplicationInfoMutation,
  RequestScholarshipApplicationInfoMutationVariables
>;

/**
 * __useRequestScholarshipApplicationInfoMutation__
 *
 * To run a mutation, you first call `useRequestScholarshipApplicationInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestScholarshipApplicationInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestScholarshipApplicationInfoMutation, { data, loading, error }] = useRequestScholarshipApplicationInfoMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useRequestScholarshipApplicationInfoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RequestScholarshipApplicationInfoMutation,
    RequestScholarshipApplicationInfoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RequestScholarshipApplicationInfoMutation,
    RequestScholarshipApplicationInfoMutationVariables
  >(RequestScholarshipApplicationInfoDocument, options);
}
export type RequestScholarshipApplicationInfoMutationHookResult = ReturnType<
  typeof useRequestScholarshipApplicationInfoMutation
>;
export type RequestScholarshipApplicationInfoMutationResult =
  Apollo.MutationResult<RequestScholarshipApplicationInfoMutation>;
export type RequestScholarshipApplicationInfoMutationOptions = Apollo.BaseMutationOptions<
  RequestScholarshipApplicationInfoMutation,
  RequestScholarshipApplicationInfoMutationVariables
>;
export const RequestScholarshipDisbursalFollowupDocument = gql`
  mutation requestScholarshipDisbursalFollowup($transactionId: String!) {
    requestScholarshipDisbursalFollowup(transactionId: $transactionId)
  }
`;
export type RequestScholarshipDisbursalFollowupMutationFn = Apollo.MutationFunction<
  RequestScholarshipDisbursalFollowupMutation,
  RequestScholarshipDisbursalFollowupMutationVariables
>;

/**
 * __useRequestScholarshipDisbursalFollowupMutation__
 *
 * To run a mutation, you first call `useRequestScholarshipDisbursalFollowupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestScholarshipDisbursalFollowupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestScholarshipDisbursalFollowupMutation, { data, loading, error }] = useRequestScholarshipDisbursalFollowupMutation({
 *   variables: {
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useRequestScholarshipDisbursalFollowupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RequestScholarshipDisbursalFollowupMutation,
    RequestScholarshipDisbursalFollowupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RequestScholarshipDisbursalFollowupMutation,
    RequestScholarshipDisbursalFollowupMutationVariables
  >(RequestScholarshipDisbursalFollowupDocument, options);
}
export type RequestScholarshipDisbursalFollowupMutationHookResult = ReturnType<
  typeof useRequestScholarshipDisbursalFollowupMutation
>;
export type RequestScholarshipDisbursalFollowupMutationResult =
  Apollo.MutationResult<RequestScholarshipDisbursalFollowupMutation>;
export type RequestScholarshipDisbursalFollowupMutationOptions = Apollo.BaseMutationOptions<
  RequestScholarshipDisbursalFollowupMutation,
  RequestScholarshipDisbursalFollowupMutationVariables
>;
export const ResetPasswordDocument = gql`
  mutation resetPassword($newPassword: String!, $token: String) {
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
export const ResolveMentorAllocationDisputeDocument = gql`
  mutation resolveMentorAllocationDispute($disputeId: String!, $resolutionNote: String, $resolutionType: String!) {
    resolveMentorAllocationDispute(
      disputeId: $disputeId
      resolutionNote: $resolutionNote
      resolutionType: $resolutionType
    ) {
      allocationId
      createdAt
      disputedAmount
      id
      raisedByUserId
      reason
      resolutionNote
      resolutionType
      status
    }
  }
`;
export type ResolveMentorAllocationDisputeMutationFn = Apollo.MutationFunction<
  ResolveMentorAllocationDisputeMutation,
  ResolveMentorAllocationDisputeMutationVariables
>;

/**
 * __useResolveMentorAllocationDisputeMutation__
 *
 * To run a mutation, you first call `useResolveMentorAllocationDisputeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResolveMentorAllocationDisputeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resolveMentorAllocationDisputeMutation, { data, loading, error }] = useResolveMentorAllocationDisputeMutation({
 *   variables: {
 *      disputeId: // value for 'disputeId'
 *      resolutionNote: // value for 'resolutionNote'
 *      resolutionType: // value for 'resolutionType'
 *   },
 * });
 */
export function useResolveMentorAllocationDisputeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResolveMentorAllocationDisputeMutation,
    ResolveMentorAllocationDisputeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ResolveMentorAllocationDisputeMutation, ResolveMentorAllocationDisputeMutationVariables>(
    ResolveMentorAllocationDisputeDocument,
    options
  );
}
export type ResolveMentorAllocationDisputeMutationHookResult = ReturnType<
  typeof useResolveMentorAllocationDisputeMutation
>;
export type ResolveMentorAllocationDisputeMutationResult =
  Apollo.MutationResult<ResolveMentorAllocationDisputeMutation>;
export type ResolveMentorAllocationDisputeMutationOptions = Apollo.BaseMutationOptions<
  ResolveMentorAllocationDisputeMutation,
  ResolveMentorAllocationDisputeMutationVariables
>;
export const RespondToScholarshipRefundDocument = gql`
  mutation respondToScholarshipRefund($proofDocumentId: String, $refundId: String!, $response: String!) {
    respondToScholarshipRefund(proofDocumentId: $proofDocumentId, refundId: $refundId, response: $response) {
      beneficiaryRefundProofDocumentId
      beneficiaryUserId
      confirmedRefundAmount
      id
      linkedRefundTransactionId
      originalTransactionId
      refundPaymentReference
      requestedAmount
      status
      wrongDisbursementCaseId
    }
  }
`;
export type RespondToScholarshipRefundMutationFn = Apollo.MutationFunction<
  RespondToScholarshipRefundMutation,
  RespondToScholarshipRefundMutationVariables
>;

/**
 * __useRespondToScholarshipRefundMutation__
 *
 * To run a mutation, you first call `useRespondToScholarshipRefundMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRespondToScholarshipRefundMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [respondToScholarshipRefundMutation, { data, loading, error }] = useRespondToScholarshipRefundMutation({
 *   variables: {
 *      proofDocumentId: // value for 'proofDocumentId'
 *      refundId: // value for 'refundId'
 *      response: // value for 'response'
 *   },
 * });
 */
export function useRespondToScholarshipRefundMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RespondToScholarshipRefundMutation,
    RespondToScholarshipRefundMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RespondToScholarshipRefundMutation, RespondToScholarshipRefundMutationVariables>(
    RespondToScholarshipRefundDocument,
    options
  );
}
export type RespondToScholarshipRefundMutationHookResult = ReturnType<typeof useRespondToScholarshipRefundMutation>;
export type RespondToScholarshipRefundMutationResult = Apollo.MutationResult<RespondToScholarshipRefundMutation>;
export type RespondToScholarshipRefundMutationOptions = Apollo.BaseMutationOptions<
  RespondToScholarshipRefundMutation,
  RespondToScholarshipRefundMutationVariables
>;
export const ResubmitScholarshipApplicationDocument = gql`
  mutation resubmitScholarshipApplication($applicationId: String!) {
    resubmitScholarshipApplication(applicationId: $applicationId) {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;
export type ResubmitScholarshipApplicationMutationFn = Apollo.MutationFunction<
  ResubmitScholarshipApplicationMutation,
  ResubmitScholarshipApplicationMutationVariables
>;

/**
 * __useResubmitScholarshipApplicationMutation__
 *
 * To run a mutation, you first call `useResubmitScholarshipApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResubmitScholarshipApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resubmitScholarshipApplicationMutation, { data, loading, error }] = useResubmitScholarshipApplicationMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *   },
 * });
 */
export function useResubmitScholarshipApplicationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResubmitScholarshipApplicationMutation,
    ResubmitScholarshipApplicationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ResubmitScholarshipApplicationMutation, ResubmitScholarshipApplicationMutationVariables>(
    ResubmitScholarshipApplicationDocument,
    options
  );
}
export type ResubmitScholarshipApplicationMutationHookResult = ReturnType<
  typeof useResubmitScholarshipApplicationMutation
>;
export type ResubmitScholarshipApplicationMutationResult =
  Apollo.MutationResult<ResubmitScholarshipApplicationMutation>;
export type ResubmitScholarshipApplicationMutationOptions = Apollo.BaseMutationOptions<
  ResubmitScholarshipApplicationMutation,
  ResubmitScholarshipApplicationMutationVariables
>;
export const ReviewScholarshipUsageProofDocument = gql`
  mutation reviewScholarshipUsageProof($action: ScholarshipProofReviewAction!, $note: String, $submissionId: String!) {
    reviewScholarshipUsageProof(action: $action, note: $note, submissionId: $submissionId) {
      applicationId
      id
      reviewNote
      reviewedAt
      reviewedByUserId
      status
      submissionSequence
      submittedAt
      submittedByUserId
      submittedCoverage
      transactionId
    }
  }
`;
export type ReviewScholarshipUsageProofMutationFn = Apollo.MutationFunction<
  ReviewScholarshipUsageProofMutation,
  ReviewScholarshipUsageProofMutationVariables
>;

/**
 * __useReviewScholarshipUsageProofMutation__
 *
 * To run a mutation, you first call `useReviewScholarshipUsageProofMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReviewScholarshipUsageProofMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reviewScholarshipUsageProofMutation, { data, loading, error }] = useReviewScholarshipUsageProofMutation({
 *   variables: {
 *      action: // value for 'action'
 *      note: // value for 'note'
 *      submissionId: // value for 'submissionId'
 *   },
 * });
 */
export function useReviewScholarshipUsageProofMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ReviewScholarshipUsageProofMutation,
    ReviewScholarshipUsageProofMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ReviewScholarshipUsageProofMutation, ReviewScholarshipUsageProofMutationVariables>(
    ReviewScholarshipUsageProofDocument,
    options
  );
}
export type ReviewScholarshipUsageProofMutationHookResult = ReturnType<typeof useReviewScholarshipUsageProofMutation>;
export type ReviewScholarshipUsageProofMutationResult = Apollo.MutationResult<ReviewScholarshipUsageProofMutation>;
export type ReviewScholarshipUsageProofMutationOptions = Apollo.BaseMutationOptions<
  ReviewScholarshipUsageProofMutation,
  ReviewScholarshipUsageProofMutationVariables
>;
export const RevokeExecutivePositionDocument = gql`
  mutation revokeExecutivePosition($input: RevokeExecutivePositionInput!) {
    revokeExecutivePosition(input: $input) {
      assignedByUserId
      assignmentReason
      createdAt
      executiveTerm {
        createdAt
        createdByUserId
        endDate
        id
        name
        startDate
        status
        updatedAt
      }
      executiveTermId
      id
      position {
        code
        createdAt
        id
        isActive
        isSingleSeat
        name
        updatedAt
      }
      positionId
      revocationReason
      revokedAt
      revokedByUserId
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      userId
      validFrom
      validUntil
    }
  }
`;
export type RevokeExecutivePositionMutationFn = Apollo.MutationFunction<
  RevokeExecutivePositionMutation,
  RevokeExecutivePositionMutationVariables
>;

/**
 * __useRevokeExecutivePositionMutation__
 *
 * To run a mutation, you first call `useRevokeExecutivePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeExecutivePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeExecutivePositionMutation, { data, loading, error }] = useRevokeExecutivePositionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRevokeExecutivePositionMutation(
  baseOptions?: Apollo.MutationHookOptions<RevokeExecutivePositionMutation, RevokeExecutivePositionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RevokeExecutivePositionMutation, RevokeExecutivePositionMutationVariables>(
    RevokeExecutivePositionDocument,
    options
  );
}
export type RevokeExecutivePositionMutationHookResult = ReturnType<typeof useRevokeExecutivePositionMutation>;
export type RevokeExecutivePositionMutationResult = Apollo.MutationResult<RevokeExecutivePositionMutation>;
export type RevokeExecutivePositionMutationOptions = Apollo.BaseMutationOptions<
  RevokeExecutivePositionMutation,
  RevokeExecutivePositionMutationVariables
>;
export const RevokeUserRoleDocument = gql`
  mutation revokeUserRole($input: RevokeUserRoleInput!) {
    revokeUserRole(input: $input) {
      assignedByUserId
      assignmentReason
      createdAt
      id
      revocationReason
      revokedAt
      revokedByUserId
      role {
        code
        description
        id
        isActive
        isSystem
        name
      }
      roleId
      scopeBatch
      scopeType
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      userId
      validFrom
      validUntil
    }
  }
`;
export type RevokeUserRoleMutationFn = Apollo.MutationFunction<RevokeUserRoleMutation, RevokeUserRoleMutationVariables>;

/**
 * __useRevokeUserRoleMutation__
 *
 * To run a mutation, you first call `useRevokeUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeUserRoleMutation, { data, loading, error }] = useRevokeUserRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRevokeUserRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<RevokeUserRoleMutation, RevokeUserRoleMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RevokeUserRoleMutation, RevokeUserRoleMutationVariables>(RevokeUserRoleDocument, options);
}
export type RevokeUserRoleMutationHookResult = ReturnType<typeof useRevokeUserRoleMutation>;
export type RevokeUserRoleMutationResult = Apollo.MutationResult<RevokeUserRoleMutation>;
export type RevokeUserRoleMutationOptions = Apollo.BaseMutationOptions<
  RevokeUserRoleMutation,
  RevokeUserRoleMutationVariables
>;
export const SendMassEmailDocument = gql`
  mutation sendMassEmail($context: JSON, $subject: String!, $template: String!) {
    sendMassEmail(context: $context, subject: $subject, template: $template)
  }
`;
export type SendMassEmailMutationFn = Apollo.MutationFunction<SendMassEmailMutation, SendMassEmailMutationVariables>;

/**
 * __useSendMassEmailMutation__
 *
 * To run a mutation, you first call `useSendMassEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMassEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMassEmailMutation, { data, loading, error }] = useSendMassEmailMutation({
 *   variables: {
 *      context: // value for 'context'
 *      subject: // value for 'subject'
 *      template: // value for 'template'
 *   },
 * });
 */
export function useSendMassEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<SendMassEmailMutation, SendMassEmailMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SendMassEmailMutation, SendMassEmailMutationVariables>(SendMassEmailDocument, options);
}
export type SendMassEmailMutationHookResult = ReturnType<typeof useSendMassEmailMutation>;
export type SendMassEmailMutationResult = Apollo.MutationResult<SendMassEmailMutation>;
export type SendMassEmailMutationOptions = Apollo.BaseMutationOptions<
  SendMassEmailMutation,
  SendMassEmailMutationVariables
>;
export const SetScholarshipPrimaryMentorDocument = gql`
  mutation setScholarshipPrimaryMentor(
    $batch: Int!
    $mentorUserId: String!
    $reason: String
    $validFrom: String
    $validUntil: String
  ) {
    setScholarshipPrimaryMentor(
      batch: $batch
      mentorUserId: $mentorUserId
      reason: $reason
      validFrom: $validFrom
      validUntil: $validUntil
    ) {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;
export type SetScholarshipPrimaryMentorMutationFn = Apollo.MutationFunction<
  SetScholarshipPrimaryMentorMutation,
  SetScholarshipPrimaryMentorMutationVariables
>;

/**
 * __useSetScholarshipPrimaryMentorMutation__
 *
 * To run a mutation, you first call `useSetScholarshipPrimaryMentorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetScholarshipPrimaryMentorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setScholarshipPrimaryMentorMutation, { data, loading, error }] = useSetScholarshipPrimaryMentorMutation({
 *   variables: {
 *      batch: // value for 'batch'
 *      mentorUserId: // value for 'mentorUserId'
 *      reason: // value for 'reason'
 *      validFrom: // value for 'validFrom'
 *      validUntil: // value for 'validUntil'
 *   },
 * });
 */
export function useSetScholarshipPrimaryMentorMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetScholarshipPrimaryMentorMutation,
    SetScholarshipPrimaryMentorMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SetScholarshipPrimaryMentorMutation, SetScholarshipPrimaryMentorMutationVariables>(
    SetScholarshipPrimaryMentorDocument,
    options
  );
}
export type SetScholarshipPrimaryMentorMutationHookResult = ReturnType<typeof useSetScholarshipPrimaryMentorMutation>;
export type SetScholarshipPrimaryMentorMutationResult = Apollo.MutationResult<SetScholarshipPrimaryMentorMutation>;
export type SetScholarshipPrimaryMentorMutationOptions = Apollo.BaseMutationOptions<
  SetScholarshipPrimaryMentorMutation,
  SetScholarshipPrimaryMentorMutationVariables
>;
export const SigninDocument = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
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
    $isFaculty: Boolean
    $lastName: String!
    $mobile: String!
    $password: String!
  ) {
    signup(
      batch: $batch
      email: $email
      firstName: $firstName
      gender: $gender
      isFaculty: $isFaculty
      lastName: $lastName
      mobile: $mobile
      password: $password
    ) {
      aboutMe
      batch
      companyInfo {
        companyName
        id
        position
        userId
      }
      createdAt
      disabled
      displayName
      dob
      email
      emergencyMobile
      extraEmail
      extraMobile
      firstName
      gender
      google_auth_id
      hasBusiness
      id
      isConfidential
      isFaculty
      isVerified
      lastName
      membershipYear
      metadata
      mobile
      nickName
      positions {
        assignmentId
        code
        name
        termId
        termName
        validFrom
        validUntil
      }
      profileImage
      role {
        code
        id
        name
      }
      roles {
        assignmentId
        code
        name
        scopeBatch
        scopeType
        validFrom
        validUntil
      }
      socialMedia
      updatedAt
      whatsAppMobile
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
 *      isFaculty: // value for 'isFaculty'
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
export const StartScholarshipApplicationReviewDocument = gql`
  mutation startScholarshipApplicationReview($applicationId: String!) {
    startScholarshipApplicationReview(applicationId: $applicationId) {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;
export type StartScholarshipApplicationReviewMutationFn = Apollo.MutationFunction<
  StartScholarshipApplicationReviewMutation,
  StartScholarshipApplicationReviewMutationVariables
>;

/**
 * __useStartScholarshipApplicationReviewMutation__
 *
 * To run a mutation, you first call `useStartScholarshipApplicationReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartScholarshipApplicationReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startScholarshipApplicationReviewMutation, { data, loading, error }] = useStartScholarshipApplicationReviewMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *   },
 * });
 */
export function useStartScholarshipApplicationReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    StartScholarshipApplicationReviewMutation,
    StartScholarshipApplicationReviewMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    StartScholarshipApplicationReviewMutation,
    StartScholarshipApplicationReviewMutationVariables
  >(StartScholarshipApplicationReviewDocument, options);
}
export type StartScholarshipApplicationReviewMutationHookResult = ReturnType<
  typeof useStartScholarshipApplicationReviewMutation
>;
export type StartScholarshipApplicationReviewMutationResult =
  Apollo.MutationResult<StartScholarshipApplicationReviewMutation>;
export type StartScholarshipApplicationReviewMutationOptions = Apollo.BaseMutationOptions<
  StartScholarshipApplicationReviewMutation,
  StartScholarshipApplicationReviewMutationVariables
>;
export const SubmitScholarshipApplicationDocument = gql`
  mutation submitScholarshipApplication($applicationId: String!) {
    submitScholarshipApplication(applicationId: $applicationId) {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;
export type SubmitScholarshipApplicationMutationFn = Apollo.MutationFunction<
  SubmitScholarshipApplicationMutation,
  SubmitScholarshipApplicationMutationVariables
>;

/**
 * __useSubmitScholarshipApplicationMutation__
 *
 * To run a mutation, you first call `useSubmitScholarshipApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitScholarshipApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitScholarshipApplicationMutation, { data, loading, error }] = useSubmitScholarshipApplicationMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *   },
 * });
 */
export function useSubmitScholarshipApplicationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubmitScholarshipApplicationMutation,
    SubmitScholarshipApplicationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SubmitScholarshipApplicationMutation, SubmitScholarshipApplicationMutationVariables>(
    SubmitScholarshipApplicationDocument,
    options
  );
}
export type SubmitScholarshipApplicationMutationHookResult = ReturnType<typeof useSubmitScholarshipApplicationMutation>;
export type SubmitScholarshipApplicationMutationResult = Apollo.MutationResult<SubmitScholarshipApplicationMutation>;
export type SubmitScholarshipApplicationMutationOptions = Apollo.BaseMutationOptions<
  SubmitScholarshipApplicationMutation,
  SubmitScholarshipApplicationMutationVariables
>;
export const SubmitScholarshipUsageProofDocument = gql`
  mutation submitScholarshipUsageProof($documentIds: [String!]!, $transactionId: String!) {
    submitScholarshipUsageProof(documentIds: $documentIds, transactionId: $transactionId) {
      applicationId
      id
      reviewNote
      reviewedAt
      reviewedByUserId
      status
      submissionSequence
      submittedAt
      submittedByUserId
      submittedCoverage
      transactionId
    }
  }
`;
export type SubmitScholarshipUsageProofMutationFn = Apollo.MutationFunction<
  SubmitScholarshipUsageProofMutation,
  SubmitScholarshipUsageProofMutationVariables
>;

/**
 * __useSubmitScholarshipUsageProofMutation__
 *
 * To run a mutation, you first call `useSubmitScholarshipUsageProofMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitScholarshipUsageProofMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitScholarshipUsageProofMutation, { data, loading, error }] = useSubmitScholarshipUsageProofMutation({
 *   variables: {
 *      documentIds: // value for 'documentIds'
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useSubmitScholarshipUsageProofMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubmitScholarshipUsageProofMutation,
    SubmitScholarshipUsageProofMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SubmitScholarshipUsageProofMutation, SubmitScholarshipUsageProofMutationVariables>(
    SubmitScholarshipUsageProofDocument,
    options
  );
}
export type SubmitScholarshipUsageProofMutationHookResult = ReturnType<typeof useSubmitScholarshipUsageProofMutation>;
export type SubmitScholarshipUsageProofMutationResult = Apollo.MutationResult<SubmitScholarshipUsageProofMutation>;
export type SubmitScholarshipUsageProofMutationOptions = Apollo.BaseMutationOptions<
  SubmitScholarshipUsageProofMutation,
  SubmitScholarshipUsageProofMutationVariables
>;
export const UpdateAddressDocument = gql`
  mutation updateAddress(
    $address: String
    $city: String
    $country: String
    $id: String!
    $postalCode: String
    $state: String
    $type: String!
  ) {
    updateAddress(
      address: $address
      city: $city
      country: $country
      id: $id
      postalCode: $postalCode
      state: $state
      type: $type
    ) {
      address
      city
      country
      id
      postalCode
      state
      type
      userId
    }
  }
`;
export type UpdateAddressMutationFn = Apollo.MutationFunction<UpdateAddressMutation, UpdateAddressMutationVariables>;

/**
 * __useUpdateAddressMutation__
 *
 * To run a mutation, you first call `useUpdateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddressMutation, { data, loading, error }] = useUpdateAddressMutation({
 *   variables: {
 *      address: // value for 'address'
 *      city: // value for 'city'
 *      country: // value for 'country'
 *      id: // value for 'id'
 *      postalCode: // value for 'postalCode'
 *      state: // value for 'state'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useUpdateAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateAddressMutation, UpdateAddressMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateAddressMutation, UpdateAddressMutationVariables>(UpdateAddressDocument, options);
}
export type UpdateAddressMutationHookResult = ReturnType<typeof useUpdateAddressMutation>;
export type UpdateAddressMutationResult = Apollo.MutationResult<UpdateAddressMutation>;
export type UpdateAddressMutationOptions = Apollo.BaseMutationOptions<
  UpdateAddressMutation,
  UpdateAddressMutationVariables
>;
export const UpdateAlbumDocument = gql`
  mutation updateAlbum($albumId: String!, $coverImage: String, $description: String, $title: String) {
    updateAlbum(albumId: $albumId, coverImage: $coverImage, description: $description, title: $title) {
      contributors {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      coverImage
      createdAt
      creator {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      description
      event {
        adminRemark
        category
        cover
        createdBy
        description
        endDate
        id
        image
        isGoing
        location
        medium
        shortUrl
        startDate
        status
        summary
        tags
        title
        total_attendies
      }
      id
      photos {
        album {
          contributors {
            batch
            disabled
            dob
            firstName
            id
            isConfidential
            isFaculty
            isVerified
            lastName
            profileImage
          }
          coverImage
          createdAt
          creator {
            batch
            disabled
            dob
            firstName
            id
            isConfidential
            isFaculty
            isVerified
            lastName
            profileImage
          }
          description
          event {
            adminRemark
            category
            cover
            createdBy
            description
            endDate
            id
            image
            isGoing
            location
            medium
            shortUrl
            startDate
            status
            summary
            tags
            title
            total_attendies
          }
          id
          title
          total_photos
          updatedAt
        }
        altDescription
        caption
        crdits {
          license_type
          name
          source
          source_url
          url
        }
        id
        thumbUrl
        uploadedAt
        uploader {
          aboutMe
          batch
          companyInfo {
            companyName
            id
            position
            userId
          }
          createdAt
          disabled
          displayName
          dob
          email
          emergencyMobile
          extraEmail
          extraMobile
          firstName
          gender
          google_auth_id
          hasBusiness
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          membershipYear
          metadata
          mobile
          nickName
          positions {
            assignmentId
            code
            name
            termId
            termName
            validFrom
            validUntil
          }
          profileImage
          role {
            code
            id
            name
          }
          roles {
            assignmentId
            code
            name
            scopeBatch
            scopeType
            validFrom
            validUntil
          }
          socialMedia
          updatedAt
          whatsAppMobile
        }
        url
      }
      title
      total_photos
      updatedAt
    }
  }
`;
export type UpdateAlbumMutationFn = Apollo.MutationFunction<UpdateAlbumMutation, UpdateAlbumMutationVariables>;

/**
 * __useUpdateAlbumMutation__
 *
 * To run a mutation, you first call `useUpdateAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAlbumMutation, { data, loading, error }] = useUpdateAlbumMutation({
 *   variables: {
 *      albumId: // value for 'albumId'
 *      coverImage: // value for 'coverImage'
 *      description: // value for 'description'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateAlbumMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateAlbumMutation, UpdateAlbumMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateAlbumMutation, UpdateAlbumMutationVariables>(UpdateAlbumDocument, options);
}
export type UpdateAlbumMutationHookResult = ReturnType<typeof useUpdateAlbumMutation>;
export type UpdateAlbumMutationResult = Apollo.MutationResult<UpdateAlbumMutation>;
export type UpdateAlbumMutationOptions = Apollo.BaseMutationOptions<UpdateAlbumMutation, UpdateAlbumMutationVariables>;
export const UpdateBatchCoordinatorDocument = gql`
  mutation updateBatchCoordinator($newBatch: Int!, $userId: String!) {
    updateBatchCoordinator(newBatch: $newBatch, userId: $userId) {
      assignedAt
      batch
      id
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
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
export const UpdateBlogDocument = gql`
  mutation updateBlog(
    $content: String
    $cover: JSON
    $id: String!
    $slug: String
    $status: BlogStatus
    $title: String
  ) {
    updateBlog(content: $content, cover: $cover, id: $id, slug: $slug, status: $status, title: $title) {
      adminRemark
      author {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      authorId
      categoryId
      claps
      comments {
        author {
          batch
          disabled
          dob
          firstName
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          profileImage
        }
        authorId
        content
        createdAt
        id
        isVerified
        targetId
        targetType
        updatedAt
      }
      content
      cover
      createdAt
      id
      shortUrl
      slug
      status
      summary
      title
      updatedAt
    }
  }
`;
export type UpdateBlogMutationFn = Apollo.MutationFunction<UpdateBlogMutation, UpdateBlogMutationVariables>;

/**
 * __useUpdateBlogMutation__
 *
 * To run a mutation, you first call `useUpdateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBlogMutation, { data, loading, error }] = useUpdateBlogMutation({
 *   variables: {
 *      content: // value for 'content'
 *      cover: // value for 'cover'
 *      id: // value for 'id'
 *      slug: // value for 'slug'
 *      status: // value for 'status'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateBlogMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateBlogMutation, UpdateBlogMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateBlogMutation, UpdateBlogMutationVariables>(UpdateBlogDocument, options);
}
export type UpdateBlogMutationHookResult = ReturnType<typeof useUpdateBlogMutation>;
export type UpdateBlogMutationResult = Apollo.MutationResult<UpdateBlogMutation>;
export type UpdateBlogMutationOptions = Apollo.BaseMutationOptions<UpdateBlogMutation, UpdateBlogMutationVariables>;
export const UpdateBusinessDocument = gql`
  mutation updateBusiness($body: UpdateBusinessInput!, $id: String!) {
    updateBusiness(body: $body, id: $id) {
      address
      category
      city
      country
      createdAt
      description
      email
      googleReviews
      id
      isVerified
      logoUrl
      name
      phone
      postalCode
      socialMedia
      state
      tags
      updatedAt
      user {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      userId
      website
    }
  }
`;
export type UpdateBusinessMutationFn = Apollo.MutationFunction<UpdateBusinessMutation, UpdateBusinessMutationVariables>;

/**
 * __useUpdateBusinessMutation__
 *
 * To run a mutation, you first call `useUpdateBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBusinessMutation, { data, loading, error }] = useUpdateBusinessMutation({
 *   variables: {
 *      body: // value for 'body'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateBusinessMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateBusinessMutation, UpdateBusinessMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateBusinessMutation, UpdateBusinessMutationVariables>(UpdateBusinessDocument, options);
}
export type UpdateBusinessMutationHookResult = ReturnType<typeof useUpdateBusinessMutation>;
export type UpdateBusinessMutationResult = Apollo.MutationResult<UpdateBusinessMutation>;
export type UpdateBusinessMutationOptions = Apollo.BaseMutationOptions<
  UpdateBusinessMutation,
  UpdateBusinessMutationVariables
>;
export const UpdateClapsDocument = gql`
  mutation updateClaps($claps: Int!, $slug: String!) {
    updateClaps(claps: $claps, slug: $slug)
  }
`;
export type UpdateClapsMutationFn = Apollo.MutationFunction<UpdateClapsMutation, UpdateClapsMutationVariables>;

/**
 * __useUpdateClapsMutation__
 *
 * To run a mutation, you first call `useUpdateClapsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClapsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClapsMutation, { data, loading, error }] = useUpdateClapsMutation({
 *   variables: {
 *      claps: // value for 'claps'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useUpdateClapsMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateClapsMutation, UpdateClapsMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateClapsMutation, UpdateClapsMutationVariables>(UpdateClapsDocument, options);
}
export type UpdateClapsMutationHookResult = ReturnType<typeof useUpdateClapsMutation>;
export type UpdateClapsMutationResult = Apollo.MutationResult<UpdateClapsMutation>;
export type UpdateClapsMutationOptions = Apollo.BaseMutationOptions<UpdateClapsMutation, UpdateClapsMutationVariables>;
export const UpdateCompanyInfoDocument = gql`
  mutation updateCompanyInfo(
    $address: String
    $city: String
    $companyName: String
    $country: String
    $endedWorking: DateTime
    $id: String
    $isCurrent: Boolean
    $position: String
    $startedWorking: DateTime
    $state: String
  ) {
    updateCompanyInfo(
      address: $address
      city: $city
      companyName: $companyName
      country: $country
      endedWorking: $endedWorking
      id: $id
      isCurrent: $isCurrent
      position: $position
      startedWorking: $startedWorking
      state: $state
    ) {
      address
      city
      companyName
      country
      createdAt
      endedWorking
      id
      isCurrent
      position
      startedWorking
      state
      updatedAt
      user {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      userId
    }
  }
`;
export type UpdateCompanyInfoMutationFn = Apollo.MutationFunction<
  UpdateCompanyInfoMutation,
  UpdateCompanyInfoMutationVariables
>;

/**
 * __useUpdateCompanyInfoMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyInfoMutation, { data, loading, error }] = useUpdateCompanyInfoMutation({
 *   variables: {
 *      address: // value for 'address'
 *      city: // value for 'city'
 *      companyName: // value for 'companyName'
 *      country: // value for 'country'
 *      endedWorking: // value for 'endedWorking'
 *      id: // value for 'id'
 *      isCurrent: // value for 'isCurrent'
 *      position: // value for 'position'
 *      startedWorking: // value for 'startedWorking'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useUpdateCompanyInfoMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateCompanyInfoMutation, UpdateCompanyInfoMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCompanyInfoMutation, UpdateCompanyInfoMutationVariables>(
    UpdateCompanyInfoDocument,
    options
  );
}
export type UpdateCompanyInfoMutationHookResult = ReturnType<typeof useUpdateCompanyInfoMutation>;
export type UpdateCompanyInfoMutationResult = Apollo.MutationResult<UpdateCompanyInfoMutation>;
export type UpdateCompanyInfoMutationOptions = Apollo.BaseMutationOptions<
  UpdateCompanyInfoMutation,
  UpdateCompanyInfoMutationVariables
>;
export const UpdateEventDocument = gql`
  mutation updateEvent(
    $category: String!
    $cover: JSON
    $description: String
    $endDate: String
    $eventId: Int!
    $location: String
    $medium: String!
    $price: Float
    $startDate: String!
    $status: EventStatus
    $summary: String!
    $tags: [String!]
    $title: String!
  ) {
    updateEvent(
      category: $category
      cover: $cover
      description: $description
      endDate: $endDate
      eventId: $eventId
      location: $location
      medium: $medium
      price: $price
      startDate: $startDate
      status: $status
      summary: $summary
      tags: $tags
      title: $title
    ) {
      adminRemark
      category
      cover
      createdBy
      description
      endDate
      id
      image
      isGoing
      location
      medium
      shortUrl
      startDate
      status
      summary
      tags
      title
      total_attendies
    }
  }
`;
export type UpdateEventMutationFn = Apollo.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      category: // value for 'category'
 *      cover: // value for 'cover'
 *      description: // value for 'description'
 *      endDate: // value for 'endDate'
 *      eventId: // value for 'eventId'
 *      location: // value for 'location'
 *      medium: // value for 'medium'
 *      price: // value for 'price'
 *      startDate: // value for 'startDate'
 *      status: // value for 'status'
 *      summary: // value for 'summary'
 *      tags: // value for 'tags'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateEventMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, options);
}
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const UpdateScholarshipApplicationDraftDocument = gql`
  mutation updateScholarshipApplicationDraft($applicationId: String!, $input: ScholarshipApplicationInput!) {
    updateScholarshipApplicationDraft(applicationId: $applicationId, input: $input) {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;
export type UpdateScholarshipApplicationDraftMutationFn = Apollo.MutationFunction<
  UpdateScholarshipApplicationDraftMutation,
  UpdateScholarshipApplicationDraftMutationVariables
>;

/**
 * __useUpdateScholarshipApplicationDraftMutation__
 *
 * To run a mutation, you first call `useUpdateScholarshipApplicationDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateScholarshipApplicationDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateScholarshipApplicationDraftMutation, { data, loading, error }] = useUpdateScholarshipApplicationDraftMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateScholarshipApplicationDraftMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateScholarshipApplicationDraftMutation,
    UpdateScholarshipApplicationDraftMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateScholarshipApplicationDraftMutation,
    UpdateScholarshipApplicationDraftMutationVariables
  >(UpdateScholarshipApplicationDraftDocument, options);
}
export type UpdateScholarshipApplicationDraftMutationHookResult = ReturnType<
  typeof useUpdateScholarshipApplicationDraftMutation
>;
export type UpdateScholarshipApplicationDraftMutationResult =
  Apollo.MutationResult<UpdateScholarshipApplicationDraftMutation>;
export type UpdateScholarshipApplicationDraftMutationOptions = Apollo.BaseMutationOptions<
  UpdateScholarshipApplicationDraftMutation,
  UpdateScholarshipApplicationDraftMutationVariables
>;
export const UpdateTransactionDocument = gql`
  mutation updateTransaction($id: String!, $status: TransactionStatus!) {
    updateTransaction(id: $id, status: $status) {
      amount
      createdAt
      currency
      description
      id
      isDonation
      method
      referenceId
      scholarshipApplicationId
      scholarshipApprovedAt
      scholarshipBatchSnapshot
      scholarshipBeneficiaryUserId
      scholarshipCompletedAt
      scholarshipConfirmedAmount
      scholarshipConfirmedAt
      scholarshipImmutableAt
      scholarshipInstallmentSequence
      scholarshipMaskedPayoutDestination
      scholarshipMentorUserId
      scholarshipOriginalTransactionId
      scholarshipPayoutMethod
      scholarshipProofDueAt
      scholarshipProofDueDays
      scholarshipProofStatus
      scholarshipPurposeSnapshot
      scholarshipReceivedAt
      scholarshipStatus
      sourceType
      status
      title
      transactionDate
      type
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      userId
    }
  }
`;
export type UpdateTransactionMutationFn = Apollo.MutationFunction<
  UpdateTransactionMutation,
  UpdateTransactionMutationVariables
>;

/**
 * __useUpdateTransactionMutation__
 *
 * To run a mutation, you first call `useUpdateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTransactionMutation, { data, loading, error }] = useUpdateTransactionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateTransactionMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateTransactionMutation, UpdateTransactionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateTransactionMutation, UpdateTransactionMutationVariables>(
    UpdateTransactionDocument,
    options
  );
}
export type UpdateTransactionMutationHookResult = ReturnType<typeof useUpdateTransactionMutation>;
export type UpdateTransactionMutationResult = Apollo.MutationResult<UpdateTransactionMutation>;
export type UpdateTransactionMutationOptions = Apollo.BaseMutationOptions<
  UpdateTransactionMutation,
  UpdateTransactionMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation updateUser(
    $aboutMe: String
    $batch: Int
    $displayName: String
    $dob: String
    $emergencyMobile: String
    $extraMobile: String
    $firstName: String
    $gender: String
    $id: String
    $isConfidential: Boolean
    $lastName: String
    $metadata: JSON
    $mobile: String
    $nickName: String
    $profileImage: String
    $sociaMedia: JSON
    $whatsAppMobile: String
  ) {
    updateUser(
      aboutMe: $aboutMe
      batch: $batch
      displayName: $displayName
      dob: $dob
      emergencyMobile: $emergencyMobile
      extraMobile: $extraMobile
      firstName: $firstName
      gender: $gender
      id: $id
      isConfidential: $isConfidential
      lastName: $lastName
      metadata: $metadata
      mobile: $mobile
      nickName: $nickName
      profileImage: $profileImage
      sociaMedia: $sociaMedia
      whatsAppMobile: $whatsAppMobile
    ) {
      aboutMe
      batch
      companyInfo {
        companyName
        id
        position
        userId
      }
      createdAt
      disabled
      displayName
      dob
      email
      emergencyMobile
      extraEmail
      extraMobile
      firstName
      gender
      google_auth_id
      hasBusiness
      id
      isConfidential
      isFaculty
      isVerified
      lastName
      membershipYear
      metadata
      mobile
      nickName
      positions {
        assignmentId
        code
        name
        termId
        termName
        validFrom
        validUntil
      }
      profileImage
      role {
        code
        id
        name
      }
      roles {
        assignmentId
        code
        name
        scopeBatch
        scopeType
        validFrom
        validUntil
      }
      socialMedia
      updatedAt
      whatsAppMobile
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
 *      extraMobile: // value for 'extraMobile'
 *      firstName: // value for 'firstName'
 *      gender: // value for 'gender'
 *      id: // value for 'id'
 *      isConfidential: // value for 'isConfidential'
 *      lastName: // value for 'lastName'
 *      metadata: // value for 'metadata'
 *      mobile: // value for 'mobile'
 *      nickName: // value for 'nickName'
 *      profileImage: // value for 'profileImage'
 *      sociaMedia: // value for 'sociaMedia'
 *      whatsAppMobile: // value for 'whatsAppMobile'
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
export const UpsertMultipleAddressesDocument = gql`
  mutation upsertMultipleAddresses($updates: [AddressInput!]!) {
    upsertMultipleAddresses(updates: $updates) {
      address
      city
      country
      id
      postalCode
      state
      type
      userId
    }
  }
`;
export type UpsertMultipleAddressesMutationFn = Apollo.MutationFunction<
  UpsertMultipleAddressesMutation,
  UpsertMultipleAddressesMutationVariables
>;

/**
 * __useUpsertMultipleAddressesMutation__
 *
 * To run a mutation, you first call `useUpsertMultipleAddressesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertMultipleAddressesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertMultipleAddressesMutation, { data, loading, error }] = useUpsertMultipleAddressesMutation({
 *   variables: {
 *      updates: // value for 'updates'
 *   },
 * });
 */
export function useUpsertMultipleAddressesMutation(
  baseOptions?: Apollo.MutationHookOptions<UpsertMultipleAddressesMutation, UpsertMultipleAddressesMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpsertMultipleAddressesMutation, UpsertMultipleAddressesMutationVariables>(
    UpsertMultipleAddressesDocument,
    options
  );
}
export type UpsertMultipleAddressesMutationHookResult = ReturnType<typeof useUpsertMultipleAddressesMutation>;
export type UpsertMultipleAddressesMutationResult = Apollo.MutationResult<UpsertMultipleAddressesMutation>;
export type UpsertMultipleAddressesMutationOptions = Apollo.BaseMutationOptions<
  UpsertMultipleAddressesMutation,
  UpsertMultipleAddressesMutationVariables
>;
export const VerifyBusinessDocument = gql`
  mutation verifyBusiness($id: String!, $isVerified: Boolean!) {
    verifyBusiness(id: $id, isVerified: $isVerified) {
      address
      category
      city
      country
      createdAt
      description
      email
      googleReviews
      id
      isVerified
      logoUrl
      name
      phone
      postalCode
      socialMedia
      state
      tags
      updatedAt
      user {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      userId
      website
    }
  }
`;
export type VerifyBusinessMutationFn = Apollo.MutationFunction<VerifyBusinessMutation, VerifyBusinessMutationVariables>;

/**
 * __useVerifyBusinessMutation__
 *
 * To run a mutation, you first call `useVerifyBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyBusinessMutation, { data, loading, error }] = useVerifyBusinessMutation({
 *   variables: {
 *      id: // value for 'id'
 *      isVerified: // value for 'isVerified'
 *   },
 * });
 */
export function useVerifyBusinessMutation(
  baseOptions?: Apollo.MutationHookOptions<VerifyBusinessMutation, VerifyBusinessMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VerifyBusinessMutation, VerifyBusinessMutationVariables>(VerifyBusinessDocument, options);
}
export type VerifyBusinessMutationHookResult = ReturnType<typeof useVerifyBusinessMutation>;
export type VerifyBusinessMutationResult = Apollo.MutationResult<VerifyBusinessMutation>;
export type VerifyBusinessMutationOptions = Apollo.BaseMutationOptions<
  VerifyBusinessMutation,
  VerifyBusinessMutationVariables
>;
export const VerifyEventDocument = gql`
  mutation verifyEvent($adminRemark: String, $eventId: Int!, $status: EventStatus!) {
    verifyEvent(adminRemark: $adminRemark, eventId: $eventId, status: $status)
  }
`;
export type VerifyEventMutationFn = Apollo.MutationFunction<VerifyEventMutation, VerifyEventMutationVariables>;

/**
 * __useVerifyEventMutation__
 *
 * To run a mutation, you first call `useVerifyEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEventMutation, { data, loading, error }] = useVerifyEventMutation({
 *   variables: {
 *      adminRemark: // value for 'adminRemark'
 *      eventId: // value for 'eventId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useVerifyEventMutation(
  baseOptions?: Apollo.MutationHookOptions<VerifyEventMutation, VerifyEventMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VerifyEventMutation, VerifyEventMutationVariables>(VerifyEventDocument, options);
}
export type VerifyEventMutationHookResult = ReturnType<typeof useVerifyEventMutation>;
export type VerifyEventMutationResult = Apollo.MutationResult<VerifyEventMutation>;
export type VerifyEventMutationOptions = Apollo.BaseMutationOptions<VerifyEventMutation, VerifyEventMutationVariables>;
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
export const GetCompanyInfoListByUserDocument = gql`
  query GetCompanyInfoListByUser($userId: String) {
    GetCompanyInfoListByUser(userId: $userId) {
      address
      city
      companyName
      country
      createdAt
      endedWorking
      id
      isCurrent
      position
      startedWorking
      state
      updatedAt
      user {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      userId
    }
  }
`;

/**
 * __useGetCompanyInfoListByUserQuery__
 *
 * To run a query within a React component, call `useGetCompanyInfoListByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyInfoListByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyInfoListByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetCompanyInfoListByUserQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCompanyInfoListByUserQuery, GetCompanyInfoListByUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCompanyInfoListByUserQuery, GetCompanyInfoListByUserQueryVariables>(
    GetCompanyInfoListByUserDocument,
    options
  );
}
export function useGetCompanyInfoListByUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCompanyInfoListByUserQuery, GetCompanyInfoListByUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCompanyInfoListByUserQuery, GetCompanyInfoListByUserQueryVariables>(
    GetCompanyInfoListByUserDocument,
    options
  );
}
// @ts-ignore
export function useGetCompanyInfoListByUserSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetCompanyInfoListByUserQuery, GetCompanyInfoListByUserQueryVariables>
): Apollo.UseSuspenseQueryResult<GetCompanyInfoListByUserQuery, GetCompanyInfoListByUserQueryVariables>;
export function useGetCompanyInfoListByUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetCompanyInfoListByUserQuery, GetCompanyInfoListByUserQueryVariables>
): Apollo.UseSuspenseQueryResult<GetCompanyInfoListByUserQuery | undefined, GetCompanyInfoListByUserQueryVariables>;
export function useGetCompanyInfoListByUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetCompanyInfoListByUserQuery, GetCompanyInfoListByUserQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetCompanyInfoListByUserQuery, GetCompanyInfoListByUserQueryVariables>(
    GetCompanyInfoListByUserDocument,
    options
  );
}
export type GetCompanyInfoListByUserQueryHookResult = ReturnType<typeof useGetCompanyInfoListByUserQuery>;
export type GetCompanyInfoListByUserLazyQueryHookResult = ReturnType<typeof useGetCompanyInfoListByUserLazyQuery>;
export type GetCompanyInfoListByUserSuspenseQueryHookResult = ReturnType<
  typeof useGetCompanyInfoListByUserSuspenseQuery
>;
export type GetCompanyInfoListByUserQueryResult = Apollo.QueryResult<
  GetCompanyInfoListByUserQuery,
  GetCompanyInfoListByUserQueryVariables
>;
export const AccessAuditEventsDocument = gql`
  query accessAuditEvents {
    accessAuditEvents {
      action
      actorUserId
      after
      before
      createdAt
      entityId
      entityType
      id
      ipAddress
      isHighRisk
      reason
      requestId
      targetUserId
      userAgent
    }
  }
`;

/**
 * __useAccessAuditEventsQuery__
 *
 * To run a query within a React component, call `useAccessAuditEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessAuditEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessAuditEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAccessAuditEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<AccessAuditEventsQuery, AccessAuditEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AccessAuditEventsQuery, AccessAuditEventsQueryVariables>(AccessAuditEventsDocument, options);
}
export function useAccessAuditEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AccessAuditEventsQuery, AccessAuditEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AccessAuditEventsQuery, AccessAuditEventsQueryVariables>(
    AccessAuditEventsDocument,
    options
  );
}
// @ts-ignore
export function useAccessAuditEventsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<AccessAuditEventsQuery, AccessAuditEventsQueryVariables>
): Apollo.UseSuspenseQueryResult<AccessAuditEventsQuery, AccessAuditEventsQueryVariables>;
export function useAccessAuditEventsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AccessAuditEventsQuery, AccessAuditEventsQueryVariables>
): Apollo.UseSuspenseQueryResult<AccessAuditEventsQuery | undefined, AccessAuditEventsQueryVariables>;
export function useAccessAuditEventsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AccessAuditEventsQuery, AccessAuditEventsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<AccessAuditEventsQuery, AccessAuditEventsQueryVariables>(
    AccessAuditEventsDocument,
    options
  );
}
export type AccessAuditEventsQueryHookResult = ReturnType<typeof useAccessAuditEventsQuery>;
export type AccessAuditEventsLazyQueryHookResult = ReturnType<typeof useAccessAuditEventsLazyQuery>;
export type AccessAuditEventsSuspenseQueryHookResult = ReturnType<typeof useAccessAuditEventsSuspenseQuery>;
export type AccessAuditEventsQueryResult = Apollo.QueryResult<AccessAuditEventsQuery, AccessAuditEventsQueryVariables>;
export const ExecutivePositionAssignmentsDocument = gql`
  query executivePositionAssignments {
    executivePositionAssignments {
      assignedByUserId
      assignmentReason
      createdAt
      executiveTerm {
        createdAt
        createdByUserId
        endDate
        id
        name
        startDate
        status
        updatedAt
      }
      executiveTermId
      id
      position {
        code
        createdAt
        id
        isActive
        isSingleSeat
        name
        updatedAt
      }
      positionId
      revocationReason
      revokedAt
      revokedByUserId
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      userId
      validFrom
      validUntil
    }
  }
`;

/**
 * __useExecutivePositionAssignmentsQuery__
 *
 * To run a query within a React component, call `useExecutivePositionAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExecutivePositionAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExecutivePositionAssignmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useExecutivePositionAssignmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<ExecutivePositionAssignmentsQuery, ExecutivePositionAssignmentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ExecutivePositionAssignmentsQuery, ExecutivePositionAssignmentsQueryVariables>(
    ExecutivePositionAssignmentsDocument,
    options
  );
}
export function useExecutivePositionAssignmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ExecutivePositionAssignmentsQuery,
    ExecutivePositionAssignmentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ExecutivePositionAssignmentsQuery, ExecutivePositionAssignmentsQueryVariables>(
    ExecutivePositionAssignmentsDocument,
    options
  );
}
// @ts-ignore
export function useExecutivePositionAssignmentsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ExecutivePositionAssignmentsQuery,
    ExecutivePositionAssignmentsQueryVariables
  >
): Apollo.UseSuspenseQueryResult<ExecutivePositionAssignmentsQuery, ExecutivePositionAssignmentsQueryVariables>;
export function useExecutivePositionAssignmentsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ExecutivePositionAssignmentsQuery, ExecutivePositionAssignmentsQueryVariables>
): Apollo.UseSuspenseQueryResult<
  ExecutivePositionAssignmentsQuery | undefined,
  ExecutivePositionAssignmentsQueryVariables
>;
export function useExecutivePositionAssignmentsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ExecutivePositionAssignmentsQuery, ExecutivePositionAssignmentsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ExecutivePositionAssignmentsQuery, ExecutivePositionAssignmentsQueryVariables>(
    ExecutivePositionAssignmentsDocument,
    options
  );
}
export type ExecutivePositionAssignmentsQueryHookResult = ReturnType<typeof useExecutivePositionAssignmentsQuery>;
export type ExecutivePositionAssignmentsLazyQueryHookResult = ReturnType<
  typeof useExecutivePositionAssignmentsLazyQuery
>;
export type ExecutivePositionAssignmentsSuspenseQueryHookResult = ReturnType<
  typeof useExecutivePositionAssignmentsSuspenseQuery
>;
export type ExecutivePositionAssignmentsQueryResult = Apollo.QueryResult<
  ExecutivePositionAssignmentsQuery,
  ExecutivePositionAssignmentsQueryVariables
>;
export const ExecutivePositionsDocument = gql`
  query executivePositions {
    executivePositions {
      code
      createdAt
      id
      isActive
      isSingleSeat
      name
      updatedAt
    }
  }
`;

/**
 * __useExecutivePositionsQuery__
 *
 * To run a query within a React component, call `useExecutivePositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExecutivePositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExecutivePositionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useExecutivePositionsQuery(
  baseOptions?: Apollo.QueryHookOptions<ExecutivePositionsQuery, ExecutivePositionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ExecutivePositionsQuery, ExecutivePositionsQueryVariables>(
    ExecutivePositionsDocument,
    options
  );
}
export function useExecutivePositionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ExecutivePositionsQuery, ExecutivePositionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ExecutivePositionsQuery, ExecutivePositionsQueryVariables>(
    ExecutivePositionsDocument,
    options
  );
}
// @ts-ignore
export function useExecutivePositionsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<ExecutivePositionsQuery, ExecutivePositionsQueryVariables>
): Apollo.UseSuspenseQueryResult<ExecutivePositionsQuery, ExecutivePositionsQueryVariables>;
export function useExecutivePositionsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExecutivePositionsQuery, ExecutivePositionsQueryVariables>
): Apollo.UseSuspenseQueryResult<ExecutivePositionsQuery | undefined, ExecutivePositionsQueryVariables>;
export function useExecutivePositionsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExecutivePositionsQuery, ExecutivePositionsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ExecutivePositionsQuery, ExecutivePositionsQueryVariables>(
    ExecutivePositionsDocument,
    options
  );
}
export type ExecutivePositionsQueryHookResult = ReturnType<typeof useExecutivePositionsQuery>;
export type ExecutivePositionsLazyQueryHookResult = ReturnType<typeof useExecutivePositionsLazyQuery>;
export type ExecutivePositionsSuspenseQueryHookResult = ReturnType<typeof useExecutivePositionsSuspenseQuery>;
export type ExecutivePositionsQueryResult = Apollo.QueryResult<
  ExecutivePositionsQuery,
  ExecutivePositionsQueryVariables
>;
export const ExecutiveTermsDocument = gql`
  query executiveTerms {
    executiveTerms {
      createdAt
      createdByUserId
      endDate
      id
      name
      startDate
      status
      updatedAt
    }
  }
`;

/**
 * __useExecutiveTermsQuery__
 *
 * To run a query within a React component, call `useExecutiveTermsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExecutiveTermsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExecutiveTermsQuery({
 *   variables: {
 *   },
 * });
 */
export function useExecutiveTermsQuery(
  baseOptions?: Apollo.QueryHookOptions<ExecutiveTermsQuery, ExecutiveTermsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ExecutiveTermsQuery, ExecutiveTermsQueryVariables>(ExecutiveTermsDocument, options);
}
export function useExecutiveTermsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ExecutiveTermsQuery, ExecutiveTermsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ExecutiveTermsQuery, ExecutiveTermsQueryVariables>(ExecutiveTermsDocument, options);
}
// @ts-ignore
export function useExecutiveTermsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<ExecutiveTermsQuery, ExecutiveTermsQueryVariables>
): Apollo.UseSuspenseQueryResult<ExecutiveTermsQuery, ExecutiveTermsQueryVariables>;
export function useExecutiveTermsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExecutiveTermsQuery, ExecutiveTermsQueryVariables>
): Apollo.UseSuspenseQueryResult<ExecutiveTermsQuery | undefined, ExecutiveTermsQueryVariables>;
export function useExecutiveTermsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExecutiveTermsQuery, ExecutiveTermsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ExecutiveTermsQuery, ExecutiveTermsQueryVariables>(ExecutiveTermsDocument, options);
}
export type ExecutiveTermsQueryHookResult = ReturnType<typeof useExecutiveTermsQuery>;
export type ExecutiveTermsLazyQueryHookResult = ReturnType<typeof useExecutiveTermsLazyQuery>;
export type ExecutiveTermsSuspenseQueryHookResult = ReturnType<typeof useExecutiveTermsSuspenseQuery>;
export type ExecutiveTermsQueryResult = Apollo.QueryResult<ExecutiveTermsQuery, ExecutiveTermsQueryVariables>;
export const GetAlbumDocument = gql`
  query getAlbum($id: String!) {
    getAlbum(id: $id) {
      contributors {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      coverImage
      createdAt
      creator {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      description
      event {
        adminRemark
        category
        cover
        createdBy
        description
        endDate
        id
        image
        isGoing
        location
        medium
        shortUrl
        startDate
        status
        summary
        tags
        title
        total_attendies
      }
      id
      photos {
        album {
          contributors {
            batch
            disabled
            dob
            firstName
            id
            isConfidential
            isFaculty
            isVerified
            lastName
            profileImage
          }
          coverImage
          createdAt
          creator {
            batch
            disabled
            dob
            firstName
            id
            isConfidential
            isFaculty
            isVerified
            lastName
            profileImage
          }
          description
          event {
            adminRemark
            category
            cover
            createdBy
            description
            endDate
            id
            image
            isGoing
            location
            medium
            shortUrl
            startDate
            status
            summary
            tags
            title
            total_attendies
          }
          id
          title
          total_photos
          updatedAt
        }
        altDescription
        caption
        crdits {
          license_type
          name
          source
          source_url
          url
        }
        id
        thumbUrl
        uploadedAt
        uploader {
          aboutMe
          batch
          companyInfo {
            companyName
            id
            position
            userId
          }
          createdAt
          disabled
          displayName
          dob
          email
          emergencyMobile
          extraEmail
          extraMobile
          firstName
          gender
          google_auth_id
          hasBusiness
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          membershipYear
          metadata
          mobile
          nickName
          positions {
            assignmentId
            code
            name
            termId
            termName
            validFrom
            validUntil
          }
          profileImage
          role {
            code
            id
            name
          }
          roles {
            assignmentId
            code
            name
            scopeBatch
            scopeType
            validFrom
            validUntil
          }
          socialMedia
          updatedAt
          whatsAppMobile
        }
        url
      }
      title
      total_photos
      updatedAt
    }
  }
`;

/**
 * __useGetAlbumQuery__
 *
 * To run a query within a React component, call `useGetAlbumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAlbumQuery(
  baseOptions: Apollo.QueryHookOptions<GetAlbumQuery, GetAlbumQueryVariables> &
    ({ variables: GetAlbumQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAlbumQuery, GetAlbumQueryVariables>(GetAlbumDocument, options);
}
export function useGetAlbumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlbumQuery, GetAlbumQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAlbumQuery, GetAlbumQueryVariables>(GetAlbumDocument, options);
}
// @ts-ignore
export function useGetAlbumSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetAlbumQuery, GetAlbumQueryVariables>
): Apollo.UseSuspenseQueryResult<GetAlbumQuery, GetAlbumQueryVariables>;
export function useGetAlbumSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAlbumQuery, GetAlbumQueryVariables>
): Apollo.UseSuspenseQueryResult<GetAlbumQuery | undefined, GetAlbumQueryVariables>;
export function useGetAlbumSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAlbumQuery, GetAlbumQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAlbumQuery, GetAlbumQueryVariables>(GetAlbumDocument, options);
}
export type GetAlbumQueryHookResult = ReturnType<typeof useGetAlbumQuery>;
export type GetAlbumLazyQueryHookResult = ReturnType<typeof useGetAlbumLazyQuery>;
export type GetAlbumSuspenseQueryHookResult = ReturnType<typeof useGetAlbumSuspenseQuery>;
export type GetAlbumQueryResult = Apollo.QueryResult<GetAlbumQuery, GetAlbumQueryVariables>;
export const GetAlbumsDocument = gql`
  query getAlbums($options: ListInput) {
    getAlbums(options: $options) {
      data {
        contributors {
          batch
          disabled
          dob
          firstName
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          profileImage
          role {
            code
            id
            name
          }
        }
        coverImage
        createdAt
        creator {
          batch
          disabled
          dob
          firstName
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          profileImage
          role {
            code
            id
            name
          }
        }
        description
        event {
          adminRemark
          category
          cover
          createdBy
          description
          endDate
          id
          image
          isGoing
          location
          medium
          shortUrl
          startDate
          status
          summary
          tags
          title
          total_attendies
        }
        id
        title
        total_photos
        updatedAt
      }
      total
    }
  }
`;

/**
 * __useGetAlbumsQuery__
 *
 * To run a query within a React component, call `useGetAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetAlbumsQuery(baseOptions?: Apollo.QueryHookOptions<GetAlbumsQuery, GetAlbumsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAlbumsQuery, GetAlbumsQueryVariables>(GetAlbumsDocument, options);
}
export function useGetAlbumsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAlbumsQuery, GetAlbumsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAlbumsQuery, GetAlbumsQueryVariables>(GetAlbumsDocument, options);
}
// @ts-ignore
export function useGetAlbumsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetAlbumsQuery, GetAlbumsQueryVariables>
): Apollo.UseSuspenseQueryResult<GetAlbumsQuery, GetAlbumsQueryVariables>;
export function useGetAlbumsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAlbumsQuery, GetAlbumsQueryVariables>
): Apollo.UseSuspenseQueryResult<GetAlbumsQuery | undefined, GetAlbumsQueryVariables>;
export function useGetAlbumsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAlbumsQuery, GetAlbumsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAlbumsQuery, GetAlbumsQueryVariables>(GetAlbumsDocument, options);
}
export type GetAlbumsQueryHookResult = ReturnType<typeof useGetAlbumsQuery>;
export type GetAlbumsLazyQueryHookResult = ReturnType<typeof useGetAlbumsLazyQuery>;
export type GetAlbumsSuspenseQueryHookResult = ReturnType<typeof useGetAlbumsSuspenseQuery>;
export type GetAlbumsQueryResult = Apollo.QueryResult<GetAlbumsQuery, GetAlbumsQueryVariables>;
export const GetAllBatchCoordinatorsDocument = gql`
  query getAllBatchCoordinators($options: ListInput) {
    getAllBatchCoordinators(options: $options) {
      assignedAt
      batch
      id
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
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
 *      options: // value for 'options'
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
// @ts-ignore
export function useGetAllBatchCoordinatorsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllBatchCoordinatorsQuery, GetAllBatchCoordinatorsQueryVariables>
): Apollo.UseSuspenseQueryResult<GetAllBatchCoordinatorsQuery, GetAllBatchCoordinatorsQueryVariables>;
export function useGetAllBatchCoordinatorsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetAllBatchCoordinatorsQuery, GetAllBatchCoordinatorsQueryVariables>
): Apollo.UseSuspenseQueryResult<GetAllBatchCoordinatorsQuery | undefined, GetAllBatchCoordinatorsQueryVariables>;
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
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
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
// @ts-ignore
export function useGetBatchCoordinatorByUserIdSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetBatchCoordinatorByUserIdQuery,
    GetBatchCoordinatorByUserIdQueryVariables
  >
): Apollo.UseSuspenseQueryResult<GetBatchCoordinatorByUserIdQuery, GetBatchCoordinatorByUserIdQueryVariables>;
export function useGetBatchCoordinatorByUserIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetBatchCoordinatorByUserIdQuery, GetBatchCoordinatorByUserIdQueryVariables>
): Apollo.UseSuspenseQueryResult<
  GetBatchCoordinatorByUserIdQuery | undefined,
  GetBatchCoordinatorByUserIdQueryVariables
>;
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
export const GetBatchCoordinatorScholarshipDashboardDocument = gql`
  query getBatchCoordinatorScholarshipDashboard($batch: Int!) {
    getBatchCoordinatorScholarshipDashboard(batch: $batch) {
      byStatus {
        count
        key
      }
      capacity {
        allocated
        available
        committed
        returned
      }
      disbursedAmount
      exceptionCount
      requestedAmount
      totalApplications
    }
  }
`;

/**
 * __useGetBatchCoordinatorScholarshipDashboardQuery__
 *
 * To run a query within a React component, call `useGetBatchCoordinatorScholarshipDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBatchCoordinatorScholarshipDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBatchCoordinatorScholarshipDashboardQuery({
 *   variables: {
 *      batch: // value for 'batch'
 *   },
 * });
 */
export function useGetBatchCoordinatorScholarshipDashboardQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetBatchCoordinatorScholarshipDashboardQuery,
    GetBatchCoordinatorScholarshipDashboardQueryVariables
  > &
    ({ variables: GetBatchCoordinatorScholarshipDashboardQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetBatchCoordinatorScholarshipDashboardQuery,
    GetBatchCoordinatorScholarshipDashboardQueryVariables
  >(GetBatchCoordinatorScholarshipDashboardDocument, options);
}
export function useGetBatchCoordinatorScholarshipDashboardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBatchCoordinatorScholarshipDashboardQuery,
    GetBatchCoordinatorScholarshipDashboardQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetBatchCoordinatorScholarshipDashboardQuery,
    GetBatchCoordinatorScholarshipDashboardQueryVariables
  >(GetBatchCoordinatorScholarshipDashboardDocument, options);
}
// @ts-ignore
export function useGetBatchCoordinatorScholarshipDashboardSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetBatchCoordinatorScholarshipDashboardQuery,
    GetBatchCoordinatorScholarshipDashboardQueryVariables
  >
): Apollo.UseSuspenseQueryResult<
  GetBatchCoordinatorScholarshipDashboardQuery,
  GetBatchCoordinatorScholarshipDashboardQueryVariables
>;
export function useGetBatchCoordinatorScholarshipDashboardSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetBatchCoordinatorScholarshipDashboardQuery,
        GetBatchCoordinatorScholarshipDashboardQueryVariables
      >
): Apollo.UseSuspenseQueryResult<
  GetBatchCoordinatorScholarshipDashboardQuery | undefined,
  GetBatchCoordinatorScholarshipDashboardQueryVariables
>;
export function useGetBatchCoordinatorScholarshipDashboardSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetBatchCoordinatorScholarshipDashboardQuery,
        GetBatchCoordinatorScholarshipDashboardQueryVariables
      >
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetBatchCoordinatorScholarshipDashboardQuery,
    GetBatchCoordinatorScholarshipDashboardQueryVariables
  >(GetBatchCoordinatorScholarshipDashboardDocument, options);
}
export type GetBatchCoordinatorScholarshipDashboardQueryHookResult = ReturnType<
  typeof useGetBatchCoordinatorScholarshipDashboardQuery
>;
export type GetBatchCoordinatorScholarshipDashboardLazyQueryHookResult = ReturnType<
  typeof useGetBatchCoordinatorScholarshipDashboardLazyQuery
>;
export type GetBatchCoordinatorScholarshipDashboardSuspenseQueryHookResult = ReturnType<
  typeof useGetBatchCoordinatorScholarshipDashboardSuspenseQuery
>;
export type GetBatchCoordinatorScholarshipDashboardQueryResult = Apollo.QueryResult<
  GetBatchCoordinatorScholarshipDashboardQuery,
  GetBatchCoordinatorScholarshipDashboardQueryVariables
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
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
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
// @ts-ignore
export function useGetBatchCoordinatorsByBatchSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetBatchCoordinatorsByBatchQuery,
    GetBatchCoordinatorsByBatchQueryVariables
  >
): Apollo.UseSuspenseQueryResult<GetBatchCoordinatorsByBatchQuery, GetBatchCoordinatorsByBatchQueryVariables>;
export function useGetBatchCoordinatorsByBatchSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetBatchCoordinatorsByBatchQuery, GetBatchCoordinatorsByBatchQueryVariables>
): Apollo.UseSuspenseQueryResult<
  GetBatchCoordinatorsByBatchQuery | undefined,
  GetBatchCoordinatorsByBatchQueryVariables
>;
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
export const GetBlogDocument = gql`
  query getBlog($id: String, $slug: String) {
    getBlog(id: $id, slug: $slug) {
      adminRemark
      author {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      authorId
      categoryId
      claps
      comments {
        author {
          batch
          disabled
          dob
          firstName
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          profileImage
        }
        authorId
        content
        createdAt
        id
        isVerified
        targetId
        targetType
        updatedAt
      }
      content
      cover
      createdAt
      id
      shortUrl
      slug
      status
      summary
      title
      updatedAt
    }
  }
`;

/**
 * __useGetBlogQuery__
 *
 * To run a query within a React component, call `useGetBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogQuery({
 *   variables: {
 *      id: // value for 'id'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetBlogQuery(baseOptions?: Apollo.QueryHookOptions<GetBlogQuery, GetBlogQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBlogQuery, GetBlogQueryVariables>(GetBlogDocument, options);
}
export function useGetBlogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlogQuery, GetBlogQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetBlogQuery, GetBlogQueryVariables>(GetBlogDocument, options);
}
// @ts-ignore
export function useGetBlogSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetBlogQuery, GetBlogQueryVariables>
): Apollo.UseSuspenseQueryResult<GetBlogQuery, GetBlogQueryVariables>;
export function useGetBlogSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBlogQuery, GetBlogQueryVariables>
): Apollo.UseSuspenseQueryResult<GetBlogQuery | undefined, GetBlogQueryVariables>;
export function useGetBlogSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBlogQuery, GetBlogQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetBlogQuery, GetBlogQueryVariables>(GetBlogDocument, options);
}
export type GetBlogQueryHookResult = ReturnType<typeof useGetBlogQuery>;
export type GetBlogLazyQueryHookResult = ReturnType<typeof useGetBlogLazyQuery>;
export type GetBlogSuspenseQueryHookResult = ReturnType<typeof useGetBlogSuspenseQuery>;
export type GetBlogQueryResult = Apollo.QueryResult<GetBlogQuery, GetBlogQueryVariables>;
export const GetBlogListDocument = gql`
  query getBlogList($options: ListInput) {
    getBlogList(options: $options) {
      data {
        author {
          batch
          disabled
          dob
          firstName
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          profileImage
          role {
            code
            id
            name
          }
        }
        authorId
        categoryId
        claps
        cover
        createdAt
        id
        shortUrl
        slug
        status
        summary
        title
        updatedAt
      }
      total
    }
  }
`;

/**
 * __useGetBlogListQuery__
 *
 * To run a query within a React component, call `useGetBlogListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogListQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetBlogListQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBlogListQuery, GetBlogListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBlogListQuery, GetBlogListQueryVariables>(GetBlogListDocument, options);
}
export function useGetBlogListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBlogListQuery, GetBlogListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetBlogListQuery, GetBlogListQueryVariables>(GetBlogListDocument, options);
}
// @ts-ignore
export function useGetBlogListSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetBlogListQuery, GetBlogListQueryVariables>
): Apollo.UseSuspenseQueryResult<GetBlogListQuery, GetBlogListQueryVariables>;
export function useGetBlogListSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBlogListQuery, GetBlogListQueryVariables>
): Apollo.UseSuspenseQueryResult<GetBlogListQuery | undefined, GetBlogListQueryVariables>;
export function useGetBlogListSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBlogListQuery, GetBlogListQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetBlogListQuery, GetBlogListQueryVariables>(GetBlogListDocument, options);
}
export type GetBlogListQueryHookResult = ReturnType<typeof useGetBlogListQuery>;
export type GetBlogListLazyQueryHookResult = ReturnType<typeof useGetBlogListLazyQuery>;
export type GetBlogListSuspenseQueryHookResult = ReturnType<typeof useGetBlogListSuspenseQuery>;
export type GetBlogListQueryResult = Apollo.QueryResult<GetBlogListQuery, GetBlogListQueryVariables>;
export const GetBusinessDocument = gql`
  query getBusiness($id: String!) {
    getBusiness(id: $id) {
      address
      category
      city
      country
      createdAt
      description
      email
      googleReviews
      id
      isVerified
      logoUrl
      name
      phone
      postalCode
      socialMedia
      state
      tags
      updatedAt
      user {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      userId
      website
    }
  }
`;

/**
 * __useGetBusinessQuery__
 *
 * To run a query within a React component, call `useGetBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBusinessQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBusinessQuery(
  baseOptions: Apollo.QueryHookOptions<GetBusinessQuery, GetBusinessQueryVariables> &
    ({ variables: GetBusinessQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBusinessQuery, GetBusinessQueryVariables>(GetBusinessDocument, options);
}
export function useGetBusinessLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBusinessQuery, GetBusinessQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetBusinessQuery, GetBusinessQueryVariables>(GetBusinessDocument, options);
}
// @ts-ignore
export function useGetBusinessSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetBusinessQuery, GetBusinessQueryVariables>
): Apollo.UseSuspenseQueryResult<GetBusinessQuery, GetBusinessQueryVariables>;
export function useGetBusinessSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBusinessQuery, GetBusinessQueryVariables>
): Apollo.UseSuspenseQueryResult<GetBusinessQuery | undefined, GetBusinessQueryVariables>;
export function useGetBusinessSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBusinessQuery, GetBusinessQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetBusinessQuery, GetBusinessQueryVariables>(GetBusinessDocument, options);
}
export type GetBusinessQueryHookResult = ReturnType<typeof useGetBusinessQuery>;
export type GetBusinessLazyQueryHookResult = ReturnType<typeof useGetBusinessLazyQuery>;
export type GetBusinessSuspenseQueryHookResult = ReturnType<typeof useGetBusinessSuspenseQuery>;
export type GetBusinessQueryResult = Apollo.QueryResult<GetBusinessQuery, GetBusinessQueryVariables>;
export const GetBusinessesDocument = gql`
  query getBusinesses($options: ListInput) {
    getBusinesses(options: $options) {
      data {
        address
        category
        city
        country
        createdAt
        description
        email
        googleReviews
        id
        isVerified
        logoUrl
        name
        phone
        postalCode
        socialMedia
        state
        tags
        updatedAt
        user {
          batch
          disabled
          dob
          firstName
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          profileImage
          role {
            code
            id
            name
          }
        }
        userId
        website
      }
      total
    }
  }
`;

/**
 * __useGetBusinessesQuery__
 *
 * To run a query within a React component, call `useGetBusinessesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBusinessesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBusinessesQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetBusinessesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBusinessesQuery, GetBusinessesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBusinessesQuery, GetBusinessesQueryVariables>(GetBusinessesDocument, options);
}
export function useGetBusinessesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBusinessesQuery, GetBusinessesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetBusinessesQuery, GetBusinessesQueryVariables>(GetBusinessesDocument, options);
}
// @ts-ignore
export function useGetBusinessesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetBusinessesQuery, GetBusinessesQueryVariables>
): Apollo.UseSuspenseQueryResult<GetBusinessesQuery, GetBusinessesQueryVariables>;
export function useGetBusinessesSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBusinessesQuery, GetBusinessesQueryVariables>
): Apollo.UseSuspenseQueryResult<GetBusinessesQuery | undefined, GetBusinessesQueryVariables>;
export function useGetBusinessesSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBusinessesQuery, GetBusinessesQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetBusinessesQuery, GetBusinessesQueryVariables>(GetBusinessesDocument, options);
}
export type GetBusinessesQueryHookResult = ReturnType<typeof useGetBusinessesQuery>;
export type GetBusinessesLazyQueryHookResult = ReturnType<typeof useGetBusinessesLazyQuery>;
export type GetBusinessesSuspenseQueryHookResult = ReturnType<typeof useGetBusinessesSuspenseQuery>;
export type GetBusinessesQueryResult = Apollo.QueryResult<GetBusinessesQuery, GetBusinessesQueryVariables>;
export const GetClapsCountDocument = gql`
  query getClapsCount($id: String, $slug: String) {
    getClapsCount(id: $id, slug: $slug)
  }
`;

/**
 * __useGetClapsCountQuery__
 *
 * To run a query within a React component, call `useGetClapsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClapsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClapsCountQuery({
 *   variables: {
 *      id: // value for 'id'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetClapsCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetClapsCountQuery, GetClapsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetClapsCountQuery, GetClapsCountQueryVariables>(GetClapsCountDocument, options);
}
export function useGetClapsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetClapsCountQuery, GetClapsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetClapsCountQuery, GetClapsCountQueryVariables>(GetClapsCountDocument, options);
}
// @ts-ignore
export function useGetClapsCountSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetClapsCountQuery, GetClapsCountQueryVariables>
): Apollo.UseSuspenseQueryResult<GetClapsCountQuery, GetClapsCountQueryVariables>;
export function useGetClapsCountSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetClapsCountQuery, GetClapsCountQueryVariables>
): Apollo.UseSuspenseQueryResult<GetClapsCountQuery | undefined, GetClapsCountQueryVariables>;
export function useGetClapsCountSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetClapsCountQuery, GetClapsCountQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetClapsCountQuery, GetClapsCountQueryVariables>(GetClapsCountDocument, options);
}
export type GetClapsCountQueryHookResult = ReturnType<typeof useGetClapsCountQuery>;
export type GetClapsCountLazyQueryHookResult = ReturnType<typeof useGetClapsCountLazyQuery>;
export type GetClapsCountSuspenseQueryHookResult = ReturnType<typeof useGetClapsCountSuspenseQuery>;
export type GetClapsCountQueryResult = Apollo.QueryResult<GetClapsCountQuery, GetClapsCountQueryVariables>;
export const GetCommentsDocument = gql`
  query getComments($targetId: String!, $targetType: CommentTargetType!) {
    getComments(targetId: $targetId, targetType: $targetType) {
      author {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      authorId
      content
      createdAt
      id
      isVerified
      targetId
      targetType
      updatedAt
    }
  }
`;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      targetId: // value for 'targetId'
 *      targetType: // value for 'targetType'
 *   },
 * });
 */
export function useGetCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables> &
    ({ variables: GetCommentsQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
}
export function useGetCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
}
// @ts-ignore
export function useGetCommentsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>
): Apollo.UseSuspenseQueryResult<GetCommentsQuery, GetCommentsQueryVariables>;
export function useGetCommentsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>
): Apollo.UseSuspenseQueryResult<GetCommentsQuery | undefined, GetCommentsQueryVariables>;
export function useGetCommentsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
}
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<typeof useGetCommentsLazyQuery>;
export type GetCommentsSuspenseQueryHookResult = ReturnType<typeof useGetCommentsSuspenseQuery>;
export type GetCommentsQueryResult = Apollo.QueryResult<GetCommentsQuery, GetCommentsQueryVariables>;
export const GetCompanyInfoDocument = gql`
  query getCompanyInfo($id: String) {
    getCompanyInfo(id: $id) {
      address
      city
      companyName
      country
      createdAt
      endedWorking
      id
      isCurrent
      position
      startedWorking
      state
      updatedAt
      user {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      userId
    }
  }
`;

/**
 * __useGetCompanyInfoQuery__
 *
 * To run a query within a React component, call `useGetCompanyInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCompanyInfoQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCompanyInfoQuery, GetCompanyInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCompanyInfoQuery, GetCompanyInfoQueryVariables>(GetCompanyInfoDocument, options);
}
export function useGetCompanyInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCompanyInfoQuery, GetCompanyInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCompanyInfoQuery, GetCompanyInfoQueryVariables>(GetCompanyInfoDocument, options);
}
// @ts-ignore
export function useGetCompanyInfoSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetCompanyInfoQuery, GetCompanyInfoQueryVariables>
): Apollo.UseSuspenseQueryResult<GetCompanyInfoQuery, GetCompanyInfoQueryVariables>;
export function useGetCompanyInfoSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCompanyInfoQuery, GetCompanyInfoQueryVariables>
): Apollo.UseSuspenseQueryResult<GetCompanyInfoQuery | undefined, GetCompanyInfoQueryVariables>;
export function useGetCompanyInfoSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCompanyInfoQuery, GetCompanyInfoQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetCompanyInfoQuery, GetCompanyInfoQueryVariables>(GetCompanyInfoDocument, options);
}
export type GetCompanyInfoQueryHookResult = ReturnType<typeof useGetCompanyInfoQuery>;
export type GetCompanyInfoLazyQueryHookResult = ReturnType<typeof useGetCompanyInfoLazyQuery>;
export type GetCompanyInfoSuspenseQueryHookResult = ReturnType<typeof useGetCompanyInfoSuspenseQuery>;
export type GetCompanyInfoQueryResult = Apollo.QueryResult<GetCompanyInfoQuery, GetCompanyInfoQueryVariables>;
export const GetCompanyInfoListDocument = gql`
  query getCompanyInfoList {
    getCompanyInfoList {
      address
      city
      companyName
      country
      createdAt
      endedWorking
      id
      isCurrent
      position
      startedWorking
      state
      updatedAt
      user {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      userId
    }
  }
`;

/**
 * __useGetCompanyInfoListQuery__
 *
 * To run a query within a React component, call `useGetCompanyInfoListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyInfoListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyInfoListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCompanyInfoListQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCompanyInfoListQuery, GetCompanyInfoListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCompanyInfoListQuery, GetCompanyInfoListQueryVariables>(
    GetCompanyInfoListDocument,
    options
  );
}
export function useGetCompanyInfoListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCompanyInfoListQuery, GetCompanyInfoListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCompanyInfoListQuery, GetCompanyInfoListQueryVariables>(
    GetCompanyInfoListDocument,
    options
  );
}
// @ts-ignore
export function useGetCompanyInfoListSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetCompanyInfoListQuery, GetCompanyInfoListQueryVariables>
): Apollo.UseSuspenseQueryResult<GetCompanyInfoListQuery, GetCompanyInfoListQueryVariables>;
export function useGetCompanyInfoListSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCompanyInfoListQuery, GetCompanyInfoListQueryVariables>
): Apollo.UseSuspenseQueryResult<GetCompanyInfoListQuery | undefined, GetCompanyInfoListQueryVariables>;
export function useGetCompanyInfoListSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCompanyInfoListQuery, GetCompanyInfoListQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetCompanyInfoListQuery, GetCompanyInfoListQueryVariables>(
    GetCompanyInfoListDocument,
    options
  );
}
export type GetCompanyInfoListQueryHookResult = ReturnType<typeof useGetCompanyInfoListQuery>;
export type GetCompanyInfoListLazyQueryHookResult = ReturnType<typeof useGetCompanyInfoListLazyQuery>;
export type GetCompanyInfoListSuspenseQueryHookResult = ReturnType<typeof useGetCompanyInfoListSuspenseQuery>;
export type GetCompanyInfoListQueryResult = Apollo.QueryResult<
  GetCompanyInfoListQuery,
  GetCompanyInfoListQueryVariables
>;
export const GetCompletedScholarshipTransactionsDocument = gql`
  query getCompletedScholarshipTransactions($options: ListInput) {
    getCompletedScholarshipTransactions(options: $options) {
      amount
      createdAt
      currency
      description
      id
      isDonation
      method
      referenceId
      scholarshipApplicationId
      scholarshipApprovedAt
      scholarshipBatchSnapshot
      scholarshipBeneficiaryUserId
      scholarshipCompletedAt
      scholarshipConfirmedAmount
      scholarshipConfirmedAt
      scholarshipImmutableAt
      scholarshipInstallmentSequence
      scholarshipMaskedPayoutDestination
      scholarshipMentorUserId
      scholarshipOriginalTransactionId
      scholarshipPayoutMethod
      scholarshipProofDueAt
      scholarshipProofDueDays
      scholarshipProofStatus
      scholarshipPurposeSnapshot
      scholarshipReceivedAt
      scholarshipStatus
      sourceType
      status
      title
      transactionDate
      type
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      userId
    }
  }
`;

/**
 * __useGetCompletedScholarshipTransactionsQuery__
 *
 * To run a query within a React component, call `useGetCompletedScholarshipTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompletedScholarshipTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompletedScholarshipTransactionsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetCompletedScholarshipTransactionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCompletedScholarshipTransactionsQuery,
    GetCompletedScholarshipTransactionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCompletedScholarshipTransactionsQuery, GetCompletedScholarshipTransactionsQueryVariables>(
    GetCompletedScholarshipTransactionsDocument,
    options
  );
}
export function useGetCompletedScholarshipTransactionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCompletedScholarshipTransactionsQuery,
    GetCompletedScholarshipTransactionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCompletedScholarshipTransactionsQuery,
    GetCompletedScholarshipTransactionsQueryVariables
  >(GetCompletedScholarshipTransactionsDocument, options);
}
// @ts-ignore
export function useGetCompletedScholarshipTransactionsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetCompletedScholarshipTransactionsQuery,
    GetCompletedScholarshipTransactionsQueryVariables
  >
): Apollo.UseSuspenseQueryResult<
  GetCompletedScholarshipTransactionsQuery,
  GetCompletedScholarshipTransactionsQueryVariables
>;
export function useGetCompletedScholarshipTransactionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetCompletedScholarshipTransactionsQuery,
        GetCompletedScholarshipTransactionsQueryVariables
      >
): Apollo.UseSuspenseQueryResult<
  GetCompletedScholarshipTransactionsQuery | undefined,
  GetCompletedScholarshipTransactionsQueryVariables
>;
export function useGetCompletedScholarshipTransactionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetCompletedScholarshipTransactionsQuery,
        GetCompletedScholarshipTransactionsQueryVariables
      >
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetCompletedScholarshipTransactionsQuery,
    GetCompletedScholarshipTransactionsQueryVariables
  >(GetCompletedScholarshipTransactionsDocument, options);
}
export type GetCompletedScholarshipTransactionsQueryHookResult = ReturnType<
  typeof useGetCompletedScholarshipTransactionsQuery
>;
export type GetCompletedScholarshipTransactionsLazyQueryHookResult = ReturnType<
  typeof useGetCompletedScholarshipTransactionsLazyQuery
>;
export type GetCompletedScholarshipTransactionsSuspenseQueryHookResult = ReturnType<
  typeof useGetCompletedScholarshipTransactionsSuspenseQuery
>;
export type GetCompletedScholarshipTransactionsQueryResult = Apollo.QueryResult<
  GetCompletedScholarshipTransactionsQuery,
  GetCompletedScholarshipTransactionsQueryVariables
>;
export const GetEventDetailsDocument = gql`
  query getEventDetails($id: Int!) {
    getEventDetails(id: $id) {
      adminRemark
      attendees {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      category
      cover
      createdAt
      createdBy
      description
      endDate
      id
      image
      location
      medium
      organizers {
        batch
        disabled
        dob
        firstName
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        profileImage
        role {
          code
          id
          name
        }
      }
      price
      shortUrl
      startDate
      status
      summary
      tags
      ticketUrl
      title
      total_attendies
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
// @ts-ignore
export function useGetEventDetailsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventDetailsQuery, GetEventDetailsQueryVariables>
): Apollo.UseSuspenseQueryResult<GetEventDetailsQuery, GetEventDetailsQueryVariables>;
export function useGetEventDetailsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventDetailsQuery, GetEventDetailsQueryVariables>
): Apollo.UseSuspenseQueryResult<GetEventDetailsQuery | undefined, GetEventDetailsQueryVariables>;
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
        adminRemark
        category
        cover
        createdBy
        description
        endDate
        id
        image
        isGoing
        location
        medium
        shortUrl
        startDate
        status
        summary
        tags
        title
        total_attendies
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
// @ts-ignore
export function useGetEventListSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventListQuery, GetEventListQueryVariables>
): Apollo.UseSuspenseQueryResult<GetEventListQuery, GetEventListQueryVariables>;
export function useGetEventListSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventListQuery, GetEventListQueryVariables>
): Apollo.UseSuspenseQueryResult<GetEventListQuery | undefined, GetEventListQueryVariables>;
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
export const GetMentorFundAllocationsDocument = gql`
  query getMentorFundAllocations($batch: Int, $mentorUserId: String, $options: ListInput) {
    getMentorFundAllocations(batch: $batch, mentorUserId: $mentorUserId, options: $options) {
      amount
      batch
      confirmedAmount
      createdAt
      currency
      disputedAmount
      id
      mentorUserId
      method
      notes
      recordedByUserId
      reference
      status
      transferDate
    }
  }
`;

/**
 * __useGetMentorFundAllocationsQuery__
 *
 * To run a query within a React component, call `useGetMentorFundAllocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMentorFundAllocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMentorFundAllocationsQuery({
 *   variables: {
 *      batch: // value for 'batch'
 *      mentorUserId: // value for 'mentorUserId'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetMentorFundAllocationsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMentorFundAllocationsQuery, GetMentorFundAllocationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMentorFundAllocationsQuery, GetMentorFundAllocationsQueryVariables>(
    GetMentorFundAllocationsDocument,
    options
  );
}
export function useGetMentorFundAllocationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMentorFundAllocationsQuery, GetMentorFundAllocationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMentorFundAllocationsQuery, GetMentorFundAllocationsQueryVariables>(
    GetMentorFundAllocationsDocument,
    options
  );
}
// @ts-ignore
export function useGetMentorFundAllocationsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetMentorFundAllocationsQuery, GetMentorFundAllocationsQueryVariables>
): Apollo.UseSuspenseQueryResult<GetMentorFundAllocationsQuery, GetMentorFundAllocationsQueryVariables>;
export function useGetMentorFundAllocationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMentorFundAllocationsQuery, GetMentorFundAllocationsQueryVariables>
): Apollo.UseSuspenseQueryResult<GetMentorFundAllocationsQuery | undefined, GetMentorFundAllocationsQueryVariables>;
export function useGetMentorFundAllocationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMentorFundAllocationsQuery, GetMentorFundAllocationsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetMentorFundAllocationsQuery, GetMentorFundAllocationsQueryVariables>(
    GetMentorFundAllocationsDocument,
    options
  );
}
export type GetMentorFundAllocationsQueryHookResult = ReturnType<typeof useGetMentorFundAllocationsQuery>;
export type GetMentorFundAllocationsLazyQueryHookResult = ReturnType<typeof useGetMentorFundAllocationsLazyQuery>;
export type GetMentorFundAllocationsSuspenseQueryHookResult = ReturnType<
  typeof useGetMentorFundAllocationsSuspenseQuery
>;
export type GetMentorFundAllocationsQueryResult = Apollo.QueryResult<
  GetMentorFundAllocationsQuery,
  GetMentorFundAllocationsQueryVariables
>;
export const GetMentorScholarshipApplicationsDocument = gql`
  query getMentorScholarshipApplications($filter: ScholarshipApplicationFilterInput, $options: ListInput) {
    getMentorScholarshipApplications(filter: $filter, options: $options) {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;

/**
 * __useGetMentorScholarshipApplicationsQuery__
 *
 * To run a query within a React component, call `useGetMentorScholarshipApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMentorScholarshipApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMentorScholarshipApplicationsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetMentorScholarshipApplicationsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMentorScholarshipApplicationsQuery,
    GetMentorScholarshipApplicationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMentorScholarshipApplicationsQuery, GetMentorScholarshipApplicationsQueryVariables>(
    GetMentorScholarshipApplicationsDocument,
    options
  );
}
export function useGetMentorScholarshipApplicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMentorScholarshipApplicationsQuery,
    GetMentorScholarshipApplicationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMentorScholarshipApplicationsQuery, GetMentorScholarshipApplicationsQueryVariables>(
    GetMentorScholarshipApplicationsDocument,
    options
  );
}
// @ts-ignore
export function useGetMentorScholarshipApplicationsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetMentorScholarshipApplicationsQuery,
    GetMentorScholarshipApplicationsQueryVariables
  >
): Apollo.UseSuspenseQueryResult<GetMentorScholarshipApplicationsQuery, GetMentorScholarshipApplicationsQueryVariables>;
export function useGetMentorScholarshipApplicationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetMentorScholarshipApplicationsQuery,
        GetMentorScholarshipApplicationsQueryVariables
      >
): Apollo.UseSuspenseQueryResult<
  GetMentorScholarshipApplicationsQuery | undefined,
  GetMentorScholarshipApplicationsQueryVariables
>;
export function useGetMentorScholarshipApplicationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetMentorScholarshipApplicationsQuery,
        GetMentorScholarshipApplicationsQueryVariables
      >
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetMentorScholarshipApplicationsQuery, GetMentorScholarshipApplicationsQueryVariables>(
    GetMentorScholarshipApplicationsDocument,
    options
  );
}
export type GetMentorScholarshipApplicationsQueryHookResult = ReturnType<
  typeof useGetMentorScholarshipApplicationsQuery
>;
export type GetMentorScholarshipApplicationsLazyQueryHookResult = ReturnType<
  typeof useGetMentorScholarshipApplicationsLazyQuery
>;
export type GetMentorScholarshipApplicationsSuspenseQueryHookResult = ReturnType<
  typeof useGetMentorScholarshipApplicationsSuspenseQuery
>;
export type GetMentorScholarshipApplicationsQueryResult = Apollo.QueryResult<
  GetMentorScholarshipApplicationsQuery,
  GetMentorScholarshipApplicationsQueryVariables
>;
export const GetMentorScholarshipDashboardDocument = gql`
  query getMentorScholarshipDashboard {
    getMentorScholarshipDashboard {
      byStatus {
        count
        key
      }
      capacity {
        allocated
        available
        committed
        returned
      }
      disbursedAmount
      exceptionCount
      requestedAmount
      totalApplications
    }
  }
`;

/**
 * __useGetMentorScholarshipDashboardQuery__
 *
 * To run a query within a React component, call `useGetMentorScholarshipDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMentorScholarshipDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMentorScholarshipDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMentorScholarshipDashboardQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMentorScholarshipDashboardQuery, GetMentorScholarshipDashboardQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMentorScholarshipDashboardQuery, GetMentorScholarshipDashboardQueryVariables>(
    GetMentorScholarshipDashboardDocument,
    options
  );
}
export function useGetMentorScholarshipDashboardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMentorScholarshipDashboardQuery,
    GetMentorScholarshipDashboardQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMentorScholarshipDashboardQuery, GetMentorScholarshipDashboardQueryVariables>(
    GetMentorScholarshipDashboardDocument,
    options
  );
}
// @ts-ignore
export function useGetMentorScholarshipDashboardSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetMentorScholarshipDashboardQuery,
    GetMentorScholarshipDashboardQueryVariables
  >
): Apollo.UseSuspenseQueryResult<GetMentorScholarshipDashboardQuery, GetMentorScholarshipDashboardQueryVariables>;
export function useGetMentorScholarshipDashboardSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMentorScholarshipDashboardQuery, GetMentorScholarshipDashboardQueryVariables>
): Apollo.UseSuspenseQueryResult<
  GetMentorScholarshipDashboardQuery | undefined,
  GetMentorScholarshipDashboardQueryVariables
>;
export function useGetMentorScholarshipDashboardSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMentorScholarshipDashboardQuery, GetMentorScholarshipDashboardQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetMentorScholarshipDashboardQuery, GetMentorScholarshipDashboardQueryVariables>(
    GetMentorScholarshipDashboardDocument,
    options
  );
}
export type GetMentorScholarshipDashboardQueryHookResult = ReturnType<typeof useGetMentorScholarshipDashboardQuery>;
export type GetMentorScholarshipDashboardLazyQueryHookResult = ReturnType<
  typeof useGetMentorScholarshipDashboardLazyQuery
>;
export type GetMentorScholarshipDashboardSuspenseQueryHookResult = ReturnType<
  typeof useGetMentorScholarshipDashboardSuspenseQuery
>;
export type GetMentorScholarshipDashboardQueryResult = Apollo.QueryResult<
  GetMentorScholarshipDashboardQuery,
  GetMentorScholarshipDashboardQueryVariables
>;
export const GetMyPhotosDocument = gql`
  query getMyPhotos {
    getMyPhotos {
      album {
        contributors {
          batch
          disabled
          dob
          firstName
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          profileImage
          role {
            code
            id
            name
          }
        }
        coverImage
        createdAt
        creator {
          batch
          disabled
          dob
          firstName
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          profileImage
          role {
            code
            id
            name
          }
        }
        description
        event {
          adminRemark
          category
          cover
          createdBy
          description
          endDate
          id
          image
          isGoing
          location
          medium
          shortUrl
          startDate
          status
          summary
          tags
          title
          total_attendies
        }
        id
        title
        total_photos
        updatedAt
      }
      altDescription
      caption
      crdits {
        license_type
        name
        source
        source_url
        url
      }
      id
      thumbUrl
      uploadedAt
      uploader {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      url
    }
  }
`;

/**
 * __useGetMyPhotosQuery__
 *
 * To run a query within a React component, call `useGetMyPhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyPhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyPhotosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyPhotosQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMyPhotosQuery, GetMyPhotosQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMyPhotosQuery, GetMyPhotosQueryVariables>(GetMyPhotosDocument, options);
}
export function useGetMyPhotosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMyPhotosQuery, GetMyPhotosQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMyPhotosQuery, GetMyPhotosQueryVariables>(GetMyPhotosDocument, options);
}
// @ts-ignore
export function useGetMyPhotosSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyPhotosQuery, GetMyPhotosQueryVariables>
): Apollo.UseSuspenseQueryResult<GetMyPhotosQuery, GetMyPhotosQueryVariables>;
export function useGetMyPhotosSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyPhotosQuery, GetMyPhotosQueryVariables>
): Apollo.UseSuspenseQueryResult<GetMyPhotosQuery | undefined, GetMyPhotosQueryVariables>;
export function useGetMyPhotosSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyPhotosQuery, GetMyPhotosQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetMyPhotosQuery, GetMyPhotosQueryVariables>(GetMyPhotosDocument, options);
}
export type GetMyPhotosQueryHookResult = ReturnType<typeof useGetMyPhotosQuery>;
export type GetMyPhotosLazyQueryHookResult = ReturnType<typeof useGetMyPhotosLazyQuery>;
export type GetMyPhotosSuspenseQueryHookResult = ReturnType<typeof useGetMyPhotosSuspenseQuery>;
export type GetMyPhotosQueryResult = Apollo.QueryResult<GetMyPhotosQuery, GetMyPhotosQueryVariables>;
export const GetMyScholarshipApplicationsDocument = gql`
  query getMyScholarshipApplications($options: ListInput) {
    getMyScholarshipApplications(options: $options) {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;

/**
 * __useGetMyScholarshipApplicationsQuery__
 *
 * To run a query within a React component, call `useGetMyScholarshipApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyScholarshipApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyScholarshipApplicationsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetMyScholarshipApplicationsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMyScholarshipApplicationsQuery, GetMyScholarshipApplicationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMyScholarshipApplicationsQuery, GetMyScholarshipApplicationsQueryVariables>(
    GetMyScholarshipApplicationsDocument,
    options
  );
}
export function useGetMyScholarshipApplicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyScholarshipApplicationsQuery,
    GetMyScholarshipApplicationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMyScholarshipApplicationsQuery, GetMyScholarshipApplicationsQueryVariables>(
    GetMyScholarshipApplicationsDocument,
    options
  );
}
// @ts-ignore
export function useGetMyScholarshipApplicationsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetMyScholarshipApplicationsQuery,
    GetMyScholarshipApplicationsQueryVariables
  >
): Apollo.UseSuspenseQueryResult<GetMyScholarshipApplicationsQuery, GetMyScholarshipApplicationsQueryVariables>;
export function useGetMyScholarshipApplicationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMyScholarshipApplicationsQuery, GetMyScholarshipApplicationsQueryVariables>
): Apollo.UseSuspenseQueryResult<
  GetMyScholarshipApplicationsQuery | undefined,
  GetMyScholarshipApplicationsQueryVariables
>;
export function useGetMyScholarshipApplicationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMyScholarshipApplicationsQuery, GetMyScholarshipApplicationsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetMyScholarshipApplicationsQuery, GetMyScholarshipApplicationsQueryVariables>(
    GetMyScholarshipApplicationsDocument,
    options
  );
}
export type GetMyScholarshipApplicationsQueryHookResult = ReturnType<typeof useGetMyScholarshipApplicationsQuery>;
export type GetMyScholarshipApplicationsLazyQueryHookResult = ReturnType<
  typeof useGetMyScholarshipApplicationsLazyQuery
>;
export type GetMyScholarshipApplicationsSuspenseQueryHookResult = ReturnType<
  typeof useGetMyScholarshipApplicationsSuspenseQuery
>;
export type GetMyScholarshipApplicationsQueryResult = Apollo.QueryResult<
  GetMyScholarshipApplicationsQuery,
  GetMyScholarshipApplicationsQueryVariables
>;
export const GetMyScholarshipDashboardDocument = gql`
  query getMyScholarshipDashboard {
    getMyScholarshipDashboard {
      byStatus {
        count
        key
      }
      capacity {
        allocated
        available
        committed
        returned
      }
      disbursedAmount
      exceptionCount
      requestedAmount
      totalApplications
    }
  }
`;

/**
 * __useGetMyScholarshipDashboardQuery__
 *
 * To run a query within a React component, call `useGetMyScholarshipDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyScholarshipDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyScholarshipDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyScholarshipDashboardQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMyScholarshipDashboardQuery, GetMyScholarshipDashboardQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMyScholarshipDashboardQuery, GetMyScholarshipDashboardQueryVariables>(
    GetMyScholarshipDashboardDocument,
    options
  );
}
export function useGetMyScholarshipDashboardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMyScholarshipDashboardQuery, GetMyScholarshipDashboardQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMyScholarshipDashboardQuery, GetMyScholarshipDashboardQueryVariables>(
    GetMyScholarshipDashboardDocument,
    options
  );
}
// @ts-ignore
export function useGetMyScholarshipDashboardSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyScholarshipDashboardQuery, GetMyScholarshipDashboardQueryVariables>
): Apollo.UseSuspenseQueryResult<GetMyScholarshipDashboardQuery, GetMyScholarshipDashboardQueryVariables>;
export function useGetMyScholarshipDashboardSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMyScholarshipDashboardQuery, GetMyScholarshipDashboardQueryVariables>
): Apollo.UseSuspenseQueryResult<GetMyScholarshipDashboardQuery | undefined, GetMyScholarshipDashboardQueryVariables>;
export function useGetMyScholarshipDashboardSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMyScholarshipDashboardQuery, GetMyScholarshipDashboardQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetMyScholarshipDashboardQuery, GetMyScholarshipDashboardQueryVariables>(
    GetMyScholarshipDashboardDocument,
    options
  );
}
export type GetMyScholarshipDashboardQueryHookResult = ReturnType<typeof useGetMyScholarshipDashboardQuery>;
export type GetMyScholarshipDashboardLazyQueryHookResult = ReturnType<typeof useGetMyScholarshipDashboardLazyQuery>;
export type GetMyScholarshipDashboardSuspenseQueryHookResult = ReturnType<
  typeof useGetMyScholarshipDashboardSuspenseQuery
>;
export type GetMyScholarshipDashboardQueryResult = Apollo.QueryResult<
  GetMyScholarshipDashboardQuery,
  GetMyScholarshipDashboardQueryVariables
>;
export const GetScholarshipActivityDocument = gql`
  query getScholarshipActivity($entityId: String, $entityType: String) {
    getScholarshipActivity(entityId: $entityId, entityType: $entityType) {
      action
      actorUserId
      after
      before
      createdAt
      entityId
      entityType
      id
      isHighRisk
      reason
    }
  }
`;

/**
 * __useGetScholarshipActivityQuery__
 *
 * To run a query within a React component, call `useGetScholarshipActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScholarshipActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScholarshipActivityQuery({
 *   variables: {
 *      entityId: // value for 'entityId'
 *      entityType: // value for 'entityType'
 *   },
 * });
 */
export function useGetScholarshipActivityQuery(
  baseOptions?: Apollo.QueryHookOptions<GetScholarshipActivityQuery, GetScholarshipActivityQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetScholarshipActivityQuery, GetScholarshipActivityQueryVariables>(
    GetScholarshipActivityDocument,
    options
  );
}
export function useGetScholarshipActivityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetScholarshipActivityQuery, GetScholarshipActivityQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetScholarshipActivityQuery, GetScholarshipActivityQueryVariables>(
    GetScholarshipActivityDocument,
    options
  );
}
// @ts-ignore
export function useGetScholarshipActivitySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetScholarshipActivityQuery, GetScholarshipActivityQueryVariables>
): Apollo.UseSuspenseQueryResult<GetScholarshipActivityQuery, GetScholarshipActivityQueryVariables>;
export function useGetScholarshipActivitySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetScholarshipActivityQuery, GetScholarshipActivityQueryVariables>
): Apollo.UseSuspenseQueryResult<GetScholarshipActivityQuery | undefined, GetScholarshipActivityQueryVariables>;
export function useGetScholarshipActivitySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetScholarshipActivityQuery, GetScholarshipActivityQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetScholarshipActivityQuery, GetScholarshipActivityQueryVariables>(
    GetScholarshipActivityDocument,
    options
  );
}
export type GetScholarshipActivityQueryHookResult = ReturnType<typeof useGetScholarshipActivityQuery>;
export type GetScholarshipActivityLazyQueryHookResult = ReturnType<typeof useGetScholarshipActivityLazyQuery>;
export type GetScholarshipActivitySuspenseQueryHookResult = ReturnType<typeof useGetScholarshipActivitySuspenseQuery>;
export type GetScholarshipActivityQueryResult = Apollo.QueryResult<
  GetScholarshipActivityQuery,
  GetScholarshipActivityQueryVariables
>;
export const GetScholarshipApplicationDocument = gql`
  query getScholarshipApplication($id: String!) {
    getScholarshipApplication(id: $id) {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;

/**
 * __useGetScholarshipApplicationQuery__
 *
 * To run a query within a React component, call `useGetScholarshipApplicationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScholarshipApplicationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScholarshipApplicationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetScholarshipApplicationQuery(
  baseOptions: Apollo.QueryHookOptions<GetScholarshipApplicationQuery, GetScholarshipApplicationQueryVariables> &
    ({ variables: GetScholarshipApplicationQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetScholarshipApplicationQuery, GetScholarshipApplicationQueryVariables>(
    GetScholarshipApplicationDocument,
    options
  );
}
export function useGetScholarshipApplicationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetScholarshipApplicationQuery, GetScholarshipApplicationQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetScholarshipApplicationQuery, GetScholarshipApplicationQueryVariables>(
    GetScholarshipApplicationDocument,
    options
  );
}
// @ts-ignore
export function useGetScholarshipApplicationSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetScholarshipApplicationQuery, GetScholarshipApplicationQueryVariables>
): Apollo.UseSuspenseQueryResult<GetScholarshipApplicationQuery, GetScholarshipApplicationQueryVariables>;
export function useGetScholarshipApplicationSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetScholarshipApplicationQuery, GetScholarshipApplicationQueryVariables>
): Apollo.UseSuspenseQueryResult<GetScholarshipApplicationQuery | undefined, GetScholarshipApplicationQueryVariables>;
export function useGetScholarshipApplicationSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetScholarshipApplicationQuery, GetScholarshipApplicationQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetScholarshipApplicationQuery, GetScholarshipApplicationQueryVariables>(
    GetScholarshipApplicationDocument,
    options
  );
}
export type GetScholarshipApplicationQueryHookResult = ReturnType<typeof useGetScholarshipApplicationQuery>;
export type GetScholarshipApplicationLazyQueryHookResult = ReturnType<typeof useGetScholarshipApplicationLazyQuery>;
export type GetScholarshipApplicationSuspenseQueryHookResult = ReturnType<
  typeof useGetScholarshipApplicationSuspenseQuery
>;
export type GetScholarshipApplicationQueryResult = Apollo.QueryResult<
  GetScholarshipApplicationQuery,
  GetScholarshipApplicationQueryVariables
>;
export const GetScholarshipApplicationTransactionsDocument = gql`
  query getScholarshipApplicationTransactions($applicationId: String!) {
    getScholarshipApplicationTransactions(applicationId: $applicationId) {
      amount
      createdAt
      currency
      description
      id
      isDonation
      method
      referenceId
      scholarshipApplicationId
      scholarshipApprovedAt
      scholarshipBatchSnapshot
      scholarshipBeneficiaryUserId
      scholarshipCompletedAt
      scholarshipConfirmedAmount
      scholarshipConfirmedAt
      scholarshipImmutableAt
      scholarshipInstallmentSequence
      scholarshipMaskedPayoutDestination
      scholarshipMentorUserId
      scholarshipOriginalTransactionId
      scholarshipPayoutMethod
      scholarshipProofDueAt
      scholarshipProofDueDays
      scholarshipProofStatus
      scholarshipPurposeSnapshot
      scholarshipReceivedAt
      scholarshipStatus
      sourceType
      status
      title
      transactionDate
      type
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      userId
    }
  }
`;

/**
 * __useGetScholarshipApplicationTransactionsQuery__
 *
 * To run a query within a React component, call `useGetScholarshipApplicationTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScholarshipApplicationTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScholarshipApplicationTransactionsQuery({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *   },
 * });
 */
export function useGetScholarshipApplicationTransactionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetScholarshipApplicationTransactionsQuery,
    GetScholarshipApplicationTransactionsQueryVariables
  > &
    ({ variables: GetScholarshipApplicationTransactionsQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetScholarshipApplicationTransactionsQuery,
    GetScholarshipApplicationTransactionsQueryVariables
  >(GetScholarshipApplicationTransactionsDocument, options);
}
export function useGetScholarshipApplicationTransactionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetScholarshipApplicationTransactionsQuery,
    GetScholarshipApplicationTransactionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetScholarshipApplicationTransactionsQuery,
    GetScholarshipApplicationTransactionsQueryVariables
  >(GetScholarshipApplicationTransactionsDocument, options);
}
// @ts-ignore
export function useGetScholarshipApplicationTransactionsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetScholarshipApplicationTransactionsQuery,
    GetScholarshipApplicationTransactionsQueryVariables
  >
): Apollo.UseSuspenseQueryResult<
  GetScholarshipApplicationTransactionsQuery,
  GetScholarshipApplicationTransactionsQueryVariables
>;
export function useGetScholarshipApplicationTransactionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetScholarshipApplicationTransactionsQuery,
        GetScholarshipApplicationTransactionsQueryVariables
      >
): Apollo.UseSuspenseQueryResult<
  GetScholarshipApplicationTransactionsQuery | undefined,
  GetScholarshipApplicationTransactionsQueryVariables
>;
export function useGetScholarshipApplicationTransactionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetScholarshipApplicationTransactionsQuery,
        GetScholarshipApplicationTransactionsQueryVariables
      >
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetScholarshipApplicationTransactionsQuery,
    GetScholarshipApplicationTransactionsQueryVariables
  >(GetScholarshipApplicationTransactionsDocument, options);
}
export type GetScholarshipApplicationTransactionsQueryHookResult = ReturnType<
  typeof useGetScholarshipApplicationTransactionsQuery
>;
export type GetScholarshipApplicationTransactionsLazyQueryHookResult = ReturnType<
  typeof useGetScholarshipApplicationTransactionsLazyQuery
>;
export type GetScholarshipApplicationTransactionsSuspenseQueryHookResult = ReturnType<
  typeof useGetScholarshipApplicationTransactionsSuspenseQuery
>;
export type GetScholarshipApplicationTransactionsQueryResult = Apollo.QueryResult<
  GetScholarshipApplicationTransactionsQuery,
  GetScholarshipApplicationTransactionsQueryVariables
>;
export const GetScholarshipApplicationsDocument = gql`
  query getScholarshipApplications($filter: ScholarshipApplicationFilterInput, $options: ListInput) {
    getScholarshipApplications(filter: $filter, options: $options) {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;

/**
 * __useGetScholarshipApplicationsQuery__
 *
 * To run a query within a React component, call `useGetScholarshipApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScholarshipApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScholarshipApplicationsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetScholarshipApplicationsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetScholarshipApplicationsQuery, GetScholarshipApplicationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetScholarshipApplicationsQuery, GetScholarshipApplicationsQueryVariables>(
    GetScholarshipApplicationsDocument,
    options
  );
}
export function useGetScholarshipApplicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetScholarshipApplicationsQuery, GetScholarshipApplicationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetScholarshipApplicationsQuery, GetScholarshipApplicationsQueryVariables>(
    GetScholarshipApplicationsDocument,
    options
  );
}
// @ts-ignore
export function useGetScholarshipApplicationsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetScholarshipApplicationsQuery,
    GetScholarshipApplicationsQueryVariables
  >
): Apollo.UseSuspenseQueryResult<GetScholarshipApplicationsQuery, GetScholarshipApplicationsQueryVariables>;
export function useGetScholarshipApplicationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetScholarshipApplicationsQuery, GetScholarshipApplicationsQueryVariables>
): Apollo.UseSuspenseQueryResult<GetScholarshipApplicationsQuery | undefined, GetScholarshipApplicationsQueryVariables>;
export function useGetScholarshipApplicationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetScholarshipApplicationsQuery, GetScholarshipApplicationsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetScholarshipApplicationsQuery, GetScholarshipApplicationsQueryVariables>(
    GetScholarshipApplicationsDocument,
    options
  );
}
export type GetScholarshipApplicationsQueryHookResult = ReturnType<typeof useGetScholarshipApplicationsQuery>;
export type GetScholarshipApplicationsLazyQueryHookResult = ReturnType<typeof useGetScholarshipApplicationsLazyQuery>;
export type GetScholarshipApplicationsSuspenseQueryHookResult = ReturnType<
  typeof useGetScholarshipApplicationsSuspenseQuery
>;
export type GetScholarshipApplicationsQueryResult = Apollo.QueryResult<
  GetScholarshipApplicationsQuery,
  GetScholarshipApplicationsQueryVariables
>;
export const GetScholarshipBeneficiaryListDocument = gql`
  query getScholarshipBeneficiaryList($filter: ScholarshipApplicationFilterInput, $options: ListInput) {
    getScholarshipBeneficiaryList(filter: $filter, options: $options) {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;

/**
 * __useGetScholarshipBeneficiaryListQuery__
 *
 * To run a query within a React component, call `useGetScholarshipBeneficiaryListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScholarshipBeneficiaryListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScholarshipBeneficiaryListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetScholarshipBeneficiaryListQuery(
  baseOptions?: Apollo.QueryHookOptions<GetScholarshipBeneficiaryListQuery, GetScholarshipBeneficiaryListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetScholarshipBeneficiaryListQuery, GetScholarshipBeneficiaryListQueryVariables>(
    GetScholarshipBeneficiaryListDocument,
    options
  );
}
export function useGetScholarshipBeneficiaryListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetScholarshipBeneficiaryListQuery,
    GetScholarshipBeneficiaryListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetScholarshipBeneficiaryListQuery, GetScholarshipBeneficiaryListQueryVariables>(
    GetScholarshipBeneficiaryListDocument,
    options
  );
}
// @ts-ignore
export function useGetScholarshipBeneficiaryListSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetScholarshipBeneficiaryListQuery,
    GetScholarshipBeneficiaryListQueryVariables
  >
): Apollo.UseSuspenseQueryResult<GetScholarshipBeneficiaryListQuery, GetScholarshipBeneficiaryListQueryVariables>;
export function useGetScholarshipBeneficiaryListSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetScholarshipBeneficiaryListQuery, GetScholarshipBeneficiaryListQueryVariables>
): Apollo.UseSuspenseQueryResult<
  GetScholarshipBeneficiaryListQuery | undefined,
  GetScholarshipBeneficiaryListQueryVariables
>;
export function useGetScholarshipBeneficiaryListSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetScholarshipBeneficiaryListQuery, GetScholarshipBeneficiaryListQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetScholarshipBeneficiaryListQuery, GetScholarshipBeneficiaryListQueryVariables>(
    GetScholarshipBeneficiaryListDocument,
    options
  );
}
export type GetScholarshipBeneficiaryListQueryHookResult = ReturnType<typeof useGetScholarshipBeneficiaryListQuery>;
export type GetScholarshipBeneficiaryListLazyQueryHookResult = ReturnType<
  typeof useGetScholarshipBeneficiaryListLazyQuery
>;
export type GetScholarshipBeneficiaryListSuspenseQueryHookResult = ReturnType<
  typeof useGetScholarshipBeneficiaryListSuspenseQuery
>;
export type GetScholarshipBeneficiaryListQueryResult = Apollo.QueryResult<
  GetScholarshipBeneficiaryListQuery,
  GetScholarshipBeneficiaryListQueryVariables
>;
export const GetScholarshipDocumentReadUrlDocument = gql`
  query getScholarshipDocumentReadUrl($documentId: String!) {
    getScholarshipDocumentReadUrl(documentId: $documentId)
  }
`;

/**
 * __useGetScholarshipDocumentReadUrlQuery__
 *
 * To run a query within a React component, call `useGetScholarshipDocumentReadUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScholarshipDocumentReadUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScholarshipDocumentReadUrlQuery({
 *   variables: {
 *      documentId: // value for 'documentId'
 *   },
 * });
 */
export function useGetScholarshipDocumentReadUrlQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetScholarshipDocumentReadUrlQuery,
    GetScholarshipDocumentReadUrlQueryVariables
  > &
    ({ variables: GetScholarshipDocumentReadUrlQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetScholarshipDocumentReadUrlQuery, GetScholarshipDocumentReadUrlQueryVariables>(
    GetScholarshipDocumentReadUrlDocument,
    options
  );
}
export function useGetScholarshipDocumentReadUrlLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetScholarshipDocumentReadUrlQuery,
    GetScholarshipDocumentReadUrlQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetScholarshipDocumentReadUrlQuery, GetScholarshipDocumentReadUrlQueryVariables>(
    GetScholarshipDocumentReadUrlDocument,
    options
  );
}
// @ts-ignore
export function useGetScholarshipDocumentReadUrlSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetScholarshipDocumentReadUrlQuery,
    GetScholarshipDocumentReadUrlQueryVariables
  >
): Apollo.UseSuspenseQueryResult<GetScholarshipDocumentReadUrlQuery, GetScholarshipDocumentReadUrlQueryVariables>;
export function useGetScholarshipDocumentReadUrlSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetScholarshipDocumentReadUrlQuery, GetScholarshipDocumentReadUrlQueryVariables>
): Apollo.UseSuspenseQueryResult<
  GetScholarshipDocumentReadUrlQuery | undefined,
  GetScholarshipDocumentReadUrlQueryVariables
>;
export function useGetScholarshipDocumentReadUrlSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetScholarshipDocumentReadUrlQuery, GetScholarshipDocumentReadUrlQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetScholarshipDocumentReadUrlQuery, GetScholarshipDocumentReadUrlQueryVariables>(
    GetScholarshipDocumentReadUrlDocument,
    options
  );
}
export type GetScholarshipDocumentReadUrlQueryHookResult = ReturnType<typeof useGetScholarshipDocumentReadUrlQuery>;
export type GetScholarshipDocumentReadUrlLazyQueryHookResult = ReturnType<
  typeof useGetScholarshipDocumentReadUrlLazyQuery
>;
export type GetScholarshipDocumentReadUrlSuspenseQueryHookResult = ReturnType<
  typeof useGetScholarshipDocumentReadUrlSuspenseQuery
>;
export type GetScholarshipDocumentReadUrlQueryResult = Apollo.QueryResult<
  GetScholarshipDocumentReadUrlQuery,
  GetScholarshipDocumentReadUrlQueryVariables
>;
export const GetScholarshipExceptionQueueDocument = gql`
  query getScholarshipExceptionQueue {
    getScholarshipExceptionQueue {
      applicantUserId
      approvedAmountDisbursed
      approvedAt
      approvedByUserId
      approvedProofDays
      approvedTotalAmount
      assignedMentor {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      assignedMentorUserId
      batchSnapshot
      beneficiary {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      beneficiaryUserId
      closedAt
      createdAt
      id
      lastActivityAt
      paymentMode
      payoutMaskedSnapshot
      payoutMethod
      payoutSnapshot
      proofStatus
      proposedProofDays
      purpose
      reason
      referenceNumber
      refundStatus
      rejectedAt
      rejectedByUserId
      rejectionReason
      requestedAmount
      requestedFirstInstallmentAmount
      reviewStartedAt
      reviewedByUserId
      status
      submittedAt
      updatedAt
    }
  }
`;

/**
 * __useGetScholarshipExceptionQueueQuery__
 *
 * To run a query within a React component, call `useGetScholarshipExceptionQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScholarshipExceptionQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScholarshipExceptionQueueQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetScholarshipExceptionQueueQuery(
  baseOptions?: Apollo.QueryHookOptions<GetScholarshipExceptionQueueQuery, GetScholarshipExceptionQueueQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetScholarshipExceptionQueueQuery, GetScholarshipExceptionQueueQueryVariables>(
    GetScholarshipExceptionQueueDocument,
    options
  );
}
export function useGetScholarshipExceptionQueueLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetScholarshipExceptionQueueQuery,
    GetScholarshipExceptionQueueQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetScholarshipExceptionQueueQuery, GetScholarshipExceptionQueueQueryVariables>(
    GetScholarshipExceptionQueueDocument,
    options
  );
}
// @ts-ignore
export function useGetScholarshipExceptionQueueSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetScholarshipExceptionQueueQuery,
    GetScholarshipExceptionQueueQueryVariables
  >
): Apollo.UseSuspenseQueryResult<GetScholarshipExceptionQueueQuery, GetScholarshipExceptionQueueQueryVariables>;
export function useGetScholarshipExceptionQueueSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetScholarshipExceptionQueueQuery, GetScholarshipExceptionQueueQueryVariables>
): Apollo.UseSuspenseQueryResult<
  GetScholarshipExceptionQueueQuery | undefined,
  GetScholarshipExceptionQueueQueryVariables
>;
export function useGetScholarshipExceptionQueueSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetScholarshipExceptionQueueQuery, GetScholarshipExceptionQueueQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetScholarshipExceptionQueueQuery, GetScholarshipExceptionQueueQueryVariables>(
    GetScholarshipExceptionQueueDocument,
    options
  );
}
export type GetScholarshipExceptionQueueQueryHookResult = ReturnType<typeof useGetScholarshipExceptionQueueQuery>;
export type GetScholarshipExceptionQueueLazyQueryHookResult = ReturnType<
  typeof useGetScholarshipExceptionQueueLazyQuery
>;
export type GetScholarshipExceptionQueueSuspenseQueryHookResult = ReturnType<
  typeof useGetScholarshipExceptionQueueSuspenseQuery
>;
export type GetScholarshipExceptionQueueQueryResult = Apollo.QueryResult<
  GetScholarshipExceptionQueueQuery,
  GetScholarshipExceptionQueueQueryVariables
>;
export const GetScholarshipMentorSummaryDocument = gql`
  query getScholarshipMentorSummary($mentorUserId: String) {
    getScholarshipMentorSummary(mentorUserId: $mentorUserId) {
      byStatus {
        count
        key
      }
      capacity {
        allocated
        available
        committed
        returned
      }
      disbursedAmount
      exceptionCount
      requestedAmount
      totalApplications
    }
  }
`;

/**
 * __useGetScholarshipMentorSummaryQuery__
 *
 * To run a query within a React component, call `useGetScholarshipMentorSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScholarshipMentorSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScholarshipMentorSummaryQuery({
 *   variables: {
 *      mentorUserId: // value for 'mentorUserId'
 *   },
 * });
 */
export function useGetScholarshipMentorSummaryQuery(
  baseOptions?: Apollo.QueryHookOptions<GetScholarshipMentorSummaryQuery, GetScholarshipMentorSummaryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetScholarshipMentorSummaryQuery, GetScholarshipMentorSummaryQueryVariables>(
    GetScholarshipMentorSummaryDocument,
    options
  );
}
export function useGetScholarshipMentorSummaryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetScholarshipMentorSummaryQuery, GetScholarshipMentorSummaryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetScholarshipMentorSummaryQuery, GetScholarshipMentorSummaryQueryVariables>(
    GetScholarshipMentorSummaryDocument,
    options
  );
}
// @ts-ignore
export function useGetScholarshipMentorSummarySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetScholarshipMentorSummaryQuery,
    GetScholarshipMentorSummaryQueryVariables
  >
): Apollo.UseSuspenseQueryResult<GetScholarshipMentorSummaryQuery, GetScholarshipMentorSummaryQueryVariables>;
export function useGetScholarshipMentorSummarySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetScholarshipMentorSummaryQuery, GetScholarshipMentorSummaryQueryVariables>
): Apollo.UseSuspenseQueryResult<
  GetScholarshipMentorSummaryQuery | undefined,
  GetScholarshipMentorSummaryQueryVariables
>;
export function useGetScholarshipMentorSummarySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetScholarshipMentorSummaryQuery, GetScholarshipMentorSummaryQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetScholarshipMentorSummaryQuery, GetScholarshipMentorSummaryQueryVariables>(
    GetScholarshipMentorSummaryDocument,
    options
  );
}
export type GetScholarshipMentorSummaryQueryHookResult = ReturnType<typeof useGetScholarshipMentorSummaryQuery>;
export type GetScholarshipMentorSummaryLazyQueryHookResult = ReturnType<typeof useGetScholarshipMentorSummaryLazyQuery>;
export type GetScholarshipMentorSummarySuspenseQueryHookResult = ReturnType<
  typeof useGetScholarshipMentorSummarySuspenseQuery
>;
export type GetScholarshipMentorSummaryQueryResult = Apollo.QueryResult<
  GetScholarshipMentorSummaryQuery,
  GetScholarshipMentorSummaryQueryVariables
>;
export const GetScholarshipOrganizationDashboardDocument = gql`
  query getScholarshipOrganizationDashboard {
    getScholarshipOrganizationDashboard {
      byStatus {
        count
        key
      }
      capacity {
        allocated
        available
        committed
        returned
      }
      disbursedAmount
      exceptionCount
      requestedAmount
      totalApplications
    }
  }
`;

/**
 * __useGetScholarshipOrganizationDashboardQuery__
 *
 * To run a query within a React component, call `useGetScholarshipOrganizationDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScholarshipOrganizationDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScholarshipOrganizationDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetScholarshipOrganizationDashboardQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetScholarshipOrganizationDashboardQuery,
    GetScholarshipOrganizationDashboardQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetScholarshipOrganizationDashboardQuery, GetScholarshipOrganizationDashboardQueryVariables>(
    GetScholarshipOrganizationDashboardDocument,
    options
  );
}
export function useGetScholarshipOrganizationDashboardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetScholarshipOrganizationDashboardQuery,
    GetScholarshipOrganizationDashboardQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetScholarshipOrganizationDashboardQuery,
    GetScholarshipOrganizationDashboardQueryVariables
  >(GetScholarshipOrganizationDashboardDocument, options);
}
// @ts-ignore
export function useGetScholarshipOrganizationDashboardSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetScholarshipOrganizationDashboardQuery,
    GetScholarshipOrganizationDashboardQueryVariables
  >
): Apollo.UseSuspenseQueryResult<
  GetScholarshipOrganizationDashboardQuery,
  GetScholarshipOrganizationDashboardQueryVariables
>;
export function useGetScholarshipOrganizationDashboardSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetScholarshipOrganizationDashboardQuery,
        GetScholarshipOrganizationDashboardQueryVariables
      >
): Apollo.UseSuspenseQueryResult<
  GetScholarshipOrganizationDashboardQuery | undefined,
  GetScholarshipOrganizationDashboardQueryVariables
>;
export function useGetScholarshipOrganizationDashboardSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetScholarshipOrganizationDashboardQuery,
        GetScholarshipOrganizationDashboardQueryVariables
      >
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetScholarshipOrganizationDashboardQuery,
    GetScholarshipOrganizationDashboardQueryVariables
  >(GetScholarshipOrganizationDashboardDocument, options);
}
export type GetScholarshipOrganizationDashboardQueryHookResult = ReturnType<
  typeof useGetScholarshipOrganizationDashboardQuery
>;
export type GetScholarshipOrganizationDashboardLazyQueryHookResult = ReturnType<
  typeof useGetScholarshipOrganizationDashboardLazyQuery
>;
export type GetScholarshipOrganizationDashboardSuspenseQueryHookResult = ReturnType<
  typeof useGetScholarshipOrganizationDashboardSuspenseQuery
>;
export type GetScholarshipOrganizationDashboardQueryResult = Apollo.QueryResult<
  GetScholarshipOrganizationDashboardQuery,
  GetScholarshipOrganizationDashboardQueryVariables
>;
export const GetScholarshipRefundCasesDocument = gql`
  query getScholarshipRefundCases {
    getScholarshipRefundCases {
      beneficiaryRefundProofDocumentId
      beneficiaryUserId
      confirmedRefundAmount
      id
      linkedRefundTransactionId
      originalTransactionId
      refundPaymentReference
      requestedAmount
      status
      wrongDisbursementCaseId
    }
  }
`;

/**
 * __useGetScholarshipRefundCasesQuery__
 *
 * To run a query within a React component, call `useGetScholarshipRefundCasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScholarshipRefundCasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScholarshipRefundCasesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetScholarshipRefundCasesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetScholarshipRefundCasesQuery, GetScholarshipRefundCasesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetScholarshipRefundCasesQuery, GetScholarshipRefundCasesQueryVariables>(
    GetScholarshipRefundCasesDocument,
    options
  );
}
export function useGetScholarshipRefundCasesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetScholarshipRefundCasesQuery, GetScholarshipRefundCasesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetScholarshipRefundCasesQuery, GetScholarshipRefundCasesQueryVariables>(
    GetScholarshipRefundCasesDocument,
    options
  );
}
// @ts-ignore
export function useGetScholarshipRefundCasesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetScholarshipRefundCasesQuery, GetScholarshipRefundCasesQueryVariables>
): Apollo.UseSuspenseQueryResult<GetScholarshipRefundCasesQuery, GetScholarshipRefundCasesQueryVariables>;
export function useGetScholarshipRefundCasesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetScholarshipRefundCasesQuery, GetScholarshipRefundCasesQueryVariables>
): Apollo.UseSuspenseQueryResult<GetScholarshipRefundCasesQuery | undefined, GetScholarshipRefundCasesQueryVariables>;
export function useGetScholarshipRefundCasesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetScholarshipRefundCasesQuery, GetScholarshipRefundCasesQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetScholarshipRefundCasesQuery, GetScholarshipRefundCasesQueryVariables>(
    GetScholarshipRefundCasesDocument,
    options
  );
}
export type GetScholarshipRefundCasesQueryHookResult = ReturnType<typeof useGetScholarshipRefundCasesQuery>;
export type GetScholarshipRefundCasesLazyQueryHookResult = ReturnType<typeof useGetScholarshipRefundCasesLazyQuery>;
export type GetScholarshipRefundCasesSuspenseQueryHookResult = ReturnType<
  typeof useGetScholarshipRefundCasesSuspenseQuery
>;
export type GetScholarshipRefundCasesQueryResult = Apollo.QueryResult<
  GetScholarshipRefundCasesQuery,
  GetScholarshipRefundCasesQueryVariables
>;
export const GetScholarshipWrongDisbursementCasesDocument = gql`
  query getScholarshipWrongDisbursementCases {
    getScholarshipWrongDisbursementCases {
      affectedDocumentIds
      applicationId
      beneficiaryResponse
      disputedAmount
      id
      originalTransactionId
      reason
      refundRequested
      reportedAt
      reportedByUserId
      requestedRefundAmount
      status
    }
  }
`;

/**
 * __useGetScholarshipWrongDisbursementCasesQuery__
 *
 * To run a query within a React component, call `useGetScholarshipWrongDisbursementCasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScholarshipWrongDisbursementCasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScholarshipWrongDisbursementCasesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetScholarshipWrongDisbursementCasesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetScholarshipWrongDisbursementCasesQuery,
    GetScholarshipWrongDisbursementCasesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetScholarshipWrongDisbursementCasesQuery, GetScholarshipWrongDisbursementCasesQueryVariables>(
    GetScholarshipWrongDisbursementCasesDocument,
    options
  );
}
export function useGetScholarshipWrongDisbursementCasesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetScholarshipWrongDisbursementCasesQuery,
    GetScholarshipWrongDisbursementCasesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetScholarshipWrongDisbursementCasesQuery,
    GetScholarshipWrongDisbursementCasesQueryVariables
  >(GetScholarshipWrongDisbursementCasesDocument, options);
}
// @ts-ignore
export function useGetScholarshipWrongDisbursementCasesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetScholarshipWrongDisbursementCasesQuery,
    GetScholarshipWrongDisbursementCasesQueryVariables
  >
): Apollo.UseSuspenseQueryResult<
  GetScholarshipWrongDisbursementCasesQuery,
  GetScholarshipWrongDisbursementCasesQueryVariables
>;
export function useGetScholarshipWrongDisbursementCasesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetScholarshipWrongDisbursementCasesQuery,
        GetScholarshipWrongDisbursementCasesQueryVariables
      >
): Apollo.UseSuspenseQueryResult<
  GetScholarshipWrongDisbursementCasesQuery | undefined,
  GetScholarshipWrongDisbursementCasesQueryVariables
>;
export function useGetScholarshipWrongDisbursementCasesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetScholarshipWrongDisbursementCasesQuery,
        GetScholarshipWrongDisbursementCasesQueryVariables
      >
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetScholarshipWrongDisbursementCasesQuery,
    GetScholarshipWrongDisbursementCasesQueryVariables
  >(GetScholarshipWrongDisbursementCasesDocument, options);
}
export type GetScholarshipWrongDisbursementCasesQueryHookResult = ReturnType<
  typeof useGetScholarshipWrongDisbursementCasesQuery
>;
export type GetScholarshipWrongDisbursementCasesLazyQueryHookResult = ReturnType<
  typeof useGetScholarshipWrongDisbursementCasesLazyQuery
>;
export type GetScholarshipWrongDisbursementCasesSuspenseQueryHookResult = ReturnType<
  typeof useGetScholarshipWrongDisbursementCasesSuspenseQuery
>;
export type GetScholarshipWrongDisbursementCasesQueryResult = Apollo.QueryResult<
  GetScholarshipWrongDisbursementCasesQuery,
  GetScholarshipWrongDisbursementCasesQueryVariables
>;
export const GetTransactionDocument = gql`
  query getTransaction($id: String!) {
    getTransaction(id: $id) {
      amount
      createdAt
      currency
      description
      id
      isDonation
      method
      referenceId
      scholarshipApplicationId
      scholarshipApprovedAt
      scholarshipBatchSnapshot
      scholarshipBeneficiaryUserId
      scholarshipCompletedAt
      scholarshipConfirmedAmount
      scholarshipConfirmedAt
      scholarshipImmutableAt
      scholarshipInstallmentSequence
      scholarshipMaskedPayoutDestination
      scholarshipMentorUserId
      scholarshipOriginalTransactionId
      scholarshipPayoutMethod
      scholarshipProofDueAt
      scholarshipProofDueDays
      scholarshipProofStatus
      scholarshipPurposeSnapshot
      scholarshipReceivedAt
      scholarshipStatus
      sourceType
      status
      title
      transactionDate
      type
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      userId
    }
  }
`;

/**
 * __useGetTransactionQuery__
 *
 * To run a query within a React component, call `useGetTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTransactionQuery(
  baseOptions: Apollo.QueryHookOptions<GetTransactionQuery, GetTransactionQueryVariables> &
    ({ variables: GetTransactionQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTransactionQuery, GetTransactionQueryVariables>(GetTransactionDocument, options);
}
export function useGetTransactionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionQuery, GetTransactionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTransactionQuery, GetTransactionQueryVariables>(GetTransactionDocument, options);
}
// @ts-ignore
export function useGetTransactionSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetTransactionQuery, GetTransactionQueryVariables>
): Apollo.UseSuspenseQueryResult<GetTransactionQuery, GetTransactionQueryVariables>;
export function useGetTransactionSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTransactionQuery, GetTransactionQueryVariables>
): Apollo.UseSuspenseQueryResult<GetTransactionQuery | undefined, GetTransactionQueryVariables>;
export function useGetTransactionSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTransactionQuery, GetTransactionQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetTransactionQuery, GetTransactionQueryVariables>(GetTransactionDocument, options);
}
export type GetTransactionQueryHookResult = ReturnType<typeof useGetTransactionQuery>;
export type GetTransactionLazyQueryHookResult = ReturnType<typeof useGetTransactionLazyQuery>;
export type GetTransactionSuspenseQueryHookResult = ReturnType<typeof useGetTransactionSuspenseQuery>;
export type GetTransactionQueryResult = Apollo.QueryResult<GetTransactionQuery, GetTransactionQueryVariables>;
export const GetTransactionsDocument = gql`
  query getTransactions($options: ListInput) {
    getTransactions(options: $options) {
      data {
        amount
        createdAt
        currency
        description
        id
        isDonation
        method
        referenceId
        scholarshipApplicationId
        scholarshipApprovedAt
        scholarshipBatchSnapshot
        scholarshipBeneficiaryUserId
        scholarshipCompletedAt
        scholarshipConfirmedAmount
        scholarshipConfirmedAt
        scholarshipImmutableAt
        scholarshipInstallmentSequence
        scholarshipMaskedPayoutDestination
        scholarshipMentorUserId
        scholarshipOriginalTransactionId
        scholarshipPayoutMethod
        scholarshipProofDueAt
        scholarshipProofDueDays
        scholarshipProofStatus
        scholarshipPurposeSnapshot
        scholarshipReceivedAt
        scholarshipStatus
        sourceType
        status
        title
        transactionDate
        type
        updatedAt
        user {
          aboutMe
          batch
          companyInfo {
            companyName
            id
            position
            userId
          }
          createdAt
          disabled
          displayName
          dob
          email
          emergencyMobile
          extraEmail
          extraMobile
          firstName
          gender
          google_auth_id
          hasBusiness
          id
          isConfidential
          isFaculty
          isVerified
          lastName
          membershipYear
          metadata
          mobile
          nickName
          positions {
            assignmentId
            code
            name
            termId
            termName
            validFrom
            validUntil
          }
          profileImage
          role {
            code
            id
            name
          }
          roles {
            assignmentId
            code
            name
            scopeBatch
            scopeType
            validFrom
            validUntil
          }
          socialMedia
          updatedAt
          whatsAppMobile
        }
        userId
      }
      total
    }
  }
`;

/**
 * __useGetTransactionsQuery__
 *
 * To run a query within a React component, call `useGetTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetTransactionsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
}
export function useGetTransactionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
}
// @ts-ignore
export function useGetTransactionsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>
): Apollo.UseSuspenseQueryResult<GetTransactionsQuery, GetTransactionsQueryVariables>;
export function useGetTransactionsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>
): Apollo.UseSuspenseQueryResult<GetTransactionsQuery | undefined, GetTransactionsQueryVariables>;
export function useGetTransactionsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
}
export type GetTransactionsQueryHookResult = ReturnType<typeof useGetTransactionsQuery>;
export type GetTransactionsLazyQueryHookResult = ReturnType<typeof useGetTransactionsLazyQuery>;
export type GetTransactionsSuspenseQueryHookResult = ReturnType<typeof useGetTransactionsSuspenseQuery>;
export type GetTransactionsQueryResult = Apollo.QueryResult<GetTransactionsQuery, GetTransactionsQueryVariables>;
export const GetUserAddressesDocument = gql`
  query getUserAddresses {
    getUserAddresses {
      data {
        address
        city
        country
        id
        postalCode
        state
        type
        userId
      }
      total
    }
  }
`;

/**
 * __useGetUserAddressesQuery__
 *
 * To run a query within a React component, call `useGetUserAddressesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAddressesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAddressesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserAddressesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUserAddressesQuery, GetUserAddressesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserAddressesQuery, GetUserAddressesQueryVariables>(GetUserAddressesDocument, options);
}
export function useGetUserAddressesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserAddressesQuery, GetUserAddressesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserAddressesQuery, GetUserAddressesQueryVariables>(GetUserAddressesDocument, options);
}
// @ts-ignore
export function useGetUserAddressesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserAddressesQuery, GetUserAddressesQueryVariables>
): Apollo.UseSuspenseQueryResult<GetUserAddressesQuery, GetUserAddressesQueryVariables>;
export function useGetUserAddressesSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserAddressesQuery, GetUserAddressesQueryVariables>
): Apollo.UseSuspenseQueryResult<GetUserAddressesQuery | undefined, GetUserAddressesQueryVariables>;
export function useGetUserAddressesSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserAddressesQuery, GetUserAddressesQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUserAddressesQuery, GetUserAddressesQueryVariables>(
    GetUserAddressesDocument,
    options
  );
}
export type GetUserAddressesQueryHookResult = ReturnType<typeof useGetUserAddressesQuery>;
export type GetUserAddressesLazyQueryHookResult = ReturnType<typeof useGetUserAddressesLazyQuery>;
export type GetUserAddressesSuspenseQueryHookResult = ReturnType<typeof useGetUserAddressesSuspenseQuery>;
export type GetUserAddressesQueryResult = Apollo.QueryResult<GetUserAddressesQuery, GetUserAddressesQueryVariables>;
export const GetUserDetailsDocument = gql`
  query getUserDetails($id: String) {
    getUserDetails(id: $id) {
      aboutMe
      batch
      companyInfo {
        companyName
        id
        position
        userId
      }
      createdAt
      disabled
      displayName
      dob
      email
      emergencyMobile
      extraEmail
      extraMobile
      firstName
      gender
      google_auth_id
      hasBusiness
      id
      isConfidential
      isFaculty
      isVerified
      lastName
      membershipYear
      metadata
      mobile
      nickName
      positions {
        assignmentId
        code
        name
        termId
        termName
        validFrom
        validUntil
      }
      profileImage
      role {
        code
        id
        name
      }
      roles {
        assignmentId
        code
        name
        scopeBatch
        scopeType
        validFrom
        validUntil
      }
      socialMedia
      updatedAt
      whatsAppMobile
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
// @ts-ignore
export function useGetUserDetailsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserDetailsQuery, GetUserDetailsQueryVariables>
): Apollo.UseSuspenseQueryResult<GetUserDetailsQuery, GetUserDetailsQueryVariables>;
export function useGetUserDetailsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserDetailsQuery, GetUserDetailsQueryVariables>
): Apollo.UseSuspenseQueryResult<GetUserDetailsQuery | undefined, GetUserDetailsQueryVariables>;
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
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
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
// @ts-ignore
export function useGetUserListSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserListQuery, GetUserListQueryVariables>
): Apollo.UseSuspenseQueryResult<GetUserListQuery, GetUserListQueryVariables>;
export function useGetUserListSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserListQuery, GetUserListQueryVariables>
): Apollo.UseSuspenseQueryResult<GetUserListQuery | undefined, GetUserListQueryVariables>;
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
export const PublicExecutiveCommitteeDocument = gql`
  query publicExecutiveCommittee {
    publicExecutiveCommittee {
      assignmentId
      batch
      designation
      email
      mobile
      name
      positionCode
      positionName
      profilePicture
      termId
      termName
      userId
      validFrom
      validUntil
    }
  }
`;

/**
 * __usePublicExecutiveCommitteeQuery__
 *
 * To run a query within a React component, call `usePublicExecutiveCommitteeQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicExecutiveCommitteeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicExecutiveCommitteeQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicExecutiveCommitteeQuery(
  baseOptions?: Apollo.QueryHookOptions<PublicExecutiveCommitteeQuery, PublicExecutiveCommitteeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PublicExecutiveCommitteeQuery, PublicExecutiveCommitteeQueryVariables>(
    PublicExecutiveCommitteeDocument,
    options
  );
}
export function usePublicExecutiveCommitteeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PublicExecutiveCommitteeQuery, PublicExecutiveCommitteeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PublicExecutiveCommitteeQuery, PublicExecutiveCommitteeQueryVariables>(
    PublicExecutiveCommitteeDocument,
    options
  );
}
// @ts-ignore
export function usePublicExecutiveCommitteeSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<PublicExecutiveCommitteeQuery, PublicExecutiveCommitteeQueryVariables>
): Apollo.UseSuspenseQueryResult<PublicExecutiveCommitteeQuery, PublicExecutiveCommitteeQueryVariables>;
export function usePublicExecutiveCommitteeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<PublicExecutiveCommitteeQuery, PublicExecutiveCommitteeQueryVariables>
): Apollo.UseSuspenseQueryResult<PublicExecutiveCommitteeQuery | undefined, PublicExecutiveCommitteeQueryVariables>;
export function usePublicExecutiveCommitteeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<PublicExecutiveCommitteeQuery, PublicExecutiveCommitteeQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<PublicExecutiveCommitteeQuery, PublicExecutiveCommitteeQueryVariables>(
    PublicExecutiveCommitteeDocument,
    options
  );
}
export type PublicExecutiveCommitteeQueryHookResult = ReturnType<typeof usePublicExecutiveCommitteeQuery>;
export type PublicExecutiveCommitteeLazyQueryHookResult = ReturnType<typeof usePublicExecutiveCommitteeLazyQuery>;
export type PublicExecutiveCommitteeSuspenseQueryHookResult = ReturnType<
  typeof usePublicExecutiveCommitteeSuspenseQuery
>;
export type PublicExecutiveCommitteeQueryResult = Apollo.QueryResult<
  PublicExecutiveCommitteeQuery,
  PublicExecutiveCommitteeQueryVariables
>;
export const RoleAssignmentsDocument = gql`
  query roleAssignments($filter: RoleAssignmentFilterInput) {
    roleAssignments(filter: $filter) {
      assignedByUserId
      assignmentReason
      createdAt
      id
      revocationReason
      revokedAt
      revokedByUserId
      role {
        code
        description
        id
        isActive
        isSystem
        name
      }
      roleId
      scopeBatch
      scopeType
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      userId
      validFrom
      validUntil
    }
  }
`;

/**
 * __useRoleAssignmentsQuery__
 *
 * To run a query within a React component, call `useRoleAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoleAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoleAssignmentsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useRoleAssignmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<RoleAssignmentsQuery, RoleAssignmentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RoleAssignmentsQuery, RoleAssignmentsQueryVariables>(RoleAssignmentsDocument, options);
}
export function useRoleAssignmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RoleAssignmentsQuery, RoleAssignmentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RoleAssignmentsQuery, RoleAssignmentsQueryVariables>(RoleAssignmentsDocument, options);
}
// @ts-ignore
export function useRoleAssignmentsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<RoleAssignmentsQuery, RoleAssignmentsQueryVariables>
): Apollo.UseSuspenseQueryResult<RoleAssignmentsQuery, RoleAssignmentsQueryVariables>;
export function useRoleAssignmentsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RoleAssignmentsQuery, RoleAssignmentsQueryVariables>
): Apollo.UseSuspenseQueryResult<RoleAssignmentsQuery | undefined, RoleAssignmentsQueryVariables>;
export function useRoleAssignmentsSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RoleAssignmentsQuery, RoleAssignmentsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<RoleAssignmentsQuery, RoleAssignmentsQueryVariables>(RoleAssignmentsDocument, options);
}
export type RoleAssignmentsQueryHookResult = ReturnType<typeof useRoleAssignmentsQuery>;
export type RoleAssignmentsLazyQueryHookResult = ReturnType<typeof useRoleAssignmentsLazyQuery>;
export type RoleAssignmentsSuspenseQueryHookResult = ReturnType<typeof useRoleAssignmentsSuspenseQuery>;
export type RoleAssignmentsQueryResult = Apollo.QueryResult<RoleAssignmentsQuery, RoleAssignmentsQueryVariables>;
export const SystemPermissionsDocument = gql`
  query systemPermissions {
    systemPermissions {
      category
      code
      createdAt
      description
      id
      isActive
      name
      updatedAt
    }
  }
`;

/**
 * __useSystemPermissionsQuery__
 *
 * To run a query within a React component, call `useSystemPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSystemPermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSystemPermissionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSystemPermissionsQuery(
  baseOptions?: Apollo.QueryHookOptions<SystemPermissionsQuery, SystemPermissionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SystemPermissionsQuery, SystemPermissionsQueryVariables>(SystemPermissionsDocument, options);
}
export function useSystemPermissionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SystemPermissionsQuery, SystemPermissionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SystemPermissionsQuery, SystemPermissionsQueryVariables>(
    SystemPermissionsDocument,
    options
  );
}
// @ts-ignore
export function useSystemPermissionsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<SystemPermissionsQuery, SystemPermissionsQueryVariables>
): Apollo.UseSuspenseQueryResult<SystemPermissionsQuery, SystemPermissionsQueryVariables>;
export function useSystemPermissionsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SystemPermissionsQuery, SystemPermissionsQueryVariables>
): Apollo.UseSuspenseQueryResult<SystemPermissionsQuery | undefined, SystemPermissionsQueryVariables>;
export function useSystemPermissionsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SystemPermissionsQuery, SystemPermissionsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<SystemPermissionsQuery, SystemPermissionsQueryVariables>(
    SystemPermissionsDocument,
    options
  );
}
export type SystemPermissionsQueryHookResult = ReturnType<typeof useSystemPermissionsQuery>;
export type SystemPermissionsLazyQueryHookResult = ReturnType<typeof useSystemPermissionsLazyQuery>;
export type SystemPermissionsSuspenseQueryHookResult = ReturnType<typeof useSystemPermissionsSuspenseQuery>;
export type SystemPermissionsQueryResult = Apollo.QueryResult<SystemPermissionsQuery, SystemPermissionsQueryVariables>;
export const SystemRolesDocument = gql`
  query systemRoles {
    systemRoles {
      code
      description
      id
      isActive
      isSystem
      name
    }
  }
`;

/**
 * __useSystemRolesQuery__
 *
 * To run a query within a React component, call `useSystemRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSystemRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSystemRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSystemRolesQuery(
  baseOptions?: Apollo.QueryHookOptions<SystemRolesQuery, SystemRolesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SystemRolesQuery, SystemRolesQueryVariables>(SystemRolesDocument, options);
}
export function useSystemRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SystemRolesQuery, SystemRolesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SystemRolesQuery, SystemRolesQueryVariables>(SystemRolesDocument, options);
}
// @ts-ignore
export function useSystemRolesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<SystemRolesQuery, SystemRolesQueryVariables>
): Apollo.UseSuspenseQueryResult<SystemRolesQuery, SystemRolesQueryVariables>;
export function useSystemRolesSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SystemRolesQuery, SystemRolesQueryVariables>
): Apollo.UseSuspenseQueryResult<SystemRolesQuery | undefined, SystemRolesQueryVariables>;
export function useSystemRolesSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SystemRolesQuery, SystemRolesQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<SystemRolesQuery, SystemRolesQueryVariables>(SystemRolesDocument, options);
}
export type SystemRolesQueryHookResult = ReturnType<typeof useSystemRolesQuery>;
export type SystemRolesLazyQueryHookResult = ReturnType<typeof useSystemRolesLazyQuery>;
export type SystemRolesSuspenseQueryHookResult = ReturnType<typeof useSystemRolesSuspenseQuery>;
export type SystemRolesQueryResult = Apollo.QueryResult<SystemRolesQuery, SystemRolesQueryVariables>;
export const UpcomingBirthdaysDocument = gql`
  query upcomingBirthdays {
    upcomingBirthdays {
      batch
      birthday
      disabled
      firstName
      id
      isConfidential
      isFaculty
      isVerified
      lastName
      profileImage
    }
  }
`;

/**
 * __useUpcomingBirthdaysQuery__
 *
 * To run a query within a React component, call `useUpcomingBirthdaysQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpcomingBirthdaysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpcomingBirthdaysQuery({
 *   variables: {
 *   },
 * });
 */
export function useUpcomingBirthdaysQuery(
  baseOptions?: Apollo.QueryHookOptions<UpcomingBirthdaysQuery, UpcomingBirthdaysQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UpcomingBirthdaysQuery, UpcomingBirthdaysQueryVariables>(UpcomingBirthdaysDocument, options);
}
export function useUpcomingBirthdaysLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UpcomingBirthdaysQuery, UpcomingBirthdaysQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UpcomingBirthdaysQuery, UpcomingBirthdaysQueryVariables>(
    UpcomingBirthdaysDocument,
    options
  );
}
// @ts-ignore
export function useUpcomingBirthdaysSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<UpcomingBirthdaysQuery, UpcomingBirthdaysQueryVariables>
): Apollo.UseSuspenseQueryResult<UpcomingBirthdaysQuery, UpcomingBirthdaysQueryVariables>;
export function useUpcomingBirthdaysSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UpcomingBirthdaysQuery, UpcomingBirthdaysQueryVariables>
): Apollo.UseSuspenseQueryResult<UpcomingBirthdaysQuery | undefined, UpcomingBirthdaysQueryVariables>;
export function useUpcomingBirthdaysSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UpcomingBirthdaysQuery, UpcomingBirthdaysQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<UpcomingBirthdaysQuery, UpcomingBirthdaysQueryVariables>(
    UpcomingBirthdaysDocument,
    options
  );
}
export type UpcomingBirthdaysQueryHookResult = ReturnType<typeof useUpcomingBirthdaysQuery>;
export type UpcomingBirthdaysLazyQueryHookResult = ReturnType<typeof useUpcomingBirthdaysLazyQuery>;
export type UpcomingBirthdaysSuspenseQueryHookResult = ReturnType<typeof useUpcomingBirthdaysSuspenseQuery>;
export type UpcomingBirthdaysQueryResult = Apollo.QueryResult<UpcomingBirthdaysQuery, UpcomingBirthdaysQueryVariables>;
export const UserExecutivePositionAssignmentsDocument = gql`
  query userExecutivePositionAssignments($userId: String) {
    userExecutivePositionAssignments(userId: $userId) {
      assignedByUserId
      assignmentReason
      createdAt
      executiveTerm {
        createdAt
        createdByUserId
        endDate
        id
        name
        startDate
        status
        updatedAt
      }
      executiveTermId
      id
      position {
        code
        createdAt
        id
        isActive
        isSingleSeat
        name
        updatedAt
      }
      positionId
      revocationReason
      revokedAt
      revokedByUserId
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      userId
      validFrom
      validUntil
    }
  }
`;

/**
 * __useUserExecutivePositionAssignmentsQuery__
 *
 * To run a query within a React component, call `useUserExecutivePositionAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserExecutivePositionAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserExecutivePositionAssignmentsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserExecutivePositionAssignmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserExecutivePositionAssignmentsQuery,
    UserExecutivePositionAssignmentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserExecutivePositionAssignmentsQuery, UserExecutivePositionAssignmentsQueryVariables>(
    UserExecutivePositionAssignmentsDocument,
    options
  );
}
export function useUserExecutivePositionAssignmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserExecutivePositionAssignmentsQuery,
    UserExecutivePositionAssignmentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserExecutivePositionAssignmentsQuery, UserExecutivePositionAssignmentsQueryVariables>(
    UserExecutivePositionAssignmentsDocument,
    options
  );
}
// @ts-ignore
export function useUserExecutivePositionAssignmentsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    UserExecutivePositionAssignmentsQuery,
    UserExecutivePositionAssignmentsQueryVariables
  >
): Apollo.UseSuspenseQueryResult<UserExecutivePositionAssignmentsQuery, UserExecutivePositionAssignmentsQueryVariables>;
export function useUserExecutivePositionAssignmentsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        UserExecutivePositionAssignmentsQuery,
        UserExecutivePositionAssignmentsQueryVariables
      >
): Apollo.UseSuspenseQueryResult<
  UserExecutivePositionAssignmentsQuery | undefined,
  UserExecutivePositionAssignmentsQueryVariables
>;
export function useUserExecutivePositionAssignmentsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        UserExecutivePositionAssignmentsQuery,
        UserExecutivePositionAssignmentsQueryVariables
      >
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<UserExecutivePositionAssignmentsQuery, UserExecutivePositionAssignmentsQueryVariables>(
    UserExecutivePositionAssignmentsDocument,
    options
  );
}
export type UserExecutivePositionAssignmentsQueryHookResult = ReturnType<
  typeof useUserExecutivePositionAssignmentsQuery
>;
export type UserExecutivePositionAssignmentsLazyQueryHookResult = ReturnType<
  typeof useUserExecutivePositionAssignmentsLazyQuery
>;
export type UserExecutivePositionAssignmentsSuspenseQueryHookResult = ReturnType<
  typeof useUserExecutivePositionAssignmentsSuspenseQuery
>;
export type UserExecutivePositionAssignmentsQueryResult = Apollo.QueryResult<
  UserExecutivePositionAssignmentsQuery,
  UserExecutivePositionAssignmentsQueryVariables
>;
export const UserRoleAssignmentsDocument = gql`
  query userRoleAssignments($userId: String) {
    userRoleAssignments(userId: $userId) {
      assignedByUserId
      assignmentReason
      createdAt
      id
      revocationReason
      revokedAt
      revokedByUserId
      role {
        code
        description
        id
        isActive
        isSystem
        name
      }
      roleId
      scopeBatch
      scopeType
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          companyName
          id
          position
          userId
        }
        createdAt
        disabled
        displayName
        dob
        email
        emergencyMobile
        extraEmail
        extraMobile
        firstName
        gender
        google_auth_id
        hasBusiness
        id
        isConfidential
        isFaculty
        isVerified
        lastName
        membershipYear
        metadata
        mobile
        nickName
        positions {
          assignmentId
          code
          name
          termId
          termName
          validFrom
          validUntil
        }
        profileImage
        role {
          code
          id
          name
        }
        roles {
          assignmentId
          code
          name
          scopeBatch
          scopeType
          validFrom
          validUntil
        }
        socialMedia
        updatedAt
        whatsAppMobile
      }
      userId
      validFrom
      validUntil
    }
  }
`;

/**
 * __useUserRoleAssignmentsQuery__
 *
 * To run a query within a React component, call `useUserRoleAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRoleAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRoleAssignmentsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserRoleAssignmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<UserRoleAssignmentsQuery, UserRoleAssignmentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserRoleAssignmentsQuery, UserRoleAssignmentsQueryVariables>(
    UserRoleAssignmentsDocument,
    options
  );
}
export function useUserRoleAssignmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserRoleAssignmentsQuery, UserRoleAssignmentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserRoleAssignmentsQuery, UserRoleAssignmentsQueryVariables>(
    UserRoleAssignmentsDocument,
    options
  );
}
// @ts-ignore
export function useUserRoleAssignmentsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<UserRoleAssignmentsQuery, UserRoleAssignmentsQueryVariables>
): Apollo.UseSuspenseQueryResult<UserRoleAssignmentsQuery, UserRoleAssignmentsQueryVariables>;
export function useUserRoleAssignmentsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserRoleAssignmentsQuery, UserRoleAssignmentsQueryVariables>
): Apollo.UseSuspenseQueryResult<UserRoleAssignmentsQuery | undefined, UserRoleAssignmentsQueryVariables>;
export function useUserRoleAssignmentsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserRoleAssignmentsQuery, UserRoleAssignmentsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<UserRoleAssignmentsQuery, UserRoleAssignmentsQueryVariables>(
    UserRoleAssignmentsDocument,
    options
  );
}
export type UserRoleAssignmentsQueryHookResult = ReturnType<typeof useUserRoleAssignmentsQuery>;
export type UserRoleAssignmentsLazyQueryHookResult = ReturnType<typeof useUserRoleAssignmentsLazyQuery>;
export type UserRoleAssignmentsSuspenseQueryHookResult = ReturnType<typeof useUserRoleAssignmentsSuspenseQuery>;
export type UserRoleAssignmentsQueryResult = Apollo.QueryResult<
  UserRoleAssignmentsQuery,
  UserRoleAssignmentsQueryVariables
>;
export const ViewerAccessContextDocument = gql`
  query viewerAccessContext {
    viewerAccessContext {
      hasFullAccess
      permissions
      positions {
        assignmentId
        code
        name
        termId
        termName
        validFrom
        validUntil
      }
      roles {
        assignmentId
        code
        name
        scopeBatch
        scopeType
        validFrom
        validUntil
      }
      userId
    }
  }
`;

/**
 * __useViewerAccessContextQuery__
 *
 * To run a query within a React component, call `useViewerAccessContextQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerAccessContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerAccessContextQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerAccessContextQuery(
  baseOptions?: Apollo.QueryHookOptions<ViewerAccessContextQuery, ViewerAccessContextQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ViewerAccessContextQuery, ViewerAccessContextQueryVariables>(
    ViewerAccessContextDocument,
    options
  );
}
export function useViewerAccessContextLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ViewerAccessContextQuery, ViewerAccessContextQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ViewerAccessContextQuery, ViewerAccessContextQueryVariables>(
    ViewerAccessContextDocument,
    options
  );
}
// @ts-ignore
export function useViewerAccessContextSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<ViewerAccessContextQuery, ViewerAccessContextQueryVariables>
): Apollo.UseSuspenseQueryResult<ViewerAccessContextQuery, ViewerAccessContextQueryVariables>;
export function useViewerAccessContextSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ViewerAccessContextQuery, ViewerAccessContextQueryVariables>
): Apollo.UseSuspenseQueryResult<ViewerAccessContextQuery | undefined, ViewerAccessContextQueryVariables>;
export function useViewerAccessContextSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ViewerAccessContextQuery, ViewerAccessContextQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ViewerAccessContextQuery, ViewerAccessContextQueryVariables>(
    ViewerAccessContextDocument,
    options
  );
}
export type ViewerAccessContextQueryHookResult = ReturnType<typeof useViewerAccessContextQuery>;
export type ViewerAccessContextLazyQueryHookResult = ReturnType<typeof useViewerAccessContextLazyQuery>;
export type ViewerAccessContextSuspenseQueryHookResult = ReturnType<typeof useViewerAccessContextSuspenseQuery>;
export type ViewerAccessContextQueryResult = Apollo.QueryResult<
  ViewerAccessContextQuery,
  ViewerAccessContextQueryVariables
>;
