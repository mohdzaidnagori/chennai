import axios from 'axios';


export default axios.create({
    baseURL:"https://www.skilliza.com/laravel-video/public/api",
    headers:{
        "Content-type":"application/json",
    }
})