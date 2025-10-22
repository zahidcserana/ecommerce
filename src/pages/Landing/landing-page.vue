<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navigation from '../../components/navigation-global.vue'
import LandingHero from './Components/landing-hero.vue'
import CategoryBoxes from '../../components/Category-Box/category-box-container.vue'
import Footer from '../../components/footer-global.vue'
import Info from '../../components/info-section.vue'
import Grid from './Components/landing-grid.vue'
// import { productsApi } from '../../api/productsApi'
// import type { Product, Settings, Tenant, Tag } from '../../api/types'
// import { useAppStore } from '../../pinia/appStore'

// State
// const products = ref<Product[]>([])
// const tenant = ref<Tenant>()
// const tags = ref<Tag[]>([])
// const settings = ref<Settings>()
// const loading = ref(true)
// const error = ref<string | null>(null)
// const tagName = ref<string[]>([])

// const appStore = useAppStore()
// console.log(appStore.tenant?.name)

onMounted(async () => {
//   try {
//     // Fetch paginated products
//     const res = await productsApi.getSettings()
//     tenant.value = res.tenant
//     tags.value = res.tags
// 	tagName.value = res.tags.map(tag => tag.name)
//   } catch (err: any) {
//     console.error('Failed to fetch products:', err)
//     error.value = 'Unable to load products.'
//   } finally {
//     loading.value = false
//   }
})
</script>

<template>
	<div
		class="main-container flex h-full w-screen flex-col items-center bg-white"
	>
		<Navigation color="k-black"/>
		<main class="h-full w-screen">
			<LandingHero />
			<CategoryBoxes />
			<Grid />
			<Info />
		</main>
		<Footer />
	</div>
</template>
