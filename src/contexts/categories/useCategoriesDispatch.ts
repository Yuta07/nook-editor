import { useContext } from 'react'

import { CategoriesDispatchContext } from './CategoriesProviderContainer'

export const useCategoriesDispatch = () => {
	return useContext(CategoriesDispatchContext)
}
