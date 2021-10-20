<template>
  <div>
    <banner />
    <div class="d-ps-relative d-stack16">
      <header-component />
      <div class="d-d-grid d-gl-docsite-toc d-p16 md:d-d-block md:d-mt64">
        <nav-component />
        <main id="content" class="d-ga-content d-stack64 d-ps-relative d-mb32">
          <div class="d-stack64">
            <Nuxt />
          </div>
        </main>
        <TableOfContents />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header'
import NavComponent from '@/components/Nav'
import Banner from '@/components/Banner'
import TableOfContents from '@/components/TableOfContents'

export default {
  name: 'DefaultLayout',
  components: {
    Banner,
    HeaderComponent,
    NavComponent,
    TableOfContents
  },
}
</script>
