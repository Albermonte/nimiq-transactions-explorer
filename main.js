check_transactions = async () =>{
    const from_address = document.getElementById('from_address').value
    const to_address = document.getElementById('to_address').value

    const tx_array = await $.consensus._requestTransactionHistory(Nimiq.Address.fromString(from_address))
    
    const sended_result = tx_array.filter(element => element.transaction.recipient.toUserFriendlyAddress() == to_address);
    const received_result = tx_array.filter(element => element.transaction.recipient.toUserFriendlyAddress() == from_address);

    let sended_total = 0
    let received_total = 0

    sended_result.forEach(element => {
        sended_total += element.transaction.value
    });
    received_result.forEach(element => {
        received_total += element.transaction.value
    });

    let sended_total_NIM = Nimiq.Policy.satoshisToCoins(sended_total)
    let received_total_NIM = Nimiq.Policy.satoshisToCoins(received_total)

    document.getElementById('sended_total').innerHTML = `${sended_total_NIM} NIM`
    document.getElementById('received_total').innerHTML = `${received_total_NIM} NIM`

    console.log(`Sended Total: ${sended_total_NIM}  Received Total: ${received_total_NIM}`)
}