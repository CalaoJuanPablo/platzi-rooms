<template>
  <div>
    <h2 class="text-grey-darkest font-semibold text-center mb-6">
      Welcome to Platzi Rooms
    </h2>
    <form>
      <div class="mb-4">
        <label class="imput__label">Email</label>
      </div>
      <div class="form__field mb-8">
        <input class="input__field" type="text" placeholder="example@domain.com">
      </div>
      <div class="mb-4">
        <label class="imput__label">Password</label>
      </div>
      <div class="form__field mb-4">
        <input class="input__field" type="password" placeholder="**************">
      </div>
      <div class="mb-4">
        <button class="btn btn-primary mr-3 w-full">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginModal'
}
</script>
