<template>
    <div id="client">
        <!-- <img :src="realtimeUserMappingInfo.sessionTalkByUsers[0].takeUserByAvatar" style="width:30px;height:30px;" v-show="realtimeUserMappingInfo.chatRoomType == 1"/>
        <span v-show="(realtimeUserMappingInfo.chatRoomType == 2)">多人聊天室</span>

        {{realtimeUserMappingInfo.sessionTalkUser.takeUserId}} -->

		<div class="warp">
            <div class="msgwarp" id="msgwarp">
                <div id="msgList" v-for="item in chatList" :key="item.id">
                    <!-- 左侧用户 -->
                    <div class="item" v-if="currUserId != item.sendMsgUserId">
                        <div class="right_user">
                            <div class="main_right_user"><img :src="currUserAvatarUrl"></div>
                            <!-- <div class="main_right_user"><img :src="realtimeUserMappingInfo.sessionTalkByUsers[0].takeUserByAvatar" v-show="realtimeUserMappingInfo.chatRoomType == 1"></div> -->
                            <!-- <div class="main_right_user"><img :src="realtimeUserMappingInfo.sessionTalkByUsers.takeUserByAvatar"></div> -->
                            <div class="chat_right">
                                <div>{{ item.message }}123</div>
                            </div>
                        </div>
                    </div>
                    <!-- 右侧用户 -->
                    <div class="item" v-else>
                        <div class="left_user">
                            <div class="chat_left">
                                <div>{{ item.message }}345</div>
                            </div>
                            <div class="corr_left_user"><img :src="currUserAvatarUrl"></div>
                        </div>
                    </div>
                </div>
            </div>
			<div class="fireWarp">
				<div class="hanndleWarp">
					<input type="text" name="" @input="toogleStatus" class="fireMessage" v-model="msgContent">
					<button v-show="isDisBtn" class="disFireBtn">发送</button>
					<button v-show="!isDisBtn" @click="sendMsg">发送</button>
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
            currUserAvatarUrl: "",
            msgContent:"",
            isDisBtn:true,
            talkData: [],
            realtimeUserMappingInfo:null
        }
    },
    created() {
        // let realtimeUserMap = JSON.parse(localStorage.getItem('room_cache'));
        // this.realtimeUserMappingInfo = realtimeUserMap.find((item)=>{ return item.chatRoomId == this.$route.query.roomId });
        // console.dir(this.realtimeUserMappingInfo);

    },
    computed:{
        ...mapState('wsMoules',['wsExample','chatList']),
        ...mapGetters(['getWs','getChatList','getUserInfomation']),
    },
    watch:{
      '$store.state.wsMoules.chatList'(){
        console.log("最新记录");
        console.dir(this.$store.state.wsMoules.chatList);
        var scrollTop = document.getElementById("msgwarp").scrollTop || document.getElementById("msgwarp").pageYOffset || document.getElementById("msgwarp").scrollTop;
        this.$nextTick(()=>{
            document.getElementById("msgwarp").scrollTop = 999999;
        });
      }
    },
    mounted(){
        this.currUserId = this.getUserInfomation.userId;
        this.currUserAvatarUrl = this.getUserInfomation.avatarUrl;
    },
    methods:{
        toogleStatus(){
            if(!this.msgContent){
                this.isDisBtn = true;
            }else{
                this.isDisBtn = false;
            }
        },
        sendMsg(){
            let msgObj = {
                sendMsgUserId: this.getUserInfomation.userId, //发送人
                message: this.msgContent, //信息内容
            }
            this.getWs.send(JSON.stringify(msgObj));
            this.clearFrieStatus();
        },
        fire(){
            let msgObj = {
                id: new Date().getTime(),  //唯一ID
                sendMsgUserId: this.currUserId, //发送人
                sendToRoomId: this.realtimeUserMappingInfo.chatRoomId, //发送到那个房间
                sendToRoomType: this.realtimeUserMappingInfo.chatRoomId, //房间类型  1：私聊房间  2：群聊房间  3：仅观聊
                message: this.msgContent, //信息内容
                messageType: 1, //信息内容类型   1：文本  2：视频  3：图片  4：表情  5：文件
                timestamp: new Date().getTime() //时间戳
            };
            this.getWs.send(JSON.stringify(msgObj));
            this.clearFrieStatus();
        },
        clearFrieStatus(){
            this.msgContent = "";
            this.isDisBtn = true;
        },
    },
    beforeDestroy(){
        this.getWs.close();
    }
}
</script>

<style scoped>
    #client ul li{
        list-style-type:none;
        height:24px;
        line-height: 24px;
    }
    .warp{
        position: relative;
        border:2px solid #d9d9d9;
        border-radius:5px;
        width:420px;
        font-size:12px;
        margin:0px auto;
        margin-top:50px;
        overflow-y: scroll;
        padding:10px;
    }
    .msgwarp{
        overflow-y: scroll;
        height: 800px;
        padding-bottom: 55px;
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