import { useContext } from 'react'

import { UIDispatchContext } from './UIProviderContainer'

export const useUIDispatch = () => {
	return useContext(UIDispatchContext)
}
