<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navigation from '../../components/navigation-global.vue'
import Core from './Components/product-core.vue'
import Ymal from '../../components/ymal-boxes.vue'
import Grid from './Components/product-image-grid.vue'
import Info from '../../components/info-section.vue'
import Footer from '../../components/footer-global.vue'
import Features from './Components/product-features.vue'

import { productsApi } from '../../api/productsApi'
import type { Product } from '../../api/types'

const props = defineProps<{
  category: string
  productId: number
}>()

// product item state
const item = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    // You can choose how to load: by category or by ID.
    // If your endpoint returns an array for category:
    const res = await productsApi.getByCategory(props.category)
	data = res.data

    if (Array.isArray(data)) {
      item.value = data.find((p) => p.id === props.productId) || null
    } else {
      // If API directly returns one product
      item.value = data
    }
  } catch (err: any) {
    console.error('Failed to fetch product:', err)
    error.value = 'Unable to load product'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="flex h-full w-screen flex-col items-center bg-white">
    <Navigation color="black" />

    <!-- Loading and error states -->
    <div v-if="loading" class="py-20 text-gray-500">Loading product...</div>
    <div v-else-if="error" class="py-20 text-red-500">{{ error }}</div>

    <template v-else-if="item">
      <Core :item="item" />
      <Features :features="item.features" :inthebox="item.inthebox" />
      <Grid
        :topSrc="item.topSrc"
        :botSrc="item.botSrc"
        :rightSrc="item.rightSrc"
      />
      <Ymal :productCategory="category" :productId="productId" />
      <Info />
    </template>

    <Footer />
  </main>
</template>
