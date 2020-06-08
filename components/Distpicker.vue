<template>
	<div>
		<el-select v-model="address.province" placeholder="选择省份" @change="selectProvince">
			<el-option 
				v-for="item in provinceArray"
				:key="item.code"
				:label="item.name"
				:value="item.name">
			</el-option>
		</el-select>
		<el-select v-model="address.city" placeholder="选择城市" @change="selectCity">
			<el-option
				v-for="item in cityArray"
				:key="item.code"
				:label="item.name"
				:value="item.name">
			</el-option>
		</el-select>
		<el-select v-model="address.district" placeholder="选择区县" @change="selectDistrict">
			<el-option 
				v-for="item in districtArray"
				:key="item.code"
				:label="item.name"
				:value="item.name">
			</el-option>
		</el-select>
		<el-select v-model="address.street" placeholder="选择区县" @change="selectStreet">
			<el-option 
				v-for="item in streetArray"
				:key="item.code"
				:label="item.name"
				:value="item.name">
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
			addressData: '../static/json/pcas.json',    // 所有数据
			provinceArray: [],  // 省份数组
			cityArray: [],      // 城市数组
			districtArray: [],  // 区县数组
			streetArray: []     // 街道数组
		}
	},
	created() {
		this.getAddressData();
	},
	methods: {
		getAddressData() {
			axios.get(this.addressData).then(res => {
				if(res.status === 200) {
					//获取地址
					this.provinceArray = res.data;
					if(this.address.province) {
						for(let prov of this.provinceArray) {
							if(prov.name === this.address.province) {
								this.cityArray = prov.children;
								// 默认赋值获取区域数组
								if(this.address.city) {
									for(let dist of this.cityArray) {
										if(dist.name === this.address.city) {
											this.districtArray = dist.children;
											if(this.address.district) {
												for(let street of this.districtArray) {
													if(street.name === this.address.street) {
														this.streetArray = street.children;
														break
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
		// 选择省份并获取当前省份的城市数组
		selectProvince(val) {
			console.log('省份', this.address.province);
			this.$emit('change', this.address);
			this.address.city = '';
			this.address.district = '';
			this.address.street = '';
			this.districtArray = [];
			this.streetArray = [];
			for(let prov of this.provinceArray) {
				if(prov.name === val) {
					this.cityArray = prov.children;
					return;
				}
			}
		},
		// 选择城市，并获取对应的区县数组
		selectCity(val) {
			console.log('城市', this.address.city);
			this.$emit('change', this.address);
			this.address.district = '';
			this.address.street = '';
			this.streetArray = [];
			for(let dist of this.cityArray) {
				if(dist.name === val) {
					this.districtArray = dist.children;
					return;
				}
			}
		},
		// 选择区县
		selectDistrict(val) {
			console.log('区县', this.address.district);
			this.$emit('change', this.address);
			this.address.street = '';
			for(let street of this.districtArray) {
				if(street.name === val) {
					this.streetArray = street.children;
					break;
				}
			}
		},
		// 选择街道
		selectStreet(val) {
			console.log('街道', this.address.street);
			this.$emit('change', this.address);
		}
	}
}
</script>