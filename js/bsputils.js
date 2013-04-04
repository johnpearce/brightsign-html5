// BrightSign Player JS Support utilities for JavaScriot - 20130403-1139

var bsp_utils_enable_debug_logging=false;

var bsputils_env=new Object;

function bsputils_init(debug_log)
{
    // initialize the BSP Utily Module

    // default to no debug log
    debug_log = typeof debug_log !== 'undefined' ? debug_log : false;
    bsp_utils_enable_debug_logging=debug_log;

    var h=$(window).height();
    var w=$(window).width();
    var bsp=isBrightSign();

    e=new bspenv(bsp,h,w);
    return e;
}


function bspenv(bsp,height,width)
{
    // constructor for the bsp object
    this.isbsp=bsp;
    this.height=height;
    this.width=width;
}


function getID(callback)
{
    if(bsbrowser=true)
    {
       $.get('http://localhost:8080/GetID',function(data,status,jqXHR)
       { 
            $xml = $( $.parseXML( jqXHR.responseText ));
            
            var n= $unitName = $xml.find( "unitName" ).text();
            var nM=$unitNamingMethod = $xml.find( "unitNamingMethod" ).text();
            var nD=$unitDescription = $xml.find( "unitDescription" ).text();
            var s =$serialNumber = $xml.find( "serialNumber" ).text();
            var f =$functionality = $xml.find( "functionality" ).text();

            var b=new bspID(n,nM,nD,s,f);
            callback(b);
        });
    }
}


function bspID(unitName,unitNamingMethod,unitDescription,serialNumber,functionality)
{
    this.unitName=unitName;
    this.unitNamingMethod=unitNamingMethod;
    this.unitDescription=unitDescription;
    this.serialNumber=serialNumber;
    this.functionality=functionality;
}



function getUserVars(callback)
{
    var varlist=new Array();
    if(bsbrowser=true)
    {
       $.get('http://localhost:8080/GetUserVars',function(data,status,jqXHR)
       { 
            un=jqXHR.responseText;

            xmlDoc = $.parseXML( un );
            $xml = $( xmlDoc );

            $xml.find('BrightSignUserVariables').each(function(){
                $(this).children().each(function(){
                    var tagName=this.tagName;
                    var val=$(this).text();
                    uv=new userVar(tagName,val);
                    varlist.push(uv);
                })
            });
            callback(varlist);
        });
    }
}

function userVar(key,value)
{
    this.key=key;
    this.value=value;
}



function getUDPEvents(callback)
{
    if(bsbrowser=true)
    {
       $.get('http://localhost:8080/GetUDPEvents',function(data,status,jqXHR)
       { 
            un=jqXHR.responseText;

            xmlDoc = $.parseXML( un );
            $xml = $( xmlDoc );

            var recvPort=$xml.find( "receivePort").text();
            var sendPort=$xml.find( "destinationPort" ).text();
            var evlist= new Array();

            $xml.find('udpEvents').each(function(){
                $(this).children().each(function(){
                    var label =$(this).find("label").text();
                    var action=$(this).find("action").text();
                    var ev=new udpevent(label,action);
                    evlist.push(ev);
                });
            });

            b=new bspUDPEventList(sendPort,recvPort,evlist);
            callback(b);
        });

    }
}


function bspUDPEventList(sendPort,recvPort,evList)
{
    this.sendPort=sendPort;
    this.recvPort=recvPort;
    this.events=evList;
}


function udpevent(label,action)
{
    this.label=label;
    this.action=action;
}


function isBrightSign()
{
    var ua = navigator.userAgent;
    var ret=false;

    if(ua.indexOf("BrightSign") !=-1) {
        debug_log("isBrightSign: TRUE");
        return true;
    } else {
        debug_log("isBrightSign: FALSE");
        return false;
    }
}


function printObj(obj)
{
    debug_log(JSON.stringify(obj));
}




function debug_log(logstr)
{
    if (bsp_utils_enable_debug_logging=true) {
        console.log(logstr);
    }
}