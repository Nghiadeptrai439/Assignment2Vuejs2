

Vue.component("component-table", {
    data: function () {
        return {
            listProducts: [],
            loading: false,
            order: 1,
            searchText: null,
            ccn: null,
            currentPage: 1,
            itemsPerPage: 10,
            resultCount: 1,
            keyword: '',
            sortva: '',
            isCheckAll: false,
            languages: [],
            selectedlang: "",
            ischeck: []

        }
    },

    // data: {
    //     listProducts: [],
    //     loading: false,
    //     order: 1,
    //     searchText: null,
    //     ccn: null,
    //     currentPage: 1,
    //     itemsPerPage: 10,
    //     resultCount: 1,
    //     keyword: '',
    //     sortva: '',
    //     isCheckAll: false,
    //     languages: [],
    // selectedlang: "",
    // ischeck:[]

    // },
    created() {
        fetch('https://mocki.io/v1/c82e0892-71f3-41bc-abb7-0b034206d07c')
            .then(res => res.json())
            .then(res => {
                this.listProducts = res;
                console.log(JSON.parse(localStorage.getItem('check')).length);
                if (localStorage.getItem('check')) {
                    this.ischeck = JSON.parse(localStorage.getItem('check'));
                    this.languages = this.ischeck
                }
                if (this.ischeck.length == this.listProducts.length) {
                    this.isCheckAll = true
                }
            });





    },
    computed: {
        totalPages: function () {
            console.log(Math.ceil(this.resultCount / this.itemsPerPage) + "totalPages");
            return Math.ceil(this.resultCount / this.itemsPerPage);

        },
        paginate: function (list) {
            console.log(this.listProducts);
            this.resultCount = this.listProducts.length;
            console.log(this.resultCount + " Result count");
            console.log(this.currentPage + " current page");
            console.log(this.itemsPerPage + " items per page");
            console.log(this.totalPages + " Total pages 2");
            if (this.currentPage >= this.totalPages) {
                this.currentPage = Math.max(0, this.totalPages - 1);
            }
            var index = this.currentPage * this.itemsPerPage;
            console.log(index + " index");
            console.log(this.listProducts.toString().slice(index, index + this.itemsPerPage));
            return this.listProducts.slice(index, index + this.itemsPerPage);
        },
        items() {
            return this.keyword
                ? this.listProducts.filter(item => item.name.toLowerCase().includes(this.keyword.toLowerCase()) || item.id.includes(this.keyword.toLowerCase()))
                : this.paginate
        }
    },
    watch: {
        sortva() {
            if (this.sortva == 't') {
                //this.listProducts.sortBy('name');
                this.listProducts.sort((a, b) => a.name > b.name ? 1 : -1);
            }
            else {
                console.log(this.sortva);
                this.listProducts.sort((a, b) => a.name < b.name ? 1 : -1);
            }
            console.log(sortedObjs);
        },
        languages() {

            console.log(this.languages);
        }
    },
    methods: {
        setPage: function (pageNumber) {
            this.currentPage = pageNumber;
        },
        // checkAll: function() {
        //     console.log('3');
        //     document.getElementById("checkAll").indeterminate = true;
        //   },
        checkAll: function () {
            document.getElementById("checkAll").indeterminate = true;
            this.isCheckAll = !this.isCheckAll;
            this.languages = [];
            if (this.isCheckAll == true) { // Check all
                this.languages = []
                for (var key in this.listProducts) {
                    this.languages.push(this.listProducts[key]);
                }
            }
        },
        updateCheckall: function (item) {
            if (this.languages.length == this.listProducts.length) {
                this.isCheckAll = true;
            } else {

                this.isCheckAll = false;
            }
        },
        save: function () {
            if (this.languages.length > 0) {
                const localupdate = this.ischeck;
                this.languages.forEach(element => localupdate.push(element));
                localStorage.removeItem('check')
                localStorage.removeItem("checkall")
                localStorage.setItem("check", JSON.stringify(this.languages));
                if (this.languages.length == this.listProducts.length) {
                    localStorage.setItem("checkall", JSON.stringify(this.isCheckAll));
                }

            }
            else {
                localStorage.removeItem('check')
                localStorage.removeItem("checkall")
            }

        },
        previous: function () {
            if (this.currentPage > 0) {
                this.currentPage = this.currentPage - 1
            }

        },
        next: function () {
            if (this.currentPage < this.totalPages) {
                this.currentPage = this.currentPage + 1
            }

        },
    },
    template:
        ` 
    <div class="product">
    <h1>Add product </h1>
    <div class="product__header">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13.8906 13.5742L10.582 10.2656C10.5 10.2109 10.418 10.1562 10.3359 10.1562H9.98047C10.8281 9.17188 11.375 7.85938 11.375 6.4375C11.375 3.32031 8.80469 0.75 5.6875 0.75C2.54297 0.75 0 3.32031 0 6.4375C0 9.58203 2.54297 12.125 5.6875 12.125C7.10938 12.125 8.39453 11.6055 9.40625 10.7578V11.1133C9.40625 11.1953 9.43359 11.2773 9.48828 11.3594L12.7969 14.668C12.9336 14.8047 13.1523 14.8047 13.2617 14.668L13.8906 14.0391C14.0273 13.9297 14.0273 13.7109 13.8906 13.5742ZM5.6875 10.8125C3.25391 10.8125 1.3125 8.87109 1.3125 6.4375C1.3125 4.03125 3.25391 2.0625 5.6875 2.0625C8.09375 2.0625 10.0625 4.03125 10.0625 6.4375C10.0625 8.87109 8.09375 10.8125 5.6875 10.8125Z"
                fill="#8F90A6" />
        </svg>
        <input type="text" class="product__header--search"  v-model="keyword"  placeholder="Search product by name, tag, id...">

        <select v-model="sortva">
            <option value="t">
                Product title A - Z
            </option>
            <option value="g">
                Product title Z - A
            </option>
        </select>
    </div>
    <div class="product__nav">


    </div>
    <div class="product__body">

        <table id="product-list"> 
            <thead>
                <tr>
                    <th class="product__body--thcheckbox"><input type="checkbox" v-model="isCheckAll" @click="checkAll()" id="checkAll" ></th>
                    <th class="product__body--thproduct">{{languages.length}} Product</th>
                    <th class="product__body--thprice">Price</th>
                </tr>
            </thead>
            
            <tbody style="width: 600px;"> 
                <tr v-for="(product,key, index) in items">
                    <td><input type="checkbox" v-bind:value="product" v-model="languages" @change="updateCheckall()"/></td>
                    <td>
                        <div><img :src="product.image" style="width: 32px; height: 32px;" /></div>
                        <div> <p>{{product.name}}</p> <p>{{product.id}}</p> </div>
                        
                    </td>
                    <td>&#36;{{product.price}}</td>
                </tr>                  
            </tbody> 
                
            
        </table>
    </div>
    <div class="product__footer">
    <div class="product__footer--btnlist" style=" display: flex;">
        <button @click="previous()"><svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 9L1 4.99161L5 1" stroke="#8F90A6" stroke-linecap="round" stroke-linejoin="round" />
            </svg> Prev
        </button>
        
        <button @click="next()">Next <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 4.99161L1 9" stroke="#8F90A6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
        </button>
    </div>

    <div class="product__footer--btn">
        <button>Cancel</button>
        <button id="save" @click="save()" >Save</button>
    </div>

</div>
    </div>    
          `
})
new Vue({ el: "#product" });
