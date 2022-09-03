import type { SerializeFrom } from '~/remix'

import type { loader as RootLoader } from '~/root'
import type { loader as ProfileLoader } from '~/routes/__app/$user'

export type RootLoaderType = SerializeFrom<typeof RootLoader>
export type UserProfileLoaderType = SerializeFrom<typeof ProfileLoader>
