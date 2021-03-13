import axios from 'axios';
import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {

    //shouldComponentUpdate(nextProps, nextState) {
    //    return this.props.checked !== nextProps.checked;
    //  }
    render() {
        const { text, checked, id, onToggle, onRemove, onPrivate } = this.props;

        return (
            <div className="todo-item" onClick={() => onToggle(id)}>
                {
                checked && (<div className="check-mark">✓</div>)
                }
                <div className={`todo-text ${checked && 'checked'}`}>
                    <div>{text}</div>
                </div>
                
                <div className="remove" onClick={(e) => {
                    e.stopPropagation(); // onToggle 이 실행되지 않도록 함
                    onRemove(id)}
                }>&times;</div>
                <div className="private" onClick={(e) => {
                    e.stopPropagation();
                    onPrivate(id)}
                }>{ /*request. ? "비공개" : "공개"*/}비공개</div>
            </div>
        );
    }
}

export default TodoItem;