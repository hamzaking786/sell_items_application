<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from "@ionic/vue";
import ArticleSpotImage from "@/components/ArticleSpotImage.vue";

interface Props {
	spot: {
		id: number;
		title: string;
		description: string;
		hashtags: string[];
		image: {
			id: string;
		}
	}
}

// eslint-disable-next-line no-undef
defineProps<Props>();

</script>

<template>
	<ion-card :router-link="'/detail/' + spot.id">

		<article-spot-image :image-id="spot.image.id" />

		<ion-card-header>
			<ion-card-subtitle>{{ spot.hashtags }}</ion-card-subtitle>
			<ion-card-title>{{ spot.title }}</ion-card-title>
		</ion-card-header>

		<ion-card-content>
			{{ spot.description }}
		</ion-card-content>

	</ion-card>
</template>