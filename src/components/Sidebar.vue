<template>
  <div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="listaFavoritas" aria-labelledby="listaFavoritasLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="listaFavoritasLabel">Rádios Favoritas</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <ul>
        <li v-for="radio in favorites" :key="radio.id">
          <div class="radio-info">
            <img :src="radio.favicon" alt="favicon" class="favicon">
            <span>{{ radio.name }} - {{ radio.country }}</span>
          </div>
          <button @click="editRadio(radio)">Editar</button>
          <button @click="removeFavorite(radio)">Remover</button>
        </li>
      </ul>
      <p v-if="favorites.length === 0">Nenhuma rádio favoritada.</p>
    </div>

    <!-- Modal de Edição -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Editar Rádio</h3>
        <label>Nome:</label>
        <input v-model="editForm.name" type="text" />
        
        <label>País:</label>
        <input v-model="editForm.country" type="text" />
        
        <label>Idioma:</label>
        <input v-model="editForm.language" type="text" />
        
        <label>Favicon:</label>
        <input v-model="editForm.favicon" type="text" />
        
        <div class="modal-buttons">
          <button @click="saveEdit">Salvar</button>
          <button @click="cancelEdit">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    favorites: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showEditModal: false,
      editForm: {
        id: null,
        name: "",
        country: "",
        language: "",
        favicon: "",
      },
    };
  },
  methods: {
    // Abrir o modal e carregar os dados atuais
    editRadio(radio) {
      this.editForm = { ...radio };
      this.showEditModal = true;
    },

    // Cancelar edição e fechar modal
    cancelEdit() {
      this.showEditModal = false;
    },

    // Salvar edição no JSON Server
    async saveEdit() {
      try {
        await axios.put(`http://localhost:3001/favorites/${this.editForm.id}`, this.editForm);
        this.$emit("update-favorite", this.editForm);
        this.showEditModal = false;
      } catch (error) {
        console.error("Erro ao atualizar rádio:", error);
      }
    },

    // Remover rádio dos favoritos
    removeFavorite(radio) {
      this.$emit("remove-favorite", radio);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.radio-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.favicon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

button {
  margin-left: 10px;
  cursor: pointer;
}

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
