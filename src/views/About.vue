<template>
	<div class="about">
		<div class="home">
			<div class="content" v-if="article">
				<h1>{{ article.title }}</h1>
				<h3>{{ article.description }}</h3>
				<h5 v-if="article.author">Edited By: {{ article.author }}</h5>
				<!-- <div class="image-container"> -->
					<img :src="article.urlToImage" :alt="article.title" />
				<!-- </div> -->
				<p>{{ article.content }}</p>
				<a :href="article.url" target="_blank">
					Read Full Article at {{ article.source.name }}
				</a>
			</div>
			<h3 v-else>
				Article not found please go to
				<router-link to="/">homepage</router-link>
			</h3>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			article: null
		}
	},
	async created() {
		const singleArticle = await this.$store.dispatch(
			'getSingleArticle',
			this.$route.params.id
		)
		this.article = singleArticle
	},
	mounted() {
		window.addEventListener('keyup', (e) => {
			console.log(e)
			if (e.key === 'Backspace') {
				this.$router.back()
			}
		})
	},
	unmounted() {
		window.removeEventListener('keyup', () => {})
	}
}
</script>

<style lang="scss">
.content {
	img {
		max-height: 20rem;
	}
}
</style>
