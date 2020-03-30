<template>
  <div class="lastUpdate" v-if="lastTime">
    <!--<em>Caught a mistake or want to contribute to the documentation? <a target="_blank" :href="editUrl">Edit this page on GitHub<OutboundLink /></a></em>-->
    <em>Last Updated: <span id='date-time'></span></em> <!--1/6/2020, 10:03:50 AM-->
  </div>
</template>

<style lang="stylus">
.lastUpdate
  border-top 1px solid #eee
  padding 35px
  font-size 10pt
  margin-bottom -3rem
.esh-note
  color #999
  font-size 8pt
  svg
    height: 10px !important
    width: 10px !important
</style>

<script>
const moment = require('moment');

export default {
  computed: {
    lastTime () {
      if (document.getElementById('date-time').innerHTML) return null
      dateTime = '1/6/2020, 10:03:50 AM'
      return document.getElementById('date-time').innerHTML = dateTime
      //document.querySelector("span[data-js='date-time']").innerHTML = dateTime; 
    }
  }
}
</script>
