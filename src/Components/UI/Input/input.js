import React from 'react';

import classes from './input.css';

const input = ( props ) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    console.log('THIS IS PROPS',props)
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'dropdown' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    onChange={props.changed}>
                    {props.options.map(option => (
                        <option key={option.id} value={option.id}>
                        {option.username}
                        </option>
                    ))}
                </select>
            );
            break;
            case ( 'dropdown2' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    onChange={props.changed}>
                    {props.options.map(option => (
                        <option key={option.id} value={option.id}>
                        {option.name}
                        </option>
                    ))}
                </select>
            );
            break;
        case('select-multiple'):
        inputElement = (
            <select
                className={inputClasses.join(' ')}
                onChange={props.changed} multiple>
                {props.options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.username}
                    </option>
                ))}
            </select>
        );
        break;
        case('select-multiple2'):
        inputElement = (
            <select
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed} multiple>
                {props.options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        );
        break;
        case('check-box'):
        inputElement = (
            <input type="checkbox"
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}>
                    </input>
        );
        break;
        
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;