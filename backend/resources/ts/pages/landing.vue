<script setup lang="ts">
import 'aos/dist/aos.css'
import { onMounted } from 'vue'
import AOS from 'aos'
import Appbar from '@/views/landingpage/AppBarMenu.vue'
import HomeBanner from '@/views/landingpage/HomeBanner.vue'
import Demos from '@/views/landingpage/DemoSection.vue'
import Footer from '@/views/landingpage/FooterSection.vue'
import ElementBlock from '@/views/landingpage/ElementBlock.vue'
import Technology from '@/views/landingpage/TechnologySection.vue'
import Marquee from '@/views/landingpage/MarqueeSection.vue'
import DownloadSection from '@/views/landingpage/DownloadSection.vue'
import PartnerSection from '@/views/landingpage/PartnerSection.vue'
import NewsLetter from '@/views/landingpage/NewsLetter.vue'
import FigmaSection from '@/views/landingpage/FigmaSection.vue'

onMounted(() => {
  AOS.init()
})

definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: true,
  },
})
</script>

<template>
  <VLayout class="bg-containerBg">
    <Appbar />
    <VMain class="ma-0">
      <HomeBanner />
      <Technology />
      <Demos />
      <FigmaSection />
      <ElementBlock />
      <DownloadSection />
      <Marquee />
      <PartnerSection />
      <NewsLetter />
      <Footer />
    </VMain>
  </VLayout>
</template>
