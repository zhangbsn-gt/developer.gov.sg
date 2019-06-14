<template>
    <div class="spinner">
        <div class="bounce1" :style="bounceStyle"></div>
        <div class="bounce2" :style="bounceStyle"></div>
        <div class="bounce3" :style="bounceStyle"></div>
    </div>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: "#333" // Anything that background-color accepts: #ababab, orange etc
        }
    },
    computed: {
        bounceStyle() {
            return { backgroundColor: this.color };
        }
    }
};
</script>

<style scoped>
.spinner {
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.spinner > div {
    width: 14px;
    height: 14px;
    /* background-color: #333; */
    margin: 0 1px;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
}

.spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
        -webkit-transform: scale(0);
    }
    40% {
        -webkit-transform: scale(1);
    }
}

@keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    40% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}
</style>
