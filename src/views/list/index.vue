<template>
    <div id="list" class="mt30">
        <a-list
            class="loadmore-list"
            item-layout="horizontal"
            :data-source="friendsList"
        >
            <a-list-item slot="renderItem" slot-scope="item" class="itemFor" >
                <a slot="actions" @click="deleFriend(item)">
                    <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link" @click="e => e.stopPropagation()">
                            更多操作<a-icon type="down" />
                        </a>
                        <a-menu slot="overlay">
                            <a-menu-item key="2" @click="hotFriend(item)">
                                标记未读
                            </a-menu-item>
                            <a-menu-item key="1" @click="hotUnFriend(item)">
                                标记已读
                            </a-menu-item>
                            <a-menu-item key="3" @click="deleFriend(item)">
                                删除好友
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </a>
                <a-list-item-meta description="你好" @click="startChat(item)">
                    <h4 slot="title" href="#">{{ item.userName }}</h4>
                    <a-badge :dot="(currIds.indexOf(item.id) != -1)" slot="avatar"><a-avatar shape="square" :src="item.email"/></a-badge>
                </a-list-item-meta>

                <div>{{ item.createTime | dateFilter }}</div>
            </a-list-item>
        </a-list>
        <div class="mt30">
            <a-button type="primary" @click="addFirends">
            添加好友
            </a-button>
            <a-badge :count="friendRequestNum" :overflow-count="99">
                <a-button type="primary" @click="seeFirends">
                    好友请求
                </a-button>
            </a-badge>
        </div>
        <a-modal v-model="visible" title="添加好友" @ok="handleOk" @cancel="handleCancel" ok-text="添加好友" cancel-text="取消">
            <a-input-search placeholder="手机号" :loading="searchLoading" enter-button v-model="userPhone" @search="searchFirend" @change="addPhoneChange"/>
            <a-textarea placeholder="说明" :rows="12" class="mt20" v-model="userAddRemark"/>
            <div class="findUserInfo" v-show="findUserInfo.userName">
                <div class="firendAvatar">
                    <a-avatar :size="45" :src="findUserInfo.avatar"/>
                </div>
                <div>
                    <h3>{{findUserInfo.userName}}</h3>
                </div>
            </div>
        </a-modal>

        <a-modal v-model="friendVisible" title="好友请求" class="requestFirs" @ok="friendHandleOk" @cancel="friendHandleCancel" >
            <a-list
                class="loadmore-list"
                item-layout="horizontal"
                :data-source="friendRequestData"
            >
                <a-list-item slot="renderItem" slot-scope="item" class="itemFor">
                    <a slot="actions" @click="passFriend(item,1)">通过</a>
                    <a slot="actions" @click="passFriend(item,2)">拒绝</a>
                    <a-list-item-meta description="您好,方便加好友吗" >
                        <h4 slot="title" href="#">{{ item.userName }}</h4>
                        <a-avatar
                            slot="avatar"
                            :src="item.email"
                        />
                    </a-list-item-meta>
                    <div>{{ item.createTime | dateFilter}}</div>
                </a-list-item>
            </a-list>
            <template slot="footer">
                <a-button @click="friendHandleCancel">关闭</a-button>
            </template>

        </a-modal>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { 
    addFriends,
    findFriends,
    getFriendsReq,
    getMustUserReq,
    addFriendsResultReq,
    checkIsFriendReq,
    getFriendsListReq,
    clearFriendLinkReq 
} from "@/api/business";
export default {
    name:"List",
    data () {
        return {
            currIds:[],
            sName: "",
            friendsList:[],
            friendRequestNum:0,
            visible: false,
            friendVisible: false,
            userPhone:"",
            userAddRemark:"",
            searchLoading:false,
            requestPeople:[],
            friendIds:[],
            findUserInfo:{
                avatar:"",
                userName:"",
            },
            friendRequestData:[],
            data: [{
                id: 1,
                name: "Harvey",
                desc: "水流的很大",
                time: "20:01",
                userId: 123,
                avatarUrl: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7098812d6f6d4d8d908deea5faab22b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?",
                roomId: 999, //房间ID
                isClickFriendInRoom: true, //是否是点击好友进入聊天房间  true:是  false:创建群聊进入的
                groupChatId: null //群聊ID
            }],
        }
    },
    created() {
        let uinfo = this.getUserInfomation ? this.getUserInfomation : JSON.parse(localStorage.getItem("chat_user_infomation"))
        this.setUserInfo(uinfo);
    },
    filters: {
        dateFilter: (data) => {
            return new Date(data).Format("yyyy-MM-dd hh:mm:ss");
        }
    },
    computed:{
        ...mapGetters(['getUserInfomation']),
    },
    mounted(){
        //Math.random().toString().slice(2,10), //会话ID
        this.initData();
    },
    methods:{
        ...mapActions('userMoules',['setUserStatus','setUserInfo']),
        initData(){
            this.getFriends(); //获取好友
            this.getFriendsReqFn(); //获取好友请求
        },
        getFriends(){
            getFriendsListReq({relationId : this.getUserInfomation.userId}).then((res)=>{
                this.friendIds.splice(0);
                for(let i=0;i<res.data.length;i++){
                    this.friendIds.push(res.data[i].createUserId);
                }
                if(this.friendIds.length>0){
                    getMustUserReq(this.friendIds).then((res)=>{
                        this.friendsList = res.data;
                    });
                }else{
                    this.friendsList.splice(0);
                }
            });
        },
        getFriendsReqFn(){
            getFriendsReq({byRequestUserId: this.getUserInfomation.userId}).then((res)=>{
                this.conutNum(res.data);
            });
        },
        conutNum(data){
            let noRepeat = [];
            for(let i=0;i<data.length;i++){
                noRepeat.push(data[i].requestUserId);
            };
            this.friendRequestNum = [...new Set(noRepeat)].length;
        },
        getFriendsReqRealtimeFn(){
            this.requestPeople.splice(0);
            getFriendsReq({byRequestUserId: this.getUserInfomation.userId}).then((res)=>{
                this.conutNum(res.data);
                let json = res.data;
                for(let i=0;i<json.length;i++){
                    this.requestPeople.push(json[i].requestUserId);
                }
                this.getRequestPeopleList([...new Set(this.requestPeople)]);
            });
        },
        getRequestPeopleList(ids){
            getMustUserReq(ids).then((res)=>{
                this.friendRequestData = res.data;
                this.friendVisible = true;
            });
        },
        addPhoneChange(){
            this.findUserId = "";
        },
        searchFirend(){
            if(!this.userPhone){
                this.$message.warning('请输入手机号');
                return;
            }
            this.searchLoading = true;
            findFriends([this.userPhone]).then((res)=>{
                if(res.success){
                    if(res.data.length>0){
                        let json = res.data[0];
                        this.findUserInfo.avatar = json.email;
                        this.findUserInfo.userName = json.userName;
                        this.findUserId = json.id;
                    }else{
                        this.findUserInfo.avatar = "";
                        this.findUserInfo.userName = "";
                        this.findUserId = "";
                        this.$message.warning('用户不存在');
                    }
                }
                this.searchLoading = false;
            });
        },
        hotUnFriend(data){
            this.currIds.map((val,i)=>{
                if(val == data.id){
                    this.currIds.splice(i,1);
                }
            });
        },
        hotFriend(data){
            this.currIds.push(data.id)
        },
        deleFriend(data){
            let params = {
                relationId: this.getUserInfomation.userId,
                createUserId: data.id
            }
            clearFriendLinkReq(params).then((res)=>{
                if(res.success){
                    this.$message.success('操作成功');
                    this.getFriends(); //获取好友
                }
            });
        },
        passFriend(data,type){
            let proObj = {
                params:{
                    handleType: 1,
                    byRequestUserId: 1,
                    requestUserId: 1,
                },
                data:{
                    relationId: 1,
                    createUserId: 1
                }
            }
            if(type == 1){
                proObj.params.handleType = 1;
                proObj.params.byRequestUserId = this.getUserInfomation.userId;
                proObj.params.requestUserId = data.id;
                proObj.data.relationId = this.getUserInfomation.userId;
                proObj.data.createUserId = data.id;
            }else{
                proObj.params.handleType = 2;
                proObj.params.byRequestUserId = this.getUserInfomation.userId;
                proObj.params.requestUserId = data.id;
            }
            addFriendsResultReq(proObj).then((res)=>{
                if(res.success){
                    this.$message.success('操作成功');
                    this.getFriendsReqFn();
                    this.getFriends();
                    this.friendVisible = false;
                }
            });
        },
        addFirends(){
            this.visible = true;
        },
        seeFirends(){
            if(this.friendRequestNum < 1){
                this.$message.warning('无好友请求');
                return;
            }
            this.getFriendsReqRealtimeFn();
        },
        handleOk(e){
            if(!this.findUserId){
                this.$message.warning('请先查找好友');
                return;
            }
            if(this.getUserInfomation.userId == this.findUserId){
                this.$message.warning('不能添加自己为好友');
                return;
            }

            checkIsFriendReq({relationId: this.getUserInfomation.userId, createUserId: this.findUserId }).then((res)=>{
                if(res.data.length > 0){
                    this.$message.warning('对方已是您的好友');
                    return;
                }else{
                    this.addFriendsFn();
                }
            });
            
            
        },
        addFriendsFn(){
            addFriends({
                "requestUserId": this.getUserInfomation.userId, //请求好友的用户ID
                "byRequestUserId": this.findUserId //请求加好友的ID
            }).then((res)=>{
                this.$message.success('好友请求已发送');
                this.clearFindUser();
                this.visible = false;
            });
        },
        friendHandleOk(e){
        },
        handleCancel(){
            this.clearFindUser();
        },
        friendHandleCancel(){
            this.friendVisible = false;
        },
        clearFindUser(){
            this.userPhone="";
            this.userAddRemark="";
            this.findUserInfo.avatar = "";
            this.findUserInfo.userName = "";
            this.findUserId = "";
        },
        startChat(data){
            this.$EventBus.$emit('emitAppConnect', this.getUserInfomation.userId)
            this.$router.push({
                path: `/b`
            });
        },
        chatRoom(data){

            //点击好友或发起群聊都会创建一个房间
            let room = {
                chatRoomId: `room_${Math.random().toString().slice(2,10)}`,
                chatRoomType: null,
                sessionTalkUser: /* 会话人*/{
                    takeUserId: this.getUserInfomation.userId, //发送人
                    takeUserAvatar: this.getUserInfomation.avatarUrl, //发送人头像
                },
                sessionTalkByUsers: /* 接收人S */ [],
                repeatCreateRoomKey: `${this.getUserInfomation.userId}${data.userId}`, //为防止点击同一个人，创建重复的房间，用二者的id联合作为唯一标识（群聊除外，可以无限创建）
                device:"Chrom",
                createTime: new Date().getTime()
            };

            if(data.isClickFriendInRoom){
                room.chatRoomType = 1;
                room.sessionTalkByUsers.push({
                    takeUserById: data.userId, //接收人
                    takeUserByAvatar: data.avatarUrl, //接收人头像
                });
            }else{
                room.chatRoomType = 2;
                //发请求 获取群中所有人的信息
                ajax({ id : data.groupChatId}).then((res)={
                    // room.sessionTalkByUsers = res;
                })
            }

            let roomCacheCars = localStorage.getItem("room_cache") ? JSON.parse(localStorage.getItem("room_cache")) : [];
            if(roomCacheCars.length > 0){
                let isRepeat = roomCacheCars.some((item)=>{ return item.repeatCreateRoomKey == room.repeatCreateRoomKey});
                if(!isRepeat){
                    roomCacheCars.push(room);
                    localStorage.setItem("room_cache",JSON.stringify(roomCacheCars));
                }
            }else{
                roomCacheCars.push(room);
                localStorage.setItem("room_cache",JSON.stringify(roomCacheCars));
            }
            
            this.$router.push({
                path: `/b`,
                query:{
                    roomId: room.chatRoomId
                }
            });
        },
    }
}
</script>
<style>
.requestFirs .ant-modal-body{
    padding:0px;
}
</style>
<style scoped>
.loadmore-list {
  padding:20px;
  border:1px solid #e8e8e8;
}
.itemFor{
    cursor: pointer;
}
.findUserInfo{
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 15px;
}
.firendAvatar{
    margin-right: 10px;
}
</style>