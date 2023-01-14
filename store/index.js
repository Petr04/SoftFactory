export const state = () => ({
  showOrder: false,
  service: null,
  title: null,
});

export const getters = {
  getShowOrder(state) {
    return state.showOrder;
  },
  getService(state) {
    return state.service;
  },
  getTitle(state) {
    return state.title;
  },
};

export const mutations = {
  setShowOrder(state, val) {
    state.showOrder = val;
  },
  setService(state, val) {
    state.service = val;
  },
  setTitle(state, val) {
    state.title = val;
  }
};
