<template>
  <default-layout>
    <section class="container py-6">
      <h1 class="text-3xl font-light text-grey-darkest mb-3">Recomended</h1>
      <div class="section">
        <tiny-slider>
          <div class="slider-item">1</div>
          <div class="slider-item">2</div>
          <div class="slider-item">3</div>
          <div class="slider-item">4</div>
          <div class="slider-item">5</div>
          <div class="slider-item">6</div>
        </tiny-slider>
      </div>
    </section>
    <section class="container py-6">
      <h1 class="text-3xl font-light text-grey-darkest mb-3">Explore</h1>
      <div class="section__explore grid-container mb-8">
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
    </section>
  </default-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import DefaultLayout from '@/layouts/DefaultLayout'
import TinySlider from '@/containers/TinySlider'
import HouseCard from '@/components/HouseCard'

export default {
  name: 'HomePage',
  components: {
    DefaultLayout,
    TinySlider,
    HouseCard
  },
  beforeCreate () {
    this.$store.dispatch('FETCH_ROOMS', 12);
  },
  computed: {
    ...mapGetters(['rooms'])
  }
};
</script>

<style lang="css">
  .section__explore {
    grid-template-columns: repeat(4, 1fr);
  }

  .house__card > .house__thumbnail {
    height: 170px;
  }

  .house__thumbnail > .house__image {
    width: 100%;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }

  @media(max-width: 992px) {
    .house__card > .house__thumbnail {
      height: 150px;
    }
    .section__explore {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media(max-width: 576px) {
    .section__explore {
      grid-template-columns: repeat(1, 1fr);
    }

    .house__card > .house__thumbnail {
      height: 120px;
    }
  }
</style>
