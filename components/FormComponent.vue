<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Type the url:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="url"
          type="text"
          placeholder="https://www.google.com"
          required
          @input="validateUrl"
        ></b-form-input>
        <small v-if="!isValidUrl && url.length > 5" class="text-danger">{{ errorMessage }}</small>
      </b-form-group>
      <b-button type="submit" variant="primary" :disabled="!isValidUrl">Create</b-button>
    </b-form>
  </div>
</template>
<script>

import { mapState, mapActions } from "vuex";
import Swal from 'sweetalert2'

export default {
  name: 'FormComponent',
  data() {
    return {
      url: '',
      isValidUrl: false,
      errorMessage: ''
    }
  },
  methods: {
    ...mapActions('UrlStore', [
      'getUrl',
      'createUrl'
    ]),
    validateUrl(url) {
      if (url.length > 5) {
        const regex = /^(http|https):\/\/\w+\.\w+(:\d+)?(\/[\w-]+)*\/?$/;
        this.isValidUrl = (url || '').trim().match(regex) !== null;
        this.errorMessage = 'Please, type a valid url'
      }
    },
    async onSubmit() {
      const payload = {
        url: this.url
      }
      await this.createUrl(payload).then(response => {
        if (response.status === 'OK') {
          Swal.fire({
            title: 'Congrats',
            text: response.message,
            type: "success",
            confirmButtonText: 'Ok'
          })
          this.url = ''
        }
      }, error => {
        Swal.fire({
          title: 'Oops...',
          text: error,
          type: "success",
          confirmButtonText: 'Ok'
        })
      });
      await this.getUrl()
    }
  },
}
</script>
