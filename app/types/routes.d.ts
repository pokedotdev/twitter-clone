import type { SerializeFrom } from '@remix-run/node'

import type { loader as RootLoader } from '~/root'
import type { loader as ProfileLoader } from '~/routes/_app.$user'

export type RootLoaderType = SerializeFrom<typeof RootLoader>
export type UserProfileLoaderType = SerializeFrom<typeof ProfileLoader>
