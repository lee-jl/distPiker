<template>
    <div id="app">
        <h1>省、市、区县、街道四级联动</h1>
        <distpicker v-model="defaultAddress"></distpicker>
        <br>
        <br>
        <Input @on-focus="showModal3 = true" v-model="address" placeholder="中国内的城市差不多齐全-国外是假数据" style="width: 300px" />
        <Input v-model="address1" placeholder="常用有bug" style="width: 300px" />
        <city-modal v-model="showModal3" @address="addressStr"></city-modal>

        <br>
        <br>
        <Input @on-focus="showModal4 = true" v-model="addressY" placeholder="Enter something..." style="width: 300px" />
        <Input v-model="addressY1" placeholder="Enter something..." style="width: 300px" />
        <count-modal v-model="showModal4" @address="addressStrY"></count-modal>

    </div>
</template>
<script>
import Distpicker from './components/Distpicker.vue';
import CityModal from './components/cityModal.vue'
import CountModal from './components/countModal.vue'
export default {
    name: 'app',
    components: { Distpicker, CityModal, CountModal },
    data() {
        return {
            defaultAddress: {
                province: '',
                city: '',
                district: '',
                street: ''
            },
            address: '',
            address1: '',
            showModal3: false,
            addressY: '',
            addressY1: '',
            showModal4: false
        }
    },
    methods: {
        addressStr(address) {
            console.log(address.join('-'), 'address')
            this.address = address.join('-')
        },
        addressStrY(addressY) {
            this.addressY = addressY.join('-')
        }
    }
}
</script>
<style lang="css">
    #app {
        position: relative;
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .citymodal /deep/ .ivu-modal {
        width: 500px !important; 
        top: 222px;
        left: -146px;
    }
    /* 弹框关闭按钮 */
    .ivu-modal-close {
        top: -4px;
        right: 0;
    }
    .ivu-icon-ios-close {
        color: #000;
    }
     /* 弹框头部 */
    .ivu-modal-header {
        padding: 0 10px;
        background-color: #f3f3f3;
    }
</style>