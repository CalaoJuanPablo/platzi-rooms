<template>
  <div>
    <h2 class="text-grey-darkest font-semibold text-center mb-6">
      Register to Platzi Rooms NOW!
    </h2>
    <form @submit.prevent="handleRegisterSubmit">
      <div class="mb-4">
        <label class="imput__label">Name</label>
      </div>
      <div class="form__field mb-4">
        <input v-model="formRegister.name" class="input__field" type="text" placeholder="John Doe">
      </div>
      <div class="mb-4">
        <label class="imput__label">Email</label>
      </div>
      <div class="form__field mb-8">
        <input v-model="formRegister.email" class="input__field" type="text" placeholder="example@domain.com">
      </div>
      <div class="mb-4">
        <label class="imput__label">Password</label>
      </div>
      <div class="form__field mb-4">
        <input v-model="formRegister.password" class="input__field" type="password" placeholder="**************">
      </div>
      <div class="mb-4">
        <button class="btn btn-primary mr-3 w-full">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      formRegister: {
        email: '',
        name: '',
        password: '',
      }
    }
  },
  methods: {
    handleRegisterSubmit() {
      this.$store.dispatch('CREATE_USER', this.formRegister)
        .then(() => {
          this.$store.dispatch('TOGGLE_MODAL_STATE', {
            name: 'signup',
            value: false
          })
        })
    }
  }
}
</script>
