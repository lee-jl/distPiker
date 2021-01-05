<template>
    <Modal
        class="citymodal"
        v-model="title4"
        title="  "
        :mask="false"
        :mask-closable="true"
        footer-hide>
            <Tabs @on-click="clicktabs($event)" type="card" class="cityTabs" v-model="tabIndex">
                <TabPane label="常用" name="0">
                      <!-- @on-change="clickCommon"  -->
                    <Tag 
                      class="tags" 
                      :color=" selectedIndex === index ? 'blue' : 'default' " 
                      checkable 
                      v-for="(item, index) in commonArray"
                      @on-change="selectCommon(item.Name, index)"
                      :key="item.Code"> 
                        {{item.Name}}
                    </Tag>
                </TabPane>
                <TabPane label="国家" name="1">
                    <Tag 
                      class="tags" 
                      :color=" selectedIndex === index ? 'blue' : 'default' " 
                      checkable 
                      v-for="(item,index) in countryArray" 
                      @on-change="selectCountry(item, index)"
                      :key="item.Code"> 
                        {{item.Name}} 
                    </Tag>
                </TabPane>
                <TabPane label="省份" name="2">
                        <Tag 
                        class="tags" 
                        :color=" selectedIndex1 === index ? 'blue' : 'default' " 
                        checkable 
                        @on-change="selectProvince(item.Name, index)" 
                        v-for="(item,index) in provinceArray" 
                        :key="item.Code"> 
                            {{item.Name}} 
                        </Tag>
                </TabPane>
                <TabPane label="城市" name="3">
                    <Tag 
                      class="tags" 
                      :color=" selectedIndex2 === index ? 'blue' : 'default' " 
                      checkable 
                      @on-change="selectCity(item, index)" 
                      v-for="(item,index) in cityArray" 
                      :key="item.Code"> 
                        {{item.Name}} 
                    </Tag>
                </TabPane>
                <TabPane label="区县" name="4">
                    <Tag 
                      class="tags" 
                      :color=" selectedIndex3 === index ? 'blue' : 'default' " 
                      checkable 
                      @on-change="selectDistrict(item.Name, index)" 
                      v-for="(item,index) in districtArray" 
                      :key="item.Code"> 
                        {{item.Name}} 
                    </Tag>
                </TabPane>
                <!-- <TabPane label="街道" name="5">
                    <Tag 
                      class="tags" 
                      :color=" selectedIndex4 === index ? 'blue' : 'default' " 
                      checkable 
                      @on-change="selectStreet(item.Name, index)" 
                      v-for="(item,index) in streetArray" 
                      :key="item.Code"> 
                        {{item.Name}} 
                    </Tag>
                </TabPane> -->
            </Tabs>
    </Modal>
</template>

