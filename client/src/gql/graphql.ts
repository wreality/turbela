/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
  Date: { input: any; output: any }
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: { input: any; output: any }
  DateTimeTz: { input: any; output: any }
  Upload: { input: any; output: any }
}

export type Ability = {
  __typename?: 'Ability'
  name: Scalars['String']['output']
  title: Scalars['String']['output']
}

export type Address = {
  __typename?: 'Address'
  city: Scalars['String']['output']
  line1: Scalars['String']['output']
  line2?: Maybe<Scalars['String']['output']>
  postal_code: Scalars['String']['output']
  state: Scalars['String']['output']
}

export type AddressInput = {
  city: Scalars['String']['input']
  line1: Scalars['String']['input']
  line2?: InputMaybe<Scalars['String']['input']>
  postal_code: Scalars['String']['input']
  state: Scalars['String']['input']
}

export type AdminSettings = {
  __typename?: 'AdminSettings'
  maps_api_key?: Maybe<Scalars['String']['output']>
}

export type AdminSettingsInput = {
  maps_api_key?: InputMaybe<Scalars['String']['input']>
}

export type AssignBadgeUserInput = {
  instructor_id: Scalars['ID']['input']
  notes?: InputMaybe<Scalars['String']['input']>
  /** The user to assign */
  user_id: Scalars['ID']['input']
}

export type AvailableStripeProducts = {
  __typename?: 'AvailableStripeProducts'
  id: Scalars['String']['output']
  name: Scalars['String']['output']
}

export type Badge = {
  __typename?: 'Badge'
  created_at: Scalars['DateTimeTz']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  updated_at: Scalars['DateTimeTz']['output']
  users: UserPaginator
}

export type BadgeUsersArgs = {
  first?: Scalars['Int']['input']
  page?: InputMaybe<Scalars['Int']['input']>
  q?: InputMaybe<Scalars['String']['input']>
}

export type BadgeCompletion = {
  __typename?: 'BadgeCompletion'
  audits: Array<BadgeCompletionAudit>
  created_at: Scalars['DateTimeTz']['output']
  id: Scalars['ID']['output']
  instructor?: Maybe<User>
  instructor_id?: Maybe<Scalars['ID']['output']>
  notes?: Maybe<Scalars['String']['output']>
  revoked: Scalars['Boolean']['output']
  updated_at: Scalars['DateTimeTz']['output']
}

export type BadgeCompletionAudit = {
  __typename?: 'BadgeCompletionAudit'
  created_at: Scalars['DateTimeTz']['output']
  event: Scalars['String']['output']
  id: Scalars['ID']['output']
  new_values: BadgeCompletionAuditValues
  user?: Maybe<User>
}

export type BadgeCompletionAuditValues = {
  __typename?: 'BadgeCompletionAuditValues'
  completion: BadgeCompletion
}

export type BadgeMutations = {
  __typename?: 'BadgeMutations'
  create: Badge
  update: Badge
  updateBadgeUsers: Badge
  updateUserBadges: User
}

export type BadgeMutationsCreateArgs = {
  input?: InputMaybe<CreateBadgeInput>
}

export type BadgeMutationsUpdateArgs = {
  id: Scalars['ID']['input']
  input?: InputMaybe<UpdateBadgeInput>
}

export type BadgeMutationsUpdateBadgeUsersArgs = {
  input?: InputMaybe<UpdateBadgeUsersInput>
}

export type BadgeMutationsUpdateUserBadgesArgs = {
  input?: InputMaybe<UpdateUserBadgesInput>
}

/** A paginated list of Badge items. */
export type BadgePaginator = {
  __typename?: 'BadgePaginator'
  /** A list of Badge items. */
  data: Array<Badge>
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo
}

export type CashierSubscription = {
  __typename?: 'CashierSubscription'
  created_at?: Maybe<Scalars['DateTime']['output']>
  ends_at?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  items?: Maybe<Array<Maybe<CashierSubscriptionItem>>>
  name?: Maybe<Scalars['String']['output']>
  quantity?: Maybe<Scalars['Int']['output']>
  stripe_id: Scalars['String']['output']
  stripe_price: Scalars['String']['output']
  stripe_status?: Maybe<StripeSubscriptionStatus>
  trial_ends_at?: Maybe<Scalars['String']['output']>
  updated_at?: Maybe<Scalars['DateTime']['output']>
  user_id: Scalars['ID']['output']
}

export type CashierSubscriptionItem = {
  __typename?: 'CashierSubscriptionItem'
  created_at?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['ID']['output']
  quantity?: Maybe<Scalars['Int']['output']>
  stripe_id?: Maybe<Scalars['String']['output']>
  stripe_price?: Maybe<Scalars['String']['output']>
  stripe_product?: Maybe<Scalars['String']['output']>
  subscription_id: Scalars['ID']['output']
  updated_at?: Maybe<Scalars['DateTime']['output']>
}

export type ConnectLocatorTarget = {
  id: Scalars['ID']['input']
  type: LocatorTargetTypes
}

export type Course = {
  __typename?: 'Course'
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  sessions: Array<CourseSession>
  stripe_product?: Maybe<Scalars['String']['output']>
}

/** A paginated list of Course items. */
export type CoursePaginator = {
  __typename?: 'CoursePaginator'
  /** A list of Course items. */
  data: Array<Course>
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo
}

export type CourseSession = {
  __typename?: 'CourseSession'
  course: Course
  end_at?: Maybe<Scalars['DateTimeTz']['output']>
  id: Scalars['ID']['output']
  meetings: Array<CourseSessionMeeting>
  publish_at?: Maybe<Scalars['DateTimeTz']['output']>
  published: Scalars['Boolean']['output']
  start_at?: Maybe<Scalars['DateTimeTz']['output']>
}

export type CourseSessionMeeting = {
  __typename?: 'CourseSessionMeeting'
  end_at?: Maybe<Scalars['DateTimeTz']['output']>
  id: Scalars['ID']['output']
  start_at?: Maybe<Scalars['DateTimeTz']['output']>
}

/** A paginated list of CourseSession items. */
export type CourseSessionPaginator = {
  __typename?: 'CourseSessionPaginator'
  /** A list of CourseSession items. */
  data: Array<CourseSession>
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo
}

export type CreateBadgeInput = {
  name: Scalars['String']['input']
}

export type CreateCourseInput = {
  name: Scalars['String']['input']
  sessions?: InputMaybe<CreateCourseSessionHasMany>
  stripe_product?: InputMaybe<Scalars['String']['input']>
}

export type CreateCourseMeetingsHasMany = {
  create?: InputMaybe<Array<CreateCourseSessionMeetingInput>>
}

export type CreateCourseSessionHasMany = {
  create?: InputMaybe<Array<CreateCourseSessionInput>>
}

export type CreateCourseSessionInput = {
  meetings?: InputMaybe<CreateCourseMeetingsHasMany>
  publish_at?: InputMaybe<Scalars['DateTimeTz']['input']>
  published?: InputMaybe<Scalars['Boolean']['input']>
}

export type CreateCourseSessionMeetingInput = {
  end_at?: InputMaybe<Scalars['DateTimeTz']['input']>
  start_at?: InputMaybe<Scalars['DateTimeTz']['input']>
}

export type CreateFeature = {
  name: Scalars['String']['input']
  type?: InputMaybe<FeatureType>
}

export type CreateLocatorInput = {
  target: CreateLocatorTarget
  token: Scalars['String']['input']
  type: LocatorTypes
}

export type CreateLocatorTarget = {
  connect?: InputMaybe<ConnectLocatorTarget>
}

export type CreateOverlayInput = {
  name: Scalars['String']['input']
  spec: Scalars['String']['input']
  type: OverlayType
  upload: Scalars['Upload']['input']
}

export type CreatePlan = {
  name: Scalars['String']['input']
  public?: InputMaybe<Scalars['Boolean']['input']>
}

export type CreateUser = {
  address: AddressInput
  email: Scalars['String']['input']
  name: Scalars['String']['input']
  phones: Array<PhonesInput>
  preferred_name?: InputMaybe<Scalars['String']['input']>
}

export type Feature = {
  __typename?: 'Feature'
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  parameters?: Maybe<FeatureParameters>
  slug?: Maybe<Scalars['String']['output']>
  type: FeatureType
}

export type FeatureParameters = {
  __typename?: 'FeatureParameters'
  amount?: Maybe<Scalars['Int']['output']>
}

export enum FeatureType {
  Grant = 'GRANT',
  Limit = 'LIMIT',
  Track = 'TRACK',
}

export type GeneralSettings = {
  __typename?: 'GeneralSettings'
  site_name?: Maybe<Scalars['String']['output']>
}

export type GeneralSettingsInput = {
  site_name?: InputMaybe<Scalars['String']['input']>
}

export type Locator = {
  __typename?: 'Locator'
  active?: Maybe<Scalars['Boolean']['output']>
  created?: Maybe<Scalars['DateTimeTz']['output']>
  id: Scalars['ID']['output']
  last_seen?: Maybe<Scalars['DateTimeTz']['output']>
  target: LocatorTarget
  token: Scalars['String']['output']
  type?: Maybe<LocatorTypes>
  updated?: Maybe<Scalars['DateTimeTz']['output']>
}

export type LocatorTarget = User

export enum LocatorTargetTypes {
  User = 'USER',
}

export enum LocatorTypes {
  Barcode = 'BARCODE',
  Rfid = 'RFID',
}

export type LoginTerminalInput = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type LoginTerminalResult = {
  __typename?: 'LoginTerminalResult'
  token?: Maybe<Scalars['String']['output']>
  user?: Maybe<User>
}

