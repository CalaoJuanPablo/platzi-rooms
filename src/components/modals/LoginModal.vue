<template>
  <div>
    <h2 class="text-grey-darkest font-semibold text-center mb-6">
      Welcome to Platzi Rooms
    </h2>
    <form @submit.prevent="handleLoginSubmit">
      <div class="mb-4">
        <label class="imput__label" for="email">Email</label>
      </div>
      <div class="form__field mb-8">
        <input
          id="email"
          name="email"
          class="input__field"
          type="text"
          placeholder="example@domain.com"
          v-model="formLogin.email"
        >
      </div>
      <div class="mb-4">
        <label class="imput__label" for="pass">Password</label>
      </div>
      <div class="form__field mb-4">
        <input
          id="pass"
          name="password"
          class="input__field"
          type="password"
          placeholder="**************"
          v-model="formLogin.password"
        >
      </div>
      <div class="mb-4">
        <label class="imput__label">Remember me</label>
      </div>
      <div class="mb-4">
        <toggle-input v-model="formLogin.rememberMe"></toggle-input>
      </div>
      <div class="mb-4">
        <button class="btn btn-primary mr-3 w-full" type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import ToggleInput from '@/components/ToggleInput.vue'
export default {
  name: 'LoginModal',
  components: {
    ToggleInput
  },
  data () {
    return {
      formLogin: {
        email: '',
        password: '',
        rememberMe: false
      }
    }
  },
  methods: {
    handleLoginSubmit() {
      this.$store.dispatch('SIGN_IN', {
        email: this.formLogin.email,
        password: this.formLogin.password,
      })
        .then(() => {
          this.$store.dispatch('TOGGLE_MODAL_STATE', {
            name: 'login',
            value: false
          })
        })
    }
  }
}
</script>
