/* eslint-disable */
import * as types from './graphql'
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query GlobalSearch($q: String!) {\n    search(q: $q) {\n      data {\n        ... on User {\n          id\n          email\n          name\n        }\n        ... on Badge {\n          id\n          name\n        }\n      }\n    }\n  }\n':
    types.GlobalSearchDocument,
  '\n  fragment VolunteerHeaderBadge on User {\n    volunteer {\n      active\n      current_hour {\n        start\n      }\n    }\n  }\n':
    types.VolunteerHeaderBadgeFragmentDoc,
  '\n  query GetFeatures {\n    getFeatures {\n      id\n      type\n      name\n    }\n  }\n':
    types.GetFeaturesDocument,
  '\n  mutation AttachFeature($planId: ID!, $featureId: ID!, $amount: Int) {\n    updatePlan(\n      input: {\n        id: $planId\n        features: { connect: [{ id: $featureId, amount: $amount }] }\n      }\n    ) {\n      id\n      features {\n        id\n        type\n        name\n        parameters {\n          amount\n        }\n      }\n    }\n  }\n':
    types.AttachFeatureDocument,
  '\n  mutation UpdateFeatureParam($planId: ID!, $featureId: ID!, $amount: Int!) {\n    updatePlan(\n      input: {\n        id: $planId\n        features: {\n          syncWithoutDetaching: [{ id: $featureId, amount: $amount }]\n        }\n      }\n    ) {\n      id\n      features {\n        id\n        type\n        name\n        parameters {\n          amount\n        }\n      }\n    }\n  }\n':
    types.UpdateFeatureParamDocument,
  '\n  mutation DetachFeature($plan_id: ID!, $feature_id: ID!) {\n    updatePlan(\n      input: { id: $plan_id, features: { disconnect: [$feature_id] } }\n    ) {\n      id\n      features {\n        id\n        type\n        name\n        parameters {\n          amount\n        }\n      }\n    }\n  }\n':
    types.DetachFeatureDocument,
  '\n  mutation CreateFeature($name: String!, $type: FeatureType) {\n    createFeature(input: { name: $name, type: $type }) {\n      id\n      name\n      type\n    }\n  }\n':
    types.CreateFeatureDocument,
  '\n  mutation LoginTerminalUser($email: String!, $password: String!) {\n    loginTerminalUser(input: { email: $email, password: $password }) {\n      user {\n        id\n        name\n        email\n        terminal_pincode\n      }\n      token\n    }\n  }\n':
    types.LoginTerminalUserDocument,
  '\n  mutation LogoutTerminalUser($id: ID!) {\n    logoutTerminalUser(id: $id) {\n      id\n    }\n  }\n':
    types.LogoutTerminalUserDocument,
  '\n  fragment UserCard on User {\n    id\n    name\n    email\n    ...UserImage\n  }\n':
    types.UserCardFragmentDoc,
  '\n  fragment UserImage on User {\n    avatar {\n      srcset\n      url\n    }\n  }\n':
    types.UserImageFragmentDoc,
  '\n  fragment UserItem on User {\n    id\n    name\n    email\n    ...UserImage\n  }\n':
    types.UserItemFragmentDoc,
  '\n  query UserItem($id: ID!) {\n    user(id: $id) {\n      ...UserItem\n    }\n  }\n':
    types.UserItemDocument,
  '\n  query SelectUsers($page: Int, $search: String, $input: SearchUsersInput) {\n    users(first: 24, page: $page, input: $input, search: $search) {\n      paginatorInfo {\n        lastPage\n        total\n      }\n      data {\n        id\n        name\n        email\n        ...UserItem\n      }\n    }\n  }\n':
    types.SelectUsersDocument,
  '\n  query UserBadgeDetails($user_id: ID!, $badge_id: ID!) {\n    user(id: $user_id) {\n      id\n      name\n      email\n      badge(id: $badge_id) {\n        id\n        name\n        completion {\n          id\n          revoked\n          created_at\n          updated_at\n          notes\n          instructor {\n            ...UserItem\n          }\n          audits {\n            id\n            event\n            created_at\n            user {\n              ...UserItem\n            }\n            new_values {\n              completion {\n                instructor_id\n                notes\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.UserBadgeDetailsDocument,
  '\n  mutation UpdateUserBadges($input: UpdateUserBadgesInput!) {\n    badge {\n      updateUserBadges(input: $input) {\n        id\n      }\n    }\n  }\n':
    types.UpdateUserBadgesDocument,
  '\n  mutation UpdateBadgeUsers($input: UpdateBadgeUsersInput!) {\n    badge {\n      updateBadgeUsers(input: $input) {\n        id\n      }\n    }\n  }\n':
    types.UpdateBadgeUsersDocument,
  '\n  mutation CreateUserLocator($token: String!, $id: ID!) {\n    createLocator(\n      input: {\n        token: $token\n        type: RFID\n        target: { connect: { id: $id, type: USER } }\n      }\n    ) {\n      id\n    }\n  }\n':
    types.CreateUserLocatorDocument,
  '\n  query GetStripeProducts {\n    getAvailableStripeProducts {\n      name\n      id\n    }\n  }\n':
    types.GetStripeProductsDocument,
  '\n  mutation UpdateVolunteerActivation($input: VolunteerUpdateInput!) {\n    volunteer {\n      updateVolunteer(input: $input) {\n        id\n        active\n      }\n    }\n  }\n':
    types.UpdateVolunteerActivationDocument,
  '\n  query GeneralSettings {\n    generalSettings {\n      site_name\n    }\n  }\n':
    types.GeneralSettingsDocument,
  '\n  mutation SaveGeneralSettings($site_name: String) {\n    saveGeneralSettings(settings: { site_name: $site_name }) {\n      site_name\n    }\n  }\n':
    types.SaveGeneralSettingsDocument,
  '\n  query AdminSettings {\n    adminSettings {\n      maps_api_key\n    }\n  }\n':
    types.AdminSettingsDocument,
  '\n  mutation SaveAdminSettings($maps_api_key: String) {\n    saveAdminSettings(settings: { maps_api_key: $maps_api_key }) {\n      maps_api_key\n    }\n  }\n':
    types.SaveAdminSettingsDocument,
  '\n  query PaymentSettings {\n    paymentSettings {\n      stripe_pk\n      stripe_sk\n    }\n  }\n':
    types.PaymentSettingsDocument,
  '\n  query PublicPaymentSettings {\n    publicPaymentSettings {\n      stripe_pk\n    }\n  }\n':
    types.PublicPaymentSettingsDocument,
  '\n  mutation SavePaymentSettings($stripe_sk: String, $stripe_pk: String) {\n    savePaymentSettings(\n      settings: { stripe_sk: $stripe_sk, stripe_pk: $stripe_pk }\n    ) {\n      stripe_pk\n      stripe_sk\n    }\n  }\n':
    types.SavePaymentSettingsDocument,
  '\n  query UserExists($email: String!) {\n    userExists(email: $email)\n  }\n':
    types.UserExistsDocument,
  '\n  fragment Paginator on PaginatorInfo {\n    lastPage\n    total\n  }\n':
    types.PaginatorFragmentDoc,
  '\n  fragment User_current on User {\n    email\n    name\n    id\n    roles\n    abilities\n    avatar {\n      srcset\n      url\n    }\n  }\n':
    types.User_CurrentFragmentDoc,
  '\n  query LoggedInUser {\n    currentUser {\n      email\n      name\n      id\n      roles\n      abilities\n      avatar {\n        srcset\n        url\n      }\n      ...VolunteerHeaderBadge\n    }\n  }\n':
    types.LoggedInUserDocument,
  '\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      ...User_current\n    }\n  }\n  \n':
    types.LoginDocument,
  '\n  mutation Logout {\n    logout {\n      id\n    }\n  }\n':
    types.LogoutDocument,
  '\n  fragment badgeFields on Badge {\n    name\n    created_at\n    updated_at\n  }\n':
    types.BadgeFieldsFragmentDoc,
  '\n  query GetBadge($id: ID!) {\n    badge(id: $id) {\n      id\n      ...badgeFields\n    }\n  }\n  \n':
    types.GetBadgeDocument,
  '\n  query LocatorLookup($token: String!, $type: LocatorTypes!) {\n    locator(token: $token, type: $type) {\n      id\n      target {\n        ... on User {\n          id\n          email\n          name\n          avatar {\n            srcset\n            url\n          }\n        }\n        __typename\n      }\n    }\n  }\n':
    types.LocatorLookupDocument,
  '\n  query HelloTerminal {\n    helloTerminal {\n      name\n    }\n  }\n':
    types.HelloTerminalDocument,
  '\n  mutation UpdateBadge($id: ID!, $name: String) {\n    badge {\n      update(id: $id, input: { name: $name }) {\n        id\n        ...badgeFields\n      }\n    }\n  }\n  \n':
    types.UpdateBadgeDocument,
  '\n  mutation CreateBadge($name: String!) {\n    badge {\n      create(input: { name: $name }) {\n        id\n        ...badgeFields\n      }\n    }\n  }\n  \n':
    types.CreateBadgeDocument,
  '\n  query GetBadgesAdmin($page: Int!, $search: String, $first: Int = 25) {\n    badges(search: $search, page: $page, first: $first) {\n      data {\n        id\n        name\n      }\n      paginatorInfo {\n        currentPage\n        total\n      }\n    }\n  }\n  \n':
    types.GetBadgesAdminDocument,
  '\n  query Courses($page: Int, $search: String, $first: Int = 25) {\n    courses(page: $page, first: $first, search: $search) {\n      paginatorInfo {\n        currentPage\n        total\n      }\n      data {\n        id\n        name\n      }\n    }\n  }\n':
    types.CoursesDocument,
  '\n  query Course($id: ID!) {\n    course(id: $id) {\n      id\n      name\n      sessions {\n        id\n        publish_at\n        meetings {\n          id\n          start_at\n          end_at\n        }\n      }\n    }\n  }\n':
    types.CourseDocument,
  '\n  mutation CreateOverlay(\n    $name: String!\n    $type: OverlayType!\n    $spec: String!\n    $upload: Upload!\n  ) {\n    createOverlay(\n      input: { name: $name, type: $type, spec: $spec, upload: $upload }\n    ) {\n      id\n      spec\n      name\n      type\n      resolved_spec\n    }\n  }\n':
    types.CreateOverlayDocument,
  '\n  query Overlay($id: ID!) {\n    overlay(id: $id) {\n      id\n      resolved_spec\n      name\n      type\n    }\n  }\n':
    types.OverlayDocument,
  '\n  mutation UpdateOverlay(\n    $id: ID!\n    $name: String\n    $type: OverlayType\n    $spec: String\n    $upload: Upload\n  ) {\n    updateOverlay(\n      input: { id: $id, name: $name, type: $type, spec: $spec, upload: $upload }\n    ) {\n      id\n      name\n      type\n      resolved_spec\n      spec\n    }\n  }\n':
    types.UpdateOverlayDocument,
  '\n  query Overlays($page: Int, $search: String, $first: Int = 25) {\n    overlays(page: $page, first: $first, search: $search) {\n      paginatorInfo {\n        currentPage\n        total\n      }\n      data {\n        id\n        name\n        type\n      }\n    }\n  }\n':
    types.OverlaysDocument,
  '\n  mutation CreatePlan($name: String!, $public: Boolean!) {\n    createPlan(input: { name: $name, public: $public }) {\n      id\n    }\n  }\n':
    types.CreatePlanDocument,
  '\n  mutation UpdatePlan($name: String, $public: Boolean, $id: ID!) {\n    updatePlan(input: { id: $id, name: $name, public: $public }) {\n      id\n      name\n      public\n    }\n  }\n':
    types.UpdatePlanDocument,
  '\n  query GetPlanEdit($id: ID!) {\n    plan(id: $id) {\n      id\n      name\n      public\n    }\n  }\n':
    types.GetPlanEditDocument,
  '\n  query Plans($page: Int!) {\n    plans(page: $page) {\n      paginatorInfo {\n        count\n        total\n        lastPage\n      }\n      data {\n        id\n        name\n      }\n    }\n  }\n':
    types.PlansDocument,
  '\n  fragment StripeDataFragment on Plan {\n    stripe_id\n    stripe_data {\n      livemode\n      name\n      prices {\n        id\n        currency\n        unit_amount\n        nickname\n        recurring {\n          interval\n          interval_count\n        }\n      }\n    }\n  }\n':
    types.StripeDataFragmentFragmentDoc,
  '\n  query GetPlan($id: ID!) {\n    plan(id: $id) {\n      id\n      name\n      public\n      ...StripeDataFragment\n      features {\n        id\n        name\n        type\n        slug\n        parameters {\n          amount\n        }\n      }\n    }\n  }\n  \n':
    types.GetPlanDocument,
  '\n  mutation UpdatePlanStripeId($id: ID!, $stripe_id: String) {\n    updatePlan(input: { id: $id, stripe_id: $stripe_id }) {\n      id\n      ...StripeDataFragment\n    }\n  }\n  \n':
    types.UpdatePlanStripeIdDocument,
  '\n  query Terminals($page: Int, $search: String, $first: Int = 25) {\n    terminals(page: $page, first: $first, search: $search) {\n      paginatorInfo {\n        currentPage\n        total\n      }\n      data {\n        id\n        name\n        tokens {\n          name\n          last_used_at\n        }\n      }\n    }\n  }\n':
    types.TerminalsDocument,
  '\n  mutation RevokeTerminal($id: ID!) {\n    revokeTerminal(id: $id) {\n      id\n    }\n  }\n':
    types.RevokeTerminalDocument,
  '\n  mutation RegisterTerminal($name: String!, $slug: String!) {\n    registerTerminal(input: { name: $name, slug: $slug }) {\n      id\n      name\n    }\n  }\n':
    types.RegisterTerminalDocument,
  '\n  query Volunteers(\n    $search: String\n    $active: Boolean\n    $punchedIn: Boolean\n    $page: Int\n    $first: Int = 25\n  ) {\n    users(\n      page: $page\n      first: $first\n      search: $search\n      input: { activeVolunteer: $active, punchedInVolunteer: $punchedIn }\n    ) {\n      paginatorInfo {\n        currentPage\n        total\n      }\n      data {\n        ...UserItem\n        id\n        roles\n        volunteer {\n          active\n          created_at\n          hour_tenths_available\n          hour_tenths_redeemed\n        }\n      }\n    }\n  }\n':
    types.VolunteersDocument,
  '\n  mutation ToggleVolunteer($id: ID!, $active: Boolean!) {\n    volunteer {\n      updateVolunteer(input: { id: $id, active: $active }) {\n        id\n        active\n      }\n    }\n  }\n':
    types.ToggleVolunteerDocument,
  '\n  query VolunteerView($id: ID!) {\n    volunteer(id: $id) {\n      id\n      user {\n        id\n        name\n        email\n        ...UserImage\n      }\n    }\n  }\n':
    types.VolunteerViewDocument,
  '\n  query VolunteerHours(\n    $id: ID!\n    $page: Int!\n    $first: Int!\n    $orderBy: [VolunteerHoursOrderByOrderByClause!]\n    $input: VolunteerHoursInput\n  ) {\n    volunteer(id: $id) {\n      id\n      hours(first: $first, page: $page, input: $input, orderBy: $orderBy) {\n        paginatorInfo {\n          ...Paginator\n        }\n        data {\n          id\n          start\n          end\n          length\n          approved\n          supervisor {\n            ...UserItem\n          }\n        }\n      }\n    }\n  }\n':
    types.VolunteerHoursDocument,
  '\n  query GetBadges($page: Int!, $search: String, $first: Int = 25) {\n    badges(search: $search, page: $page, first: $first) {\n      data {\n        id\n        name\n      }\n      paginatorInfo {\n        currentPage\n        total\n      }\n    }\n  }\n':
    types.GetBadgesDocument,
  '\n  query GetBadgeUsers(\n    $id: ID!\n    $page: Int!\n    $search: String\n    $first: Int = 25\n  ) {\n    badge(id: $id) {\n      id\n      name\n      users(q: $search, page: $page, first: $first) {\n        data {\n          id\n          ...UserItem\n          completion {\n            created_at\n            notes\n            instructor {\n              ...UserItem\n            }\n          }\n        }\n        paginatorInfo {\n          currentPage\n          total\n        }\n      }\n    }\n  }\n':
    types.GetBadgeUsersDocument,
  '\n  mutation ActivateTerminal($slug: String!) {\n    activateTerminal(slug: $slug) {\n      plainTextToken\n    }\n  }\n':
    types.ActivateTerminalDocument,
  '\n  mutation CreateUser(\n    $email: String!\n    $name: String!\n    $preferred_name: String\n    $phones: [PhonesInput!]!\n    $address: AddressInput!\n  ) {\n    createUser(\n      input: {\n        email: $email\n        name: $name\n        preferred_name: $preferred_name\n        phones: $phones\n        address: $address\n      }\n    ) {\n      id\n      email\n      name\n      preferred_name\n      phones {\n        number\n        type\n      }\n      address {\n        line1\n        line2\n        city\n        state\n        postal_code\n      }\n    }\n  }\n':
    types.CreateUserDocument,
  '\n  query GetUsers($page: Int, $q: String) {\n    users(first: 24, page: $page, search: $q) {\n      paginatorInfo {\n        lastPage\n        total\n      }\n      data {\n        id\n        name\n        email\n        ...UserCard\n      }\n    }\n  }\n':
    types.GetUsersDocument,
  '\n  query UserView($id: ID, $email: String) {\n    user(id: $id, email: $email) {\n      email\n      name\n      id\n      subscription {\n        id\n        stripe_status\n      }\n      ...UserImage\n    }\n  }\n':
    types.UserViewDocument,
  '\n  query UserBadges($id: ID!, $page: Int!, $search: String, $first: Int = 25) {\n    user(id: $id) {\n      id\n      badges(q: $search, page: $page, first: $first) {\n        data {\n          id\n          name\n          completion {\n            id\n            revoked\n            created_at\n            notes\n            instructor_id\n            instructor {\n              ...UserItem\n            }\n          }\n        }\n        paginatorInfo {\n          currentPage\n          total\n        }\n      }\n    }\n  }\n':
    types.UserBadgesDocument,
  '\n  query UserInvoices($id: ID!) {\n    user(id: $id) {\n      invoices {\n        id\n        number\n        status\n        amount_remaining\n        currency\n      }\n    }\n  }\n':
    types.UserInvoicesDocument,
  '\n  query UserMembership($id: ID!) {\n    user(id: $id) {\n      subscription {\n        stripe_status\n      }\n    }\n  }\n':
    types.UserMembershipDocument,
  '\n  query PriceTree {\n    plans {\n      data {\n        id\n        name\n        stripe_data {\n          id\n          name\n          prices {\n            id\n            nickname\n            unit_amount\n            currency\n            recurring {\n              interval\n              interval_count\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.PriceTreeDocument,
  '\n  mutation UploadAvatar($id: ID!, $avatar: Upload) {\n    updateUser(input: { id: $id, avatar: $avatar }) {\n      id\n      avatar {\n        url\n      }\n    }\n  }\n':
    types.UploadAvatarDocument,
  '\n  query UserProfile($id: ID) {\n    user(id: $id) {\n      id\n      email\n      email_verified_at\n      name\n      preferred_name\n      address {\n        line1\n        line2\n        city\n        state\n        postal_code\n      }\n      name\n    }\n  }\n':
    types.UserProfileDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GlobalSearch($q: String!) {\n    search(q: $q) {\n      data {\n        ... on User {\n          id\n          email\n          name\n        }\n        ... on Badge {\n          id\n          name\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GlobalSearch($q: String!) {\n    search(q: $q) {\n      data {\n        ... on User {\n          id\n          email\n          name\n        }\n        ... on Badge {\n          id\n          name\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment VolunteerHeaderBadge on User {\n    volunteer {\n      active\n      current_hour {\n        start\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment VolunteerHeaderBadge on User {\n    volunteer {\n      active\n      current_hour {\n        start\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetFeatures {\n    getFeatures {\n      id\n      type\n      name\n    }\n  }\n'
): (typeof documents)['\n  query GetFeatures {\n    getFeatures {\n      id\n      type\n      name\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AttachFeature($planId: ID!, $featureId: ID!, $amount: Int) {\n    updatePlan(\n      input: {\n        id: $planId\n        features: { connect: [{ id: $featureId, amount: $amount }] }\n      }\n    ) {\n      id\n      features {\n        id\n        type\n        name\n        parameters {\n          amount\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation AttachFeature($planId: ID!, $featureId: ID!, $amount: Int) {\n    updatePlan(\n      input: {\n        id: $planId\n        features: { connect: [{ id: $featureId, amount: $amount }] }\n      }\n    ) {\n      id\n      features {\n        id\n        type\n        name\n        parameters {\n          amount\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateFeatureParam($planId: ID!, $featureId: ID!, $amount: Int!) {\n    updatePlan(\n      input: {\n        id: $planId\n        features: {\n          syncWithoutDetaching: [{ id: $featureId, amount: $amount }]\n        }\n      }\n    ) {\n      id\n      features {\n        id\n        type\n        name\n        parameters {\n          amount\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateFeatureParam($planId: ID!, $featureId: ID!, $amount: Int!) {\n    updatePlan(\n      input: {\n        id: $planId\n        features: {\n          syncWithoutDetaching: [{ id: $featureId, amount: $amount }]\n        }\n      }\n    ) {\n      id\n      features {\n        id\n        type\n        name\n        parameters {\n          amount\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DetachFeature($plan_id: ID!, $feature_id: ID!) {\n    updatePlan(\n      input: { id: $plan_id, features: { disconnect: [$feature_id] } }\n    ) {\n      id\n      features {\n        id\n        type\n        name\n        parameters {\n          amount\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation DetachFeature($plan_id: ID!, $feature_id: ID!) {\n    updatePlan(\n      input: { id: $plan_id, features: { disconnect: [$feature_id] } }\n    ) {\n      id\n      features {\n        id\n        type\n        name\n        parameters {\n          amount\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateFeature($name: String!, $type: FeatureType) {\n    createFeature(input: { name: $name, type: $type }) {\n      id\n      name\n      type\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateFeature($name: String!, $type: FeatureType) {\n    createFeature(input: { name: $name, type: $type }) {\n      id\n      name\n      type\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation LoginTerminalUser($email: String!, $password: String!) {\n    loginTerminalUser(input: { email: $email, password: $password }) {\n      user {\n        id\n        name\n        email\n        terminal_pincode\n      }\n      token\n    }\n  }\n'
): (typeof documents)['\n  mutation LoginTerminalUser($email: String!, $password: String!) {\n    loginTerminalUser(input: { email: $email, password: $password }) {\n      user {\n        id\n        name\n        email\n        terminal_pincode\n      }\n      token\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation LogoutTerminalUser($id: ID!) {\n    logoutTerminalUser(id: $id) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation LogoutTerminalUser($id: ID!) {\n    logoutTerminalUser(id: $id) {\n      id\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment UserCard on User {\n    id\n    name\n    email\n    ...UserImage\n  }\n'
): (typeof documents)['\n  fragment UserCard on User {\n    id\n    name\n    email\n    ...UserImage\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment UserImage on User {\n    avatar {\n      srcset\n      url\n    }\n  }\n'
): (typeof documents)['\n  fragment UserImage on User {\n    avatar {\n      srcset\n      url\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment UserItem on User {\n    id\n    name\n    email\n    ...UserImage\n  }\n'
): (typeof documents)['\n  fragment UserItem on User {\n    id\n    name\n    email\n    ...UserImage\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query UserItem($id: ID!) {\n    user(id: $id) {\n      ...UserItem\n    }\n  }\n'
): (typeof documents)['\n  query UserItem($id: ID!) {\n    user(id: $id) {\n      ...UserItem\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query SelectUsers($page: Int, $search: String, $input: SearchUsersInput) {\n    users(first: 24, page: $page, input: $input, search: $search) {\n      paginatorInfo {\n        lastPage\n        total\n      }\n      data {\n        id\n        name\n        email\n        ...UserItem\n      }\n    }\n  }\n'
): (typeof documents)['\n  query SelectUsers($page: Int, $search: String, $input: SearchUsersInput) {\n    users(first: 24, page: $page, input: $input, search: $search) {\n      paginatorInfo {\n        lastPage\n        total\n      }\n      data {\n        id\n        name\n        email\n        ...UserItem\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query UserBadgeDetails($user_id: ID!, $badge_id: ID!) {\n    user(id: $user_id) {\n      id\n      name\n      email\n      badge(id: $badge_id) {\n        id\n        name\n        completion {\n          id\n          revoked\n          created_at\n          updated_at\n          notes\n          instructor {\n            ...UserItem\n          }\n          audits {\n            id\n            event\n            created_at\n            user {\n              ...UserItem\n            }\n            new_values {\n              completion {\n                instructor_id\n                notes\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query UserBadgeDetails($user_id: ID!, $badge_id: ID!) {\n    user(id: $user_id) {\n      id\n      name\n      email\n      badge(id: $badge_id) {\n        id\n        name\n        completion {\n          id\n          revoked\n          created_at\n          updated_at\n          notes\n          instructor {\n            ...UserItem\n          }\n          audits {\n            id\n            event\n            created_at\n            user {\n              ...UserItem\n            }\n            new_values {\n              completion {\n                instructor_id\n                notes\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateUserBadges($input: UpdateUserBadgesInput!) {\n    badge {\n      updateUserBadges(input: $input) {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateUserBadges($input: UpdateUserBadgesInput!) {\n    badge {\n      updateUserBadges(input: $input) {\n        id\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateBadgeUsers($input: UpdateBadgeUsersInput!) {\n    badge {\n      updateBadgeUsers(input: $input) {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateBadgeUsers($input: UpdateBadgeUsersInput!) {\n    badge {\n      updateBadgeUsers(input: $input) {\n        id\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateUserLocator($token: String!, $id: ID!) {\n    createLocator(\n      input: {\n        token: $token\n        type: RFID\n        target: { connect: { id: $id, type: USER } }\n      }\n    ) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateUserLocator($token: String!, $id: ID!) {\n    createLocator(\n      input: {\n        token: $token\n        type: RFID\n        target: { connect: { id: $id, type: USER } }\n      }\n    ) {\n      id\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetStripeProducts {\n    getAvailableStripeProducts {\n      name\n      id\n    }\n  }\n'
): (typeof documents)['\n  query GetStripeProducts {\n    getAvailableStripeProducts {\n      name\n      id\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateVolunteerActivation($input: VolunteerUpdateInput!) {\n    volunteer {\n      updateVolunteer(input: $input) {\n        id\n        active\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateVolunteerActivation($input: VolunteerUpdateInput!) {\n    volunteer {\n      updateVolunteer(input: $input) {\n        id\n        active\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GeneralSettings {\n    generalSettings {\n      site_name\n    }\n  }\n'
): (typeof documents)['\n  query GeneralSettings {\n    generalSettings {\n      site_name\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SaveGeneralSettings($site_name: String) {\n    saveGeneralSettings(settings: { site_name: $site_name }) {\n      site_name\n    }\n  }\n'
): (typeof documents)['\n  mutation SaveGeneralSettings($site_name: String) {\n    saveGeneralSettings(settings: { site_name: $site_name }) {\n      site_name\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query AdminSettings {\n    adminSettings {\n      maps_api_key\n    }\n  }\n'
): (typeof documents)['\n  query AdminSettings {\n    adminSettings {\n      maps_api_key\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SaveAdminSettings($maps_api_key: String) {\n    saveAdminSettings(settings: { maps_api_key: $maps_api_key }) {\n      maps_api_key\n    }\n  }\n'
): (typeof documents)['\n  mutation SaveAdminSettings($maps_api_key: String) {\n    saveAdminSettings(settings: { maps_api_key: $maps_api_key }) {\n      maps_api_key\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query PaymentSettings {\n    paymentSettings {\n      stripe_pk\n      stripe_sk\n    }\n  }\n'
): (typeof documents)['\n  query PaymentSettings {\n    paymentSettings {\n      stripe_pk\n      stripe_sk\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query PublicPaymentSettings {\n    publicPaymentSettings {\n      stripe_pk\n    }\n  }\n'
): (typeof documents)['\n  query PublicPaymentSettings {\n    publicPaymentSettings {\n      stripe_pk\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SavePaymentSettings($stripe_sk: String, $stripe_pk: String) {\n    savePaymentSettings(\n      settings: { stripe_sk: $stripe_sk, stripe_pk: $stripe_pk }\n    ) {\n      stripe_pk\n      stripe_sk\n    }\n  }\n'
): (typeof documents)['\n  mutation SavePaymentSettings($stripe_sk: String, $stripe_pk: String) {\n    savePaymentSettings(\n      settings: { stripe_sk: $stripe_sk, stripe_pk: $stripe_pk }\n    ) {\n      stripe_pk\n      stripe_sk\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query UserExists($email: String!) {\n    userExists(email: $email)\n  }\n'
): (typeof documents)['\n  query UserExists($email: String!) {\n    userExists(email: $email)\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Paginator on PaginatorInfo {\n    lastPage\n    total\n  }\n'
): (typeof documents)['\n  fragment Paginator on PaginatorInfo {\n    lastPage\n    total\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment User_current on User {\n    email\n    name\n    id\n    roles\n    abilities\n    avatar {\n      srcset\n      url\n    }\n  }\n'
): (typeof documents)['\n  fragment User_current on User {\n    email\n    name\n    id\n    roles\n    abilities\n    avatar {\n      srcset\n      url\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query LoggedInUser {\n    currentUser {\n      email\n      name\n      id\n      roles\n      abilities\n      avatar {\n        srcset\n        url\n      }\n      ...VolunteerHeaderBadge\n    }\n  }\n'
): (typeof documents)['\n  query LoggedInUser {\n    currentUser {\n      email\n      name\n      id\n      roles\n      abilities\n      avatar {\n        srcset\n        url\n      }\n      ...VolunteerHeaderBadge\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      ...User_current\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      ...User_current\n    }\n  }\n  \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation Logout {\n    logout {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation Logout {\n    logout {\n      id\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment badgeFields on Badge {\n    name\n    created_at\n    updated_at\n  }\n'
): (typeof documents)['\n  fragment badgeFields on Badge {\n    name\n    created_at\n    updated_at\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetBadge($id: ID!) {\n    badge(id: $id) {\n      id\n      ...badgeFields\n    }\n  }\n  \n'
): (typeof documents)['\n  query GetBadge($id: ID!) {\n    badge(id: $id) {\n      id\n      ...badgeFields\n    }\n  }\n  \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query LocatorLookup($token: String!, $type: LocatorTypes!) {\n    locator(token: $token, type: $type) {\n      id\n      target {\n        ... on User {\n          id\n          email\n          name\n          avatar {\n            srcset\n            url\n          }\n        }\n        __typename\n      }\n    }\n  }\n'
): (typeof documents)['\n  query LocatorLookup($token: String!, $type: LocatorTypes!) {\n    locator(token: $token, type: $type) {\n      id\n      target {\n        ... on User {\n          id\n          email\n          name\n          avatar {\n            srcset\n            url\n          }\n        }\n        __typename\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query HelloTerminal {\n    helloTerminal {\n      name\n    }\n  }\n'
): (typeof documents)['\n  query HelloTerminal {\n    helloTerminal {\n      name\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateBadge($id: ID!, $name: String) {\n    badge {\n      update(id: $id, input: { name: $name }) {\n        id\n        ...badgeFields\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation UpdateBadge($id: ID!, $name: String) {\n    badge {\n      update(id: $id, input: { name: $name }) {\n        id\n        ...badgeFields\n      }\n    }\n  }\n  \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateBadge($name: String!) {\n    badge {\n      create(input: { name: $name }) {\n        id\n        ...badgeFields\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation CreateBadge($name: String!) {\n    badge {\n      create(input: { name: $name }) {\n        id\n        ...badgeFields\n      }\n    }\n  }\n  \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetBadgesAdmin($page: Int!, $search: String, $first: Int = 25) {\n    badges(search: $search, page: $page, first: $first) {\n      data {\n        id\n        name\n      }\n      paginatorInfo {\n        currentPage\n        total\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  query GetBadgesAdmin($page: Int!, $search: String, $first: Int = 25) {\n    badges(search: $search, page: $page, first: $first) {\n      data {\n        id\n        name\n      }\n      paginatorInfo {\n        currentPage\n        total\n      }\n    }\n  }\n  \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Courses($page: Int, $search: String, $first: Int = 25) {\n    courses(page: $page, first: $first, search: $search) {\n      paginatorInfo {\n        currentPage\n        total\n      }\n      data {\n        id\n        name\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Courses($page: Int, $search: String, $first: Int = 25) {\n    courses(page: $page, first: $first, search: $search) {\n      paginatorInfo {\n        currentPage\n        total\n      }\n      data {\n        id\n        name\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Course($id: ID!) {\n    course(id: $id) {\n      id\n      name\n      sessions {\n        id\n        publish_at\n        meetings {\n          id\n          start_at\n          end_at\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Course($id: ID!) {\n    course(id: $id) {\n      id\n      name\n      sessions {\n        id\n        publish_at\n        meetings {\n          id\n          start_at\n          end_at\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateOverlay(\n    $name: String!\n    $type: OverlayType!\n    $spec: String!\n    $upload: Upload!\n  ) {\n    createOverlay(\n      input: { name: $name, type: $type, spec: $spec, upload: $upload }\n    ) {\n      id\n      spec\n      name\n      type\n      resolved_spec\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateOverlay(\n    $name: String!\n    $type: OverlayType!\n    $spec: String!\n    $upload: Upload!\n  ) {\n    createOverlay(\n      input: { name: $name, type: $type, spec: $spec, upload: $upload }\n    ) {\n      id\n      spec\n      name\n      type\n      resolved_spec\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Overlay($id: ID!) {\n    overlay(id: $id) {\n      id\n      resolved_spec\n      name\n      type\n    }\n  }\n'
): (typeof documents)['\n  query Overlay($id: ID!) {\n    overlay(id: $id) {\n      id\n      resolved_spec\n      name\n      type\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateOverlay(\n    $id: ID!\n    $name: String\n    $type: OverlayType\n    $spec: String\n    $upload: Upload\n  ) {\n    updateOverlay(\n      input: { id: $id, name: $name, type: $type, spec: $spec, upload: $upload }\n    ) {\n      id\n      name\n      type\n      resolved_spec\n      spec\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateOverlay(\n    $id: ID!\n    $name: String\n    $type: OverlayType\n    $spec: String\n    $upload: Upload\n  ) {\n    updateOverlay(\n      input: { id: $id, name: $name, type: $type, spec: $spec, upload: $upload }\n    ) {\n      id\n      name\n      type\n      resolved_spec\n      spec\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Overlays($page: Int, $search: String, $first: Int = 25) {\n    overlays(page: $page, first: $first, search: $search) {\n      paginatorInfo {\n        currentPage\n        total\n      }\n      data {\n        id\n        name\n        type\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Overlays($page: Int, $search: String, $first: Int = 25) {\n    overlays(page: $page, first: $first, search: $search) {\n      paginatorInfo {\n        currentPage\n        total\n      }\n      data {\n        id\n        name\n        type\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreatePlan($name: String!, $public: Boolean!) {\n    createPlan(input: { name: $name, public: $public }) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation CreatePlan($name: String!, $public: Boolean!) {\n    createPlan(input: { name: $name, public: $public }) {\n      id\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdatePlan($name: String, $public: Boolean, $id: ID!) {\n    updatePlan(input: { id: $id, name: $name, public: $public }) {\n      id\n      name\n      public\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdatePlan($name: String, $public: Boolean, $id: ID!) {\n    updatePlan(input: { id: $id, name: $name, public: $public }) {\n      id\n      name\n      public\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetPlanEdit($id: ID!) {\n    plan(id: $id) {\n      id\n      name\n      public\n    }\n  }\n'
): (typeof documents)['\n  query GetPlanEdit($id: ID!) {\n    plan(id: $id) {\n      id\n      name\n      public\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Plans($page: Int!) {\n    plans(page: $page) {\n      paginatorInfo {\n        count\n        total\n        lastPage\n      }\n      data {\n        id\n        name\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Plans($page: Int!) {\n    plans(page: $page) {\n      paginatorInfo {\n        count\n        total\n        lastPage\n      }\n      data {\n        id\n        name\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment StripeDataFragment on Plan {\n    stripe_id\n    stripe_data {\n      livemode\n      name\n      prices {\n        id\n        currency\n        unit_amount\n        nickname\n        recurring {\n          interval\n          interval_count\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment StripeDataFragment on Plan {\n    stripe_id\n    stripe_data {\n      livemode\n      name\n      prices {\n        id\n        currency\n        unit_amount\n        nickname\n        recurring {\n          interval\n          interval_count\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetPlan($id: ID!) {\n    plan(id: $id) {\n      id\n      name\n      public\n      ...StripeDataFragment\n      features {\n        id\n        name\n        type\n        slug\n        parameters {\n          amount\n        }\n      }\n    }\n  }\n  \n'
): (typeof documents)['\n  query GetPlan($id: ID!) {\n    plan(id: $id) {\n      id\n      name\n      public\n      ...StripeDataFragment\n      features {\n        id\n        name\n        type\n        slug\n        parameters {\n          amount\n        }\n      }\n    }\n  }\n  \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdatePlanStripeId($id: ID!, $stripe_id: String) {\n    updatePlan(input: { id: $id, stripe_id: $stripe_id }) {\n      id\n      ...StripeDataFragment\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation UpdatePlanStripeId($id: ID!, $stripe_id: String) {\n    updatePlan(input: { id: $id, stripe_id: $stripe_id }) {\n      id\n      ...StripeDataFragment\n    }\n  }\n  \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Terminals($page: Int, $search: String, $first: Int = 25) {\n    terminals(page: $page, first: $first, search: $search) {\n      paginatorInfo {\n        currentPage\n        total\n      }\n      data {\n        id\n        name\n        tokens {\n          name\n          last_used_at\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Terminals($page: Int, $search: String, $first: Int = 25) {\n    terminals(page: $page, first: $first, search: $search) {\n      paginatorInfo {\n        currentPage\n        total\n      }\n      data {\n        id\n        name\n        tokens {\n          name\n          last_used_at\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RevokeTerminal($id: ID!) {\n    revokeTerminal(id: $id) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation RevokeTerminal($id: ID!) {\n    revokeTerminal(id: $id) {\n      id\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RegisterTerminal($name: String!, $slug: String!) {\n    registerTerminal(input: { name: $name, slug: $slug }) {\n      id\n      name\n    }\n  }\n'
): (typeof documents)['\n  mutation RegisterTerminal($name: String!, $slug: String!) {\n    registerTerminal(input: { name: $name, slug: $slug }) {\n      id\n      name\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Volunteers(\n    $search: String\n    $active: Boolean\n    $punchedIn: Boolean\n    $page: Int\n    $first: Int = 25\n  ) {\n    users(\n      page: $page\n      first: $first\n      search: $search\n      input: { activeVolunteer: $active, punchedInVolunteer: $punchedIn }\n    ) {\n      paginatorInfo {\n        currentPage\n        total\n      }\n      data {\n        ...UserItem\n        id\n        roles\n        volunteer {\n          active\n          created_at\n          hour_tenths_available\n          hour_tenths_redeemed\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Volunteers(\n    $search: String\n    $active: Boolean\n    $punchedIn: Boolean\n    $page: Int\n    $first: Int = 25\n  ) {\n    users(\n      page: $page\n      first: $first\n      search: $search\n      input: { activeVolunteer: $active, punchedInVolunteer: $punchedIn }\n    ) {\n      paginatorInfo {\n        currentPage\n        total\n      }\n      data {\n        ...UserItem\n        id\n        roles\n        volunteer {\n          active\n          created_at\n          hour_tenths_available\n          hour_tenths_redeemed\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ToggleVolunteer($id: ID!, $active: Boolean!) {\n    volunteer {\n      updateVolunteer(input: { id: $id, active: $active }) {\n        id\n        active\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation ToggleVolunteer($id: ID!, $active: Boolean!) {\n    volunteer {\n      updateVolunteer(input: { id: $id, active: $active }) {\n        id\n        active\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query VolunteerView($id: ID!) {\n    volunteer(id: $id) {\n      id\n      user {\n        id\n        name\n        email\n        ...UserImage\n      }\n    }\n  }\n'
): (typeof documents)['\n  query VolunteerView($id: ID!) {\n    volunteer(id: $id) {\n      id\n      user {\n        id\n        name\n        email\n        ...UserImage\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query VolunteerHours(\n    $id: ID!\n    $page: Int!\n    $first: Int!\n    $orderBy: [VolunteerHoursOrderByOrderByClause!]\n    $input: VolunteerHoursInput\n  ) {\n    volunteer(id: $id) {\n      id\n      hours(first: $first, page: $page, input: $input, orderBy: $orderBy) {\n        paginatorInfo {\n          ...Paginator\n        }\n        data {\n          id\n          start\n          end\n          length\n          approved\n          supervisor {\n            ...UserItem\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query VolunteerHours(\n    $id: ID!\n    $page: Int!\n    $first: Int!\n    $orderBy: [VolunteerHoursOrderByOrderByClause!]\n    $input: VolunteerHoursInput\n  ) {\n    volunteer(id: $id) {\n      id\n      hours(first: $first, page: $page, input: $input, orderBy: $orderBy) {\n        paginatorInfo {\n          ...Paginator\n        }\n        data {\n          id\n          start\n          end\n          length\n          approved\n          supervisor {\n            ...UserItem\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetBadges($page: Int!, $search: String, $first: Int = 25) {\n    badges(search: $search, page: $page, first: $first) {\n      data {\n        id\n        name\n      }\n      paginatorInfo {\n        currentPage\n        total\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetBadges($page: Int!, $search: String, $first: Int = 25) {\n    badges(search: $search, page: $page, first: $first) {\n      data {\n        id\n        name\n      }\n      paginatorInfo {\n        currentPage\n        total\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetBadgeUsers(\n    $id: ID!\n    $page: Int!\n    $search: String\n    $first: Int = 25\n  ) {\n    badge(id: $id) {\n      id\n      name\n      users(q: $search, page: $page, first: $first) {\n        data {\n          id\n          ...UserItem\n          completion {\n            created_at\n            notes\n            instructor {\n              ...UserItem\n            }\n          }\n        }\n        paginatorInfo {\n          currentPage\n          total\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetBadgeUsers(\n    $id: ID!\n    $page: Int!\n    $search: String\n    $first: Int = 25\n  ) {\n    badge(id: $id) {\n      id\n      name\n      users(q: $search, page: $page, first: $first) {\n        data {\n          id\n          ...UserItem\n          completion {\n            created_at\n            notes\n            instructor {\n              ...UserItem\n            }\n          }\n        }\n        paginatorInfo {\n          currentPage\n          total\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ActivateTerminal($slug: String!) {\n    activateTerminal(slug: $slug) {\n      plainTextToken\n    }\n  }\n'
): (typeof documents)['\n  mutation ActivateTerminal($slug: String!) {\n    activateTerminal(slug: $slug) {\n      plainTextToken\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateUser(\n    $email: String!\n    $name: String!\n    $preferred_name: String\n    $phones: [PhonesInput!]!\n    $address: AddressInput!\n  ) {\n    createUser(\n      input: {\n        email: $email\n        name: $name\n        preferred_name: $preferred_name\n        phones: $phones\n        address: $address\n      }\n    ) {\n      id\n      email\n      name\n      preferred_name\n      phones {\n        number\n        type\n      }\n      address {\n        line1\n        line2\n        city\n        state\n        postal_code\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateUser(\n    $email: String!\n    $name: String!\n    $preferred_name: String\n    $phones: [PhonesInput!]!\n    $address: AddressInput!\n  ) {\n    createUser(\n      input: {\n        email: $email\n        name: $name\n        preferred_name: $preferred_name\n        phones: $phones\n        address: $address\n      }\n    ) {\n      id\n      email\n      name\n      preferred_name\n      phones {\n        number\n        type\n      }\n      address {\n        line1\n        line2\n        city\n        state\n        postal_code\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetUsers($page: Int, $q: String) {\n    users(first: 24, page: $page, search: $q) {\n      paginatorInfo {\n        lastPage\n        total\n      }\n      data {\n        id\n        name\n        email\n        ...UserCard\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetUsers($page: Int, $q: String) {\n    users(first: 24, page: $page, search: $q) {\n      paginatorInfo {\n        lastPage\n        total\n      }\n      data {\n        id\n        name\n        email\n        ...UserCard\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query UserView($id: ID, $email: String) {\n    user(id: $id, email: $email) {\n      email\n      name\n      id\n      subscription {\n        id\n        stripe_status\n      }\n      ...UserImage\n    }\n  }\n'
): (typeof documents)['\n  query UserView($id: ID, $email: String) {\n    user(id: $id, email: $email) {\n      email\n      name\n      id\n      subscription {\n        id\n        stripe_status\n      }\n      ...UserImage\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query UserBadges($id: ID!, $page: Int!, $search: String, $first: Int = 25) {\n    user(id: $id) {\n      id\n      badges(q: $search, page: $page, first: $first) {\n        data {\n          id\n          name\n          completion {\n            id\n            revoked\n            created_at\n            notes\n            instructor_id\n            instructor {\n              ...UserItem\n            }\n          }\n        }\n        paginatorInfo {\n          currentPage\n          total\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query UserBadges($id: ID!, $page: Int!, $search: String, $first: Int = 25) {\n    user(id: $id) {\n      id\n      badges(q: $search, page: $page, first: $first) {\n        data {\n          id\n          name\n          completion {\n            id\n            revoked\n            created_at\n            notes\n            instructor_id\n            instructor {\n              ...UserItem\n            }\n          }\n        }\n        paginatorInfo {\n          currentPage\n          total\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query UserInvoices($id: ID!) {\n    user(id: $id) {\n      invoices {\n        id\n        number\n        status\n        amount_remaining\n        currency\n      }\n    }\n  }\n'
): (typeof documents)['\n  query UserInvoices($id: ID!) {\n    user(id: $id) {\n      invoices {\n        id\n        number\n        status\n        amount_remaining\n        currency\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query UserMembership($id: ID!) {\n    user(id: $id) {\n      subscription {\n        stripe_status\n      }\n    }\n  }\n'
): (typeof documents)['\n  query UserMembership($id: ID!) {\n    user(id: $id) {\n      subscription {\n        stripe_status\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query PriceTree {\n    plans {\n      data {\n        id\n        name\n        stripe_data {\n          id\n          name\n          prices {\n            id\n            nickname\n            unit_amount\n            currency\n            recurring {\n              interval\n              interval_count\n            }\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query PriceTree {\n    plans {\n      data {\n        id\n        name\n        stripe_data {\n          id\n          name\n          prices {\n            id\n            nickname\n            unit_amount\n            currency\n            recurring {\n              interval\n              interval_count\n            }\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UploadAvatar($id: ID!, $avatar: Upload) {\n    updateUser(input: { id: $id, avatar: $avatar }) {\n      id\n      avatar {\n        url\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation UploadAvatar($id: ID!, $avatar: Upload) {\n    updateUser(input: { id: $id, avatar: $avatar }) {\n      id\n      avatar {\n        url\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query UserProfile($id: ID) {\n    user(id: $id) {\n      id\n      email\n      email_verified_at\n      name\n      preferred_name\n      address {\n        line1\n        line2\n        city\n        state\n        postal_code\n      }\n      name\n    }\n  }\n'
): (typeof documents)['\n  query UserProfile($id: ID) {\n    user(id: $id) {\n      id\n      email\n      email_verified_at\n      name\n      preferred_name\n      address {\n        line1\n        line2\n        city\n        state\n        postal_code\n      }\n      name\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
