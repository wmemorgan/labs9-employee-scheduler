import {
  FETCH_EMPLOYEES_FROM_DB_SUCCESS,
  FETCH_EMPLOYEES_FROM_DB_FAIL,
  FETCH_EMPLOYEE_FROM_DB_SUCCESS,
  FETCH_EMPLOYEE_FROM_DB_FAIL
} from '../actions'

const initialState = {
  employees: [],
  employee: [],
  error: ''
}

export const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_FROM_DB_SUCCESS:
      return { employees: [...action.payload], error: '' }
    case FETCH_EMPLOYEES_FROM_DB_FAIL:
      return { ...initialState, error: 'fetching failed' }
    case FETCH_EMPLOYEE_FROM_DB_SUCCESS:
      return { employee: [...action.payload], error: '' }
    case FETCH_EMPLOYEE_FROM_DB_FAIL:
      return { ...initialState, error: 'fetching failed' }
    default:
      return state
  }
}
