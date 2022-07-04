Vue.component('component-table',{
    el: '#product',

    template: ` 
    <div>
        <h1>Add product</h1>
        <div class="product__header">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13.8906 13.5742L10.582 10.2656C10.5 10.2109 10.418 10.1562 10.3359 10.1562H9.98047C10.8281 9.17188 11.375 7.85938 11.375 6.4375C11.375 3.32031 8.80469 0.75 5.6875 0.75C2.54297 0.75 0 3.32031 0 6.4375C0 9.58203 2.54297 12.125 5.6875 12.125C7.10938 12.125 8.39453 11.6055 9.40625 10.7578V11.1133C9.40625 11.1953 9.43359 11.2773 9.48828 11.3594L12.7969 14.668C12.9336 14.8047 13.1523 14.8047 13.2617 14.668L13.8906 14.0391C14.0273 13.9297 14.0273 13.7109 13.8906 13.5742ZM5.6875 10.8125C3.25391 10.8125 1.3125 8.87109 1.3125 6.4375C1.3125 4.03125 3.25391 2.0625 5.6875 2.0625C8.09375 2.0625 10.0625 4.03125 10.0625 6.4375C10.0625 8.87109 8.09375 10.8125 5.6875 10.8125Z"
                    fill="#8F90A6" />
            </svg>
            <input type="text" class="product__header--search" placeholder="Search product by name, tag, id...">

            <select>
                <option>
                    Product title A - Z
                </option>
            </select>
        </div>
        <div class="product__nav">


        </div>
        <div class="product__body">

            <table id="product-list"> 
                <thead>
                    <tr>
                        <th class="product__body--thcheckbox"><input type="checkbox"></th>
                        <th class="product__body--thproduct">Product</th>
                        <th class="product__body--thprice">Price</th>
                    </tr>
                </thead>
                <component-table-body></component-row>
            </table>
        </div>

        <div class="product__footer">
            <div class="product__footer--btnlist">
                <button><svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 4.99161L5 1" stroke="#8F90A6" stroke-linecap="round" stroke-linejoin="round" />
                    </svg> Prev
                </button>
                <button>Next <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 4.99161L1 9" stroke="#8F90A6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    
                </button>
            </div>

            <div class="product__footer--btn">
                <button>Cancel</button>
                <button id="save" @click="created()">Save</button>
            </div>

        </div>   
    </div>
              `

})