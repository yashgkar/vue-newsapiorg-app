<template>
	<main>
		<main-header />
		<div class="router-view-styles">
			<transition name="router">
				<router-view />
			</transition>
		</div>
		<popup :show="isError" :title="errorStatus" @close="closePopup">
			{{ errorObj.message }}
		</popup>
	</main>
</template>

<script>
export default {
	computed: {
		isError() {
			return !!this.$store.getters['error']
		},
		errorObj() {
			return this.$store.getters['error']
		},
		errorStatus() {
			if (this.isError) {
				return this.errorObj.status + ': ' + this.errorObj.code
			}
			return ''
		}
	},
	async created() {
		await this.$store.dispatch('getResultByPage', {
			page: 0
		})
	},
	methods: {
		closePopup() {
			this.$store.dispatch('setError', '')
		}
	}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Forum&family=Koh+Santepheap:wght@100;300;400;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=PT+Sans&display=swap');
html {
	font-family: 'Forum', cursive;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #242424;
}

body {
	padding: 0;
	margin: 0;
}

.home {
	width: 80%;
	margin: auto;

	@media screen and (max-width: 900px) and (max-width: 600px) {
		margin: 0;
		width: 100%;
	}
}

.router-view-styles {
	font-family: 'PT Sans', cursive;

	.router-enter-from,
	.router-leave-to {
		opacity: 0;
		transform: translateY(1rem);
	}

	.router-enter-to,
	.router-leave-from {
		opacity: 1;
		transform: translateY(0);
	}

	.router-leave-active,
	.router-enter-active {
		transition: all 0.2s ease-in-out;
	}
}
</style>
