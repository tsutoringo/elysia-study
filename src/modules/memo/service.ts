import type {
  Memo,
  CreateMemoInput,
  UpdateMemoInput
} from './model.js'

let memos: Memo[] = [
  {
    id: 1,
    title: 'Elysiaを勉強する',
    content: '今日は小さなメモAPIを作る'
  },
  {
    id: 2,
    title: 'TypeScriptを復習する',
    content: '型を使って安全にコードを書く'
  }
]

export const memoService = {
  getAll() {
    return memos
  },

  findById(id: number) {
    const memo = memos.find((memo) => {
      return memo.id === id
    })

    return memo
  },

  create(input: CreateMemoInput) {
    const newMemo: Memo = {
      id: memos.length + 1,
      title: input.title,
      content: input.content ?? ''
    }

    memos.push(newMemo)

    return newMemo
  },

  update(id: number, input: UpdateMemoInput) {
    const memo = memos.find((memo) => {
      return memo.id === id
    })

    if (!memo) {
      return null
    }

    memo.title = input.title
    memo.content = input.content ?? ''

    return memo
  },

  delete(id: number) {
    const memo = memos.find((memo) => {
      return memo.id === id
    })

    if (!memo) {
      return null
    }

    memos = memos.filter((memo) => {
      return memo.id !== id
    })

    return memo
  }
}