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
        <el-select v-model="address.district" placeholder="选择区县" @change="onDistrictChanged">
            <el-option 
                v-for="item in areaArray"
                :key="item.areaCode"
                :label="item.areaName"
                :value="item.areaName">
            </el-option>
        </el-select>
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
            areaJson: '../static/json/pcas.json',
            addressArray: [],
            cityArray: [],
            areaArray: []
        }
    },
    created() {
        this.getAddressData();
    },
    methods: {
        getAddressData() {
            axios.get(this.areaJson).then(res => {
                if(res.status === 200) {
                    //获取地址
                    this.addressArray = res.data;
                    console.dir(this.addressArray);
                    if(this.address.province) {
                        console.log(this.address.province)
                        for(let ad of this.addressArray) {
                            if(ad.areaName === this.address.province) {
                                this.cityArray = ad.children;
                                // 默认赋值获取区域数组
                                if(this.address.city) {
                                    for(let area of this.cityArray) {
                                        if(area.areaName === this.address.city) {
                                            this.areaArray = area.children;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        },
        getCityData(val) {
            console.log('AAA', this.address);
            this.address.province = '';
            this.address.city = '';
            this.$emit('change', this.address);
            for(let ad of this.addressArray) {
                if(ad.areaName === val) {
                    this.cityArray = ad.children;
                    return;
                }
            }
        },
        getDistrictData(val) {
            console.log('BBB', this.address);
            this.address.district = '';
            this.$emit('change', this.address);
            for(let area of this.cityArray) {
                if(area.areaName === val) {
                    this.areaArray = area.children;
                    return;
                }
            }
        },
        //区县发生变化后
        onDistrictChanged(val) {
            console.log('CCC', this.address);
            this.$emit('change', this.address);
        }
    }
}
</script>