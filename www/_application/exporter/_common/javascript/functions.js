/**
 * Adds meta tag to the page.
 */
function mxmeta(name, content, httpEquiv)
{
  try
  {
    var s = document.createElement('meta');

    if (name != null)
    {
      s.setAttribute('name', name);
    }

    s.setAttribute('content', content);

    if (httpEquiv != null)
    {
      s.setAttribute('http-equiv', httpEquiv);
    }

      var t = document.getElementsByTagName('meta')[0];
      t.parentNode.insertBefore(s, t);
  }
  catch (e)
  {
    // ignore
  }
};




/**
 * Synchronously adds scripts to the page.
 */
function mxscript(src, onLoad, id, dataAppKey, noWrite)
{
  var defer = onLoad == null && !noWrite;

  if ((urlParams['dev'] != '1' && typeof document.createElement('canvas').getContext === "function") ||
    onLoad != null || noWrite)
  {
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('defer', 'true');
    s.setAttribute('src', src);

    if (id != null)
    {
      s.setAttribute('id', id);
    }

    if (dataAppKey != null)
    {
      s.setAttribute('data-app-key', dataAppKey);
    }

    if (onLoad != null)
    {
      var r = false;

      s.onload = s.onreadystatechange = function()
      {
        if (!r && (!this.readyState || this.readyState == 'complete'))
        {
              r = true;
              onLoad();
        }
        };
    }

      var t = document.getElementsByTagName('script')[0];

      if (t != null)
      {
        t.parentNode.insertBefore(s, t);
      }
  }
  else
  {

    document.write('<script src="' + src + '"' + ((id != null) ? ' id="' + id +'" ' : '') +
      ((dataAppKey != null) ? ' data-app-key="' + dataAppKey +'" ' : '') + '></scr' + 'ipt>');

  }
};



/**
 * Asynchronously adds scripts to the page.
 */
function mxinclude(src)
{
  var g = document.createElement('script');
  g.type = 'text/javascript';
  g.async = true;
  g.src = src;

    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(g, s);
};