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
    <!--<div class="instructions" v-if="selectedSystem === 'tux'">Choose your package manager</div>-->
    <!--<div class="distro-tabs" v-if="selectedSystem === 'tux'">
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
      <div class="distro-tab"
        :class="{ 'selected': selectedDistro === 'rpm' }" @click="selectDistro('rpm')">
        <div>
          <img src="/os/redhat.svg" title="RedHat" />
          <img src="/os/opensuse.svg" style="margin-left: 2px; margin-bottom: 2px; filter: grayscale(100%) brightness(0)" title="openSUSE" />
          <img src="/os/mageia.svg" style="filter: grayscale(100%)" title="Mageia" />
          <img src="/os/fedora.svg" style="filter: grayscale(100%)" title="Fedora" />...
        </div>
        <div class="distro-label">RPM (.rpm packages)</div>
      </div>
    </div>-->
    <div class="instructions" v-if="selectedSystem">Choose your version</div>
    <div class="version-tabs" v-if="selectedSystem">
      <div class="version-tab"
        v-for="version in versions"
        :class="{ 'selected': selectedVersion === version[0] }" @click="selectVersion(version[0])">
        <strong>{{version[1]}}</strong><br />
        <small v-if="version[0] === 'stable'">{{$page.frontmatter.currentVersion}}</small>
        <small v-if="version[0] === 'dev'">{{$page.frontmatter.currentMilestoneVersion}}</small>
        <!--<small v-if="version[0] === 'snapshot'">{{$page.frontmatter.currentSnapshotVersion}}</small>-->
      </div>
    </div>

    <div v-if="selectedVersion" class="tip custom-block">
      <p v-if="selectedVersion === 'stable'"><strong>Stable</strong> versions are thoroughly tested semi-annual official releases of Naomi. Use the stable version for your production environment if you don't need the latest enhancements and prefer a robust system.</p>
      <p v-if="selectedVersion === 'dev'"><strong>Milestone</strong> versions are intermediary releases of the next Naomi version, released about once a month, and they include the new recently added features and bugfixes. They are a good compromise between the current stable version and the bleeding-edge and potentially unstable snapshot version.</p>
      <p v-if="selectedVersion === 'snapshot'"><strong>Snapshot</strong> versions are at most 1 or 2 days old and include the latest code. Use a snapshot for testing out very recent changes, but be aware some snapshots might be unstable. Use in production at your own risk!</p>
    </div>

    <div v-if="selectedSystem === 'raspberry-pi' || selectedSystem === 'pine64'">
      <hr>
      <h3>Install Naobian (Recommended)</h3>
      <ol>
        <li>Download and install <a target="_blank" href="https://etcher.io/">Etcher</a></li>
        <li>Download the Naobian image (<code>.img</code> file) for your system from <a target="_blank" href="https://github.com/naomiproject/naobian/releases/latest">https://github.com/naomiproject/naobian/releases/latest</a>:</li>
        <div class="download-button-container">
          <a class="download-button big" target="_blank" href="https://github.com/naomiproject/naobian/releases/latest">Latest Naobian System Image</a>
        </div>
        <li>Write the image to your SD card using Etcher</li>
        <li>Insert the SD card in your device, ensure the network is connected (<router-link to="/docs/installation/naobian.html#wi-fi-based-setup-notes">or setup the Wi-Fi</router-link> first) and boot!</li>
        <li>Wait between 5 and 15 minutes for Naoian to perform its initial setup</li>
        <li v-if="selectedVersion !== 'stable'">Use the <code>naobian-config</code> tool (<router-link to="/docs/installation/naobian.html#naobian-configuration-tool">documentation</router-link>) to switch from the stable version to the {{selectedVersion}} version</li>
        <!--<li>Navigate with a web browser to <code>http://naobianpi:8080</code></li>-->
        <li>Continue by following the <router-link to="/docs/tutorial/1sttimesetup.html">First-time setup</router-link> chapter of the <router-link to="/docs/tutorial/">New User Tutorial</router-link></li>
      </ol>
    </div>

    <div v-if="(selectedSystem === 'tux' && selectedDistro === 'deb') || selectedSystem === 'raspberry-pi' || selectedSystem === 'pine64'">
      <hr>
      <h3>Manual Installation <span v-if="selectedSystem === 'tux'">(Recommended)</span></h3>
      <ol>
        <li>Fetch the repository</li>
          <div class="language-shell"><pre class="language-shell"><code v-if="selectedVersion === 'stable'">curl -L "https://dl.bintray.com/naomiproject/rpi-repo2/stable/Naomi-{{this.$page.frontmatter.currentVersion}}.zip" -o Naomi-{{this.$page.frontmatter.currentVersion}}.zip</code><code v-else-if="selectedVersion === 'dev'">curl -L "https://dl.bintray.com/naomiproject/rpi-repo2/dev/Naomi-{{this.$page.frontmatter.currentMilestoneVersion}}.zip" -o Naomi-{{this.$page.frontmatter.currentMilestoneVersion}}.zip</code></code></pre></div>
        <li>Explode directory</li>
          <div class="language-shell"><pre class="language-shell"><code v-if="selectedVersion === 'stable'">unzip Naomi-{{this.$page.frontmatter.currentVersion}}.zip</code><code v-else-if="selectedVersion === 'dev'">unzip Naomi-{{this.$page.frontmatter.currentMilestoneVersion}}.zip</code></code></pre></div>
        <li>Go into the repository</li>
          <div class="language-shell"><pre class="language-shell"><code>cd Naomi-{{this.$page.frontmatter.currentVersion}}</code></pre></div>
        <li>Setup the install</li>
          <div class="language-shell"><pre class="language-shell"><code>chmod +x naomi-setup.sh</code></pre></div>
        <li>Run the install</li>
          <div class="language-shell"><pre class="language-shell"><code>./naomi-setup.sh</code></pre></div>
        <li>Run the app</li>
          <div class="language-shell"><pre class="language-shell"><code>python Naomi.py</code></pre></div>
        <!--<li>Navigate with a web browser to <code>http://&lt;ip-address&gt;:8080</code></li>-->
        <li>Continue by following the <router-link to="/docs/tutorial/1sttimesetup.html">First-time setup</router-link> chapter of the <router-link to="/docs/tutorial/">New User Tutorial</router-link></li>
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
        <!--<li>Navigate with a web browser to <code>http://&lt;ip-address&gt;:8080</code></li>-->
        <li>Continue by following the <router-link to="/docs/tutorial/1sttimesetup.html">First-time setup</router-link> chapter of the <router-link to="/docs/tutorial/">New User Tutorial</router-link></li>
      </ol>
    </div>    

    <div v-if="selectedSystem === 'docker'">
      <hr>
      <h3>Docker Container Quick Installation</h3>
      <p>Coming Soon!</p>
      <!--<p>These are very simplified instructions, check the <router-link to="/docs/installation/docker.html">documentation article</router-link> or <a target="_blank" href="https://hub.docker.com/r/naomiproject/naomi/">https://hub.docker.com/r/naomiproject/naomi/</a> for more information.</p>
      <ol>
        <li>Create the <code>naomi</code> user:</li>
        <div class="language-shell">
