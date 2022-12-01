<template>
    <div id="client">
        <a-button @click="clearContent" type="primary">
            清除内容
        </a-button>
        <img :src="realtimeUserMappingInfo.takeUserByAvatar" style="width:25px;height:25px;"/>
		<div class="warp">
			<div id="msgList" v-for="item in chatList" :key="item.id">
                <!-- 左侧用户 -->
				<div class="item" v-if="currUserId != item.takeUserId">
					<div class="right_user">
						<div class="main_right_user"><img :src="realtimeUserMappingInfo.takeUserByAvatar"></div>
						<div class="chat_right">
							<div>{{ item.content }}</div>
						</div>
					</div>
				</div>
                <!-- 右侧用户 -->
				<div class="item" v-if="currUserId == item.takeUserId">
					<div class="left_user">
						<div class="chat_left">
							<div>{{ item.content }}</div>
						</div>
						<div class="corr_left_user"><img :src="realtimeUserMappingInfo.takeUserAvatar"></div>
					</div>
				</div>
			</div>
			<div class="fireWarp">
				<div class="hanndleWarp">
					<input type="text" name="" @input="toogleStatus" class="fireMessage" v-model="msgContent">
					<button v-show="isDisBtn" class="disFireBtn">发送</button>
					<button v-show="!isDisBtn" @click="fire">发送</button>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import { mapGetters,mapState } from "vuex";
export default {
    name:"client",
    data () {
        return {
            currUserId: null,
            msgContent:"",
            isDisBtn:true,
            talkData: [],
            realtimeUserMappingInfo:null
        }
    },
    created() {
        let realtimeUserMap = JSON.parse(localStorage.getItem('talk_realtime_user_mapping'));
        this.realtimeUserMappingInfo = realtimeUserMap;
    },
    computed:{
        ...mapState('wsMoules',['wsExample','chatList']),
        ...mapGetters(['getWs','getChatList','getUserInfomation']),
    },
    watch:{
      '$store.state.wsMoules.chatList'(){
        console.log("最新记录");
        console.dir(this.$store.state.wsMoules.chatList);
      }
    },
    mounted(){
        localStorage.setItem("msgbody",JSON.stringify([]));
        this.currUserId = this.getUserInfomation.userId;
    },
    methods:{
        clearContent(){
            this.talkData.splice(0);
        },
        toogleStatus(){
            if(!this.msgContent){
                this.isDisBtn = true;
            }else{
                this.isDisBtn = false;
            }
        },
        fire(){
            let msgObj = {
                id: new Date().getTime(),  //唯一ID
                chatType: 1, //对话类型  1：私聊  2：群聊  3：观聊
                takeUserId: 123, //发送人
                takeUserById: 456, //接收人（单人）
                byTakeUserIds: [], //接收人（多人）
                content: this.msgContent, //信息内容
                contentType: 1, //信息内容类型   1：文本  2：视频  3：图片  4：表情  5：文件
                timestamp: new Date().getTime() //时间戳
            };
            this.getWs.send(JSON.stringify(msgObj));
            this.clearFrieStatus();
        },
        clearFrieStatus(){
            this.msgContent = "";
            this.isDisBtn = true;
        },
    }
}
</script>

<style scoped>
ul li{
  list-style-type:none;
  height:24px;
  line-height: 24px;
}
    .warp{
        position: relative;
        border:2px solid #d9d9d9;
        border-radius:5px;
        width:420px;
        height:800px;
        font-size:12px;
        margin:0px auto;
        margin-top:50px;
        overflow-y: scroll;
        padding:10px;
    }
    .item{
        margin-top:20px;
    }
    .chat_right,
    .chat_left{
        background-color: #ff7a45;
        border-bottom-color: #ff7a45;
        /*为了给after伪元素自动继承*/
        color: #fff;
        font-size: 12px;
        line-height: 18px;
        padding: 10px 12px 10px 12px;
        box-sizing: border-box;
        border-radius: 6px;
        position: relative;
        word-break: break-all;
    }

    /** 通过对小正方形旋转45度解决 **/
    .chat_right::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -5px;
        width: 10px;
        height: 10px;
        margin-top: -5px;
        background: inherit;
        transform: rotate(45deg);
    }

    /** 通过对小正方形旋转45度解决 **/
    .chat_left::before {
        content: '';
        position: absolute;
        top: 50%;
        right: -5px;
        width: 10px;
        height: 10px;
        margin-top: -5px;
        background: inherit;
        transform: rotate(45deg);
    }

    .right_user{
        display: flex;
        justify-content: flex-start;
        align-items: center;

    }
    .main_right_user{
        width:34px;
        height:34px;
        border-radius: 50%;
        background: black;
        overflow: hidden;
        flex-shrink:0;

    }
    .main_right_user img{
        width:100%;
        height:100%;
    }
    .chat_right{
        margin-left: 15px;
        margin-right: 46px;
        text-align: left;
    }

    .left_user{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .corr_left_user{
        width:34px;
        height:34px;
        border-radius: 50%;
        background: black;
        overflow: hidden;
        flex-shrink:0;
    }
    .corr_left_user img{
        width:100%;
        height:100%;
    }
    .chat_left{
        text-align: right;
        margin-right: 15px;
        margin-left: 46px;
    }
    .fireWarp{
        width:100%;
        position: absolute;
        width: 100%;
        left: 0px;
        bottom: 0px;
    }
    .hanndleWarp{
        width:100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .hanndleWarp input{
        width:100%;
        font-size:14px;
        border:none;
        border-top:2px solid #d9d9d9;
        padding:10px;
        color:#262626;
    }
    .hanndleWarp button{
        width:95px;
        border:none;
        border-bottom-right-radius: 4px;
        background-color: #ffa940;
        border-top:2px solid #ffa940;
        padding:10px;
        color:#fff;
        font-size:13px;
        flex-shrink:0;
        cursor: pointer;
    }
    .hanndleWarp button.disFireBtn{
        background-color: #bfbfbf;
        border-top:2px solid #bfbfbf;
        cursor: default;
    }
</style>