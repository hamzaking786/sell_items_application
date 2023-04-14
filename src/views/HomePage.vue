<script setup lang="ts">
import ArticleSpotCard from '@/components/ArticleSpotCard.vue';
import { IArticleSpot, IArticleSpotsResponse } from '@/models/ArticleSpotModels';
import { authService, directus } from '@/services/directus.service';
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonTitle, IonToolbar, onIonViewDidEnter, RefresherCustomEvent } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { addCircleOutline} from 'ionicons/icons';

var campSpots: IArticleSpot[] = []
const articleSpots = ref<IArticleSpot[]>([]);

const router = useRouter();

var loginButtonText = ref("Log in");

// Provides two-way data binding between Vue and the input fields in the form
/*const userDetails = ref({
    firstName: '',
    email: '',
    password: ''
});*/

onIonViewDidEnter(() => {
  fetchArticleSpots();
  checkLoginStatus();
})

async function checkLoginStatus() {
  loginButtonText.value = await isLoggedIn() ? "Log out" : "Log in";
}

const refreshArticleSpotsView = async (event: RefresherCustomEvent) => {
  await fetchArticleSpots();
  event.target.complete();
}

const fetchArticleSpots = async () => {
  const response = await directus.graphql.items<IArticleSpotsResponse>(`
    query {
      camp_spots {
        id,
        title,
        description,
        hashtags,
        image {
          id
        },
      }
    }
  `);

  if (response.status === 200 && response.data) {
    campSpots = [...response.data.camp_spots];
    articleSpots.value = [...response.data.camp_spots];
    console.log(response.data);
  }
}


const login = async () => {
    try {
        router.replace('/authentication');
    } catch (error) {
        console.error(error);
    }
}

const logout = async () => {
    try {
        await authService.logout()
        checkLoginStatus();
        router.replace('/home');

    } catch (error) {
        console.error(error);
    }
}


const isLoggedIn = async () => {
    try {
      await authService.currentUser()
      return true

    } catch (error) {
      return false
    }
}

const handleLogin = async() => {
  const isUserLoggedIn = await isLoggedIn()
  if (isUserLoggedIn) {
    logout()
  } else {
    login()
  }
  
}

function handleFilter(event) {
  const query = event.target.value.toLowerCase();
  articleSpots.value = campSpots.filter(campspot => campspot.title.toLowerCase().indexOf(query) > -1)
}


</script>
  
<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title><ion-icon name="newspaper-outline"></ion-icon></ion-title>
        <ion-buttons slot="end">
          <ion-button router-link="/new-spot"><ion-icon :icon="addCircleOutline"></ion-icon></ion-button>
        </ion-buttons>
        <ion-buttons slot="start">
          <ion-button @click="handleLogin">{{ loginButtonText }}</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <IonSearchbar color="dark" :debounce="1000" placeholder="Search" @ionChange="handleFilter($event)"></IonSearchbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <ion-refresher slot="fixed" @ionRefresh="refreshArticleSpotsView($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ArticleSpotCard v-for="spot in articleSpots" :key="spot.id" :spot="spot" />
    </ion-content>
  </ion-page>
</template>