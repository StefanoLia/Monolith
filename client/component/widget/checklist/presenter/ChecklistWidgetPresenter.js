/**
 * The presenter of ChecklistWidget.
 * Created by Francesco Bazzerla on 21/03/17.
 * Version 1.0.0 - 1.0.0
 */

import {container, singleton, inject} from 'dependency-injection-es6';
import {CheckStyle} from '../style/CheckStyle';
import {CheckOption} from '../options/CheckOption';
import './checklist.css';

export class ChecklistWidgetPresenter{

    /**
     * Public Constructor
     */
    constructor(){
        this._view = null;
        this._dom = null;
        this._options = [];
        this._style = new CheckStyle();
        this._completionMessage = '';
    }

    /**
     * @method
     * It allows you to add a reference of the view to the presenter
     * @param view {Object}
     */
    setView(view){
        this._view = view;
    }

    /**
     * @method
     * It allows you to add a new item into the checklist
     * @param optionText {string}
     * @param check {boolean}
     */
    addOption(optionText,check){
        let opt = new CheckOption();
        opt.setText(optionText);
        opt.setChecked(check);
        this._options.push(opt);
    }

    /**
     * @method
     * It allows you to assign to all items of the checklist the function that will be performed on normal click
     * @param onClick {function}
     */
    setOptionsOnClick(onClick){
        for(let i in this._options) {
            this._options[i].setOnClick(onClick);
        }
    }
    /**
     * @method
     * It allows you to assign to all items of the checklist the function that will be performed on long click
     * @param onLongClick {function}
     */
    setOptionsOnLongClick(onLongClick){
        for(let i in this._options) {
            this._options[i].setOnLongClick(onLongClick);
        }
    }

    /**
     *@method
     * It allows you to remove an item from a checklist
     * @param id {String,number} If it's an Integer value the method removes the item in the specified position.
     * If it's a String value the method removes the item with the specified id.
     */
    removeOption(id){
        if(Number.isInteger(id)){
            if(id>=1) {
                if(id === this._options.length-1){
                    this._options = this._options.slice(0,this._options.length-1);
                }
                else{
                    let optionsFirstSlice = this._options.slice(0, id - 1);
                    let optionsSecondSlice = this._options.slice(id + 1, this._options.length);
                    this._options = optionsFirstSlice.concat(optionsSecondSlice);
                }
            }
            if(id==0){
                this._options = this._options.slice(1, this._options.length);
            }
        }
        else{
            for(let i in this._options){
                if(this._options[i].getId() === id){
                    if(i >= 1) {
                        if(i === this._options.length-1){
                            this._options = this._options.slice(0,this._options.length-1);
                        }
                        else{
                            let optionsFirstSlice = this._options.slice(0, i - 1);
                            let optionsSecondSlice = this._options.slice(i + 1, this._options.length);
                            this._options = optionsFirstSlice.concat(optionsSecondSlice);
                        }
                    }
                    if(i === 0){
                        this._options = this._options.slice(1, this._options.length);
                    }
                    break;
                }
            }
        }
    }

    /**
     *@method
     *It allows you to check an item on the checklist or to remove a tick from it.
     * @param checked {boolean}
     * @param position {number}
     */
    setChecked(checked,position){
        this._options[position].setChecked(checked);
    }

    /**
     *@method
     *Sets the symbol of checkmarks.
     * @param character {String}
     */
    setSelectionCharacter(character){
        this._style.setSelectionCharacter(character);
    }

    /**
     * @method
     *Sets the visualization of tick with a character or with a color.
     * @param useMark {boolean}
     */
    setUseSelectionMark(useMark){
        this._style.setUseSelectionMark(useMark);
    }

    /**
     *@method
     *Sets the color of checkmarks.
     * @param color {String}
     */
    setSelectionColor(color){
        this._style.setSelectionColor(color);
    }

    /**
     *@method
     *Sets the completion message appears when all of the list options are checked.
     * @param message {String}
     */
    setCompletionMessage(message){
        this._completionMessage = message;
    }

