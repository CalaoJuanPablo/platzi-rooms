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
  CREATE_USER: ({ state, commit }, { email, name, password }) => new Promise((resolve) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((account) => {
        const id = account.user.uid;
        const registeredAt = Math.floor(Date.now() / 10000);
        const newUser = {email, name, registeredAt };
        firebase.firestore().collection('users').doc(id).set(newUser, { merge: true })
          .then(() => {
            commit('SET_ITEM', { resource: 'users', id, item: newUser });
            resolve(state.users[id]);
          });
      });
  }),
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
  FETCH_AUTH_USER: ({ dispatch, commit }) => {
    const userId = firebase.auth().currentUser.uid;
    dispatch('FETCH_USER', { id: userId })
      .then(() => {
        commit('SET_AUTHID', userId);
      });
  },
  SIGN_IN(context, { email, password }) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  LOG_OUT({ commit }) {
    return firebase.auth().signOut()
      .then(() => {
        commit('SET_AUTHID', null);
      });
  },
};
