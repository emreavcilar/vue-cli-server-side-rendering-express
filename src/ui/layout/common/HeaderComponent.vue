<template>
  <header>
    <nav>
      <router-link to="/">
        HOME
      </router-link>
      <router-link to="/about">
        ABOUT
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style lang="scss">
  header{
    nav{
      a{
        margin: 0 20px 0 0;
      }
    }
  }
</style>
