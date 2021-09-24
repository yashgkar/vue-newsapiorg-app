<template>
	<div class="container">
		<h3>{{ totalResults }} News Results(s)</h3>
		<div class="news-container">
			<div class="news-items-container" v-if="!isLoading">
				<news-item
					v-for="article in articles"
					:key="article.url"
					:newsdata="article"
				/>
			</div>
			<h2 class="loader" v-else>Loading...</h2>
		</div>
	</div>
</template>

<script>
import NewsItem from '@/components/NewsItem.vue'
export default {
	components: {
		NewsItem
	},
	computed: {
		articles() {
			return this.$store.getters['articles']
		},
		isLoading() {
			return this.$store.getters['isLoading']
		},
		totalResults() {
			return this.$store.getters['totalResults']
		}
	}
}
</script>

<style scoped lang="scss">
.container {
	h3 {
		text-align: center;
	}

	.news-container {
		@media screen and (max-width: 1280px) and (max-width: 600px) {
			margin: 0;
		}

		.loader {
			text-align: center;
		}

		.news-items-container {
			margin-top: 2rem;
			display: grid;
			grid-template-columns: auto auto auto;
			row-gap: 1rem;
			column-gap: 1rem;
			align-items: center;
			justify-content: space-between;

			@media screen and (max-width: 1280px) {
				grid-template-columns: auto auto;
			}

			@media screen and (max-width: 600px) {
				grid-template-columns: auto;
				column-gap: 0;
			}
		}
	}
}
</style>
