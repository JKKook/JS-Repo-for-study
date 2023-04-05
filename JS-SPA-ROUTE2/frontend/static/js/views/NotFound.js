import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('NotFound');
    }
    async getHtml() {
        return `
            <h1>NotFound</h1>
        `;
    }
}
