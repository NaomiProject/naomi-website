<template>
  <div class="section-opensource">
    <div class="left">
      <ClientOnly>
        <div class="opensource-logos">
          <a target="_blank" href="http://jasperproject.github.io/"><img class="jasper-logo" src="./images/jasper.png" /></a>
          <a target="_blank" href="https://www.python.org/"><img class="python-logo" src="./images/python-logo.png" /></a>
        </div>
      </ClientOnly>
    </div>
    <div class="right">
      <h2>
        <div class="slide-seq3">100% Open Source.</div>
        <div class="slide-seq3 reliable">100% Reliable.</div>
      </h2>
      <p class="slide">Naomi is hand built upon the Jasper framework that brought you Cortana.<br />
        But unlike Jasper, Naomi is actively maintained, absolutely vendor-neutral and will never lock you in.</p>
    </div>
  </div>
</template>

<style lang="stylus">
.section-opensource
  background-color #01324D
  color white
  display flex
  flex-direction row
  text-align left
  font-family 'Open Sans', sans-serif
  .left
    width 40%
    text-align center
    display flex
    flex-direction row
    .opensource-logos
      margin auto
      display flex
      flex-direction column
      align-self center
      align-items center
      .jasper-logo
        width 200px
        object-fit contain
        margin 1rem
      .python-logo
        width 290px
        height 82px
        object-fit contain
        margin 1rem
      
  .right
    width 60%
    h2
      padding 1rem
      font-size 2.5em
      font-weight 300
      border none
      margin-bottom 0
      div
        white-space nowrap
        &.reliable
          font-weight 400
    p
      padding 1rem
      padding-bottom 2rem

  @media (max-width: 768px)
    &
      flex-direction column
    .left
      width 100%
    .right
      width 100%
      h2
        text-align center
        font-size 2em
      p
        text-align center
</style>
