<template>
  <div
    id="app"
    data-server-rendered="true"
    class="app"
  >
    <header-component />

    <router-view class="view" />
  </div>
</template>
<script>

import HeaderComponent from '@/ui/layout/common/HeaderComponent'
export default {
  name: 'App',
  components: { HeaderComponent }
}
</script>

<style>

</style>
