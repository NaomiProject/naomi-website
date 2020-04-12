<template>
  <div class="plugin-search">
    <input type="text" class="filter" v-model="filter" :placeholder="`Search ${plugins.length} plugins`" />
    <em v-if="results">
      {{resultsText}}
    </em>
    <em v-else-if="filter.length > 0 && filter.length < 3">
      Please type 3 characters or more...
    </em>
    <div v-else>
      <div v-for="(plugintype, typeid) of $page.frontmatter.initial_gallery">
        <h3 class="plugin-type" :id="typeid">
          <a :href="'#' + typeid" aria-hidden="true" class="header-anchor">#</a>
          {{plugintype.title}}
        </h3>
        <p>{{plugintype.description}}</p>
        <ul class="display-mode-toggle" v-if="!plugintype.all">
          <li><button :disabled="showAllPlugins.indexOf(typeid) < 0" @click="switchDisplayMode(typeid, false)">Featured</button></li>
          <li><button :disabled="showAllPlugins.indexOf(typeid) >= 0" @click="switchDisplayMode(typeid, true)">All</button></li>
        </ul>
        <transition-group name="plugins" class="plugins" tag="ul">
          <li v-for="plugin of galleryPlugins[typeid]" class="plugin" :key="plugin.path">
            <router-link :to="plugin.path">
              <div class="version" v-if="plugin.frontmatter.since === '1x'"><span class="v1">v1</span></div>
              <div class="main">
                <img v-if="plugin.frontmatter.logo" :src="plugin.frontmatter.logo.replace('images/plugins/', '/plugins/')" :title="plugin.frontmatter.label" :alt="plugin.frontmatter.label" />
                <strong v-else><img src="/Icon.png" width="60"><br />{{plugin.frontmatter.label}}</strong>
              </div>
              <div class="type">{{plugin.frontmatter.type}}</div>
            </router-link>
          </li>
        </transition-group>
      </div>
    </div>
    <transition name="results">
      <div v-if="results">
        <transition-group name="plugins" v-if="results.plugins.length > 0" class="plugins" tag="ul">
          <li v-for="plugin of results.plugins" class="plugin" :key="plugin.path">
            <router-link :to="plugin.path">
              <div class="version" v-if="plugin.frontmatter.since === '1x'"><span class="v1">v1</span></div>
              <div class="main">
                <img v-if="plugin.frontmatter.logo" :src="plugin.frontmatter.logo.replace('images/plugins/', '/plugins/')" :title="plugin.frontmatter.label" :alt="plugin.frontmatter.label" />
                <strong v-else><img src="/Icon.png" width="60"><br />{{plugin.frontmatter.label}}</strong>
              </div>
              <div class="type">{{plugin.frontmatter.type}}</div>
            </router-link>
          </li>
        </transition-group>
        <em v-else>
          No Plugin matching your query was found.
        </em>
      </div>
    </transition>
  </div>
</template>

<style lang="stylus">
.filter
  width 90%
  font-size 1.1rem
  padding 0.8rem
  padding-left 2rem
  border 1px solid #ccc
  border-radius 2rem
  background #fff url(./images/search.svg) .7rem 1rem no-repeat
  outline none
  
  &:focus, &:active
    border-color #1397d5
    outline-color #1397d5
h3.plugin-type
  font-family 'Open Sans', sans-serif
  font-weight normal
  font-size 1.5rem
  margin-top -3.1rem
  padding-top 4.6rem
  margin-bottom 0
.display-mode-toggle
  list-style-type none
  padding .5rem
  display flex
  flex-direction row
  justify-content center
  button
    width 7rem
    background #fff
    border 1px solid #1397d5
    color #1397d5
    font-family 'Open Sans', sans-serif
    font-weight 300
    font-size 14px
    padding 4px
    cursor pointer
    &[disabled]
      background #1397d5
      color #fff
      cursor not-allowed

.plugin-search
  em
    display block
    padding-top 0.5rem
.results-enter-active, .results-leave-active
  transition all 0.5s
.results-enter, .results-leave-to
  opacity 0
  transform: translateY(30px);
// .plugins-enter-active, .plugins-leave-active
//   transition all 0.5s
.plugins-leave-active
  position absolute
  opacity 0
  transition all 0s !important
