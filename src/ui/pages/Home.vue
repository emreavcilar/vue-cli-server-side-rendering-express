<template>
  <section>
    <div v-if="home">
      <h1>{{ home.title }}</h1>
      <p>{{ home.opening_crawl }}</p>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { GET_HOME_DATA } from '@/store/actionTypes'
import homeModule from '@/store/modules/home'
import { registerStoreModule } from '@/utils/helpers'

export default {
  name: 'Home',
  metaInfo: {
    title: 'App',
    titleTemplate: '%s | Home',
    meta: [
      {
        name: 'description',
        content: 'Home page description'
      },
      {
        property: 'og:title',
        content: 'Home',
        template: '%s - Home page',
        vmid: 'og:title'
      }
    ]
  },
  computed: {
    ...mapState({
      home: state => state.home.homeData
    }),
    ...mapActions({
    })
  },
  async asyncData ({ store }) {
    // server
    registerStoreModule({ module: homeModule, moduleName: 'home', store })
    await store.dispatch(GET_HOME_DATA)
  },
  beforeCreate () {
    // client
    registerStoreModule({ module: homeModule, moduleName: 'home', store: this.$store })
  }
}
</script>

<style>

</style>
