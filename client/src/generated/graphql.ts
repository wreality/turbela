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

export type CreateBadgeInput = {
  name: Scalars['String'];
};

export type CreateFeature = {
  name: Scalars['String'];
  type?: InputMaybe<FeatureType>;
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

export type FeatureType =
  | 'GRANT'
  | 'LIMIT'
  | 'TRACK';

export type GeneralSettings = {
  __typename?: 'GeneralSettings';
  site_name?: Maybe<Scalars['String']>;
};

export type GeneralSettingsInput = {
  site_name?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBadge: Badge;
  createFeature: Feature;
  createPlan: Plan;
  createUser: User;
  login: User;
  logout?: Maybe<User>;
  saveAdminSettings?: Maybe<AdminSettings>;
  saveGeneralSettings?: Maybe<GeneralSettings>;
  savePaymentSettings?: Maybe<PaymentSettings>;
  updateBadge: Badge;
  updateFeature: Feature;
  updatePlan: Plan;
};


export type MutationCreateBadgeArgs = {
  input?: InputMaybe<CreateBadgeInput>;
};


export type MutationCreateFeatureArgs = {
  input?: InputMaybe<CreateFeature>;
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
  input?: InputMaybe<CreateBadgeInput>;
};


export type MutationUpdateFeatureArgs = {
  input?: InputMaybe<UpdateFeature>;
};


export type MutationUpdatePlanArgs = {
  input?: InputMaybe<UpdatePlan>;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export type OrderByRelationAggregateFunction =
  /** Amount of items. */
  | 'COUNT';

/** Aggregate functions when ordering by a relation that may specify a column. */
export type OrderByRelationWithColumnAggregateFunction =
  /** Average. */
  | 'AVG'
  /** Amount of items. */
  | 'COUNT'
  /** Maximum. */
  | 'MAX'
  /** Minimum. */
  | 'MIN'
  /** Sum. */
  | 'SUM';

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
  getPlan?: Maybe<Plan>;
  getPlans?: Maybe<PlanPaginator>;
  getPublicPlans?: Maybe<PublicPlanPaginator>;
  paymentSettings?: Maybe<PaymentSettings>;
  publicPaymentSettings?: Maybe<PublicPaymentSettings>;
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
  q?: InputMaybe<Scalars['String']>;
};


export type QueryGetPlanArgs = {
  id: Scalars['ID'];
};


export type QueryGetPlansArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryGetPublicPlansArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
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
export type SortOrder =
  /** Sort records in ascending order. */
  | 'ASC'
  /** Sort records in descending order. */
  | 'DESC';

export type SquareLineItems = {
  __typename?: 'SquareLineItems';
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

export type StripeInvoiceStatus =
  | 'DRAFT'
  | 'OPEN'
  | 'PAID'
  | 'UNCOLLECTIBLE'
  | 'VOID';

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

export type StripeSubscriptionStatus =
  | 'ACTIVE'
  | 'CANCELED'
  | 'INCOMPLETE'
  | 'INCOMPLETE_EXPIRED'
  | 'PAST_DUE'
  | 'TRIALING'
  | 'UNPAID';

export type StripeTotalTaxAmounts = {
  __typename?: 'StripeTotalTaxAmounts';
  amount?: Maybe<Scalars['Int']>;
  inclusive?: Maybe<Scalars['Boolean']>;
  tax_rate?: Maybe<Scalars['String']>;
};

export type StripesLinesPaginator = {
  __typename?: 'StripesLinesPaginator';
  data?: Maybe<Array<Maybe<SquareLineItems>>>;
  has_more?: Maybe<Scalars['Boolean']>;
  total_count?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

export type SyncFeatures = {
  amount?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
};

/** Specify if you want to include or exclude trashed results from a query. */
export type Trashed =
  /** Only return trashed results. */
  | 'ONLY'
  /** Return both trashed and non-trashed results. */
  | 'WITH'
  /** Only return non-trashed results. */
  | 'WITHOUT';

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

export type UpdatePlan = {
  features?: InputMaybe<UpdateFeaturesBelongsToMany>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['Boolean']>;
  stripe_id?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  abilities: Array<Scalars['String']>;
  address?: Maybe<Address>;
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  invoices?: Maybe<Array<Maybe<StripeInvoice>>>;
  name: Scalars['String'];
  phones: Array<Phones>;
  preferred_name?: Maybe<Scalars['String']>;
  roles: Array<Scalars['String']>;
  subscription?: Maybe<CashierSubscription>;
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

export type User_CurrentFragment = { __typename?: 'User', email: string, name: string, id: string, roles: Array<string>, abilities: Array<string> };

export type LoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', email: string, name: string, id: string, roles: Array<string>, abilities: Array<string> } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', email: string, name: string, id: string, roles: Array<string>, abilities: Array<string> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'User', id: string } | null };

export type BadgeFieldsFragment = { __typename?: 'Badge', name: string };

export type GetBadgesQueryVariables = Exact<{
  page: Scalars['Int'];
  q?: InputMaybe<Scalars['String']>;
}>;


export type GetBadgesQuery = { __typename?: 'Query', badgesCount: number, badges?: { __typename?: 'BadgePaginator', data: Array<{ __typename?: 'Badge', id: string, name: string }>, paginatorInfo: { __typename?: 'PaginatorInfo', count: number, currentPage: number, lastPage: number, total: number } } | null };

export type GetBadgeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetBadgeQuery = { __typename?: 'Query', badge?: { __typename?: 'Badge', id: string, name: string } | null };

export type CreateBadgeMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateBadgeMutation = { __typename?: 'Mutation', createBadge: { __typename?: 'Badge', id: string, name: string } };

export type UpdateBadgeMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
}>;


export type UpdateBadgeMutation = { __typename?: 'Mutation', updateBadge: { __typename?: 'Badge', id: string, name: string } };

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


export type GetPlanEditQuery = { __typename?: 'Query', getPlan?: { __typename?: 'Plan', id: string, name: string, public: boolean } | null };

export type StripeDataFragmentFragment = { __typename?: 'Plan', stripe_id?: string | null, stripe_data?: { __typename?: 'StripeProductData', livemode?: boolean | null, name?: string | null, prices?: Array<{ __typename?: 'StripeProductPriceData', id: string, currency: string, unit_amount: number, nickname?: string | null, recurring?: { __typename?: 'StripePriceRecurringData', interval: string, interval_count: number } | null }> | null } | null };

export type GetPlanQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPlanQuery = { __typename?: 'Query', getPlan?: { __typename?: 'Plan', id: string, name: string, public: boolean, stripe_id?: string | null, features?: Array<{ __typename?: 'Feature', id: string, name: string, type: FeatureType, slug?: string | null, parameters?: { __typename?: 'FeatureParameters', amount?: number | null } | null }> | null, stripe_data?: { __typename?: 'StripeProductData', livemode?: boolean | null, name?: string | null, prices?: Array<{ __typename?: 'StripeProductPriceData', id: string, currency: string, unit_amount: number, nickname?: string | null, recurring?: { __typename?: 'StripePriceRecurringData', interval: string, interval_count: number } | null }> | null } | null } | null };

export type UpdatePlanStripeIdMutationVariables = Exact<{
  id: Scalars['ID'];
  stripe_id?: InputMaybe<Scalars['String']>;
}>;


export type UpdatePlanStripeIdMutation = { __typename?: 'Mutation', updatePlan: { __typename?: 'Plan', id: string, stripe_id?: string | null, stripe_data?: { __typename?: 'StripeProductData', livemode?: boolean | null, name?: string | null, prices?: Array<{ __typename?: 'StripeProductPriceData', id: string, currency: string, unit_amount: number, nickname?: string | null, recurring?: { __typename?: 'StripePriceRecurringData', interval: string, interval_count: number } | null }> | null } | null } };

export type GetPlansQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type GetPlansQuery = { __typename?: 'Query', getPlans?: { __typename?: 'PlanPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', count: number, total: number, lastPage: number }, data: Array<{ __typename?: 'Plan', id: string, name: string }> } | null };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  name: Scalars['String'];
  preferred_name?: InputMaybe<Scalars['String']>;
  phones: Array<PhonesInput> | PhonesInput;
  address: AddressInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string, name: string, preferred_name?: string | null, phones: Array<{ __typename?: 'Phones', number: string, type: string }>, address?: { __typename?: 'Address', line1: string, line2?: string | null, city: string, state: string, postal_code: string } | null } };

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


