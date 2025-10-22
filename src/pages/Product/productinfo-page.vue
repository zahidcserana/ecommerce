<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Navigation from '../../components/navigation-global.vue'
import Core from './Components/product-core.vue'
import Ymal from '../../components/ymal-boxes.vue'
import Grid from './Components/product-image-grid.vue'
import Info from '../../components/info-section.vue'
import Footer from '../../components/footer-global.vue'
import Features from './Components/product-features.vue'
import { useRoute } from 'vue-router'

import { productsApi } from '../../api/productsApi'
import type { Product } from '../../api/types'

// Get route instance
const route = useRoute()

const props = defineProps<{
	sku: string
}>()

// State
const item = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Fetch products by category
const fetchProduct = async () => {
  // const sku = route.query.sku as string | undefined
  // if (!sku) return

  try {
    const res = await productsApi.getBySKU(props.sku)
    item.value = res
  } catch (err: any) {
    console.error('Failed to fetch products:', err)
    error.value = 'Unable to load products.'
  } finally {
    loading.value = false
  }
}


// Initial load
onMounted(fetchProduct)

// Refetch when sku changes
watch(() => props.sku, fetchProduct)
</script>

<template>
  <main class="flex h-full w-screen flex-col items-center bg-white">
    <Navigation color="black" />

    <!-- Loading and error states -->
    <div v-if="loading" class="py-20 text-gray-500">Loading product...</div>
    <div v-else-if="error" class="py-20 text-red-500">{{ error }}</div>

    <template v-else-if="item">
      <Core :item="item" />
      <Features :features="item.description" :inthebox="item.content" />
      <Grid
        :topSrc="item.images[0]"
        :botSrc="item.images[0]"
        :rightSrc="item.images[0]"
      />
      <Ymal :productCategory="item.category" :productId="item.id" />
      <Info />
    </template>

    <Footer />
  </main>
</template>
