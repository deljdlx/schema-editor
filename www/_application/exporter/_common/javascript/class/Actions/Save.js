import Action from './Action.js';

export default class ActionSave  extends Action
{


  getFileExtension(filename, mimeType, defaultExtension) {

		if (mimeType == 'text/xml' &&
			!/(\.drawio)$/i.test(filename) &&
			!/(\.xml)$/i.test(filename) &&
			!/(\.svg)$/i.test(filename) &&
			!/(\.html)$/i.test(filename)
    ) {
			defaultExtension = (defaultExtension != null) ? defaultExtension : 'drawio';
    }
    return defaultExtension;
  }

  async uploadPNG(data) {
    return  await this._editor.postData(this._editor._configuration.savePNGURL, {
      data:data
    });
  }

  async download(data, filename, mimeType, base64Encoded, format, defaultExtension) {

    defaultExtension = this.getFileExtension(filename, mimeType,defaultExtension);

    var a = document.createElement('a');

    let useDownload = true;


    a.href = URL.createObjectURL((base64Encoded) ?
      this._editor.base64ToBlob(data, mimeType) :
      new Blob([data], {type: mimeType}));

    if (useDownload)
    {
      a.download = filename;
    }
    else
    {
      // Workaround for same window in Safari
      a.setAttribute('target', '_blank');
    }

    document.body.appendChild(a);

    try
    {
      window.setTimeout(function()
      {
        URL.revokeObjectURL(a.href);
      }, 20000);

      a.click();
      a.parentNode.removeChild(a);
    }
    catch (e)
    {
      // ignore
    }
  }

}