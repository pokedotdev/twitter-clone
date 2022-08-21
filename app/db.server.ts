import { createClient } from 'edgedb'

import type { RecursivelyReplaceNullWithUndefined } from '~/types/utils'
import type { $infer } from '~/../dbschema/edgeql-js'
import e from '~/../dbschema/edgeql-js'

export * from '~/../dbschema/edgeql-js'

const client = createClient()

const globals = e.select(e.global)
export type CTX = RecursivelyReplaceNullWithUndefined<$infer<typeof globals>>

export { client, e }
