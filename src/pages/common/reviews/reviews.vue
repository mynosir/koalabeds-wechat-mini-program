<template>
    <view class="uni-panel uni-panel-h">
        <comments :list="comments" :showMore="false"></comments>
	</view>
</template>

<script>
import comments from '@/components/comments/comments.vue'
export default {
	components:{
		comments
	},
	data(){
        return {
            comments: [{
                username: 'username',
                userimg: 'http://ww1.sinaimg.cn/large/68c990d9gy1g7wxkn7r0gj20dw0dwgqp.jpg',
                stars: 4,
                content: 'reviwess contentreviwess contentreviwess contentreviwess content'
            },{
                username: 'username2',
                userimg: 'http://ww1.sinaimg.cn/large/68c990d9gy1g7wxkn7r0gj20dw0dwgqp.jpg',
                stars: 3,
                content: 'reviwess contentreviwess contentreviwess contentreviwess content'
            }]

        }
    }
}
</script>

<style>
    @import '../../../common/uni-nvue.css';
</style>
