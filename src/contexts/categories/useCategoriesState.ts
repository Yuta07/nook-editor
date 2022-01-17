import { useContext } from 'react'

import { CategoriesStateContext } from './CategoriesProviderContainer'

export const useCategoriesState = () => {
	return useContext(CategoriesStateContext)
}
