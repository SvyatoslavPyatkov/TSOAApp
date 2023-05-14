<template>
    <div id="app">
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <router-link to="/" class="navbar-brand">TSOA</router-link>
        <div class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link to="/api/education_programs" class="nav-link">EduPrograms</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/api/education_programs/add" class="nav-link">Add</router-link>
            </li>
        </div>
        </nav>

        <div class="container mt-3">
            <router-view />
        </div>
    </div>
</template>

<script>
    export default {
        name: "app"
    };
</script>


<style>
    
</style>
