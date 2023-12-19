import { data } from 'assets/data.js'

export const state = () => ({
  ...data
})

export const mutations = {
  add (state, payload) {
    state.data.result = [payload, ...state.data.result]
  },
  update (state, payload) {
    const indexItem = state.data.result.findIndex(
      x => x.username === payload.username
    )
    if (indexItem !== -1) {
      Object.assign(state.data.result[indexItem], payload)
    }
  },
  delete (state, payload) {
    state.data.result.splice(payload, 1)
  }
}
