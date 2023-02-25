<template>
  <div class="order" ref="order" :class="{ show }">
    <div class="order-title">
      <div class="close-button" @click="setShowOrder(false)">
        <i class="uil uil-times" style="font-size: 20px;"></i>
      </div>
      <div class="order-title-text">Заказать услугу</div>
    </div>

    <form @submit.prevent ref="form" class="order-form gap">
      <form-input
        label="Как вас зовут?"
        :validation="$v.name"
        :errors="{
          required: 'Введите имя',
        }"
      >
        <input
          type="text"
          name="name"
          v-model="name"
          @input="$v.name.$reset()"
          placeholder="Иван Иванов"
          @blur="$v.name.$touch()"
        >
      </form-input>
      <form-input
        label="E-mail"
        :validation="$v.email"
        :errors="{
          required: 'Введите хотя бы один контакт',
          email: 'Введите почту правильно',
        }"
      >
        <input
          type="text"
          name="email"
          v-model="email"
          @input="$v.email.$reset()"
          placeholder="username@example.com"
          @blur="$v.email.$touch()"
        >
      </form-input>
      <form-input
        label="Телефон"
        :validation="$v.phone"
        :errors="{
          required: 'Введите хотя бы один контакт',
          phone: 'Телефон введён неверно',
        }"
      >
        <input
          type="text"
          name="phone"
          v-model="phone"
          @input="$v.phone.$reset()"
          placeholder="+78001234567"
          @blur="$v.phone.$touch()"
        >
      </form-input>
      <form-input
        label="Что хотите заказать?"
        :validation="$v.service"
        :errors="{
          required: 'Выберите услугу',
        }"
      >
        <chip-group
          name="service"
          :choices="serviceNames"
          :value="service"
          @input="val => { setService(val); $v.service.$reset() }"
        ></chip-group>
      </form-input>
      <form-input
        :validation="$v.description"
        :errors="{
          required: 'Вы забыли описать заказ',
        }"
      >
        <textarea
          v-model="description"
          name="description"
          @input="$v.description.$reset()"
          ref="description"
          placeholder="Опишите заказ"
          rows="7"
          @blur="$v.description.$touch()"
        ></textarea>
      </form-input>
      <form-input
        :validation="$v.personalData"
        :errors="{
          required: 'Вы не дали согласие на обработку персональных данных',
        }"
      >
        <div>
          <input
            type="checkbox"
            name="personal-data"
            id="personal-data"
            v-model="personalData"
            @input="$v.personalData.$reset()"
          >
          <label class="small" for="personal-data">
            Я принимаю
            <a href="/data-processing-consent" target="_blank">
            Согласие на обработку персональных данных</a>
          </label>
        </div>
      </form-input>
      <small>
        Нажимая "Отправить заявку", вы соглашаетесь с
        <a href="/privacy" target="_blank">Политикой конфиденциальности</a>.
        Сайт защищён reCAPTCHA, и на него распространяются
        <a href="https://policies.google.com/privacy">Политика конфиденциальности</a> и
        <a href="https://policies.google.com/terms">Условия использования</a> компании Google.
      </small>
      <recaptcha />
      <div>
        <label v-if="status == 'progress'">Заявка отправляется</label>
        <label v-else-if="status == 'ok'">Заявка отправлена</label>
        <label v-else-if="status == 'error'">Возникла ошибка</label>
        <label v-else-if="captchaError">Похоже, вы &ndash; робот</label>
      </div>
    </form>
    <button
      class="order-submit-button"
      :class="{ disabled: !allFieldsFilled, success: status == 'ok' }"
      @click="() => checkForm() ? submit() : null"
    >
      <template v-if="status == null">Отправить заявку</template>
      <sync-loader v-else-if="status == 'progress'" color="white" :size="'10px'" />
      <i v-else-if="status == 'ok'" class="uil uil-check" style="color: white; font-size: 40px"></i>
      <template v-else-if="status == 'error' || captchaError">Отправить ещё раз</template>
    </button>
  </div>
</template>

<style scoped>
.order {
  --height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;

  position: fixed;
  z-index: 1;
  overscroll-behavior: contain;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(100%);
  margin: 0 auto;
  border-radius: 20px 20px 0 0;
  width: fit-content;
  background: white;

  transition: .3s ease;
}

.order.show {
/*  bottom: 0;*/
  transform: translateY(0);
}

.order-form {
  padding: 20px;
  padding-top: 40px;
  margin: 0;
}

.order-title {
  padding: 10px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background: #eee;
}

.order-title-text {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  font-family: Montserrat;
  font-size: 17px;
}

.close-button {
  --size: 30px;
  background: #d3d3d3;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100vh;
  width: var(--size);
  height: var(--size);
  z-index: 2;
  cursor: pointer;
  transition: .3s;
}

