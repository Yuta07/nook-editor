import { useContext } from 'react'

import { AuthStateContext } from './AuthProviderContainer'

export const useAuthState = () => {
	return useContext(AuthStateContext)
}
