<script setup lang="ts">
import { product } from '../data/product-types.ts'
import { getSelection } from '../data/product-utils.ts'
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import ButtonSolid from '../components/Buttons/button-solid.vue'
import { productsApi } from '../api/productsApi.ts';
import { Product } from '../api/types.ts';
import { useRoute } from 'vue-router';

const props = defineProps<{
	productCategory: string
	productId: number
}>()

// let items: product[] = []

onBeforeMount(() => {
	// items = getSelection(props.productCategory, props.productId)
})



// State
const items = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Fetch products by category
const fetchProducts = async () => {
//   const category = route.query.category as string | undefined
  if (!props.productCategory) return

  loading.value = true
  error.value = null

  try {
    const res = await productsApi.getProductsOfType(props.productCategory)
    items.value = res.data
  } catch (err: any) {
    console.error('Failed to fetch products:', err)
    error.value = 'Unable to load products.'
  } finally {
    loading.value = false
  }
}

// Initial load
onMounted(fetchProducts)

// Refetch when category changes
watch(() => props.productCategory, fetchProducts)
</script>

<template>
	<section class="mt-20 flex w-4/5 max-w-6xl flex-col items-center lg:mt-32">
		<h2 class="mb-16 font-Manrope text-3xl font-bold uppercase text-black">
			You may also like
		</h2>
		<div
			class="flex flex-col items-center gap-12 lg:grid lg:grid-cols-3 lg:grid-rows-1 lg:gap-6"
		>
			<div
				class="flex flex-col items-center justify-between gap-8 lg:gap-10"
				v-for="(item, index) in items"
				:key="index"
			>
				<router-link
					:to="{ name: 'Product', params: { sku: item.sku } }"
					class="overflow-hidden rounded"
				>
					<img class="object-center" :src="item.images[0]" alt="" loading="lazy" />
				</router-link>
				<h3 class="text-center font-Manrope text-2xl font-semibold text-black">
					{{ item.sku }} <br class="hidden lg:inline" />
					<span class="capitalize"> {{ item.name }}</span>
				</h3>
				<ButtonSolid
					:to="{ name: 'Product', params: { sku: item.sku } }"
					color="light"
					content="see product"
					size="small"
				/>
			</div>
		</div>
	</section>
</template>
