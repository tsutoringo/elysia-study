export type Memo = {
  id: number
  title: string
  content: string
}

export type CreateMemoInput = {
  title: string
  content?: string
}

export type UpdateMemoInput = {
  title: string
  content?: string
}