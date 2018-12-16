<template>
  <div class="jumbotron">
    <!--<div class="hero-image"></div>-->
    <ClientOnly><img draggable="false" class="jumbotron-pattern" src="/pattern.png" alt=""></ClientOnly>
    <div class="hero-content">
      <div class="white-logo"><ClientOnly><img src="/naomi-logo_white.png" class="white-logo" /></ClientOnly></div>
      <h1 class="hero">Project Naomi</h1>
      <h2 class="lead">an open source platform for developing always-on, voice-controlled applications</h2>
      <router-link to="docs/" class="action-button">Get Started ➜</router-link>
      <a class="demo-button" target="_blank" href="http://demo.projectnaomi.com:8080">Demo ➜</a>
    </div>
  </div>
</template>

<style lang="stylus">
.jumbotron
  background url(/editor_codes_bg.jpg)
  //background-repeat none 
  //width 100%
  //height 800px
  //position absolute
  //justify-content center
  //align-items center
  width: 100%;
  height: 800px;
  display: block;
  //min-height: 500px;
  position: relative;
  z-index: 5;
  background-size: cover;
  //margin-bottom: 130px;
  .jumbotron-pattern
    opacity 0.1
    color black
    width 100%
    height 800px
    //min-height 500px
    position absolute
    object-fit cover
    user-select none
  .hero-content
    z-index 1
    max-width 960px
    margin auto
    display table
    padding-top 174px
    //position absolute
    //justify-content center
    //align-items center
    .white-logo
      width 520px
      height 131px
      img
        filter drop-shadow(0 0 20px #666)
    h1.hero
      animation 1.5s ease-out 0s 1 slideIn1
      color white
      font-family 'Open Sans', sans-serif;
      font-weight 300
      font-size 60px
      text-shadow 0px 0px 10px #666
      // padding-top 10vh
    h2.lead
      animation 1.5s ease-out 0s 1 slideIn2
      color white
      border none
      font-family 'Open Sans', sans-serif;
      font-weight normal
      font-size 1.125em
      text-shadow 0px 0px 10px #333
    .action-button
      animation 1.5s ease-out 0s 1 slideIn3
      margin-top 4rem
      display inline-block
      font-family 'Open Sans', sans-serif;
      font-size 1rem
      color #fff
      background-color #1397d5
      padding 0.8rem 1.6rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      border 1px solid #fff
      &:hover
        background-color rgba(255, 255, 255, 0.2)
    .demo-button
      animation 2s ease-out 0s 1 slideIn3
      margin-top 4rem
      margin-left 0.5em
      display inline-block
      font-family 'Open Sans', sans-serif;
      font-size 1rem
      color #fff
      padding 0.8rem 1.6rem
      border-radius 4px
      background-color #1397d5
      transition background-color .1s ease
      box-sizing border-box
      border 1px solid #fff
      &:hover
        background-color rgba(255, 255, 255, 0.2)
    @media (max-width: 419px)
      h1.hero
        font-size 40px
    @media (min-width: 720px)
      .action-button
        font-size 1.4rem
      .demo-button
        font-size 1.4rem
</style>