<script>
import axios from 'axios';
export default {
    name: 'cityModal',
    data () {
        return {
            title4: false, 
            tabIndex: "1", // 选中的tab
            color: "default", // 选中的tag颜色
            selectedIndex: '', // 当前选中的下标
            selectedIndex1: '',
            selectedIndex2: '',
            selectedIndex3: '',
            // selectedIndex4: '',
            // checked: false
            address: {
                country: '', // 国家
                province: '', // 省份
                city: '', // 城市
                district: '', // 区县
                street: '' // 街道
            },
            addressData: '../static/json/city.json', // 所有数据 -- 模拟json数据
            commonArray: [], // 常用数组
            countryArray: [],  // 国家数组
			provinceArray: [],  // 省份数组
			cityArray: [],      // 城市数组
			districtArray: [],  // 区县数组
            streetArray: [],     // 街道数组
            finallyAddress: []
        }
    },
    // 子传父 双向绑定
    props: {
        value: {
            type: Boolean,
            default: false,
            require: true
        }
    },
    watch: {
        value: {
            handler (n) {
                this.title4 = n
            },
            immediate: true
        },
        title4 (n) {
            this.$emit('input', n)
        }
    },
    created() {
        this.getAddressData()
        console.log(this.provinceArray, 'provinceArray')
	},
    methods: {
        clicktabs(e) {
            console.log(e, 'e')
        },
        getAddressData() {
			axios.get(this.addressData).then(res => {
                console.log(res, 'res++++++++++++')
				if(res.status === 200) {
                    this.countryArray = res.data.Location.CountryRegion
                    // this.countryArray = arr.map(item => item.Name )
					//获取地址
                    if (this.address.country) {
                        for (let coun of this.countryArray) {
                            if (coun.Name === this.address.country) {
                                this.provinceArray = coun.State
                                if(this.address.province) {
                                    for(let prov of this.provinceArray) {
                                        if(prov.Name === this.address.province) {
                                            this.cityArray = prov.City
                                            // 默认赋值获取区域数组
                                            if(this.address.city) {
                                                for(let dist of this.cityArray) {
                                                    if(dist.Name === this.address.city) {
                                                        this.districtArray = dist.Region
                                                        break
                                                        // if(this.address.district) {
                                                        //     for(let street of this.districtArray) {
                                                        //         if(street.Name === this.address.street) {
                                                        //             this.streetArray = street.Region
                                                        //             break
                                                        //         }
                                                        //     }
                                                        // }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
				}
			})
        },
        selectCommon(name, index) {

        },
        // 选择国家并获取当前国家的省份
		selectCountry(item, index) {
            this.selectedIndex = index
            this.addressend(0, item.Name)
            // console.log(item.State, 'item.Stateitem.Stateitem.Stateitem.Stateitem.State')
            // console.log(Array.isArray(item.State), '==========')
            if (item.State) {
                if (Array.isArray(item.State) === true) {
                    // state内有数组项的跳转tab2
                    this.tabIndex = "2"
                } else{
                    // state不是对象，说明2级城市，跳转tab3
                    this.tabIndex = "3"
                }
            }
            this.address.province = ''
			this.address.city = ''
			this.address.district = ''
            this.address.street = ''
            this.cityArray = []
			this.districtArray = []
            this.streetArray = []
			for(let coun of this.countryArray) {
                if(coun.Name === item.Name) {
                    if (item.State) {
                        if (Array.isArray(item.State) === true) {
                            // state内有数组项的赋值
                            this.provinceArray = coun.State
                        } else {
                            // state内没数组项的不赋值
                            this.provinceArray = []
                            this.cityArray = coun.State.City
                        }
                    } else {
                        this.end()
                    }
                    this.chushihua()
                    return

				}
			}
		},
		// 选择省份并获取当前省份的城市数组
		selectProvince(name, index) {
            this.selectedIndex1 = index
            console.log(name,'name')
            this.addressend(1, name)
            this.tabIndex = "3"
			this.address.city = '';
			this.address.district = '';
			this.address.street = '';
			this.districtArray = [];
			this.streetArray = [];
			for(let prov of this.provinceArray) {
				if(prov.Name === name) {
					this.cityArray = prov.City;
					return;
				}
			}
		},
		// 选择城市，并获取对应的区县数组
		selectCity(item, index) {
            this.selectedIndex2 = index
            this.addressend(2, item.Name)
            this.commonPush(item.Name)
            if (item.Region) {
                // city里有region的去tab4
                this.tabIndex = "4"
            } else {
                // city里没有region的关弹框 退出来
                this.end()
                return
            }
			this.address.district = '';
			this.address.street = '';
			this.streetArray = [];
			for(let city of this.cityArray) {
				if(city.Name === name) {
                    if (item.Region) {
                        this.districtArray = city.Region;
                    }
                    return
				}
			}
		},
		// 选择区县
		selectDistrict(name, index) {
            this.selectedIndex3 = index // 记录当前选中下标
            this.addressend(3, name)
            this.end()
		},
        // 将当前选中下标置为空  -- 封装函数
        chushihua () {
            this.selectedIndex = ''
            this.selectedIndex1 = ''
            this.selectedIndex2 = ''
            this.selectedIndex3 = ''
            this.selectedIndex4 = ''
        },
        // 最终恢复默认值操作
        end() {
            this.$emit('address', this.finallyAddress) // 子传父
            this.title4 = false // 关闭弹框
            this.finallyAddress = [] // 最终地址数组置空
            this.tabIndex = "0" // 跳转回tab1 常用
            this.$Message.success('已选择完毕'); // 弹框
            // 之前选项置空
            this.provinceArray = []
            this.cityArray = []
            this.districtArray = []
            this.streetArray = []
        },
        // 最终地址数据收集
        addressend(num, name) {
            const index = this.finallyAddress.findIndex(item => item === name)
            if (index === -1) {
                this.finallyAddress[num] = name
            } else {
                return
            }
            console.log(this.finallyAddress, 'this.finallyAddress')
        },
        // 常用数组加入值
        commonPush(name) {
            const now = +new Date()
            const index = this.commonArray.findIndex(item => item.Name === name)
            console.log(index, 'index')
            if (index !== -1) {
                this.commonArray.splice(index, 1)
            }
            // 限制常用数组长度
            if (this.commonArray.length >= 30) {
                this.commonArray.pop()
                this.commonArray.unshift({"Code": now,"Name": name})
            } else {
                this.commonArray.unshift({"Code": now,"Name": name})
            }
            console.log(this.commonArray, 'this.commonArray')
        }
    }
}
</script>

<style lang="less" scoped>
// 城市弹框
.citymodal {
    // height: 100%;
    // 弹框样式调整

    /deep/ .ivu-tabs-content {
        .ivu-tabs-tabpane {
            height: 200px;
            overflow: auto;
            // padding: 0 30px;
            
            // 每个tag样式
            .ivu-tag {
                width: calc(20% - 4px);
                height: 40px;
                line-height: 40px;
                margin: 2px;
                padding: 0 5px;
                text-align: center;
                border: 1px solid #108ee9;
                background-color: #fff;
                overflow: hidden; //超出的文本隐藏
                text-overflow: ellipsis; //溢出用省略号显示
                white-space: nowrap; //溢出不换行
                span {
                    color: #108ee9;
                }
            }
            .ivu-tag-blue {
                background-color: #e6f7ff;
                border: 1px solid #91d5ff;
                span {
                    color: #1890ff;
                }
            }
        }
    }
    // 城市tab栏
    .cityTabs {
        /deep/ .ivu-tabs-bar {
            // tab背景色
            .ivu-tabs-tab {
                background-color: #f3f3f3;
            }
            .ivu-tabs-tab-active,
            .ivu-tabs-tab-focused {
                background-color: #ffb138;
                color: #515a6e;
                border-bottom: 0px;
            }
        }
    }
}
</style>