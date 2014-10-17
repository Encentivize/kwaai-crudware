/**
 * Created by martin on 12-10-2014.
 */
var kwaaiCrudUtils=require('kwaai-crud').utils;

var utils={

    //SECURITY************************************************************************************************************************************************
    //todo move to tenant tools
    onlyForRoles: function(forRoles){
        return function checkRole(req,res,next)
        {
            if (!forRoles){return next();};
            if (!req.user){return res.status(401).send("Not authorised");}
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
            return res.status(401).send("No valid role");
        }
    }

    //DATATOOLS************************************************************************************************************************************************
    ,validateData:
        function(req,res,next){
            if (!req.kwaaioptions){return next("kwaai options not set")}
            utils.getKwaaiOptionDefaults(req);

            function validated(err){
                if (err){return res.status(400).send(err);}
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

            try{
                kwaaiCrudUtils.validateData(utils.generateOptions(req),validated)
            }catch(exp){next(exp)}

        }

    ,coerceData:
        function(req,res,next){
            if (!req.kwaaioptions){return next("kwaai options not set")}
            utils.getKwaaiOptionDefaults(req);

            function coerced(err,coercedData){
                if (err){return next(err)}
                req.body=coercedData;
                next();
            }

            try{
                kwaaiCrudUtils.coerceData(utils.generateOptions(req),coerced)
            }catch(exp){next(exp)}
        }


    ,setKwaaiOptions:
        function(options){
            return function(req,res,next){
                req.kwaaioptions=options;
                next();
            }

        }

    ,generateOptions: function(req){
        var ret={};

        for (var k in req.kwaaioptions){
            ret[k]=req.kwaaioptions[k];
        }
        if (req.body){ret.data=req.body;}
        if (req.query){ret.query=req.query;}
        if (req.params.id){ret.id=req.params.id;}

        return ret;
    }

    ,getKwaaiOptionDefaults:function(req){
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
}

module.exports=utils;