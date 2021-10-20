<template>
  <ul>
    <li
      v-for="article of articles"
      :key="article.slug"
      class="xs:w-full md:w-1/2 px-2 xs:mb-6 md:mb-12 article-card"
    >
      <NuxtLink
        :to="{ name: 'getting-started-slug', params: { slug: article.slug } }"
        class="flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md xxlmax:flex-col"
      > {{ article.slug }} </NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const articles = await $content('getting-started').fetch()

    return { articles }
  }
}
</script>
