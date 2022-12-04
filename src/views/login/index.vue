<template>
    <div id="login">
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
            <a-form-item label="手机号">
                <a-select
                    v-decorator="[
                        'user',
                        { rules: [{ required: true, message: '请选择手机号!' }] },
                    ]"
                    placeholder="请选择手机号登录"
                    @change="handleSelectChange"
                >
                    <a-select-option :value="item.userName" v-for="item in userList" :key="item.id">
                        {{ item.userName }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="密码">
                <a-input-password placeholder="input password" v-decorator="['password', { initialValue: '123456zpwZPW' , rules: [{ required: true, message: '请输入密码!' }] }]" />
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
import { login } from "@/api/business";
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
        if(localStorage.getItem("token")){
            this.$router.push({
                path: `/list`
            });
        }
    },
    computed:{
    },
    mounted(){
        this.initData();
    },
    methods:{
        ...mapActions('userMoules',['setUserInfo','setUserStatus']),
        initData(){
            let json = [
                {id:1,userId:123,userName:"15600117320"},
                {id:2,userId:456,userName:"15600117321"},
                {id:3,userId:789,userName:"15600117322"},
                {id:4,userId:789,userName:"15600117323"}];
            this.userList = json;
        },
        // 字符串转base64
		encode(str) {
			// 对字符串进行编码
			var encode = encodeURI(str);
			// 对编码的字符串转化base64
			var base64 = btoa(encode);
			return base64;
		},
        randomString(e) {
			e = e || 16;
			var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
				a = t.length,
				n = "";
			for (let i = 0; i < e; i++)
				n += t.charAt(Math.floor(Math.random() * a));
			return n;
		},
        genPassword(pas) {
			let pwdEncodeStr = this.encode(pas);
			let randomStr = this.randomString(32);
			return randomStr + pwdEncodeStr;
		},
        toChat(data){
            this.setUserInfo(data.userInfo);
            localStorage.setItem("chat_user_infomation",JSON.stringify(data.userInfo));
            localStorage.setItem("user_login_status",true);
            this.$EventBus.$emit('toogleLoginStatus', true)
            this.$EventBus.$emit('toogleCurrLoginUserInfo')
            this.$router.push({
                path: `/list`
            });
        },
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if(err === null){
                    let params = {
						loginName: values.user,
						userPassword: this.genPassword(values.password),
					};
                    login(params).then((res)=>{
                        localStorage.setItem("token",res.data.token);
                        this.setUserStatus(true);
                        this.toChat(res.data);
                    });
                }
            });
        },
        handleSelectChange(value) {
            // this.userId = value;
            // this.userAvatar = this.matchUser(value).avatarUrl;
        }
    }
}
</script>

<style scoped>
#login{
    margin-top:40px;
}
</style>