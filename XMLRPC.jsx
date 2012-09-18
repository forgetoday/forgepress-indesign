#include './mimic.jsx'

function callCalculator() {
	var request = new XmlRpcRequest("http://mimic-xmlrpc.sourceforge.net/demos/calc.php", "+");
    request.addParam("5");
    request.addParam("50");
    
    try {
        var response = request.send();
    } catch(e) {
        $.writeln(e);
        return;
    }
    
	var data = response.parseXML();
    $.writeln(data.toString());
}

callCalculator();