<template>
  <Navbar />
  <Sidebar />
  <button 
    class="btn btn-primary btnFixo" 
    type="button" 
    data-bs-toggle="offcanvas" 
    data-bs-target="#listaFavoritas" 
    aria-controls="listaFavoritas">
  Minha Lista
</button>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
</script>

<style scoped>
#sidebar-nav {
    width: 160px;
}

.btnFixo {
  position: fixed;
  bottom: 20px;
  right: 20px; 
  z-index: 1050; 
}

@media (min-width: 320px) and (max-width: 768px) {
  .btnFixo {
    font-size: 8px;
    padding: 4px;
  }
}
</style>
