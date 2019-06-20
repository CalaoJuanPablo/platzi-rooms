<template>
  <div class="house__card mb-3">
    <div class="house__thumbnail relative overflow-hidden">
      <img class="house__image absolute w-full" width="250" :src="room.featured_image">
    </div>
    <div class="house__content bg-white p-3 border rounded">
      <div class="house__type font-semibold text-xs uppercase text-teal-dark mb-1">
        {{ room.type }}
      </div>
      <div class="house__title font-bold mb-2">
        {{ room.title }}
      </div>
      <div class="house__price text-xs">
        <span class="font-bold">${{ room.price }} MXN</span> per night
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HouseCard',
  props: ['room']
}
</script>

