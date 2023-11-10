<template>
  <div>
    <div>
      <label for="name">Name:</label>
      <input v-model="searchByName" id="name" placeholder="Search by name..." />
    </div>

    <div>
      <label for="username">Username:</label>
      <input v-model="searchByUsername" id="username" placeholder="Search by username..." />
    </div>

    <div>
      <label for="email">Email:</label>
      <input v-model="searchByEmail" id="email" placeholder="Search by email..." />
    </div>

    <div>
      <label for="phone">Phone:</label>
      <input v-model="searchByPhone" id="phone" placeholder="Search by phone..." />
    </div>
    <div>
      <label for="street">Street:</label>
      <input v-model="searchByStreet" id="street" placeholder="Search by street..." />
    </div>
    <div>
      <label for="suit">Suit:</label>
      <input v-model="searchBySuit" id="suit" placeholder="Search by Suit..." />
    </div>
    <div>
      <label for="city">City:</label>
      <input v-model="searchByCity" id="city" placeholder="Search by city..." />
    </div>
    <div>
      <label for="website">Website:</label>
      <input v-model="searchBywebiste" id="phone" placeholder="Search by Website..." />
    </div>
    <div>
      <button @click="searchUsers">Seach</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Street</th>
          <th>Suit</th>
          <th>City</th>
          <th>Website</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.address.street }}</td>
          <td>{{ user.address.suite }}</td>
          <td>{{ user.address.city }}</td>
          <td>{{ user.website }}</td>
        </tr>
      </tbody>
    </table>

    <button @click="previousPage" :disabled="currentPage === 1">Previous Page</button>
    <button @click="nextPage" :disabled="currentPage === totalPages">Next Page</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const itemsPerPage = 3;
const currentPage = ref(1);
const searchByName = ref('');
const searchByUsername = ref('');
const searchByEmail = ref('');
const searchByPhone = ref('');
const searchBywebiste = ref('');
const searchByStreet = ref('');
const searchBySuit = ref('');
const searchByCity = ref('');

onMounted(() => {
  store.dispatch('fetchUsers');
});

const searchUsers = () => {
  currentPage.value = 1
  const searchQueries = {
    name: searchByName.value,
    username: searchByUsername.value,
    email: searchByEmail.value,
    phone: searchByPhone.value,
    website: searchBywebiste.value,
    "address.street":searchByStreet.value,
    "address.suit":searchBySuit.value,
    "address.city":searchByCity.value
  };
  store.dispatch('searchUsers', searchQueries);
}
const users = computed(() => {
  return store.getters.getUsers
})
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return users.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(users.value.length / itemsPerPage));

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};
</script>
