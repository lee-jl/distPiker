<template>
    <div id="app">
        <distpicker v-model="defaultAddress"></distpicker>
    </div>
</template>
<script>
import Distpicker from './components/Distpicker';
export default {
    components: { Distpicker },
    data() {
        return {
            defaultAddress: {}
        }
    }
}
</script>
<style lang="css">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>