<template>
  <!-- Solo se muestra cuando visible = true -->
  <div v-if="visible" class="toast">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "AppToast",

  data() {
    return {
      visible: false,
      message: "",
      timeoutId: null,
    };
  },

  methods: {
    show(msg, duration = 2500) {
      console.log("[Toast] show llamado con:", msg); // DEBUG
      this.message = msg;
      this.visible = true;

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        this.visible = false;
        this.timeoutId = null;
      }, duration);
    },
  },
};
</script>

<style>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #73e900;
  color: #000;
  padding: 16px 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 99999;
}
</style>
