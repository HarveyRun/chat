<template>
    <div id="client">
        <a-button @click="clearContent" type="primary">
            清除内容
        </a-button>
		<div class="warp">
			<div id="msgList" v-for="item in talkData" :key="item.id">
				<div class="item" v-if="userId != item.selfUserId">
					<div class="right_user">
						<div class="main_right_user"><img :src="currUserInfo.userAvg"></div>
						<div class="chat_right">
							<div>{{ item.text }}</div>
						</div>
					</div>
				</div>
				<div class="item" v-if="userId == item.selfUserId">
					<div class="left_user">
						<div class="chat_left">
							<div>{{ item.text }}</div>
						</div>
						<div class="corr_left_user"><img :src="talkUserInfo.userAvg"></div>
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
import { mapActions,mapState } from "vuex";
export default {
    name:"client",
    data () {
        return {
            //自己的基本信息
            currUserInfo:{
                userId: 2,
                userAvg:require('@/assets/2.jpg')
            },
            //对话人的基本信息
            talkUserInfo:{
                userId: 1,
                userAvg:require('@/assets/1.jpg')
            },
            msgContent:"",
            isDisBtn:true,
            isSelf: [],
            talkData: [],
            ws:null,
        }
    },
    created() {
        localStorage.setItem("msgbody",JSON.stringify([]));
    },
    computed:{
        ...mapState(['number'])
    },
    mounted(){
        console.dir(this)
    },
    methods:{
        ...mapActions(['setNum']),
        mmm(){
            this.setNum('setNum', { number: 611 }).then((res)=>{
                console.dir(res)
            })
        },
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
            this.isSelf = true;
            let msgObj = {
                id: new Date().getTime(),
                takeUser:2,
                selfUserId: 1,
                text: this.msgContent,
                timestamp: new Date().getTime()
            };
            this.ws.send(JSON.stringify(msgObj));

            // //获取
            // let msgBody = JSON.parse(localStorage.getItem("msgbody"));
            // msgBody.push(msgObj)
            // this.talkData = msgBody;

            // //存储
            // localStorage.setItem("msgbody",JSON.stringify(this.talkData));
            // this.clearFrieStatus();
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