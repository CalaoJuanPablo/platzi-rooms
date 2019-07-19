import countObjectProperties from '../utils';

export default {
  modals: state => state.modals,
  authUser: state => state.users[state.authId],
  rooms: state => state.rooms,
  userRoomsCount: state => id => countObjectProperties(state.users[id].rooms),
};
