import { defineStore } from 'pinia-for-react'

export const useAppStore = defineStore({
  state() {
    return {
      username: 'aaa',
    }
  },
  actions: {
    setUserInfo(userInfo: any) {
      const state = this.$getState()
      this.$setState({
        ...state,
        ...userInfo
      })
    },
    async setUserInfoAsync() {
      await new Promise(resolve => setTimeout(resolve, 2000))
      this.$patch({
        username: 'syncUserInfoaaa'
      })
    },
    reset() {
      this.$reset()
    }
  }
})
