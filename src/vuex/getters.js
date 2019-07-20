import countObjectProperties from '../utils';

export default {
  modals: state => state.modals,
  authUser(state) {
    return state.users[state.authId] ? state.users[state.authId] : null;
  },
  rooms: state => state.rooms,
  userRoomsCount: state => id => countObjectProperties(state.users[id].rooms),
};
