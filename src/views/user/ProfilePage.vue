<template>
  <page-layout>
    <section class="py-4 bg-teal-dark">
      <div class="container">
        <form class="form">
          <div class="form__field relative">
            <i class="input-icon material-icons absolute text-grey-darker">search</i>
            <input class="input__search" id="where" type="text" placeholder="Mexico City, Mexico">
          </div>
        </form>
      </div>
    </section>
    <section class="section__profile py-6">
      <div class="container">
        <h1 class="text-3xl font-light m-3">Profile Account</h1>
        <div class="grid-container">
          <aside class="profile__aside px-3">
            <div class="profile__card">
              <div class="profile__thumbnail mb-2">
                <img class="profile__image w-full" :src="profile.avatar" :alt="profile.username">
              </div>
              <div class="text-lg">
                <span class="font-semibold">{{ userRoomsCount }}</span> rooms
              </div>
            </div>
          </aside>
          <div class="profile__fields">
            <form class="form">
              <div class="mb-4">
                <label class="input__label" for="name">Name</label>
                <div class="form__field relative">
                  <input class="input__field" id="name" type="text" placeholder="Buce Wayne" v-model="profile.name">
                </div>
              </div>
              <div class="mb-4">
                <label class="input__label" for="username">Username</label>
                <div class="form__field relative">
                  <input class="input__field" id="username" type="text" placeholder="bruce.wayne" v-model="profile.username">
                </div>
              </div>
              <div class="mb-4">
                <label
                  class="input__label"
                  for="avatar">Avatar</label>
                <div class="form__field relative">
                  <input class="input__field" id="avatar" type="text" placeholder="https://avatars1.githubusercontent.com/u/9919?s=500&v=4" v-model="profile.avatar">
                </div>
              </div>
              <div class="mb-4">
                <label
                  class="input__label"
                  for="email">Email</label>
                <div class="form__field relative">
                  <input
                    class="input__field"
                    id="email"
                    type="text"
                    placeholder="bruce.wayne@imnotbatman.com"
                    v-model="profile.email">
                </div>
              </div>
              <div class="mb-4">
                <label
                  class="input__label"
                  for="email">Bio</label>
                <div class="form__field relative">
                  <textarea
                    class="input__field"
                    rows="5"
                    id="email"
                    type="text"
                    placeholder="I am not Batman"
                    v-model="profile.bio"
                  >
                  </textarea>
                </div>
              </div>
              <div class="flex items-center w-auto mb-4">
                <button
                  class="btn mr-3">
                  Cancel
                </button>
                <button
                  class="bg-yellow-dark text-yellow-darker font-semibold py-2 px-4 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </page-layout>
</template>

<script>
import PageLayout from '@/layouts/PageLayout.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'ProfilePage',
  components: {
    PageLayout,
  },
  data () {
    return {
      profile: {
        avatar: '',
        bio: '',
        name: '',
        username: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'authUser'
    }),
    userRoomsCount () {
      this.$store.getters.userRoomsCount(this.user['.key'])
    }
  },
  mounted () {
    this.profile = this.user
  }
};
</script>
<style>
.section__profile .grid-container {
  grid-template-columns: 3fr 9fr;
}
</style>
