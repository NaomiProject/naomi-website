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
    <div class="instructions" v-if="selectedSystem">Choose your version</div>
    <div class="version-tabs" v-if="selectedSystem">
      <div class="version-tab"
        v-for="version in versions"
        :class="{ 'selected': selectedVersion === version[0] }" @click="selectVersion(version[0])">
        <strong>{{version[1]}}</strong><br />
        <small v-if="version[0] === 'stable'">{{$page.frontmatter.currentVersion}}</small>
        <small v-if="version[0] === 'dev'">{{$page.frontmatter.currentMilestoneVersion}}</small>
      </div>
    </div>

    <div v-if="selectedVersion" class="tip custom-block">
      <p v-if="selectedVersion === 'stable'"><strong>Stable</strong> versions are thoroughly tested semi-annual official releases of Naomi. Use the stable version for your production environment if you don't need the latest enhancements and prefer a robust system.</p>
      <p v-if="selectedVersion === 'dev'"><strong>Milestone</strong> versions are intermediary releases of the next Naomi version, released about once a month, and they include the new recently added features and bugfixes. They are a good compromise between the current stable version and the bleeding-edge and potentially unstable snapshot version.</p>
      <p v-if="selectedVersion === 'snapshot'"><strong>Snapshot</strong> versions are at most 1 or 2 days old and include the latest code. Use a snapshot for testing out very recent changes, but be aware some snapshots might be unstable. Use in production at your own risk!</p>
    </div>

    <div v-if="naobianImage === 'true'">
      <div v-if="selectedSystem === 'raspberry-pi' || selectedSystem === 'pine64'">
        <hr>
        <h3>Install Naobian (Recommended)</h3>
        <ol>
          <li>Download and install <a target="_blank" href="https://www.balena.io/etcher/">Etcher</a></li>
          <li>Download the Naobian image (<code>.img</code> file) for your system from the repo:</li>
          <div class="download-button-container">
            <a class="download-button big" target="_blank" href="https://projectnaomi.com/Naobian-1.0.zip">Latest Naobian System Image</a>
          </div>
          <p>Note: sha256 checksum if you want to check the download <code>f308875fba9ffad8868aa256e50df095eaa2cf159adebd490c4a555ae147ee1c  Naobian-1.0.zip</code></p>
          <li>Write the image to your SD card using Etcher</li>
          <li>Insert the SD card in your device, ensure the network is connected or setup the Wi-Fi first if you want to update & ssh into the device, and reboot!</li>
          <p>Unlike standard Raspbian which has a user <code>'pi'</code> with a password <code>'raspberry'</code>, the Naobian image uses the following as default username and password:</p>
          <div class="language-shell"><pre class="language-shell"><code>Default user:     pi
Default password: Naobian</code></pre></div>
          <p>As a network connected device, having a unique password significantly enhances your security and thwarts the majority of hacking attempts.</p>
          <p>We recommend setting a unique password for any device, especially one that is exposed directly to the internet.</p>
          <li>Go into the directory</li>
          <div class="language-shell"><pre class="language-shell"><code>cd Naomi</code></pre></div>
          <li>Run the app</li>
          <div class="language-shell"><pre class="language-shell"><code>./Naomi.py</code></pre></div>
          <p>To update check for updates at any given time</p>
          <p>go into the Naomi dir (<code>cd ~/Naomi</code>) and run <code>git pull</code></p>
        </ol>
      </div>
    </div>

    <div v-if="(selectedSystem === 'tux' && selectedDistro === 'deb') || selectedSystem === 'raspberry-pi' || selectedSystem === 'pine64'">
      <hr>
      <h3>Manual Installation <span v-if="selectedSystem === 'tux'">(Recommended)</span></h3>
      <ol>
        <li>Follow the Config <router-link to="/docs/configuration/">Documentation</router-link> to setup the <router-link to="/docs/configuration/audio.html">Audio Engine</router-link>, <router-link to="/docs/configuration/tts.html">Text-to-Speech</router-link>, & <router-link to="/docs/configuration/stt.html">Speech-to-Text</router-link>.</li>
        <li>Fetch the repository</li>
          <div class="language-shell"><pre class="language-shell"><code v-if="selectedVersion === 'stable'">curl -L "https://dl.bintray.com/naomiproject/rpi-repo2/stable/Naomi-{{this.$page.frontmatter.currentVersion}}.zip" -o Naomi-{{this.$page.frontmatter.currentVersion}}.zip</code><code v-else-if="selectedVersion === 'dev'">curl -L "https://dl.bintray.com/naomiproject/rpi-repo2/dev/Naomi-{{this.$page.frontmatter.currentMilestoneVersion}}.zip" -o Naomi-{{this.$page.frontmatter.currentMilestoneVersion}}.zip</code></code></pre></div>
        <li>Explode directory</li>
          <div class="language-shell"><pre class="language-shell"><code v-if="selectedVersion === 'stable'">unzip Naomi-{{this.$page.frontmatter.currentVersion}}.zip</code><code v-else-if="selectedVersion === 'dev'">unzip Naomi-{{this.$page.frontmatter.currentMilestoneVersion}}.zip</code></code></pre></div>
        <li>Rename directory</li>
          <div class="language-shell"><pre class="language-shell"><code v-if="selectedVersion === 'stable'">mv Naomi-{{this.$page.frontmatter.currentVersion}} Naomi</code><code v-else-if="selectedVersion === 'dev'">mv Naomi-{{this.$page.frontmatter.currentMilestoneVersion}} Naomi</code></pre></div>
        <li>Go into the directory</li>
          <div class="language-shell"><pre class="language-shell"><code>cd Naomi</code></pre></div>
        <li>Setup the install</li>
          <div class="language-shell"><pre class="language-shell"><code>chmod +x naomi-setup.sh</code></pre></div>
        <li>Run the install</li>
          <div class="language-shell"><pre class="language-shell"><code>./naomi-setup.sh</code></pre></div>
        <li>Run the app</li>
          <div class="language-shell"><pre class="language-shell"><code v-if="selectedVersion === 'stable'">python Naomi.py</code><code v-else-if="selectedVersion === 'dev'">python3 Naomi.py</code></pre></div>
      </ol>
    </div>
    <div v-if="selectedSystem === 'tux' && selectedDistro === 'rpm'">
      <hr>
      <h3>Manual Installation (Recommended)</h3>
      <ol>
        <li>Create a new <code>/etc/yum.repos.d/naomi.repo</code> file with the following content:</li>
        <div class="language-ini">
