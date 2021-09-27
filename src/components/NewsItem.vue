<template>
	<section @click="openDetails">
		<div class="image-container">
			<img :src="newsdata.urlToImage" :alt="newsdata.title" />
		</div>
		<main>
			<h4>{{ newsdata.title }}</h4>
			<div class="desc">
				<h5>{{ newsdata.author }}</h5>
				<p>{{ description }}</p>
			</div>
			<div class="date-container">
				<h5>Published: {{ date }}</h5>
			</div>
		</main>
	</section>
</template>

<script>
export default {
	props: ['newsdata'],
	computed: {
		date() {
			return new Date(this.newsdata.publishedAt).toDateString()
		},
		description() {
			return this.newsdata.description
		}
	},
	methods: {
		openDetails() {
			const encodedTitle = encodeURI(this.newsdata.title)
			this.$router.push(`/${encodedTitle}`)
		}
	}
}
</script>

<style scoped lang="scss">
section {
	position: relative;
	border-radius: 7px;
	border: 1px solid #ccc;
	height: 28rem;
	width: 90%;
	margin-bottom: 1rem;

	&:nth-child(3n-2) {
		justify-self: self-start;
	}

	&:nth-child(3n-1) {
		justify-self: center;
	}

	&:nth-child(3n) {
		justify-self: self-end;
	}

	@media screen and (max-width: 1280px) {
		&:nth-child(2n) {
			justify-self: self-end;
		}

		&:nth-child(2n-1) {
			justify-self: self-start;
		}
	}

	@media screen and (max-width: 1280px) and (max-width: 600px) {
		width: 85vw;

		&:nth-child(n) {
			justify-self: center;
		}
	}

	.image-container {
		display: flex;
		justify-content: center;
		overflow: hidden;
		width: 100%;
		background: rgb(230, 230, 230);
		transition: 0.3s all ease-in-out;
		img {
			height: 12rem;
			overflow: hidden;
			border-radius: 7px 7px 0 0;
		}
	}

	main {
		margin: 0.5rem 1rem;
		transition: 0.3s all ease-in-out;

		.date-container {
			position: absolute;
			bottom: 0;
			background-color: rgb(255, 200, 148);
			width: 100%;
			transform: translateX(-1rem) translateY(1px);
			border-radius: 0 0 7px 7px;

			h5 {
				margin: 1rem;
				font-size: 0.8rem;
				color: black;
			}
		}

		h5 {
			color: rgb(95, 95, 95);
		}

		h4,
		h5 {
			margin: 6px 4px;
		}

		p {
			margin: 8px 4px;
		}
	}
}
</style>
