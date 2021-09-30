import React, { useCallback, useState } from 'react'

import { Button } from '../ui/Button'
import { InputWithLabel } from '../ui/Input'

import './forgotPasswordSection.scss'

export const ForgotPasswordSection = () => {
	const [email, setEmail] = useState('')

	const handleInputChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value)
	}, [])

	const disabled = email === ''

	return (
		<form>
			<InputWithLabel
				className="forgot-section-input"
				labelProps={{ label: 'Email' }}
				inputProps={{ name: 'email', value: email, type: 'email', onChange: handleInputChange }}
			/>
			<div className="forgot-section-button-container">
				<Button name="forgot-password-button" type="submit" disabled={disabled} className="forgot-section-form-button">
					Send Email
				</Button>
			</div>
		</form>
	)
}
