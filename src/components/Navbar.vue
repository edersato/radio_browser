<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-secondary ps-3">
        <router-link class="navbar-brand" to="/">Radio Browser</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
            </ul>
        </div>
    </nav>
    <router-view></router-view>
</template>

<script>


export default {
    name: 'Navbar',
}
</script>

<style scoped>
.navbar {
    margin-bottom: 20px;
}
</style>