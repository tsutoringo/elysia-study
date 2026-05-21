import { Elysia, t } from 'elysia'
import { memoService } from './service.js'

const memoBodySchema = t.Object({
  title: t.String({
    minLength: 1,
    maxLength: 100
  }),
  content: t.Optional(
    t.String({
      maxLength: 1000
    })
  )
})

const memoParamsSchema = t.Object({
  id: t.Number()
})

export const memosRoute = new Elysia({
  prefix: '/memos'
})
  .get('/', () => {
    return memoService.getAll()
  })

  .get('/:id', ({ params, status }) => {
    const memo = memoService.findById(params.id)

    if (!memo) {
      return status(404, {
        message: 'メモが見つかりません'
      })
    }

    return memo
  }, {
    params: memoParamsSchema
  })

  .post('/', ({ body, status }) => {
    const newMemo = memoService.create(body)

    return status(201, {
      message: 'メモを作成しました',
      memo: newMemo
    })
  }, {
    body: memoBodySchema
  })

  .put('/:id', ({ params, body, status }) => {
    const updatedMemo = memoService.update(params.id, body)

    if (!updatedMemo) {
      return status(404, {
        message: 'メモが見つかりません'
      })
    }

    return {
      message: 'メモを更新しました',
      memo: updatedMemo
    }
  }, {
    params: memoParamsSchema,
    body: memoBodySchema
  })

  .delete('/:id', ({ params, status }) => {
    const deletedMemo = memoService.delete(params.id)

    if (!deletedMemo) {
      return status(404, {
        message: 'メモが見つかりません'
      })
    }

    return {
      message: 'メモを削除しました',
      memo: deletedMemo
    }
  }, {
    params: memoParamsSchema
  })