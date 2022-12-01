<template>
    <div id="dashbord">
        <div class="user">
            <a-avatar  :size="45" :src="userAvatar" v-show="userId"/>
            <a-avatar icon="user" :size="45" v-show="!userId"/>
            <h3>ID {{ userId }}</h3>
        </div>
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
            <a-form-item label="账户">
                <a-select
                    v-decorator="[
                        'user',
                        { rules: [{ required: true, message: '请选择账户!' }] },
                    ]"
                    placeholder="请选择账户登录"
                    @change="handleSelectChange"
                >
                    <a-select-option :value="item.userId" v-for="item in userList" :key="item.id">
                        {{ item.userNickName }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="密码">
                <a-input-password placeholder="input password" v-decorator="['password', { initialValue: 123456 , rules: [{ required: true, message: '请输入密码!' }] }]" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary" html-type="submit">
                登 录
            </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name:"Dashbord",
    data () {
        return {
            userList:[],
            userId:"",
            userAvatar:"",
            formLayout: 'horizontal',
            form: this.$form.createForm(this, { name: 'dynamic_rule' }),
        }
    },
    created() {
    },
    computed:{
    },
    mounted(){
        console.dir(this.form.password);
        this.initData();
    },
    methods:{
        ...mapActions('userMoules',['setUserInfo']),
        initData(){
            setTimeout(()=>{
                let json = [{id:1,userId:123,userName:"Harvey",userNickName:"Harvey",avatarUrl:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7098812d6f6d4d8d908deea5faab22b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" },{id:2,userId:456,userName:"禁止低头",userNickName:"禁止低头",avatarUrl:"https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3defac71e3a14bee9127f9410fa62d72~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?"},{id:3,userId:789,userName:"小灰灰135",userNickName:"小灰灰135",avatarUrl:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c8fc65df3914091aa1a9f87fc1b7db9~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?"}];
                this.userList = json;
            },500);
        },
        toChat(data){
            let userId = data.user;
            let loginUserInfo = this.matchUser(userId);
            this.setUserInfo(loginUserInfo);
            localStorage.setItem("chat_user_infomation",JSON.stringify(loginUserInfo));
            this.$EventBus.$emit('emitAppConnect', userId)
            this.$router.push({
                path: `/list`
            });
        },
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if(err === null){
                    this.toChat(values);
                }
            });
        },
        handleSelectChange(value) {
            this.userId = value;
            this.userAvatar = this.matchUser(value).avatarUrl;
        },
        matchUser(data){
            return this.userList.find( item => item.userId == data);
        },
    }
}
</script>

<style scoped>
.user{
    width:100px;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center; 
    margin:0px auto;
}
</style>