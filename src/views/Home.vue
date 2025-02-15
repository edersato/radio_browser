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
    
    <!-- Player (Funcional !!) -->
    <PlayerHeader ref="playerHeader" />

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
        <div class="d-flex justify-content-evenly py-3">
          <button class="btn btn-warning" @click="addToFavorites(radio)">
            {{
              isFavorite(radio.id)
                ? "Remover"
                : "Favoritar"
            }}
          </button>
  
          <button class="btn btn-primary" @click="playRadio(radio.name, radio.url || radio.url_resolved)">
            Tocar
          </button>
        </div>
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
    <Sidebar
      :favorites="favorites"
      @remove-favorite="removeFromFavorites"
      @update-favorite="updateFavorite"
    />
  </div>

  <!-- 
    nota: Algumas rádios a reprodução não vai funcionar, por motivos de 
    falha do acesso a url da rádio, pois muitas são webradios amadoras e 
    dependem da execução no servidor do dono da rádio.
    As rádios "maiores", a reprodução é garantida.
  -->
</template>

<script>
import api from "../services/api";
import axios from "axios"; // Axios para ler o json-server
import Card from "../components/RadioCard.vue";
import Sidebar from "../components/Sidebar.vue";
import PlayerHeader from "../components/PlayerHeader.vue";

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
    PlayerHeader
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
    
    // Toca a rádio selecionada ao clicar no botão
    playRadio(name, url) {
      this.$refs.playerHeader.setRadio(name, url);
    },
    
    // Checa o tamanho da tela para a computedClass funcionar
    updateWidth() {
      this.screenWidth = window.innerWidth;
    },
    
    // Muda a página de rádios
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    },
  },
  
  computed: {
    // Função para alterar visualização de itens no mobile/desktop
    displayItem() {
      return this.screenWidth < 768 ? "col-12" : "col-6";
    },
    
    // computed para as paginações
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

@media (min-width: 320px) and (max-width: 540px) {
  .btn-info, .btn-warning, .btn-primary {
    font-size: 8px;
  }
}
</style>