app.get('/api',function(req,res,next){
    const test = [
        {
            test: 1,
            piste: 3
        }
    ]
    res.send(test);
});