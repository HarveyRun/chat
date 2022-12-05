<template>
    <div id="chatList" class="mt30">
        <a-list
            class="loadmore-list"
            item-layout="horizontal"
            :data-source="chatList"
        >
            <a-list-item slot="renderItem" slot-scope="item" class="itemFor" >
                <a slot="actions">
                    <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link" @click="e => e.stopPropagation()">
                            更多操作<a-icon type="down" />
                        </a>
                        <a-menu slot="overlay">
                            <a-menu-item key="2" @click="hotChat(item)">
                                标记未读
                            </a-menu-item>
                            <a-menu-item key="1" @click="hotUnChat(item)">
                                标记已读
                            </a-menu-item>
                            <a-menu-item key="3" @click="deleChat(item)">
                                删除聊天
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </a>
                <a-list-item-meta :description="item.description" @click="startChat(item)">
                    <h4 slot="title" href="#">{{ item.userName }}</h4>
                    <a-badge :dot="(currIds.indexOf(item.id) != -1)" slot="avatar"><a-avatar shape="square" :src="item.avatar"/></a-badge>
                </a-list-item-meta>

                <div>{{ item.createTime | dateFilter }}</div>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name:"chatList",
    data () {
        return {
            chatList:[{
                id:1,
                chatType: 1, //1 私聊 2 群聊 3 观聊
                avatar:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7098812d6f6d4d8d908deea5faab22b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?",
                userName:"",
                description:"你好",
                createTime: "2022-12-12 13:20:21"
            }],
            currIds:[],
        }
    },
    created() {
        let uinfo = this.getUserInfomation ? this.getUserInfomation : JSON.parse(localStorage.getItem("chat_user_infomation"))
        this.setUserInfo(uinfo);
    },
    
    computed:{
        ...mapGetters(['getUserInfomation']),
    },
    mounted(){
        this.initData();
    },
    methods:{
        ...mapActions('userMoules',['setUserInfo']),
        initData(){
            this.getChatList()//获取聊天列表
        },
        getChatList(){
            let json = JSON.parse(localStorage.getItem("chat_list_cache"));
            this.chatList = json;
        },
        startChat(data){
            this.$EventBus.$emit('emitAppConnect', this.getUserInfomation.userId)
            this.$router.push({
                path: `/b`
            });
        },
        deleChat(data){

        },
        hotUnChat(data){
            this.currIds.map((val,i)=>{
                if(val == data.id){
                    this.currIds.splice(i,1);
                }
            });
        },
        hotChat(data){
            debugger;
            this.currIds.push(data.id)
        },
    },
    filters: {
        dateFilter: (data) => {
            let sim = new Date(data).getTime(),
                cur = new Date().getTime(),
                val = 24 * 60 * 60 * 1000,
                diff = cur - sim,
                type = 0,
                text = "";

                if(diff > 0 && diff < val){
                    type = 1; //今天
                }else if(diff > 0 && diff > val && diff < val * 2){
                    type = 2; //昨天
                }else if(diff > 0 && diff > val * 3){
                    type = 3; //显示日期
                }

                switch (type) {
                    case 1:
                        text = "今天";
                        break;
                    case "部门":
                        text = "昨天";
                        break;
                    case "组别":
                        text = "更早";
                        break;
                }
            return text;
        }
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