/**
 * The view for TextWidget
 * Created by Diego on 21/03/17
 *
 * Version 1.0.3 - Completed
 */

import {BaseWidget} from "../BaseWidget"
import './TextWidget.less';

export class TextWidgetView extends BaseWidget{

    /**
     * @constructor
     * The constructor of TextWidgetView
     * @return {Object}
     */
    constructor(){
        //noinspection JSAnnotator,JSAnnotator,JSAnnotator
        super();
        //noinspection JSPotentiallyInvalidConstructorUsage
        if (this.constructor === TextWidgetView) {
            throw new TypeError("Cannot construct TextWidgetView instances directly");
        }
    }

    /**
     * @method
     * Returns the text of the widget
     * @return {string} : text of the widget
     */
    getText(){}

    /**
     * @method
     * Returns the color of the text
     * @return {string} : color of the text
     */
    getColor(){}

    /**
     * @method
     * Allows to set the text in the TextWidget
     * @param text {string}
     */
    setText(text) {} //NOSONAR

    /**
     * @method
     * Allows to set the color of the text in the TextWidget
     * @param color {string}
     */
    setTextColor(color) {} //NOSONAR

    /**
     * @method
     * Allows to choose if format the text contained in the TextWidget with markdown or not
     * @param format {boolean}
     */
    setFormatText(format) {} //NOSONAR

    /**
     * @method
     * Allows to set the color of the URLs contained in the text of the TextWidget
     * @param color {string}
     */
    setUrlHighlightColor(color) {} //NOSONAR

    /**
     * @method
     * Allows to set the size of the text contained in the TextWidget
     * @param size {number}
     */
    setTextSize(size) {} //NOSONAR

    /**
     * @method
     * It allows you to set the visibility value of the TextStyle
     * @param value {boolean}
     */
    setVisibility(value){}

    /**
     * @method
     * It allows you to get the visibility value of the TextStyle
     */
    getVisibility(){}
}
