import classnames from 'classnames'
import './spinner.scss'

type SpinnerProps = {
	className?: string
	message?: string
}

export const Spinner = ({ className, message }: SpinnerProps) => {
	return (
		<div className={classnames(className, 'spinner-root')}>
			<div className="spinner" />
			{message ? <p className="spinner-message">{message}</p> : null}
		</div>
	)
}
