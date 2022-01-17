import { useContext } from 'react'

import { UIStateContext } from './UIProviderContainer'

export const useUIState = () => {
	return useContext(UIStateContext)
}