export type Media = {
  __typename?: 'Media'
  collection_name?: Maybe<Scalars['String']['output']>
  file_name?: Maybe<Scalars['String']['output']>
  mime_type?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  size?: Maybe<Scalars['Int']['output']>
  srcset?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type Mutation = {
  __typename?: 'Mutation'
  activateTerminal?: Maybe<Token>
  badge?: Maybe<BadgeMutations>
  createCourse: Course
  createFeature: Feature
  createLocator?: Maybe<Locator>
  createOverlay?: Maybe<Overlay>
  createPlan: Plan
  createUser: User
  login: User
  loginTerminalUser?: Maybe<LoginTerminalResult>
  logout?: Maybe<User>
  logoutTerminalUser?: Maybe<User>
  registerTerminal?: Maybe<Terminal>
  revokeTerminal?: Maybe<Terminal>
  saveAdminSettings?: Maybe<AdminSettings>
  saveGeneralSettings?: Maybe<GeneralSettings>
  savePaymentSettings?: Maybe<PaymentSettings>
  updateCourse: Course
  updateFeature: Feature
  updateOverlay?: Maybe<Overlay>
  updatePlan: Plan
  updateTerminalPin?: Maybe<User>
  updateUser: User
  volunteer?: Maybe<VolunteerMutations>
}

export type MutationActivateTerminalArgs = {
  slug: Scalars['String']['input']
}

export type MutationCreateCourseArgs = {
  input: CreateCourseInput
}

export type MutationCreateFeatureArgs = {
  input?: InputMaybe<CreateFeature>
}

export type MutationCreateLocatorArgs = {
  input: CreateLocatorInput
}

export type MutationCreateOverlayArgs = {
  input?: InputMaybe<CreateOverlayInput>
}

export type MutationCreatePlanArgs = {
  input?: InputMaybe<CreatePlan>
}

export type MutationCreateUserArgs = {
  input?: InputMaybe<CreateUser>
}

export type MutationLoginArgs = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type MutationLoginTerminalUserArgs = {
  input?: InputMaybe<LoginTerminalInput>
}

export type MutationLogoutTerminalUserArgs = {
  id: Scalars['ID']['input']
}

export type MutationRegisterTerminalArgs = {
  input?: InputMaybe<RegisterTerminalInput>
}

export type MutationRevokeTerminalArgs = {
  id: Scalars['ID']['input']
}

export type MutationSaveAdminSettingsArgs = {
  settings: AdminSettingsInput
}

export type MutationSaveGeneralSettingsArgs = {
  settings: GeneralSettingsInput
}

export type MutationSavePaymentSettingsArgs = {
  settings: PaymentSettingsInput
}

export type MutationUpdateCourseArgs = {
  id: Scalars['ID']['input']
  input: UpdateCourseInput
}

export type MutationUpdateFeatureArgs = {
  input?: InputMaybe<UpdateFeature>
}

export type MutationUpdateOverlayArgs = {
  input?: InputMaybe<UpdateOverlayInput>
}

export type MutationUpdatePlanArgs = {
  input?: InputMaybe<UpdatePlan>
}

export type MutationUpdateTerminalPinArgs = {
  input?: InputMaybe<UpdateTerminalPin>
}

export type MutationUpdateUserArgs = {
  input?: InputMaybe<UserUpdate>
}

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String']['input']
  /** The direction that is used for ordering. */
  order: SortOrder
}

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT',
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM',
}

export type Overlay = {
  __typename?: 'Overlay'
  background: Media
  created: Scalars['DateTimeTz']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  resolved_spec: Scalars['String']['output']
  spec: Scalars['String']['output']
  type: OverlayType
  updated?: Maybe<Scalars['DateTimeTz']['output']>
}

/** A paginated list of Overlay items. */
export type OverlayPaginator = {
  __typename?: 'OverlayPaginator'
  /** A list of Overlay items. */
  data: Array<Overlay>
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo
}

export enum OverlayType {
  GenericUser = 'GENERIC_USER',
  Idcard = 'IDCARD',
}

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo'
  /** Number of items in the current page. */
  count: Scalars['Int']['output']
  /** Index of the current page. */
  currentPage: Scalars['Int']['output']
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']['output']>
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean']['output']
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']['output']>
  /** Index of the last available page. */
  lastPage: Scalars['Int']['output']
  /** Number of items per page. */
  perPage: Scalars['Int']['output']
  /** Number of total available items. */
  total: Scalars['Int']['output']
}

export type PaymentSettings = {
  __typename?: 'PaymentSettings'
  stripe_pk?: Maybe<Scalars['String']['output']>
  stripe_sk?: Maybe<Scalars['String']['output']>
}

export type PaymentSettingsInput = {
  stripe_pk?: InputMaybe<Scalars['String']['input']>
  stripe_sk?: InputMaybe<Scalars['String']['input']>
}

export type Phones = {
  __typename?: 'Phones'
  number: Scalars['String']['output']
  type: Scalars['String']['output']
}

export type PhonesInput = {
  number: Scalars['String']['input']
  type: Scalars['String']['input']
}

export type Plan = {
  __typename?: 'Plan'
  features?: Maybe<Array<Feature>>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  public: Scalars['Boolean']['output']
  stripe_data?: Maybe<StripeProductData>
  stripe_id?: Maybe<Scalars['String']['output']>
}

/** A paginated list of Plan items. */
export type PlanPaginator = {
  __typename?: 'PlanPaginator'
  /** A list of Plan items. */
  data: Array<Plan>
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo
}

export type PublicPaymentSettings = {
  __typename?: 'PublicPaymentSettings'
  stripe_pk?: Maybe<Scalars['String']['output']>
}

