<template>
  <div class="columns">
    <div class="column">
      <formComponent v-on:formIsOk="set_form_to_OK" v-if="!formOK" :progress="progress" />
      <a
        v-if="formOK"
        v-bind:class="{button:true, 'is-active': isSendedActive}"
        v-on:click="isSendedActive = true"
      >Sended Total: {{sended_total_NIM}} NIM</a>
      <a
        v-if="formOK"
        v-bind:class="{button:true, 'is-active': !isSendedActive}"
        v-on:click="isSendedActive = false"
      >Received Total: {{received_total_NIM}} NIM</a>
      <sendedComponent
        v-if="formOK && isSendedActive"
        v-for="(tx, index) in sended_array"
        :tx="tx"
        :key="index"
      />
      <receivedComponent
        v-if="formOK && !isSendedActive"
        v-for="(tx, index) in received_array"
        :tx="tx"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import sendedComponent from "@/components/sendedComponent.vue";
import receivedComponent from "@/components/receivedComponent.vue";
import formComponent from "@/components/formComponent.vue";

export default {
  name: "home",
  components: {
    sendedComponent,
    receivedComponent,
    formComponent
  },
  data() {
    return {
      formOK: false,
      alreadyChecking: false,
      isSendedActive: true,
      sended_total_NIM: 0,
      received_total_NIM: 0,
      progress: 0,
      sended_array: [],
      received_array: []
    };
  },
  mounted() {
    if (
      this.$route.params.from_address != null &&
      this.$route.params.to_address != null
    ) {
      this.check_transactions(
        this.$route.params.from_address,
        this.$route.params.to_address
      );
    }
  },
  methods: {
    set_form_to_OK(from_address, to_address) {
      this.$router.push(`/from/${from_address}/to/${to_address}`);
      this.check_transactions(from_address, to_address);
    },
    async check_transactions(from_address, to_address) {
      if (this.alreadyChecking) return;
      this.alreadyChecking = true;
      const cors_api = "https://cors.io/?";
      const api_key = "?api_key=c708fd4fe23e15d9e8aaae3e79d5b6b2";
      let check_address = "";
      let receiver_address = "";
      let changed = false;
      let total_PAGES = 0;

      let from_address_info = await fetch(
        `${cors_api}https://api.nimiqx.com/account/${from_address}/${api_key}`
      );
      from_address_info = await from_address_info.json();
      let from_PAGES = Math.ceil(from_address_info.transactions / 100);
      console.log(`Page Size: ${from_PAGES}`);

      let to_address_info = await fetch(
        `${cors_api}https://api.nimiqx.com/account/${to_address}/${api_key}`
      );
      to_address_info = await to_address_info.json();
      let to_PAGES = Math.ceil(to_address_info.transactions / 100);
      console.log(`Page Size: ${to_PAGES}`);

      if (from_PAGES <= to_PAGES) {
        check_address = from_address;
        receiver_address = to_address;
        total_PAGES = from_PAGES;
      } else {
        check_address = to_address;
        receiver_address = from_address;
        changed = true;
        total_PAGES = to_PAGES;
      }

      let tx_array = await fetch(
        `${cors_api}https://api.nimiqx.com/account-transactions/${check_address}/100/0/${api_key}`
      );
      tx_array = await tx_array.json();
      let stop = false;
      let i = 100;

      while (!stop) {
        let tx_array_temp = await fetch(
          `${cors_api}https://api.nimiqx.com/account-transactions/${check_address}/100/${i}/${api_key}`
        );
        tx_array_temp = await tx_array_temp.json();
        tx_array = tx_array.concat(tx_array_temp);
        console.log(`Page: ${i / 100}`);
        i += 100;
        this.progress = (i / 100 / (total_PAGES - 1)) * 100; // Next page / Total pages * 100%
        if (tx_array_temp.length < 100) stop = true;
      }

      this.sended_array = tx_array.filter(
        element => element.to_address == receiver_address
      );
      this.sended_array = this.sended_array.filter(
        element => element.from_address == check_address
      );
      this.received_array = tx_array.filter(
        element => element.from_address == receiver_address
      );
      this.received_array = this.received_array.filter(
        element => element.to_address == check_address
      );

      console.log("tx_array: ", tx_array);

      let hash_array = [];
      for (let i = 0; i < this.received_array.length; i++) {
        hash_array.push(this.received_array[i].hash);
      }

      console.log("Duplicates: ", find_duplicate_in_array(hash_array));

      let sended_total = 0;
      let received_total = 0;

      this.sended_array.forEach(element => {
        sended_total += element.value;
      });
      this.received_array.forEach(element => {
        received_total += element.value;
      });

      this.sended_total_NIM = Nimiq.Policy.satoshisToCoins(sended_total);
      this.received_total_NIM = Nimiq.Policy.satoshisToCoins(received_total);

      if (changed) {
        let temp_arr = [];
        let temp_Nim = 0;
        temp_arr = this.sended_array;
        this.sended_array = this.received_array;
        this.received_array = temp_arr;
        temp_Nim = this.sended_total_NIM;
        this.sended_total_NIM = this.received_total_NIM;
        this.received_total_NIM = temp_Nim;
      }
      console.log(
        `Sended Total: ${this.sended_total_NIM}  Received Total: ${
          this.received_total_NIM
        }`
      );

      this.formOK = true;
      this.alreadyChecking = false;

      function find_duplicate_in_array(arra1) {
        var object = {};
        var result = [];

        arra1.forEach(function(item) {
          if (!object[item]) object[item] = 0;
          object[item] += 1;
        });

        for (var prop in object) {
          if (object[prop] >= 2) {
            result.push(prop);
          }
        }

        return result;
      }
    }
  }
};
</script>

<style scoped>
.columns {
  margin-top: 0.75rem;
}
</style>
