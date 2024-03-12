/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'unplugin-vue-router/types'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/admin': RouteRecordInfo<'/admin', '/admin', Record<never, never>, Record<never, never>>,
    'settings:index': RouteRecordInfo<'settings:index', '/admin', Record<never, never>, Record<never, never>>,
    '/admin/badges': RouteRecordInfo<'/admin/badges', '/admin/badges', Record<never, never>, Record<never, never>>,
    'settings:badges': RouteRecordInfo<'settings:badges', '/admin/badges', Record<never, never>, Record<never, never>>,
    'settings:badges:view': RouteRecordInfo<'settings:badges:view', '/admin/badges/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'settings:badges:new': RouteRecordInfo<'settings:badges:new', '/admin/badges/new', Record<never, never>, Record<never, never>>,
    '/admin/configuration/admin': RouteRecordInfo<'/admin/configuration/admin', '/admin/configuration/admin', Record<never, never>, Record<never, never>>,
    '/admin/configuration/general': RouteRecordInfo<'/admin/configuration/general', '/admin/configuration/general', Record<never, never>, Record<never, never>>,
    '/admin/configuration/payment': RouteRecordInfo<'/admin/configuration/payment', '/admin/configuration/payment', Record<never, never>, Record<never, never>>,
    '/admin/overlays/': RouteRecordInfo<'/admin/overlays/', '/admin/overlays', Record<never, never>, Record<never, never>>,
    '/admin/overlays/[id]': RouteRecordInfo<'/admin/overlays/[id]', '/admin/overlays/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/admin/overlays/new': RouteRecordInfo<'/admin/overlays/new', '/admin/overlays/new', Record<never, never>, Record<never, never>>,
    '/admin/plans/': RouteRecordInfo<'/admin/plans/', '/admin/plans', Record<never, never>, Record<never, never>>,
    '/admin/plans/[id]': RouteRecordInfo<'/admin/plans/[id]', '/admin/plans/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/admin/plans/[id].edit': RouteRecordInfo<'/admin/plans/[id].edit', '/admin/plans/:id/edit', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/admin/plans/new': RouteRecordInfo<'/admin/plans/new', '/admin/plans/new', Record<never, never>, Record<never, never>>,
    '/admin/terminals/': RouteRecordInfo<'/admin/terminals/', '/admin/terminals', Record<never, never>, Record<never, never>>,
    '/admin/terminals/register': RouteRecordInfo<'/admin/terminals/register', '/admin/terminals/register', Record<never, never>, Record<never, never>>,
    '/badges': RouteRecordInfo<'/badges', '/badges', Record<never, never>, Record<never, never>>,
    'badges:index': RouteRecordInfo<'badges:index', '/badges', Record<never, never>, Record<never, never>>,
    'badges:view': RouteRecordInfo<'badges:view', '/badges/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'badges:view:user': RouteRecordInfo<'badges:view:user', '/badges/:id/:userId', { id: ParamValue<true>, userId: ParamValue<true> }, { id: ParamValue<false>, userId: ParamValue<false> }>,
    'badges:view:assign': RouteRecordInfo<'badges:view:assign', '/badges/:id/assign', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/users': RouteRecordInfo<'/users', '/users', Record<never, never>, Record<never, never>>,
    'users:search': RouteRecordInfo<'users:search', '/users', Record<never, never>, Record<never, never>>,
    'users:view': RouteRecordInfo<'users:view', '/users/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/users/[id]/': RouteRecordInfo<'/users/[id]/', '/users/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'users:view:badges': RouteRecordInfo<'users:view:badges', '/users/:id/badges', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'users:view:badges:view': RouteRecordInfo<'users:view:badges:view', '/users/:id/badges/:badgeId', { id: ParamValue<true>, badgeId: ParamValue<true> }, { id: ParamValue<false>, badgeId: ParamValue<false> }>,
    'users:view:badges:revoke': RouteRecordInfo<'users:view:badges:revoke', '/users/:id/badges/:badgeId/revoke', { id: ParamValue<true>, badgeId: ParamValue<true> }, { id: ParamValue<false>, badgeId: ParamValue<false> }>,
    'users:view:badges:assign': RouteRecordInfo<'users:view:badges:assign', '/users/:id/badges/assign', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'users:view:invoices': RouteRecordInfo<'users:view:invoices', '/users/:id/invoices', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'users:view:membership': RouteRecordInfo<'users:view:membership', '/users/:id/membership', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'users:view:photo': RouteRecordInfo<'users:view:photo', '/users/:id/photo', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'users:new': RouteRecordInfo<'users:new', '/users/new', Record<never, never>, Record<never, never>>,
    '/volunteers': RouteRecordInfo<'/volunteers', '/volunteers', Record<never, never>, Record<never, never>>,
    'volunteers:index': RouteRecordInfo<'volunteers:index', '/volunteers/:scope?', { scope?: ParamValueZeroOrOne<true> }, { scope?: ParamValueZeroOrOne<false> }>,
    'volunteers:view': RouteRecordInfo<'volunteers:view', '/volunteers/view/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/volunteers/view/[id]/': RouteRecordInfo<'/volunteers/view/[id]/', '/volunteers/view/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/volunteers/view/[id]/approve': RouteRecordInfo<'/volunteers/view/[id]/approve', '/volunteers/view/:id/approve', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/volunteers/view/[id]/hours': RouteRecordInfo<'/volunteers/view/[id]/hours', '/volunteers/view/:id/hours', { id: ParamValue<true> }, { id: ParamValue<false> }>,
  }
}
