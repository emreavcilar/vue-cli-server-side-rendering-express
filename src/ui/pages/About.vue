<template>
  <section>
    <h2>About</h2>
    <div v-if="about">
      <div
        v-for="(value,property,index) in about"
        :key="index"
      >
        <span>{{ property.replace('_',' ').toUpperCase() }}</span>
        <span>: </span>
        <span>{{ value }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { GET_ABOUT_DATA } from '@/store/actionTypes'
import aboutModule from '@/store/modules/about'
import { registerStoreModule } from '@/utils/helpers'

export default {
  name: 'About',
  metaInfo: {
    title: 'App',
    titleTemplate: '%s | About',
    meta: [
      {
        name: 'description',
        content: 'About page description'
      },
      {
        property: 'og:title',
        content: 'About',
        template: '%s - About page',
        vmid: 'og:title'
      }
    ]
  },
  computed: {
    ...mapState({
      about: state => state.about.aboutData
    }),
    ...mapActions({
    })
  },
  async asyncData ({ store }) {
    // server
    registerStoreModule({ module: aboutModule, moduleName: 'about', store })
    await store.dispatch(GET_ABOUT_DATA)
  },
  beforeCreate () {
    // client
    registerStoreModule({ module: aboutModule, moduleName: 'about', store: this.$store })
  }
}
</script>

<style>

</style>
