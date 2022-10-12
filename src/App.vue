<template>
    <div id="app">
      <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {
            // Home
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        data() {
            return {
                defaultOpeneds: ['1']

            }
        }
    }
</script>

<style>
    /*#app {*/
    /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*!*margin-top: 60px;*!*/
    /*}*/
    .menu-ct {
        width: 200px;
        position: absolute;
        /*left: 0;*/
        /*min-height: 100vh;*/
    }

    .menu-ct li.el-submenu {
        text-align: left;
    }

    .router-view {
        margin-left: 220px;
        min-height: 50px;
    }
</style>
