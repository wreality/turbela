import type { RouteLocationRaw, RouteLocationResolved, RouteMeta } from 'vue-router/auto'
import type { RouteNamedMap } from 'vue-router/auto-routes'

export { }

export const appIcons = {
  'user': 'person',
  'users': 'people',
  'user:new': 'person_add',
  'user:photo': 'photo_camera',
  'badge': 'sym_o_award_star',
  'volunteer': 'volunteer_activism',
  'plan': 'widgets',
  'overlay': 'image',
  'settings:general': 'tune',
  'terminal': 'point_of_sale'
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

export function getAppIcon<IconName extends AppIconName>(appClass?: IconName, fallback?: string): AppIconResolved<IconName> | undefined {
  return (appClass && appIcons[appClass]) ?? fallback
}

export function getRouteIcon(route: RouteLocationRaw, fallback?: string): AppIconResolved<AppIconName> | undefined
export function getRouteIcon(route: RouteLocationResolved, fallback?: string): AppIconResolved<AppIconName> | undefined
export function getRouteIcon(route: keyof RouteNamedMap, fallback?: string): AppIconResolved<AppIconName> | undefined
export function getRouteIcon(route: keyof RouteNamedMap | RouteLocationRaw | RouteLocationResolved, fallback?: string): AppIconResolved<AppIconName> | undefined {
  if (typeof route === 'string') {
    //we assume we have a name
    const routeObject = useRoute(route as keyof RouteNamedMap)
    return getAppIcon(routeObject.meta.appIcon, fallback)
  } else if ('meta' in route) {
    //the route object is already resolved

    return getAppIcon(route.meta.appIcon as RouteMeta['appIcon'], fallback)
  }  else if (route instanceof Object) {
    //we need to resolve the route object first
    const routeObject = useRouter().resolve(route)

    return getAppIcon(routeObject.meta.appIcon, fallback)
  }

}
