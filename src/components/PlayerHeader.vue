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
      <button class="btn btn-outline-secondary">
        <i class="fas fa-volume-up"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false,
      currentRadioName: "Radio Example", // Nome da rádio
    };
  },
  methods: {
    togglePlay() {
      this.isPlaying = !this.isPlaying;
      // Lógica para começar/parar a rádio pode ser colocada aqui
      if (this.isPlaying) {
        console.log("Rádio em execução...");
        // Iniciar o áudio
      } else {
        console.log("Rádio parada...");
        // Parar o áudio
      }
    },
  },
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
