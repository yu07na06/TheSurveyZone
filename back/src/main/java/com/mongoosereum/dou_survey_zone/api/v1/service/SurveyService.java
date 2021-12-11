package com.mongoosereum.dou_survey_zone.api.v1.service;

import com.mongoosereum.dou_survey_zone.api.v1.common.S3Uploader;
import com.mongoosereum.dou_survey_zone.api.v1.dao.*;
import com.mongoosereum.dou_survey_zone.api.v1.domain.comment.Comment;
import com.mongoosereum.dou_survey_zone.api.v1.domain.participation.Participation;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Question;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_Mongo;
import com.mongoosereum.dou_survey_zone.api.v1.domain.survey.Survey_MySQL;
import com.mongoosereum.dou_survey_zone.api.v1.domain.tag.SurveyTag;
import com.mongoosereum.dou_survey_zone.api.v1.domain.user.User;
import com.mongoosereum.dou_survey_zone.api.v1.dto.request.survey.*;
import com.mongoosereum.dou_survey_zone.api.v1.dto.response.survey.*;
import com.mongoosereum.dou_survey_zone.api.v1.common.paging.PageCriteria;
import com.mongoosereum.dou_survey_zone.api.v1.common.paging.PaginationInfo;
import com.mongoosereum.dou_survey_zone.api.v1.domain.tag.Tag;
import com.mongoosereum.dou_survey_zone.api.v1.exception.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@AllArgsConstructor
@Service
public class SurveyService {
    @Autowired
    private final SurveyDAO surveyDAO;

    @Autowired
    private final UserDAO userDAO;

    @Autowired
    private final TagDAO tagDAO;

    @Autowired
    private final ParticipationDAO participationDAO;

     @Autowired
     private final CommentDAO commentDAO;

     @Autowired
     private final PasswordEncoder passwordEncoder;


    public SurveyListPageRes selectSurveyList(SurveyListPageReq surveylistDTO) {
        PageCriteria criteria = new PageCriteria();
        criteria.setPage_Num(surveylistDTO.getPage_Num());
        criteria.setSearch_Key(surveylistDTO.getSearch_Key());
        criteria.setSearch_Tag(surveylistDTO.getSearch_Tag());

        // paginationInfo insert
        PaginationInfo paginationInfo = new PaginationInfo(criteria);

        // total count
        int surveyTotalCount = surveyDAO.selectSurveyTotalCount(criteria);

        paginationInfo.setTotalRecordCount(surveyTotalCount);
        List<Survey_MySQL> surveyList = surveyDAO.selectSurveyList(paginationInfo);
        return SurveyListPageRes.builder()
                .paginationInfo(paginationInfo)
                .surveylist(surveyList)
                .build();
    }

    public SurveyListPageRes selectMySurveyList(String User_Email, SurveyListPageReq surveylistDTO) {
        //criteria insert
        PageCriteria criteria = new PageCriteria();
        criteria.setPage_Num(surveylistDTO.getPage_Num());
        criteria.setUser_Email(User_Email);

        // paginationInfo insert
        PaginationInfo paginationInfo = new PaginationInfo(criteria);

        // total count
        int surveyTotalCount = surveyDAO.selectMySurveyTotalCount(criteria);

        // surveylist
        paginationInfo.setTotalRecordCount(surveyTotalCount);
        List<Survey_MySQL> surveyList = surveyDAO.selectMySurveyList(paginationInfo);

        return SurveyListPageRes.builder()
                .paginationInfo(paginationInfo)
                .surveylist(surveyList)
                .build();
    }

