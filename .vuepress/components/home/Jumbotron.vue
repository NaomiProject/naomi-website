<template>
  <div class="jumbotron">
    <div class="hero-image"></div>
    <ClientOnly><img draggable="false" class="jumbotron-pattern" src="/pattern.png" alt=""></ClientOnly>
    <div class="hero-content">
      <div class="white-logo"><ClientOnly><img src="/naomi-logo_white.png" class="white-logo" /></ClientOnly></div>
      <h1 class="hero">Project Naomi</h1>
      <vue-typed-js :strings="items">
        <h2 class="lead"><span class="typing"></span></h2>
      </vue-typed-js>
      <!--<h2 class="lead">an open source platform for developing always-on, voice-controlled applications</h2>-->
      <router-link to="docs/" class="action-button">Get Started ➜</router-link>
      <a class="demo-button" target="_blank" href="http://demo.projectnaomi.com:8080">Demo ➜</a>
    </div>
  </div>
</template>

<style lang="stylus">
.jumbotron
  background #1397d5
  position absolute
  top 0
  left 0
  right 0
  height 90vh
  min-height 600px
  display flex
  justify-content center
  align-items center
  .jumbotron-pattern
    opacity 0.1
    width calc(100vw - 20px)
    height 105vh
    min-height 600px
    position absolute
    object-fit cover
    user-select none
  .hero-content
    margin 90px 30px
    z-index 1
    max-width 960px
    .white-logo
      width 240px
      height 80px
      img
        filter drop-shadow(0 0 10px #666)
    h1.hero
      animation 1.5s ease-out 0s 1 slideIn1
      color white
      font-family 'Open Sans', sans-serif;
      font-weight 300
      font-size 60px
      text-shadow 0px 0px 10px #666
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
        background-color #fff
        color #1397d5
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
      
  .hero-image
    animation 2.5s ease-out 0s 1 fadeIn4
    background url(/hero.jpg) bottom 0 left 50%/contain no-repeat
    background-repeat none 
    width 95%
    height 700px
    position absolute
    top calc(100% - 700px)
    opacity 0.5

</style>

<script>
export default {
  data () {
    return {
      items: [
        'Naomi, An open source platform for developing always-on, voice-controlled applications',
        'Naomi, The personal assistant that does not like to gossip about you',
        'Naomi, Less creepy than you know who',
        'Naomi, The personal assistant that keeps your trust and secrets from other personal assistants',
        'Naomi, Sometimes it works... When it does, it works for you',
        'Naomi, Some assembly required',
        'Naomi, We do not need to know that much',
        'Naomi, The privacy focused personal assistant',
        'Naomi, The first personal assistant that raised up to be free from the law',
        'Naomi, Free and morally strong',
        'Naomi, Next gen girl that does not yell',
        'Naomi, Boldly going where no personal assistant has gone before',
        'Naomi, The offline assistant',
        'Naomi, Not the assistant you need but the assistant you deserve'
      ]
    }
  }
}
</script>