<template>
    <div class="section2">
    <h2>Why Naomi?</h2>
    <div class="features">
        <div ref="feature1" class="feature">
          <ClientOnly>
            <integrate-everything-icon />
          </ClientOnly>
          <h3>Control Anything</h3>
          <p>
            Use your voice to ask for information, update social networks, control your home, and more.
          </p>
        </div>
        <div ref="feature2" class="feature">
          <ClientOnly>
            <rotating-gears-icon />
          </ClientOnly>
          <div class="home-icon-container">
            <img src="./images/icons/empty.png" class="home-icon current" />
          </div>
          <h3>Always Listening</h3>
          <p>
            Naomi is always on, always listening for commands, and you can speak from meters away.
          </p>
        </div>
        <div ref="feature3" class="feature">
          <ClientOnly>
            <runs-everywhere-icon />
          </ClientOnly>
          <h3>Runs Everywhere</h3>
          <p>
            Run your Naomi server on
            <router-link to="docs/installation/linux.html">Linux</router-link>,
            <router-link to="docs/installation/macosx.html">macOS</router-link>,
            <router-link to="docs/installation/windows.html">Windows</router-link>,
            <router-link to="docs/installation/rasppi.html">Raspberry Pi</router-link>,
            <router-link to="docs/installation/pine.html">PINE64</router-link>,
            <router-link to="docs/installation/docker.html">Docker</router-link>,
            <router-link to="docs/installation/synology.html">Synology</router-link>...
            Access it with apps for the web,
            <router-link to="docs/apps/ios.html">iOS</router-link>,
            <router-link to="docs/apps/android.html">Android</router-link> and others.
          </p>
        </div>
    </div>
    </div>

</template>

<style lang="stylus">
.section2
  font-family 'Open Sans', sans-serif
  background white
  padding-top 1rem
  text-align center
  h2
    text-align center
    font-family 'Open Sans', sans-serif
    font-weight normal
    font-size 2.5em
  .features
    padding 1.2rem 5rem
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content strech
    justify-content space-between
  .feature
    flex-grow 1
    flex-basis 30%
    max-width 30%
    h3
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten(black, 10%)
    p
      color lighten(black, 25%)
  @media (max-width: 768px)
    .features
      flex-direction column
      padding 1.2rem 0.5rem
    .feature
      max-width 100%
      padding 0 2.5rem

</style>

<script>
import IntegrateEverythingIcon from './IntegrateEverythingIcon.vue'
import RotatingGearsIcon from './RotatingGearsIcon.vue'
import RunsEverywhereIcon from './RunsEverywhereIcon.vue'

export default {
  components: {
    IntegrateEverythingIcon,
    RotatingGearsIcon,
    RunsEverywhereIcon
  }
}
</script>