    @Transactional
    public String insertSurvey(InsertSurveyReq insertSurveyDTO) /*throws IOException*/ {
        System.out.println("inssertsurvey 서비스 시작");
        if(insertSurveyDTO.getUser_Email()==null || insertSurveyDTO.getUser_Email().equals("anonymousUser"))
            throw new ForbiddenException(ErrorCode.UNAUTHORIZED_ACCESS);

        User user = userDAO.existsByEmail_MySQL(insertSurveyDTO.getUser_Email())
                .orElseThrow(()-> new NotFoundException(ErrorCode.NOT_FOUND_USER));

        Survey_Mongo survey_mongo = surveyDAO.surveyInsert_Mongo(
                Survey_Mongo.builder()
                        .questionList(insertSurveyDTO.getQuestionList())
                        .build());

        // MySQL insert by MongoDB.id
        Survey_MySQL survey_MySQL = Survey_MySQL.builder()
                ._id(survey_mongo.get_id())
                .sur_Title(insertSurveyDTO.getSur_Title())
                .sur_Content(insertSurveyDTO.getSur_Content())
                .sur_State(insertSurveyDTO.getSur_State().getNum())
                .sur_StartDate(insertSurveyDTO.getSur_StartDate())
                .sur_EndDate(insertSurveyDTO.getSur_EndDate())
                .sur_Publish(insertSurveyDTO.getSur_Publish())
                .user_Email(user.getUser_Email())
                .sur_Type(insertSurveyDTO.getSur_Type().getNum())
                .tag_ID(insertSurveyDTO.getSur_Tag())
                .sur_Img(insertSurveyDTO.getSur_Image())
                .build();

        if(survey_MySQL.getSur_Img() == null)
            survey_MySQL.setSur_Img("https://surveyzone.s3.ap-northeast-2.amazonaws.com/static/b5e552ea-8d6b-4582-89ae-1d25c25027b8no-image.png");

        try {
            surveyDAO.surveyInsert_MySQL(survey_MySQL);
            if(insertSurveyDTO.getSur_Tag() != null) {
                SurveyTag surveyTag = SurveyTag.builder()
                        ._id(survey_mongo.get_id())
                        .Tag_ID(insertSurveyDTO.getSur_Tag())
                        .build();
                tagDAO.insertTag(surveyTag);
            }
        } catch (Exception e) {
            System.out.println("에러발생");
            e.printStackTrace();
            surveyDAO.deleteSurvey_Mongo(survey_mongo.get_id());
        }
        return survey_mongo.get_id();
    }

    public List<Tag> selectTagList() {
        return tagDAO.selectTagList();
    }

    public List<Tag> selectTagExistList(String _id) {
        return tagDAO.findById(_id);
    }

