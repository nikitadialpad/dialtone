<template>
  <aside class="d-banner d-banner--info d-ps-relative js-dialtone5-banner" role="alert" aria-hidden="false">
    <div class="d-banner__dialog d-w-unset" role="alertdialog" aria-labelledy="info-alert-title" aria-describedby="info-alert-desc">
      <div class="d-notice__icon">
        <IconInfo />
      </div>
      <div class="d-notice__content">
        <h1 id="info-alert-title" class="d-notice__title">Dialtone 6.0 is here!</h1>
        <p id="info-alert-desc" class="d-notice__message">
          Looking for Dialtone 5 documentation?
          <a href="//version5.dialpad.design" class="d-link" target="_blank">Find it here.</a>
        </p>
      </div>
    </div>
  </aside>
</template>

<script>
import IconInfo from '@dialpad/dialtone/lib/dist/vue/icons/IconInfo.vue'

export default {
  name: 'Banner',
  components: {
    IconInfo
  }
}
</script>
