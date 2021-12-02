
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import React from 'react';




const EList = ({emailList, setEmailList}) => {
    const del = (e) =>{
      setEmailList(emailList.filter((v,i)=>i!=e.target.id))
    }
    return(
      <>
        {emailList.map((v,index)=>(
          <MenuItem>
            <Typography color="initial">{index} - {v} </Typography> <Button id={index} onClick={(e)=>del(e)}> x </Button>
          </MenuItem>
        ))}
      </>
    )
}

export default EList;