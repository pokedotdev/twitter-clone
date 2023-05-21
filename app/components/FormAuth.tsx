import { Form, type FormProps } from '~/remix'

export const FormAuth = (props: FormProps) => {
	return <Form action="/auth?index" method="post" {...props} />
}
