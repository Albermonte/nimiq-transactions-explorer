<template>
  <section class="is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column">
          <div class="box">
            <form @submit.prevent="checkForm">
              <div class="field">
                <div class="control">
                  <label class="label">From Address:</label>
                  <div v-bind:class="{control: true, 'is-loading': isLoading}">
                    <input
                      class="input is-large"
                      name="from_address"
                      type="text"
                      placeholder="Enter a Nimiq Address..."
                      v-model="from_address"
                      v-validate="'required|address'"
                      autofocus
                    >
                    <span v-if="errors.has('from_address')">{{ errors.first('from_address') }}</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label class="label">To Address:</label>
                  <div v-bind:class="{control: true, 'is-loading': isLoading}">
                    <input
                      class="input is-large"
                      name="to_address"
                      type="text"
                      placeholder="Enter a Nimiq Address..."
                      v-model="to_address"
                      v-validate="'required|address'"
                      autofocus
                    >
                    <span v-if="errors.has('to_address')">{{ errors.first('to_address') }}</span>
                  </div>
                </div>
              </div>
              <progress v-if="progress>0" class="progress is-primary" v-bind:value="progress" max="100">0%</progress>
              <div class="control">
                <button
                  class="button is-block is-info is-large is-fullwidth"
                  :disabled="isLoading"
                >Check it out!</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "formComponent",
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    if (
      this.$route.params.from_address != null &&
      this.$route.params.to_address != null
    ) {
      this.from_address = this.$route.params.from_address;
      this.to_address = this.$route.params.to_address;
      this.isLoading = true;
    }
  },
  data() {
    return {
      from_address: "",
      to_address: "",
      isLoading: false
    };
  },
  methods: {
    checkForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit("formIsOk", this.from_address, this.to_address);
          this.isLoading = true;
        } else {
          console.log("Not valid");
        }
      });
    }
  }
};
</script>

<style scoped>
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}

input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
.button.is-info {
  background-color: #21bca5;
}
.button.is-info:hover {
  background-color: rgb(26, 180, 157);
}
</style>
