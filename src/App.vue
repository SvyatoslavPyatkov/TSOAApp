<template>
    <div id="app">
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <router-link to="/" class="navbar-brand">TSOA</router-link>
            <div class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/api/education_programs" class="nav-link">Программы обучения</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/api/groups" class="nav-link">Группы</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/api/learners" class="nav-link">Слушатели</router-link>
                </li>
            </div>
        </nav>

        <div class="">
            <router-view />
        </div>
    </div>
</template>

<script>
    export default {
        name: "app"
    };
</script>