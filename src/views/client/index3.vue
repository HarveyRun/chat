<template>
    <div>
      <!--填写个人信息  -->
      <input v-model="userId" />
      <input v-model="userName" />
      <!-- 绑定后根据个人信息创建websocket连接 -->
      <button @click="andUser">绑定</button>
      <br />
      <!-- 填写要发送的消息 -->
      <input v-model="message" />
      <!-- 发送信息 -->
      <button @click="webSocketSend">发送</button>
      <br />
      <!-- 遍历显示所有信息列表 -->
      <div v-for="(item,index) in infoList" :key="index">
        <span>{{ item }}</span>
        <br />
      </div>
    </div>
  </template>
  
  <script>
      export default {
        name: "Index",
        data(){
          return{
            //默认用户信息
            userId:1,
            userName:"张三",
            //预置websocket，设为undefined
            websock:undefined,
            //要发送的消息
            message:"",
            //消息列表
            infoList:[],
          }
        },
        mounted() {
          //如果多地进行测试，可以在这里进行初始化
          //一个人开多个窗口的话，可以在填写不同用户信息后，点击绑定时使用不同的userId进行初始化
        },
        destroyed() {
          //页面销毁时触发，关闭此用户的websocket连接
          this.webSocketOnClose();
        },
        methods:{
          //建立连接
          initWebSocket(){
            //websocket服务链接的地址
            let url = "ws://127.0.0.1:8080/websocket/" + this.userId;
            //创建连接
            this.websock = new WebSocket(url);
            //将自定义的方法替换websocket自带的方法
            this.websock.onopen = this.webSocketOnOpen;
            // this.websock.send = this.webSocketSend;
            this.websock.onerror = this.webSocketOnError;
            this.websock.onmessage = this.webSocketOnMessage;
            this.websock.onclose = this.webSocketOnClose;
          },
          //连接上之后触发
          webSocketOnOpen(){
            //将用户连接成功的消息放到列表进行展示
            this.infoList.push("【" + this.userName + "】连接成功");
          },
          //发送消息时触发
          webSocketSend(){
            //将用户信息和要发送的消息包装为json
            let data = {
              userId:this.userId,
              userName:this.userName,
              message:this.message
            }
            //将json格式化为字符串之后发送到服务端
            this.websock.send(JSON.stringify(data));
            //自己发送的信息添加到列表进行展示
            this.infoList.push(this.userName + ":" + this.message);
          },
          //发送错误时触发
          webSocketOnError(e){
            //将错误信息添加到列表展示在页面
            this.infoList.push("【错误】:" + e.toString());
          },
          //接收消息时触发
          webSocketOnMessage(e){
            //返回的信息存储在此方法参数的data字段
            if(e.data != undefined && e.data != null && e.data != ''){
              //信息非空时，通过json格式化为表单
              let json = JSON.parse(e.data);
              //如果返回消息的用户id是本人，则为自己发送的信息，不需要显示
              if(json.userId != this.userId){
                //判断是别人发送的信息，则拼接字段并添加到列表中用于展示
                this.infoList.push(json.userName + ":" + json.message);
              }
            }
          },
          //关闭连接时触发
          webSocketOnClose(){
            //将用户关闭链接的消息写入列表
            this.infoList.push("【" + this.userName + "】关闭连接");
          },
          //绑定用户
          andUser(){
            //初始化websocket
            this.initWebSocket();
          }
        }
      }
  </script>
  
  <style scoped>
  
  </style>