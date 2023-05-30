<template>
    <div :class="{ menu: true }">
        <a
            :class="{ 'menu-tag': true }"
            v-for="(tags, index) in menuTags.tags"
            :key="index"
        >
            {{ tags }}
        </a>
    </div>
    <div :class="{ body: true }">
        <ul
            :class="{ 'product-lists': true, 'flex-column': true }"
            v-for="(product, index) in realStateMentProducts.products"
            :key="index"
        >
            <li :class="{ list: true }">
                {{ product }}
            </li>
            <img
                src="https://img.freepik.com/free-photo/sun-district-blue-business-tower_1112-1041.jpg"
                alt="부동산매물1"
            />
            <li :class="{ 'list-price': true }">
                {{ realStateMentProducts.price[index] }}만원
            </li>
            <li>
                <button
                    :class="{ 'list-button': true }"
                    @click="increaseNumber(index)"
                >
                    허위매물신고
                </button>
                <span>신고 수 : {{ fakeProduct[index] }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
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

        const menuTags = reactive({
            tags: ['Home', 'Shop', 'About'],
        });

        // products에 해당하는 값만을 선택하고 싶어서 빈 배열을 인덱스 수 만큼 늘렸다
        const fakeProduct = ref([0, 0, 0]);

        // 필요한 메서드 동작이 있다면 동일하게 로직 작성 후, return 문에서 선언

        const increaseNumber = (index) => {
            alert('신고접수가 성공적으로 완료되었습니다');
            fakeProduct.value[index]++;
        };

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
            menuTags,
            fakeProduct,
            increaseNumber,
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

.menu {
    display: flex;
    justify-content: space-around;
    background-color: #2c3e50;
    color: white;
    margin: 3rem;
    padding: 1rem 0;
}

.menu-tag {
    cursor: pointer;
    font-weight: 600;
    font-size: 1.5rem;
}

.product-lists > li {
    list-style-type: none;
    padding: 0;
    margin: 1rem 0;
}

.list {
    margin-top: 2rem;
    font-size: 2rem;
}

.list-price {
    font-size: 1.5rem;
    color: coral;
    font-weight: 800;
}

.list-button {
    border: none;
    font-size: 1.2rem;
    background-color: #2c3e50;
    padding: 0.5rem;
    color: aliceblue;
    cursor: pointer;
    margin-top: 1rem;
    margin-bottom: 4rem;
    margin-right: 2rem;
}

.list-button:hover {
    background-color: darkred;
}

.flex-column {
    display: flex;
    flex-direction: column;
}
</style>
