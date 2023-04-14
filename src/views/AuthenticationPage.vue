<script setup lang="ts">
import { authService } from '@/services/directus.service';
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonToggle } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { mail, person, gameController} from 'ionicons/icons';


const router = useRouter();

/* State */

// The user can toggle between login and register mode in the form to show/hide additional fields
const inRegisterMode = ref(false);

// Provides two-way data binding between Vue and the input fields in the form
const userDetails = ref({
    firstName: '',
    email: '',
    password: ''
});

const login = async () => {
    try {
        await authService.login(userDetails.value.email, userDetails.value.password);
        router.replace('/home');

    } catch (error) {
        console.error(error);
    }
}

const register = async () => {
    try {
        await authService.register(userDetails.value.firstName, userDetails.value.email, userDetails.value.password);
        await login();
        /* if (wasRegistered) {
            await login();
        } */
    } catch (error) {
        console.log(error);
    }
}

</script>
    
<template>
    
    <ion-page>
        <ion-content>
            <ion-list>
                <ion-list-header>
                    <ion-label>Buy & Sell Games</ion-label>
                </ion-list-header>

                <img class="moneybear-image" src="/assets/moneybear.png" />

                <ion-item lines="none">
                    <ion-label class="label-mild"><strong>New User?</strong>>👉</ion-label>
                    <ion-toggle color="dark" @ion-change="inRegisterMode = !inRegisterMode"></ion-toggle>
                </ion-item>

                <hr />


                <ion-item v-if="inRegisterMode">
                    <ion-label class="label-mild" position="floating"><ion-icon :icon="person"></ion-icon></ion-label>
                    <ion-input v-model="userDetails.firstName"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label class="label-mild" position="floating"><ion-icon :icon="mail"></ion-icon></ion-label>
                     <ion-input type="email" v-model="userDetails.email"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label class="label-mild" position="floating"><strong>Passord</strong></ion-label>
                    <ion-input type="password" v-model="userDetails.password"></ion-input>
                </ion-item>

                <ion-button v-if="inRegisterMode" @click="register" class="button-auth" fill="solid" color="dark" size="default">
                    Registrer deg <ion-icon :icon="gameController"></ion-icon>
                </ion-button>

                <ion-button v-else @click="login" class="button-auth" fill="solid" color="dark" size="default">
                    Logg inn <ion-icon :icon="gameController"></ion-icon>
                </ion-button>

            </ion-list>

        </ion-content>
    </ion-page>
    
</template>

<style scoped>
ion-content {
    --ion-background-color: #f4f4f4;
    display: flex;
}

ion-list {
    display: flex;
    flex-direction: column;
}

.label-mild {
    --color: #8a8a8a !important;
}

.moneybear-image {
    width: 80vw;
    align-self: center;
}

.button-auth {
    margin-top: 50px;
    margin-left: 10px;
    margin-right: 10px;
}
</style>