import { Button, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { Gongback } from "../Function"

// 내 설문지 페이지 및 결과보기 페이지에서 생성한 설문이나 응답이 하나도 없을때 보여질 View
const OTL = ({flag}) => {

    const surText = "아직 작성한 설문이 존재하지않습니다.";
    const surBtnText = "설문생성 하러가기" ;
    const resText = "응답이없다..";
    const resBtnText = "내설문 돌아가기" ;
    const surLink="/CreateSurveyPage";
    const resLink="/MySurveyPage";

    return(
        <>
            <Gongback num={4}/>
                <div style={{textAlign: "center"}}>
                    {/* <Typography  fontSize="45px"color="blue">{(flag==="설문")?surText:resText}</Typography> */}
                    <Typography  fontSize="45px"color="blue">아무것도 없습니다만?</Typography>
                    <Gongback num={2}/>
                    <a href='https://ifh.cc/v-f5xHEu' target='_blank'><video src='https://ifh.cc/v/f5xHEu.mp4' muted autoplay loop playsinline/></a>
                    <a href='https://ifh.cc/v-OW1pgK' target='_blank'><video src='https://ifh.cc/v/OW1pgK.mp4' muted autoplay loop playsinline/></a>
                    {/* <img src="https://ifh.cc/g/AZyg3O.png" alt="이미지 업로드 실패..ㅠ"/> */}
                </div>
            <Gongback num={4}/>
                <Grid container justifyContent="center">
                    {/* <Link to='/LoginPage'style={{textDecoration:'none', color:'white'}}><Tab label="로그인" style={{fontWeight:'bold'}}/></Link> */}
                    <Link to={(flag==="설문")?surLink:resLink} style={{textDecoration:'none', color:'white'}}>
                        <Button color="secondary" variant="outlined" size="large"><Typography fontSize="30px">{(flag==="설문")?surBtnText:resBtnText}</Typography></Button>
                    </Link>
                </Grid>
            <Gongback num={8}/>
        </>
    )
}

export default OTL;