  // Global variable for desktop
  var mxIsElectron = false;
  var mxScriptsLoaded = false, mxWinLoaded = false;


	var t0 = new Date();

	// Used to request grapheditor/mxgraph sources in dev mode
	var mxDevUrl = document.location.protocol + BASE_URI + '/';

	// Used to request draw.io sources in dev mode
	var drawDevUrl = document.location.protocol + BASE_URI + '/';
	var geBasePath = drawDevUrl + '/js/grapheditor';
  
	var mxBasePath = mxDevUrl + '/js/mxgraph/src';

	mxscript(drawDevUrl + 'js/PreConfig.js');
	mxscript(drawDevUrl + 'js/diagramly/Init.js');
	mxscript(geBasePath + '/Init.js');
	mxscript(mxBasePath + '/mxClient.js');

	// Adds all JS code that depends on mxClient. This indirection via Devel.js is
	// required in some browsers to make sure mxClient.js (and the files that it
	// loads asynchronously) are available when the code loaded in Devel.js runs.
	mxscript(drawDevUrl + 'js/diagramly/Devel.js');
	mxscript(drawDevUrl + 'js/PostConfig.js');
