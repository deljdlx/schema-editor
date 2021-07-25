/**
 * URL Parameters and protocol description are here:
 *
 * https://www.diagrams.net/doc/faq/supported-url-parameters
 *
 * Parameters for developers:
 *
 * - dev=1: For developers only
 * - test=1: For developers only
 * - export=URL for export: For developers only
 * - ignoremime=1: For developers only (see DriveClient.js). Use Cmd-S to override mime.
 * - createindex=1: For developers only (see etc/build/README)
 * - filesupport=0: For developers only (see Editor.js in core)
 * - savesidebar=1: For developers only (see Sidebar.js)
 * - pages=1: For developers only (see Pages.js)
 * - lic=email: For developers only (see LicenseServlet.java)
 * --
 * - networkshapes=1: For testing network shapes (temporary)
 */
 var urlParams = (function()
 {
   var result = new Object();
   var params = window.location.search.slice(1).split('&');

   for (var i = 0; i < params.length; i++)
   {
     idx = params[i].indexOf('=');

     if (idx > 0)
     {
       result[params[i].substring(0, idx)] = params[i].substring(idx + 1);
     }
   }

   return result;
 })();


urlParams['hide-pages'] = 1;


urlParams['ui'] = 'dark';

// urlParams['rough'] = 0;
// urlParams['ui'] = 'min';



urlParams['nowarn'] = 1;

urlParams['toolbar'] = 1;
urlParams['plugins'] = 0;

// urlParams['format'] = 0;

// Disables all features that require external web services
urlParams['stealth'] = 1;
urlParams['offline'] = 1;


// Shortcut for db=0&gapi=0&math=0&picker=0, disables the splash screen and creates an empty, local diagram file
urlParams['demo'] = 1;

urlParams['dev'] = 1;
urlParams['pwa'] = 0;


let BASE_URI = '';

if(document.location.toString().match(/localhost/)) {
  BASE_URI = '//localhost/drawio/www/';
}
else {
  BASE_URI = '//' + document.location.hostname;
}
