<template>
	<input
		type="type"
		name=""
		@input="$emit('input', $event.target.value)"
		:placeholder="placeholder"
	/>
</template>

<script>
export default {
	props: {
		placeholder: {
			type: String,
			required: false,
			default: ''
		},
		name: {
			type: String,
			required: false,
			default: ''
		},
	},
  emits: ['input']
}
</script>

<style scoped lang="scss">
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
</style>
