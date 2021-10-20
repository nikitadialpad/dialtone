<template>
  <nav v-if="sections.length" class="d-ga-sidebar md:d-d-none d-ps-fixed" role="navigation">
    <div
      class="d-of-y-scroll d-zi-navigation d-ps-fixed d-b0 d-pt64 d-w216 d-pb48 js-navigation-sidebar"
      :style="{ top: '65px' }"
    >
      <template v-for="(section, i) in sections">
        <template v-if="section.pages">
          <ul :key="`${i}-nav`" class="d-ls-reset d-px16 d-stack4">
            <li v-for="item in section.pages" :key="item.url">
              <a :class="[
                  'd-link',
                  'd-td-none',
                  'd-d-block',
                  'd-px8',
                  'd-py4',
                  'd-fs14',
                  'd-lh6',
                  'd-bar4',
                  {
                    'd-bgc-purple-100 d-bgo50': isActive(item)
                  }
                ]"
                 :href="item.url"
              >{{ item.title }}</a>
            </li>
          </ul>
        </template>
        <template v-else-if="section.subsections">
          <ul :key="`${i}-nav`" class="d-ls-reset d-px16 d-stack32">
            <li v-for="subsection in section.subsections" :key="subsection.url">
              <div class="d-d-block d-px8 d-py2 d-mb4 d-fs14 d-lh6 d-fc-black-600 d-fw-bold">{{ subsection.title }}</div>
              <ul v-if="subsection.pages" class="d-ls-reset d-stack4">
                <li v-for="link in subsection.pages" :key="link">
                  <a :class="[
                  'd-link',
                  'd-td-none',
                  'd-d-block',
                  'd-px8',
                  'd-py4',
                  'd-fs14',
                  'd-lh6',
                  'd-bar4',
                  {
                    'd-bgc-purple-100 d-bgo50': isActive(link)
                  }
                ]"
                     :href="link.url"
                  >{{ link.title }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </template>
      </template>
    </div>
  </nav>
</template>

<script>
import { sections } from '~/docs/_data/site-nav.json'

export default {
  name: 'Nav',
  data() {
    return {
      sections: [],
    }
  },
  watch: {
    "$route.path": {
      handler() {
        const slug = this.$route.path.split('/').filter(v => v)[0] || ''
        this.sections = slug === '' ? [] : sections.filter(({ url }) => url.includes(slug))
      },
      immediate: true
    }
  },

  methods: {
    isActive({ url }) {
      const formattedUrl = url.split('/').filter(v => v.trim()).join('-')
      const formattedPath = this.$route.path.split('/').filter(v => v.trim()).join('-')

      return formattedUrl === formattedPath
    }
  }
}
</script>
