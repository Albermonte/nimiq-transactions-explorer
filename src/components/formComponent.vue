<template>
  <div class="container">
    <div class="holder">
      <form @submit.prevent="checkForm">
        <div class="field">
          <label class="label">From Address:</label>
          <div v-bind:class="{control: true, 'is-loading': isLoading}">
            <input class="input" name="from_address" type="text" placeholder="Enter a Nimiq Address..."  v-model="from_address" v-validate="'required|address'">
                <span v-if="errors.has('from_address')"> {{ errors.first('from_address') }} </span>
          </div>
        </div>    
        <div class="field">
          <label class="label">To Address:</label>
          <div v-bind:class="{control: true, 'is-loading': isLoading}">
            <input class="input" name="to_address" type="text" placeholder="Enter a Nimiq Address..."  v-model="to_address" v-validate="'required|address'">
                <span v-if="errors.has('to_address')"> {{ errors.first('to_address') }} </span>
          </div>
        </div>
        <div class="control">
          <button class="button is-primary" :disabled="isLoading">Submit</button>
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
      to_address: "",
      isLoading: false
    };
  },
  methods: {
    checkForm() {
       this.$validator.validateAll().then((result) => {
          if (result) { 
            this.$emit("formIsOk", this.from_address, this.to_address);
            this.isLoading = true
          } else {
            console.log('Not valid');
          }
        })
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
