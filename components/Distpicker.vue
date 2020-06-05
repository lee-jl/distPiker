<template>
    <div>
        <el-select v-model="address.province" placeholder="选择省份" @change="getCityData">
            <el-option 
                v-for="item in addressArray"
                :key="item.areaCode"
                :label="item.areaName"
                :value="item.areaName">
            </el-option>
        </el-select>
        <el-select v-model="address.city" placeholder="选择城市" @change="getDistrictData">
            <el-option
                v-for="item in cityArray"
                :key="item.areaCode"
                :label="item.areaName"
                :value="item.areaName">
            </el-option>
        </el-select>
        <el-selection v-model="address.district" placeholder="选择区县" @change="onDistrictChanged">
            <el-option 
                v-for="item in districtArray"
                :key="item.areaCode"
                :label="item.areaName"
                :value="item.areaName">
            </el-option>
        </el-selection>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'distpicker',
    model: {
        prop: 'address',
        event: 'change'
    },
    props: {
        address: {
            type: Object
        }
    },
    data() {
        return {
            areaJson = '',
            addressArray: [],
            cityArray: [],
            districtArray: []
        }
    },
    created() {
        this.getAddressData();
    },
    methods: {
        getAddressData() {
            axios.get().then(res => {
                if(res.status === 200) {
                    //获取地址
                    this.addressArray = res.data.data;

                }
            })
        },
        getCityData(val) {

        },
        getDistrictData(val) {

        },
        //区县发生变化后
        onDistrictChanged(val) {
            this.$emit('change', this.address);
        }
    }
}
</script>