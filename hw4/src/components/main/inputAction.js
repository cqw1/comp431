import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

/*
 * Encapsulates an input field as well as a button that will 
 * execute the onClickAction that it is passed in. The onClickHandler 
 * will use the input value in its functionality.
 */
export const InputAction = ({ 
    placeholder,
    buttonText, 
    onClickAction,
    onClick,
}) =>  {

    let input;

    return (
        <div className='display-table'> 
            <input 
                className='form-control display-table-cell' 
                ref = {node => { input = node }} placeholder={placeholder} />
            <span className='display-table-cell padding-left-5px'>
                <button className='btn btn-default' onClick={() => {
                    onClick(input.value);
                    input.value = '';
                }}>
                    {buttonText}
                </button>
            </span>
        </div>
    )
}

export default connect(
    (state) => ({ }),
    (dispatch, ownProps) => ({ 
        onClick: (text) => dispatch(ownProps.onClickAction(text)),
    })
)(InputAction)

