<template>
  <section class="d-stack16">
    <nuxt-content class="markdown" :document="gettingStartedArticle" />
  </section>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const gettingStartedArticle = await $content('getting-started', params.slug).fetch()

    return { gettingStartedArticle }
  }
}
</script>
