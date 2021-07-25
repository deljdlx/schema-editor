class Application
{


  _configuration = {
    watchInterval: 200,
  };

  _watcher;

  _schemaBuilder;
  _container;

  _lastXML;


  constructor(schemaBuilder) {
    console.log('%c' + 'construct', 'color: #baf; font-size: 1rem; background-color:#fff');
    this._schemaBuilder = schemaBuilder;
    this._container = container;
  }


  getXML() {
    return this._schemaBuilder.getXML().innerHTML;
  }

  watch() {
    this._watcher = setInterval(() => {

      let xml = this.getXML();

      if(xml != this._lastXML) {

        const event = new CustomEvent('schema.content.changed', {
          detail: {
            xml: xml
          }
        });
        document.dispatchEvent(event);;

      }
      else {
        // console.log('%c' + 'no change', 'color: #0bf; font-size: 1rem; background-color:#fff');
      }

      this._lastXML = xml;
    }, this._configuration.watchInterval);
  }


  stopWatch() {
    clearInterval(this._watcher);
  }

}
