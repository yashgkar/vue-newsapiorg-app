<template>
	<div class="about">
		<div class="home">
			<div class="content" v-if="article">
				<h1>{{ article.title }}</h1>
				<h3>{{ article.description }}</h3>
				<h5 v-if="article.author">Edited By: {{ article.author }}</h5>
				<img :src="article.urlToImage" :alt="article.title" />
				<div v-html="article.content"></div>
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
	computed: {
		articles () {
			return this.$store.getters.articles
		}
	},
	methods: {
		async getSingleArticle () {
			const decodedTitle = decodeURI(this.$route.params.id)
			const singleArticle = await this.$store.dispatch(
				'getSingleArticle',
				decodedTitle
			)
			this.article = singleArticle
		}
	},
	watch: {
		articles (cur, old) {
			if (cur !== old) {
				this.getSingleArticle()
			}
		},
	},
	created() {
		this.getSingleArticle()
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
