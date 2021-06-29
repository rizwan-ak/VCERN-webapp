import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import VCERNButton from './VCERNButton';

export default function VCERNConfirmationModal({ body, open, onClose, onConfirm }) {
    return (
        <div>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>Confirmation Modal</DialogTitle>
                <DialogContent>{body}</DialogContent>
                <DialogActions>
                    <VCERNButton color="secondary" onClick={onClose} value="No" size="small" />
                    <VCERNButton color="primary" onClick={onConfirm} value="Yes" size="small" />
                </DialogActions>
            </Dialog>
        </div>
    );
}
