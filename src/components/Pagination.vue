<template>
	<div class="pagination-container">
		<button
			:disabled="previousDisabled"
			type="button"
			class="page-btn"
			@click="getByPage('previous')"
		>
			Previous
		</button>
		<div class="page-number-container">
			{{ currentPage }} / {{ totalPages }}
		</div>
		<button
			:disabled="nextDisabled"
			type="button"
			class="page-btn"
			@click="getByPage('next')"
		>
			Next
		</button>
	</div>
</template>

<script>
export default {
	computed: {
		totalPages() {
			return this.$store.getters['totalPages']
		},
		currentPage() {
			return this.$store.getters['currentPage']
		},
		nextDisabled() {
			return this.$store.getters['currentPage'] === this.totalPages
		},
		previousDisabled() {
			return this.$store.getters['currentPage'] === 1
		}
	},
	methods: {
		getByPage(type) {
			if (this.currentPage !== 0) {
				const currentPage = this.currentPage
				const page = type === 'previous' ? currentPage - 1 : currentPage + 1
				this.$store.dispatch('getResultByPage', {
					page
				})
			}
		}
	}
}
</script>

<style lang="scss">
.pagination-container {
	margin: 2rem;
	display: flex;
	justify-content: center;

	.page-number-container {
		margin: 0 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
button {
	padding: 6px 1rem;
	border: 1px solid #ccc;
	text-transform: uppercase;


  &:not(:disabled) {
    cursor: pointer;
  }
}
</style>
