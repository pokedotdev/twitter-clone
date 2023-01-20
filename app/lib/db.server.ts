import { createClient, $ } from 'edgedb'

import type { RecursivelyReplaceNullWithUndefined } from '~/types/utils'
import type { $infer } from '$root/dbschema/codegen/edgeql'
import e from '$root/dbschema/codegen/edgeql'

export * from '$root/dbschema/codegen/edgeql'
export * from '$root/dbschema/codegen/interfaces'

const client = createClient()

const globals = e.select(e.global)
export type CTX = RecursivelyReplaceNullWithUndefined<$infer<typeof globals>>

export { client, e, $ }
