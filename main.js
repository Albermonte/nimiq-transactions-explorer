check_transactions = async() => {
    const cors_api = "https://cors-anywhere.herokuapp.com/"
    const from_address = document.getElementById('from_address').value
    const to_address = document.getElementById('to_address').value

    let address_info = await fetch(`https://api-2.rawtx.io/v1/nim/addresses/${from_address}/`)
    address_info = await address_info.json()
    let PAGE_SIZE = address_info.totalTransactions + 1
    console.log(`Page Size: ${PAGE_SIZE}`)

    let tx_array = await fetch(`${cors_api}https://explorer.sushipool.com/api/transactions/from/${from_address}/to/${to_address}/`)
    tx_array = await tx_array.json()
    let stop = false
    let i = 50
    
    while (!stop) {
        let tx_array_temp = await fetch(`${cors_api}https://explorer.sushipool.com/api/transactions/from/${from_address}/to/${to_address}/${i}`)
        tx_array_temp = await tx_array_temp.json()
        tx_array = tx_array.concat(tx_array_temp)
        console.log(i)
        i += 50
        if(tx_array_temp.length < 50) stop = true
    }
    
    
    let sended_total = 0
    let received_total = 0

    tx_array.forEach(element => {
        sended_total += element.value
    });
    tx_array.forEach(element => {
        received_total += element.value
    });

    let sended_total_NIM = Nimiq.Policy.satoshisToCoins(sended_total)
    let received_total_NIM = Nimiq.Policy.satoshisToCoins(received_total)

    document.getElementById('sended_total').innerHTML = `${sended_total_NIM} NIM`
    document.getElementById('received_total').innerHTML = `${received_total_NIM} NIM`

    console.log(`Sended Total: ${sended_total_NIM}  Received Total: ${received_total_NIM}`)
}
