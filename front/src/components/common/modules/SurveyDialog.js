import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Container, Grid, Paper, Typography } from "@mui/material";
import MyResponsiveLine from "../../result/charts/MyResponsiveLine";
import MyResponsivePie from "../../result/charts/MyResponsivePie";

export default function SurveyDialog({ data, accAgeGenderData, accAgeTotalData, accGenderTotalData }) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Container sx={{ py: 1 }} maxWidth="md">
      <div align = 'center'>
      <Button variant="outlined" size="Large" onClick={handleClickOpen} style = {{fontWeight:'bold' ,width: "90%"}}>
      Statistics Result
      </Button>
      </div>
      </Container>
      
      {data&&
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Survey Statistics</DialogTitle>
        <DialogContent>
        <Container sx={{ py: 5 }} maxWidth="lg">    
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs ={12} md={12} lg={12} >
                    
                    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}  >
                    
                    <Grid item xs ={12} sm={6} md={6} lg={6}>
                    
                    <Paper>
                    <Grid container>
                    <Grid item xs ={3} style ={{backgroundColor : "#9AAFD9"}} >
                    </Grid>
                    
                    <Grid item xs ={9}>
                        <Typography variant="h6" style = {{fontWeight:'bold'}}>
                            총 설문 조사
                        </Typography>
                        <Typography  variant="h6" style={{ color:'gray' }}>
                            {data.survey_Total}
                        </Typography>
                    </Grid>
                    </Grid>
                    </Paper>
                    
                    </Grid>
            

                    <Grid item xs ={12} sm={6} md={6} lg={6}>

                    <Paper>
                    <Grid container>

                    <Grid item xs ={3} style ={{backgroundColor : "#9AAFD9"}}>
                        <div style =  {{height: "50px"}}>
                        </div>
                    </Grid>

                    <Grid item xs ={9}>
                        <Typography variant="h6" style = {{fontWeight:'bold'}} >
                            총 설문 응답자
                        </Typography>
                        <Typography variant="h6" style={{ color:'gray' }}>
                            {data.part_Total}
                        </Typography>
                    </Grid>

                    </Grid>
                    </Paper>
                    
                    </Grid>
                    </Grid>


            </Grid>

                <Grid item xs ={12} md={12} lg={6}>
                <Paper>
                <Typography variant="h6" marginLeft="5px" align="center" style = {{fontWeight:'bold', backgroundColor:'#C7DBF4'}}>
                연령대 별 누적 이용자 비율
                </Typography>
                <div style={{height:250}}>
                <MyResponsiveLine data = {accAgeGenderData} />
                </div>
                </Paper> 
                </Grid>

                <>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                            <Paper>
                                <Typography variant="h6" marginLeft="5px" align="center" style={{ fontWeight: 'bold' , backgroundColor:'#C7DBF4' }}>
                                    누적 이용자 연령 비율
                                </Typography>
                                <div style={{ height: 250 }}>
                                    <MyResponsivePie data={accAgeTotalData} />
                                </div>
                            </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                                <Paper>
                                    <Typography variant="h6" marginLeft="5px" align="center" style={{ fontWeight: 'bold' , backgroundColor:'#C7DBF4' }}>
                                        누적 이용자 성별 비율
                                    </Typography>
                                    <div style={{ height: 250 }}>
                                        <MyResponsivePie data={accGenderTotalData} />
                                    </div>
                                </Paper>
                </Grid>
                </>
            </Grid>
            </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      }
    </>
  );
}