export type PriceTreeQuery = { __typename?: 'Query', getPlans?: { __typename?: 'PlanPaginator', data: Array<{ __typename?: 'Plan', id: string, name: string, stripe_data?: { __typename?: 'StripeProductData', id?: string | null, name?: string | null, prices?: Array<{ __typename?: 'StripeProductPriceData', id: string, nickname?: string | null, unit_amount: number, currency: string, recurring?: { __typename?: 'StripePriceRecurringData', interval: string, interval_count: number } | null }> | null } | null }> } | null };

export type GetUsersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['String']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users?: { __typename?: 'UserPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', lastPage: number, total: number }, data: Array<{ __typename?: 'User', id: string, name: string, email: string }> } | null };

export const User_CurrentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User_current"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"abilities"}}]}}]} as unknown as DocumentNode<User_CurrentFragment, unknown>;
export const BadgeFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"badgeFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<BadgeFieldsFragment, unknown>;
export const StripeDataFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StripeDataFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stripe_id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"livemode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"unit_amount"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"recurring"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"interval_count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<StripeDataFragmentFragment, unknown>;
export const GetFeaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFeatures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFeatures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetFeaturesQuery, GetFeaturesQueryVariables>;
export const AttachFeatureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AttachFeature"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"featureId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"features"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"connect"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"featureId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}]}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parameters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AttachFeatureMutation, AttachFeatureMutationVariables>;
export const UpdateFeatureParamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFeatureParam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"featureId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"features"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"syncWithoutDetaching"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"featureId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}]}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parameters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateFeatureParamMutation, UpdateFeatureParamMutationVariables>;
export const DetachFeatureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DetachFeature"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"plan_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"feature_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"plan_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"features"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"disconnect"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"feature_id"}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parameters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DetachFeatureMutation, DetachFeatureMutationVariables>;
export const CreateFeatureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFeature"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FeatureType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFeature"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<CreateFeatureMutation, CreateFeatureMutationVariables>;
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
export const GetBadgesDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBadges"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"badgesCount"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"q"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"badgeFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}},...BadgeFieldsFragmentDoc.definitions]} as unknown as DocumentNode<GetBadgesQuery, GetBadgesQueryVariables>;
export const GetBadgeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBadge"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"badge"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"badgeFields"}}]}}]}},...BadgeFieldsFragmentDoc.definitions]} as unknown as DocumentNode<GetBadgeQuery, GetBadgeQueryVariables>;
export const CreateBadgeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBadge"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBadge"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"badgeFields"}}]}}]}},...BadgeFieldsFragmentDoc.definitions]} as unknown as DocumentNode<CreateBadgeMutation, CreateBadgeMutationVariables>;
export const UpdateBadgeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBadge"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBadge"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"badgeFields"}}]}}]}},...BadgeFieldsFragmentDoc.definitions]} as unknown as DocumentNode<UpdateBadgeMutation, UpdateBadgeMutationVariables>;
export const CreatePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"public"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"public"},"value":{"kind":"Variable","name":{"kind":"Name","value":"public"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePlanMutation, CreatePlanMutationVariables>;
export const UpdatePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"public"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"public"},"value":{"kind":"Variable","name":{"kind":"Name","value":"public"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"public"}}]}}]}}]} as unknown as DocumentNode<UpdatePlanMutation, UpdatePlanMutationVariables>;
export const GetPlanEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlanEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"public"}}]}}]}}]} as unknown as DocumentNode<GetPlanEditQuery, GetPlanEditQueryVariables>;
export const GetPlanDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"public"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StripeDataFragment"}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"parameters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]}},...StripeDataFragmentFragmentDoc.definitions]} as unknown as DocumentNode<GetPlanQuery, GetPlanQueryVariables>;
export const UpdatePlanStripeIdDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePlanStripeId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stripe_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"stripe_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stripe_id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StripeDataFragment"}}]}}]}},...StripeDataFragmentFragmentDoc.definitions]} as unknown as DocumentNode<UpdatePlanStripeIdMutation, UpdatePlanStripeIdMutationVariables>;
export const GetPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetPlansQuery, GetPlansQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"preferred_name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phones"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PhonesInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddressInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"preferred_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"preferred_name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"phones"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phones"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"preferred_name"}},{"kind":"Field","name":{"kind":"Name","value":"phones"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"postal_code"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UserViewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserView"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_status"}}]}}]}}]}}]} as unknown as DocumentNode<UserViewQuery, UserViewQueryVariables>;
export const UserInvoicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserInvoices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"amount_remaining"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}}]} as unknown as DocumentNode<UserInvoicesQuery, UserInvoicesQueryVariables>;
export const UserMembershipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserMembership"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stripe_status"}}]}}]}}]}}]} as unknown as DocumentNode<UserMembershipQuery, UserMembershipQueryVariables>;
export const PriceTreeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PriceTree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPlans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"unit_amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"recurring"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"interval_count"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PriceTreeQuery, PriceTreeQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"24"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"q"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;