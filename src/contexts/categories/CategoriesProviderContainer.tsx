import { createContext, ReactNode, VFC } from 'react'

import { CategoryState, CategoriesState, useCategoriesCore } from './useCategoriesCore'

import { useFetchCategories } from '../../hooks/useCategories'

type Props = {
	children: ReactNode
}

export type DispatchAction = {
	fetchCategories: (categories: CategoryState[]) => void
	createCategory: (category: CategoryState) => void
	updateCategory: (category: CategoryState) => void
	deleteCategory: (id: CategoryState['id']) => void
}

export const CategoriesStateContext = createContext<CategoriesState>({ categories: null })
export const CategoriesDispatchContext = createContext<DispatchAction | undefined>(undefined)

export const CategoriesProviderContainer: VFC<Props> = (props) => {
	const { state, fetchCategories, createCategory, updateCategory, deleteCategory } = useCategoriesCore()

	useFetchCategories()

	return (
		<CategoriesStateContext.Provider value={state}>
			<CategoriesDispatchContext.Provider value={{ fetchCategories, createCategory, updateCategory, deleteCategory }}>
				{props.children}
			</CategoriesDispatchContext.Provider>
		</CategoriesStateContext.Provider>
	)
}
