<template>
  <div>
    <div id="os-tabs" align="center">
      <div id="os-tab" style="margin-right: 5px;display: inline-block;vertical-align: middle;" align="center"
        v-for="crypto in cryptos" :class="{ 'selected': selectedCrypto === crypto[0] }" @click="selectCrypto(crypto[0])">
        <img :src="`/images/${crypto[0]}.${crypto[0] === 'paypal' ? 'png' : 'svg'}`" style="height: 38px;"  align="center">
        <div id="os-lable" style="margin: 20px;display: inline-block;vertical-align: middle;color: #304455;font-weight: 600;">{{crypto[1]}}</div>
      </div>
    </div>

    <div v-if="selectedCrypto === 'paypal'" id="coin-details" style="text-align: center;border-radius: 4px;padding: 30px;font-weight: bold;">
      <a href="https://www.paypal.me/austincasteel" target="_blank"><img src="/images/paypal.png" style="width:50%"></a>
    </div>
    <div v-if="selectedCrypto === 'btc'" id="coin-details" style="text-align: center;border-radius: 4px;padding: 30px;font-weight: bold;">
      <p>Bitcoin Address:<br>3BPRVHyGYbyMSkSM5peM7bzgiRTKH468Xt</p>
      <img src="/images/coin-btc.png" width="200px">
    </div>
    <div v-if="selectedCrypto === 'bch'" id="coin-details" style="text-align: center;border-radius: 4px;padding: 30px;font-weight: bold;">
      <p>Bitcoin Cash Address:<br>qpkz80zmg2x7mhthurmaf7desytaxgk9csp87gmnrj</p>
      <img src="/images/coin-bch.png" width="200px">
    </div>
    <div v-if="selectedCrypto === 'eth'" id="coin-details" style="text-align: center;border-radius: 4px;padding: 30px;font-weight: bold;">
      <p>Ethereum Address:<br>0x9133b3e654Ffac5Cc6E88eb3C038FBAAc5542645</p>
      <img src="/images/coin-eth.png" width="200px">
    </div>
    <div v-if="selectedCrypto === 'ltc'" id="coin-details" style="text-align: center;border-radius: 4px;padding: 30px;font-weight: bold;">
      <p>Litecoin Address:<br>MKvWn7mbiJos6ckRJg49z5ithFM2xuaE2T</p>
      <img src="/images/coin-ltc.png" width="200px">
    </div>
  </div>
</template>

<style>
.big-title {
  font-family: 'Open Sans', sans-serif;
  font-size: 2rem;
  font-weight: 400;
  text-align: center;
}
img.illustration {
  width: 50%;
  transform: translateX(50%);
}
@media (max-width: 719px) {
  img.illustration {
    width: 100%;
    transform: translateX(0);
  }
}
</style>

<script>
export default {
  data () {
    return {
      cryptos: [
        ['paypal', ''],
        ['btc', 'BTC'],
        ['bch', 'BCH'],
        ['eth', 'ETH'],
        ['ltc', 'LTC'],
      ],
      selectedCrypto: '',
    }
  },
  methods: {
    selectCrypto (crypto) {
      this.selectedCrypto = crypto
      if (crypto !== 'btc') {
      }
    },
  }
}
</script>