export type PublicPlan = {
  __typename?: 'PublicPlan'
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

/** A paginated list of PublicPlan items. */
export type PublicPlanPaginator = {
  __typename?: 'PublicPlanPaginator'
  /** A list of PublicPlan items. */
  data: Array<PublicPlan>
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo
}

export enum PunchInOutDirection {
  In = 'IN',
  Out = 'OUT',
}

export type Query = {
  __typename?: 'Query'
  activeVolunteers: Scalars['Int']['output']
  adminSettings?: Maybe<AdminSettings>
  badge?: Maybe<Badge>
  badges: BadgePaginator
  badgesCount: Scalars['Int']['output']
  course?: Maybe<Course>
  courses: CoursePaginator
  currentUser?: Maybe<User>
  generalSettings?: Maybe<GeneralSettings>
  getAvailableStripeProducts: Array<AvailableStripeProducts>
  getFeatures: Array<Feature>
  getPublicPlans: PublicPlanPaginator
  helloTerminal?: Maybe<Terminal>
  inactiveVolunteers: Scalars['Int']['output']
  locator?: Maybe<Locator>
  overlay?: Maybe<Overlay>
  overlays: OverlayPaginator
  paymentSettings?: Maybe<PaymentSettings>
  plan?: Maybe<Plan>
  plans: PlanPaginator
  publicPaymentSettings?: Maybe<PublicPaymentSettings>
  punchedInVolunteers: Scalars['Int']['output']
  search: SearchModelPaginator
  sessions: CourseSessionPaginator
  terminal: TerminalPaginator
  terminals: TerminalPaginator
  user?: Maybe<User>
  userExists: Scalars['Boolean']['output']
  users: UserPaginator
  volunteer?: Maybe<Volunteer>
  volunteer_hours: VolunteerHourPaginator
}

export type QueryBadgeArgs = {
  id: Scalars['ID']['input']
}

export type QueryBadgesArgs = {
  first?: Scalars['Int']['input']
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type QueryCourseArgs = {
  id: Scalars['ID']['input']
}

export type QueryCoursesArgs = {
  first?: Scalars['Int']['input']
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type QueryGetPublicPlansArgs = {
  first?: Scalars['Int']['input']
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryLocatorArgs = {
  token: Scalars['String']['input']
  type: LocatorTypes
}

export type QueryOverlayArgs = {
  id: Scalars['ID']['input']
}

export type QueryOverlaysArgs = {
  first: Scalars['Int']['input']
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type QueryPlanArgs = {
  id: Scalars['ID']['input']
}

export type QueryPlansArgs = {
  first?: Scalars['Int']['input']
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QuerySearchArgs = {
  first: Scalars['Int']['input']
  page?: InputMaybe<Scalars['Int']['input']>
  q: Scalars['String']['input']
}

export type QuerySessionsArgs = {
  first?: Scalars['Int']['input']
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type QueryTerminalArgs = {
  first?: Scalars['Int']['input']
  id: Scalars['ID']['input']
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryTerminalsArgs = {
  first?: Scalars['Int']['input']
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryUserExistsArgs = {
  email: Scalars['String']['input']
}

export type QueryUsersArgs = {
  first?: Scalars['Int']['input']
  page?: InputMaybe<Scalars['Int']['input']>
  scope?: InputMaybe<SearchUsersInput>
  search?: InputMaybe<Scalars['String']['input']>
}

export type QueryVolunteerArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryVolunteer_HoursArgs = {
  first: Scalars['Int']['input']
  orderBy?: InputMaybe<Array<QueryVolunteerHoursOrderByOrderByClause>>
  page?: InputMaybe<Scalars['Int']['input']>
  range?: InputMaybe<VolunteerHoursRangeInput>
  scope?: InputMaybe<VolunteerHoursScopesInput>
}

/** Allowed column names for Query.volunteer_hours.orderBy. */
export enum QueryVolunteerHoursOrderByColumn {
  Approved = 'APPROVED',
  Length = 'LENGTH',
  Start = 'START',
}

/** Order by clause for Query.volunteer_hours.orderBy. */
export type QueryVolunteerHoursOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryVolunteerHoursOrderByColumn
  /** The direction that is used for ordering. */
  order: SortOrder
}

export type Role = {
  __typename?: 'Role'
  name: Scalars['String']['output']
  title: Scalars['String']['output']
}

export type SearchModel = Badge | User

/** A paginated list of SearchModel items. */
export type SearchModelPaginator = {
  __typename?: 'SearchModelPaginator'
  /** A list of SearchModel items. */
  data: Array<SearchModel>
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo
}

export type SearchResult = {
  __typename?: 'SearchResult'
  current_page: Scalars['Int']['output']
  data?: Maybe<Array<SearchModel>>
  per_page: Scalars['Int']['output']
  total: Scalars['Int']['output']
}

export type SearchUsersInput = {
  volunteer?: InputMaybe<VolunteerScopesInput>
}

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC',
}

export type StripeAutomaticTax = {
  __typename?: 'StripeAutomaticTax'
  enabled?: Maybe<Scalars['Boolean']['output']>
  status?: Maybe<Scalars['String']['output']>
}

export type StripeInvoice = {
  __typename?: 'StripeInvoice'
  amount_due: Scalars['Int']['output']
  amount_paid: Scalars['Int']['output']
  amount_remaining: Scalars['Int']['output']
  attempt_count: Scalars['Int']['output']
  attempted?: Maybe<Scalars['Boolean']['output']>
  auto_advance?: Maybe<Scalars['Boolean']['output']>
  automatic_tax?: Maybe<StripeAutomaticTax>
  billing_reason: Scalars['String']['output']
  charge?: Maybe<Scalars['String']['output']>
  collection_method?: Maybe<Scalars['String']['output']>
  created?: Maybe<Scalars['String']['output']>
  currency?: Maybe<Scalars['String']['output']>
  customer?: Maybe<Scalars['String']['output']>
  customer_address?: Maybe<Address>
  customer_email?: Maybe<Scalars['String']['output']>
  customer_name?: Maybe<Scalars['String']['output']>
  customer_phone?: Maybe<Scalars['String']['output']>
  customer_shipping?: Maybe<Address>
  default_source?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  discount?: Maybe<Scalars['String']['output']>
  due_date?: Maybe<Scalars['String']['output']>
  ending_balance?: Maybe<Scalars['Int']['output']>
  footer?: Maybe<Scalars['String']['output']>
  from_invoice?: Maybe<Scalars['String']['output']>
  hosted_invoice_url?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  invoice_pdf?: Maybe<Scalars['String']['output']>
  last_finalization_error?: Maybe<Scalars['String']['output']>
  latest_revision?: Maybe<Scalars['String']['output']>
  lines?: Maybe<StripesLinesPaginator>
  livemode?: Maybe<Scalars['Boolean']['output']>
  next_payment_attempt?: Maybe<Scalars['String']['output']>
  number?: Maybe<Scalars['String']['output']>
  on_behalf_of?: Maybe<Scalars['String']['output']>
  paid?: Maybe<Scalars['Boolean']['output']>
  paid_out_of_band?: Maybe<Scalars['Boolean']['output']>
  payment_intent?: Maybe<Scalars['String']['output']>
  period_end?: Maybe<Scalars['String']['output']>
  period_start?: Maybe<Scalars['String']['output']>
  post_payment_credit_notes_amount?: Maybe<Scalars['Int']['output']>
  pre_payment_credit_notes_amount?: Maybe<Scalars['Int']['output']>
  quote?: Maybe<Scalars['String']['output']>
  receipt_number?: Maybe<Scalars['String']['output']>
  starting_balance?: Maybe<Scalars['Int']['output']>
  statement_descriptor?: Maybe<Scalars['String']['output']>
  status?: Maybe<StripeInvoiceStatus>
  status_transitions?: Maybe<StripeStatusTransitions>
  subscription?: Maybe<Scalars['String']['output']>
  subtotal?: Maybe<Scalars['Int']['output']>
  subtotal_excluding_tax?: Maybe<Scalars['Int']['output']>
  tax?: Maybe<Scalars['Int']['output']>
  test_clock?: Maybe<Scalars['String']['output']>
  total?: Maybe<Scalars['Int']['output']>
  total_excluding_tax?: Maybe<Scalars['String']['output']>
  total_tax_amounts?: Maybe<Array<Maybe<StripeTotalTaxAmounts>>>
  webhooks_delivered_at?: Maybe<Scalars['String']['output']>
}

export enum StripeInvoiceStatus {
  Draft = 'DRAFT',
  Open = 'OPEN',
  Paid = 'PAID',
  Uncollectible = 'UNCOLLECTIBLE',
  Void = 'VOID',
}

export type StripeLineItems = {
  __typename?: 'StripeLineItems'
  amount?: Maybe<Scalars['Int']['output']>
  amount_excluding_tax?: Maybe<Scalars['Int']['output']>
  currency?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  discountable?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  livemode?: Maybe<Scalars['Boolean']['output']>
  period?: Maybe<StripePeriod>
  plan?: Maybe<StripePlan>
  price?: Maybe<StripePrice>
  proration?: Maybe<Scalars['Boolean']['output']>
  quantity?: Maybe<Scalars['Int']['output']>
  subscription?: Maybe<Scalars['String']['output']>
  subscription_item?: Maybe<Scalars['String']['output']>
  tax_amounts?: Maybe<Array<Maybe<StripeTotalTaxAmounts>>>
  type?: Maybe<Scalars['String']['output']>
  unit_amount_excluding_tax?: Maybe<Scalars['Int']['output']>
}

export type StripePeriod = {
  __typename?: 'StripePeriod'
  end?: Maybe<Scalars['String']['output']>
  start?: Maybe<Scalars['String']['output']>
}

export type StripePlan = {
  __typename?: 'StripePlan'
  active?: Maybe<Scalars['Boolean']['output']>
  amount?: Maybe<Scalars['Int']['output']>
  amount_decimal?: Maybe<Scalars['Int']['output']>
  created?: Maybe<Scalars['String']['output']>
  currency?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  interval?: Maybe<Scalars['String']['output']>
  interval_count?: Maybe<Scalars['Int']['output']>
  livemode?: Maybe<Scalars['Boolean']['output']>
  nickname?: Maybe<Scalars['String']['output']>
  product?: Maybe<Scalars['String']['output']>
  trial_period_days?: Maybe<Scalars['Int']['output']>
}

export type StripePrice = {
  __typename?: 'StripePrice'
  active?: Maybe<Scalars['Boolean']['output']>
  created?: Maybe<Scalars['String']['output']>
  currency?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  livemode?: Maybe<Scalars['Boolean']['output']>
  lookup_key?: Maybe<Scalars['String']['output']>
  nickname?: Maybe<Scalars['String']['output']>
  product?: Maybe<Scalars['String']['output']>
  recurring?: Maybe<StripeRecurring>
  tax_behavior?: Maybe<Scalars['String']['output']>
  transform_quantity?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
  unit_amount?: Maybe<Scalars['Int']['output']>
  unit_amount_decimal?: Maybe<Scalars['Int']['output']>
}

export type StripePriceRecurringData = {
  __typename?: 'StripePriceRecurringData'
  interval: Scalars['String']['output']
  interval_count: Scalars['Int']['output']
}

export type StripeProductData = {
  __typename?: 'StripeProductData'
  id?: Maybe<Scalars['String']['output']>
  livemode?: Maybe<Scalars['Boolean']['output']>
  name?: Maybe<Scalars['String']['output']>
  prices?: Maybe<Array<StripeProductPriceData>>
}

export type StripeProductPriceData = {
  __typename?: 'StripeProductPriceData'
  currency: Scalars['String']['output']
  id: Scalars['String']['output']
  nickname?: Maybe<Scalars['String']['output']>
  recurring?: Maybe<StripePriceRecurringData>
  unit_amount: Scalars['Int']['output']
}

export type StripeRecurring = {
  __typename?: 'StripeRecurring'
  interval?: Maybe<Scalars['String']['output']>
  interval_count?: Maybe<Scalars['Int']['output']>
  trial_period_days?: Maybe<Scalars['Int']['output']>
  usage_type?: Maybe<Scalars['String']['output']>
}

export type StripeStatusTransitions = {
  __typename?: 'StripeStatusTransitions'
  finalized_at?: Maybe<Scalars['String']['output']>
  marked_uncollectible_at?: Maybe<Scalars['String']['output']>
  paid_at?: Maybe<Scalars['String']['output']>
  voided_at?: Maybe<Scalars['String']['output']>
}

export enum StripeSubscriptionStatus {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Incomplete = 'INCOMPLETE',
  IncompleteExpired = 'INCOMPLETE_EXPIRED',
  PastDue = 'PAST_DUE',
  Trialing = 'TRIALING',
  Unpaid = 'UNPAID',
}

export type StripeTotalTaxAmounts = {
  __typename?: 'StripeTotalTaxAmounts'
  amount?: Maybe<Scalars['Int']['output']>
  inclusive?: Maybe<Scalars['Boolean']['output']>
  tax_rate?: Maybe<Scalars['String']['output']>
}

export type StripesLinesPaginator = {
  __typename?: 'StripesLinesPaginator'
  data?: Maybe<Array<Maybe<StripeLineItems>>>
  has_more?: Maybe<Scalars['Boolean']['output']>
  total_count?: Maybe<Scalars['Int']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type SyncFeatures = {
  amount?: InputMaybe<Scalars['Int']['input']>
  id: Scalars['ID']['input']
}

export type Terminal = {
  __typename?: 'Terminal'
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  slug?: Maybe<Scalars['String']['output']>
  tokens?: Maybe<Array<Maybe<Token>>>
}

/** A paginated list of Terminal items. */
export type TerminalPaginator = {
  __typename?: 'TerminalPaginator'
  /** A list of Terminal items. */
  data: Array<Terminal>
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo
}

export type Token = {
  __typename?: 'Token'
  created: Scalars['String']['output']
  last_used_at?: Maybe<Scalars['DateTimeTz']['output']>
  name: Scalars['String']['output']
  plainTextToken?: Maybe<Scalars['String']['output']>
  updated: Scalars['String']['output']
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT',
}

export type UpdateBadgeInput = {
  name?: InputMaybe<Scalars['String']['input']>
}

export type UpdateBadgeUsersInput = {
  grant?: InputMaybe<Array<AssignBadgeUserInput>>
  /** The badge to update */
  id: Scalars['ID']['input']
}

export type UpdateCourseInput = {
  name?: InputMaybe<Scalars['String']['input']>
  sessions?: InputMaybe<UpdateCourseSessionHasMany>
  stripe_product?: InputMaybe<Scalars['String']['input']>
}

export type UpdateCourseMeetingsHasMany = {
  create?: InputMaybe<Array<CreateCourseSessionMeetingInput>>
  delete?: InputMaybe<Array<Scalars['ID']['input']>>
  udpate?: InputMaybe<Array<UpdateCourseSessionMeetingInput>>
}

export type UpdateCourseSessionHasMany = {
  create?: InputMaybe<Array<CreateCourseSessionInput>>
  delete?: InputMaybe<Array<Scalars['ID']['input']>>
  udpate?: InputMaybe<Array<UpdateCourseSessionInput>>
}

export type UpdateCourseSessionInput = {
  id: Scalars['ID']['input']
  meetings?: InputMaybe<UpdateCourseMeetingsHasMany>
  publish_at?: InputMaybe<Scalars['DateTimeTz']['input']>
  published?: InputMaybe<Scalars['Boolean']['input']>
}

export type UpdateCourseSessionMeetingInput = {
  end_at?: InputMaybe<Scalars['DateTimeTz']['input']>
  id: Scalars['ID']['input']
  start_at?: InputMaybe<Scalars['DateTimeTz']['input']>
}

export type UpdateFeature = {
  id: Scalars['ID']['input']
  name?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<FeatureType>
}

export type UpdateFeaturesBelongsToMany = {
  connect?: InputMaybe<Array<SyncFeatures>>
  disconnect?: InputMaybe<Array<Scalars['ID']['input']>>
  sync?: InputMaybe<Array<SyncFeatures>>
  syncWithoutDetaching?: InputMaybe<Array<SyncFeatures>>
}

export type UpdateOverlayInput = {
  id: Scalars['ID']['input']
  name?: InputMaybe<Scalars['String']['input']>
  spec?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<OverlayType>
  upload?: InputMaybe<Scalars['Upload']['input']>
}

export type UpdatePlan = {
  features?: InputMaybe<UpdateFeaturesBelongsToMany>
  id: Scalars['ID']['input']
  name?: InputMaybe<Scalars['String']['input']>
  public?: InputMaybe<Scalars['Boolean']['input']>
  stripe_id?: InputMaybe<Scalars['String']['input']>
}

export type UpdateTerminalPin = {
  id: Scalars['ID']['input']
  terminal_pincode: Scalars['String']['input']
}

export type UpdateUserBadgesInput = {
  grant?: InputMaybe<Array<UserBadgeInput>>
  /** The user to update */
  id: Scalars['ID']['input']
  revoke?: InputMaybe<Array<UserBadgeInput>>
}

export type User = {
  __typename?: 'User'
  abilities: Array<Scalars['String']['output']>
  address?: Maybe<Address>
  avatar?: Maybe<Media>
  badge?: Maybe<UserBadge>
  badges: UserBadgePaginator
  completion: BadgeCompletion
  created_at: Scalars['DateTime']['output']
  email: Scalars['String']['output']
  email_verified_at?: Maybe<Scalars['DateTimeTz']['output']>
  id: Scalars['ID']['output']
  invoices?: Maybe<Array<Maybe<StripeInvoice>>>
  locators: Array<Maybe<Locator>>
  name: Scalars['String']['output']
  phones: Array<Phones>
  preferred_name?: Maybe<Scalars['String']['output']>
  roles: Array<Scalars['String']['output']>
  subscription?: Maybe<CashierSubscription>
  terminal_pincode?: Maybe<Scalars['String']['output']>
  updated_at: Scalars['DateTime']['output']
  volunteer?: Maybe<Volunteer>
}

export type UserBadgeArgs = {
  id: Scalars['ID']['input']
}

export type UserBadgesArgs = {
  first?: Scalars['Int']['input']
  page?: InputMaybe<Scalars['Int']['input']>
  q?: InputMaybe<Scalars['String']['input']>
}

export type UserBadge = {
  __typename?: 'UserBadge'
  completion?: Maybe<BadgeCompletion>
  created_at: Scalars['DateTimeTz']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  updated_at: Scalars['DateTimeTz']['output']
}

export type UserBadgeInput = {
  /** The badge to assign */
  badge_id: Scalars['ID']['input']
  instructor_id: Scalars['ID']['input']
  notes?: InputMaybe<Scalars['String']['input']>
}

/** A paginated list of UserBadge items. */
export type UserBadgePaginator = {
  __typename?: 'UserBadgePaginator'
  /** A list of UserBadge items. */
  data: Array<UserBadge>
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo
}

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator'
  /** A list of User items. */
  data: Array<User>
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo
}

export type UserUpdate = {
  address?: InputMaybe<AddressInput>
  avatar?: InputMaybe<Scalars['Upload']['input']>
  id: Scalars['ID']['input']
  name?: InputMaybe<Scalars['String']['input']>
  phone?: InputMaybe<Array<InputMaybe<PhonesInput>>>
  preferred_name?: InputMaybe<Scalars['String']['input']>
}

export type Volunteer = {
  __typename?: 'Volunteer'
  active: Scalars['Boolean']['output']
  created_at: Scalars['DateTimeTz']['output']
  current_hour?: Maybe<VolunteerHour>
  hour_tenths_available: Scalars['Int']['output']
  hour_tenths_expired: Scalars['Int']['output']
  hour_tenths_redeemed: Scalars['Int']['output']
  hours: VolunteerHourPaginator
  id: Scalars['ID']['output']
  supervisor?: Maybe<Scalars['Boolean']['output']>
  updated_at: Scalars['DateTimeTz']['output']
  user?: Maybe<User>
}

export type VolunteerHoursArgs = {
  first: Scalars['Int']['input']
  orderBy?: InputMaybe<Array<VolunteerHoursOrderByOrderByClause>>
  page?: InputMaybe<Scalars['Int']['input']>
  range?: InputMaybe<VolunteerHoursRangeInput>
  scope?: InputMaybe<VolunteerHoursScopesInput>
}

export type VolunteerEditTimeInput = {
  end?: InputMaybe<Scalars['DateTimeTz']['input']>
  id: Scalars['ID']['input']
  notes?: InputMaybe<Scalars['String']['input']>
  start?: InputMaybe<Scalars['DateTimeTz']['input']>
  supervisor_id?: InputMaybe<Scalars['ID']['input']>
}

export type VolunteerHour = {
  __typename?: 'VolunteerHour'
  approved: Scalars['Boolean']['output']
  end?: Maybe<Scalars['DateTimeTz']['output']>
  id: Scalars['ID']['output']
  length?: Maybe<Scalars['Int']['output']>
  notes?: Maybe<Scalars['String']['output']>
  start: Scalars['DateTimeTz']['output']
  supervisor?: Maybe<User>
}

/** A paginated list of VolunteerHour items. */
export type VolunteerHourPaginator = {
  __typename?: 'VolunteerHourPaginator'
  /** A list of VolunteerHour items. */
  data: Array<VolunteerHour>
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo
}

/** Allowed column names for Volunteer.hours.orderBy. */
export enum VolunteerHoursOrderByColumn {
  Approved = 'APPROVED',
  Length = 'LENGTH',
  Start = 'START',
}

/** Order by clause for Volunteer.hours.orderBy. */
export type VolunteerHoursOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: VolunteerHoursOrderByColumn
  /** The direction that is used for ordering. */
  order: SortOrder
}

export type VolunteerHoursRangeInput = {
  approved?: InputMaybe<Scalars['Boolean']['input']>
  end?: InputMaybe<Scalars['DateTimeTz']['input']>
  start?: InputMaybe<Scalars['DateTimeTz']['input']>
}

export type VolunteerHoursScopesInput = {
  approved?: InputMaybe<Scalars['Boolean']['input']>
  final?: InputMaybe<Scalars['Boolean']['input']>
}

export type VolunteerMutations = {
  __typename?: 'VolunteerMutations'
  editHour: VolunteerHour
  punch: VolunteerHour
  reviewHours: Array<VolunteerHour>
  updateVolunteer: Volunteer
}

export type VolunteerMutationsEditHourArgs = {
  input?: InputMaybe<VolunteerEditTimeInput>
}

export type VolunteerMutationsPunchArgs = {
  input: VolunteerPunchInput
}

export type VolunteerMutationsReviewHoursArgs = {
  input?: InputMaybe<Array<VolunteerReviewTimeInput>>
}

export type VolunteerMutationsUpdateVolunteerArgs = {
  input: VolunteerUpdateInput
}

export type VolunteerPunchInput = {
  direction: PunchInOutDirection
  id: Scalars['ID']['input']
  notes?: InputMaybe<Scalars['String']['input']>
  supervisor_id?: InputMaybe<Scalars['ID']['input']>
}

export type VolunteerReviewTimeInput = {
  approved: Scalars['Boolean']['input']
  id: Scalars['ID']['input']
  notes?: InputMaybe<Scalars['String']['input']>
}

export type VolunteerScopesInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>
  canActivate?: InputMaybe<Scalars['Boolean']['input']>
  punchedIn?: InputMaybe<Scalars['Boolean']['input']>
}

export type VolunteerUpdateInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>
  id: Scalars['ID']['input']
}

export type LoginTerminal = {
  slug: Scalars['String']['input']
}

export type RegisterTerminalInput = {
  name: Scalars['String']['input']
  slug: Scalars['String']['input']
}

export type GlobalSearchQueryVariables = Exact<{
  q: Scalars['String']['input']
}>

export type GlobalSearchQuery = {
  __typename?: 'Query'
  search: {
    __typename?: 'SearchModelPaginator'
    data: Array<
      | { __typename?: 'Badge'; id: string; name: string }
      | {
          __typename?: 'User'
          id: string
          email: string
          name: string
          avatar?: {
            __typename?: 'Media'
            srcset?: string | null
            url?: string | null
          } | null
        }
    >
  }
}

export type VolunteerHeaderBadgeFragment = {
  __typename?: 'User'
  volunteer?: {
    __typename?: 'Volunteer'
    active: boolean
    current_hour?: { __typename?: 'VolunteerHour'; start: any } | null
  } | null
}

export type GetFeaturesQueryVariables = Exact<{ [key: string]: never }>

export type GetFeaturesQuery = {
  __typename?: 'Query'
  getFeatures: Array<{
    __typename?: 'Feature'
    id: string
    type: FeatureType
    name: string
  }>
}

export type AttachFeatureMutationVariables = Exact<{
  planId: Scalars['ID']['input']
  featureId: Scalars['ID']['input']
  amount?: InputMaybe<Scalars['Int']['input']>
}>

export type AttachFeatureMutation = {
  __typename?: 'Mutation'
  updatePlan: {
    __typename?: 'Plan'
    id: string
    features?: Array<{
      __typename?: 'Feature'
      id: string
      type: FeatureType
      name: string
      parameters?: {
        __typename?: 'FeatureParameters'
        amount?: number | null
      } | null
    }> | null
  }
}

export type UpdateFeatureParamMutationVariables = Exact<{
  planId: Scalars['ID']['input']
  featureId: Scalars['ID']['input']
  amount: Scalars['Int']['input']
}>

export type UpdateFeatureParamMutation = {
  __typename?: 'Mutation'
  updatePlan: {
    __typename?: 'Plan'
    id: string
    features?: Array<{
      __typename?: 'Feature'
      id: string
      type: FeatureType
      name: string
      parameters?: {
        __typename?: 'FeatureParameters'
        amount?: number | null
      } | null
    }> | null
  }
}

export type DetachFeatureMutationVariables = Exact<{
  plan_id: Scalars['ID']['input']
  feature_id: Scalars['ID']['input']
}>

export type DetachFeatureMutation = {
  __typename?: 'Mutation'
  updatePlan: {
    __typename?: 'Plan'
    id: string
    features?: Array<{
      __typename?: 'Feature'
      id: string
      type: FeatureType
      name: string
      parameters?: {
        __typename?: 'FeatureParameters'
        amount?: number | null
      } | null
    }> | null
  }
}

export type CreateFeatureMutationVariables = Exact<{
  name: Scalars['String']['input']
  type?: InputMaybe<FeatureType>
}>

export type CreateFeatureMutation = {
  __typename?: 'Mutation'
  createFeature: {
    __typename?: 'Feature'
    id: string
    name: string
    type: FeatureType
  }
}

export type LoginTerminalUserMutationVariables = Exact<{
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}>

export type LoginTerminalUserMutation = {
  __typename?: 'Mutation'
  loginTerminalUser?: {
    __typename?: 'LoginTerminalResult'
    token?: string | null
    user?: {
      __typename?: 'User'
      id: string
      name: string
      email: string
      terminal_pincode?: string | null
    } | null
  } | null
}

export type LogoutTerminalUserMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type LogoutTerminalUserMutation = {
  __typename?: 'Mutation'
  logoutTerminalUser?: { __typename?: 'User'; id: string } | null
}

export type UserCardFragment = {
  __typename?: 'User'
  id: string
  name: string
  email: string
  avatar?: {
    __typename?: 'Media'
    srcset?: string | null
    url?: string | null
  } | null
}

export type UserImageFragment = {
  __typename?: 'User'
  avatar?: {
    __typename?: 'Media'
    srcset?: string | null
    url?: string | null
  } | null
}

export type UserItemFragment = {
  __typename?: 'User'
  id: string
  name: string
  email: string
  avatar?: {
    __typename?: 'Media'
    srcset?: string | null
    url?: string | null
  } | null
}

export type UserItemQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type UserItemQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    name: string
    email: string
    avatar?: {
      __typename?: 'Media'
      srcset?: string | null
      url?: string | null
    } | null
  } | null
}

export type SelectUsersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  input?: InputMaybe<SearchUsersInput>
}>

export type SelectUsersQuery = {
  __typename?: 'Query'
  users: {
    __typename?: 'UserPaginator'
    paginatorInfo: {
      __typename?: 'PaginatorInfo'
      lastPage: number
      total: number
    }
    data: Array<{
      __typename?: 'User'
      id: string
      name: string
      email: string
      avatar?: {
        __typename?: 'Media'
        srcset?: string | null
        url?: string | null
      } | null
    }>
  }
}

export type UserBadgeDetailsQueryVariables = Exact<{
  user_id: Scalars['ID']['input']
  badge_id: Scalars['ID']['input']
}>

export type UserBadgeDetailsQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    name: string
    email: string
    badge?: {
      __typename?: 'UserBadge'
      id: string
      name: string
      completion?: {
        __typename?: 'BadgeCompletion'
        id: string
        revoked: boolean
        created_at: any
        updated_at: any
        notes?: string | null
        instructor?: {
          __typename?: 'User'
          id: string
          name: string
          email: string
          avatar?: {
            __typename?: 'Media'
            srcset?: string | null
            url?: string | null
          } | null
        } | null
        audits: Array<{
          __typename?: 'BadgeCompletionAudit'
          id: string
          event: string
          created_at: any
          user?: {
            __typename?: 'User'
            id: string
            name: string
            email: string
            avatar?: {
              __typename?: 'Media'
              srcset?: string | null
              url?: string | null
            } | null
          } | null
          new_values: {
            __typename?: 'BadgeCompletionAuditValues'
            completion: {
              __typename?: 'BadgeCompletion'
              instructor_id?: string | null
              notes?: string | null
            }
          }
        }>
      } | null
    } | null
  } | null
}

