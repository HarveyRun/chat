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
            // if(currUserId == msg.takeUserId ||  currUserId == msg.takeUserById){}
        });
     },
     wsMessage(e){
        console.log("---------- 接收数据如下： ----------");
        console.dir(e.data);
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
