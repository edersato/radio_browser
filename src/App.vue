<template>
  <Navbar />
  <Sidebar />
  
  <button 
    class="btn btn-primary fixed-button" 
    type="button" 
    data-bs-toggle="offcanvas" 
    data-bs-target="#staticBackdrop" 
    aria-controls="staticBackdrop">
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

.fixed-button {
  position: fixed;
  bottom: 20px;
  right: 20px; 
  z-index: 1050; 
}
</style>
