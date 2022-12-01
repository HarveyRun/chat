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
                avatarUrl: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7098812d6f6d4d8d908deea5faab22b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?"
            },{
                id: 2,
                name: "禁止低头",
                desc: "这个梨很好",
                time: "08:11",
                userId: 456,
                avatarUrl: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3defac71e3a14bee9127f9410fa62d72~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?"
            },{
                id: 3,
                name: "小灰灰135",
                desc: "下午五点吧",
                time: "16:08",
                userId: 789,
                avatarUrl: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c8fc65df3914091aa1a9f87fc1b7db9~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?"
            }],
        }
    },
    created() {
        
    },
    computed:{
        ...mapGetters(['getUserInfomation']),
    },
    mounted(){
       
    },
    methods:{
        chatRoom(data){
            let genTalkUserAndTalkByUserInfo = {
                takeUserId: this.getUserInfomation.userId, //发送人
                takeUserAvatar: this.getUserInfomation.avatarUrl, //发送人头像
                takeUserById: data.userId, //接收人
                takeUserByAvatar: data.avatarUrl, //接收人头像
            }
            localStorage.setItem("talk_realtime_user_mapping",JSON.stringify(genTalkUserAndTalkByUserInfo));
            if(data.userId == 123){
                this.$router.push({
                    path: `/c`
                });
            }else if(data.userId == 456){
                this.$router.push({
                    path: `/s`
                });
            }else{
                this.$router.push({
                    path: `/b`
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