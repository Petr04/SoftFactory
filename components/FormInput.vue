<template>
  <div class="form-input" :class="{ wrong: false }">
    <label v-if="label">{{ label }}</label>
    <div class="slot">
      <slot></slot>
    </div>
    <template v-if="validation != undefined && validation.$error">
      <p
        v-for="pair in Object.entries(validation)
          .filter(pair => !pair[1] && (pair[0] in errors))"
        :key="pair[0]"
        class="error"
      >{{ errors[pair[0]] }}</p>
    </template>
  </div>
</template>

<style scoped>
.form-input {
  margin: 0;

  --input-color: #aaa;
}

.form-input.wrong {
  --input-color: var(--red);
}

.form-input > *, .form-input > .slot > input, textarea {
  display: block;
  width: 100%;
}

input[type="text"],
input[type="email"],
input[type="tel"],
textarea {
  font-family: Roboto;
  padding: 10px 20px;
  border: 1px solid var(--input-color);
  border-radius: 10px;
  font-size: 17px;
  outline: none;
  box-sizing: border-box;
}

input[type="text"]::placeholder,
input[type="email"]::placeholder,
input[type="tel"]::placeholder,
textarea::placeholder {
  color: var(--input-color);
  opacity: 1;
}

textarea {
  resize: none;
  padding: 16px 20px;
}

.error {
  margin: 0;
  color: var(--red);
  font-family: Montserrat;
  font-size: 15px;
  margin-top: 5px;
  margin-left: 10px;
}

label {
  margin-bottom: 7px;
}
</style>

<script>
export default {
  props: ['label', 'validation', 'errors'],
};
</script>
