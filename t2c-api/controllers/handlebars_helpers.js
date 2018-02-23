var Handlebars = require('handlebars');

Handlebars.registerHelper('getOrderTermData', function(result_componut_data,result_data,oid,options) {
  htmlString = "";
  for(i=0;i<result_data.length;i++){
    if(oid==result_data[i].oid){
      for(j=0;j<result_componut_data.length;j++){
        if(result_data[i].cid==result_componut_data[j].ID){
          htmlString+="<tr><td>"+String(result_componut_data[j].name)+
          "</td><td class='text-center'>"+
          String(result_data[i].value)+
          "<td class='text-center'>"+
          String(result_componut_data[j].unit)+
          "<td class='text-center'>"+
          String(result_componut_data[j].reference_value) +
          "</td></tr>"
          break;
        }
      }
    }
  }
  return htmlString;
});
