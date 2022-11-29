<template>
    <div id="list">
        <a-list
            class="loadmore-list"
            item-layout="horizontal"
            :data-source="data"
        >
            <a-list-item slot="renderItem" slot-scope="item" class="itemFor" @click="chatRoom(item.userId)">
                <a-list-item-meta :description="item.desc">
                    <h4 slot="title" href="#">{{ item.name }}</h4>
                    <a-avatar
                        slot="avatar"
                        :src="userAvgq1"
                    />
                </a-list-item-meta>
                <div>{{ item.time }}</div>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name:"List",
    data () {
        return {
            data: [{
                id: 1,
                name: "Evans",
                desc: "好的",
                time: "20:01",
                userId: 123
            },{
                id: 2,
                name: "Roy",
                desc: "那太好了",
                time: "08:11",
                userId: 2
            },{
                id: 3,
                name: "Christiansen",
                desc: "下午五点吧",
                time: "16:08",
                userId: 3
            },{
                id: 4,
                name: "Arnaud",
                desc: "[图片]",
                time: "12:22",
                userId: 4
                
            }],
            userAvgq1:require('@/assets/q1.jpg'),
            userAvgq2:require('@/assets/q2.png')
        }
    },
    created() {
        
    },
    computed:{

    },
    mounted(){
        
    },
    methods:{
        ...mapActions(['setNum']),
        chatRoom(data){
            if(window.WebSocket){
                let wsUrl = `ws://127.0.0.1:7070?userid=${data}`
                this.ws = new WebSocket(wsUrl);

                this.ws.onopen = this.wsOpen;
                this.ws.onclose = this.wsClose;
                this.ws.onerror = this.wsError;
                this.ws.onmessage = this.wsMessage;

                this.$router.push({
                    path: `/c`
                });
            }
        },
        //打开WebSocket连接后立刻发送一条消息
        wsOpen(e){
            console.dir(this.ws);
        },
        wsClose(e){
            console.log("服务器关闭");
        },
        wsError(e){
            console.log("连接出错");
        },
        wsMessage(e){
            console.log("------client----------");
            console.log(e);
        },
    }
}
</script>

<style scoped>
.loadmore-list {
  min-height: 350px;
}
.itemFor{
    cursor: pointer;
}
</style>