<template>
  <b-card title="Create new URL" class="my-5">
    <FormComponent></FormComponent>
    <div class="my-5"></div>
    <TableComponent></TableComponent>
  </b-card>

</template>

<script>
import FormComponent from "@/components/FormComponent.vue";
import TableComponent from "@/components/TableComponent.vue";
  export default {
    layout: 'custom',
    name: 'IndexPage',
    components: {
      FormComponent,
      TableComponent,
    }
  }
</script>
