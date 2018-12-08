import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VeeValidate from 'vee-validate';
import {
    Validator
} from 'vee-validate';

Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");

Validator.extend('address', {
    getMessage: () => {
            return 'Invalid Address'
    },
    validate: (value) => {
        value = value.replace(/ /g, '');
        value.substr(4) + value.substr(0, 4)

        const num = value.split('').map((c) => {
            const code = c.toUpperCase().charCodeAt(0);
            return code >= 48 && code <= 57 ? c : (code - 55).toString();
        }).join('');
        let tmp = '';

        for (let i = 0; i < Math.ceil(num.length / 6); i++) {
            tmp = (parseInt(tmp + num.substr(i * 6, 6)) % 97).toString();
        }

        if (parseInt(tmp) !== 1) {
            return false
        } else {
            return true
        }
    }
})

function _onConsensusEstablished() {
    console.log(`On head: ${$.blockchain.height}`)
}

function _onHeadChanged() {}

function _onPeersChanged() {
    console.log(`Now connected to ${$.network.peerCount} peers.`);
}

(async =>{
    Nimiq.init(async function () {
            console.log('Nimiq loaded. Connecting and establishing consensus.')
            // Connect to the testnet.
            Nimiq.GenesisConfig.main();
            const $ = {};
            window.$ = $;
            $.consensus = await Nimiq.Consensus.light();

            //$.wallet = await Nimiq.Wallet.generate();

            $.blockchain = $.consensus.blockchain;
            $.mempool = $.consensus.mempool;
            $.network = $.consensus.network;

            $.consensus.on('established', () => _onConsensusEstablished());
            $.consensus.on('lost', () => console.error('Consensus lost'));
            $.network.on('peers-changed', () => _onPeersChanged());

            //$.network.connect();

            // $.consensus.getAccount($.wallet.address)
            //     .then(account => _onBalanceChanged(account));
        },
        function (code) {
            switch (code) {
                case Nimiq.ERR_WAIT:
                    alert('Error: Already open in another tab or window.');
                    break;
                case Nimiq.ERR_UNSUPPORTED:
                    alert('Error: Browser not supported');
                    break;
                default:
                    alert('Error: Nimiq initialization error');
                    break;
            }
        });
})()