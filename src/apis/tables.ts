import { request } from '@/utils/request.ts'
// Remove the import if Tables types are declared globally in the .d.ts file
// import type { Tables } from '@/types/tables.d.ts'

/**
 * Get table data
 * @param params Request parameters
 * @returns Table response data
 */
export function getTableDataApi(params: Tables.TableRequestData) {
  return request<Tables.TableResponseData>({
    url: 'tables',
    method: 'get',
    baseURL: '/json/server',
    params,
  })
}

/**
 * Get user by ID
 * @param id User ID
 * @returns User data
 */
export function getUserApi(id: number) {
  return request<Tables.User>({
    url: `tables/${id}`,
    method: 'get',
    baseURL: '/json/server',
  })
}

/**
 * Create new user
 * @param data User data
 * @returns Created user
 */
export function createUserApi(data: Omit<Tables.User, 'id'>) {
  return request<Tables.User>({
    url: 'tables',
    method: 'post',
    baseURL: '/json/server',
    data,
  })
}

/**
 * Update user
 * @param id User ID
 * @param data User data
 * @returns Updated user
 */
export function updateUserApi(id: number, data: Partial<Tables.User>) {
  console.log('Updating user with ID:', id, 'and data:', data)
  return request<Tables.User>({
    url: `tables/${id}`,
    method: 'put',
    baseURL: '/json/server',
    data,
  })
}

/**
 * Delete user
 * @param id User ID
 * @returns Empty response
 */
export function deleteUserApi(id: number) {
  return request<void>({
    url: `tables/${id}`,
    method: 'delete',
    baseURL: '/json/server',
  })
}
