<template>
  <!-- Cria um card para cada radio da api -->
  <div class="card">
    <div class="card-body">
      <img :src="favicon" class="card-img-top" alt="Logo do station" v-if="favicon">
      <h5 class="card-title mt-3">{{ name }}</h5>
      <h6 class="card-subtitle my-2 text-muted">{{ state }}, {{ country }}</h6>
      <h6 class="card-subtitle mb-2 text-muted">{{ tags }}</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    name: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    tags: {
      type: String,
      required: true
    },
    favicon: {
      type: String,
      default: ''
    }

  }
}
</script>

<style lang="scss" scoped>
.card {
  transition: 1s ease-in;
  &:hover {
      transition: 1s ease-out;
      border: 1px solid firebrick;
    }

  img {
    width: 30%;
  }
}
</style>