import * as express from 'express';

const api = express.Router();

// api.use('/forms', forms.routes());
api.get('/dd', (req, res) => {
    res.send("API TEST");
})
// 라우터를 내보냅니다.
export default api;