    @Transactional(rollbackFor = NotFoundException.class)
    public SurveyPartCheckRes checkPart(String _id, HttpServletRequest request){
        String ip = getIP(request);
        Survey_MySQL survey_mySQL = surveyDAO.findById_MySQL(_id)
                .orElseThrow(()->new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));
        return SurveyPartCheckRes.builder()
                .check_State(survey_mySQL.getSur_State())
                .check_IP(participationDAO.findByIP(_id, ip) < 1)
                .build();
    }

    public Boolean checkPart(String _id,String userEmail) {
        if (!userEmail.equals(surveyDAO.selectOwner(_id)
                .orElseThrow(() ->
                        new NotFoundException(ErrorCode.NOT_FOUND_SURVEY))
        ))
        {    throw new ForbiddenException(ErrorCode.NOT_OWNER_SURVEY); }
        return true;
    }

    public SelectSurveyRes findById(String _id) {
        Survey_MySQL resultMySQL = surveyDAO.findById_MySQL(_id)
                .orElseThrow(()-> new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));

        Survey_Mongo resultMongo = surveyDAO.findById_Mongo(_id)
                .orElseThrow(()-> new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));

        List<Tag> tagList = tagDAO.findById(_id);
        SelectSurveyRes surveySelectDTO = new SelectSurveyRes();
        surveySelectDTO.set(resultMongo, resultMySQL, tagList);
        return surveySelectDTO;
    }

    @Transactional(rollbackFor = NotFoundException.class)
    public void insertAnswer(String _id, InsertAnswerReq insertAnswerReq, HttpServletRequest request) {
        String ip = getIP(request);
        if(participationDAO.findByIP(_id,ip) == 1) // 이미 응답한 IP.
            throw new ForbiddenException(ErrorCode.ALREADY_PARTICIPATION);
        participationDAO.insertParticipation(
                Participation.builder()
                        ._id(_id)
                        .Part_Age(insertAnswerReq.getAge())
                        .Part_Gender(insertAnswerReq.getGender().charAt(0))
                        .Part_IP(ip)
                        .build()
        );
        surveyDAO.insertAnswer(_id, insertAnswerReq.getAnswerList());
    }

    @Transactional
    public void deleteSurvey(String _id, String User_Email) {
        String owner = surveyDAO.selectOwner(_id)
                .orElseThrow(()->new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));

        if(!owner.equals(User_Email))
            throw new ForbiddenException(ErrorCode.NOT_OWNER_SURVEY);

        surveyDAO.deleteSurvey_MySQL(_id);
        surveyDAO.deleteSurvey_Mongo(_id);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateSurvey(String _id, InsertSurveyReq surveyInsertDTO) {
        if(!surveyInsertDTO.getUser_Email().equals(surveyDAO.selectOwner(_id)
                .orElseThrow(() ->
                        new NotFoundException(ErrorCode.NOT_FOUND_SURVEY))
        ) )
            throw new ForbiddenException(ErrorCode.NOT_OWNER_SURVEY);

        // MongoDB insert
        Survey_MySQL survey_MySQL = surveyDAO.findById_MySQL(_id)
                .orElseThrow(()-> new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));

        Survey_Mongo survey_Mongo = surveyDAO.findById_Mongo(_id)
                .orElseThrow(()-> new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));

        survey_Mongo.setQuestionList(surveyInsertDTO.getQuestionList());
        survey_MySQL.set(surveyInsertDTO);
        if(surveyInsertDTO.getSur_Image() == null)
            surveyInsertDTO.setSur_Image("https://surveyzone.s3.ap-northeast-2.amazonaws.com/static/b5e552ea-8d6b-4582-89ae-1d25c25027b8no-image.png");

        System.out.println(survey_MySQL.getSur_State());
        System.out.println(surveyInsertDTO.getSur_State());

        surveyDAO.updateSurvey_Mongo(survey_Mongo);
        surveyDAO.updateSurvey_MySQL(survey_MySQL);

        SurveyTag surveyTag = SurveyTag.builder()
                .Tag_ID(surveyInsertDTO.getSur_Tag())
                ._id(_id)
                .build();

        if(tagDAO.selectSurveyTag(_id).isPresent()) { // tag가 기존에 존재함
            if(surveyTag.getTag_ID() == null || surveyTag.getTag_ID().equals(""))
                tagDAO.deleteSurveyTag(surveyTag);
            else
                tagDAO.updateSurveyTag(surveyTag);
        }
        else {
            if(surveyTag.getTag_ID() != null && !surveyTag.getTag_ID().equals(""))
                tagDAO.insertTag(surveyTag);
        }
    }

    public SurveyResultRes resultSurvey(String User_Email, String _id) {
        if(!User_Email.equals(surveyDAO.selectOwner(_id)
                .orElseThrow(() ->
                        new NotFoundException(ErrorCode.NOT_FOUND_SURVEY)) ) )
            throw new ForbiddenException(ErrorCode.NOT_OWNER_SURVEY);

        Survey_Mongo survey_mongo = surveyDAO.findById_Mongo(_id)
                .orElseThrow(()->new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));

        Survey_MySQL survey_mySQL = surveyDAO.findById_MySQL(_id)
                .orElseThrow(()->new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));

        List<Participation> part_mySQL= participationDAO.resultPart(_id);

        List<Question> questionList = survey_mongo.getQuestionList();
        SurveyResultRes surveyResultDTO = new SurveyResultRes();
        Map<String, Integer[]> map = new LinkedHashMap<>();
        map.put("남성",new Integer[]{0,0,0,0,0,0});
        map.put("여성",new Integer[]{0,0,0,0,0,0});
        map.put("total",new Integer[]{0,0,0,0,0,0});
        for(int i=0;i<part_mySQL.size();i++) {
            if(part_mySQL.get(i).getPart_Gender() == 'M')
                map.get("남성")[part_mySQL.get(i).getPart_Age()/10-1]++;
            else
                map.get("여성")[part_mySQL.get(i).getPart_Age()/10-1]++;
            map.get("total")[part_mySQL.get(i).getPart_Age()/10-1]++;

        }
        surveyResultDTO.setPartList(map);

        boolean [] isMulti = new boolean[questionList.size()];
        for(int i=0;i<questionList.size();i++){
            if(questionList.get(i).getSurQue_QType()==1)
                isMulti[i] = true;
        }
        surveyResultDTO.setSurvey(survey_mySQL);

        for (int i = 0; i < questionList.size(); i++) {
            Question nowQuestion = questionList.get(i);
            surveyResultDTO.setQuestion(nowQuestion);
            
            // TODO 정환. 유저 정보를 담게 변경되는 경우 아래 코드 추가해야함
            // surveyResultDTO.getUserList().add(questionList.get(i).getUserInfo());

            List<String []> ansList = new ArrayList<>(); // 제출한 응답을 담을 ArrayList
            //객관식 유형
            switch (nowQuestion.getSurQue_QType()) {
                /*case QuestionType.ESSAY: 주관식 */
                case 0: {
                    surveyResultDTO.getSelectList().add(null); // Select가 없으므로 null
                    for (int j = 0; j < nowQuestion.getAnswerList().size(); j++) {
                        String ans = nowQuestion.getAnswerList().get(j).getSurAns_Content();
                        ansList.add(new String []{ans});
                    }
                    surveyResultDTO.getResultMap().add(null); // Select가 없으므로 resultMap도 null
                    break;
                }
                /*case QuestionType.MULTIPLE : 객관식 */
                case 1: {
                    Map<String, Long> resultMap = new HashMap<>(); // 객관식용 HashMap
                    for (int j = 0; j < nowQuestion.getSelectList().size(); j++)
                        resultMap.put(nowQuestion.getSelectList().get(j).getSurSel_Content(), 0L);
                    surveyResultDTO.getSelectList().add(nowQuestion.getSelectList()); // DTO에 selectList추가
                    for (int j = 0; j < nowQuestion.getAnswerList().size(); j++) {
                        String ans[] = nowQuestion.getAnswerList().get(j).getSurAns_Content().split("Θ");
                        if (ans.length == 1) { // 중복응답이 아닌경우
                            ansList.add(ans); // 제출한 응답 리스트에 추가
                            if (resultMap.containsKey(ans[0])) // Map에 답변이 존재
                                resultMap.put(ans[0], resultMap.get(ans[0]) + 1);
                        } else { // 중복응답인 경우
                            ansList.add(ans);
                            for (int k = 0; k < ans.length; k++) { // 중복응답의 갯수만큼 for문 반복
                                if (resultMap.containsKey(ans[k])) // Map에 답변이 존재
                                    resultMap.put(ans[k], resultMap.get(ans[k]) + 1);
                            }
                        }
                    }
                    surveyResultDTO.getResultMap().add(resultMap);
                    break;
                }
                /* case QuestionType.LINEAR : 선형배율*/
                case 2: {
                    Map<String, Long> resultMap = new HashMap<>();
                    int min = Integer.parseInt(nowQuestion.getSelectList().get(1).getSurSel_Content());
                    int max = Integer.parseInt(nowQuestion.getSelectList().get(3).getSurSel_Content());
                    // value 최소 index(1), value 최대 index(3)
                    for (int j = min; j <= max; j++)
                        resultMap.put(String.valueOf(j), 0L);

                    surveyResultDTO.getSelectList().add(nowQuestion.getSelectList()); // DTO에 selectList추가
                    String[] strArr = new String[nowQuestion.getAnswerList().size()];
                    for (int j = 0; j < nowQuestion.getAnswerList().size(); j++) {
                        strArr[j] = nowQuestion.getAnswerList().get(j).getSurAns_Content();
                        if (resultMap.containsKey(strArr[j])) // Map에 답변이 존재
                            resultMap.put(strArr[j], resultMap.get(strArr[j]) + 1);
                    }
                    ansList.add(strArr); // 제출한 응답 리스트에 추가
                    surveyResultDTO.getResultMap().add(resultMap);
                    break;
                }
            }
            surveyResultDTO.getAnswerList().add(ansList); // 이번 질문에 대한 모든 ansList를 추가
        }

        List< LinkedHashMap<String,List<Integer> > > selectResultMap = new ArrayList<>();
        for(int i=0;i<surveyResultDTO.getSelectList().size();i++){
            if(surveyResultDTO.getSelectList().get(i) == null){
                selectResultMap.add(null);
            }
            else{
                selectResultMap.add( new LinkedHashMap <String,List<Integer> >());
                for(int j=0;j<surveyResultDTO.getSelectList().get(i).size();j++){
                    if(surveyResultDTO.getSelectList().get(i).get(j).equals(""))
                        continue;
                    List<Integer> list = new ArrayList<Integer>();
                    for(int k=0;k<12;k++)
                        list.add(0);
                    selectResultMap.get(i).put(
                                surveyResultDTO.getSelectList().get(i).get(j)
                                        .getSurSel_Content(), list);
                }
            }
        }

        for(int i=0;i<surveyResultDTO.getAnswerList().size();i++){
            if(selectResultMap.get(i) == null || !isMulti[i]) {
                selectResultMap.set(i,null);
                continue;
            }
            for(int j=0; j<surveyResultDTO.getAnswerList().get(i).size();j++){
                for(int k=0;k< surveyResultDTO.getAnswerList().get(i).get(j).length;k++){
                    if(surveyResultDTO.getAnswerList().get(i).get(j)[k].equals(""))
                        continue;
                    List<Integer> arrayList = selectResultMap.get(i).get(surveyResultDTO.getAnswerList().get(i).get(j)[k]);
                    int idx = getIndex(part_mySQL.get(j).getPart_Gender(),part_mySQL.get(j).getPart_Age());
                    arrayList.set(idx,arrayList.get(idx)+1);
                    selectResultMap.get(i).put(surveyResultDTO.getAnswerList().get(i).get(j)[k], arrayList);
                }
            }
        }
        surveyResultDTO.setSelectResultMap(selectResultMap);
        return surveyResultDTO;
    }
    // 30남
    public int getIndex(char gender, int age){
        System.out.println(gender + " " +age);
        int temp = (age/5)-1;
        if(gender == 'M')
            temp--;
        return temp;
    }
    public String getIP(HttpServletRequest request){
        String ip = null;
        String[] header = new String []{
                "X-Forwarded-For",
                "Proxy-Client-IP",
                "WL-Proxy-Client-IP",
                "HTTP_CLIENT_IP",
                "HTTP_X_FORWARDED_FOR"
        };
        for(int i=0;i<header.length;i++){
            ip = request.getHeader(header[i]);
            if(ip != null)
                return ip;
        }
        return request.getRemoteAddr();
    }

    public CommentListRes getCommentList (String _id,  CommentListPageReq commnetlistDTO) {
        surveyDAO.findById_MySQL(_id)
                .orElseThrow(()->new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));

        PageCriteria criteria = new PageCriteria();
        criteria.setPage_Num(commnetlistDTO.getPage_Num());
        criteria.set_id(_id);

        // paginationInfo insert
        PaginationInfo paginationInfo = new PaginationInfo(criteria);

        // total count
        int surveyTotalCount = commentDAO.commentlistTotalCount(criteria);

        paginationInfo.setTotalRecordCount(surveyTotalCount);

        List<Comment> commentList = commentDAO.commentlist(paginationInfo);

        return CommentListRes.builder()
                .paginationInfo(paginationInfo)
                .Commentlist(commentList)
                .build();
    }

    public void insertComment (String _id,InsertCommentReq insertCommentReq) {
        surveyDAO.findById_MySQL(_id)
                .orElseThrow(()->new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));

        Comment comment = Comment.builder()
                ._id(_id)
                .Com_Nickname(insertCommentReq.getCom_Nickname())
                .Com_Password( passwordEncoder.encode(insertCommentReq.getCom_Password()))
                .Com_Context(insertCommentReq.getCom_Context())
                .build();
        commentDAO.insertComment(comment);
    }

    public void updateComment(String _id ,ModifyCommentReq modifyCommentReq){
        surveyDAO.findById_MySQL(_id)
                .orElseThrow(()->new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));


        Comment comment = Comment.builder()
                .Com_ID(modifyCommentReq.getCom_ID())
                ._id(_id)
                .Com_Password(modifyCommentReq.getCom_Password())
                .Com_Context(modifyCommentReq.getCom_Context())
                .build();

        commentDAO.comment(comment)
                .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_COMMENT));

        if(passwordEncoder.matches(modifyCommentReq.getCom_Password(), commentDAO.checkCommentPW(comment)))
        {
            commentDAO.updateComment(comment);
        }

        else{throw new UnauthorizedException(ErrorCode.UNAUTHORIZED_ACCESS);}
    }

    public void deleteComment(String _id, DeleteCommentReq deleteCommentReq) {
        surveyDAO.findById_MySQL(_id)
                .orElseThrow(()->new NotFoundException(ErrorCode.NOT_FOUND_SURVEY));

        Comment comment = Comment.builder()
                .Com_ID(deleteCommentReq.getCom_ID())
                ._id(_id)
                .Com_Password(deleteCommentReq.getCom_Password())
                .build();

        commentDAO.comment(comment)
                .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND_COMMENT));

        if(passwordEncoder.matches(deleteCommentReq.getCom_Password(), commentDAO.checkCommentPW(comment)))
        {
            commentDAO.deleteComment(comment);
        }

        else{throw new UnauthorizedException(ErrorCode.UNAUTHORIZED_ACCESS);}
    }
}