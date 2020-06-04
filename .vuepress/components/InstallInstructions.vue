<template>
  <div>
    <div class="instructions">Choose your system</div>
    <div class="os-tabs">
      <div class="os-tab"
        v-for="system in systems"
        :class="{ 'selected': selectedSystem === system[0] }" @click="selectSystem(system[0])">
        <img :src="`/os/${system[0]}.${system[0] === 'pine64' ? 'png' : 'svg'}`">
        <div class="os-label">{{system[1]}}</div>
      </div>
    </div>
    <div class="instructions" v-if="selectedSystem === 'tux'">Choose your package manager</div>
    <div class="distro-tabs" v-if="selectedSystem === 'tux'">
      <div class="distro-tab"
        :class="{ 'selected': selectedDistro === 'deb' }" @click="selectDistro('deb')">
        <div>
          <img src="/os/ubuntu.svg" title="Ubuntu" />
          <img src="/os/debian.svg" style="filter: grayscale(100%)" title="Debian" />
          <img src="/os/linuxmint.svg" title="Linux Mint" />
          <img src="/os/elementary.svg" style="margin-left: 2px" title="Elementary" />...
        </div>
        <div class="distro-label">APT (.deb packages)</div>
      </div>
      <!--<div class="distro-tab"
        :class="{ 'selected': selectedDistro === 'rpm' }" @click="selectDistro('rpm')">
        <div>
          <img src="/os/redhat.svg" title="RedHat" />
          <img src="/os/opensuse.svg" style="margin-left: 2px; margin-bottom: 2px; filter: grayscale(100%) brightness(0)" title="openSUSE" />
          <img src="/os/mageia.svg" style="filter: grayscale(100%)" title="Mageia" />
          <img src="/os/fedora.svg" style="filter: grayscale(100%)" title="Fedora" />...
        </div>
        <div class="distro-label">RPM (.rpm packages)</div>
      </div>-->
    </div>
    <!--<div class="instructions" v-if="selectedSystem">Choose your version</div>
    <div class="version-tabs" v-if="selectedSystem">
      <div class="version-tab"
        v-for="version in versions"
        :class="{ 'selected': selectedVersion === version[0] }" @click="selectVersion(version[0])">
        <strong>{{version[1]}}</strong><br />
        <small v-if="version[0] === 'stable'">{{$page.frontmatter.currentVersion}}</small>
        <small v-if="version[0] === 'dev'">{{$page.frontmatter.currentMilestoneVersion}}</small>
        <small v-if="version[0] === 'nightly'">{{$page.frontmatter.currentNightlyVersion}}</small>
      </div>
    </div>

    <div v-if="selectedVersion" class="tip custom-block">
      <p v-if="selectedVersion === 'stable'"><strong>Stable</strong> versions are thoroughly tested semi-annual official releases of Naomi. Use the stable version for your production environment if you don't need the latest enhancements and prefer a robust system.</p>
      <p v-if="selectedVersion === 'dev'"><strong>Milestone</strong> versions are intermediary releases of the next Naomi version, released about once a month, and they include the new recently added features and bugfixes. They are a good compromise between the current stable version and the bleeding-edge and potentially unstable nightly version.</p>
      <p v-if="selectedVersion === 'nightly'"><strong>Nightly</strong> versions are at most 1 or 2 days old and include the latest code. Use nightly for testing out very recent changes, but be aware some nightly versions might be unstable. Use in production at your own risk!</p>
    </div>-->

    <div v-if="naobianImage === 'true'">
      <div v-if="selectedSystem === 'raspberry-pi'">
        <hr>
        <h1>Install Naobian (Recommended)</h1>
        <ol>
          <li>Download and install <a target="_blank" href="https://www.balena.io/etcher/">Etcher</a></li>
          <li>Download the Naobian image (<code>.img</code> file) for your system from the repo:</li>
          <div class="download-button-container">
            <a class="download-button big" target="_blank" href="https://naobian.projectnaomi.com/Naobian-2.0.zip">Latest Naobian System Image</a>
          </div>
          <p>Note: sha256 checksum if you want to check the download <code>806bff7152c18e9cfc851a81198d9a7e1027f24eda70121553184d98181aba5b  Naobian-2.0.zip</code></p>
          <li>Follow the Naobian <router-link to="/dev/docs/installation/naobian.html">Documentation</router-link></li>
        </ol>
      </div>
    </div>

    <div v-if="(selectedSystem === 'tux' && selectedDistro === 'deb') || selectedSystem === 'raspberry-pi'">
      <hr>
      <h1>Manual Source Installation <span v-if="selectedSystem === 'tux'">(Recommended)</span></h1>
      <ol>
        <li>Open a terminal, Paste the line below, Press the return key</li>
          <div class="language-shell"><pre class="language-shell"><code>. <( wget -O - https://installers.projectnaomi.com/naomi-setup.sh )</code></pre></div>
      </ol>
    </div>
    <!--<div v-if="selectedSystem === 'tux' && selectedDistro === 'rpm'">
      <hr>
      <h1>Manual Installation (Recommended)</h1>
      <ol>
        <li>Fetch the repository</li>
          <div class="language-shell"><pre class="language-shell"><code v-if="selectedVersion === 'stable'">curl -L "https://dl.bintray.com/naomiproject/rpi-repo2/stable/Naomi-{{this.$page.frontmatter.currentVersion}}.zip" -o Naomi-{{this.$page.frontmatter.currentVersion}}.zip</code><code v-else-if="selectedVersion === 'dev'">curl -L "https://dl.bintray.com/naomiproject/rpi-repo2/dev/Naomi-{{this.$page.frontmatter.currentMilestoneVersion}}.zip" -o Naomi-{{this.$page.frontmatter.currentMilestoneVersion}}.zip</code><code v-else-if="selectedVersion === 'nightly'">curl -L "https://dl.bintray.com/naomiproject/rpi-repo2/nightly/{{this.$page.frontmatter.currentNightlyVersion}}.zip" -o {{this.$page.frontmatter.currentNightlyVersion}}.zip</code></code></pre></div>
        <li>Explode directory</li>
          <div class="language-shell"><pre class="language-shell"><code v-if="selectedVersion === 'stable'">unzip Naomi-{{this.$page.frontmatter.currentVersion}}.zip</code><code v-else-if="selectedVersion === 'dev'">unzip Naomi-{{this.$page.frontmatter.currentMilestoneVersion}}.zip</code><code v-else-if="selectedVersion === 'nightly'">unzip {{this.$page.frontmatter.currentNightlyVersion}}.zip</code></code></pre></div>
        <li>Rename directory</li>
          <div class="language-shell"><pre class="language-shell"><code v-if="selectedVersion === 'stable'">mv Naomi-{{this.$page.frontmatter.currentVersion}} Naomi</code><code v-else-if="selectedVersion === 'dev'">mv Naomi-{{this.$page.frontmatter.currentMilestoneVersion}} Naomi</code><code v-else-if="selectedVersion === 'nightly'">mv {{this.$page.frontmatter.currentNightlyVersion}} Naomi</code></pre></div>
        <li>Go into the directory</li>
          <div class="language-shell"><pre class="language-shell"><code>cd Naomi</code></pre></div>
        <li>Setup the install</li>
          <div class="language-shell"><pre class="language-shell"><code>chmod +x naomi-setup.sh</br>chmod +x compile_translations.sh</code></pre></div>
        <li>Run the install</li>
          <div class="language-shell"><pre class="language-shell"><code>./naomi-setup.sh</code></pre></div>
        <li>Run the app</li>
          <div class="language-shell"><pre class="language-shell"><code v-if="selectedVersion === 'stable'">python Naomi.py</code><code v-else-if="selectedVersion === 'dev' || 'nightly'">python3 Naomi.py</code></pre></div>
      </ol>
    </div>-->
    
    <div v-if="selectedSystem === 'win10' && (selectedVersion === 'stable' || selectedVersion === 'dev' || selectedVersion === 'nightly')">
      <hr>
      <h3>Windows Installation</h3>
      <p>Coming Soon!</p>
    </div>

    <div v-if="selectedSystem === 'apple' && (selectedVersion === 'stable' || selectedVersion === 'dev' || selectedVersion === 'nightly')">
      <hr>
      <h3>Apple Installation</h3>
      <p>Coming Soon!</p>
    </div>

    <div v-if="selectedSystem === 'virtualbox'">
      <hr>
      <h1>Install NaobianX86 (Recommended)</h1>
      <ol>
          <li>Download the NaobianX86 Open Virtualization Appliance (<code>.ova</code> file) for VirtualBox from the repo:</li>
          <div class="download-button-container">
            <a class="download-button big" target="_blank" href="https://naobian.projectnaomi.com/NaobianX86-1.0.ova">Latest NaobianX86 VM</a>
          </div>
          <p>Note: sha256 checksum if you want to check the download <code>6D3C64BF6DE8697D235D055B7DC0AAA32E487F2B8F096A5375430F862BF76CAA  NaobianX86-1.0.ova</code></p>
          <li>Follow the VirtualBox <router-link to="/dev/docs/installation/virtualbox.html">Documentation</router-link></li>
        </ol>
    </div>

    <div v-if="selectedSystem === 'virtualbox'">
      <hr>
      <h1>Manual Source Installation</h1>
      <ol>
        <li>Open a terminal, Paste the line below, Press the return key</li>
          <div class="language-shell"><pre class="language-shell"><code>. <( wget -O - https://installers.projectnaomi.com/naomi-setup.sh )</code></pre></div>
      </ol>
    </div>

    <div v-if="selectedSystem === 'docker' && (selectedVersion === 'stable' || selectedVersion === 'dev' || selectedVersion === 'nightly')">
      <hr>
      <h3>Docker Installation</h3>
      <p>Coming Soon!</p>
    </div>
  </div>

</template>

<style lang="stylus">
.instructions
  margin-top 1rem
  margin-bottom .3rem
  font-size 1.5rem
  font-weight bold
  text-align center
  font-family 'Open Sans', sans-serif
  font-weight 400
.os-tabs
  display flex
  flex-direction row
  align-items justify
  align-content center
  justify-content center
  .os-tab
    margin auto
    width 17%
    padding 3px
    text-align center
    position relative
    border 2px solid transparent
    cursor pointer
    &:hover
      background #f0f0f0
    &.selected
      border 2px solid #1397d5
    img
      height 48px
      display block
      position absolute
      left 50%
      transform translateX(-50%)
      object-fit contain
    .os-label
      margin-top 48px
      font-size 12px

.distro-tabs
  display flex
  flex-direction row
  align-items center
  align-content center
  justify-content center
  .distro-tab
    width 30%
    padding 3px
    text-align center
    position relative
    border 2px solid transparent
    cursor pointer
    font-size 15px
    img
      height 24px
    &:hover
      background #f0f0f0
    &.selected
      border 2px solid #1397d5

.version-tabs
  display flex
  flex-direction row
  align-items center
  align-content center
  justify-content center
  .version-tab
    width 20%
    padding 3px
    text-align center
    position relative
    border 2px solid transparent
    cursor pointer
    font-size 15px
    &:hover
      background #f0f0f0
    &.selected
      border 2px solid #1397d5

.download-button-container
  display flex
  flex-direction row
  align-items center
  align-content center
  justify-content center
.download-button
  margin 2rem
  display inline-block
  font-family 'Open Sans', sans-serif
  font-size 0.9rem
  color #1397d5
  padding 0.8rem 1.6rem
  border-radius 4px
  font-weight bold
  transition background-color .1s ease
  box-sizing border-box
  border 2px solid #1397d5
  &.big
    font-size 1.2rem
  &:hover
    background-color #1397d5
    color white
    text-decoration none !important

.img-center
  display block
  margin-left auto
  margin-right auto
  max-width 75%

@media (max-width: 480px)
  .os-tabs
    flex-flow wrap
    column-count 3
    .os-tab
      width 33%
  .distro-tabs
    .distro-tab
      width 50%
  .version-tabs
    .version-tab
      width 40%

</style>

<script>
export default {
  data () {
    return {
      systems: [
        ['tux', 'Linux'],
        //['win10', 'Windows'],
        //['apple', 'macOS'],
        ['raspberry-pi', 'Raspberry Pi'],
        ['virtualbox', 'Virtual Box'],
        //['docker', 'Docker'],
      ],
      selectedSystem: 'raspberry-pi',
      selectedDistro: 'deb',
      selectedVersion: 'dev',
      naobianImage: 'true'
    }
  },
  methods: {
    selectSystem (system) {
      this.selectedSystem = system
      if (system !== 'tux' && this.selectedVersion === 'dev') {
        this.selectedVersion = 'dev'
      }
    },
    selectVersion (version) {
      this.selectedVersion = version
    },
    selectDistro (distro) {
      this.selectedDistro = distro
    }
  },
  computed: {
    versions () {
      return [
        ['stable', 'Stable'],
        ['dev', 'Milestone'],
        ['nightly', 'Nightly'],
      ]
    },
    currentDownloadVersion () {
      if (this.selectedVersion === 'stable') {
        return this.$page.frontmatter.currentVersion
      } else {
        return this.$page.frontmatter.currentMilestoneVersion
      }
    },
    currentVersionLabel () {
      if (this.selectedVersion) {
        return this.versions.find(v => v[0] === this.selectedVersion)[1]
      }
    }
  }
}
</script>
