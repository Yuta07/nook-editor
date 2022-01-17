import classnames from 'classnames'
import { ComponentPropsWithRef, forwardRef } from 'react'

import './Button.scss'

export type ButtonProps = ComponentPropsWithRef<'button'>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
	return <button {...props} ref={ref} className={classnames('button-root', className)} />
})
