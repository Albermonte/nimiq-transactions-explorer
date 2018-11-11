function _onConsensusEstablished() {
    console.log(`On head: ${$.blockchain.height}`)
}

function _onHeadChanged() {
}

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