import React, { useState } from 'react';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import QRCode from "qrcode.react";
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';

const QrCodeUrl = ({ id }) => {
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const downloadQRCode = () => {
        const canvas = document.getElementById("qr-gen");
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = process.env.REACT_APP_URL+id+'.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    
    return (
        <>
            <Tooltip title="QRcode 생성">
                <IconButton onClick={handleClick} size="small">
                    <QrCode2Icon/>
                </IconButton>
            </Tooltip>

            <Dialog 
            anchorEl={anchorEl}
            open={open}
            maxWidth="xs"
            aria-labelledby="modal-modal-title"
            >
                <DialogTitle id="form-dialog-title">QR Code</DialogTitle>
                <DialogContent>
                <Container >
                    <QRCode 
                        id="qr-gen" 
                        value={process.env.REACT_APP_URL+id} 
                        level={"H"}
                        includeMargin={true}
                        onClose={handleClose}
                    />
                    </Container>
                </DialogContent>
                <DialogActions>
                <Button onClick={downloadQRCode}><DownloadIcon /></Button>
                <Button onClick={handleClose}><CloseIcon /></Button>
                </DialogActions>
            </Dialog>
            
        </>
    );
};

export default QrCodeUrl;