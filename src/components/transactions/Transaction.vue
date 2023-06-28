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
          <div class="input-group">
            <label for="startDate">Start Date:</label>
            <input type="date" id="startDate" v-model="filter.startDate" />
          </div>

          <div class="input-group">
            <label for="endDate">End Date:</label>
            <input type="date" id="endDate" v-model="filter.endDate" />
          </div>

          <div class="input-group">
            <label for="maxAmount">Max Amount:</label>
            <input type="number" id="maxAmount" v-model="filter.maxAmount" />
          </div>

          <div class="input-group">
            <label for="minAmount">Min Amount:</label>
            <input type="number" id="minAmount" v-model="filter.minAmount" />
          </div>

          <div class="input-group">
            <label for="account">Account:</label>
            <input type="text" id="account" v-model="filter.account" />
          </div>
          
          <div class="input-group">
            <label for="fromOrTo">From/To:</label>
            <select v-model="filter.fromOrTo" class="custom-select">
              <option value=""> All Transactions </option>
              <option value="to"> Transactions I Sent </option>
              <option value="from"> Transactions I Received </option>
            </select>
          </div>

          <div class="input-group button-container">
            <button class="applyfilter" @click="submitFilter">Apply Filter</button>
          </div>
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
  display: flex;
  justify-content: center;
}
.filter-container {
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  /* border: 1px groove #6eeb94; */
  padding: 20px;
}

input[type="date"],
input[type="number"],
input[type="text"],
select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

input[type="date"]:focus,
input[type="number"]:focus,
input[type="text"]:focus,
select:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

select {
  appearance: none;
  /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23202020' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 2l2.5 3 2.5-3h-5z'/%3E%3C/svg%3E"); */
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 8px 8px;
  padding-right: 24px;
}
.input-group {
  margin-bottom: 10px;
  width: 50%;
  align-items: center;
  padding-left: 30px;
  
}

.input-group label {
  display: flex;
  margin-bottom: 5px;
}
.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
  
  