export type UpdateUserBadgesMutationVariables = Exact<{
  input: UpdateUserBadgesInput
}>

export type UpdateUserBadgesMutation = {
  __typename?: 'Mutation'
  badge?: {
    __typename?: 'BadgeMutations'
    updateUserBadges: { __typename?: 'User'; id: string }
  } | null
}

export type UpdateBadgeUsersMutationVariables = Exact<{
  input: UpdateBadgeUsersInput
}>

export type UpdateBadgeUsersMutation = {
  __typename?: 'Mutation'
  badge?: {
    __typename?: 'BadgeMutations'
    updateBadgeUsers: { __typename?: 'Badge'; id: string }
  } | null
}

export type CreateUserLocatorMutationVariables = Exact<{
  token: Scalars['String']['input']
  id: Scalars['ID']['input']
}>

export type CreateUserLocatorMutation = {
  __typename?: 'Mutation'
  createLocator?: { __typename?: 'Locator'; id: string } | null
}

export type GetStripeProductsQueryVariables = Exact<{ [key: string]: never }>

export type GetStripeProductsQuery = {
  __typename?: 'Query'
  getAvailableStripeProducts: Array<{
    __typename?: 'AvailableStripeProducts'
    name: string
    id: string
  }>
}

export type VolunteerHourDetailsFragment = {
  __typename?: 'VolunteerHour'
  id: string
  start: any
  end?: any | null
  approved: boolean
  notes?: string | null
  supervisor?: {
    __typename?: 'User'
    id: string
    name: string
    email: string
    avatar?: {
      __typename?: 'Media'
      srcset?: string | null
      url?: string | null
    } | null
  } | null
}

