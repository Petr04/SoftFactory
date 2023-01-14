<template>
  <div id="order" :class="{ show }" ref="order">
    <form @submit.prevent ref="form" class="gap">
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
      <div class="hcontainer" style="flex-wrap: wrap-reverse">
        <button @click="submit" type="submit" class="button main fixed-height" :class="{ success: status == 'ok' }">
          <template v-if="status == null">Отправить заявку</template>
          <sync-loader v-else-if="status == 'progress' || status == 'progressCaptcha'" color="white" :size="'10px'" />
          <unicon v-else-if="status == 'ok'" name="check" fill="white" width="40" height="40" style="margin: -5px" />
          <template v-else-if="status == 'error' || captchaError">Отправить ещё раз</template>
        </button>
        <label v-if="status == 'progressCaptcha'">Проверка каптчи</label>
        <label v-if="status == 'progress'">Заявка отправляется</label>
        <label v-else-if="status == 'ok'">Заявка отправлена</label>
        <label v-else-if="status == 'error'">Возникла ошибка</label>
        <label v-else-if="captchaError">Похоже, вы &ndash; робот</label>
      </div>
    </form>
  </div>
</template>

<style scoped>
#order {
  --height: calc(100vh - var(--menubar-height));
  overflow-y: scroll;
  height: var(--height);
  border-radius: 0 0 20px 20px;
  background: white;
  padding: 0 20px;
  /*padding-top: 30px;*/

  box-shadow: 0px -20px 0px 0 white;

  position: fixed;
  top: calc(var(--height) * -1 - 25px);
  /*left: calc(50% - var(--width) / 2);*/
  left: 0;
  right: 0;

  transition: .3s ease;
}

#order.show {
  top: calc(var(--menubar-height));
  /*top: 0;*/
  /*margin-top: calc(var(--menubar-height));*/
}

/* Hide scrollbar for Chrome, Safari and Opera */
#order::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
#order {
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
import services from '@/services.js';
import { required, email } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import autosize from 'autosize';
import emailjs from '@emailjs/browser';
import { mapState, mapMutations } from 'vuex';

export default {
  props: ['show'],
  components: {
    FormInput,
    ChipGroup,
    SyncLoader,
  },
  mixins: [ validationMixin ],
  data() {
    return {
      serviceList: services,
      
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
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.searchEngineDescription,
        },
      ],
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
        service: this.services[this.service].title,
        description: this.description,
      };
    },
    ...mapState(['showOrder', 'title', 'service']),
    services() {
      const services = {};
      this.serviceList.forEach(
        service => services[service.name] = service
      );
      return services;
    },
    serviceNames() {
      const names = {};
      this.serviceList.forEach(
        service => names[service.name] = service.title
      );
      return names;
    },
    serviceOrderTexts() {
      const texts = {};
      this.serviceList.forEach(
        service => texts[service.name] = service.orderText
      );
      return texts;
    },
    searchEngineDescription() {
      return this.service
        ? this.services[this.service].description
        : null;
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
      try {
        const token = await this.$recaptcha.getResponse();

        this.status = 'progress';

        if (!this.checkForm()) {
          this.error = true;
        } else {
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
          this.$refs.form.$el.submit();
        }
      } catch (error) {
        this.captchaError = true;
      }
    },
  },
  watch: {
    service(service) {
      if (service) {
        history.pushState({}, null, '/order/' + service);
        this.setTitle('Заказать ' + this.services[this.service].orderText);
      } else if (this.showOrder) {
        this.setTitle('Заказ');
        if (this.$route.path != '/order')
          history.pushState({}, null, '/order');
      }
    },
    showOrder(showOrder) {
      this.setTitle(showOrder ? 'Заказ' : null);
      if (!showOrder) history.pushState({}, null, '/');
    },
  },
  mounted() {
    const menubar = document.getElementById('menubar');

    if (this.$route.path.includes('order'))
      this.setShowOrder(true);

    this.$refs.order.style.setProperty('--menubar-height', menubar.offsetHeight + 'px');

    autosize(this.$refs.description);

    if (!this.service)
      this.setService(this.$route.path.split('/').filter(Boolean)[1]);

    document.addEventListener('keydown', event => {
      if (event.key == 'Escape') {
        this.setShowOrder(false);
        history.pushState({}, null, '/');
      }
    })
  },
};
</script>
