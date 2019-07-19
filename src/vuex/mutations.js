import Vue from 'vue';

export default {
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
};
