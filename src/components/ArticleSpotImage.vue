<script setup lang="ts">

interface Props {
	imageId: string;
}

//const userAccessToken = localStorage.getItem('auth_token');

// eslint-disable-next-line no-undef
defineProps<Props>();

</script>

<template>
	<img :src="`https://r4557okd.directus.app/assets/${imageId}`" />
</template>