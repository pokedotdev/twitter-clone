import * as React from 'react'
import cn from 'clsx'

const DialogContext = React.createContext('dialog')
const useDialog = () => React.useContext(DialogContext)

type DialogRootProps = {
	name: string
} & React.ComponentPropsWithoutRef<'div'>

const Root = ({ name, children }: DialogRootProps) => {
	return (
		<>
			<input type="checkbox" id={name} name={name} className="open" hidden />
			<DialogContext.Provider value={name}>{children}</DialogContext.Provider>
		</>
	)
}

type DialogTriggerProps = {} & React.ComponentPropsWithoutRef<'label'>

const Trigger = ({ children, ...rest }: DialogTriggerProps) => {
	const name = useDialog()
	return (
		<label htmlFor={name} {...rest}>
			{children}
		</label>
	)
}

type DialogContentProps = {} & React.ComponentPropsWithoutRef<'div'>

const Content = ({ children, className, ...rest }: DialogContentProps) => {
	return (
		<div className={cn('open-content', className)} {...rest}>
			{children}
		</div>
	)
}

export const Dialog = {
	Root,
	Trigger,
	Content,
}
