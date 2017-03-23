/**
 * The presenter of ButtonWidget
 * Created by diego on 22/03/17.
 * Version 1.0.0 -
 */

class ButtonWidgetPresenter {

    /**
     * @type {Object} : the ButtonWidgetView element for the presenter
     */
    _view;

    /**
     * @type {string} : the text contained by the ButtonWidget.
     */
    _text;

    /**
     * @type {Object} : the function to be performed on the click of the ButtonWidget
     */
    _onClickAction;

    /**
     * @type {Object} : the function to be performed on the extended click of the ButtonWidget
     */
    _onLongClickAction;

    /**
     * @type {number} : the number of milliseconds that are needed to keep the ButtonWidget clicked before the long click action triggers
     */
    _millisecondsBeforeOnLongClickActs;

    /**
     * @type {Object} : the object that contains the style options of the ButtonWidget
     */
    _graphics;

    /**
     * @constructor
     * Constructor of ButtonWidgetPresenter
     * @param {Object} view
     */
    constructor(view) {
        this._view= view;
        this._text= '';
        this._graphics= new ButtonGraphics();
        this._millisecondsBeforeOnLongClickActs = 0;
        this._onClickAction = null;
        this._onLongClickAction = null;
    }

    /**
     * @method
     * Allows to set the text contained in the ButtonWidget
     * @param text {string}
     */
    setText(text) {
        if (typeof text == "string")
            this._graphics.setText(text);
        else
            throw new TypeError("Parameter text type must be a string");
    }

    /**
     * @method
     * Returns the text contained in the ButtonWidget.
     */
    getText() {
        return this._text;
    }

    /**
     * @method
     * Allows to set the width of the ButtonWidget
     * @param width {number}
     */
    setWidth(width) {
        this._graphics.setWidth(width);
    }

    /**
     * @method
     * Allows to set the height of the ButtonWidget
     * @param height {number}
     */
    setHeight(height) {
        this._graphics.setHeight(height);
    }

    /**
     * @method
     * Allows to set the color of the ButtonWidget
     * @param color {number}
     */
    setBackgroundColor(color) {
        this._graphics.setBackgroundColor(color);
    }

    /**
     * @method
     * Allows to set a function to be performed on the click of the ButtonWidget
     * @param action {Object}
     */
    setOnClickAction(action) {
        this._onClickAction = action;
    }

    /**
     * @method
     * Allows to set a function to be performed on the extended click of the ButtonWidget
     * @param action {Object}
     */
    setOnLongClickAction(action) {
        this._onLongClickAction = action;
    }

    /**
     * @method
     * Allows to set the number of milliseconds that is needed to keep the ButtonWidget clicked before the long click action triggers
     * @param milliseconds {number}
     */
    setOnLongClickActionTimer(milliseconds) {
        this._millisecondsBeforeOnLongClickActs = milliseconds;
    }

    /**
     * @method
     * Returns HTML, CSS and JS code that is necessary to display the ButtonWidget
     */
    renderView() {
        // TODO: CSS and JS things here

        let html= '';

        //maybe here using an id is better so not every button is the same
        html= '<div class="container"> ' +
            '<button class="button" type="button">'+ this.getText() +'</button>' +
            '</div>';

        return html;
    }
}