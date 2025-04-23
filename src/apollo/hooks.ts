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
  city?: Maybe<Scalars['String']['output']>;
  companyName: Scalars['String']['output'];
  country?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  position?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
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

export type FilterInput = {
  batch?: InputMaybe<Scalars['Int']['input']>;
  blogId?: InputMaybe<Scalars['String']['input']>;
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

export type Mutation = {
  __typename?: 'Mutation';
  addAlbumContributor?: Maybe<Album>;
  addComment?: Maybe<Comment>;
  addPhoto?: Maybe<Photo>;
  approveBlog?: Maybe<Blog>;
  assignBatchCoordinator?: Maybe<BatchCoordinator>;
  attendEvent?: Maybe<Scalars['Boolean']['output']>;
  createAddress?: Maybe<Address>;
  createAlbum?: Maybe<Album>;
  createBlog?: Maybe<Blog>;
  createBusiness: Business;
  createCompanyInfo?: Maybe<CompanyInfo>;
  createEvent?: Maybe<EventBasic>;
  createTransaction?: Maybe<Transaction>;
  deleteAddress?: Maybe<Address>;
  deleteBlog?: Maybe<Blog>;
  deleteCompanyInfo?: Maybe<CompanyInfo>;
  deleteTransaction?: Maybe<Transaction>;
  deleteUser?: Maybe<User>;
  forgotPassword?: Maybe<Scalars['Boolean']['output']>;
  getPresignedUrl: Scalars['String']['output'];
  logout?: Maybe<Scalars['String']['output']>;
  publishEvent?: Maybe<Scalars['Boolean']['output']>;
  refreshToken?: Maybe<AuthPayload>;
  removeBatchCoordinator?: Maybe<Scalars['Boolean']['output']>;
  requestChangesBlog?: Maybe<Blog>;
  resetPassword?: Maybe<Scalars['Boolean']['output']>;
  sendMassEmail?: Maybe<Scalars['Boolean']['output']>;
  signin?: Maybe<AuthPayload>;
  signup?: Maybe<User>;
  updateAddress?: Maybe<Address>;
  updateAlbum?: Maybe<Album>;
  updateBatchCoordinator?: Maybe<BatchCoordinator>;
  updateBlog?: Maybe<Blog>;
  updateBusiness: Business;
  updateClaps?: Maybe<Scalars['Boolean']['output']>;
  updateCompanyInfo?: Maybe<CompanyInfo>;
  updateEvent?: Maybe<EventBasic>;
  updateTransaction?: Maybe<Transaction>;
  updateUser?: Maybe<User>;
  upsertMultipleAddresses?: Maybe<Array<Maybe<Address>>>;
  verifyBusiness: Business;
  verifyEvent?: Maybe<Scalars['Boolean']['output']>;
  verifyUser?: Maybe<Scalars['Boolean']['output']>;
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

export type MutationAssignBatchCoordinatorArgs = {
  batch: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};

export type MutationAttendEventArgs = {
  eventId: Scalars['Int']['input'];
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

export type MutationDeleteTransactionArgs = {
  id: Scalars['String']['input'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};

export type MutationGetPresignedUrlArgs = {
  contentType: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
  imageCategory?: InputMaybe<Scalars['String']['input']>;
};

export type MutationPublishEventArgs = {
  eventId: Scalars['Int']['input'];
  status: EventStatus;
};

export type MutationRemoveBatchCoordinatorArgs = {
  batch: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};

export type MutationRequestChangesBlogArgs = {
  adminRemark?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token?: InputMaybe<Scalars['String']['input']>;
};

export type MutationSendMassEmailArgs = {
  context?: InputMaybe<Scalars['JSON']['input']>;
  subject: Scalars['String']['input'];
  template: Scalars['String']['input'];
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
  getAlbum?: Maybe<Album>;
  getAlbums?: Maybe<ListAlbumResponse>;
  getAllBatchCoordinators?: Maybe<Array<Maybe<BatchCoordinator>>>;
  getBatchCoordinatorByUserId?: Maybe<BatchCoordinator>;
  getBatchCoordinatorsByBatch?: Maybe<Array<Maybe<BatchCoordinator>>>;
  getBlog?: Maybe<Blog>;
  getBlogList?: Maybe<BlogListResponse>;
  getBusiness?: Maybe<Business>;
  getBusinesses?: Maybe<BusinessListResponse>;
  getComments?: Maybe<Array<Maybe<Comment>>>;
  getCompanyInfo?: Maybe<CompanyInfo>;
  getCompanyInfoList: Array<CompanyInfo>;
  getEventDetails?: Maybe<Event>;
  getEventList?: Maybe<ListEventResponse>;
  getMyPhotos?: Maybe<Array<Maybe<Photo>>>;
  getTransaction?: Maybe<Transaction>;
  getTransactions?: Maybe<TransactionListResponse>;
  getUserAddresses?: Maybe<AddressListResponse>;
  getUserDetails?: Maybe<User>;
  getUserList?: Maybe<UserListResponse>;
  upcomingBirthdays: Array<Maybe<UserBirthday>>;
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

export type QueryGetCommentsArgs = {
  targetId: Scalars['String']['input'];
  targetType: CommentTargetType;
};

export type QueryGetCompanyInfoArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetEventDetailsArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetEventListArgs = {
  options?: InputMaybe<ListInput>;
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

export type Role = {
  __typename?: 'Role';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
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
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Refunded = 'REFUNDED',
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
  profileImage?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
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
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                                  city?: string | undefined;
                                  companyName: string;
                                  country?: string | undefined;
                                  id: string;
                                  position?: string | undefined;
                                  state?: string | undefined;
                                  userId: string;
                                }
                              | undefined
                            >
                          | undefined;
                        role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                        role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                    role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                        city?: string | undefined;
                        companyName: string;
                        country?: string | undefined;
                        id: string;
                        position?: string | undefined;
                        state?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                        city?: string | undefined;
                        companyName: string;
                        country?: string | undefined;
                        id: string;
                        position?: string | undefined;
                        state?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type AttendEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;

export type AttendEventMutation = { __typename?: 'Mutation'; attendEvent?: boolean | undefined };

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
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                                  city?: string | undefined;
                                  companyName: string;
                                  country?: string | undefined;
                                  id: string;
                                  position?: string | undefined;
                                  state?: string | undefined;
                                  userId: string;
                                }
                              | undefined
                            >
                          | undefined;
                        role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
          role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                        city?: string | undefined;
                        companyName: string;
                        country?: string | undefined;
                        id: string;
                        position?: string | undefined;
                        state?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
            }
          | undefined;
      }
    | undefined;
};

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
                        city?: string | undefined;
                        companyName: string;
                        country?: string | undefined;
                        id: string;
                        position?: string | undefined;
                        state?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                  city?: string | undefined;
                  companyName: string;
                  country?: string | undefined;
                  id: string;
                  position?: string | undefined;
                  state?: string | undefined;
                  userId: string;
                }
              | undefined
            >
          | undefined;
        role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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

export type PublishEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
  status: EventStatus;
}>;

