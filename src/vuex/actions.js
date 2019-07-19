import firebase from 'firebase';

export default {
  TOGGLE_MODAL_STATE: ({ commit }, { name, value }) => {
    commit('SET_MODAL_STATE', { name, value });
  },
  CREATE_ROOM: ({ state, commit }, room) => {
    const newRoom = room;
    newRoom.userId = state.authId;
    newRoom.publishedAt = Math.floor(Date.now() / 1000);
    newRoom.meta = { likes: 0 };

    function setRoomToUser(roomId) {
      firebase.firestore().collection('users').doc(state.authId).set({
        rooms: {
          [roomId]: roomId,
        },
      }, { merge: true })
        .catch(err => console.log('Error in setRoomToUser: ', err));
    }

    firebase.firestore().collection('rooms').add(newRoom)
      .then(docRef => docRef.id)
      .then((roomId) => {
        setRoomToUser(roomId);
        commit('SET_ROOM', { newRoom, roomId });
        commit('APPEND_ROOM_TO_USER', { roomId, userId: newRoom.userId });
        return Promise.resolve(state.rooms[roomId]);
      });
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
  FETCH_USER: ({ state, commit }, { id }) => new Promise((resolve) => {
    const userRef = firebase.firestore().collection('users').doc(id);

    userRef.get()
      .then((user) => {
        commit('SET_ITEM', {
          item: user.data(),
          id: user.id,
          resource: 'users',
        });
      })
      .then(() => resolve(Object.values(state.users[id])));
  }),
};
