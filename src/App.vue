<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: 'App',
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
  },
  computed:{
      ...mapGetters(['getWs','getChatList']),
  },
  mounted(){
    localStorage.setItem("stopMsg","123445655");
  },
  methods:{
    ...mapActions('wsMoules',['setChatList']),
     hanndleBusiess(data){
        return new Promise(resolve => {
            let msg = JSON.parse(data.data);
            //获取
            let msgBody = JSON.parse(localStorage.getItem("msgbody"));
            msgBody.push(msg)

            //存储
            localStorage.setItem("msgbody",JSON.stringify(msgBody));
            resolve(msgBody);
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
        let rooms = JSON.parse(localStorage.getItem("room_cache"));
        let isSendMsg = this.checkRoom(e,rooms);
        if(!isSendMsg){
          return;
        }
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
