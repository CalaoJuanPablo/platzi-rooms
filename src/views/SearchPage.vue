<template>
  <page-layout>
    <section class="py-4 bg-teal-dark">
      <div class="container">
        <form class="form">
          <div class="form__field relative">
            <i class="input-icon material-icons absolute text-grey-darker">search</i>
            <input
              class="input__search"
              id="where"
              type="text"
              placeholder="Mexico City, Mexico">
          </div>
        </form>
      </div>
    </section>
    <section class="section__items py-8">
      <div class="container">
        <h1 class="text-3xl font-light mb-3">Explore all</h1>
        <div class="search__content grid-container mb-8">
          <house-card
            class="house__card mb-3"
            v-for="room in rooms"
            :key="room['.key']"
            :room="room">
          </house-card>
        </div>
        <div class="text-center">
          <a
            class="py-3 px-12 bg-yellow-dark no-underline text-yellow-darker text-lg rounded"
            href="#">Show all</a>
        </div>
      </div>
    </section>
  </page-layout>
</template>


<script>
import PageLayout from '@/layouts/PageLayout.vue';
import { mapGetters } from 'vuex';
import HouseCard from '@/components/HouseCard.vue'

export default {
  name: 'SearchPage',
  components: {
    PageLayout,
    HouseCard
  },
  computed: {
    ...mapGetters(['rooms'])
  }
};
</script>

<style>
.section__items .grid-container {
  grid-template-columns: repeat(4, 1fr);
}

@media(max-width: 992px) {
  .section__items .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media(max-width: 576px) {
  .section__items .grid-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