<pre class="language-ini"><code>[Naomi-{{selectedVersion === 'stable' ? 'Stable' : selectedVersion === 'dev' ? 'Dev' : 'Snapshots'}}]
name=Naomi 2.x.x {{selectedVersion === 'stable' ? 'Stable' : selectedVersion === 'dev' ? 'Dev' : 'Snapshots'}}
baseurl={{selectedVersion === 'stable' ? 'https://dl.bintray.com/naomiproject/rpi-repo/stable' : selectedVersion === 'dev' ? 'https://dl.bintray.com/naomiproject/rpi-repo/dev' : 'https://naomi.jfrog.io/naomiproject/naomi-linuxpkg-rpm/unstable'}}
gpgcheck=1
gpgkey=https://bintray.com/user/downloadSubjectPublicKey?username=naomiproject
enabled=1
</code></pre>
        </div>
        <li>Go into the repository</li>
          <div class="language-shell"><pre class="language-shell"><code>cd naomi</code></pre></div>
        <li>Setup the install</li>
          <div class="language-shell"><pre class="language-shell"><code>chmod +x naomi-setup.sh</code></pre></div>
        <li>Run the install</li>
          <div class="language-shell"><pre class="language-shell"><code>./naomi-setup.sh</code></pre></div>
        <li>Run the app</li>
          <div class="language-shell"><pre class="language-shell"><code>python Naomi.py</code></pre></div>
      </ol>
    </div>    

    <div v-if="selectedSystem === 'docker'">
      <hr>
      <h3>Docker Container Quick Installation</h3>
      <p>Coming Soon!</p>
    </div>

    <div v-if="selectedSystem !== 'docker' && (selectedVersion === 'stable' || selectedVersion === 'dev')">
    </div>

    <div v-if="selectedSystem !== 'docker' && selectedVersion === 'snapshot'">
    </div>

    <div v-if="selectedSystem === 'win10' && selectedVersion === 'stable'">
      <hr>
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
//        ['tux', 'Linux'],
//        ['win10', 'Windows'],
//        ['apple', 'macOS'],
        ['raspberry-pi', 'Raspberry Pi'],
//        ['pine64', 'PINE A64'],
//        ['docker', 'Docker'],
      ],
      selectedSystem: 'raspberry-pi',
      selectedDistro: 'deb',
      selectedVersion: 'stable',
      naobianImage: 'true'
    }
  },
  methods: {
    selectSystem (system) {
      this.selectedSystem = system
      if (system !== 'tux' && this.selectedVersion === 'dev') {
        this.selectedVersion = null
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
      ]
    },
    runtimeDownloadLink () {
      if (this.selectedVersion === 'stable') {
        return `https://bintray.com/naomiproject/mvn/download_file?file_path=com%2Fprojectnaomi%2Fdistro%2Fnaomi%2F${this.$page.frontmatter.currentVersion}%2Fnaomi-${this.$page.frontmatter.currentVersion}.zip`
      } else if (this.selectedVersion === 'dev') {
        return `https://naomi.jfrog.io/naomiproject/libs-milestone-local/com/projectnaomi/distro/naomi/${this.$page.frontmatter.currentMilestoneVersion}/naomi-${this.$page.frontmatter.currentMilestoneVersion}.zip`
      }
    },
    addonsDownloadLink () {
      if (this.selectedVersion === 'stable') {
        return `https://bintray.com/naomiproject/mvn/download_file?file_path=com%2Fnaomi%2Fdistro%2Fnaomi-addons%2F${this.$page.frontmatter.currentVersion}%2Fnaomi-addons-${this.$page.frontmatter.currentVersion}.kar`
      } else if (this.selectedVersion === 'dev') {
        return `https://naomi.jfrog.io/naomiproject/libs-milestone-local/com/naomi/distro/naomi-addons/${this.$page.frontmatter.currentMilestoneVersion}/naomi-addons-${this.$page.frontmatter.currentMilestoneVersion}.kar`
      }
    },
    legacyAddonsDownloadLink () {
      if (this.selectedVersion === 'stable') {
        return `https://bintray.com/naomiproject/mvn/download_file?file_path=com%2Fnaomi%2Fdistro%2Fnaomi-addons-legacy%2F${this.$page.frontmatter.currentVersion}%2Fnaomi-addons-legacy-${this.$page.frontmatter.currentVersion}.kar`
      } else if (this.selectedVersion === 'dev') {
        return `https://naomi.jfrog.io/naomiproject/libs-milestone-local/com/naomi/distro/naomi-addons-legacy/${this.$page.frontmatter.currentMilestoneVersion}/naomi-addons-legacy-${this.$page.frontmatter.currentMilestoneVersion}.kar`
      }
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
