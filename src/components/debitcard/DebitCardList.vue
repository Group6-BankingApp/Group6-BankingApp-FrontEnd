<template>
    <div>
      <h2>Debit Cards</h2>
      <div class="debitcards-list">
        <ul>
          <debit-card-item v-for="debitcard in debitcards" :key="debitcard.cardUUID" :debitcard="debitcard" @activate="activateDebitCard(debitcard)" @deactivate="deactivateDebitCard(debitcard)" />
        </ul>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import axios from "../../axios-auth.js";
  import DebitCardItem from './DebitCardItem.vue';
  import Footer from '../../components/Footer.vue';
  
  export default {
    components: {
      Footer
    },
    name: "DebitCardList",
    data() {
      return {
        debitcards: []
      };
    },
    components: {
      DebitCardItem
    },
    mounted() {
      this.getDebitCards();
    },
    methods: {
      getDebitCards() {
        axios
          .get('/debitcards')
          .then((response) => {
            this.debitcards = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      activateDebitCard(debitcard) {
        axios
          .post('/{iban}/debitcards/activate', {
            cardUUID: debitcard.cardUUID,
            pin: debitcard.pin
          })
          .then((response) => {
            console.log('Debit card activated:', response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      deactivateDebitCard(debitcard) {
        axios
          .post('/{iban}/debitcards/deactivate', {
            cardUUID: debitcard.cardUUID
          })
          .then((response) => {
            console.log('Debit card deactivated:', response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  </script>
  <style scoped></style>
  
  