<script setup lang="ts">
import { ref } from 'vue'

// imports widgets
import TodoList from '@/views/widgets/data/TodoList.vue'
import TrafficSources from '@/views/widgets/data/TrafficSources.vue'
import TeamMembers from '@/views/widgets/data/TeamMembers.vue'
import UserActivity from '@/views/widgets/data/UserActivity.vue'
import LatestPosts from '@/views/widgets/data/LatestPosts.vue'
import Messages from '@/views/widgets/data/MessageList.vue'
import Projects from '@/views/widgets/data/ProjectList.vue'
import ProductSales from '@/views/widgets/data/ProductSales.vue'
import Tasks from '@/views/widgets/data/TaskList.vue'
import ApplicationSales from '@/views/widgets/data/ApplicationSales.vue'
import ActiveTickets from '@/views/widgets/data/ActiveTickets.vue'
import Feeds from '@/views/widgets/data/FeedList.vue'
import LatestCustomer from '@/views/widgets/data/LatestCustomer.vue'
import LatestOrder from '@/views/widgets/data/LatestOrder.vue'
import IncomingRequest from '@/views/widgets/data/IncomingRequest.vue'
import TotalRevenue from '@/views/widgets/data/TotalRevenue.vue'
import NewCustomers from '@/views/widgets/data/NewCustomers.vue'
import RecentTickets from '@/views/widgets/data/RecentTickets.vue'
import MyTask from '@/views/widgets/data/MyTask.vue'
import ProfileCard from '@/views/widgets/data/ProfileCard.vue'
import ProductTableCard from '@/views/widgets/data/ProductTableCard.vue'
import MonthlyRevenue from '@/views/widgets/data/MonthlyRevenue.vue'
import TransactionCard from '@/views/widgets/data/TransactionCard.vue'
import PaymentHistory from '@/views/widgets/data/PaymentHistory.vue'
import AddNewTask from '@/views/widgets/data/AddNewTask.vue'

const page = ref({ title: 'Data' })

