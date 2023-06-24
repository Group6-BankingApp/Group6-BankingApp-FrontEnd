<template>
  <div>
    <br><br> <h2>Debit Cards</h2><br><br>
    <div class="debitcards-list">
      <div class="card">
        <div class="row">
          <div class="col-md-6">
            <img src="src/assets/img/creditcard.jpg" alt="Image" class="img-fluid" />
          </div>
          <div class="col-md-6 button-container">
            <button type="button" class="btn btn-outline-info btn-lg btn-block">Activate</button>
            <button type="button" class="btn btn-outline-danger btn-lg btn-block">Deactivate</button>
          </div>
        </div>
      </div>
      <ul>
        <debit-card-item v-for="debitcard in debitcards" :key="debitcard.cardUUID" :debitcard="debitcard"
          @activate="activateDebitCard(debitcard)" @deactivate="deactivateDebitCard(debitcard)" />
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
    Footer,
    DebitCardItem
  },
  name: "DebitCardList",
  data() {
    return {
      debitcards: []
    };
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
<style scoped>
.img-fluid {
  max-width: 100%;
  height: 350px;
  padding-right: 120px;
  border-radius: 40px;
}

.card {
  border-radius: 40px;
  border: 0.5px groove #c4e4cf;
  box-shadow: 2px 2px 2px 2px rgba(129, 231, 146, 0.9);
  padding: 20px;
  margin: 0 auto; 
  margin-bottom: 20px;
  background-color: #fff;
  width: 80%; 
  height: 400px;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px; 
}
.button-container button {
  width: 100%;
  margin-bottom: 30px;
}
h2 {
    color: #0f642b;
    text-align: center;
  }
</style>
  
  