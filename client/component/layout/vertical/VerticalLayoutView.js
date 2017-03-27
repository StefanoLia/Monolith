/**
 * Created by Stefano Lia on 21/03/2017
 * Version 1.0.0 - 1.0.0
 */
import {BaseLayout} from "../BaseLayout"

export class VerticalLayoutView extends BaseLayout{

    /**
     * @constructor
     * Constructor of VerticalLayoutView.
     */
    constructor(){
        super();
        this._dom = null;
        this._map = new Monolith.can.DefineMap({items: []})
    }

    /**
     * @method
     * This function create HTML to render an Vertical Layout for a Bubble.
     * @return {DocumentFragment} Returns the rendered view as a string.
     */
    renderView(){
        if(this._dom === null) {
            this._dom = document.createElement("div");
            let items = this.getItems();
            for(let i = 0; i < items.length; i++){
                this._dom.append(items[i].renderView());
            }
        }
        return this._dom;

    }


    addItem(component) {
        super.addItem(component);
        if(this._dom !== null){
            this._dom.appendChild(component.renderView());
        }
    }
}
