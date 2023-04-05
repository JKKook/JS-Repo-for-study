import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('Posts');
    }
    async getHtml() {
        return `
            <h1>This is Posts page</h1>
        `;
    }
}
