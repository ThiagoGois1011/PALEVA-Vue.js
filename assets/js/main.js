const establishmentCode = 'BLKGKV';

const app = Vue.createApp({
    data(){
        return{
            establishmentCode: establishmentCode,
            orderList: []
        }
    },
    mounted(){
        this.getOrders();
    },
    methods:{
        async getOrders(){
            fetch(`http://localhost:3000/api/v1/establishments/${establishmentCode}/orders?status=waiting_for_confirmation`)
            .then(data => data.json())
            .then(response =>{
                this.orderList = response.sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date))
            })
            .catch(error => console.log(error))
        },
        formatDate(date){
            const date = new Date(date)
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${
                                   (date.getMonth() + 1).toString().padStart(2, '0')}/${
                                   date.getFullYear()} 
                                   ${date.getHours().toString().padStart(2, '0')}:${
                                   date.getMinutes().toString().padStart(2, '0')}:${
                                   date.getSeconds().toString().padStart(2, '0')}`;

            return formattedDate;
        },
        detailsOrder(code){
            localStorage.setItem('orderCode', code);
            localStorage.setItem('establishmentCode', establishmentCode);

            window.location.href = '/assets/html/details.html';
        }

    }
});

app.mount('#app');