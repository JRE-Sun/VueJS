// 注册
Vue.component('my-component', {
    template: '<button v-on:click="counter += 1">{{ counter }}</button>',
    data: function() {
        return {
            counter: 0
        }
    }
});

// 创建根实例
new Vue({
    el: '#example'
});