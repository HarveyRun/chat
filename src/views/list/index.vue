<template>
    <div id="list">
        <a-list
            class="loadmore-list"
            item-layout="horizontal"
            :data-source="data"
        >
            <a-list-item slot="renderItem" slot-scope="item" class="itemFor" @click="chatRoom(item)">
                <a-list-item-meta :description="item.desc" >
                    <h4 slot="title" href="#">{{ item.name }}</h4>
                    <a-avatar
                        slot="avatar"
                        :src="item.avatarUrl"
                    />
                </a-list-item-meta>
                <div>{{ item.time }}</div>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name:"List",
    data () {
        return {
            sName: "",
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
            },{
                id: 2,
                name: "禁止低头",
                desc: "这个梨很好",
                time: "08:11",
                userId: 456,
                avatarUrl: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3defac71e3a14bee9127f9410fa62d72~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?",
                sessionId: 998,
                isClickFriendInRoom: true,
                groupChatId: null
            },{
                id: 3,
                name: "小灰灰135",
                desc: "下午五点吧",
                time: "16:08",
                userId: 789,
                avatarUrl: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c8fc65df3914091aa1a9f87fc1b7db9~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?",
                sessionId: 997,
                sessionType: 1,
                isClickFriendInRoom: true,
                groupChatId: null
            }],
        }
    },
    created() {
        
    },
    computed:{
        ...mapGetters(['getUserInfomation']),
    },
    mounted(){
        //Math.random().toString().slice(2,10), //会话ID
    },
    methods:{
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

            if(data.userId == 123){
                this.$router.push({
                    path: `/b`,
                    query:{
                        roomId: room.chatRoomId
                    }
                });
            }else if(data.userId == 456){
                this.$router.push({
                    path: `/b`,
                    query:{
                        roomId: room.chatRoomId
                    }
                });
            }else{
                this.$router.push({
                    path: `/b`,
                    query:{
                        roomId: room.chatRoomId
                    }
                });
            }
        },
    }
}
</script>

<style scoped>
.loadmore-list {
  padding:20px;
  border:1px solid #e8e8e8;
}
.itemFor{
    cursor: pointer;
}
</style>