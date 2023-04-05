import AbstractView from './AbstractView.js';

// 추상 클래스를 상속 받아서 추상클래스(클래스 인터페이스 느낌?)의 매서드로 이용
export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('DashBoard');
    }
    async getHtml() {
        return `
            <h1>This is DashBoard</h1>
        `;
    }
}
