import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import countObjectProperties from './utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: {},
    rooms: {},
    services: {},
    authId: '38St7Q8Zi2N1SPa5ahzssq9kbyp1',
    modals: {
      login: false,
      signup: false,
    },
  },
  mutations: {
    SET_MODAL_STATE: (state, { name, value }) => {
      state.modals[name] = value;
    },
    SET_ROOM: (state, { newRoom, roomId }) => {
      Vue.set(state.rooms, roomId, newRoom);
    },
    APPEND_ROOM_TO_USER: (state, { roomId, userId }) => {
      Vue.set(state.users[userId].rooms, roomId, roomId);
    },
    SET_ITEM: (state, { item, id, resource }) => {
      const newItem = item;
      newItem['.key'] = id;
      Vue.set(state[resource], id, newItem);
    },
  },
  actions: {
    TOGGLE_MODAL_STATE: ({ commit }, { name, value }) => {
      commit('SET_MODAL_STATE', { name, value });
    },
    CREATE_ROOM: ({ state, commit }, room) => {
      const newRoom = room;
      const roomId = `room${Math.random()}`;
      newRoom['.key'] = roomId;
      newRoom.userId = state.authId;
      commit('SET_ROOM', { newRoom, roomId });
      commit('APPEND_ROOM_TO_USER', { roomId, userId: newRoom.userId });
    },
    FETCH_ROOMS: ({ state, commit }, limit) => new Promise((resolve) => {
      let instance = firebase.firestore().collection('rooms');

      if (limit) {
        instance = instance.limit(limit);
      }

      instance.get()
        .then((snapshopt) => {
          snapshopt.forEach((room) => {
            commit('SET_ITEM', {
              item: room.data(),
              id: room.id,
              resource: 'rooms',
            });
          });
        })
        .then(() => resolve(Object.values(state.rooms)));
    }),
  },
  getters: {
    modals: state => state.modals,
    authUser: state => state.users[state.authId],
    rooms: state => state.rooms,
    userRoomsCount: state => id => countObjectProperties(state.users[id].rooms),
  },
});
