import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './EditCardModalStyles.scss';
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@material-ui/core';

class EditCardModal extends Component { 
    render() {
        const {
            editCardName,
            isOpen,
            canSave,
            updateCardValue,
            saveCardChanges,
            toggleEditCard
        } = this.props;

        return (
          <Dialog
                className="editCardModal"
                onClose={() => toggleEditCard(null, null, false)}
                aria-labelledby="simple-dialog-title" 
                open={isOpen} >
                <DialogTitle id="simple-dialog-title">Edit Card Name</DialogTitle>
                <DialogContent>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={editCardName}
                        onChange={updateCardValue}
                    />
                    <Button
                        disabled={canSave}
                        onClick={saveCardChanges}
                        className={
                            canSave
                                ? "disabled"
                                : "btnCreate"
                        }>
                        Save Card Changes
                    </Button>
                </DialogContent>
            </Dialog>  
        );
    }
}

EditCardModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    editCardName: PropTypes.string.isRequired,
    canSave: PropTypes.bool.isRequired,
    saveCardChanges: PropTypes.func.isRequired,
    updateCardValue: PropTypes.func.isRequired,
    toggleEditCard: PropTypes.func.isRequired
}

export default EditCardModal;