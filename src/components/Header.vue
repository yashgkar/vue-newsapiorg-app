<template>
	<div>
		<header>
			<nav>
				<router-link to="/"><h4>NEWS CENTER</h4></router-link>
				<div class="filter">
					<c-select
						:options="categories"
						v-model="changeCategory"
						:value="getCategory"
					/>
					<c-select
						:options="countries"
						@change="changeCountry"
						:value="getCountry"
					/>
					<c-input
						@keyup="searchFunction"
						:value="searchText"
						type="text"
						name="searchText"
						id="searchText"
						placeholder="Press / to search"
						ref="searchInput"
					/>
				</div>
			</nav>
		</header>
	</div>
</template>

<script>
import { countries, categories } from '@/components/helper.js'

let delay = null
export default {
	data() {
		return {
			countries,
			categories,
			selectedCountry: 'us',
			selectedCategory: 'general'
		}
	},
	computed: {
		searchText() {
			return this.$store.getters['searchText']
		},
		getCountry() {
			return this.$store.getters['country']
		},
		isCountryEnabled() {
			return !this.$store.getters['searchText']
		},
		getCategory() {
			return this.$store.getters['category']
		}
	},
	methods: {
		searchFunction(e) {
			this.$store.dispatch('setSearchText', e.target.value)
			if (delay) {
				clearTimeout(delay)
			}
			delay = setTimeout(() => {
				this.$store.dispatch('search')
			}, 1000)
		},
		changeCountry(e) {
			this.$store.dispatch('setCountry', e.target.value)
		},
		changeCategory(e) {
			this.$store.dispatch('setCategory', e.target.value)
		}
	},
	watch: {
		async getCountry(curVal, nextVal) {
			if (curVal !== nextVal) {
				await this.$store.dispatch('getResultByPage', {
					page: 0
				})
			}
		},
		async getCategory(curVal, nextVal) {
			if (curVal !== nextVal) {
				await this.$store.dispatch('getResultByPage', {
					page: 0
				})
			}
		}
	},
	mounted() {
		window.addEventListener('keyup', (e) => {
			if (e.key === '/') {
				this.$refs.searchInput.focus()
			}
		})
	},
	unmounted() {
		window.removeEventListener('keyup', () => {})
	}
}

document.body.style = 'margin:0;padding:0;'
</script>

<style scoped lang="scss">
header {
	background-color: blanchedalmond;
	padding: 1rem 0;

	nav {
		margin: auto;
		width: 80%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		a {
			text-decoration: none;
			color: inherit;
		}

		@media screen and (max-width: 1280px) and (max-width: 600px) {
			margin: 0;
			width: 100%;
			flex-direction: column;

			.filter {
				flex-direction: column;
			}
		}

		h4 {
			margin: 0;
			font-size: 1.5rem;
		}

		.filter {
			display: flex;
			justify-content: space-between;
			align-items: center;

			input,
			select {
				padding: 0.8rem;
				margin: 0 0 0 0.5rem;
				width: 14rem;
				box-sizing: border-box;
				transition: 0.3s all ease-in-out;
				border: none;
				font-family: 'Forum', cursive;
				font-size: 1rem;

				&:focus-within {
					outline: none;
				}

				@media screen and (max-width: 1280px) and (max-width: 600px) {
					margin: 0.5rem 0;
				}
			}
		}
	}
}
</style>
