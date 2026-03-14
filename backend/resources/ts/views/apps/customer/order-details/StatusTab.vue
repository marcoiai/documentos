<template>
  <VCard
    variant="outlined"
    class="bg-surface"
    rounded="lg"
  >
    <VCardItem class="py-4">
      <h4 class="text-h5 mb-0">
        Order Status
      </h4>
    </VCardItem>
    <VDivider />
    <VCardText>
      <VRow>
        <VCol
          cols="12"
          md="3"
          sm="4"
        >
          <h5 class="text-h5 mb-1">
            Order Place Date
          </h5>
          <span class="text-subtitle-1 text-medium-emphasis">10th Mar, 2021</span>
        </VCol>
        <VCol
          cols="12"
          md="2"
          sm="4"
        >
          <h5 class="text-h5 mb-1">
            Order Status
          </h5>
          <span class="text-subtitle-1 text-medium-emphasis">Processing</span>
        </VCol>
        <VCol
          cols="12"
          md="3"
          sm="4"
        >
          <h5 class="text-h5 mb-1">
            Delivery Option
          </h5>
          <span class="text-subtitle-1 text-medium-emphasis">Fedex Express Delivery</span>
        </VCol>
        <VCol
          cols="12"
          md="2"
          sm="4"
        >
          <h5 class="text-h5 mb-1">
            Payment
          </h5>
          <span class="text-subtitle-1 text-medium-emphasis">Credit Card</span>
        </VCol>
        <VCol
          cols="12"
          md="2"
          sm="4"
        >
          <h5 class="text-h5 mb-1">
            Order Amount
          </h5>
          <span class="text-subtitle-1 text-medium-emphasis">$90,020</span>
        </VCol>
      </VRow>
      <VRow class="mt-5">
        <VCol
          cols="12"
          md="9"
        >
          <VRow class="justify-center">
            <VCol
              cols="12"
              lg="10"
            >
              <VTimeline
                align="start"
                class="mt-5 dot-outline"
                side="end"
                truncate-line="both"
                line-color="borderLight"
              >
                <VTimelineItem
                  dot-color="primary"
                  size="x-small"
                >
                  <template #opposite>
                    <div class="text-end">
                      <span class="text-subtitle-2 font-weight-medium">Order Placed</span>
                      <h6 class="text-subtitle-1 text-medium-emphasis font-weight-medium">
                        12 jun
                      </h6>
                    </div>
                  </template>
                  <div>
                    <h5 class="pb-4 text-subtitle-1 font-weight-regular">
                      The order was validated.
                    </h5>
                    <VDivider />
                    <h5 class="py-4 text-subtitle-1 font-weight-regular">
                      The order was placed.
                    </h5>
                    <VDivider />
                    <h5 class="py-4 text-subtitle-1 font-weight-regular">
                      The order was placed.
                    </h5>
                  </div>
                </VTimelineItem>

                <VTimelineItem
                  dot-color="primary"
                  size="x-small"
                >
                  <template #opposite>
                    <div class="text-end">
                      <span class="text-subtitle-2 font-weight-medium">Order Processing</span>
                      <h6 class="text-subtitle-1 text-medium-emphasis font-weight-medium">
                        14 jun
                      </h6>
                    </div>
                  </template>
                  <div>
                    <h5 class="text-subtitle-1 font-weight-regular">
                      Payment transaction [method: Credit Card, type: sale, amount: $90,020, status: Processing ]
                    </h5>
                  </div>
                </VTimelineItem>
                <VTimelineItem
                  dot-color="primary"
                  size="x-small"
                >
                  <template #opposite>
                    <div class="text-end">
                      <span class="text-subtitle-2 font-weight-medium">Order Shipping</span>
                      <h6 class="text-subtitle-1 text-medium-emphasis font-weight-medium">
                        16 Jun
                      </h6>
                    </div>
                  </template>
                  <div>
                    <h5 class="text-subtitle-1 font-weight-regular">
                      Sent a notification to the client by e-mail.
                    </h5>
                  </div>
                </VTimelineItem>
                <VTimelineItem
                  dot-color="primary"
                  size="x-small"
                >
                  <template #opposite>
                    <div class="text-end">
                      <span class="text-subtitle-2 font-weight-medium">Order Delivered</span>
                      <h6 class="text-subtitle-1 text-medium-emphasis font-weight-medium">
                        17 jun
                      </h6>
                    </div>
                  </template>
                  <div>
                    <h5 class="text-subtitle-1 font-weight-regular">
                      Order Delivered
                    </h5>
                  </div>
                </VTimelineItem>
              </VTimeline>
            </VCol>
          </VRow>
        </VCol>
        <VCol
          cols="12"
          md="3"
        >
          <VTextarea
            variant="outlined"
            name="input-7-1"
            density="comfortable"
            rows="9"
            color="primary"
            filled
            label="Write a review"
            auto-grow
          />
          <VBtn
            color="primary"
            rounded="lg"
            variant="flat"
          >
            Post Review
          </VBtn>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
