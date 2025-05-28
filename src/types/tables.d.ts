declare namespace Tables {
  interface User {
    id: number
    name: string
    email: string
  }

  interface TableRequestData {
    page?: number
    size?: number
    sort?: string
    // Add other filter params as needed
  }

  interface TableResponseData {
    data: User[]
    total: number
    page: number
    size: number
  }
}