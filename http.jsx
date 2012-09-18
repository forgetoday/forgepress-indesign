#include "./extendables/extendables.jsx";

url = require("http/url");
parsed = url.parse("http://w3.org/");
path = parsed.pathname + parsed.search;
$.writeln(path || "/");