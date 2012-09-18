#include './mimic.js'
#include "./extendables/extendables.jsx";

XmlRpcRequest.prototype.send = function() {
	// Vars
	var xml_params = "",
	    i = 0,
	    xml_call,
        http = require("http");
    
    if (!http.has_internet_access()) throw new Error("No internet connection.");
    
	for (i = 0; i < this.params.length; i++) {
		xml_params += XmlRpc.PARAM.replace("${DATA}", this.marshal(this.params[i]));
	}
	xml_call = XmlRpc.REQUEST.replace("${METHOD}", this.methodName);
	xml_call = XmlRpc.PROLOG + xml_call.replace("${DATA}", xml_params);
    
    var request = new HTTPRequest("POST", this.serviceUrl);    
    
    request._content = xml_call;
    request.header("Content-Type", "application/xml");
    request.header("Content-Length", xml_call.length);
    
    var response = _pull(request);
    
    if(response.status != 200){
		throw new Error(response._parts[0]);
	}
    
    return new XmlRpcResponse(XML(response.body));
};

/*
XmlRpcResponse.prototype.parseXML = function() {
	// Vars
	var i, nodesLength,
		childNodes = this.xmlData.children();
	
	nodesLength = childNodes.length;
	this.faultValue = undefined;
	this.currentIsName = false;
	this.propertyName = "";
	this.params = [];
	for (i = 0; i < nodesLength; i++) {
		this.unmarshal(childNodes[i], 0);
	}
	return this.params[0];
};


XmlRpcResponse.prototype.unmarshal = function(node, parent) {
	// Marshalling woz 'ere
};
*/