    /**
     * @method
     * Generates HTML CSS JS needed to display the widget.
     * @return {Object}
     */
    renderView() {
        this._dom = document.createElement('div');
        this._dom.setAttribute('class', 'checkbox');

        /**
         * Temporary variables
         */
        let symbol = this._style.getSelectionCharacter();
        let color = this._style.getSelectionColor();
        let completionMessage = this._completionMessage;

        /**
         * Generate html
         */
        for (let i in this._options) {
            let text = this._options[i].getText();
            let div = document.createElement('div');
            div.setAttribute('class', 'checkbox-m');
            let label = document.createElement('label');
            let input = document.createElement('input');
            let box = document.createElement('div');
            let symbolCheck = document.createElement('span');
            input.type = 'checkbox';
            if (this._options[i].isChecked()) {
                input.setAttribute('checked', 'checked');
                box.setAttribute('class', 'spanCheckBef spanEmptyBef');
                box.style.backgroundColor = color;
                symbolCheck.setAttribute('class', 'symbolSpanCheckBef');
                symbolCheck.innerHTML = symbol;
                symbolCheck.style.backgroundColor = color;
            }
            else {
                box.setAttribute('class', 'spanNotCheckBef spanEmptyBef');
            }
            let textDiv = document.createElement('div');
            textDiv.setAttribute('class', 'spanEmpty');
            textDiv.innerHTML = text;
            label.appendChild(input);
            box.appendChild(symbolCheck);
            label.appendChild(box);
            label.appendChild(textDiv);
            div.appendChild(label);
            this._dom.appendChild(div);

            /**
             * Assign to all label the listener of html on click.
             */
            let startTime, endTime;
            label.onmousedown = function () {
                startTime = new Date().getTime();
            };
            let foo = function () {
                endTime = new Date().getTime();
                if (endTime - startTime < 350) {
                    // CALL FUNCTION onClick OF _options[i].
                    // THIS FUNCTION WILL BE EXECUTE THE CODE ASSIGNED AND WILL EMIT AN EVENT TO THIS PRESENTER.
                    // THIS PRESENTER THAT WILL RECEIVE THE EVENT WILL update() THE VIEW.
                    this._options[i].onClick(this._view._event);
                }
                else {
                    // CALL FUNCTION onLongClick OF _options[i].
                    // THIS FUNCTION WILL BE EXECUTE THE CODE ASSIGNED AND WILL EMIT AN EVENT TO THIS PRESENTER.
                    // THIS PRESENTER THAT WILL RECEIVE THE EVENT WILL update() THE VIEW.
                    this._options[i].onLongClick(this._view._event);
                }
            };
            label.onmouseup = foo.bind(this);
        }

        /**
         * Check if all items are checked and if all items are checked emit an EVENT representing completion of list
         */
        let completed = false;
        for (let i in this._options) {
            if (this._options[i].isChecked()) {
                completed = true;
            }
            else {
                completed = false;
                break;
            }
        }
        if (completed === true) {
            //EMIT EVENT COMPLETED
        }

        return this._dom;
    }

    update() {
        for (let i in this._options) {
            let symbol = this._style.getSelectionCharacter();
            let boxbgcolor = this._style.getSelectionColor();
            if (this._options[i].isChecked()) {
                this._dom.childNodes[i].childNodes[0].childNodes[1].setAttribute('class','spanCheckBef spanEmptyBef');
                this._dom.childNodes[i].childNodes[0].childNodes[1].childNodes[0].setAttribute('class','symbolSpanCheckBef');
                this._dom.childNodes[i].childNodes[0].childNodes[1].style.backgroundColor = boxbgcolor;
                this._dom.childNodes[i].childNodes[0].childNodes[1].childNodes[0].style.backgroundColor = boxbgcolor;
                this._dom.childNodes[i].childNodes[0].childNodes[1].childNodes[0].innerHTML = symbol;
            }
            else{
                this._dom.childNodes[i].childNodes[0].childNodes[1].setAttribute('class','spanNotCheckBef spanEmptyBef');
                this._dom.childNodes[i].childNodes[0].childNodes[1].childNodes[0].innerHTML = '';
                this._dom.childNodes[i].childNodes[0].childNodes[1].style.backgroundColor = '#fff';
                this._dom.childNodes[i].childNodes[0].childNodes[1].childNodes[0].style.backgroundColor = '#fff';
            }
        }
        /**
         * Check if all items are checked and if all items are checked emit an EVENT representing completion of list
         */
        let completed = false;
        for (let i in this._options) {
            if (this._options[i].isChecked()) {
                completed = true;
            }
            else {
                completed = false;
                break;
            }
        }
        if (completed === true) {
            //EMIT EVENT COMPLETED
        }
    }
}
