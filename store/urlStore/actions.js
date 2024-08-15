const actions =  {
  async getUrl({commit}) {
    let url = process.env.baseUrl+"urls"

    await this.$axios.get(url).then(request => {
      commit('SET_URLS', request.data.response)
    }).catch(error => {
      console.log(error);
      commit('SET_URLS', [])
      commit('SET_SHOW_ERROR', true)
    })
  },
  async createUrl({commit}, payload) {
    let url = process.env.baseUrl+"url"

    return await this.$axios.post(url, payload).then(request => {
      return request.data;
    }).catch(error => {
      throw error.response.data;
    })
  },
  async goToUrl({commit}, code) {
    let url = process.env.baseUrl+"urls/" + code

    return await this.$axios.get(url).then(request => {
      return request.data;
    }).catch(error => {
      throw error.response.data;
    })
  },
  async deleteUrl({commit}, code) {
    let url = process.env.baseUrl+"urls/" + code

    return await this.$axios.delete(url).then(request => {
      return request.data.response
    }).catch(error => {
      throw error.response.data;
    })
  }
}

export default actions
