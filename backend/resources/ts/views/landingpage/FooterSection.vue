<script setup lang="ts">
import { shallowRef } from 'vue'
import Logo from './LogoMain.vue'

const list1 = shallowRef([
  {
    name: 'Profile',
    link: 'https://themeforest.net/user/phoenixcoded',
  },
  {
    name: 'Portfolio',
    link: 'https://themeforest.net/user/phoenixcoded/portfolio',
  },
  {
    name: 'Follow Us',
    link: 'https://themeforest.net/user/phoenixcoded/followers',
  },
  {
    name: 'Website',
    link: 'https://phoenixcoded.net/',
  },
])

const list2 = shallowRef([
  {
    name: 'Documentation',
    link: 'https://phoenixcoded.gitbook.io/able-pro',
  },
  {
    name: 'Feature Request',
    link: 'https://phoenixcoded.authordesk.app/',
  },
  {
    name: 'RoadMap',
    link: 'https://phoenixcoded.gitbook.io/able-pro/v/vue-laravel/roadmap/',
  },
  {
    name: 'Support',
    link: 'https://phoenixcoded.authordesk.app/',
  },
  {
    name: 'Email Us',
    link: 'https://themeforest.net/user/phoenixcoded#contact',
  },
])

const list3 = shallowRef([
  {
    name: 'Tailwind',
    link: 'https://1.envato.market/XmNK1X',
  },
  {
    name: 'React',
    link: 'https://1.envato.market/OrJ5nn',
  },
  {
    name: 'Vue',
    link: 'https://1.envato.market/B0JAPW',
  },
  {
    name: 'Angular',
    link: 'https://1.envato.market/XYAZnb',
  },
  {
    name: 'Next Js',
    link: 'https://1.envato.market/jrEAbP',
  },
  {
    name: 'Bootstrap 5',
    link: 'https://1.envato.market/baeyGk',
  },
])

const list4 = shallowRef([
  {
    name: 'Support Policy',
    link: 'https://themeforest.net/page/item_support_policy',
  },
  {
    name: 'Licenses Term',
    link: 'https://themeforest.net/licenses/standard',
  },
])
</script>

<template>
  <VFooter class="bg-gray100 py-md-16 py-8 flex-column position-relative">
    <VRow>
      <VCol cols="12">
        <VContainer>
          <VRow>
            <VCol
              lg="4"
              cols="12"
            >
              <div class="contactDetails pr-lg-6">
                <Logo />
                <p class="mt-4 text-h6">
                  Phoenixcoded has gained the trust of over 5.5K+ customers since 2015, thanks to our commitment to delivering high-quality
                  products. Our experienced team players are responsible for managing Able Pro.
                </p>
              </div>
            </VCol>
            <VCol
              lg="2"
              md="3"
              cols="6"
            >
              <h5 class="text-h5 mb-md-6 mb-4">
                Company
              </h5>
              <div class="d-flex flex-column footer-list">
                <a
                  v-for="(list, i) in list1"
                  :key="i"
                  :href="list.link"
                  class="text-h6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ list.name }}
                </a>
              </div>
            </VCol>
            <VCol
              lg="2"
              md="3"
              cols="6"
            >
              <h5 class="text-h5 mb-md-6 mb-4">
                Help & Support
              </h5>
              <div class="d-flex flex-column footer-list">
                <a
                  v-for="(list, i) in list2"
                  :key="i"
                  :href="list.link"
                  class="text-h6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ list.name }}
                </a>
              </div>
            </VCol>
            <VCol
              lg="2"
              md="3"
              cols="6"
            >
              <h5 class="text-h5 mb-md-6 mb-4">
                More products
              </h5>
              <div class="d-flex flex-column footer-list">
                <a
                  v-for="(list, i) in list3"
                  :key="i"
                  :href="list.link"
                  class="text-h6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ list.name }}
                </a>
              </div>
            </VCol>
            <VCol
              lg="2"
              md="3"
              cols="6"
            >
              <h5 class="text-h5 mb-md-6 mb-4">
                Useful Resources
              </h5>
              <div class="d-flex flex-column footer-list">
                <a
                  v-for="(list, i) in list4"
                  :key="i"
                  :href="list.link"
                  class="text-h6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ list.name }}
                </a>
              </div>
            </VCol>
          </VRow>
        </VContainer>
      </VCol>
    </VRow>
  </VFooter>
  <VDivider />
  <div class="sub-footer text-surface bg-gray100 py-4">
    <VContainer class="py-0">
      <VRow class="align-center">
        <VCol sm="6">
          <h6 class="text-h6 text-lightText mb-0">
            © Handcrafted by Team
            <a
              href="https://themeforest.net/user/phoenixcoded"
              class="text-primary text-decoration-none"
            >Phoenixcoded</a>
          </h6>
        </VCol>
        <VCol
          sm="6"
          class="text-right"
        >
        <ul class="d-flex justify-end">
            <li>
              <VBtn
                icon
                variant="plain"
                size="small"
                href="https://github.com/phoenixcoded"
                target="_blank"
                aria-label="github"
                color="secondary"
                rel="noopener noreferrer"
              >
                <SvgSprite name="custom-github-outline" />
                <VTooltip activator="parent" aria-label="tooltip" location="top" content-class="smallTooltip">Github</VTooltip>
              </VBtn>
            </li>
            <li>
              <VBtn
                icon
                variant="plain"
                size="small"
                href="https://dribbble.com/Phoenixcoded"
                target="_blank"
                aria-label="dribbble"
                color="secondary"
                rel="noopener noreferrer"
              >
                <SvgSprite name="custom-dribble-fill" />
                <VTooltip activator="parent" aria-label="tooltip" location="top" content-class="smallTooltip">Dribbble</VTooltip>
              </VBtn>
            </li>
            <li>
              <VBtn
                icon
                variant="plain"
                size="small"
                href="https://www.youtube.com/@phoenixcoded"
                target="_blank"
                aria-label="youtube"
                color="secondary"
                rel="noopener noreferrer"
              >
                <SvgSprite name="custom-youtube-fill" />
                <VTooltip activator="parent" aria-label="tooltip" location="top" content-class="smallTooltip">Youtube</VTooltip>
              </VBtn>
            </li>
          </ul>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<style lang="scss">
.footer-list {
  a {
    color: rgb(var(--v-theme-darkText));
    &:hover {
      color: rgb(var(--v-theme-primary));
      text-decoration: none;
    }
    + a {
      margin-top: 20px;
      @media (max-width: 991px) {
        margin-top: 10px;
      }
    }
  }
}
</style>
