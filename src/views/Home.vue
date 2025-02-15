<template>
  <div class="container text-center">
    <div class="row">
      <div :class="displayItem" v-for="radio in radios" :key="radio.name">
        <Card
        :name="radio.name" 
        :state="radio.state" 
        :country="radio.country" 
        :tags="radio.tags"
        :favicon="radio.favicon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api";
import Card from "../components/RadioCard.vue";

export default {
  data() {
    return {
      radios: [],
      screenWidth: window.innerWidth
    };
  },

  components: {
    Card,
  },

  methods: {
    getRadios() {
      api
        .get("country=Brazil&countrycode=BR")
        .then((response) => {
          console.log("API response: ", response.data);
          this.radios = response.data.filter(
            radio => radio.favicon && radio.favicon.trim() !== "");
        })
        .catch((error) => {
          console.error(error);
        });
    },

    updateWidth() {
      this.screenWidth = window.innerWidth;
    }
  },

  computed: {
    displayItem() {
      return this.screenWidth < 768 ? "col-12" : "col-6";
    }
  },

  mounted() {
    this.getRadios();
    window.addEventListener("resize", this.updateWidth);
  },
};
</script>