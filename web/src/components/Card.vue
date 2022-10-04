<template>
    <div class="card bg-white mt-3 p-3">
        <div class="card-header d-flex ai-center mb-3"
        :class="{'border-bottom': !plain, ' pb-3': !plain}">
          <i class="iconfont" :class="`icon-${icon}`"></i>
          <div class="title fs-xl flex-1 px-2" :class="{'font-bold': plain}">{{title}}</div>
          <i class="iconfont" v-if="!plain">&#xe623;</i>
        </div>
        <div class="card-body">
          <slot></slot>
        </div>
      </div>
</template>

<script>
    export default {
        props: {
            title: { type: String, required: true },
            icon: { type: String, required: true },
            plain: { type: Boolean },
        }
    }
</script>

<style lang="scss">
    @import '../assets/scss/variable';
    .card {
        border-bottom: 1px solid $border-color;
        // .title {
        //     font-weight: bold;
        // }
    }
</style>