import { useCallback, useEffect } from 'react'
import { FaExclamationCircle, FaRegCheckCircle } from 'react-icons/fa'
import classnames from 'classnames'

import { useUIDispatch, useUIState, ToastType } from 'contexts/ui'

import './toast.scss'

interface ContainerProps extends ToastType {
	presenter: (props: PresenterProps) => JSX.Element
}

interface PresenterProps extends ToastType {
	handleRemoveToast: (id: number) => void
}

const Container = ({ presenter, id, type, message, time, ...props }: ContainerProps) => {
	const dispatch = useUIDispatch()

	const handleRemoveToast = useCallback((id: number) => {
		dispatch?.removeToast(id)
	}, [])

	useEffect(() => {
		const timerHandle = setTimeout(() => handleRemoveToast(id), time)

		return () => {
			clearTimeout(timerHandle)
		}
	}, [id, time])

	return presenter({ id, type, message, time, handleRemoveToast, ...props })
}

const Presenter = ({ id, type, handleRemoveToast, ...props }: PresenterProps) => {
	return (
		<div
			className={classnames('toast-root', type === 'SUCCESS' ? 'toast-success' : 'toast-error')}
			onClick={() => handleRemoveToast(id)}
		>
			<span className="toast-close">
				{type === 'SUCCESS' ? <FaRegCheckCircle size={14} color="var(--color-secondary)" /> : null}
				{type === 'ERROR' ? <FaExclamationCircle size={14} color="var(--color-secondary)" /> : null}
			</span>
			<span className="toast-message">{props.message}</span>
		</div>
	)
}

export const Toast = () => {
	const state = useUIState()

	if (state.toasts.length === 0) return null

	return (
		<div className="toast-container">
			{state.toasts.map((toast) => {
				return (
					<Container
						presenter={(props: PresenterProps) => <Presenter {...props} />}
						key={toast.id}
						id={toast.id}
						type={toast.type}
						message={toast.message}
						time={toast.time}
					/>
				)
			})}
		</div>
	)
}
