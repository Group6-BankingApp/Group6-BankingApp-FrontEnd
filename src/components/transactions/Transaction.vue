<template>
  <div>
    <div class="title-container">
      <div class="card filter-card">
        <div>
          <br>
          <h2>Transactions</h2> <br><br>
          <pre><i>           Date       |           Sender            |            Receiver          |      Amount</i></pre>
          <br>
          <div class="card-body">
            <div class="account-list">
              <ol class="numbered-list">
                <transaction-item v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" />
              </ol>
            </div>
          </div>
        </div>
        <div class="filter-container">
          <label for="startDate">Start Date:</label>
          <input type="date" id="startDate" v-model="filter.startDate" />

          <label for="endDate">End Date:</label>
          <input type="date" id="endDate" v-model="filter.endDate" />

          <label for="maxAmount">Max Amount:</label>
          <input type="number" id="maxAmount" v-model="filter.maxAmount" />

          <label for="minAmount">Min Amount:</label>
          <input type="number" id="minAmount" v-model="filter.minAmount" />

          <label for="account">Account:</label>
          <input type="text" id="account" v-model="filter.account" />
          
          <select v-model="filter.fromOrTo" class="custom-select">
            <option value=""> All Transactions </option>
            <option value="to"> Transactions I Sent </option>
            <option value="from"> Transactions I Received </option>
          </select>
          <button @click="submitFilter">Apply Filter</button>
        </div>
        <br><br><br>
        <Footer />
        <div class="datetime">{{ currentDateTime }}</div>
      </div><br><br><br><br><br>
    </div>
  </div>
</template>
  
  <script>
  import axios from '../../axios-auth.js';
  import Footer from '../../components/Footer.vue';
  import TransactionItem from './TransactionItem.vue';
  
  export default {
    components: {
      TransactionItem,
      Footer
    },
    data() {
      return {
        transactions: [],
        filter: {
          startDate: '',
          endDate: '',
          maxAmount: 1000000,
          minAmount: 0,
          account: '',
          fromOrTo: ''
        },
      };
    },
    mounted() {
      this.fetchTransactions();
    },
  methods: {
    fetchTransactions() {
      axios
        .get('/transactions/customer/' + this.$route.params.iban)
        .then(response => {
          this.transactions = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    submitFilter() {
      // Assign default values to start and end dates if they are empty strings
      const startDate = this.filter.startDate !== '' ? this.filter.startDate : '2000-01-01';
      const endDate = this.filter.endDate !== '' ? this.filter.endDate : '2099-12-31';
      const maxAmount = this.filter.maxAmount !== '' ? this.filter.maxAmount : 99999999999;
      const minAmount = this.filter.minAmount !== '' ? this.filter.minAmount : 0;

        // Create the filter object with the updated start and end dates
        const filter = {
          startDate,
          endDate,
          maxAmount,
          minAmount,
          account: this.filter.account || '',
          fromOrTo: this.filter.fromOrTo || ''
        };
        console.log(this.filter);
        axios
          .post('/transactions/customer/'+this.$route.params.iban +'/filter', filter)
          .then(response => {
            this.transactions = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
    }
};
</script>

<style scoped>
.title-container {
  text-align: center;
  margin-bottom: 20px;
}

.filter-card {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #bfe9cc;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 90%;
  margin: 0 auto;
  border: 0.5px groove #c4e4cf;
}

.card-body {
  padding: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.transactions {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

h2 {
  color: #0f642b;
  text-align: center;
}

pre {
  color: #030303;
  text-align: center;
  font-size: 15px;
}

.datetime {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: #070707;
}

.applyfilter {
  padding: 15px 30px;
  font-size: 20px;
  background-color: #0f642b;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-weight: normal;
  margin-top: 50px;
}
.filter-container {
  margin-top: 50px;
}
</style>
  
  