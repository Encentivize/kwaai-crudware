//*********************************************************************************************************************************************************************
//requires
//*********************************************************************************************************************************************************************

var kwaaiCrud=require('kwaai-crud');
var utils=require("./utils.js");

//*********************************************************************************************************************************************************************
//exports
//*********************************************************************************************************************************************************************

var crudWare=function(connectionString,connectionOptions,mainCallback)
{

    var _kwaaiCrudTools=kwaaiCrud.crudTools(connectionString,connectionOptions,mainCallback);

    //CREATE************************************************************************************************************************************************
    this.insert=function(req,res,next){
        if (!req.kwaaioptions){return next("kwaai options not set")}
        utils.getKwaaiOptionDefaults(req);

        function documentInserted(err,document){
            if (err){return next(err)}
            else if (document==null){
                if (req.kwaaioptions.sendresponse){
                    res.status(204).end();
                }
                else{
                    req.kwaaires={
                        status:204,
                        data:null
                    }
                    next();
                }
            }
            else{
                if (req.kwaaioptions.sendresponse){
                    res.status(201).send(document);
                }
                else{
                    req.kwaaires={
                        status:201,
                        data:document
                    }
                    next();
                }
            }
        }

        try{
            _kwaaiCrudTools.insert(utils.generateOptions(req),documentInserted);
        }catch(exp){
            return next(exp);
        }
    }

    //RETRIEVE************************************************************************************************************************************************
    this.getById=function(req,res,next){
        if (!req.kwaaioptions){return next("kwaai options not set")}
        utils.getKwaaiOptionDefaults(req);

        function documentFound(err,document){
            if (err){return  next(err)}
            else if (document==null){
                if (req.kwaaioptions.sendresponse) {
                    res.status(404).send({error: "document not found"});
                }
                else{
                    req.kwaaires={
                        status:404,
                        data:null
                    }
                    next();
                }
            }
            else{
                if (req.kwaaioptions.sendresponse){
                    res.status(200).send(document);
                }
                else{
                    req.kwaaires={
                        status:200,
                        data:document
                    }
                    next();
                }
            }
        }

        try{
            _kwaaiCrudTools.getById(utils.generateOptions(req),documentFound);
        }catch(exp){
            return next(exp);
        }
    }

    this.getByQuery=function(req,res,next){
        if (!req.kwaaioptions){return next("kwaai options not set")}
        utils.getKwaaiOptionDefaults(req);

        function documentsFound(err,documents){
            if (err){return next(err)}
            else if (documents==null){
                if (req.kwaaioptions.sendresponse){
                    res.status(200).send([]);
                }else{
                    req.kwaaires={
                        status:200,
                        data:[]
                    }
                    next();
                }
            }
            else{
                if (req.kwaaioptions.sendresponse){
                    res.status(200).send(documents);
                }
                else{
                    req.kwaaires={
                        status:200,
                        data:documents
                    }
                    next();
                }
            }
        }

        try{
            _kwaaiCrudTools.getByQuery(utils.generateOptions(req),documentsFound);
        }catch(exp){
            return  next(exp);
        }
    }

    this.aggregate=function(req,res,next){
        if (!req.kwaaioptions){return next("kwaai options not set")}
        utils.getKwaaiOptionDefaults(req);

        function aggregated(err,documents){
            if (err){return next(err)}
            else if (documents==null){
                if (req.kwaaioptions.sendresponse){
                    res.status(200).send([]);
                }else{
                    req.kwaaires={
                        status:200,
                        data:[]
                    }
                    next();
                }
            }
            else{
                if (req.kwaaioptions.sendresponse){
                    res.status(200).send(documents);
                }
                else{
                    req.kwaaires={
                        status:200,
                        data:documents
                    }
                    next();
                }
            }
        }

        try{
            _kwaaiCrudTools.aggregate(utils.generateOptions(req),aggregated);
        }catch(exp){
            return  next(exp);
        }
    }

    this.countByQuery=function(req,res,next){

        if (!req.kwaaioptions){return next("kwaai options not set")}
        utils.getKwaaiOptionDefaults(req);

        function documentsCounted(err,documentCount){
            if (err){return next(err)}

            if (req.kwaaioptions.sendresponse){
                res.status(200).send({count:documentCount});
            }
            else{
                req.kwaaires={
                    status:200,
                    data:{count:documentCount}
                }
                next();
            }

        }

        try{
            _kwaaiCrudTools.countByQuery(utils.generateOptions(req),documentsCounted);
        }catch(exp){
            return  next(exp);
        }
    }

    //UPDATE************************************************************************************************************************************************

    this.updateFull=function(req,res,next){
        if (!req.kwaaioptions){return next("kwaai options not set")}
        utils.getKwaaiOptionDefaults(req);

        function documentUpdated(err,result){
            if (err){return next(err)}
            else if (result==0){return res.status(404).send({error:"document not found"});}
            else{
                if (req.kwaaioptions.sendresponse){
                    res.status(204).end();
                }
                else{
                    req.kwaaires={
                        status:204,
                        data:null
                    }
                    next();
                }
            }
        }

        try{
           _kwaaiCrudTools.updateFull(utils.generateOptions(req),documentUpdated);
        }
        catch(exp){
            return next(exp);
        }
    }

    this.updatePart=function(req,res,next){
        if (!req.kwaaioptions){return next("kwaai options not set")}
        utils.getKwaaiOptionDefaults(req);

        function documentUpdated(err,result){
            if (err){return next(err)}
            else if (result==0){return res.status(404).send({error:"Document not found"});}
            else{
                if (req.kwaaioptions.sendresponse){
                    res.status(204).end();
                }
                else{
                    req.kwaaires={
                        status:204,
                        data:null
                    }
                    next();
                }
            }
        }

        try{
            _kwaaiCrudTools.updatePart(utils.generateOptions(req),documentUpdated);
        }catch(exp){
            return next(exp);
        }
    }

    this.updatePartUnsafe=function(req,res,next){
        if (!req.kwaaioptions){return next("kwaai options not set")}
        utils.getKwaaiOptionDefaults(req);

        function documentUpdated(err,result){
            if (err){return next(err)}
            else if (result==0){return res.status(404).send({error:"Document not found"});}
            else{
                if (req.kwaaioptions.sendresponse){
                    res.status(204).end();
                }
                else{
                    req.kwaaires={
                        status:204,
                        data:null
                    }
                    next();
                }
            }
        }

        try{
            _kwaaiCrudTools.updatePartUnsafe(utils.generateOptions(req),documentUpdated);
        }catch(exp){
            return next(exp);
        }
    }

    //DELETE************************************************************************************************************************************************
    this.delete=function(req,res,next){
        if (!req.kwaaioptions){return next("kwaai options not set")}
        utils.getKwaaiOptionDefaults(req);

        function documentDeleted(err){
            if (err){return next(err)}
            else{
                if (req.kwaaioptions.sendresponse){
                    res.status(200).end();
                }
                else{
                    req.kwaaires={
                        status:200,
                        data:null
                    }
                    next();
                }
            }
        }

        try{
            _kwaaiCrudTools.delete(utils.generateOptions(req),documentDeleted);
        }catch(exp){
            return next(exp);
        }
    }

    this.patchData= function(req,res,next){
        if (!req.kwaaioptions){return next("kwaai options not set")}
        ut.utils.getKwaaiOptionDefaults(req);

        function dataPatched(err,patchedDoc){
            if (err){return next(err)}
            req.body=patchedDoc;
            next();
        }

        try {
            _kwaaiCrudTools.generateDataPatch(this.utils.generateOptions(req), dataPatched);
        }catch(exp){next(exp)}
    }




}

module.exports=function(connectionString,connectionOptions,callback){
    return new crudWare(connectionString,connectionOptions,callback);
}






