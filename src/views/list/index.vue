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
export default {
    name:"List",
    data () {
        return {
            sName: "",
            data: [{
                id: 1,
                name: "Evans",
                desc: "好的",
                time: "20:01",
                userId: 456
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
        chatRoom(data){
            this.$EventBus.$emit('emitAppConnect', data)
            this.$router.push({
                path: `/c`
            });
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