.plugins-enter
  opacity 0
  transform: translateY(30px);
  transition all 0.5s
.plugins-move
  transition all 1s
.plugins
  list-style-type none
  display flex
  flex-wrap wrap
  padding-left 0
  .plugin
    transition all 1s
    width 190px
    height 190px
    margin 4px
    border 1px solid #eee
    display flex
    box-shadow 2px 2px 5px rgba(0,0,0,.1)
    &:hover
      transition all 0.6s
      border 1px solid #1397d5
      box-shadow 2px 2px 5px rgba(0,0,0,.25)
    a
      width 190px
      height 190px
      padding 4px
      text-align center
      display flex
      flex-direction column
      // justify-content center
      color black
      &:hover
        text-decoration none
        color #1397d5
        
      .version
        font-size 7pt
        text-align right
        color white
        .v1
          padding 3px
          border-radius 3px
          background-color #f2c037
      
      .main
        flex-grow 1
        display flex
        strong
          margin auto
          font-size 14pt
        img
          margin auto
          max-width 182px
          max-height 140px
          object-fit contain
      
      .type
        font-weight normal
        font-size 10pt
        margin 4px

@media (max-width 479px)
  .plugin
    width 140px !important
    height 140px !important
    a
      width 140px !important
      height 140px !important
      strong
        font-size 10pt !important
        line-height 1.4 !important
      img
        max-width 132px !important
        max-height 100px !important
      .type
        font-size 9pt !important

</style>

<script>
export default {
  data () {
    return {
      filter: '',
      showAllPlugins: [],
      showObsoletePlugins: false
    }
  },
  mounted () {
    this.plugins = this.$site.pages.filter(page => page.path.indexOf('/plugins/') === 0 && page.frontmatter.id)
  },
  methods: {
    getGalleryPlugins (type) {
      if (!this.plugins.length) return []
      if (this.showAllPlugins[type]) {
        return this.plugins.filter(p => p.frontmatter && p.frontmatter.type === type)
      } else {
        return this.$page.frontmatter.initial_gallery[type].featured
                  .map(id => this.plugins.find(p => (p.frontmatter && p.frontmatter.id == id && p.frontmatter.type === type)))
                  .filter(p => typeof p !== 'undefined')
      }
    },
    switchDisplayMode (type, showAll) {
      if (showAll) {
        this.showAllPlugins.push(type)
      } else {
        this.showAllPlugins.splice(this.showAllPlugins.indexOf(type), 1)
      }
    }
  },
  computed: {
    plugins () {
      let all_plugins = this.$site.pages.filter(page => page.path.indexOf('/plugins/') === 0 && page.frontmatter.id)
      return (this.showObsoletePlugins) ? all_plugins : all_plugins.filter(page => !page.frontmatter.obsolete)
    },
    galleryPlugins () {
      let results = {}
      for (let type in this.$page.frontmatter.initial_gallery) {
        if (!this.plugins.length) return []
        if (this.showAllPlugins.indexOf(type) >= 0) {
          results[type] = this.plugins.filter(p => p.frontmatter && p.frontmatter.type === type)
        } else {
          results[type] = this.$page.frontmatter.initial_gallery[type].featured
                    .map(id => this.plugins.find(p => (p.frontmatter && p.frontmatter.id == id && p.frontmatter.type === type)))
                    .filter(p => typeof p !== 'undefined')
        }
      }
      return results
    },
    resultsText () {
      let found = []
      if (!this.results.plugins.length) return "Nothing found"
      if (this.results.plugins.length) {
        found.push(this.results.plugins.length.toString() + (this.results.plugins.length === 1 ? " plugin" : " plugins"))
      }
      return found.join(" and ") + " found"
    },
    results () {
      if (!this.filter) return null
      if (this.filter.length < 3) return null
      return {
        plugins: this.plugins.filter(p => (p.frontmatter &&
                                          (p.frontmatter.label && p.frontmatter.label.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0) ||
                                          (p.frontmatter.description && p.frontmatter.description.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0) ||
                                          (p.frontmatter.id && p.frontmatter.id.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0))),
      }
    }
  }
}
</script>