import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Container, Paper } from '@mui/material';
import React, { useState } from 'react';
import MyResponsiveLine from "../charts/MyResponsiveLine";

const ResultDetailChart = ({ data, resultData }) => {
    const [open, setOpen] = useState(false);

    const resultDataMan = [];
    const resultDataWoman = [];
    const resultDataTotal = [];

    let idx = 1;
    let sum = 0;
    resultData&&resultData.forEach((element, index) => {
        sum+=element;
        if(index%2===0){
            resultDataMan.push({'x':`${idx}0`, 'y':element});
        }else{
            idx-=1;
            resultDataWoman.push({'x':`${idx}0`, 'y':element});
            resultDataTotal.push({'x':`${idx}0`, 'y':sum})
            sum=0;
        }
        idx+=1;
    });

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <>
            <Button onClick={handleClickOpen} style={{paddingTop:"0px", paddingBottom:"0px"}}>
                보기 {data&&data}
            </Button>

            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">각 항목 상세보기</DialogTitle>

            <DialogContent>
            <Container sx={{ py: 1 }} maxWidth="lg">    
            
                <Paper>
                <div style={{height:250}}>
                <MyResponsiveLine data={[ { "id":'남자', "data": resultDataMan }, { "id":'여자', "data": resultDataWoman }, { "id":'전체', "data": resultDataTotal } ]} />
                
                </div>
                </Paper> 

            </Container>
            </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default ResultDetailChart;