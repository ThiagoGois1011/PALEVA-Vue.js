const establishmentCode = 'BLKGKV';

const app = Vue.createApp({
    data(){
        return{
            establishmentCode: establishmentCode,
            orderListPending: [],
            orderListPreparation: [],
            orderListReady: []
        }
    },
    mounted(){
        this.getOrders();
        console.log('monted');
        
    },
    methods:{
        async getOrders(){
            fetch(`http://localhost:3000/api/v1/establishments/${establishmentCode}/orders`, {
                method: 'GET',
                headers: {
                  'Cache-Control': 'no-cache',
                },
              })
            .then(data => data.json())
            .then(response =>{
                this.orderListPending = this.sortedOrder(response.filter(item => item.status == 'waiting_for_confirmation'))
                this.orderListPreparation = this.sortedOrder(response.filter(item => item.status == 'in_preparation'))
                this.orderListReady = this.sortedOrder(response.filter(item => item.status == 'ready'))
            })
            .catch(error => console.log(error))
        },
        formatDate(date){
            date = new Date(date)
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
        },
        sortedOrder(orders){
            return orders.sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date))
        }

    }
});

app.mount('#app');
