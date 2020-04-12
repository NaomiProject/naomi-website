<template>
  <img :src="$page.frontmatter.logo.replace('images/plugins/', $site.base + 'plugins/')" class="plugin-logo" />
</template>

<style lang="stylus">
@media (min-width: 720px)
  .plugin-logo
    float right
    margin-left 4rem
.plugin-logo
  max-width 250px !important
  max-height 250px !important
</style>