<pre class="language-shell"><code>groupadd -g 9001 naomi
groupadd -g 9001 naomi
usermod -a -G naomi myownuser
</code></pre>
        </div>
        <li>Pull and run the container (command line version):</li>
        <div class="language-shell">
<pre class="language-shell"><code>docker run \
        --name naomi \
        --net=host \
        --tty \
        -v /etc/localtime:/etc/localtime:ro \
        -v /etc/timezone:/etc/timezone:ro \
        -v naomi_addons:/naomi/addons \
        -v naomi_conf:/naomi/conf \
        -v naomi_userdata:/naomi/userdata \
        -d \
        --restart=always \
        naomi/naomi:{{selectedVersion === 'stable' ? $page.frontmatter.currentVersion : selectedVersion === 'testing' ? $page.frontmatter.currentMilestoneVersion : $page.frontmatter.currentSnapshotVersion.toLowerCase()}}
</code></pre>
        </div>
      </ol>-->
    </div>

    <div v-if="selectedSystem !== 'docker' && (selectedVersion === 'stable' || selectedVersion === 'dev')">
      <!--<hr>
      <h3>Manual Installation</h3>
      <ol>
        <li>Install a recent Java 8 platform (we recommend <a target="_blank" href="https://www.azul.com/products/zulu/">Zulu</a>), see <router-link to="/docs/installation/#prerequisites">prerequisites</router-link></li>
        <li>Download and extract the Naomi runtime distribution from <a target="_blank" href="https://bintray.com/naomiproject/mvn/naomi-distro">https://bintray.com/naomiproject/mvn/naomi-distro</a>:</li>
        <div class="download-button-container">
          <a class="download-button big" :href="runtimeDownloadLink">Download Naomi {{currentDownloadVersion}} {{currentVersionLabel}} Runtime</a>
        </div>
        <li><strong>(Optional)</strong> Download the add-on archives for offline use and put them in the <code>addons</code> folder of the extracted distribution:</li>
        &#128712; <small>	You don't need the add-ons archives if your machine has Internet access, Naomi will download add-ons you need online as necessary.</small>
        <div class="download-button-container">
          <a class="download-button" style="margin-bottom: 0" :href="addonsDownloadLink">Download Naomi {{currentDownloadVersion}} {{currentVersionLabel}} Add-ons</a>
        </div>
        <div class="download-button-container">
          <a class="download-button" :href="legacyAddonsDownloadLink">Download Naomi {{currentDownloadVersion}} {{currentVersionLabel}} Legacy Add-ons</a>
        </div>
        <li v-if="selectedSystem === 'apple'">
          Open <em>System Preferences &gt; Keyboard &gt; Shortcuts</em> and check the <em>New Terminal at Folder</em> option under <em>Services</em>:<br />
          <img class="img-center" src="./images/macos-settings.png" />
        </li>
        <li v-if="selectedSystem === 'apple'">
          Using the Finder, find the folder with the extracted runtime (look into the Downloads folder), then open its context menu and select <em>New Terminal at Folder</em>:<br /><br />
          <img class="img-center" src="./images/macos-contextmenu.png" /><br />
        </li>
        <li>
          <span v-if="selectedSystem !== 'windows'">Run <code>{{ selectedSystem === 'win10' ? 'start.bat' : './start.sh'}}</code></span>
          <span v-if="selectedSystem === 'apple'"> in the Terminal</span>
          and wait for Naomi to perform its initial startup (this can take a few minutes depending on your machine)</li>
        <li>Navigate with a web browser to <code>http://{{selectedSystem === 'apple' || selectedSystem === 'win10' ? 'localhost' : '&lt;ip-address&gt;'}}:8080</code></li>
        <li>Continue by following the <router-link to="/docs/tutorial/1sttimesetup.html">First-time setup</router-link> chapter of the <router-link to="/docs/tutorial/">New User Tutorial</router-link></li>
      </ol>-->
    </div>

    <div v-if="selectedSystem !== 'docker' && selectedVersion === 'snapshot'">
      <!--<hr />
      <h3>Manual Installation</h3>
      <ol>
        <li>Install a recent Java 8 platform (we recommend <a target="_blank" href="https://www.azul.com/products/zulu/">Zulu</a>)</li>
        <li>Download and extract the distribution from <a href="https://ci.projectnaomi.com/">https://ci.projectnaomi.com/</a>:</li>
        <div class="download-button-container">
          <a target="_blank" class="download-button big" :href="`https://ci.projectnaomi.com/job/Naomi-Distribution/`">Latest Naomi {{$page.frontmatter.currentSnapshotVersion}} Build</a>
        </div>
      </ol>-->
    </div>

    <div v-if="selectedSystem === 'win10' && selectedVersion === 'stable'">
      <hr>
      <p>Coming Soon!</p>
      <!--<h3>Install with Chocolatey</h3>
      <div class="danger custom-block">
        <p class="custom-block-title">Unofficial installation method</p>
        <p>Please note, the Chocolatey package is a community-provided installation option presented here as a convenience, and is not officially supported by the Naomi project.</p>
      </div>
      <ol>
        <li>Right-click on the Start menu and select <em>Command Prompt (admin)</em> or <em>Windows PowerShell (admin)</em></li>
        <li>Install the <a target="_blank" href="https://chocolatey.org/install">Chocolatey</a> package manager by running one of these commands:
          <ul>
            <li>If you opened a command prompt (cmd.exe)
            <div class="language-shell"><pre class="language-shell"><code>@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"</code></pre></div></li>
            <li>If you opened PowerShell
            <div class="language-shell"><pre class="language-shell"><code>Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))</code></pre></div></li>
          </ul>
        </li>
        <li>Install the <a target="_blank" href="https://chocolatey.org/packages/naomi">Naomi Chocolatey package</a>:</li>
        <div class="language-shell"><pre class="language-shell"><code>choco install naomi</code></pre></div>
      </ol>-->
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
      selectedVersion: 'stable'
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
//        ['snapshot', 'Snapshot']
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
//      } else if (this.selectedVersion === 'dev') {
//        return this.$page.frontmatter.currentMilestoneVersion
//      } else {
//        return this.$page.frontmatter.currentSnapshotVersion
//      }
    },
    currentVersionLabel () {
      if (this.selectedVersion) {
        return this.versions.find(v => v[0] === this.selectedVersion)[1]
      }
    }
  }
}
</script>
