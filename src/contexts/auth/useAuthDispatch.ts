import { useContext } from 'react'
import { AuthDispatchContext } from './AuthProviderContainer'

export const useAuthDispatch = () => {
	return useContext(AuthDispatchContext)
}
