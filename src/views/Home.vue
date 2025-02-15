<template>
  <div class="container text-center">
    <!-- Barra de pesquisa -->
    <input
      v-model="query"
      @input="filterRadios"
      type="text"
      placeholder="Pesquise por nome, país ou idioma..."
      class="search-input"
    />

    <!-- Cards -->
    <div class="row">
      <div
        :class="displayItem"
        v-for="radio in paginatedRadios"
        :key="radio.id"
      >
        <Card
          :name="radio.name"
          :state="radio.state"
          :country="radio.country"
          :tags="radio.tags"
          :favicon="radio.favicon"
        />
        <button @click="addToFavorites(radio)">
          {{
            isFavorite(radio.id)
              ? "Remover dos Favoritos"
              : "Adicionar aos Favoritos"
          }}
        </button>
      </div>
    </div>

    <!-- Paginação -->
    <div class="pagination justify-content-evenly mt-3">
      <button
        class="btn btn-info"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        Anterior
      </button>
      <button
        class="btn btn-info"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        Próximo
      </button>
    </div>

    <!-- Sidebar -->
    <Sidebar :favorites="favorites" @remove-favorite="removeFromFavorites" @update-favorite="updateFavorite" />
  </div>
</template>

<script>
import api from "../services/api";
import axios from "axios"; // Importando Axios para as requisições
import Card from "../components/RadioCard.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
  data() {
    return {
      radios: [],
      filteredRadios: [],
      favorites: [],
      query: "",
      currentPage: 1,
      itemsPerPage: 10,
      screenWidth: window.innerWidth,
    };
  },

  components: {
    Card,
    Sidebar,
  },

  methods: {
    // Carrega todas as rádios da API
    getRadios() {
      api
        .get("")
        .then((response) => {
          this.radios = response.data.filter(
            (radio) => radio.favicon && radio.favicon.trim() !== ""
          );
          this.filterRadios();
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // Filtragem dinâmica de rádios
    filterRadios() {
      if (!this.query.trim()) {
        this.filteredRadios = this.radios;
        return;
      }

      const queryLower = this.query.toLowerCase();
      this.filteredRadios = this.radios.filter(
        (radio) =>
          radio.name.toLowerCase().includes(queryLower) ||
          radio.country.toLowerCase().includes(queryLower) ||
          radio.language.toLowerCase().includes(queryLower)
      );
    },

    // Carrega os favoritos do JSON Server
    loadFavorites() {
      axios
        .get("http://localhost:3001/favorites")
        .then((response) => {
          this.favorites = response.data;
        })
        .catch((error) => {
          console.error("Erro ao carregar favoritos:", error);
        });
    },

    // Adiciona ou remove dos favoritos no JSON Server
    async addToFavorites(radio) {
      const existing = this.favorites.find((fav) => fav.id === radio.id);

      if (!existing) {
        try {
          const response = await axios.post(
            "http://localhost:3001/favorites",
            radio
          );
          this.favorites.push(response.data);
        } catch (error) {
          console.error("Erro ao adicionar favorito:", error);
        }
      } else {
        this.removeFromFavorites(radio);
      }
    },

    // Remove rádio dos favoritos no JSON Server
    async removeFromFavorites(radio) {
      try {
        await axios.delete(`http://localhost:3001/favorites/${radio.id}`);
        this.favorites = this.favorites.filter((fav) => fav.id !== radio.id);
      } catch (error) {
        console.error("Erro ao remover favorito:", error);
      }
    },

    updateFavorite(updatedRadio) {
      const index = this.favorites.findIndex(
        (fav) => fav.id === updatedRadio.id
      );
      if (index !== -1) {
        this.favorites[index] = updatedRadio;
      }
    },

    // Verifica se um rádio está nos favoritos
    isFavorite(id) {
      return this.favorites.some((fav) => fav.id === id);
    },

    updateWidth() {
      this.screenWidth = window.innerWidth;
    },

    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    },
  },

  computed: {
    displayItem() {
      return this.screenWidth < 768 ? "col-12" : "col-6";
    },

    paginatedRadios() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredRadios.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredRadios.length / this.itemsPerPage);
    },
  },

  mounted() {
    this.getRadios();
    this.loadFavorites(); // Carregar favoritos ao iniciar
    window.addEventListener("resize", this.updateWidth);
  },
};
</script>


<style scoped>
.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
