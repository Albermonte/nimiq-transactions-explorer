<template>
  <div class="container">
    <div class="holder">
      <form @submit.prevent="checkForm">
        <input name="address" type="text" placeholder="Enter a Nimiq Address..."  v-model="skill" v-validate="'address'">
        <span v-if="errors.has('address')"> {{ errors.first('address') }} </span>
      </form>

      <ul>
        <li v-for="(data, index) in skills" :key='index'>{{data.skill}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "formComponent",
  data() {
    return {
      skills: [{ skill: "Vue.js" }, { skill: "Frontend Developer" }],
      skill: ""
    };
  },
  methods: {
    checkForm() {
      if(this.errors.has('address')) return
      this.skills.push({ skill: this.skill });
      this.skill = "";
      this.$emit("formIsOk");
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

input {
  width: calc(100% - 40px);
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  background-color: #323333;
  color: #687f7f;
}
</style>