export type UpdateVolunteerActivationMutationVariables = Exact<{
  input: VolunteerUpdateInput
}>

export type UpdateVolunteerActivationMutation = {
  __typename?: 'Mutation'
  volunteer?: {
    __typename?: 'VolunteerMutations'
    updateVolunteer: { __typename?: 'Volunteer'; id: string; active: boolean }
  } | null
}

export type GeneralSettingsQueryVariables = Exact<{ [key: string]: never }>

export type GeneralSettingsQuery = {
  __typename?: 'Query'
  generalSettings?: {
    __typename?: 'GeneralSettings'
    site_name?: string | null
  } | null
}

export type SaveGeneralSettingsMutationVariables = Exact<{
  site_name?: InputMaybe<Scalars['String']['input']>
}>

export type SaveGeneralSettingsMutation = {
  __typename?: 'Mutation'
  saveGeneralSettings?: {
    __typename?: 'GeneralSettings'
    site_name?: string | null
  } | null
}

export type AdminSettingsQueryVariables = Exact<{ [key: string]: never }>

export type AdminSettingsQuery = {
  __typename?: 'Query'
  adminSettings?: {
    __typename?: 'AdminSettings'
    maps_api_key?: string | null
  } | null
}

export type SaveAdminSettingsMutationVariables = Exact<{
  maps_api_key?: InputMaybe<Scalars['String']['input']>
}>

export type SaveAdminSettingsMutation = {
  __typename?: 'Mutation'
  saveAdminSettings?: {
    __typename?: 'AdminSettings'
    maps_api_key?: string | null
  } | null
}

export type PaymentSettingsQueryVariables = Exact<{ [key: string]: never }>

export type PaymentSettingsQuery = {
  __typename?: 'Query'
  paymentSettings?: {
    __typename?: 'PaymentSettings'
    stripe_pk?: string | null
    stripe_sk?: string | null
  } | null
}

export type PublicPaymentSettingsQueryVariables = Exact<{
  [key: string]: never
}>

export type PublicPaymentSettingsQuery = {
  __typename?: 'Query'
  publicPaymentSettings?: {
    __typename?: 'PublicPaymentSettings'
    stripe_pk?: string | null
  } | null
}

export type SavePaymentSettingsMutationVariables = Exact<{
  stripe_sk?: InputMaybe<Scalars['String']['input']>
  stripe_pk?: InputMaybe<Scalars['String']['input']>
}>

export type SavePaymentSettingsMutation = {
  __typename?: 'Mutation'
  savePaymentSettings?: {
    __typename?: 'PaymentSettings'
    stripe_pk?: string | null
    stripe_sk?: string | null
  } | null
}

export type UserExistsQueryVariables = Exact<{
  email: Scalars['String']['input']
}>

export type UserExistsQuery = { __typename?: 'Query'; userExists: boolean }

export type PaginatorFragment = {
  __typename?: 'PaginatorInfo'
  lastPage: number
  total: number
}

export type User_CurrentFragment = {
  __typename?: 'User'
  email: string
  name: string
  id: string
  roles: Array<string>
  abilities: Array<string>
  avatar?: {
    __typename?: 'Media'
    srcset?: string | null
    url?: string | null
  } | null
}

export type LoggedInUserQueryVariables = Exact<{ [key: string]: never }>

export type LoggedInUserQuery = {
  __typename?: 'Query'
  currentUser?: {
    __typename?: 'User'
    email: string
    name: string
    id: string
    roles: Array<string>
    abilities: Array<string>
    avatar?: {
      __typename?: 'Media'
      srcset?: string | null
      url?: string | null
    } | null
    volunteer?: {
      __typename?: 'Volunteer'
      active: boolean
      current_hour?: { __typename?: 'VolunteerHour'; start: any } | null
    } | null
  } | null
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: {
    __typename?: 'User'
    email: string
    name: string
    id: string
    roles: Array<string>
    abilities: Array<string>
    avatar?: {
      __typename?: 'Media'
      srcset?: string | null
      url?: string | null
    } | null
  }
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = {
  __typename?: 'Mutation'
  logout?: { __typename?: 'User'; id: string } | null
}

export type BadgeFieldsFragment = {
  __typename?: 'Badge'
  name: string
  created_at: any
  updated_at: any
}

export type GetBadgeQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetBadgeQuery = {
  __typename?: 'Query'
  badge?: {
    __typename?: 'Badge'
    id: string
    name: string
    created_at: any
    updated_at: any
  } | null
}

export type LocatorLookupQueryVariables = Exact<{
  token: Scalars['String']['input']
  type: LocatorTypes
}>

export type LocatorLookupQuery = {
  __typename?: 'Query'
  locator?: {
    __typename?: 'Locator'
    id: string
    target: {
      __typename: 'User'
      id: string
      email: string
      name: string
      avatar?: {
        __typename?: 'Media'
        srcset?: string | null
        url?: string | null
      } | null
    }
  } | null
}

export type HelloTerminalQueryVariables = Exact<{ [key: string]: never }>

export type HelloTerminalQuery = {
  __typename?: 'Query'
  helloTerminal?: { __typename?: 'Terminal'; name?: string | null } | null
}

export type UpdateBadgeMutationVariables = Exact<{
  id: Scalars['ID']['input']
  name?: InputMaybe<Scalars['String']['input']>
}>

export type UpdateBadgeMutation = {
  __typename?: 'Mutation'
  badge?: {
    __typename?: 'BadgeMutations'
    update: {
      __typename?: 'Badge'
      id: string
      name: string
      created_at: any
      updated_at: any
    }
  } | null
}

export type CreateBadgeMutationVariables = Exact<{
  name: Scalars['String']['input']
}>

export type CreateBadgeMutation = {
  __typename?: 'Mutation'
  badge?: {
    __typename?: 'BadgeMutations'
    create: {
      __typename?: 'Badge'
      id: string
      name: string
      created_at: any
      updated_at: any
    }
  } | null
}

export type GetBadgesAdminQueryVariables = Exact<{
  page: Scalars['Int']['input']
  search?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
}>

export type GetBadgesAdminQuery = {
  __typename?: 'Query'
  badges: {
    __typename?: 'BadgePaginator'
    data: Array<{ __typename?: 'Badge'; id: string; name: string }>
    paginatorInfo: {
      __typename?: 'PaginatorInfo'
      currentPage: number
      total: number
    }
  }
}

export type CoursesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
}>

export type CoursesQuery = {
  __typename?: 'Query'
  courses: {
    __typename?: 'CoursePaginator'
    paginatorInfo: {
      __typename?: 'PaginatorInfo'
      currentPage: number
      total: number
    }
    data: Array<{ __typename?: 'Course'; id: string; name: string }>
  }
}

export type CourseQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type CourseQuery = {
  __typename?: 'Query'
  course?: {
    __typename?: 'Course'
    id: string
    name: string
    sessions: Array<{
      __typename?: 'CourseSession'
      id: string
      publish_at?: any | null
      meetings: Array<{
        __typename?: 'CourseSessionMeeting'
        id: string
        start_at?: any | null
        end_at?: any | null
      }>
    }>
  } | null
}

export type CreateOverlayMutationVariables = Exact<{
  name: Scalars['String']['input']
  type: OverlayType
  spec: Scalars['String']['input']
  upload: Scalars['Upload']['input']
}>

export type CreateOverlayMutation = {
  __typename?: 'Mutation'
  createOverlay?: {
    __typename?: 'Overlay'
    id: string
    spec: string
    name: string
    type: OverlayType
    resolved_spec: string
  } | null
}

export type OverlayQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type OverlayQuery = {
  __typename?: 'Query'
  overlay?: {
    __typename?: 'Overlay'
    id: string
    resolved_spec: string
    name: string
    type: OverlayType
  } | null
}

export type UpdateOverlayMutationVariables = Exact<{
  id: Scalars['ID']['input']
  name?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<OverlayType>
  spec?: InputMaybe<Scalars['String']['input']>
  upload?: InputMaybe<Scalars['Upload']['input']>
}>

export type UpdateOverlayMutation = {
  __typename?: 'Mutation'
  updateOverlay?: {
    __typename?: 'Overlay'
    id: string
    name: string
    type: OverlayType
    resolved_spec: string
    spec: string
  } | null
}

export type OverlaysQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
}>

export type OverlaysQuery = {
  __typename?: 'Query'
  overlays: {
    __typename?: 'OverlayPaginator'
    paginatorInfo: {
      __typename?: 'PaginatorInfo'
      currentPage: number
      total: number
    }
    data: Array<{
      __typename?: 'Overlay'
      id: string
      name: string
      type: OverlayType
    }>
  }
}

export type CreatePlanMutationVariables = Exact<{
  name: Scalars['String']['input']
  public: Scalars['Boolean']['input']
}>

export type CreatePlanMutation = {
  __typename?: 'Mutation'
  createPlan: { __typename?: 'Plan'; id: string }
}

