import { ComponentPropsWithRef, forwardRef } from 'react'
import classnames from 'classnames'

import './Input.scss'

type InputProps = ComponentPropsWithRef<'input'>

export interface LabelProps extends ComponentPropsWithRef<'label'> {
	label: string
	required?: boolean
}

type Props = {
	className?: string
	inputProps: InputProps
	labelProps: LabelProps
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
	return (
		<input
			{...props}
			className={classnames(className, 'input-root')}
			ref={ref}
			autoComplete="off"
			autoCorrect="off"
			autoCapitalize="off"
			spellCheck="false"
		/>
	)
})

export const Label = forwardRef<HTMLLabelElement, LabelProps>(({ children, className, required, ...props }, ref) => {
	return (
		<label className={classnames('input-label-root', className)} {...props} ref={ref}>
			{children}
			{required ? <span className="input-label-required">※</span> : null}
		</label>
	)
})

export const InputWithLabel = ({ className, inputProps, labelProps }: Props) => {
	return (
		<div className={classnames('input-container', className)}>
			<Label {...labelProps}>{labelProps.label}</Label>
			<Input {...inputProps} />
		</div>
	)
}
