const axios = require('axios');
const { DOMParser } = require('xmldom')

// var url = 'https://stratus-api-heroku.herokuapp.com/api/core/auth?wsdl';
var url = 'http://localhost:9000/api/core/auth?wsdl';

let xmls='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\
                            xmlns:web="http://coreAuth.com/">\
            <soapenv:Header/>\
            <soapenv:Body>\
              <web:signin>\
                <web:username>INR</web:username>\
                <web:password>USD</web:password>\
              </web:signin>\
            </soapenv:Body>\
          </soapenv:Envelope>';

axios.post(url,xmls,
           {headers:
             {'Content-Type': 'text/xml'}
           }).then(res=>{
		   var doc = new DOMParser().parseFromString(res.data);
		   var json = doc.getElementsByTagName("return")[0].childNodes[0].data;
		   console.log(json);
           }).catch(err=>{console.log(err)});
