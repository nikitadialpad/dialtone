<template>
    <aside v-if="hasShowToc" class="d-ga-toc d-t64 d-b0 d-r0 d-pt24">
      <div class="d-ps-sticky d-t96 js-navigation-toc">
        <h4
          class="d-mb8 d-py2 d-px8 d-fw-bold d-fs14 d-lh6 d-fc-black-600"
        >
          On this Page
        </h4>
        <nav class="toc">
          <ol>
            <li
              v-for="link of article.toc"
              :key="link.id"
              :class="{
                'd-pl16': link.depth === 3,
              }"
              @click="tableOfContentsHeadingClick(link)"
            >
              <a
                :class="{
                  'active': link.id === currentlyActiveToc,
                }"
                role="button"
                :href="`#${link.id}`"
              >{{ link.text }}</a
              >
            </li>
          </ol>
        </nav>
      </div>
    </aside>
</template>

<script>
export default {
  data() {
    return {
      hasShowToc: false,
      article: {
        toc: []
      },
      currentlyActiveToc: "",
      observer: null,
      observerOptions: {
        root: this.$refs.nuxtContent,
        threshold: 0,
      },
    };
  },
  async fetch() {
    await this.setArticles()
  },

  watch: {
    '$route.path': {
      async handler() {
        await this.setArticles()
        this.initObserver()
      },
    }
  },

  mounted() {
    this.initObserver()
  },

  beforeDestroy() {
    this.destroyObserver()
  },

  methods: {
    destroyObserver() {
      this.observer.disconnect();
      this.observer = null;
    },
    async setArticles() {
      const slug = this.$route.params.slug
      this.hasShowToc = !!slug
      if(!slug) return
      const contentName = this.$route.name.replace('-slug', '')
      this.article = await this.$content(contentName, slug).fetch()
      this.hasShowToc = this.article.toc.length
    },
    initObserver() {
      if(this.observer) this.destroyObserver()

      this.observer = new IntersectionObserver(entries => {
        entries.reverse().forEach(entry => {
          const id = entry.target.getAttribute('id');
          if (entry.isIntersecting) {
            this.currentlyActiveToc = id;
          }
        });
      }, this.observerOptions);

      // Track all sections that have an `id` applied
      document.querySelectorAll('.nuxt-content h2[id], .nuxt-content h3[id]').forEach((section) => {
        this.observer.observe(section);
      });
    },
    tableOfContentsHeadingClick(link) {
      this.currentlyActiveToc = link.id;
    },
  }
};
</script>

<style lang='less'>
.toc {
  ol {
    list-style: none!important;
    margin: 0;
    padding: 0;
  }
  a {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    margin: var(--su0);
    padding: var(--su2) var(--su8);
    border: 0;
    border-radius: var(--br4);
    background-color: transparent;
    color: var(--primary-color);
    color: var(--muted-color);
    font: inherit;
    font-size: var(--fs14);
    line-height: var(--lh6);
    text-decoration: none;
    transition: all var(--td25) var(--ttf-in-out);
    appearance: none;
    fill: currentColor;

    &.active {
      color: var(--primary-color);
      font-weight: var(--fw-bold);
      &::before {
        content: "";
        position: absolute;
        top: var(--su0);
        bottom: var(--su0);
        left: var(--sun4);
        width: var(--su4);
        border-radius: var(--br4);
        background-color: var(--primary-color);
      }
    }
  }
}
</style>
