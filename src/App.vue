<template>
  <div id="app">
    <div class="globalHanndle">
        <a-button :type="loginType" @click="toggleLogin" v-show="$route.path != '/login'">
            {{ loginStatus ? '登 出' : '登 录'}}
        </a-button>
        <div class="user" v-show="$route.path != '/login'">
            <a-avatar :size="45" :src="currLoginAvatar" />
            <h3 class="mt10">{{ currLoginName }}</h3>
        </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: 'App',
  data(){
    return {
      currLoginName:"",
      currLoginAvatar:"",
      loginStatus: false,
      loginType: 'primary'
    }
  },
  created(){
    this.$EventBus.$on('emitAppConnect', (data) => {
      if(window.WebSocket && data && data != "null"){
          this.$store.dispatch('wsMoules/createConnect', { userId: data }).then(()=>{
				    this.getWs.onmessage = this.wsMessage;
          })
      }else{
         alert("连接失败");
      }
    })
    this.$EventBus.$on('toogleLoginStatus', (data) => {
        this.loginStatus = true;
        this.loginType = "danger";
    })
    this.$EventBus.$on('toogleCurrLoginUserInfo', (data) => {
      let userInfo = JSON.parse(localStorage.getItem("chat_user_infomation"));
      this.currLoginName = userInfo.userName
      this.currLoginAvatar = userInfo.avatarUrl
    })
  },
  watch:{
    
  },
  computed:{
      ...mapGetters(['getWs','getChatList']),
      ...mapGetters(['getUserInfomation'])
  },
  mounted(){
    this.initData();
  },
  methods:{
    ...mapActions('wsMoules',['setChatList']),
    ...mapActions('userMoules',['setUserStatus']),
    initData(){
      this.loginStatusInit();
    },
    loginStatusInit(){
      let loginStatus = localStorage.getItem("user_login_status");
      if(loginStatus == "true" || loginStatus){
          this.loginStatus = true;
          this.loginType = "danger";
      }else{
          this.loginStatus = false;
          this.loginType = "primary";
      }
    },
    toggleLogin(){
      localStorage.setItem("user_login_status",false);
      localStorage.setItem("token","");
      this.$router.push({ path: `/login` });
    },
     hanndleBusiess(data){
        return new Promise(resolve => {
          let json = data.data , msg = null;
          if(json.indexOf("}") > -1 && json.indexOf("{") > -1){
            msg = JSON.parse(data.data);
            //获取
            let msgBody = localStorage.getItem("msgbody") ? JSON.parse(localStorage.getItem("msgbody")) : [];
            msgBody.push(msg)

            //存储
            localStorage.setItem("msgbody",JSON.stringify(msgBody));
            resolve(msgBody);
          }else{
            console.log(json);
            //获取
            let msgBody = JSON.parse(localStorage.getItem("msgbody"));
            resolve(msgBody);
          }
        });
     },
     checkRoom(serverData,clientData){
        let passBool = false;
        let eJson = JSON.parse(serverData.data);
        for(var i=0;i<clientData.length;i++){
          if(clientData[i].chatRoomId == eJson.sendToRoomId){
            passBool = true;
          }
        }
        return passBool;
     },
     wsMessage(e){
        console.log("---------- 接收数据2如下： ----------");
        console.dir(e.data);
        //动态查一下  该用户的所有房间号ID,如果客户端存在这个房间ID,则发送给该客户端，否则不把消息发送给客户端
        // let rooms = JSON.parse(localStorage.getItem("room_cache"));
        // let isSendMsg = this.checkRoom(e,rooms);
        // if(!isSendMsg){
        //   return;
        // }
        this.hanndleBusiess(e).then((res)=>{
          this.setChatList(res)
        });
     }
  }
}
</script>

<style>
#app {
  font-family: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding:20px;
}
input:focus, textarea:focus {
    outline: none;
}
::-webkit-scrollbar {
  display: none;
}
</style>
<style scoped>
.user{
    width:100px;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center; 
    margin:0px auto;
}
.globalHanndle{
  display: flex;
  flex-direction: row-reverse;
}
</style>
