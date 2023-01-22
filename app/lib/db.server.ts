import { createClient, $ } from 'edgedb'
import { z } from 'zod'

import e from '$root/dbschema/codegen/edgeql'

export * from '$root/dbschema/codegen/edgeql'
export * from '$root/dbschema/codegen/interfaces'

export const client = createClient()

export const globals = {
	currentUser: e.select(e.User, () => ({
		filter_single: { id: e.global.current_user_id },
	})),
}

export const ContextSchema = z.object({
	current_user_id: z.string().uuid().optional(),
})
export const ContextRequiredSchema = ContextSchema.required()
export type Context = z.infer<typeof ContextSchema>
export type ContextRequired = z.infer<typeof ContextRequiredSchema>

export { e, $ }
