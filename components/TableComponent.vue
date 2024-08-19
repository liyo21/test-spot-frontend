<template>
  <div>
    <b-table
      :items="formattedItems"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      responsive="lg"
      :tbody-td-class="w-50"
    >
      <template v-slot:cell(actions)="data">
        <b-button
          variant="primary"
          @click="handleAction1(data.item.code)"
        >
          <BIconArrowUpRightSquare />
        </b-button>
        <b-button
          variant="danger"
          @click="handleAction2(data.item.code)"
        >
          <BIconTrashFill />
        </b-button>
      </template>
    </b-table>
  </div>
</template>
<script>
import { BIconArrowUpRightSquare, BIconTrashFill } from 'bootstrap-vue';
import { mapState, mapActions } from "vuex";
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      sortBy: 'id',
      sortDesc: false,
      fields: [
        { key: 'id', sortable: true },
        { key: 'code', sortable: true },
        { key: 'original_url', sortable: true, tdClass: 'maxThWith' },
        { key: 'actions', sortable: false }
      ],
      items: [ ]
    }
  },
  computed: {
    ...mapState('UrlStore', {
      urls: state => state.urls
    }),
    formattedItems() {
      return this.urls.map(item => ({
        ...item,
        code: item.shortened_url
      }));
    }
  },
  watch: {
    urls: {
      immediate: true,
      handler(newUrls) {
        this.items = newUrls
      }
    }
  },
  methods: {
    ...mapActions('UrlStore', [
      'getUrl',
      'goToUrl',
      'deleteUrl'
    ]),
    async handleAction1(item) {
      await this.$store.dispatch('UrlStore/goToUrl', item).then(response => {
        if (response.status === 'OK') {
          const { original_url:url } = response.response
          Swal.fire({
            title: 'You will be redirect to',
            text: url,
            type: "success",
            confirmButtonText: 'Ok',
            showCancelButton: true,
          }).then((result) => {
            if (result.value) {
              this.$router.push(`/redirect/${item}`);
            }
          });
        } else {
          Swal.fire({
            title: 'Oops...',
            text: error,
            type: "success",
            confirmButtonText: 'Go back'
          })
        }
      }, error => {
        Swal.fire({
          title: 'Oops...',
          text: error,
          type: "success",
          confirmButtonText: 'Go back'
        })
      });
    },
    async handleAction2(item) {
      const swalWithBootstrapButtons = Swal.mixin({})
      await swalWithBootstrapButtons.fire({
        title: 'Are you sure, you want to delete it?',
        text: "You won't be able to revert this!",
        type: "question",
        confirmButtonColor: '#d33',
        confirmButtonText: 'Delete',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your url has been deleted.",
            type: "success"
          });
          this.deleteUrl(item);
        }
      });
      await this.getUrl()
    },
  },
  components: { BIconArrowUpRightSquare, BIconTrashFill },
  async mounted() {
    await this.getUrl()
  },
}
</script>

<style>
  .maxThWith {
    max-width: 200px
  }
</style>
