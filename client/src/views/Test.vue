<template>
  <div>
    <button id="button" @click="goFunction()">{{ textBtn }}</button> <br />
    Seconds: <span id="count">{{ text }}</span> Time: <span>{{ timer }}</span>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      lastpause: 0,
      totaltime: 0,
      text: "time",
      textBtn: "Off - Timer Not Going",
      timer: 0,
    };
  },
  methods: {
    goFunction() {
      if (this.textBtn == "Off - Timer Not Going") {
        this.textBtn = "On - Timer Going";
      } else {
        this.totaltime += Date.now() - this.lastpause;
        this.textBtn = "Off - Timer Not Going";
      }
      this.lastpause = Date.now();
      this.text = this.totaltime / 1000 + " seconds.";
      this.timer = 0;
      clearInterval();

      setInterval(() => {
        this.timer++;
      }, 1000);
    },
  },
};
</script>

<style>
</style>