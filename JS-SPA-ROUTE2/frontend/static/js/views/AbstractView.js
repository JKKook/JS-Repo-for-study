// 객체지향프로그래밍 언어(대표 자바)에서 자주쓰이는 형태로
// 딱히 무엇인가를 지정하지 않고 원하는 모양의 틀만 만들어서 다른 클래스에 상속 시키는 역할
export default class {
    constructor() {}

    // 다른 클래스에서 원하는 타이틀을 정해서 사용 할 매서드
    setTitle(title) {
        document.title = title;
    }
    // innerHTML에 연결 시키는 매서드
    async getHtml() {
        return '';
    }
}
