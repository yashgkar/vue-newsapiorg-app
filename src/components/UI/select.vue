<template>
	<select :value="value">
		<option
			v-for="option in options"
			:key="option['code']"
			:value="option['code']"
      @click="$emit('input', option['code'])"
		>
			{{ option['label'] }}
		</option>
	</select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array
    },
    value: {
      type: String
    }
  },
  computed: {
    model: {
      get() { return this.value },
      set(value) { this.$emit('input', value) }
    }
  }
}
</script>

<style>

</style>