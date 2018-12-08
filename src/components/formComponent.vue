<template>
  <div class="container">
    <div class="holder">
      <form @submit.prevent="checkForm">
        <div class="field">
          <label class="label">From Address:</label>
          <div class="control">
            <input class="input" name="from_address" type="text" placeholder="Enter a Nimiq Address..."  v-model="from_address" v-validate="'address'">
                <span v-if="errors.has('from_address')"> {{ errors.first('from_address') }} </span>
          </div>
        </div>    
        <div class="field">
          <label class="label">To Address:</label>
          <div class="control">
            <input class="input" name="to_address" type="text" placeholder="Enter a Nimiq Address..."  v-model="to_address" v-validate="'address'">
                <span v-if="errors.has('to_address')"> {{ errors.first('to_address') }} </span>
          </div>
        </div>
        <div class="control">
          <button class="button is-primary" :disabled='this.errors.has("address")'>Submit</button>
        </div>     
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "formComponent",
  data() {
    return {
      from_address: "",
      to_address: ""
    };
  },
  methods: {
    checkForm() {
      if (this.errors.has("address")) return;
      this.$emit("formIsOk", this.from_address, this.to_address);
      this.from_address = ""
      this.to_address = ""
    }
  }
};
</script>

<style scoped>
.holder {
  background: #fff;
  margin: 5px 10px 25px 10px;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul li {
  padding: 20px;
  font-size: 1.3em;
  background-color: #e0edf4;
  border-left: 5px solid #3eb3f6;
  margin-bottom: 2px;
  color: #3e5252;
}

p {
  text-align: center;
  padding: 30px 0;
  color: gray;
}

.container {
  box-shadow: 0px 0px 40px lightgray;
}
</style>
