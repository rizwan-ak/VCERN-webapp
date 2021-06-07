import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import VCERNButton from './VCERNButton';

export default function VCERNModal({ title, open, onClose, onConfirm, children }) {
    return (
        <div>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>{children}</DialogContent>
                <DialogActions>
                    <VCERNButton color="primary" onClick={onConfirm} value="Generate Ticket" align="right" />
                </DialogActions>
            </Dialog>
        </div>
    );
}