export type UpdatePlanMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>
  public?: InputMaybe<Scalars['Boolean']['input']>
  id: Scalars['ID']['input']
}>

export type UpdatePlanMutation = {
  __typename?: 'Mutation'
  updatePlan: { __typename?: 'Plan'; id: string; name: string; public: boolean }
}

export type GetPlanEditQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetPlanEditQuery = {
  __typename?: 'Query'
  plan?: {
    __typename?: 'Plan'
    id: string
    name: string
    public: boolean
  } | null
}

export type PlansQueryVariables = Exact<{
  page: Scalars['Int']['input']
}>

export type PlansQuery = {
  __typename?: 'Query'
  plans: {
    __typename?: 'PlanPaginator'
    paginatorInfo: {
      __typename?: 'PaginatorInfo'
      count: number
      total: number
      lastPage: number
    }
    data: Array<{ __typename?: 'Plan'; id: string; name: string }>
  }
}

export type StripeDataFragmentFragment = {
  __typename?: 'Plan'
  stripe_id?: string | null
  stripe_data?: {
    __typename?: 'StripeProductData'
    livemode?: boolean | null
    name?: string | null
    prices?: Array<{
      __typename?: 'StripeProductPriceData'
      id: string
      currency: string
      unit_amount: number
      nickname?: string | null
      recurring?: {
        __typename?: 'StripePriceRecurringData'
        interval: string
        interval_count: number
      } | null
    }> | null
  } | null
}

export type GetPlanQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetPlanQuery = {
  __typename?: 'Query'
  plan?: {
    __typename?: 'Plan'
    id: string
    name: string
    public: boolean
    stripe_id?: string | null
    features?: Array<{
      __typename?: 'Feature'
      id: string
      name: string
      type: FeatureType
      slug?: string | null
      parameters?: {
        __typename?: 'FeatureParameters'
        amount?: number | null
      } | null
    }> | null
    stripe_data?: {
      __typename?: 'StripeProductData'
      livemode?: boolean | null
      name?: string | null
      prices?: Array<{
        __typename?: 'StripeProductPriceData'
        id: string
        currency: string
        unit_amount: number
        nickname?: string | null
        recurring?: {
          __typename?: 'StripePriceRecurringData'
          interval: string
          interval_count: number
        } | null
      }> | null
    } | null
  } | null
}

export type UpdatePlanStripeIdMutationVariables = Exact<{
  id: Scalars['ID']['input']
  stripe_id?: InputMaybe<Scalars['String']['input']>
}>

export type UpdatePlanStripeIdMutation = {
  __typename?: 'Mutation'
  updatePlan: {
    __typename?: 'Plan'
    id: string
    stripe_id?: string | null
    stripe_data?: {
      __typename?: 'StripeProductData'
      livemode?: boolean | null
      name?: string | null
      prices?: Array<{
        __typename?: 'StripeProductPriceData'
        id: string
        currency: string
        unit_amount: number
        nickname?: string | null
        recurring?: {
          __typename?: 'StripePriceRecurringData'
          interval: string
          interval_count: number
        } | null
      }> | null
    } | null
  }
}

export type TerminalsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
}>

export type TerminalsQuery = {
  __typename?: 'Query'
  terminals: {
    __typename?: 'TerminalPaginator'
    paginatorInfo: {
      __typename?: 'PaginatorInfo'
      currentPage: number
      total: number
    }
    data: Array<{
      __typename?: 'Terminal'
      id: string
      name?: string | null
      tokens?: Array<{
        __typename?: 'Token'
        name: string
        last_used_at?: any | null
      } | null> | null
    }>
  }
}

export type RevokeTerminalMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type RevokeTerminalMutation = {
  __typename?: 'Mutation'
  revokeTerminal?: { __typename?: 'Terminal'; id: string } | null
}

export type RegisterTerminalMutationVariables = Exact<{
  name: Scalars['String']['input']
  slug: Scalars['String']['input']
}>

export type RegisterTerminalMutation = {
  __typename?: 'Mutation'
  registerTerminal?: {
    __typename?: 'Terminal'
    id: string
    name?: string | null
  } | null
}

export type VolunteerCalendarQueryVariables = Exact<{
  id: Scalars['ID']['input']
  page: Scalars['Int']['input']
  first: Scalars['Int']['input']
  orderBy?: InputMaybe<
    | Array<VolunteerHoursOrderByOrderByClause>
    | VolunteerHoursOrderByOrderByClause
  >
  range?: InputMaybe<VolunteerHoursRangeInput>
  scope?: InputMaybe<VolunteerHoursScopesInput>
}>

export type VolunteerCalendarQuery = {
  __typename?: 'Query'
  volunteer?: {
    __typename?: 'Volunteer'
    id: string
    hours: {
      __typename?: 'VolunteerHourPaginator'
      paginatorInfo: {
        __typename?: 'PaginatorInfo'
        lastPage: number
        total: number
      }
      data: Array<{
        __typename?: 'VolunteerHour'
        id: string
        start: any
        end?: any | null
        length?: number | null
        approved: boolean
        supervisor?: {
          __typename?: 'User'
          id: string
          name: string
          email: string
          avatar?: {
            __typename?: 'Media'
            srcset?: string | null
            url?: string | null
          } | null
        } | null
      }>
    }
  } | null
}

export type VolunteersQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>
  scope?: InputMaybe<VolunteerScopesInput>
  page?: InputMaybe<Scalars['Int']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
}>

export type VolunteersQuery = {
  __typename?: 'Query'
  users: {
    __typename?: 'UserPaginator'
    paginatorInfo: {
      __typename?: 'PaginatorInfo'
      currentPage: number
      total: number
    }
    data: Array<{
      __typename?: 'User'
      id: string
      roles: Array<string>
      name: string
      email: string
      volunteer?: {
        __typename?: 'Volunteer'
        active: boolean
        created_at: any
        hour_tenths_available: number
        hour_tenths_redeemed: number
      } | null
      avatar?: {
        __typename?: 'Media'
        srcset?: string | null
        url?: string | null
      } | null
    }>
  }
}

export type PunchedInVolunteerCountQueryVariables = Exact<{
  [key: string]: never
}>

export type PunchedInVolunteerCountQuery = {
  __typename?: 'Query'
  punchedInVolunteers: number
}

export type ToggleVolunteerMutationVariables = Exact<{
  id: Scalars['ID']['input']
  active: Scalars['Boolean']['input']
}>

export type ToggleVolunteerMutation = {
  __typename?: 'Mutation'
  volunteer?: {
    __typename?: 'VolunteerMutations'
    updateVolunteer: { __typename?: 'Volunteer'; id: string; active: boolean }
  } | null
}

export type VolunteerViewQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type VolunteerViewQuery = {
  __typename?: 'Query'
  volunteer?: {
    __typename?: 'Volunteer'
    id: string
    user?: {
      __typename?: 'User'
      id: string
      name: string
      email: string
      avatar?: {
        __typename?: 'Media'
        srcset?: string | null
        url?: string | null
      } | null
    } | null
  } | null
}

export type VolunteerUnapprovedQueryVariables = Exact<{
  id: Scalars['ID']['input']
  page: Scalars['Int']['input']
  first: Scalars['Int']['input']
  orderBy?: InputMaybe<
    | Array<VolunteerHoursOrderByOrderByClause>
    | VolunteerHoursOrderByOrderByClause
  >
}>

export type VolunteerUnapprovedQuery = {
  __typename?: 'Query'
  volunteer?: {
    __typename?: 'Volunteer'
    id: string
    hours: {
      __typename?: 'VolunteerHourPaginator'
      paginatorInfo: {
        __typename?: 'PaginatorInfo'
        lastPage: number
        total: number
      }
      data: Array<{
        __typename?: 'VolunteerHour'
        id: string
        start: any
        end?: any | null
        length?: number | null
        approved: boolean
        supervisor?: {
          __typename?: 'User'
          id: string
          name: string
          email: string
          avatar?: {
            __typename?: 'Media'
            srcset?: string | null
            url?: string | null
          } | null
        } | null
      }>
    }
  } | null
}

export type VolunteerHoursQueryVariables = Exact<{
  id: Scalars['ID']['input']
  page: Scalars['Int']['input']
  first: Scalars['Int']['input']
  orderBy?: InputMaybe<
    | Array<VolunteerHoursOrderByOrderByClause>
    | VolunteerHoursOrderByOrderByClause
  >
  scope?: InputMaybe<VolunteerHoursScopesInput>
  range?: InputMaybe<VolunteerHoursRangeInput>
}>

export type VolunteerHoursQuery = {
  __typename?: 'Query'
  volunteer?: {
    __typename?: 'Volunteer'
    id: string
    hours: {
      __typename?: 'VolunteerHourPaginator'
      paginatorInfo: {
        __typename?: 'PaginatorInfo'
        lastPage: number
        total: number
      }
      data: Array<{
        __typename?: 'VolunteerHour'
        id: string
        start: any
        end?: any | null
        length?: number | null
        approved: boolean
        notes?: string | null
        supervisor?: {
          __typename?: 'User'
          id: string
          name: string
          email: string
          avatar?: {
            __typename?: 'Media'
            srcset?: string | null
            url?: string | null
          } | null
        } | null
      }>
    }
  } | null
}

export type GetBadgesQueryVariables = Exact<{
  page: Scalars['Int']['input']
  search?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
}>

export type GetBadgesQuery = {
  __typename?: 'Query'
  badges: {
    __typename?: 'BadgePaginator'
    data: Array<{ __typename?: 'Badge'; id: string; name: string }>
    paginatorInfo: {
      __typename?: 'PaginatorInfo'
      currentPage: number
      total: number
    }
  }
}

export type GetBadgeUsersQueryVariables = Exact<{
  id: Scalars['ID']['input']
  page: Scalars['Int']['input']
  search?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
}>

export type GetBadgeUsersQuery = {
  __typename?: 'Query'
  badge?: {
    __typename?: 'Badge'
    id: string
    name: string
    users: {
      __typename?: 'UserPaginator'
      data: Array<{
        __typename?: 'User'
        id: string
        name: string
        email: string
        completion: {
          __typename?: 'BadgeCompletion'
          created_at: any
          notes?: string | null
          instructor?: {
            __typename?: 'User'
            id: string
            name: string
            email: string
            avatar?: {
              __typename?: 'Media'
              srcset?: string | null
              url?: string | null
            } | null
          } | null
        }
        avatar?: {
          __typename?: 'Media'
          srcset?: string | null
          url?: string | null
        } | null
      }>
      paginatorInfo: {
        __typename?: 'PaginatorInfo'
        currentPage: number
        total: number
      }
    }
  } | null
}

export type ActivateTerminalMutationVariables = Exact<{
  slug: Scalars['String']['input']
}>

export type ActivateTerminalMutation = {
  __typename?: 'Mutation'
  activateTerminal?: {
    __typename?: 'Token'
    plainTextToken?: string | null
  } | null
}

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String']['input']
  name: Scalars['String']['input']
  preferred_name?: InputMaybe<Scalars['String']['input']>
  phones: Array<PhonesInput> | PhonesInput
  address: AddressInput
}>

