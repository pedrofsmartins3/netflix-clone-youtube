import axios from 'axios'

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})

export default instance;

{/* este axios é uma dependencia que me permite ao usar a instance sempre este este URL como base, e nao precisar de o escrever várias vezes */}