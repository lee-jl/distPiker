<template>
    <div id="app">
        <h1>省、市、区县、街道四级联动</h1>
        <distpicker v-model="defaultAddress"></distpicker>
    </div>
</template>
<script>
import Distpicker from './components/Distpicker.vue';
export default {
    name: 'app',
    components: { Distpicker },
    data() {
        return {
            defaultAddress: {
                province: '',
                city: '',
                district: '',
                street: ''
            }
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