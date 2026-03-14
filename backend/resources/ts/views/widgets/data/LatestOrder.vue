<script setup lang="ts">
import { shallowRef } from 'vue'

// assets
import Product1 from '@images/products/1.jpg'
import Product2 from '@images/products/2.jpg'
import Product3 from '@images/products/3.jpg'
import Product4 from '@images/products/4.jpg'

const products = shallowRef([
  {
    orderid: 81412314,
    customer: 'John Deo',
    avatar: Product1,
    product: 'Moto G5',
    total: '10',
    date: '17-2-2017',
    status: 'pending',
  },
  {
    orderid: 68457898,
    customer: 'Jenny William',
    avatar: Product2,
    product: 'iPhone 8',
    total: '16',
    date: '20-2-2017',
    status: 'paid',
  },
  {
    orderid: 45457898,
    customer: 'Lori Moore',
    avatar: Product3,
    product: 'Redmi 4',
    total: '20',
    date: '17-2-2017',
    status: 'success',
  },
  {
    orderid: 62446232,
    customer: 'Austin Pena',
    avatar: Product4,
    product: 'Jio',
    total: '15',
    date: '25-4-2017',
    status: 'failed',
  },
])
</script>

<template>
  <VTable
    class="bordered-table"
    hover
    density="comfortable"
  >
    <thead class="bg-containerBg">
      <tr>
        <th class="text-start ps-6 text-caption font-weight-bold text-uppercase">
          Customer
        </th>
        <th class="text-start text-caption font-weight-bold text-uppercase">
          Order Id
        </th>
        <th class="text-start text-caption font-weight-bold text-uppercase">
          Photo
        </th>
        <th class="text-start text-caption font-weight-bold text-uppercase">
          Product
        </th>

        <th class="text-start ps-4 text-caption font-weight-bold text-uppercase">
          Total
        </th>
        <th
          class="text-start text-caption font-weight-bold text-uppercase"
          style="min-width: 110px"
        >
          Date
        </th>
        <th class="text-start text-caption font-weight-bold text-uppercase">
          Status
        </th>
        <th class="text-start pe-6 text-caption font-weight-bold text-uppercase ps-8">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in products"
        :key="item.orderid"
      >
        <td class="py-3 ps-6">
          {{ item.customer }}
        </td>
        <td class="py-3">
          #{{ item.orderid }}
        </td>
        <td class="py-3">
          <img
            :src="item.avatar"
            width="20"
            height="40"
            :alt="item.avatar"
          >
        </td>
        <td class="py-3">
          {{ item.product }}
        </td>
        <td class="py-3 ps-9">
          {{ item.total }}
        </td>
        <td
          class="py-3"
          style="min-width: 110px"
        >
          {{ item.date }}
        </td>
        <td class="py-3">
          <VChip
            v-if="item.status === 'pending'"
            color="warning"
            variant="flat"
            rounded="lg"
            size="small"
          >
            Pending
          </VChip>
          <VChip
            v-else-if="item.status === 'paid'"
            color="primary"
            variant="flat"
            rounded="lg"
            size="small"
          >
            Paid
          </VChip>
          <VChip
            v-else-if="item.status === 'success'"
            color="success"
            variant="flat"
            rounded="lg"
            size="small"
          >
            Success
          </VChip>
          <VChip
            v-else
            color="error"
            variant="flat"
            rounded="lg"
            size="small"
          >
            Failed
          </VChip>
        </td>
        <td class="py-3 pe-6">
          <div class="d-flex align-center">
            <VBtn
              icon
              color="primary"
              aria-label="edit"
              variant="text"
              rounded="md"
            >
              <SvgSprite
                name="custom-edit-outline"
                style="width: 20px; height: 20px"
              />
            </VBtn>
            <VBtn
              icon
              color="inherit"
              aria-label="delete"
              variant="text"
              rounded="md"
            >
              <SvgSprite
                name="custom-trash"
                style="width: 20px; height: 20px"
              />
            </VBtn>
          </div>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
