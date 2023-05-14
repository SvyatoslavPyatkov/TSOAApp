<template>
    <div class="home">
        <form v-on:submit.prevent="sendData">
            <div class="form-control">
                <label for="name">Name</label>
                <input v-model="name" id="name" type="text">
            </div>
            <div class="form-control">
                <label for="email">Email</label>
                <input v-model="email" id="email" type="email">
            </div>
            <div class="form-control">
                <label for="address">Address</label>
                <input v-model="address" id="address" type="text">
            </div>
            <div class="form-control">
                <label for="gender">Gender</label>
                <span>
                    Male 
                    <input v-model="gender" id="gender" type="radio" value="male">
                </span>
                <span>
                    Female 
                    <input v-model="gender" id="gender" type="radio" value="female">
                </span>
            </div>
            <input type="submit" class="send" value="Send">
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'HomeView',
    data() {
        return {
            name: '',
            email: '',
            address: '',
            gender: ''
        }
    },
    methods: {
        async sendData() {
            await axios.post('/api/records', {
                name: this.name,
                email: this.email,
                address: this.address,
                gender: this.gender
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            console.log(this.name, this.email, this.address, this.gender);
        }
    }
}
</script>

<style>
    .form-control {
        padding: 5px;
    } 
    .form-control label {
        display: block;
    }
    .send {
        margin: 5px
    }
</style>