.close-button:hover {
  background: #ccc;
}

.order-submit-button {
  border: none;
  font-size: inherit;
  cursor: pointer;

  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  height: 50px;
  color: white;
  font-family: Montserrat;
  transition: .3s;
}

.order-submit-button.disabled {
  background-color: #eee;
  color: #aaa;
  cursor: default;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.order::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.order {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.gap {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

form {
  max-width: 400px;
  margin: 30px auto;
}

.chip-group {
  margin-top: 15px;
}

input[type="submit"] {
  margin-top: 10px;
}
</style>

<script>
import FormInput from '@/components/FormInput.vue';
import ChipGroup from '@/components/ChipGroup.vue';
import SyncLoader from 'vue-spinner/src/SyncLoader.vue';
import { required, email } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import autosize from 'autosize';
import emailjs from '@emailjs/browser';
import { mapState, mapMutations } from 'vuex';

export default {
  props: ['show', 'services'],
  components: {
    FormInput,
    ChipGroup,
    SyncLoader,
  },
  mixins: [ validationMixin ],
  data() {
    return {      
      name: '',
      email: '',
      phone: '',
      description: '',
      personalData: false,

      status: null,
      captchaError: false,
    };
  },
  head() {
    return {
    };
  },
  validations() {
    return {
      name: {
        required,
      },
      email: {
        required: this.contactRequired,
        email,
      },
      phone: {
        required: this.contactRequired,
        phone: s => (Array.from(s)
          .filter(c => '0123456789'.includes(c))
          .join('').length >= 11) || s.length == 0,
      },
      service: {
        required,
      },
      description: {
        required,
      },
      personalData: {
        required: Boolean,
      },
    };
  },
  computed: {
    result() {
      return {
        name: this.name,
        email: this.email,
        phone: this.phone,
        service: this.serviceDict[this.service].title,
        description: this.description,
      };
    },
    allFieldsFilled() {
      const [name, email, phone, description] =
        [this.name, this.email, this.phone, this.description]
        .map(str => Boolean(str.trim()));

      return name && (email || phone) && description && this.personalData;
    },
    ...mapState(['showOrder', 'title', 'service']),
    serviceDict() {
      const serviceDict = {};
      this.services.forEach(
        service => serviceDict[service.name] = service
      );
      return serviceDict;
    },
    serviceNames() {
      const names = {};
      this.services.forEach(
        service => names[service.name] = service.title
      );
      return names;
    },
    serviceOrderTexts() {
      const texts = {};
      this.services.forEach(
        service => texts[service.name] = service.orderText
      );
      return texts;
    },
  },
  methods: {
    ...mapMutations(['setTitle', 'setShowOrder', 'setService']),
    contactRequired() {
      const contacts = ['email', 'phone'];
      return contacts
        .map(contact => this[contact])
        .some(val => val.trim().length > 0);
    },
    checkForm() {
      this.$v.$touch();
      return !this.$v.$error;
    },
    async submit() {
      this.status = 'progress';

      let token;
      try {
        token = await this.$recaptcha.getResponse();
      } catch (error) {
        this.status = 'captchaError'
        return;
      }

      emailjs.send(
        'service_d6rru8u',
        'new_order',
        Object.assign(this.result, {
          'g-recaptcha-response': token,
        }),
        'pyLNfNQ1M9PwAfvVF'
      ).then(
        () => this.status = 'ok',
        () => this.status = 'error',
      );
    },
  },
  watch: {
    service(service) {
      if (this.$route.path != '/')
        return;

      if (service) {
        history.replaceState({}, null, '/order/' + service);
        this.setTitle('Заказать ' + this.serviceDict[this.service].orderText);
      } else if (this.showOrder) {
        this.setTitle('Заказ');
        if (this.$route.path != '/order')
          history.replaceState({}, null, '/order');
      }
    },
    showOrder(showOrder) {
      if (!this.service || !showOrder)
        this.setTitle(showOrder ? 'Заказ' : null);

      if (!showOrder && this.$route.path == '/') {
        this.setService(null);
        history.replaceState({}, null, '/');
      }
    },
  },
  mounted() {
    const menubar = document.getElementById('menubar');

    if (this.$route.path.includes('order'))
      this.setShowOrder(true);

    if (!this.service)
      this.setService(this.$route.path.split('/').filter(Boolean)[1]);

    this.$refs.order.style.setProperty('--menubar-height', menubar.offsetHeight + 'px');

    autosize(this.$refs.description);

    document.addEventListener('keydown', event => {
      if (event.key == 'Escape') {
        this.setShowOrder(false);
      }
    })
  },
};
</script>
