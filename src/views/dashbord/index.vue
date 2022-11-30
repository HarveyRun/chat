<template>
    <div id="dashbord">
        <div class="user">
            <a-avatar :src="userAvg" />
            <p>ID: {{userId}}</p>
        </div>
        <a-button type="danger" @click="toChat">
            登录
        </a-button>
    </div>
</template>

<script>
export default {
    name:"Dashbord",
    data () {
        return {
            userAvg:require('@/assets/q2.png'),
            userId: 123,
        }
    },
    created() {
    },
    computed:{
    },
    mounted(){
    },
    methods:{
        toChat(){
            localStorage.setItem("chat_user_infomation",JSON.stringify({userId:this.userId}));
            this.$EventBus.$emit('emitAppConnect', this.userId)
            this.$router.push({
                path: `/list`
            });
        },
    }
}
</script>

<style scoped>

</style>