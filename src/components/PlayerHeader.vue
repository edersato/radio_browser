<template>
  <div class="radio-player d-flex justify-content-between align-items-center p-3">
    <div class="radio-info">
      <p class="current-radio-name mb-0">{{ currentRadioName }}</p>
    </div>
    <div class="controls d-flex align-items-center">
      <button 
        @click="togglePlay" 
        class="btn btn-outline-primary mr-2"
        :class="isPlaying ? 'btn-danger' : 'btn-success'">
        <i :class="isPlaying ? 'fas fa-stop' : 'fas fa-play'"></i>
      </button>
    </div>
    <!-- Player de áudio que toca em modo oculto. -->
    <audio ref="audioElement" :src="currentRadioUrl" style="display: none;"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false,
      currentRadioName: "Aguardando..", 
      currentRadioUrl: "",
    };
  },
  methods: {
    // Alterna entre play e pause no áudio
    togglePlay() {
      const audio = this.$refs.audioElement;
      if (!audio) return;

      if (this.isPlaying) {
        audio.pause();
        this.isPlaying = false;
        console.log("Rádio parada...");
      } else {
        if (!this.currentRadioUrl) {
          console.warn("Nenhuma rádio selecionada para tocar.");
          return;
        }
        audio.play()
          .then(() => {
            this.isPlaying = true;
            console.log("Rádio em execução...");
          })
          .catch((error) => {
            console.error("Erro ao reproduzir a rádio:", error);
          });
      }
    },

    // Atualiza a rádio a ser reproduzida e inicia a reprodução
    setRadio(radioName, radioUrl) {
      const audio = this.$refs.audioElement;

      // Se já estiver tocando uma rádio diferente, pausa a atual
      if (this.isPlaying && this.currentRadioUrl !== radioUrl) {
        audio.pause();
        this.isPlaying = false;
      }

      this.currentRadioName = radioName;
      this.currentRadioUrl = radioUrl;

      // Tenta reproduzir a nova rádio automaticamente
      if (radioUrl && !this.isPlaying) {
        audio.play()
          .then(() => {
            this.isPlaying = true;
            console.log("Nova rádio em execução...");
          })
          .catch((error) => {
            console.error("Erro ao reproduzir a nova rádio:", error);
          });
      }
    }
  }
};
</script>

<style scoped>
.current-radio-name {
  font-weight: bold;
  font-size: 16px;
}

.controls {
  display: flex;
  align-items: center;
}

button {
  font-size: 18px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

button i {
  font-size: 20px;
}
</style>
