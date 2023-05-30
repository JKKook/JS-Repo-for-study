<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <div :class="{ body: true }">
        <ul
            :class="{ 'list-none': true, 'flex-column': true }"
            v-for="(product, index) in realStateMentProducts.products"
            :key="index"
        >
            <li>
                {{ product }}
            </li>
            <li>
                {{ realStateMentProducts.price[index] }}
            </li>
        </ul>
    </div>
</template>

<script>
import { reactive } from 'vue';
export default {
    name: 'App',
    // setup : Vue.3 버전
    setup() {
        // reactive 객체 생성 => return에 선언
        const realStateMentProducts = reactive({
            products: ['역삼동원룸', '천호동원룸', '서초동원룸'],
            price: [60, 100, 120],
            newProduct: '',
        });

        // 필요한 메서드 동작이 있다면 동일하게 로직 작성 후, return 문에서 선언
        const addProduct = () => {
            if (realStateMentProducts.newProduct) {
                realStateMentProducts.products.push(
                    realStateMentProducts.newProduct,
                );
                realStateMentProducts.price.push(0); // 새로운 상품의 가격을 추가해야 함
                realStateMentProducts.newProduct = '';
            }
        };

        // 선언된 순간 바인딩 가능
        return {
            realStateMentProducts,
            addProduct,
        };
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.body {
    margin: auto;
}

.list-none {
    list-style-type: none;
    padding: 0;
}

.flex-column {
    display: flex;
    flex-direction: column;
}
</style>
