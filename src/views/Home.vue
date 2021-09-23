<template>
	<div>
		<div class="home">
			<news-content />
      <pagination />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import NewsContent from '@/components/NewsContent.vue'
import Pagination from '@/components/Pagination.vue'

export default {
	name: 'Home',
	components: {
		NewsContent,
    Pagination
	}
}
</script>
