//*********************************************************************************************************************************************************************
//requires
//*********************************************************************************************************************************************************************

var kwaaiCrud=require('kwaai-crud');


//*********************************************************************************************************************************************************************
//exports
//*********************************************************************************************************************************************************************

var tools=
{
    //CREATE************************************************************************************************************************************************
    insert:
        function(req,res,next)
        {
            if (!req.kwaaioptions){return next("kwaai options not set")}
            getKwaaiOptionDefaults(req);

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
                kwaaiCrud.insert(generateOptions(req),documentInserted);
            }catch(exp){
                return next(exp);
            }
        }

    //RETRIEVE************************************************************************************************************************************************
    ,getById:
        function(req,res,next)
        {
            if (!req.kwaaioptions){return next("kwaai options not set")}
            getKwaaiOptionDefaults(req);

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
                kwaaiCrud.getById(generateOptions(req),documentFound);
            }catch(exp){
                return next(exp);
            }
        }

    ,getByQuery:
       function(req,res,next)
        {
            if (!req.kwaaioptions){return next("kwaai options not set")}
            getKwaaiOptionDefaults(req);
            
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
                kwaaiCrud.getByQuery(generateOptions(req),documentsFound);
            }catch(exp){
                return  next(exp);
            }
        }

    ,aggregate:
    function(req,res,next)
    {
        if (!req.kwaaioptions){return next("kwaai options not set")}
        getKwaaiOptionDefaults(req);

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
            kwaaiCrud.aggregate(generateOptions(req),aggregated);
        }catch(exp){
            return  next(exp);
        }
    }

    ,countByQuery:
        function(req,res,next){

            if (!req.kwaaioptions){return next("kwaai options not set")}
            getKwaaiOptionDefaults(req);

            function documentsCounted(err,documentCount){
                if (err){return next(err)}

                if (req.kwaaioptions.sendresponse){
                    res.send(200,{count:documentCount})
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
                kwaaiCrud.countByQuery(generateOptions(req),documentsCounted);
            }catch(exp){
                return  next(exp);
            }
        }


    //UPDATE************************************************************************************************************************************************

    ,updateFull:
        function(req,res,next)
        {
            if (!req.kwaaioptions){return next("kwaai options not set")}
            getKwaaiOptionDefaults(req);

            function documentUpdated(err,result){
                if (err){return next(err)}
                else if (result==0){return res.send(404,{error:"document not found"})}
                else{
                    if (req.kwaaioptions.sendresponse){
                        res.send(204)
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
               kwaaiCrud.updateFull(generateOptions(req),documentUpdated);
            }
            catch(exp){
                return next(exp);
            }
        }

    ,updatePart:
        function(req,res,next)
        {
            if (!req.kwaaioptions){return next("kwaai options not set")}
            getKwaaiOptionDefaults(req);

            function documentUpdated(err,result){
                if (err){return next(err)}
                else if (result==0){return res.send(404,{error:"Document not found"})}
                else{
                    if (req.kwaaioptions.sendresponse){
                        res.send(204)
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
                kwaaiCrud.updatePart(generateOptions(req),documentUpdated);
            }catch(exp){
                return next(exp);
            }
        }

    //DELETE************************************************************************************************************************************************
    ,delete:
    function(req,res,next)
    {
        if (!req.kwaaioptions){return next("kwaai options not set")}
        getKwaaiOptionDefaults(req);

        function documentDeleted(err){
            if (err){return next(err)}
            else{
                if (req.kwaaioptions.sendresponse){
                    res.send(200)
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
            kwaaiCrud.delete(generateOptions(req),documentDeleted);
        }catch(exp){
            return next(exp);
        }
    }


    //SECURITY************************************************************************************************************************************************
    //todo move to tenant tools
    ,onlyForRoles:
        function(forRoles)
        {
            return function checkRole(req,res,next)
            {
                if (!forRoles){return next();};
                if (!req.user){return res.send(401,"Not authorised");}
                var roles=[];
                if (req.user.roles) {
                    if (Array.isArray(req.user.roles)) {
                        roles = req.user.roles;
                    }
                    else {
                        roles = [req.user.roles];
                    }
                }

                for (var r=0; i<roles.length; r++){
                    console.log("user's roles are: " + roles[r]); 
                }

                console.log("user's roles are: " + roles); 
                for (var i=0;i<forRoles.length;i++)
                {
                    console.log(forRoles[i]); 
                    if (roles.indexOf(forRoles[i])!=-1)
                    {

                        return next();    
                    }
                }
                return res.send(401,"No valid role");
            }
        }

    //DATATOOLS************************************************************************************************************************************************
   ,validateData:
        function(req,res,next){
            if (!req.kwaaioptions){return next("kwaai options not set")}
            getKwaaiOptionDefaults(req);

            function validated(err){
                if (err){return res.send(400,err)}
                next();
            }

            try{
                kwaaiCrud.validateData(generateOptions(req),validated)
            }catch(exp){next(exp)}

        }

    ,coerceData:
        function(req,res,next){
            if (!req.kwaaioptions){return next("kwaai options not set")}
            getKwaaiOptionDefaults(req);

            function coerced(err,coercedData){
                if (err){return next(err)}
                req.body=coercedData;
                next();
            }

            try{
                kwaaiCrud.coerceData(generateOptions(req),coerced)
            }catch(exp){next(exp)}
        }

    ,patchData:
        function(req,res,next){
            if (!req.kwaaioptions){return next("kwaai options not set")}
            getKwaaiOptionDefaults(req);

            function dataPatched(err,patchedDoc){
                if (err){return next(err)}
                req.body=patchedDoc;
                next();
            }

            try {
                kwaaiCrud.generateDataPatch(generateOptions(req), dataPatched);
            }catch(exp){next(exp)}
        }

    ,setKwaaiOptions:
        function(options){
            return function(req,res,next){
                req.kwaaioptions=options;
                next();
            }

        }
}

module.exports=tools;


function generateOptions(req){
    var ret={};

    for (var k in req.kwaaioptions){
        ret[k]=req.kwaaioptions[k];
    }
    if (req.body){ret.data=req.body;}
    if (req.query){ret.query=req.query;}
    if (req.params.id){ret.id=req.params.id;}

    return ret;
}

function getKwaaiOptionDefaults(req)
{
    if (typeof req.kwaaioptions.validate == "undefined" || req.kwaaioptions.validate == null){req.kwaaioptions.validate=true}
    if (typeof req.kwaaioptions.coerce == "undefined" || req.kwaaioptions.coerce == null){req.kwaaioptions.coerce=false}
    if (typeof req.kwaaioptions.sendresponse == "undefined" || req.kwaaioptions.sendresponse == null){req.kwaaioptions.sendresponse=true}

    if (req.query.rawQuery){
        req.kwaaioptions.rawQuery=req.query.rawQuery;
        delete req.query.rawQuery;
    }

    if (req.query.aggregate){
        req.kwaaioptions.pipeline=req.query.aggregate;
        delete req.query.aggregate;
    }

}

