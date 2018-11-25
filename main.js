let alreadyChecking = false

check_transactions = async() => {
    if (alreadyChecking) {
        alert("Already checking")
        return
    }
    alreadyChecking = true

    const cors_api = "https://cors.io/?"
    const from_address = document.getElementById('from_address').value
    const to_address = document.getElementById('to_address').value
    const api_key = "?api_key=c708fd4fe23e15d9e8aaae3e79d5b6b2"

    let from_address_info = await fetch(`${cors_api}https://api.nimiqx.com/account/${from_address}/${api_key}`)
    from_address_info = await from_address_info.json()
    let from_PAGES = Math.ceil(from_address_info.transactions / 100)
    console.log(`Page Size: ${from_PAGES}`)

    let to_address_info = await fetch(`${cors_api}https://api.nimiqx.com/account/${to_address}/${api_key}`)
    to_address_info = await to_address_info.json()
    let to_PAGES = Math.ceil(to_address_info.transactions / 100)
    console.log(`Page Size: ${to_PAGES}`)

    if (from_PAGES <= to_PAGES) {
        check_address = from_address
        receiver_address = to_address
    }
    else {
        check_address = to_address
        receiver_address = from_address
    }

    let tx_array = await fetch(`${cors_api}https://api.nimiqx.com/account-transactions/${check_address}/100/0/${api_key}`)
    tx_array = await tx_array.json()
    let stop = false
    let i = 100

    while (!stop) {
        let tx_array_temp = await fetch(`${cors_api}https://api.nimiqx.com/account-transactions/${check_address}/100/${i}/${api_key}`)
        tx_array_temp = await tx_array_temp.json()
        tx_array = tx_array.concat(tx_array_temp)
        console.log(`Page: ${i/100}`)
        i += 100
        if (tx_array_temp.length < 100) stop = true
    }

    let sended_array = tx_array.filter(element => element.to_address == receiver_address);
    sended_array = sended_array.filter(element => element.from_address == check_address);
    let received_array = tx_array.filter(element => element.from_address == receiver_address);
    received_array = received_array.filter(element => element.to_address == check_address);

    console.log("tx_array: ", tx_array)

    let hash_array = []
    for (let i = 0; i < received_array.length; i++) {
        hash_array.push(received_array[i].hash)
    }

    console.log("Duplicates: ", find_duplicate_in_array(hash_array));

    let sended_total = 0
    let received_total = 0

    sended_array.forEach(element => {
        sended_total += element.value
    });
    received_array.forEach(element => {
        received_total += element.value
    });

    let sended_total_NIM = Nimiq.Policy.satoshisToCoins(sended_total)
    let received_total_NIM = Nimiq.Policy.satoshisToCoins(received_total)

    document.getElementById('sended_total').innerHTML = `${sended_total_NIM} NIM`
    document.getElementById('received_total').innerHTML = `${received_total_NIM} NIM`

    console.log(`Sended Total: ${sended_total_NIM}  Received Total: ${received_total_NIM}`)

    alreadyChecking = false


    function find_duplicate_in_array(arra1) {
        var object = {};
        var result = [];

        arra1.forEach(function(item) {
            if (!object[item])
                object[item] = 0;
            object[item] += 1;
        })

        for (var prop in object) {
            if (object[prop] >= 2) {
                result.push(prop);
            }
        }

        return result;

    }


}
