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
    <div :class="{ container: true }">
        <ul
            :class="{ 'product-lists': true, 'flex-column': true }"
            v-for="(product, index) in realStateMentProducts"
            :key="product.id"
        >
            <li :class="{ list: true }">
                {{ product.title }}
            </li>
            <!-- 속성을 바인딩할 때는 :를 태그 앞에 넣어줘야한다 -->
            <img :src="product.image" alt="부동산매물" />
            <li :class="{ 'list-price': true }">{{ product.price }}만원</li>
            <!-- index에 따른 모달창 컨텐츠 반환 -->
            <button @click="openModal(index)" :class="{ 'list-button': true }">
                상세정보
            </button>
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
        <!-- 모달 창  v-if는 조건식-->
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <h2>상세정보</h2>
                <p>{{ realStateMentProducts[showModalContent].content }}</p>
                <button @click="closeModal">닫기</button>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { dummy } from './components/data/dummy';
export default {
    name: 'App',
    // setup : Vue.3 버전
    setup() {
        // ** data
        // reactive 객체 생성 => return에 선언
        const realStateMentProducts = reactive(
            dummy.map((data) => ({
                id: data.id,
                title: data.title,
                price: data.price,
                image: data.image,
                content: data.content,
            })),
        );

        const menuTags = reactive({
            tags: ['Home', 'Shop', 'About'],
        });

        // products에 해당하는 값만을 선택하고 싶어서 빈 배열을 인덱스 수 만큼 늘렸다
        const fakeProduct = ref(Array(dummy.length).fill(0));

        // modal
        const showModal = ref(false);
        // modalContent
        const showModalContent = ref(null); // 선택된 상품의 인덱스 저장

        // ** methods
        // 필요한 메서드 동작이 있다면 동일하게 로직 작성 후, return 문에서 선언
        const increaseNumber = (index) => {
            alert('신고접수가 성공적으로 완료되었습니다');
            fakeProduct.value[index]++;
        };

        // modal interaction
        const openModal = (index) => {
            showModal.value = true;
            showModalContent.value = index; // index를 부여
            // console.log('모달창콘텐트', showModalContent.value);
        };
        const closeModal = () => {
            showModal.value = false;
        };

        // 선언된 순간 바인딩 가능
        return {
            realStateMentProducts,
            menuTags,
            fakeProduct,
            showModal,
            showModalContent,
            increaseNumber,
            openModal,
            closeModal,
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

.container {
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

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

.modal-content {
    width: 400px;
    max-width: 90%;
    background-color: #fff;
    padding: 2rem;
    border-radius: 4px;
}
</style>
