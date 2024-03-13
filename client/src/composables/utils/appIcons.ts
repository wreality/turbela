import type { RouteLocationRaw, RouteLocationResolved, RouteMeta } from 'vue-router/auto'
import type { RouteNamedMap } from 'vue-router/auto-routes'

export { }

export const appIcons = {
  'user': 'person',
  'users': 'people',
  'user:new': 'person_add',
  'user:photo': 'photo_camera',
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
export function getRouteIcon(route: RouteLocationResolved): AppIconResolved<AppIconName> | undefined
export function getRouteIcon(route: keyof RouteNamedMap): AppIconResolved<AppIconName> | undefined
export function getRouteIcon(route: keyof RouteNamedMap | RouteLocationRaw | RouteLocationResolved): AppIconResolved<AppIconName> | undefined {
  if (typeof route === 'string') {
    //we assume we have a name
    const routeObject = useRoute(route as keyof RouteNamedMap)
    console.log(routeObject, route)
    console.trace();
    return getAppIcon(routeObject.meta.appIcon)
  } else if ('meta' in route) {
    //the route object is already resolved

    return getAppIcon(route.meta.appIcon as RouteMeta['appIcon'])
  }  else if (route instanceof Object) {
    //we need to resolve the route object first
    const routeObject = useRouter().resolve(route)

    return getAppIcon(routeObject.meta.appIcon)
  }

}
