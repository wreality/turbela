import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
  Date: any;
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: any;
  DateTimeTz: any;
  Upload: any;
};

export type Ability = {
  __typename?: 'Ability';
  name: Scalars['String'];
  title: Scalars['String'];
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  line1: Scalars['String'];
  line2?: Maybe<Scalars['String']>;
  postal_code: Scalars['String'];
  state: Scalars['String'];
};

export type AddressInput = {
  city: Scalars['String'];
  line1: Scalars['String'];
  line2?: InputMaybe<Scalars['String']>;
  postal_code: Scalars['String'];
  state: Scalars['String'];
};

export type AdminSettings = {
  __typename?: 'AdminSettings';
  maps_api_key?: Maybe<Scalars['String']>;
};

export type AdminSettingsInput = {
  maps_api_key?: InputMaybe<Scalars['String']>;
};

export type AvailableStripeProducts = {
  __typename?: 'AvailableStripeProducts';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Badge = {
  __typename?: 'Badge';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

/** A paginated list of Badge items. */
export type BadgePaginator = {
  __typename?: 'BadgePaginator';
  /** A list of Badge items. */
  data: Array<Badge>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type CashierSubscription = {
  __typename?: 'CashierSubscription';
  created_at?: Maybe<Scalars['DateTime']>;
  ends_at?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  items?: Maybe<Array<Maybe<CashierSubscriptionItem>>>;
  name?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  stripe_id: Scalars['String'];
  stripe_price: Scalars['String'];
  stripe_status?: Maybe<StripeSubscriptionStatus>;
  trial_ends_at?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  user_id: Scalars['ID'];
};

export type CashierSubscriptionItem = {
  __typename?: 'CashierSubscriptionItem';
  created_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  quantity?: Maybe<Scalars['Int']>;
  stripe_id?: Maybe<Scalars['String']>;
  stripe_price?: Maybe<Scalars['String']>;
  stripe_product?: Maybe<Scalars['String']>;
  subscription_id: Scalars['ID'];
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type ConnectLocatorTarget = {
  id: Scalars['ID'];
  type: LocatorTargetTypes;
};

export type CreateBadgeInput = {
  name: Scalars['String'];
};

export type CreateFeature = {
  name: Scalars['String'];
  type?: InputMaybe<FeatureType>;
};

export type CreateLocatorInput = {
  target: CreateLocatorTarget;
  token: Scalars['String'];
  type: LocatorTypes;
};

export type CreateLocatorTarget = {
  connect?: InputMaybe<ConnectLocatorTarget>;
};

export type CreateOverlayInput = {
  name: Scalars['String'];
  spec: Scalars['String'];
  type: OverlayType;
  upload: Scalars['Upload'];
};

export type CreatePlan = {
  name: Scalars['String'];
  public?: InputMaybe<Scalars['Boolean']>;
};

export type CreateUser = {
  address: AddressInput;
  email: Scalars['String'];
  name: Scalars['String'];
  phones: Array<PhonesInput>;
  preferred_name?: InputMaybe<Scalars['String']>;
};

export type Feature = {
  __typename?: 'Feature';
  id: Scalars['ID'];
  name: Scalars['String'];
  parameters?: Maybe<FeatureParameters>;
  slug?: Maybe<Scalars['String']>;
  type: FeatureType;
};

export type FeatureParameters = {
  __typename?: 'FeatureParameters';
  amount?: Maybe<Scalars['Int']>;
};

export const FeatureType = {
  Grant: 'GRANT',
  Limit: 'LIMIT',
  Track: 'TRACK'
} as const;

export type FeatureType = typeof FeatureType[keyof typeof FeatureType];
export type GeneralSettings = {
  __typename?: 'GeneralSettings';
  site_name?: Maybe<Scalars['String']>;
};

export type GeneralSettingsInput = {
  site_name?: InputMaybe<Scalars['String']>;
};

export type Locator = {
  __typename?: 'Locator';
  active?: Maybe<Scalars['Boolean']>;
  created?: Maybe<Scalars['DateTimeTz']>;
  id: Scalars['ID'];
  last_seen?: Maybe<Scalars['DateTimeTz']>;
  target: LocatorTarget;
  token: Scalars['String'];
  type?: Maybe<LocatorTypes>;
  updated?: Maybe<Scalars['DateTimeTz']>;
};

export type LocatorTarget = User;

export const LocatorTargetTypes = {
  User: 'USER'
} as const;

export type LocatorTargetTypes = typeof LocatorTargetTypes[keyof typeof LocatorTargetTypes];
export const LocatorTypes = {
  Barcode: 'BARCODE',
  Rfid: 'RFID'
} as const;

export type LocatorTypes = typeof LocatorTypes[keyof typeof LocatorTypes];
export type LoginTerminalInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginTerminalResult = {
  __typename?: 'LoginTerminalResult';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Media = {
  __typename?: 'Media';
  collection_name?: Maybe<Scalars['String']>;
  file_name?: Maybe<Scalars['String']>;
  mime_type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  srcset?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activateTerminal?: Maybe<Token>;
  createBadge: Badge;
  createFeature: Feature;
  createLocator?: Maybe<Locator>;
  createOverlay?: Maybe<Overlay>;
  createPlan: Plan;
  createUser: User;
  login: User;
  loginTerminalUser?: Maybe<LoginTerminalResult>;
  logout?: Maybe<User>;
  logoutTerminalUser?: Maybe<User>;
  registerTerminal?: Maybe<Terminal>;
  revokeTerminal?: Maybe<Terminal>;
  saveAdminSettings?: Maybe<AdminSettings>;
  saveGeneralSettings?: Maybe<GeneralSettings>;
  savePaymentSettings?: Maybe<PaymentSettings>;
  updateBadge: Badge;
  updateFeature: Feature;
  updateOverlay?: Maybe<Overlay>;
  updatePlan: Plan;
  updateTerminalPin?: Maybe<User>;
  updateUser: User;
};


export type MutationActivateTerminalArgs = {
  slug: Scalars['String'];
};


export type MutationCreateBadgeArgs = {
  input?: InputMaybe<CreateBadgeInput>;
};


export type MutationCreateFeatureArgs = {
  input?: InputMaybe<CreateFeature>;
};


export type MutationCreateLocatorArgs = {
  input: CreateLocatorInput;
};


export type MutationCreateOverlayArgs = {
  input?: InputMaybe<CreateOverlayInput>;
};


export type MutationCreatePlanArgs = {
  input?: InputMaybe<CreatePlan>;
};


export type MutationCreateUserArgs = {
  input?: InputMaybe<CreateUser>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginTerminalUserArgs = {
  input?: InputMaybe<LoginTerminalInput>;
};


export type MutationLogoutTerminalUserArgs = {
  id: Scalars['ID'];
};


export type MutationRegisterTerminalArgs = {
  input?: InputMaybe<RegisterTerminalInput>;
};


export type MutationRevokeTerminalArgs = {
  id: Scalars['ID'];
};


export type MutationSaveAdminSettingsArgs = {
  settings: AdminSettingsInput;
};


export type MutationSaveGeneralSettingsArgs = {
  settings: GeneralSettingsInput;
};


export type MutationSavePaymentSettingsArgs = {
  settings: PaymentSettingsInput;
};


export type MutationUpdateBadgeArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<UpdateBadgeInput>;
};


export type MutationUpdateFeatureArgs = {
  input?: InputMaybe<UpdateFeature>;
};


export type MutationUpdateOverlayArgs = {
  input?: InputMaybe<UpdateOverlayInput>;
};


export type MutationUpdatePlanArgs = {
  input?: InputMaybe<UpdatePlan>;
};


export type MutationUpdateTerminalPinArgs = {
  input?: InputMaybe<UpdateTerminalPin>;
};


export type MutationUpdateUserArgs = {
  input?: InputMaybe<UserUpdate>;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export const OrderByRelationAggregateFunction = {
  /** Amount of items. */
  Count: 'COUNT'
} as const;

export type OrderByRelationAggregateFunction = typeof OrderByRelationAggregateFunction[keyof typeof OrderByRelationAggregateFunction];
/** Aggregate functions when ordering by a relation that may specify a column. */
export const OrderByRelationWithColumnAggregateFunction = {
  /** Average. */
  Avg: 'AVG',
  /** Amount of items. */
  Count: 'COUNT',
  /** Maximum. */
  Max: 'MAX',
  /** Minimum. */
  Min: 'MIN',
  /** Sum. */
  Sum: 'SUM'
} as const;

export type OrderByRelationWithColumnAggregateFunction = typeof OrderByRelationWithColumnAggregateFunction[keyof typeof OrderByRelationWithColumnAggregateFunction];
export type Overlay = {
  __typename?: 'Overlay';
  background: Media;
  created: Scalars['DateTimeTz'];
  id: Scalars['ID'];
  name: Scalars['String'];
  resolved_spec: Scalars['String'];
  spec: Scalars['String'];
  type: OverlayType;
  updated?: Maybe<Scalars['DateTimeTz']>;
};

/** A paginated list of Overlay items. */
export type OverlayPaginator = {
  __typename?: 'OverlayPaginator';
  /** A list of Overlay items. */
  data: Array<Overlay>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export const OverlayType = {
  GenericUser: 'GENERIC_USER',
  Idcard: 'IDCARD'
} as const;

export type OverlayType = typeof OverlayType[keyof typeof OverlayType];
/** Information about pagination using a Relay style cursor connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Number of nodes in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** The cursor to continue paginating forwards. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** The cursor to continue paginating backwards. */
  startCursor?: Maybe<Scalars['String']>;
  /** Total number of nodes in the paginated connection. */
  total: Scalars['Int'];
};

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** Number of items per page. */
  perPage: Scalars['Int'];
  /** Number of total available items. */
  total: Scalars['Int'];
};

export type PaymentSettings = {
  __typename?: 'PaymentSettings';
  stripe_pk?: Maybe<Scalars['String']>;
  stripe_sk?: Maybe<Scalars['String']>;
};

export type PaymentSettingsInput = {
  stripe_pk?: InputMaybe<Scalars['String']>;
  stripe_sk?: InputMaybe<Scalars['String']>;
};

export type Phones = {
  __typename?: 'Phones';
  number: Scalars['String'];
  type: Scalars['String'];
};

export type PhonesInput = {
  number: Scalars['String'];
  type: Scalars['String'];
};

export type Plan = {
  __typename?: 'Plan';
  features?: Maybe<Array<Feature>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  public: Scalars['Boolean'];
  stripe_data?: Maybe<StripeProductData>;
  stripe_id?: Maybe<Scalars['String']>;
};

/** A paginated list of Plan items. */
export type PlanPaginator = {
  __typename?: 'PlanPaginator';
  /** A list of Plan items. */
  data: Array<Plan>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type PublicPaymentSettings = {
  __typename?: 'PublicPaymentSettings';
  stripe_pk?: Maybe<Scalars['String']>;
};

export type PublicPlan = {
  __typename?: 'PublicPlan';
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** A paginated list of PublicPlan items. */
export type PublicPlanPaginator = {
  __typename?: 'PublicPlanPaginator';
  /** A list of PublicPlan items. */
  data: Array<PublicPlan>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Query = {
  __typename?: 'Query';
  adminSettings?: Maybe<AdminSettings>;
  badge?: Maybe<Badge>;
  badges?: Maybe<BadgePaginator>;
  badgesCount: Scalars['Int'];
  currentUser?: Maybe<User>;
  generalSettings?: Maybe<GeneralSettings>;
  getAvailableStripeProducts: Array<AvailableStripeProducts>;
  getFeatures: Array<Feature>;
  getPublicPlans?: Maybe<PublicPlanPaginator>;
  helloTerminal?: Maybe<Terminal>;
  locator?: Maybe<Locator>;
  overlay?: Maybe<Overlay>;
  overlays?: Maybe<OverlayPaginator>;
  paymentSettings?: Maybe<PaymentSettings>;
  plan?: Maybe<Plan>;
  plans?: Maybe<PlanPaginator>;
  publicPaymentSettings?: Maybe<PublicPaymentSettings>;
  search?: Maybe<SearchResult>;
  terminal?: Maybe<TerminalPaginator>;
  terminals?: Maybe<TerminalPaginator>;
  user?: Maybe<User>;
  userExists: Scalars['Boolean'];
  users?: Maybe<UserPaginator>;
};


export type QueryBadgeArgs = {
  id: Scalars['ID'];
};


export type QueryBadgesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryGetPublicPlansArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryLocatorArgs = {
  token: Scalars['String'];
  type: LocatorTypes;
};


export type QueryOverlayArgs = {
  id: Scalars['ID'];
};


export type QueryOverlaysArgs = {
  first: Scalars['Int'];
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryPlanArgs = {
  id: Scalars['ID'];
};


export type QueryPlansArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QuerySearchArgs = {
  page?: InputMaybe<Scalars['Int']>;
  q: Scalars['String'];
};


export type QueryTerminalArgs = {
  first?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryTerminalsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUserExistsArgs = {
  email: Scalars['String'];
};


export type QueryUsersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['String']>;
};

export type Role = {
  __typename?: 'Role';
  name: Scalars['String'];
  title: Scalars['String'];
};

export type SearchModel = Badge | User;

export type SearchResult = {
  __typename?: 'SearchResult';
  current_page: Scalars['Int'];
  data?: Maybe<Array<SearchModel>>;
  per_page: Scalars['Int'];
  total: Scalars['Int'];
};

/** Information about pagination using a simple paginator. */
export type SimplePaginatorInfo = {
  __typename?: 'SimplePaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Number of items per page. */
  perPage: Scalars['Int'];
};

/** Directions for ordering a list of records. */
export const SortOrder = {
  /** Sort records in ascending order. */
  Asc: 'ASC',
  /** Sort records in descending order. */
  Desc: 'DESC'
} as const;

export type SortOrder = typeof SortOrder[keyof typeof SortOrder];
export type StripeAutomaticTax = {
  __typename?: 'StripeAutomaticTax';
  enabled?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['String']>;
};

export type StripeInvoice = {
  __typename?: 'StripeInvoice';
  amount_due: Scalars['Int'];
  amount_paid: Scalars['Int'];
  amount_remaining: Scalars['Int'];
  attempt_count: Scalars['Int'];
  attempted?: Maybe<Scalars['Boolean']>;
  auto_advance?: Maybe<Scalars['Boolean']>;
  automatic_tax?: Maybe<StripeAutomaticTax>;
  billing_reason: Scalars['String'];
  charge?: Maybe<Scalars['String']>;
  collection_method?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  customer?: Maybe<Scalars['String']>;
  customer_address?: Maybe<Address>;
  customer_email?: Maybe<Scalars['String']>;
  customer_name?: Maybe<Scalars['String']>;
  customer_phone?: Maybe<Scalars['String']>;
  customer_shipping?: Maybe<Address>;
  default_source?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['String']>;
  due_date?: Maybe<Scalars['String']>;
  ending_balance?: Maybe<Scalars['Int']>;
  footer?: Maybe<Scalars['String']>;
  from_invoice?: Maybe<Scalars['String']>;
  hosted_invoice_url?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  invoice_pdf?: Maybe<Scalars['String']>;
  last_finalization_error?: Maybe<Scalars['String']>;
  latest_revision?: Maybe<Scalars['String']>;
  lines?: Maybe<StripesLinesPaginator>;
  livemode?: Maybe<Scalars['Boolean']>;
  next_payment_attempt?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  on_behalf_of?: Maybe<Scalars['String']>;
  paid?: Maybe<Scalars['Boolean']>;
  paid_out_of_band?: Maybe<Scalars['Boolean']>;
  payment_intent?: Maybe<Scalars['String']>;
  period_end?: Maybe<Scalars['String']>;
  period_start?: Maybe<Scalars['String']>;
  post_payment_credit_notes_amount?: Maybe<Scalars['Int']>;
  pre_payment_credit_notes_amount?: Maybe<Scalars['Int']>;
  quote?: Maybe<Scalars['String']>;
  receipt_number?: Maybe<Scalars['String']>;
  starting_balance?: Maybe<Scalars['Int']>;
  statement_descriptor?: Maybe<Scalars['String']>;
  status?: Maybe<StripeInvoiceStatus>;
  status_transitions?: Maybe<StripeStatusTransitions>;
  subscription?: Maybe<Scalars['String']>;
  subtotal?: Maybe<Scalars['Int']>;
  subtotal_excluding_tax?: Maybe<Scalars['Int']>;
  tax?: Maybe<Scalars['Int']>;
  test_clock?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
  total_excluding_tax?: Maybe<Scalars['String']>;
  total_tax_amounts?: Maybe<Array<Maybe<StripeTotalTaxAmounts>>>;
  webhooks_delivered_at?: Maybe<Scalars['String']>;
};

export const StripeInvoiceStatus = {
  Draft: 'DRAFT',
  Open: 'OPEN',
  Paid: 'PAID',
  Uncollectible: 'UNCOLLECTIBLE',
  Void: 'VOID'
} as const;

export type StripeInvoiceStatus = typeof StripeInvoiceStatus[keyof typeof StripeInvoiceStatus];
export type StripeLineItems = {
  __typename?: 'StripeLineItems';
  amount?: Maybe<Scalars['Int']>;
  amount_excluding_tax?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  discountable?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  livemode?: Maybe<Scalars['Boolean']>;
  period?: Maybe<StripePeriod>;
  plan?: Maybe<StripePlan>;
  price?: Maybe<StripePrice>;
  proration?: Maybe<Scalars['Boolean']>;
  quantity?: Maybe<Scalars['Int']>;
  subscription?: Maybe<Scalars['String']>;
  subscription_item?: Maybe<Scalars['String']>;
  tax_amounts?: Maybe<Array<Maybe<StripeTotalTaxAmounts>>>;
  type?: Maybe<Scalars['String']>;
  unit_amount_excluding_tax?: Maybe<Scalars['Int']>;
};

export type StripePeriod = {
  __typename?: 'StripePeriod';
  end?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
};

export type StripePlan = {
  __typename?: 'StripePlan';
  active?: Maybe<Scalars['Boolean']>;
  amount?: Maybe<Scalars['Int']>;
  amount_decimal?: Maybe<Scalars['Int']>;
  created?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  interval?: Maybe<Scalars['String']>;
  interval_count?: Maybe<Scalars['Int']>;
  livemode?: Maybe<Scalars['Boolean']>;
  nickname?: Maybe<Scalars['String']>;
  product?: Maybe<Scalars['String']>;
  trial_period_days?: Maybe<Scalars['Int']>;
};

export type StripePrice = {
  __typename?: 'StripePrice';
  active?: Maybe<Scalars['Boolean']>;
  created?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  livemode?: Maybe<Scalars['Boolean']>;
  lookup_key?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  product?: Maybe<Scalars['String']>;
  recurring?: Maybe<StripeRecurring>;
  tax_behavior?: Maybe<Scalars['String']>;
  transform_quantity?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  unit_amount?: Maybe<Scalars['Int']>;
  unit_amount_decimal?: Maybe<Scalars['Int']>;
};

export type StripePriceRecurringData = {
  __typename?: 'StripePriceRecurringData';
  interval: Scalars['String'];
  interval_count: Scalars['Int'];
};

export type StripeProductData = {
  __typename?: 'StripeProductData';
  id?: Maybe<Scalars['String']>;
  livemode?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  prices?: Maybe<Array<StripeProductPriceData>>;
};

export type StripeProductPriceData = {
  __typename?: 'StripeProductPriceData';
  currency: Scalars['String'];
  id: Scalars['String'];
  nickname?: Maybe<Scalars['String']>;
  recurring?: Maybe<StripePriceRecurringData>;
  unit_amount: Scalars['Int'];
};

export type StripeRecurring = {
  __typename?: 'StripeRecurring';
  interval?: Maybe<Scalars['String']>;
  interval_count?: Maybe<Scalars['Int']>;
  trial_period_days?: Maybe<Scalars['Int']>;
  usage_type?: Maybe<Scalars['String']>;
};

export type StripeStatusTransitions = {
  __typename?: 'StripeStatusTransitions';
  finalized_at?: Maybe<Scalars['String']>;
  marked_uncollectible_at?: Maybe<Scalars['String']>;
  paid_at?: Maybe<Scalars['String']>;
  voided_at?: Maybe<Scalars['String']>;
};

export const StripeSubscriptionStatus = {
  Active: 'ACTIVE',
  Canceled: 'CANCELED',
  Incomplete: 'INCOMPLETE',
  IncompleteExpired: 'INCOMPLETE_EXPIRED',
  PastDue: 'PAST_DUE',
  Trialing: 'TRIALING',
  Unpaid: 'UNPAID'
} as const;

export type StripeSubscriptionStatus = typeof StripeSubscriptionStatus[keyof typeof StripeSubscriptionStatus];
export type StripeTotalTaxAmounts = {
  __typename?: 'StripeTotalTaxAmounts';
  amount?: Maybe<Scalars['Int']>;
  inclusive?: Maybe<Scalars['Boolean']>;
  tax_rate?: Maybe<Scalars['String']>;
};

export type StripesLinesPaginator = {
  __typename?: 'StripesLinesPaginator';
  data?: Maybe<Array<Maybe<StripeLineItems>>>;
  has_more?: Maybe<Scalars['Boolean']>;
  total_count?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

export type SyncFeatures = {
  amount?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
};

export type Terminal = {
  __typename?: 'Terminal';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  tokens?: Maybe<Array<Maybe<Token>>>;
};

/** A paginated list of Terminal items. */
export type TerminalPaginator = {
  __typename?: 'TerminalPaginator';
  /** A list of Terminal items. */
  data: Array<Terminal>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Token = {
  __typename?: 'Token';
  created: Scalars['String'];
  last_used_at?: Maybe<Scalars['DateTimeTz']>;
  name: Scalars['String'];
  plainTextToken?: Maybe<Scalars['String']>;
  updated: Scalars['String'];
};

/** Specify if you want to include or exclude trashed results from a query. */
export const Trashed = {
  /** Only return trashed results. */
  Only: 'ONLY',
  /** Return both trashed and non-trashed results. */
  With: 'WITH',
  /** Only return non-trashed results. */
  Without: 'WITHOUT'
} as const;

export type Trashed = typeof Trashed[keyof typeof Trashed];
export type UpdateBadgeInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateFeature = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<FeatureType>;
};

export type UpdateFeaturesBelongsToMany = {
  connect?: InputMaybe<Array<SyncFeatures>>;
  disconnect?: InputMaybe<Array<Scalars['ID']>>;
  sync?: InputMaybe<Array<SyncFeatures>>;
  syncWithoutDetaching?: InputMaybe<Array<SyncFeatures>>;
};

export type UpdateOverlayInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  spec?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<OverlayType>;
  upload?: InputMaybe<Scalars['Upload']>;
};

export type UpdatePlan = {
  features?: InputMaybe<UpdateFeaturesBelongsToMany>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['Boolean']>;
  stripe_id?: InputMaybe<Scalars['String']>;
};

export type UpdateTerminalPin = {
  id: Scalars['ID'];
  terminal_pincode: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  abilities: Array<Scalars['String']>;
  address?: Maybe<Address>;
  avatar?: Maybe<Media>;
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  invoices?: Maybe<Array<Maybe<StripeInvoice>>>;
  locators: Array<Maybe<Locator>>;
  name: Scalars['String'];
  phones: Array<Phones>;
  preferred_name?: Maybe<Scalars['String']>;
  roles: Array<Scalars['String']>;
  subscription?: Maybe<CashierSubscription>;
  terminal_pincode?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** A list of User items. */
  data: Array<User>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type UserUpdate = {
  address?: InputMaybe<AddressInput>;
  avatar?: InputMaybe<Scalars['Upload']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Array<InputMaybe<PhonesInput>>>;
  preferred_name?: InputMaybe<Scalars['String']>;
};

export type LoginTerminal = {
  slug: Scalars['String'];
};

export type RegisterTerminalInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type GlobalSearchQueryVariables = Exact<{
  q: Scalars['String'];
}>;


export type GlobalSearchQuery = { __typename?: 'Query', search?: { __typename?: 'SearchResult', data?: Array<{ __typename?: 'Badge', id: string, name: string } | { __typename?: 'User', id: string, email: string, name: string }> | null } | null };

export type GetFeaturesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeaturesQuery = { __typename?: 'Query', getFeatures: Array<{ __typename?: 'Feature', id: string, type: FeatureType, name: string }> };

export type AttachFeatureMutationVariables = Exact<{
  planId: Scalars['ID'];
  featureId: Scalars['ID'];
  amount?: InputMaybe<Scalars['Int']>;
}>;


export type AttachFeatureMutation = { __typename?: 'Mutation', updatePlan: { __typename?: 'Plan', id: string, features?: Array<{ __typename?: 'Feature', id: string, type: FeatureType, name: string, parameters?: { __typename?: 'FeatureParameters', amount?: number | null } | null }> | null } };

export type UpdateFeatureParamMutationVariables = Exact<{
  planId: Scalars['ID'];
  featureId: Scalars['ID'];
  amount: Scalars['Int'];
}>;


export type UpdateFeatureParamMutation = { __typename?: 'Mutation', updatePlan: { __typename?: 'Plan', id: string, features?: Array<{ __typename?: 'Feature', id: string, type: FeatureType, name: string, parameters?: { __typename?: 'FeatureParameters', amount?: number | null } | null }> | null } };

export type DetachFeatureMutationVariables = Exact<{
  plan_id: Scalars['ID'];
  feature_id: Scalars['ID'];
}>;


export type DetachFeatureMutation = { __typename?: 'Mutation', updatePlan: { __typename?: 'Plan', id: string, features?: Array<{ __typename?: 'Feature', id: string, type: FeatureType, name: string, parameters?: { __typename?: 'FeatureParameters', amount?: number | null } | null }> | null } };

export type CreateFeatureMutationVariables = Exact<{
  name: Scalars['String'];
  type?: InputMaybe<FeatureType>;
}>;


export type CreateFeatureMutation = { __typename?: 'Mutation', createFeature: { __typename?: 'Feature', id: string, name: string, type: FeatureType } };

export type LoginTerminalUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginTerminalUserMutation = { __typename?: 'Mutation', loginTerminalUser?: { __typename?: 'LoginTerminalResult', token?: string | null, user?: { __typename?: 'User', id: string, name: string, email: string, terminal_pincode?: string | null } | null } | null };

export type LogoutTerminalUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LogoutTerminalUserMutation = { __typename?: 'Mutation', logoutTerminalUser?: { __typename?: 'User', id: string } | null };

export type UserAvatarQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserAvatarQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, avatar?: { __typename?: 'Media', srcset?: string | null, url?: string | null } | null } | null };

export type CreateUserLocatorMutationVariables = Exact<{
  token: Scalars['String'];
  id: Scalars['ID'];
}>;


export type CreateUserLocatorMutation = { __typename?: 'Mutation', createLocator?: { __typename?: 'Locator', id: string } | null };

export type GetStripeProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStripeProductsQuery = { __typename?: 'Query', getAvailableStripeProducts: Array<{ __typename?: 'AvailableStripeProducts', name: string, id: string }> };

export type GeneralSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GeneralSettingsQuery = { __typename?: 'Query', generalSettings?: { __typename?: 'GeneralSettings', site_name?: string | null } | null };

export type SaveGeneralSettingsMutationVariables = Exact<{
  site_name?: InputMaybe<Scalars['String']>;
}>;


export type SaveGeneralSettingsMutation = { __typename?: 'Mutation', saveGeneralSettings?: { __typename?: 'GeneralSettings', site_name?: string | null } | null };

export type AdminSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminSettingsQuery = { __typename?: 'Query', adminSettings?: { __typename?: 'AdminSettings', maps_api_key?: string | null } | null };

export type SaveAdminSettingsMutationVariables = Exact<{
  maps_api_key?: InputMaybe<Scalars['String']>;
}>;


export type SaveAdminSettingsMutation = { __typename?: 'Mutation', saveAdminSettings?: { __typename?: 'AdminSettings', maps_api_key?: string | null } | null };

export type PaymentSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type PaymentSettingsQuery = { __typename?: 'Query', paymentSettings?: { __typename?: 'PaymentSettings', stripe_pk?: string | null, stripe_sk?: string | null } | null };

export type PublicPaymentSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicPaymentSettingsQuery = { __typename?: 'Query', publicPaymentSettings?: { __typename?: 'PublicPaymentSettings', stripe_pk?: string | null } | null };

export type SavePaymentSettingsMutationVariables = Exact<{
  stripe_sk?: InputMaybe<Scalars['String']>;
  stripe_pk?: InputMaybe<Scalars['String']>;
}>;


export type SavePaymentSettingsMutation = { __typename?: 'Mutation', savePaymentSettings?: { __typename?: 'PaymentSettings', stripe_pk?: string | null, stripe_sk?: string | null } | null };

export type UserExistsQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type UserExistsQuery = { __typename?: 'Query', userExists: boolean };

export type User_CurrentFragment = { __typename?: 'User', email: string, name: string, id: string, roles: Array<string>, abilities: Array<string>, avatar?: { __typename?: 'Media', srcset?: string | null, url?: string | null } | null };

export type LoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', email: string, name: string, id: string, roles: Array<string>, abilities: Array<string>, avatar?: { __typename?: 'Media', srcset?: string | null, url?: string | null } | null } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', email: string, name: string, id: string, roles: Array<string>, abilities: Array<string>, avatar?: { __typename?: 'Media', srcset?: string | null, url?: string | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'User', id: string } | null };

export type BadgeFieldsFragment = { __typename?: 'Badge', name: string };

export type GetBadgeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetBadgeQuery = { __typename?: 'Query', badge?: { __typename?: 'Badge', id: string, name: string } | null };

export type LocatorLookupQueryVariables = Exact<{
  token: Scalars['String'];
  type: LocatorTypes;
}>;


export type LocatorLookupQuery = { __typename?: 'Query', locator?: { __typename?: 'Locator', id: string, target: { __typename: 'User', id: string, email: string, name: string, avatar?: { __typename?: 'Media', srcset?: string | null, url?: string | null } | null } } | null };

export type HelloTerminalQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloTerminalQuery = { __typename?: 'Query', helloTerminal?: { __typename?: 'Terminal', name?: string | null } | null };

export type UpdateBadgeMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
}>;


export type UpdateBadgeMutation = { __typename?: 'Mutation', updateBadge: { __typename?: 'Badge', id: string, name: string } };

export type GetBadgesQueryVariables = Exact<{
  page: Scalars['Int'];
  search?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type GetBadgesQuery = { __typename?: 'Query', badges?: { __typename?: 'BadgePaginator', data: Array<{ __typename?: 'Badge', id: string, name: string }>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, total: number } } | null };

export type CreateOverlayMutationVariables = Exact<{
  name: Scalars['String'];
  type: OverlayType;
  spec: Scalars['String'];
  upload: Scalars['Upload'];
}>;


export type CreateOverlayMutation = { __typename?: 'Mutation', createOverlay?: { __typename?: 'Overlay', id: string, spec: string, name: string, type: OverlayType, resolved_spec: string } | null };

export type OverlayQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type OverlayQuery = { __typename?: 'Query', overlay?: { __typename?: 'Overlay', id: string, resolved_spec: string, name: string, type: OverlayType } | null };

export type UpdateOverlayMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<OverlayType>;
  spec?: InputMaybe<Scalars['String']>;
  upload?: InputMaybe<Scalars['Upload']>;
}>;


export type UpdateOverlayMutation = { __typename?: 'Mutation', updateOverlay?: { __typename?: 'Overlay', id: string, name: string, type: OverlayType, resolved_spec: string, spec: string } | null };

export type OverlaysQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type OverlaysQuery = { __typename?: 'Query', overlays?: { __typename?: 'OverlayPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, total: number }, data: Array<{ __typename?: 'Overlay', id: string, name: string, type: OverlayType }> } | null };

export type CreatePlanMutationVariables = Exact<{
  name: Scalars['String'];
  public: Scalars['Boolean'];
}>;


export type CreatePlanMutation = { __typename?: 'Mutation', createPlan: { __typename?: 'Plan', id: string } };

export type UpdatePlanMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
}>;


export type UpdatePlanMutation = { __typename?: 'Mutation', updatePlan: { __typename?: 'Plan', id: string, name: string, public: boolean } };

export type GetPlanEditQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPlanEditQuery = { __typename?: 'Query', plan?: { __typename?: 'Plan', id: string, name: string, public: boolean } | null };

export type PlansQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type PlansQuery = { __typename?: 'Query', plans?: { __typename?: 'PlanPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', count: number, total: number, lastPage: number }, data: Array<{ __typename?: 'Plan', id: string, name: string }> } | null };

export type StripeDataFragmentFragment = { __typename?: 'Plan', stripe_id?: string | null, stripe_data?: { __typename?: 'StripeProductData', livemode?: boolean | null, name?: string | null, prices?: Array<{ __typename?: 'StripeProductPriceData', id: string, currency: string, unit_amount: number, nickname?: string | null, recurring?: { __typename?: 'StripePriceRecurringData', interval: string, interval_count: number } | null }> | null } | null };

export type GetPlanQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPlanQuery = { __typename?: 'Query', plan?: { __typename?: 'Plan', id: string, name: string, public: boolean, stripe_id?: string | null, features?: Array<{ __typename?: 'Feature', id: string, name: string, type: FeatureType, slug?: string | null, parameters?: { __typename?: 'FeatureParameters', amount?: number | null } | null }> | null, stripe_data?: { __typename?: 'StripeProductData', livemode?: boolean | null, name?: string | null, prices?: Array<{ __typename?: 'StripeProductPriceData', id: string, currency: string, unit_amount: number, nickname?: string | null, recurring?: { __typename?: 'StripePriceRecurringData', interval: string, interval_count: number } | null }> | null } | null } | null };

export type UpdatePlanStripeIdMutationVariables = Exact<{
  id: Scalars['ID'];
  stripe_id?: InputMaybe<Scalars['String']>;
}>;


export type UpdatePlanStripeIdMutation = { __typename?: 'Mutation', updatePlan: { __typename?: 'Plan', id: string, stripe_id?: string | null, stripe_data?: { __typename?: 'StripeProductData', livemode?: boolean | null, name?: string | null, prices?: Array<{ __typename?: 'StripeProductPriceData', id: string, currency: string, unit_amount: number, nickname?: string | null, recurring?: { __typename?: 'StripePriceRecurringData', interval: string, interval_count: number } | null }> | null } | null } };

export type TerminalsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type TerminalsQuery = { __typename?: 'Query', terminals?: { __typename?: 'TerminalPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, total: number }, data: Array<{ __typename?: 'Terminal', id: string, name?: string | null, tokens?: Array<{ __typename?: 'Token', name: string, last_used_at?: any | null } | null> | null }> } | null };

export type RevokeTerminalMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RevokeTerminalMutation = { __typename?: 'Mutation', revokeTerminal?: { __typename?: 'Terminal', id: string } | null };

export type RegisterTerminalMutationVariables = Exact<{
  name: Scalars['String'];
  slug: Scalars['String'];
}>;


export type RegisterTerminalMutation = { __typename?: 'Mutation', registerTerminal?: { __typename?: 'Terminal', id: string, name?: string | null } | null };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  name: Scalars['String'];
  preferred_name?: InputMaybe<Scalars['String']>;
  phones: Array<PhonesInput> | PhonesInput;
  address: AddressInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string, name: string, preferred_name?: string | null, phones: Array<{ __typename?: 'Phones', number: string, type: string }>, address?: { __typename?: 'Address', line1: string, line2?: string | null, city: string, state: string, postal_code: string } | null } };

export type GetUsersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['String']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users?: { __typename?: 'UserPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', lastPage: number, total: number }, data: Array<{ __typename?: 'User', id: string, name: string, email: string }> } | null };

export type UserViewQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  email?: InputMaybe<Scalars['String']>;
}>;


export type UserViewQuery = { __typename?: 'Query', user?: { __typename?: 'User', email: string, name: string, id: string, subscription?: { __typename?: 'CashierSubscription', id: string, stripe_status?: StripeSubscriptionStatus | null } | null } | null };

export type UserInvoicesQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserInvoicesQuery = { __typename?: 'Query', user?: { __typename?: 'User', invoices?: Array<{ __typename?: 'StripeInvoice', id: string, number?: string | null, status?: StripeInvoiceStatus | null, amount_remaining: number, currency?: string | null } | null> | null } | null };

export type UserMembershipQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserMembershipQuery = { __typename?: 'Query', user?: { __typename?: 'User', subscription?: { __typename?: 'CashierSubscription', stripe_status?: StripeSubscriptionStatus | null } | null } | null };

export type PriceTreeQueryVariables = Exact<{ [key: string]: never; }>;


export type PriceTreeQuery = { __typename?: 'Query', plans?: { __typename?: 'PlanPaginator', data: Array<{ __typename?: 'Plan', id: string, name: string, stripe_data?: { __typename?: 'StripeProductData', id?: string | null, name?: string | null, prices?: Array<{ __typename?: 'StripeProductPriceData', id: string, nickname?: string | null, unit_amount: number, currency: string, recurring?: { __typename?: 'StripePriceRecurringData', interval: string, interval_count: number } | null }> | null } | null }> } | null };

export type UploadAvatarMutationVariables = Exact<{
  id: Scalars['ID'];
  avatar?: InputMaybe<Scalars['Upload']>;
}>;


export type UploadAvatarMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, avatar?: { __typename?: 'Media', url?: string | null } | null } };

