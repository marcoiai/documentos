<script setup lang="ts">
import { shallowRef } from 'vue'
import { Vue3Marquee } from 'vue3-marquee'

// assets
import Avatar1 from '@images/users/avatar-6.png'
import Avatar2 from '@images/users/avatar-1.png'
import Avatar3 from '@images/users/avatar-2.png'
import Avatar4 from '@images/users/avatar-3.png'
import Avatar5 from '@images/users/avatar-4.png'
import Avatar6 from '@images/users/avatar-5.png'
import Avatar7 from '@images/users/avatar-7.png'
import Avatar8 from '@images/users/avatar-8.png'

const marqueeArray = shallowRef([
  {
    image: Avatar1,
    text: '“Code quality is amazing. Design is astonishing. very easy to customize .. and any developer can use it with ease.“',
    name: 'shahabblouch',
    designation: 'Code Quality',
  },
  {
    image: Avatar2,
    text: '“I get all what I need for my project from this template so I can focus to back end side. The template looks fantastic and the support is fast. Thank you.“',
    name: 'menhook',
    designation: 'Feature Availability',
  },
  {
    image: Avatar3,
    text: '“Design is very good.“',
    name: 'dimas_ferian',
    designation: 'Design Quality',
  },
  {
    image: Avatar4,
    text: '“Amazing template for fast develop“',
    name: 'devbardbudist',
    designation: 'Customizability',
  },
  {
    image: Avatar5,
    text: '“The author is very nice and solved my problem inmediately“',
    name: 'richitela',
    designation: 'Customer Support',
  },
  {
    image: Avatar6,
    text: '“I love the looks of Able Pro 7.0. I really like the colors you guys have chosen for this theme. It looks really nice.. 💎“',
    name: 'ritelogic',
    designation: 'Other',
  },
  {
    image: Avatar7,
    text: '“The author is very nice and solved my problem inmediately 😍 “',
    name: 'richitela',
    designation: 'Customer Support',
  },
  {
    image: Avatar8,
    text: '“An amazing template, Very good design, good quality code and also very good customer support.“',
    name: 'macugi',
    designation: 'Code Quality',
  },
])
</script>

<template>
  <VContainer
    class="py-0"
    fluid
    style="max-width: 100%"
  >
    <VRow class="justify-center">
      <VCol
        lg="6"
        md="8"
        cols="12"
      >
        <div class="text-center">
          <h2 class="text-h2 mt-0 mb-sm-4 mb-2">
            They <span class="text-primary">love </span> Able Pro, Now your turn 😍
          </h2>
          <p class="text-h6 mb-0">
            We take pride in our Dashboard development, which has been consistently rated 4.7/5 by our satisfied customers. It brings us joy
            to share the positive feedback we have received from our loyal clients.
          </p>
        </div>
      </VCol>
      <VCol
        md="12"
        cols="12"
        class="pa-sm-3 pa-0"
      />
      <VCol cols="12">
        <div class="mx-n3">
          <Vue3Marquee
            pause-on-hover
            clone
            :duration="50"
          >
            <VCard
              v-for="(item, index) in marqueeArray"
              :key="index"
              variant="outlined"
              class="bg-surface mx-3 my-2 text-h2"
            >
              <VCardItem>
                <div class="d-flex align-center">
                  <VAvatar
                    size="52"
                    variant="flat"
                    color="lightprimary"
                  >
                    <img
                      :src="item.image"
                      width="52"
                      alt="Julia"
                    >
                  </VAvatar>
                  <div class="ml-3">
                    <p class="text-body-1 mb-0">
                      {{ item.text }}
                    </p>
                    <p class="text-body-1 mb-0">
                      <small class="mr-2">{{ item.name }}- </small>
                      <span>{{ item.designation }}</span>
                    </p>
                  </div>
                </div>
              </VCardItem>
            </VCard>
          </Vue3Marquee>
        </div>
        <div class="mt-4 mx-n3">
          <Vue3Marquee
            pause-on-hover
            clone
            :duration="50"
            direction="reverse"
          >
            <VCard
              v-for="(item, index) in marqueeArray"
              :key="index"
              variant="outlined"
              class="bg-surface mx-3 my-2 text-h2"
            >
              <VCardItem>
                <div class="d-flex align-center">
                  <VAvatar
                    size="52"
                    variant="flat"
                    color="lightprimary"
                  >
                    <img
                      :src="item.image"
                      width="52"
                      alt="Julia"
                    >
                  </VAvatar>
                  <div class="ml-3">
                    <p class="text-body-1 mb-0">
                      {{ item.text }}
                    </p>
                    <p class="text-body-1 mb-0">
                      <small class="mr-1">{{ item.name }} -</small>
                      <span>{{ item.designation }}</span>
                    </p>
                  </div>
                </div>
              </VCardItem>
            </VCard>
          </Vue3Marquee>
        </div>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style lang="scss">
.vue3-marquee {
  > .marquee {
    .v-card {
      width: 420px;
      @media (max-width: 959px) {
        width: 320px;
      }
    }
  }
}
</style>