const breadcrumbs = ref([
  {
    title: 'Widget',
    disabled: false,
    href: '#',
  },
  {
    title: 'Data',
    disabled: true,
    href: '#',
  },
])
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  />

  <VRow>
    <!-- ---------------------------------------------------------------- -->
    <!-- My Task -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      lg="4"
      md="6"
    >
      <MyTask />
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Profile -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      lg="4"
      md="6"
    >
      <ProfileCard />
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Team Members -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      lg="4"
      md="5"
    >
      <TeamMembers />
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Product Table -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      xl="8"
      lg="7"
      md="7"
    >
      <ProductTableCard />
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Monthly Revenue -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      xl="4"
      lg="5"
      md="6"
    >
      <MonthlyRevenue />
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- New Customers -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      md="6"
    >
      <CardHeader
        title="New Customers"
        class="overflow-hidden"
      >
        <NewCustomers />
      </CardHeader>
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Recent Tickets -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      lg="6"
      md="12"
    >
      <CardHeader
        title="Recent Tickets"
        class="overflow-hidden"
      >
        <template #header>
          <RouterLink
            to="/widgets/data"
            class="text-h6 text-primary link-hover"
          >
            View all
          </RouterLink>
        </template>
        <RecentTickets />
      </CardHeader>
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Transaction -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      xl="6"
      md="12"
    >
      <TransactionCard />
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Payment history -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      xl="3"
      md="6"
    >
      <PaymentHistory />
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Add new task -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      xl="3"
      md="6"
    >
      <AddNewTask />
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Incoming Requests -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <CardHeader
        title="Incoming Requests"
        class="overflow-hidden"
      >
        <template #header>
          <RouterLink
            to="/widgets/data"
            class="text-h6 text-primary link-hover"
          >
            View all
          </RouterLink>
        </template>
        <IncomingRequest />
      </CardHeader>
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Total Revenue -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <CardHeader
        title="Total Revenue"
        class="overflow-hidden"
      >
        <TotalRevenue />
      </CardHeader>
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Tasks -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      lg="4"
      md="4"
    >
      <CardHeader title="Tasks">
        <template #header>
          <RouterLink
            to="/widgets/data"
            class="text-h6 text-primary link-hover"
          >
            View all
          </RouterLink>
        </template>
        <Tasks />
      </CardHeader>
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Todo List -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      lg="3"
      sm="6"
    >
      <CardHeader
        title="To Do List"
        class="headerWithBtn"
      >
        <template #header>
          <VBtn
            color="primary"
            variant="text"
            aria-label="add"
            size="small"
            rounded="md"
            icon
          >
            <SvgSprite
              name="custom-circle-plus-outline"
              style="width: 20px; height: 20px"
            />
          </VBtn>
        </template>
        <TodoList />
      </CardHeader>
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Traffic Sources -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      lg="3"
      sm="6"
    >
      <WidgetCard
        title="Traffic Sources"
        subtitle="You’re getting more and more sources, keep it up!"
      >
        <TrafficSources />
      </WidgetCard>
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Application Sales -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      lg="6"
      md="12"
    >
      <CardHeader
        title="Application Sales"
        class="overflow-hidden"
      >
        <template #header>
          <RouterLink
            to="/widgets/data"
            class="text-h6 text-primary link-hover"
          >
            View all
          </RouterLink>
        </template>
        <ApplicationSales />
      </CardHeader>
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Messages -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      md="6"
    >
      <CardHeader title="Latest Messages">
        <template #header>
          <RouterLink
            to="/widgets/data"
            class="text-h6 text-primary link-hover"
          >
            View all
          </RouterLink>
        </template>
        <Messages />
      </CardHeader>
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- User Activity -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      md="6"
    >
      <CardHeader
        title="User Activity"
        class="overflow-hidden"
      >
        <template #header>
          <RouterLink
            to="/widgets/data"
            class="text-h6 text-primary link-hover"
          >
            View all
          </RouterLink>
        </template>
        <UserActivity />
      </CardHeader>
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Projects -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      lg="6"
    >
      <CardHeader
        title="Projects"
        class="overflow-hidden"
      >
        <template #header>
          <RouterLink
            to="/widgets/data"
            class="text-h6 text-primary link-hover"
          >
            View all
          </RouterLink>
        </template>
        <Projects />
      </CardHeader>
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Product Sales -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      lg="6"
    >
      <CardHeader
        title="Product Sales"
        class="overflow-hidden"
      >
        <ProductSales />
      </CardHeader>
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Active Tickets -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      md="8"
    >
      <CardHeader
        title="Active Tickets"
        class="overflow-hidden"
      >
        <template #header>
          <RouterLink
            to="/widgets/data"
            class="text-h6 text-primary link-hover"
          >
            View all
          </RouterLink>
        </template>
        <ActiveTickets />
      </CardHeader>
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Latest Posts -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      md="4"
    >
      <CardHeader
        title="Latest Posts"
        class="overflow-hidden"
      >
        <template #header>
          <RouterLink
            to="/widgets/data"
            class="text-h6 text-primary link-hover"
          >
            View all
          </RouterLink>
        </template>
        <LatestPosts />
      </CardHeader>
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Feeds -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      lg="4"
      md="5"
    >
      <CardHeader
        title="Feeds"
        class="overflow-hidden"
      >
        <template #header>
          <RouterLink
            to="/widgets/data"
            class="text-h6 text-primary link-hover"
          >
            View all
          </RouterLink>
        </template>
        <Feeds />
      </CardHeader>
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Latest Customers -->
    <!-- ---------------------------------------------------------------- -->
    <VCol
      cols="12"
      lg="8"
      md="7"
    >
      <CardHeader
        title="Latest Customers"
        class="overflow-hidden"
      >
        <template #header>
          <RouterLink
            to="/widgets/data"
            class="text-h6 text-primary link-hover"
          >
            View all
          </RouterLink>
        </template>
        <LatestCustomer />
      </CardHeader>
    </VCol>

    <!-- ---------------------------------------------------------------- -->
    <!-- Latest Order -->
    <!-- ---------------------------------------------------------------- -->
    <VCol cols="12">
      <CardHeader
        title="Latest Order"
        class="overflow-hidden"
      >
        <template #header>
          <RouterLink
            to="/widgets/data"
            class="text-h6 text-primary link-hover"
          >
            View all
          </RouterLink>
        </template>
        <LatestOrder />
      </CardHeader>
    </VCol>
  </VRow>
</template>
