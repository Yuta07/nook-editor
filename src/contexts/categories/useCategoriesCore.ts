import { useCallback, useReducer } from 'react'

export type CategoryState = {
	id: number
	name: string
	description?: string
	created_at?: string
	updated_at?: string
	user_id: string
	image_url: string
}

export type CategoriesState = { categories: CategoryState[] | null }

const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
const CREATE_CATEGORY = 'CREATE_CATEGORY'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
const DELETE_CATEGORY = 'DELETE_CATEGORY'

type fetchCategories = {
	type: typeof FETCH_CATEGORIES
	payload: CategoryState[]
}

type createCategory = {
	type: typeof CREATE_CATEGORY
	payload: CategoryState
}

type updateCategory = {
	type: typeof UPDATE_CATEGORY
	payload: CategoryState
}

type deleteCategory = {
	type: typeof DELETE_CATEGORY
	payload: CategoryState['id']
}

type ActionType = fetchCategories | createCategory | updateCategory | deleteCategory

const initialStateFactory: CategoriesState = { categories: null }

function updateCategory(state: CategoryState[], action: CategoryState) {
	return state.map((category) => {
		if (category.id === action.id) {
			return action
		} else {
			return category
		}
	})
}

function reducer(state: CategoriesState, action: ActionType): CategoriesState {
	switch (action.type) {
		case 'FETCH_CATEGORIES':
			return { ...state, categories: action.payload }
		case 'CREATE_CATEGORY':
			return { ...state, categories: state.categories ? [...state.categories, action.payload] : [action.payload] }
		case 'UPDATE_CATEGORY':
			return { ...state, categories: state.categories ? updateCategory(state.categories, action.payload) : null }
		case 'DELETE_CATEGORY':
			return {
				...state,
				categories: state.categories
					? state.categories?.filter((category) => {
							return category.id !== action.payload
					  })
					: null,
			}
	}
}

export const useCategoriesCore = () => {
	const [state, dispatch] = useReducer(reducer, initialStateFactory)

	const fetchCategories = useCallback(
		(categories: CategoryState[]) => {
			dispatch({ type: 'FETCH_CATEGORIES', payload: categories })
		},
		[dispatch]
	)

	const createCategory = useCallback(
		(category: CategoryState) => {
			dispatch({ type: 'CREATE_CATEGORY', payload: category })
		},
		[dispatch]
	)

	const updateCategory = useCallback(
		(category: CategoryState) => {
			dispatch({ type: 'UPDATE_CATEGORY', payload: category })
		},
		[dispatch]
	)

	const deleteCategory = useCallback(
		(categoryId: CategoryState['id']) => {
			dispatch({ type: 'DELETE_CATEGORY', payload: categoryId })
		},
		[dispatch]
	)

	return {
		state,
		fetchCategories,
		createCategory,
		updateCategory,
		deleteCategory,
	}
}
