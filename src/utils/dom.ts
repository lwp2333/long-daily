import { SelectorQuery, NodesRef } from '@tarojs/taro'

export type IQueryResult =
  | NodesRef.BoundingClientRectCallbackResult
  | NodesRef.ScrollOffsetCallbackResult
  | NodesRef.ContextCallbackResult

/***
 * 递归查询 query.exec 直到有结果或超时报错（第一次可能无法获取到）
 * @param {SelectorQuery} query
 * @param {Number} interval
 * @param {Number} timeout
 * **/
export const execSelectQuery = (
  selectQuery: SelectorQuery,
  interval = 100,
  timeout = 3000
): Promise<IQueryResult | IQueryResult[]> => {
  const _startTime = Date.now()
  return new Promise((resolve, reject) => {
    const func = () => {
      selectQuery.exec(res => {
        const result = res[0]
        if (Date.now() - _startTime > timeout) {
          reject(new Error('query time out'))
        } else if (result === null || (Array.isArray(result) && result.length === 0)) {
          setTimeout(func, interval)
        } else {
          resolve(result)
        }
      })
    }
    func()
  })
}