export type CreateUserMutation = {
  __typename?: 'Mutation'
  createUser: {
    __typename?: 'User'
    id: string
    email: string
    name: string
    preferred_name?: string | null
    phones: Array<{ __typename?: 'Phones'; number: string; type: string }>
    address?: {
      __typename?: 'Address'
      line1: string
      line2?: string | null
      city: string
      state: string
      postal_code: string
    } | null
  }
}

export type GetUsersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>
  q?: InputMaybe<Scalars['String']['input']>
}>

export type GetUsersQuery = {
  __typename?: 'Query'
  users: {
    __typename?: 'UserPaginator'
    paginatorInfo: {
      __typename?: 'PaginatorInfo'
      lastPage: number
      total: number
    }
    data: Array<{
      __typename?: 'User'
      id: string
      name: string
      email: string
      avatar?: {
        __typename?: 'Media'
        srcset?: string | null
        url?: string | null
      } | null
    }>
  }
}

export type UserViewQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>
  email?: InputMaybe<Scalars['String']['input']>
}>

export type UserViewQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    email: string
    name: string
    id: string
    subscription?: {
      __typename?: 'CashierSubscription'
      id: string
      stripe_status?: StripeSubscriptionStatus | null
    } | null
    avatar?: {
      __typename?: 'Media'
      srcset?: string | null
      url?: string | null
    } | null
  } | null
}

export type UserBadgesQueryVariables = Exact<{
  id: Scalars['ID']['input']
  page: Scalars['Int']['input']
  search?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
}>

export type UserBadgesQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    badges: {
      __typename?: 'UserBadgePaginator'
      data: Array<{
        __typename?: 'UserBadge'
        id: string
        name: string
        completion?: {
          __typename?: 'BadgeCompletion'
          id: string
          revoked: boolean
          created_at: any
          notes?: string | null
          instructor_id?: string | null
          instructor?: {
            __typename?: 'User'
            id: string
            name: string
            email: string
            avatar?: {
              __typename?: 'Media'
              srcset?: string | null
              url?: string | null
            } | null
          } | null
        } | null
      }>
      paginatorInfo: {
        __typename?: 'PaginatorInfo'
        currentPage: number
        total: number
      }
    }
  } | null
}

export type UserInvoicesQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type UserInvoicesQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    invoices?: Array<{
      __typename?: 'StripeInvoice'
      id: string
      number?: string | null
      status?: StripeInvoiceStatus | null
      amount_remaining: number
      currency?: string | null
    } | null> | null
  } | null
}

export type UserMembershipQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type UserMembershipQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    subscription?: {
      __typename?: 'CashierSubscription'
      stripe_status?: StripeSubscriptionStatus | null
    } | null
  } | null
}

export type PriceTreeQueryVariables = Exact<{ [key: string]: never }>

export type PriceTreeQuery = {
  __typename?: 'Query'
  plans: {
    __typename?: 'PlanPaginator'
    data: Array<{
      __typename?: 'Plan'
      id: string
      name: string
      stripe_data?: {
        __typename?: 'StripeProductData'
        id?: string | null
        name?: string | null
        prices?: Array<{
          __typename?: 'StripeProductPriceData'
          id: string
          nickname?: string | null
          unit_amount: number
          currency: string
          recurring?: {
            __typename?: 'StripePriceRecurringData'
            interval: string
            interval_count: number
          } | null
        }> | null
      } | null
    }>
  }
}

export type UploadAvatarMutationVariables = Exact<{
  id: Scalars['ID']['input']
  avatar?: InputMaybe<Scalars['Upload']['input']>
}>

export type UploadAvatarMutation = {
  __typename?: 'Mutation'
  updateUser: {
    __typename?: 'User'
    id: string
    avatar?: { __typename?: 'Media'; url?: string | null } | null
  }
}

export type UserProfileQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>
}>

export type UserProfileQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    email: string
    email_verified_at?: any | null
    name: string
    preferred_name?: string | null
    address?: {
      __typename?: 'Address'
      line1: string
      line2?: string | null
      city: string
      state: string
      postal_code: string
    } | null
  } | null
}

export const VolunteerHeaderBadgeFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'VolunteerHeaderBadge' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volunteer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'current_hour' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'start' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VolunteerHeaderBadgeFragment, unknown>
export const UserImageFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserImageFragment, unknown>
export const UserCardFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserCard' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'UserImage' },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserCardFragment, unknown>
export const UserItemFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'UserImage' },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserItemFragment, unknown>
export const VolunteerHourDetailsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'VolunteerHourDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'VolunteerHour' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end' } },
          { kind: 'Field', name: { kind: 'Name', value: 'approved' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'supervisor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'UserItem' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'notes' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'UserImage' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VolunteerHourDetailsFragment, unknown>
export const PaginatorFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Paginator' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PaginatorInfo' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'lastPage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaginatorFragment, unknown>
export const User_CurrentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'User_current' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'roles' } },
          { kind: 'Field', name: { kind: 'Name', value: 'abilities' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<User_CurrentFragment, unknown>
export const BadgeFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'badgeFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Badge' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BadgeFieldsFragment, unknown>
export const StripeDataFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'StripeDataFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Plan' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'stripe_id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stripe_data' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'livemode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'prices' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currency' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'unit_amount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'nickname' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'recurring' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'interval' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'interval_count' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StripeDataFragmentFragment, unknown>
export const GlobalSearchDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GlobalSearch' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'q' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'search' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'q' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'q' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'IntValue', value: '10' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'User' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'email' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'avatar' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'srcset' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'url' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'Badge' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GlobalSearchQuery, GlobalSearchQueryVariables>
export const GetFeaturesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetFeatures' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getFeatures' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetFeaturesQuery, GetFeaturesQueryVariables>
export const AttachFeatureDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AttachFeature' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'planId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'featureId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'amount' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updatePlan' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'planId' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'features' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'connect' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: 'id' },
                                      value: {
                                        kind: 'Variable',
                                        name: {
                                          kind: 'Name',
                                          value: 'featureId',
                                        },
                                      },
                                    },
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: 'amount' },
                                      value: {
                                        kind: 'Variable',
                                        name: { kind: 'Name', value: 'amount' },
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'features' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'parameters' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AttachFeatureMutation,
  AttachFeatureMutationVariables
>
export const UpdateFeatureParamDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateFeatureParam' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'planId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'featureId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'amount' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updatePlan' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'planId' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'features' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: {
                              kind: 'Name',
                              value: 'syncWithoutDetaching',
                            },
                            value: {
                              kind: 'ListValue',
                              values: [
                                {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: 'id' },
                                      value: {
                                        kind: 'Variable',
                                        name: {
                                          kind: 'Name',
                                          value: 'featureId',
                                        },
                                      },
                                    },
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: 'amount' },
                                      value: {
                                        kind: 'Variable',
                                        name: { kind: 'Name', value: 'amount' },
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'features' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'parameters' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateFeatureParamMutation,
  UpdateFeatureParamMutationVariables
>
export const DetachFeatureDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DetachFeature' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'plan_id' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'feature_id' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updatePlan' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'plan_id' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'features' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'disconnect' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'feature_id' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'features' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'parameters' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DetachFeatureMutation,
  DetachFeatureMutationVariables
>
export const CreateFeatureDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateFeature' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'FeatureType' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createFeature' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'name' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'type' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateFeatureMutation,
  CreateFeatureMutationVariables
>
export const LoginTerminalUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'LoginTerminalUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'loginTerminalUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'email' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'password' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'password' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'terminal_pincode' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  LoginTerminalUserMutation,
  LoginTerminalUserMutationVariables
>
export const LogoutTerminalUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'LogoutTerminalUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'logoutTerminalUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  LogoutTerminalUserMutation,
  LogoutTerminalUserMutationVariables
>
export const UserItemDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UserItem' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'UserItem' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'UserImage' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserItemQuery, UserItemQueryVariables>
export const SelectUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SelectUsers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'search' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'SearchUsersInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'IntValue', value: '24' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'scope' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'search' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'search' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paginatorInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastPage' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'UserItem' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'UserImage' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SelectUsersQuery, SelectUsersQueryVariables>
export const UserBadgeDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UserBadgeDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'user_id' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'badge_id' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'user_id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'badge' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'badge_id' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'completion' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'revoked' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'created_at' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updated_at' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'notes' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'instructor' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'UserItem' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'audits' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'event' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'created_at' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'user' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'FragmentSpread',
                                          name: {
                                            kind: 'Name',
                                            value: 'UserItem',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'new_values' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'completion',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'instructor_id',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'notes',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'UserImage' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UserBadgeDetailsQuery,
  UserBadgeDetailsQueryVariables
>
export const UpdateUserBadgesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateUserBadges' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateUserBadgesInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'badge' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'updateUserBadges' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'input' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'input' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateUserBadgesMutation,
  UpdateUserBadgesMutationVariables
>
export const UpdateBadgeUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateBadgeUsers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateBadgeUsersInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'badge' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'updateBadgeUsers' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'input' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'input' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateBadgeUsersMutation,
  UpdateBadgeUsersMutationVariables
>
export const CreateUserLocatorDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateUserLocator' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'token' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createLocator' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'token' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'token' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: { kind: 'EnumValue', value: 'RFID' },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'target' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'connect' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'id' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                },
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'type' },
                                  value: { kind: 'EnumValue', value: 'USER' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateUserLocatorMutation,
  CreateUserLocatorMutationVariables
>
export const GetStripeProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetStripeProducts' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAvailableStripeProducts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetStripeProductsQuery,
  GetStripeProductsQueryVariables
>
export const UpdateVolunteerActivationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateVolunteerActivation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'VolunteerUpdateInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volunteer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'updateVolunteer' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'input' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'input' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'active' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateVolunteerActivationMutation,
  UpdateVolunteerActivationMutationVariables
>
export const GeneralSettingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GeneralSettings' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'generalSettings' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'site_name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GeneralSettingsQuery,
  GeneralSettingsQueryVariables
>
export const SaveGeneralSettingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SaveGeneralSettings' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'site_name' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'saveGeneralSettings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'settings' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'site_name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'site_name' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'site_name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SaveGeneralSettingsMutation,
  SaveGeneralSettingsMutationVariables
>
export const AdminSettingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminSettings' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'adminSettings' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'maps_api_key' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminSettingsQuery, AdminSettingsQueryVariables>
export const SaveAdminSettingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SaveAdminSettings' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'maps_api_key' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'saveAdminSettings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'settings' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'maps_api_key' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'maps_api_key' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'maps_api_key' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SaveAdminSettingsMutation,
  SaveAdminSettingsMutationVariables
>
export const PaymentSettingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'PaymentSettings' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentSettings' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'stripe_pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'stripe_sk' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PaymentSettingsQuery,
  PaymentSettingsQueryVariables
>
export const PublicPaymentSettingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'PublicPaymentSettings' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'publicPaymentSettings' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'stripe_pk' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PublicPaymentSettingsQuery,
  PublicPaymentSettingsQueryVariables
>
export const SavePaymentSettingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SavePaymentSettings' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'stripe_sk' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'stripe_pk' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'savePaymentSettings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'settings' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'stripe_sk' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'stripe_sk' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'stripe_pk' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'stripe_pk' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'stripe_pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'stripe_sk' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SavePaymentSettingsMutation,
  SavePaymentSettingsMutationVariables
>
export const UserExistsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UserExists' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userExists' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserExistsQuery, UserExistsQueryVariables>
export const LoggedInUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'LoggedInUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'roles' } },
                { kind: 'Field', name: { kind: 'Name', value: 'abilities' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'avatar' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'srcset' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                    ],
                  },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'VolunteerHeaderBadge' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'VolunteerHeaderBadge' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volunteer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'current_hour' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'start' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoggedInUserQuery, LoggedInUserQueryVariables>
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'password' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'User_current' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'User_current' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'roles' } },
          { kind: 'Field', name: { kind: 'Name', value: 'abilities' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>
export const LogoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Logout' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'logout' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>
export const GetBadgeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBadge' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'badge' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'badgeFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'badgeFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Badge' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetBadgeQuery, GetBadgeQueryVariables>
export const LocatorLookupDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'LocatorLookup' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'token' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'LocatorTypes' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'locator' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'token' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'token' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'type' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'target' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'User' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'email' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'avatar' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'srcset' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'url' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: '__typename' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LocatorLookupQuery, LocatorLookupQueryVariables>
export const HelloTerminalDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'HelloTerminal' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'helloTerminal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<HelloTerminalQuery, HelloTerminalQueryVariables>
export const UpdateBadgeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateBadge' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'badge' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'update' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'input' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'name' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'name' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'badgeFields' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'badgeFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Badge' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateBadgeMutation, UpdateBadgeMutationVariables>
export const CreateBadgeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateBadge' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'badge' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'create' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'input' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'name' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'name' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'badgeFields' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'badgeFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Badge' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateBadgeMutation, CreateBadgeMutationVariables>
export const GetBadgesAdminDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBadgesAdmin' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'search' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '25' },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'badges' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'search' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'search' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'first' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paginatorInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currentPage' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetBadgesAdminQuery, GetBadgesAdminQueryVariables>
export const CoursesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Courses' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'search' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '25' },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'courses' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'first' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'search' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'search' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paginatorInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currentPage' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CoursesQuery, CoursesQueryVariables>
export const CourseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Course' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'course' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sessions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'publish_at' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'meetings' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'start_at' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'end_at' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CourseQuery, CourseQueryVariables>
export const CreateOverlayDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateOverlay' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'OverlayType' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'spec' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'upload' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'Upload' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createOverlay' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'name' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'type' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'spec' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'spec' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'upload' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'upload' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'spec' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'resolved_spec' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateOverlayMutation,
  CreateOverlayMutationVariables
>
export const OverlayDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Overlay' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'overlay' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'resolved_spec' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OverlayQuery, OverlayQueryVariables>
export const UpdateOverlayDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateOverlay' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'OverlayType' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'spec' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'upload' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateOverlay' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'name' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'type' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'spec' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'spec' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'upload' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'upload' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'resolved_spec' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'spec' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateOverlayMutation,
  UpdateOverlayMutationVariables
>
export const OverlaysDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Overlays' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'search' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '25' },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'overlays' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'first' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'search' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'search' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paginatorInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currentPage' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OverlaysQuery, OverlaysQueryVariables>
export const CreatePlanDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreatePlan' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'public' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'Boolean' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createPlan' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'name' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'public' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'public' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreatePlanMutation, CreatePlanMutationVariables>
export const UpdatePlanDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdatePlan' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'public' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updatePlan' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'name' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'public' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'public' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'public' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdatePlanMutation, UpdatePlanMutationVariables>
export const GetPlanEditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPlanEdit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'plan' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'public' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPlanEditQuery, GetPlanEditQueryVariables>
export const PlansDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Plans' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'plans' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paginatorInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastPage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PlansQuery, PlansQueryVariables>
export const GetPlanDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPlan' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'plan' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'public' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'StripeDataFragment' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'features' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'parameters' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'StripeDataFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Plan' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'stripe_id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stripe_data' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'livemode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'prices' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currency' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'unit_amount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'nickname' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'recurring' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'interval' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'interval_count' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPlanQuery, GetPlanQueryVariables>
export const UpdatePlanStripeIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdatePlanStripeId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'stripe_id' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updatePlan' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'stripe_id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'stripe_id' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'StripeDataFragment' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'StripeDataFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Plan' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'stripe_id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stripe_data' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'livemode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'prices' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currency' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'unit_amount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'nickname' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'recurring' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'interval' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'interval_count' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdatePlanStripeIdMutation,
  UpdatePlanStripeIdMutationVariables
>
export const TerminalsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Terminals' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'search' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '25' },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'terminals' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'first' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'search' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'search' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paginatorInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currentPage' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'tokens' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'last_used_at' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TerminalsQuery, TerminalsQueryVariables>
export const RevokeTerminalDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RevokeTerminal' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'revokeTerminal' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RevokeTerminalMutation,
  RevokeTerminalMutationVariables
>
export const RegisterTerminalDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RegisterTerminal' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'registerTerminal' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'name' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'slug' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'slug' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RegisterTerminalMutation,
  RegisterTerminalMutationVariables
>
export const VolunteerCalendarDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'VolunteerCalendar' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'VolunteerHoursOrderByOrderByClause',
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'range' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'VolunteerHoursRangeInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'scope' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'VolunteerHoursScopesInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volunteer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hours' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'page' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'page' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'scope' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'scope' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'range' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'range' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'orderBy' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'orderBy' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'paginatorInfo' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'Paginator' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'data' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'start' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'end' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'length' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'approved' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'supervisor' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'UserItem' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Paginator' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PaginatorInfo' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'lastPage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'UserImage' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  VolunteerCalendarQuery,
  VolunteerCalendarQueryVariables
>
export const VolunteersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Volunteers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'search' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'scope' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'VolunteerScopesInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '25' },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'first' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'search' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'search' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'scope' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'volunteer' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'scope' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paginatorInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currentPage' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'UserItem' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'roles' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'volunteer' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'active' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'created_at' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'hour_tenths_available',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'hour_tenths_redeemed',
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'UserImage' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VolunteersQuery, VolunteersQueryVariables>
export const PunchedInVolunteerCountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'PunchedInVolunteerCount' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'punchedInVolunteers' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PunchedInVolunteerCountQuery,
  PunchedInVolunteerCountQueryVariables
>
export const ToggleVolunteerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ToggleVolunteer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'active' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'Boolean' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volunteer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'updateVolunteer' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'input' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'id' },
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'active' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'active' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'active' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ToggleVolunteerMutation,
  ToggleVolunteerMutationVariables
>
export const VolunteerViewDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'VolunteerView' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volunteer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'UserImage' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VolunteerViewQuery, VolunteerViewQueryVariables>
export const VolunteerUnapprovedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'VolunteerUnapproved' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'VolunteerHoursOrderByOrderByClause',
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volunteer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hours' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'page' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'page' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'orderBy' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'orderBy' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'scope' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'approved' },
                            value: { kind: 'BooleanValue', value: false },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'paginatorInfo' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'Paginator' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'data' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'start' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'end' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'length' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'approved' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'supervisor' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'UserItem' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Paginator' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PaginatorInfo' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'lastPage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'UserImage' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  VolunteerUnapprovedQuery,
  VolunteerUnapprovedQueryVariables
>
export const VolunteerHoursDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'VolunteerHours' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'VolunteerHoursOrderByOrderByClause',
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'scope' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'VolunteerHoursScopesInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'range' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'VolunteerHoursRangeInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'volunteer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hours' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'page' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'page' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'scope' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'scope' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'range' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'range' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'orderBy' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'orderBy' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'paginatorInfo' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'Paginator' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'data' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'start' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'end' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'length' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'approved' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'supervisor' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'UserItem' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'VolunteerHourDetails',
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'UserImage' },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Paginator' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PaginatorInfo' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'lastPage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'VolunteerHourDetails' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'VolunteerHour' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'start' } },
          { kind: 'Field', name: { kind: 'Name', value: 'end' } },
          { kind: 'Field', name: { kind: 'Name', value: 'approved' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'supervisor' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'UserItem' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'notes' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VolunteerHoursQuery, VolunteerHoursQueryVariables>
export const GetBadgesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBadges' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'search' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '25' },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'badges' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'search' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'search' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'first' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paginatorInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currentPage' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetBadgesQuery, GetBadgesQueryVariables>
export const GetBadgeUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBadgeUsers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'search' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '25' },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'badge' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'users' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'q' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'search' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'page' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'page' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'data' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'UserItem' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'completion' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'created_at' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'notes' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'instructor' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'FragmentSpread',
                                          name: {
                                            kind: 'Name',
                                            value: 'UserItem',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'paginatorInfo' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'currentPage' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'total' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'UserImage' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetBadgeUsersQuery, GetBadgeUsersQueryVariables>
export const ActivateTerminalDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ActivateTerminal' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'activateTerminal' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'slug' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'plainTextToken' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ActivateTerminalMutation,
  ActivateTerminalMutationVariables
>
export const CreateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'preferred_name' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'phones' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'PhonesInput' },
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'address' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AddressInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'email' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'name' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'preferred_name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'preferred_name' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'phones' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'phones' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'address' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'address' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'preferred_name' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'phones' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'number' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'line1' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'line2' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'postal_code' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>
export const GetUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUsers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'q' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'IntValue', value: '24' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'search' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'q' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paginatorInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastPage' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'UserCard' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserCard' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'UserImage' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>
export const UserViewDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UserView' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subscription' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'stripe_status' },
                      },
                    ],
                  },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'UserImage' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserViewQuery, UserViewQueryVariables>
export const UserBadgesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UserBadges' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'search' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '25' },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'badges' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'q' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'search' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'page' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'page' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'first' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'data' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'completion' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'revoked' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'created_at' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'notes' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'instructor_id',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'instructor' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'FragmentSpread',
                                          name: {
                                            kind: 'Name',
                                            value: 'UserItem',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'paginatorInfo' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'currentPage' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'total' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avatar' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'srcset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserItem' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'UserImage' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserBadgesQuery, UserBadgesQueryVariables>
export const UserInvoicesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UserInvoices' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'invoices' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'number' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'amount_remaining' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currency' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserInvoicesQuery, UserInvoicesQueryVariables>
export const UserMembershipDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UserMembership' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subscription' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'stripe_status' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserMembershipQuery, UserMembershipQueryVariables>
export const PriceTreeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'PriceTree' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'plans' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'stripe_data' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'prices' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'nickname' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'unit_amount',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'currency' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'recurring' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'interval',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'interval_count',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PriceTreeQuery, PriceTreeQueryVariables>
export const UploadAvatarDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UploadAvatar' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'avatar' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'avatar' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'avatar' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'avatar' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UploadAvatarMutation,
  UploadAvatarMutationVariables
>
export const UserProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UserProfile' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'email_verified_at' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'preferred_name' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'line1' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'line2' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'postal_code' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserProfileQuery, UserProfileQueryVariables>
