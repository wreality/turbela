import { RouteLocationRaw } from 'vue-router/auto'
import { RouteNamedMap } from 'vue-router/auto-routes'

export { }

export const appIcons = {
  'user': 'person',
  'users': 'people',
  'user:new': 'person_add',
  'badge': 'sym_o_award_star',
  'volunteer': 'volunteer_activism'
}

declare module 'vue-router' {
  interface RouteMeta {
    appIcon?: AppIconName
  }
}

export type AppIconMap = Record<keyof typeof appIcons, string>

export type AppIcon<Icon extends string>  = Icon

export type AppIconName = keyof AppIconMap

export type AppIconResolved<IconName extends AppIconName> = AppIconMap[IconName]

export function getAppIcon<IconName extends AppIconName>(appClass?: IconName): AppIconResolved<IconName> | undefined {
  return appClass ? appIcons[appClass] : undefined
}

export function getRouteIcon(route: RouteLocationRaw): AppIconResolved<AppIconName> | undefined
export function getRouteIcon(route: keyof RouteNamedMap): AppIconResolved<AppIconName> | undefined
export function getRouteIcon(route: keyof RouteNamedMap | RouteLocationRaw): AppIconResolved<AppIconName> | undefined {
  if (route instanceof Object) {
    const routeObject = useRouter().resolve(route)
    return getAppIcon(routeObject.meta.appIcon)
  }
  else if (typeof route === 'string') {
    const routeObject = useRoute(route as keyof RouteNamedMap)
    return getAppIcon(routeObject.meta.appIcon)
  }
}
