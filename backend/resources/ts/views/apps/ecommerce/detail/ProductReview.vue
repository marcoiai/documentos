<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import user1 from '@images/users/avatar-1.png'
import user2 from '@images/users/avatar-2.png'
import user3 from '@images/users/avatar-3.png'

interface commentsType {
  name: string
  desc: string
  avatar: string
  date: string
  ratings: number
}
const rating = ref(4)

const comments = shallowRef<commentsType[]>([
  {
    name: 'Amy Woods',
    desc: 'Zucej uko mipivohit ibir sobak jeci geeho kefaz ve rusel vucacku lonkiso ene rocuhuh cezfeg lut. Ipi bod gaare veohu jududuc bog ajifaag ej neewcaj bicgo suzag ta idnecu mofsimij woc tos ifco wohnukgah.',
    avatar: user1,
    date: '02/11, 2023 3:02:24 PM',
    ratings: 3.5,
  },
  {
    name: 'Emily Greene',
    desc: 'Binu dud ca pulrog imcim nekuiga osita uga do lofug bod iw. Jazuba fi bulacil ufi sejed vud dobe meiga jef terabe bac opve tum woajovog kam wicibeb jed bo.',
    avatar: user2,
    date: '28/10, 2023 4:28:24 AM',
    ratings: 1.5,
  },
  {
    name: 'Martin Vargas',
    desc: 'Zazsa def rozo vuko himecfo licema dil popwilfo desawniz givu zo surfok etvul. Oganumo di til verujan jodezu ew uw huzvuguv ijnu hil ruz vob medretuta ehilamuf.',
    avatar: user3,
    date: '25/10, 2023 11:25:24 AM',
    ratings: 5,
  },
])
</script>

<template>
  <VRow>
    <VCol
      lg="12"
      cols="12"
    >
      <VCard
        variant="outlined"
        elevation="0"
        rounded="lg"
        class="h-100 d-flex align-center justify-center"
      >
        <VRow class="mx-0 align-center">
          <VCol
            cols="12"
            md="7"
            sm="4"
            class="pa-sm-4"
          >
            <div class="pt-sm-0 pt-5">
              <h2 class="text-h2 mb-2 d-flex align-center">
                4
                <span class="text-h4 text-lightText mb-0 ml-1">
                  /5
                </span>
              </h2>
              <p class="text-h6 text-lightText mb-1">
                Based on 275 reviews
              </p>
              <div class="text-medium-emphasis align-center d-flex ga-2">
                <VRating
                  v-model="rating"
                  color="inputBorder"
                  active-color="warning"
                  half-increments
                  density="compact"
                />
              </div>
            </div>
          </VCol>
          <VCol
            cols="12"
            md="5"
            sm="8"
            class="pa-sm-4"
          >
            <div class="pa-sm-4 progressBg">
              <div class="d-flex align-center ga-4 my-2">
                <VProgressLinear
                  model-value="100"
                  aria-label="progressbar"
                  height="6"
                  color="warning"
                  bg-color="gray100"
                  rounded
                />
                <div class="text-no-wrap text-caption text-lightText">
                  5 Stars
                </div>
              </div>
              <div class="d-flex align-center ga-4 my-2">
                <VProgressLinear
                  model-value="80"
                  aria-label="progressbar"
                  height="6"
                  color="warning"
                  bg-color="gray100"
                  rounded
                />
                <div class="text-no-wrap text-caption text-lightText">
                  4 Stars
                </div>
              </div>
              <div class="d-flex align-center ga-4 my-2">
                <VProgressLinear
                  model-value="60"
                  aria-label="progressbar"
                  height="6"
                  color="warning"
                  bg-color="gray100"
                  rounded
                />
                <div class="text-no-wrap text-caption text-lightText">
                  3 Stars
                </div>
              </div>
              <div class="d-flex align-center ga-4 my-2">
                <VProgressLinear
                  model-value="40"
                  aria-label="progressbar"
                  height="6"
                  color="warning"
                  bg-color="gray100"
                  rounded
                />
                <div class="text-no-wrap text-caption text-lightText">
                  2 Stars
                </div>
              </div>
              <div class="d-flex align-center ga-4 my-2">
                <VProgressLinear
                  model-value="20"
                  aria-label="progressbar"
                  height="6"
                  color="warning"
                  bg-color="gray100"
                  rounded
                />
                <div class="text-no-wrap text-caption text-lightText">
                  1 Stars
                </div>
              </div>
            </div>
          </VCol>
        </VRow>
      </VCard>
    </VCol>
    <VCol lg="12">
      <VCard
        v-for="(comment, i) in comments"
        :key="i"
        variant="flat"
        class="d-flex align-center mb-7 bg-containerBg"
        rounded="lg"
      >
        <div class="d-flex align-start ga-2 pa-4">
          <VAvatar size="40">
            <img
              :src="comment.avatar"
              alt="users"
              width="40"
            >
          </VAvatar>
          <div>
            <h6 class="text-subtitle-1 mb-0">
              {{ comment.name }}
            </h6>
            <span class="text-caption text-lightText">{{ comment.date }}</span>
            <div class="v-col-lg-2 px-0 py-0">
              <VRating
                v-model="comment.ratings"
                size="small"
                half-increments
                density="compact"
                color="inputBorder"
                active-color="warning"
              />
            </div>
            <p class="text-caption mt-2">
              {{ comment.desc }}
            </p>
          </div>
        </div>
      </VCard>
    </VCol>
  </VRow>
  <div class="text-center mb-6">
    <VBtn
      variant="text"
      rounded="md"
      color="primary"
    >
      View more comments
    </VBtn>
  </div>
  <div class="position-relative">
    <VTextarea
      density="comfortable"
      hide-details
      placeholder="Add comment"
      variant="outlined"
    />
    <div class="comment-panel d-flex justify-space-between align-center pa-3">
      <div>
        <VBtn
          icon
          rounded="md"
          aria-label="attach"
          color="primary"
          variant="text"
        >
          <SvgSprite
            name="custom-paper-clip-2"
            style="width: 20px; height: 20px"
          />
        </VBtn>
        <VBtn
          icon
          rounded="md"
          aria-label="picture"
          color="primary"
          variant="text"
        >
          <SvgSprite
            name="custom-picture-outline"
            style="width: 20px; height: 20px"
          />
        </VBtn>
        <VBtn
          icon
          rounded="md"
          aria-label="emoji"
          color="primary"
          variant="text"
        >
          <SvgSprite
            name="custom-smile-outline"
            style="width: 20px; height: 20px"
          />
        </VBtn>
      </div>
      <VBtn
        color="primary"
        rounded="md"
        variant="flat"
        size="small"
      >
        Comment
      </VBtn>
    </div>
  </div>
</template>

<style lang="scss">
.progressBg {
  .v-progress-linear__background {
    opacity: 1;
  }
  .v-progress-linear {
    left: unset !important;
    transform: unset !important;
  }
}
.comment-panel {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
