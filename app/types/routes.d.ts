import type { UseDataFunctionReturn } from '@remix-run/react/dist/components'

import type { loader as RootLoader } from '~/root'
import type { loader as ProfileLoader } from '~/routes/__app/$user'

export type RootLoaderType = UseDataFunctionReturn<typeof RootLoader>
export type UserProfileLoaderType = UseDataFunctionReturn<typeof ProfileLoader>
