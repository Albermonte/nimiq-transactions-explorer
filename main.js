check_transactions = async() => {
    const from_address = document.getElementById('from_address').value
    const to_address = document.getElementById('to_address').value

    let address_info = await fetch(`https://api-2.rawtx.io/v1/nim/addresses/${from_address}/`)
    address_info = await address_info.json()
    let PAGE_SIZE = address_info.totalTransactions + 1
    console.log(`Page Size: ${PAGE_SIZE}`)
    
    let tx_array = null
    if (PAGE_SIZE < 1000) {
        tx_array = await fetch(`https://api-2.rawtx.io/v1/nim/addresses/${from_address}/transactions?pageSize=${PAGE_SIZE}`)

        tx_array = await tx_array.json()
        tx_array = tx_array.items
    }
    else {
        tx_array = await fetch(`https://api-2.rawtx.io/v1/nim/addresses/${from_address}/transactions?pageSize=1000`)
        tx_array = await tx_array.json()
        tx_array = tx_array.items

        for (let PAGE_NUMBER = 1; PAGE_NUMBER <= Math.ceil(PAGE_SIZE / 1000); PAGE_NUMBER++) {
            console.log(PAGE_NUMBER)
            let tx_array2 = await fetch(`https://api-2.rawtx.io/v1/nim/addresses/${from_address}/transactions?page=${PAGE_NUMBER}&pageSize=1000`)
            tx_array2 = await tx_array2.json()
            tx_array2 = tx_array2.items
            tx_array = tx_array.concat(tx_array2)
        }
    }
    console.log(tx_array)


    let sended_result = tx_array.filter(element => element.from == from_address);
    sended_result = sended_result.filter(element => element.to == to_address);
    const received_result = tx_array.filter(element => element.from == to_address);

    console.log(sended_result)
    console.log(received_result)

    let sended_total = 0
    let received_total = 0

    sended_result.forEach(element => {
        sended_total += element.value
    });
    received_result.forEach(element => {
        received_total += element.value
    });

    let sended_total_NIM = Nimiq.Policy.satoshisToCoins(sended_total)
    let received_total_NIM = Nimiq.Policy.satoshisToCoins(received_total)

    document.getElementById('sended_total').innerHTML = `${sended_total_NIM} NIM`
    document.getElementById('received_total').innerHTML = `${received_total_NIM} NIM`

    console.log(`Sended Total: ${sended_total_NIM}  Received Total: ${received_total_NIM}`)
}
