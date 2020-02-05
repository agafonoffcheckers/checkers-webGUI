/*
* BaseComponent {class}: Basic class for components.
* props {object}:
*   width {string/number} - width for a component.(default: null)
*   height {string/number} - height for a component.(default: null)
*   targetId {string} - an nId of element which this component should be rendered(default: null).
*   config {object} - configuration of component.(default: null)
*   items {object} - child elements of component.
*   style {object} - css for component.
*   reference {string} - query dom reference.
*   store {object} - an array, with data of component.
*   cls {string} - name of the CSS/SASS class.
* */

export default class BaseComponent{
    constructor(props) {
        this.width = props.width || null;
        this.height = props.height || null;
        this.targetId = props.targetId || null;
        this.config = props.config || {};
        this.items = props.items || [];
        this.style = props.style || [];
        this.reference = props.reference || null;
        this.store = props.store || [];
        this.cls = props.cls || null;
    }

    /**
    *  @Public methods.
    * */

    setWidth(value) {
        if(value <= 1 && typeof(value) !== 'string') {
            this.dom.style.width = value*100 + '%';
        }
        else {
            this.dom.style.width = value + 'px';
        }

        return this;
    }

    getWidth() {
        return parseInt(this.dom.style.width,10);
    }

    setHeight(value) {
        if(value <= 1 && typeof(value) !== 'string') {
            this.dom.style.height = value*100 + '%';
        }
        else {
            this.dom.style.height = value + 'px';
        }

        return this;
    }

    getHeight() {
        return parseInt(this.dom.style.height,10);
    }

    getId() {
        return this.id;
    }

    setAttribute(name, value) {
        this.dom.setAttribute(name, value);
        return this;
    }
    getAttribute(name){
        return this.dom.getAttribute(name);
    }

    getStore() {
        return this.store;
    }

    getElement() {
        return this.dom;
    }

    render(target) {
        if(this.config.rendered) {
            return this;
        }
        const container = document.getElementById(target || this.targetId);

        target ? this.targetId = target : null;

        if(!container) {
            console.error(`Couldn't get element by id '${this.targetId}'. Rendering is stop.`);
            return;
        }

        this.setId();
        this.setContainer();

        /*  Rendering.  */
        container.appendChild(this.dom);
        this.renderInnerChild(this.items);

        this.config.rendered = true;

        return this;
    }

    /**
    * @Private methods.
    * */

    setId() {
        !this.id && this.constructor.id ? this.id = this.constructor.id++ : this.id = 0;
    }

    setContainer() {
        this.dom = document.createElement('div');
        this.setWidth(this.width);
        this.setHeight(this.height);

        this.cls && this.setCls();

        this.setStyles(this.style);

        /*  Marks this component into DOM system. */
        this.selfId = 'component-'+this.id;
        this.setAttribute('id', this.selfId);

        return this.dom;
    }

    setStyles(style) {
        Object.assign(this.dom.style, style);
    }

    setCls(cls) {
        this.dom.setAttribute('class', cls);
    }

    renderInnerChild(child) {
        child.forEach(item => {
            item.render(this.selfId);
        })
    }
}