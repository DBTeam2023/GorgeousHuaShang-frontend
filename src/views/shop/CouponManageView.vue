<template>
    <div class="order-summary">
      <h1 class="title">现有优惠券列表</h1>
      <el-row :gutter="20" class="filters">
        <el-col :span="4">
          <el-button type="primary" @click="dialogGenerateVisible = true"
                     style="margin-top: 30px;">新增优惠券</el-button>
        </el-col>
        <!-- 生成优惠券表单 -->
        <el-dialog
            v-model="dialogGenerateVisible"
            title="新增优惠券"
            width="50%"
            :before-close="resetForm"
        >
          <el-form label-width="20%" ref="formRef" :model="newCoupon" :rules="CouponRules">
            <el-form-item label="有效期" prop="time">
              <el-date-picker
                v-model="validTime"
                type="datetimerange"
                range-separator="To"
                start-placeholder="有效期始"
                end-placeholder="有效期止"
              />
            </el-form-item>
            <el-form-item label="优惠券类型" prop="type">
              <el-select v-model="newCoupon.type" placeholder="请选择优惠券类型">
                <el-option label="满减券" value="maxout" />
                <el-option label="折扣券" value="discount" />
              </el-select>
            </el-form-item>
            <el-form-item label="折扣大小" v-show="newCoupon.type === 'discount'">
              <el-input-number v-model="newCoupon.discount" :precision="2" :step="0.1" :min="0" :max="0.99" />
            </el-form-item>
            <el-form-item label="满减门槛" v-show="newCoupon.type === 'maxout'">
              <el-input-number v-model="newCoupon.bar" :precision="1" :step="10" :min="0" :max="999999" />
            </el-form-item>
            <el-form-item label="满减金额" prop="reduction" v-show="newCoupon.type === 'maxout'">
              <el-input-number v-model="newCoupon.reduction" :precision="1" :step="10" :min="0" :max="999999" />
            </el-form-item>
          </el-form>
  
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="resetForm()">取消</el-button>
              <el-button type="primary" @click="generateNewCoupon()">确认</el-button>
            </span>
          </template>
        </el-dialog>
      </el-row>

      <!-- 优惠券信息列表 -->
      <el-table :data="couponList" border stripe v-loading="isload">
        <el-table-column prop="couponId" label="优惠券ID" width="125"></el-table-column>
        <el-table-column prop="type" label="类型" width="85"></el-table-column>
        <el-table-column prop="discount" label="折扣" width="80"></el-table-column>
        <el-table-column prop="bar" label="满减门槛" width="85"></el-table-column>
        <el-table-column prop="reduction" label="满减金额" width="85"></el-table-column>
        <el-table-column prop="validfrom" label="起始时间" width="170"></el-table-column>
        <el-table-column prop="validto" label="截止时间" width="170"></el-table-column>
        <el-table-column prop="add" label="发放优惠券" width="120">
          <template v-slot="scope">
            <el-button type="success" @click="showBuyerList(scope.$index)" round>发放优惠券</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="delete" label="删除" width="90">
          <template v-slot="scope">
            <el-button type="danger" @click="deleteCoupon(scope.$index)" round>删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 收藏用户列表 -->
      <el-dialog
          v-model="dialogBuyerVisible"
          title="选择用户添加优惠券">
        <el-row style="margin:10px 0">当前选中优惠券ID：{{ selectedCoupon }}</el-row>
        <el-table ref="buyerTableRef" 
                  :data="buyerList" 
                  style="width:100%"
                  @selection-change="selectBuyersChange">
          <el-table-column type="selection"/>
          <el-table-column prop="userId" label="买家ID" width="1000"></el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button type="primary" @click="addCoupons()"
            >确认加入所选用户钱包</el-button
          >
        </div>

        <!-- 用户列表分页 -->
            <el-pagination class="pagination"
                background
                v-model:currentPage="buyerCurrentPage"
                v-model:pageSize="buyerPageSize"
                :total="buyerTotal"
                @current-change="handleBuyerPageChange"
            >
            </el-pagination>
      </el-dialog>

      <!-- 优惠券列表分页 -->
      <el-row class="pagination">
        <el-pagination 
            background
            v-model:currentPage="currentPage"
            v-model:pageSize="pageSize"
            :total="total"
            @current-change="handlePageChange"
        >
        </el-pagination>
      </el-row>
  
    </div>
  </template>
  
  <script setup>
  import {computed, onMounted, ref, watch, reactive} from 'vue';
  import { ElMessage } from 'element-plus';
  import { getStoreCoupon, generateCoupon, addCoupon, deleteStoreCoupon } from '@/api/coupon';
  import {useRoute} from "vue-router";
  import { getBuyers } from '@/api/store';
  import { utc2cn } from '@/utils/timeTransfer';
  
  const route = useRoute();
  const isload = ref(false);
  
  const dialogGenerateVisible = ref(false);//生成优惠券是否可见
  const dialogBuyerVisible = ref(false);//用户列表是否可见
  const selectedCoupon = ref('');
  
  
  // 分页状态
  const currentPage = ref(1);
  const buyerCurrentPage = ref(0);
  const pageSize = ref(10);
  const buyerPageSize = ref(10);
  const total = ref(1);
  const buyerTotal = ref(0);
  
  // 优惠券列表
  const couponList = ref([])

  // 买家列表
  const buyerList = ref([]);

  // 选中要添加优惠券的买家列表
  const selectedBuyers = ref([]);

  // 新增优惠券信息
  const newCoupon = ref({
    storeId: route.query.storeid,
    commodityId:'',
    type:'',
    discount:0,
    bar:0,
    reduction:0,
    start:'',
    end:'',
  })

  // 优惠券有效期
  const validTime = ref('')

  // 生成优惠券表单引用
  const formRef = ref(null);

  // 满减金额条件
  const validateReduction = (rule,value,callback) => {
    if(value > newCoupon.value.bar){
      callback(new Error('满减金额不能高于满减门槛'))
    }
    else{
      callback();
    }
  }

  // 有效期条件
  const validateTime = (rule,value,callback) =>{
    if(validTime.value === ''){
      callback(new Error('请选择有效期'));
    }
    else{
      callback();
    }
  }

  // 优惠券类型条件
  const validateType = (rule, value, callback) =>{
    if(value === ''){
      callback(new Error('请选择优惠券类型'));
    }
    else{
      callback();
    }
  }

  // 优惠券规则
  const CouponRules = reactive({
    reduction:[{
      validator: validateReduction,
      trigger:'change',
    }],
    time:[{
      validator: validateTime,
      trigger:'change',
    }],
    type:[{
      validator: validateType,
      trigger:'change',
    }]
  })

  // 获取商家优惠券信息
  onMounted(() => {
    getCouponInPage();
  })

  // 生成优惠券
  const generateNewCoupon = () =>{
    formRef.value.validate((valid) => {
        if(valid){//表单验证成功，进行提交操作
          newCoupon.value.start = validTime.value[0].toISOString();
          newCoupon.value.end = validTime.value[1].toISOString();
          //调用后端生成优惠券
          generateCoupon({
            storeId: newCoupon.value.storeId,
            commodityId:'',
            type:newCoupon.value.type,
            discount:newCoupon.value.discount,
            bar:newCoupon.value.bar,
            reduction:newCoupon.value.reduction,
            start:newCoupon.value.start,
            end:newCoupon.value.end,
          })
            .then(resp =>{
              ElMessage.success('成功生成优惠券！')
              console.log('成功生成优惠券',resp);
              getCouponInPage();

            })
            .catch(err =>{
              ElMessage.error('生成优惠券失败，请重试！');
            })
          resetForm();
        }
        else{
          ElMessage.error('请检查表单是否填写正确！');
        }
    })
  }

  // 表单重置
  const resetForm = () => {
    newCoupon.value.type = '';
    newCoupon.value.discount = 0;
    newCoupon.value.bar = 0;
    newCoupon.value.reduction = 0;
    newCoupon.value.start = '';
    newCoupon.value.end = '';
    validTime.value='';
    dialogGenerateVisible.value = false;
  }
  
  // 分页获取商店当前优惠券
  function getCouponInPage() {
    isload.value = true;
    getStoreCoupon({
      pageNo: currentPage.value,
      pageSize: pageSize.value,
      storeId: newCoupon.value.storeId,
      storeName: '',
    })
        .then(resp => {
          console.log(resp);
          couponList.value = resp.data.records;
          total.value = resp.data.total;
          for(const coupon of couponList.value){
            coupon.validfrom = utc2cn(coupon.validfrom);
            coupon.validto = utc2cn(coupon.validto);
          }
        })
        .catch(resp => {
          ElMessage.error("拉取优惠券列表失败！")
        })
        .finally(()=>{
          isload.value = false;
        })
  }

  // 分页获取商店的关注用户
  const getBuyersInPage = () =>{
    isload.value = true;
    getBuyers({
      pageNo: buyerCurrentPage.value,
      pageSize: buyerPageSize.value,
      storeId: newCoupon.value.storeId,
    })
        .then(resp => {
          buyerList.value = resp.data.records;
          buyerTotal.value = resp.data.total;
        })
        .catch(resp => {
          ElMessage.error("拉取关注用户列表失败！")
        })
        .finally(()=>{
          isload.value = false;
        })
  }

  
  // 处理优惠券页码变化
  const handlePageChange = () => {
    getCouponInPage();
  };

  // 处理买家页码变化
  const handleBuyerPageChange = () => {
    getBuyersInPage();
  }

  // 选择买家发放优惠券
  const showBuyerList = (index) =>{
    getBuyersInPage();
    selectedCoupon.value = couponList.value[index].couponId;
    dialogBuyerVisible.value = true;
  }

  // 商家选择的用户变化
  const selectBuyersChange = (val) =>{
    selectedBuyers.value = val;
  }

  // 优惠券加入用户加入钱包
  const addCoupons = async () =>{
    let showSuccess = ref(true);
    const promises = [];
    for(const buyer of selectedBuyers.value){
      const promise = addCoupon({
        userId: buyer.userId,
        couponId: selectedCoupon.value,
      })
      .then(resp =>{
        console.log(resp);
      })
      .catch(err =>{
        console.log(err);
        showSuccess.value = false;
        if(err.response.status === 409){
          ElMessage.error('用户'+buyer.userId+'已拥有该优惠券！');
        }
        else{
          ElMessage.error('添加失败，请重试！');
        }
      })
      promises.push(promise);
    }

    await Promise.all(promises);//等待for循环结束

    if(showSuccess.value === true){
      ElMessage.success('添加优惠券成功！');
      dialogBuyerVisible.value = false;
    }
  }

  // 删除优惠券
  const deleteCoupon = (index) =>{
    deleteStoreCoupon({
      couponId: couponList.value[index].couponId,
    })
    .then(resp =>{
      console.log(resp);
      ElMessage.success('删除优惠券成功！');
      getCouponInPage();  
    })
    .catch(err =>{
      if(err.response.code === 404)
        ElMessage.error('优惠券不存在，请重试！');
      else 
        ElMessage.error('删除失败，请重试');
    })
  }

  </script>
  
  <style>
  .order-summary {
    padding: 20px;
  }
  
  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .filters {
    margin-bottom: 20px;
  }
  
  .summary {
    margin-top: 20px;
    text-align: right;
  }

  .pagination{
      margin-top:20px;
      margin-bottom:20px;
      justify-content: center;
      text-align:center;
  }
  </style>
  