export type PublishEventMutation = { __typename?: 'Mutation'; publishEvent?: boolean | undefined };

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
                        city?: string | undefined;
                        companyName: string;
                        country?: string | undefined;
                        id: string;
                        position?: string | undefined;
                        state?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
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
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  token?: InputMaybe<Scalars['String']['input']>;
}>;

export type ResetPasswordMutation = { __typename?: 'Mutation'; resetPassword?: boolean | undefined };

export type SendMassEmailMutationVariables = Exact<{
  context?: InputMaybe<Scalars['JSON']['input']>;
  subject: Scalars['String']['input'];
  template: Scalars['String']['input'];
}>;

export type SendMassEmailMutation = { __typename?: 'Mutation'; sendMassEmail?: boolean | undefined };

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
                        city?: string | undefined;
                        companyName: string;
                        country?: string | undefined;
                        id: string;
                        position?: string | undefined;
                        state?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
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
                  city?: string | undefined;
                  companyName: string;
                  country?: string | undefined;
                  id: string;
                  position?: string | undefined;
                  state?: string | undefined;
                  userId: string;
                }
              | undefined
            >
          | undefined;
        role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                                  city?: string | undefined;
                                  companyName: string;
                                  country?: string | undefined;
                                  id: string;
                                  position?: string | undefined;
                                  state?: string | undefined;
                                  userId: string;
                                }
                              | undefined
                            >
                          | undefined;
                        role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                        city?: string | undefined;
                        companyName: string;
                        country?: string | undefined;
                        id: string;
                        position?: string | undefined;
                        state?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
          role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                        city?: string | undefined;
                        companyName: string;
                        country?: string | undefined;
                        id: string;
                        position?: string | undefined;
                        state?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
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
                  city?: string | undefined;
                  companyName: string;
                  country?: string | undefined;
                  id: string;
                  position?: string | undefined;
                  state?: string | undefined;
                  userId: string;
                }
              | undefined
            >
          | undefined;
        role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
          role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
          role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
        }
      | undefined;
  }>;
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
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                                  city?: string | undefined;
                                  companyName: string;
                                  country?: string | undefined;
                                  id: string;
                                  position?: string | undefined;
                                  state?: string | undefined;
                                  userId: string;
                                }
                              | undefined
                            >
                          | undefined;
                        role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                              | { __typename?: 'Role'; id?: string | undefined; name?: string | undefined }
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
                        role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                            city?: string | undefined;
                            companyName: string;
                            country?: string | undefined;
                            id: string;
                            position?: string | undefined;
                            state?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
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
                        city?: string | undefined;
                        companyName: string;
                        country?: string | undefined;
                        id: string;
                        position?: string | undefined;
                        state?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
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
                            city?: string | undefined;
                            companyName: string;
                            country?: string | undefined;
                            id: string;
                            position?: string | undefined;
                            state?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                        role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                        role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
                      }
                    | undefined;
                }
              | undefined
            >
          | undefined;
      }
    | undefined;
};

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
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
          role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
        }
      | undefined;
  }>;
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
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                              | { __typename?: 'Role'; id?: string | undefined; name?: string | undefined }
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
                        role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                            city?: string | undefined;
                            companyName: string;
                            country?: string | undefined;
                            id: string;
                            position?: string | undefined;
                            state?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
                }
              | undefined;
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
                        city?: string | undefined;
                        companyName: string;
                        country?: string | undefined;
                        id: string;
                        position?: string | undefined;
                        state?: string | undefined;
                        userId: string;
                      }
                    | undefined
                  >
                | undefined;
              role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                                  city?: string | undefined;
                                  companyName: string;
                                  country?: string | undefined;
                                  id: string;
                                  position?: string | undefined;
                                  state?: string | undefined;
                                  userId: string;
                                }
                              | undefined
                            >
                          | undefined;
                        role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
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
                  city?: string | undefined;
                  companyName: string;
                  country?: string | undefined;
                  id: string;
                  position?: string | undefined;
                  state?: string | undefined;
                  userId: string;
                }
              | undefined
            >
          | undefined;
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
                            city?: string | undefined;
                            companyName: string;
                            country?: string | undefined;
                            id: string;
                            position?: string | undefined;
                            state?: string | undefined;
                            userId: string;
                          }
                        | undefined
                      >
                    | undefined;
                  role?: { __typename?: 'Role'; id?: string | undefined; name?: string | undefined } | undefined;
                }
              | undefined
            >
          | undefined;
      }
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
            city
            companyName
            country
            id
            position
            state
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
          profileImage
          role {
            id
            name
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
          city
          companyName
          country
          id
          position
          state
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
        profileImage
        role {
          id
          name
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
          city
          companyName
          country
          id
          position
          state
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
        profileImage
        role {
          id
          name
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
            city
            companyName
            country
            id
            position
            state
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
          profileImage
          role {
            id
            name
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
      status
      title
      transactionDate
      type
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          city
          companyName
          country
          id
          position
          state
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
        profileImage
        role {
          id
          name
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
      status
      title
      transactionDate
      type
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          city
          companyName
          country
          id
          position
          state
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
        profileImage
        role {
          id
          name
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
        city
        companyName
        country
        id
        position
        state
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
      profileImage
      role {
        id
        name
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
export const RefreshTokenDocument = gql`
  mutation refreshToken {
    refreshToken {
      user {
        aboutMe
        batch
        companyInfo {
          city
          companyName
          country
          id
          position
          state
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
        profileImage
        role {
          id
          name
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
export const SigninDocument = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      user {
        aboutMe
        batch
        companyInfo {
          city
          companyName
          country
          id
          position
          state
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
        profileImage
        role {
          id
          name
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
        city
        companyName
        country
        id
        position
        state
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
      profileImage
      role {
        id
        name
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
            city
            companyName
            country
            id
            position
            state
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
          profileImage
          role {
            id
            name
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
          city
          companyName
          country
          id
          position
          state
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
        profileImage
        role {
          id
          name
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
      status
      title
      transactionDate
      type
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          city
          companyName
          country
          id
          position
          state
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
        profileImage
        role {
          id
          name
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
        city
        companyName
        country
        id
        position
        state
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
      profileImage
      role {
        id
        name
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
            city
            companyName
            country
            id
            position
            state
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
          profileImage
          role {
            id
            name
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
          city
          companyName
          country
          id
          position
          state
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
        profileImage
        role {
          id
          name
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
          city
          companyName
          country
          id
          position
          state
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
        profileImage
        role {
          id
          name
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
        companyInfo {
          city
          companyName
          country
          id
          position
          state
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
        profileImage
        role {
          id
          name
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
export function useGetCompanyInfoListSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetCompanyInfoListQuery, GetCompanyInfoListQueryVariables>
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
          city
          companyName
          country
          id
          position
          state
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
        profileImage
        role {
          id
          name
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
      status
      title
      transactionDate
      type
      updatedAt
      user {
        aboutMe
        batch
        companyInfo {
          city
          companyName
          country
          id
          position
          state
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
        profileImage
        role {
          id
          name
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
        status
        title
        transactionDate
        type
        updatedAt
        user {
          aboutMe
          batch
          companyInfo {
            city
            companyName
            country
            id
            position
            state
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
          profileImage
          role {
            id
            name
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
export function useGetUserAddressesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetUserAddressesQuery, GetUserAddressesQueryVariables>
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
        city
        companyName
        country
        id
        position
        state
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
      profileImage
      role {
        id
        name
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
          city
          companyName
          country
          id
          position
          state
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
        profileImage
        role {
          id
          name
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
export function useUpcomingBirthdaysSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<UpcomingBirthdaysQuery, UpcomingBirthdaysQueryVariables>
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
