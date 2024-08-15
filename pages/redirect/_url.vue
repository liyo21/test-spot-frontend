<template>
  <div v-if="loading" class="loading-page">
    <p>You are going to be redirect, please wait...</p>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  layout: 'custom',
  name: 'RedirectPage',
  loading: {
    color: 'blue',
    height: '15px'
  },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.redirecTo(this.$route.params.url)
    }, 3000);
  },
  methods: {
    ...mapActions('UrlStore', [
      'getUrl',
      'goToUrl',
      'deleteUrl'
    ]),
    async redirecTo(url) {
      await this.$store.dispatch('UrlStore/goToUrl', url).then(response => {
        if (response.status === 'OK') {
          const { original_url:url } = response.response
          window.location.href = url
        } else {
          this.$router.push('/');
        }
      })
    }
  },
}
</script>

