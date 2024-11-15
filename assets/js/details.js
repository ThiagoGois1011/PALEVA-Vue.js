const app = Vue.createApp({
    data(){
        return{
            establishmentCode: localStorage.getItem('establishmentCode'),
            orderCode: localStorage.getItem('orderCode'),
            order: {}
        }
    },
    mounted(){
        fetch(`http://localhost:3000/api/v1/establishments/${this.establishmentCode}/orders/${this.orderCode}`)
        .then(data => data.json())
        .then(data => this.order = data)
        .catch(error => console.log(error));
    },
    methods:{
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
        formatMoney(value){
            const formated = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(value);

            return formated;
        },
        acceptOrder(){
            fetch(`http://localhost:3000/api/v1/establishments/${this.establishmentCode}/orders/${this.orderCode}/accept_order`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(data => {
                if (data.status == 200) {
                    alert('Alteração feita com sucesso.')
                    this.order.status = 'in_preparation'
                }
            })
        },
        readyOrder(){
            fetch(`http://localhost:3000/api/v1/establishments/${this.establishmentCode}/orders/${this.orderCode}/ready`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(data => {
                if (data.status == 200) {
                    alert('Alteração feita com sucesso.')
                    this.order.status = 'ready'
                }
            })
        }
    }
});

app.mount('#app');