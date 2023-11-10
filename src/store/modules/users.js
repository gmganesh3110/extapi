import axios from 'axios';

const state = {
  users: [],
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
};

const actions = {
  async fetchUsers({ commit }) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    commit('setUsers', response.data);
  },
  async searchUsers({ commit }, searchQueries) {
    try {

      const params = {};
      Object.entries(searchQueries).forEach(([key, value]) => {
        const trimmedValue = value.trim();
        if (trimmedValue !== '') {
          params[key] = trimmedValue;
        }
      });

      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data.filter(user => {
          return Object.entries(params).every(([paramKey, paramValue]) => {
            return user[paramKey].includes(paramValue);
          });
        });

        commit('setUsers', users);
      } catch (error) {
        console.error('There was a problem with the API request:', error);
      }
    } catch (error) {
      console.error('Error fetching filtered users:', error);
    }
  },
};

const getters = {
  getUsers: (state) => state.users,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
