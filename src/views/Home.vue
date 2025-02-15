<template>
  <h1>Home</h1>
  <Card />
</template>

<script>
import api from "../services/api";
import Card from '../components/RadioCard.vue'
export default {

    data() {
        return {
            radios: [],
        };
    },
    
    components: {
      Card
    },

  methods: {
    getRadios() {
      api
        .get("country=Brazil&countrycode=BR")
        .then((response) => {
          console.log("API response: ", response.data);
          this.radios = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  mounted() {
    this.getRadios();
  }
};
</script>

<style>
</style>