export type ActivateTerminalMutationVariables = Exact<{
  slug: Scalars['String'];
}>;


export type ActivateTerminalMutation = { __typename?: 'Mutation', activateTerminal?: { __typename?: 'Token', plainTextToken?: string | null } | null };

export const User_CurrentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User_current"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"abilities"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"srcset"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<User_CurrentFragment, unknown>;
export const BadgeFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"badgeFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<BadgeFieldsFragment, unknown>;
export const StripeDataFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StripeDataFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stripe_id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"livemode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"unit_amount"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"recurring"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"interval_count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<StripeDataFragmentFragment, unknown>;
export const GlobalSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GlobalSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"search"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"q"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GlobalSearchQuery, GlobalSearchQueryVariables>;
export const GetFeaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFeatures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFeatures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetFeaturesQuery, GetFeaturesQueryVariables>;
export const AttachFeatureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AttachFeature"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"featureId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"features"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"connect"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"featureId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}]}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parameters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AttachFeatureMutation, AttachFeatureMutationVariables>;
export const UpdateFeatureParamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFeatureParam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"featureId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"features"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"syncWithoutDetaching"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"featureId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}]}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parameters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateFeatureParamMutation, UpdateFeatureParamMutationVariables>;
export const DetachFeatureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DetachFeature"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"plan_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"feature_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"plan_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"features"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"disconnect"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"feature_id"}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parameters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DetachFeatureMutation, DetachFeatureMutationVariables>;
export const CreateFeatureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFeature"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FeatureType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFeature"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<CreateFeatureMutation, CreateFeatureMutationVariables>;
export const LoginTerminalUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginTerminalUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginTerminalUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"terminal_pincode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginTerminalUserMutation, LoginTerminalUserMutationVariables>;
export const LogoutTerminalUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutTerminalUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logoutTerminalUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LogoutTerminalUserMutation, LogoutTerminalUserMutationVariables>;
export const UserAvatarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserAvatar"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"srcset"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<UserAvatarQuery, UserAvatarQueryVariables>;
export const CreateUserLocatorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserLocator"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLocator"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"RFID"}},{"kind":"ObjectField","name":{"kind":"Name","value":"target"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"connect"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"USER"}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateUserLocatorMutation, CreateUserLocatorMutationVariables>;
export const GetStripeProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStripeProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAvailableStripeProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetStripeProductsQuery, GetStripeProductsQueryVariables>;
export const GeneralSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GeneralSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generalSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site_name"}}]}}]}}]} as unknown as DocumentNode<GeneralSettingsQuery, GeneralSettingsQueryVariables>;
export const SaveGeneralSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveGeneralSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site_name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveGeneralSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"settings"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"site_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site_name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site_name"}}]}}]}}]} as unknown as DocumentNode<SaveGeneralSettingsMutation, SaveGeneralSettingsMutationVariables>;
export const AdminSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maps_api_key"}}]}}]}}]} as unknown as DocumentNode<AdminSettingsQuery, AdminSettingsQueryVariables>;
export const SaveAdminSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveAdminSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maps_api_key"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveAdminSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"settings"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"maps_api_key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maps_api_key"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maps_api_key"}}]}}]}}]} as unknown as DocumentNode<SaveAdminSettingsMutation, SaveAdminSettingsMutationVariables>;
export const PaymentSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaymentSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stripe_pk"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_sk"}}]}}]}}]} as unknown as DocumentNode<PaymentSettingsQuery, PaymentSettingsQueryVariables>;
export const PublicPaymentSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicPaymentSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicPaymentSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stripe_pk"}}]}}]}}]} as unknown as DocumentNode<PublicPaymentSettingsQuery, PublicPaymentSettingsQueryVariables>;
export const SavePaymentSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SavePaymentSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stripe_sk"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stripe_pk"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"savePaymentSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"settings"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"stripe_sk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stripe_sk"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"stripe_pk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stripe_pk"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stripe_pk"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_sk"}}]}}]}}]} as unknown as DocumentNode<SavePaymentSettingsMutation, SavePaymentSettingsMutationVariables>;
export const UserExistsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserExists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userExists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<UserExistsQuery, UserExistsQueryVariables>;
export const LoggedInUserDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoggedInUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User_current"}}]}}]}},...User_CurrentFragmentDoc.definitions]} as unknown as DocumentNode<LoggedInUserQuery, LoggedInUserQueryVariables>;
export const LoginDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User_current"}}]}}]}},...User_CurrentFragmentDoc.definitions]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const GetBadgeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBadge"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"badge"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"badgeFields"}}]}}]}},...BadgeFieldsFragmentDoc.definitions]} as unknown as DocumentNode<GetBadgeQuery, GetBadgeQueryVariables>;
export const LocatorLookupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LocatorLookup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LocatorTypes"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"locator"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"srcset"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<LocatorLookupQuery, LocatorLookupQueryVariables>;
export const HelloTerminalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HelloTerminal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"helloTerminal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<HelloTerminalQuery, HelloTerminalQueryVariables>;
export const UpdateBadgeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBadge"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBadge"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"badgeFields"}}]}}]}},...BadgeFieldsFragmentDoc.definitions]} as unknown as DocumentNode<UpdateBadgeMutation, UpdateBadgeMutationVariables>;
export const GetBadgesDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBadges"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"25"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"badges"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"badgeFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},...BadgeFieldsFragmentDoc.definitions]} as unknown as DocumentNode<GetBadgesQuery, GetBadgesQueryVariables>;
export const CreateOverlayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOverlay"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OverlayType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spec"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"upload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOverlay"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"spec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spec"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"upload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"upload"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"spec"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"resolved_spec"}}]}}]}}]} as unknown as DocumentNode<CreateOverlayMutation, CreateOverlayMutationVariables>;
export const OverlayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Overlay"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"overlay"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"resolved_spec"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<OverlayQuery, OverlayQueryVariables>;
export const UpdateOverlayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOverlay"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OverlayType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spec"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"upload"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOverlay"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"spec"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spec"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"upload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"upload"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"resolved_spec"}},{"kind":"Field","name":{"kind":"Name","value":"spec"}}]}}]}}]} as unknown as DocumentNode<UpdateOverlayMutation, UpdateOverlayMutationVariables>;
export const OverlaysDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Overlays"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"25"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"overlays"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<OverlaysQuery, OverlaysQueryVariables>;
export const CreatePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"public"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"public"},"value":{"kind":"Variable","name":{"kind":"Name","value":"public"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePlanMutation, CreatePlanMutationVariables>;
export const UpdatePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"public"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"public"},"value":{"kind":"Variable","name":{"kind":"Name","value":"public"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"public"}}]}}]}}]} as unknown as DocumentNode<UpdatePlanMutation, UpdatePlanMutationVariables>;
export const GetPlanEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlanEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"public"}}]}}]}}]} as unknown as DocumentNode<GetPlanEditQuery, GetPlanEditQueryVariables>;
export const PlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Plans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<PlansQuery, PlansQueryVariables>;
export const GetPlanDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"public"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StripeDataFragment"}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"parameters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]}},...StripeDataFragmentFragmentDoc.definitions]} as unknown as DocumentNode<GetPlanQuery, GetPlanQueryVariables>;
export const UpdatePlanStripeIdDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePlanStripeId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stripe_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"stripe_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stripe_id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StripeDataFragment"}}]}}]}},...StripeDataFragmentFragmentDoc.definitions]} as unknown as DocumentNode<UpdatePlanStripeIdMutation, UpdatePlanStripeIdMutationVariables>;
export const TerminalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Terminals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"25"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"terminals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"last_used_at"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TerminalsQuery, TerminalsQueryVariables>;
export const RevokeTerminalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RevokeTerminal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokeTerminal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RevokeTerminalMutation, RevokeTerminalMutationVariables>;
export const RegisterTerminalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterTerminal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerTerminal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RegisterTerminalMutation, RegisterTerminalMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"preferred_name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phones"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PhonesInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddressInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"preferred_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"preferred_name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"phones"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phones"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"preferred_name"}},{"kind":"Field","name":{"kind":"Name","value":"phones"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"postal_code"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"24"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"q"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const UserViewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserView"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_status"}}]}}]}}]}}]} as unknown as DocumentNode<UserViewQuery, UserViewQueryVariables>;
export const UserInvoicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserInvoices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"amount_remaining"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}}]} as unknown as DocumentNode<UserInvoicesQuery, UserInvoicesQueryVariables>;
export const UserMembershipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserMembership"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stripe_status"}}]}}]}}]}}]} as unknown as DocumentNode<UserMembershipQuery, UserMembershipQueryVariables>;
export const PriceTreeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PriceTree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"unit_amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"recurring"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"interval_count"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PriceTreeQuery, PriceTreeQueryVariables>;
export const UploadAvatarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadAvatar"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"avatar"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"avatar"},"value":{"kind":"Variable","name":{"kind":"Name","value":"avatar"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<UploadAvatarMutation, UploadAvatarMutationVariables>;
export const ActivateTerminalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateTerminal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activateTerminal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plainTextToken"}}]}}]}}]} as unknown as DocumentNode<ActivateTerminalMutation, ActivateTerminalMutationVariables>;