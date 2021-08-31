import React from 'react';
import PopUp from "../../ui/PopUp/PopUp";

const RemoveAlgoPopUp = props => {
    const onDelete = () => {
        const { id } = props;
    }
    return (
        <PopUp {...props} className='__center' showcross={false} small={true}>
            Are you sure you want to delete your
            <div className='__mt-sm'>pending algo, <span className='__h5 __bold'>Stock Algo G?</span></div>
            <div className='__flex __mt-15 __sb'>
                <button className='__btn __green-text __f1' onClick={props.close}>No, Keep</button>
                <button className='__btn __f1 __ml-1' onClick={onDelete}>Yes, Delete</button>
            </div>
        </PopUp>
    )
}

export default RemoveAlgoPopUp;