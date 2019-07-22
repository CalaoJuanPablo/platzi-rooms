<template>
  <header class="bg-white py-5 shadow">
    <div class="container">
      <div class="flex items-center justify-between flex-wrap">
        <div class="flex items-center flex-no-shrink mr-6">
          <router-link
            :to="{ name: 'HomePage' }"
            class="text-black hover:text-grey-darkest no-underline font-semibold text-lg"
          >
            Platzi Rooms
          </router-link>
        </div>
        <div class="flex items-center w-auto">
          <div class="items__controls">
            <div class="flex" v-if="user">
              <router-link
                :to="{ name: 'CreateHousePage' }"
                class="mr-2 flex items-center no-underline text-darkest"
              >
                <i class="material-icons">add</i>
              </router-link>
              <button class="mr-4 flex items-center">
                <i class="material-icons">notifications</i>
              </button>
              <div class="flex items-center mr-4">
                <img class="w-8 h-8 rounded-full mr-2" :src="user.avatar" :alt="`Avatar of ${user.name}`">
                <div class="text-sm">
                  <p class="text-black leading-none">{{ user.name }}</p>
                  <p class="text-grey-dark">Online</p>
                </div>
              </div>
              <button class="flex item-center" @click.prevent="handleLogout">
                <i class="material-icons">exit_to_app</i>
              </button>
            </div>
            <div v-else>
              <button class="btn__outline btn__outline--teal rounded mr-2" @click.prevent="getLogin">Login</button>
              <button
                class="bg-yellow-dark text-yellow-darker font-semibold py-2 px-4 rounded" @click.prevent="getSignup">
                Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderPartial',
  data() {
    return {
      isAuthenticated: true,
    };
  },
  computed: {
    ...mapGetters({
      user: 'authUser'
    })
  },
  methods: {
    getLogin() {
      this.$store.dispatch('TOGGLE_MODAL_STATE', {
        name: 'login',
        value: true
      })
    },
    getSignup() {
      this.$store.dispatch('TOGGLE_MODAL_STATE', {
        name: 'signup',
        value: true
      })
    },
    handleLogout() {
      this.$store.dispatch('LOG_OUT')
    }
  },
};
</script>
