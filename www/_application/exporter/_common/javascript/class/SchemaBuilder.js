console.log('Schema builder');


class SchemaBuilder extends App
{

  _container;
  _uploadFile = true;
  _configuration;

  _actions = {};

  _vertices = [];


  _fullScreen = false;

  _listeners = {
    entityClick: [],
    clearSelection:  [],
    entityLabelChanged: [],
  };

  constructor(editor, container, lightbox, configuration) {
    super(editor, container, lightbox);

    SchemaBuilder.instance = this;

    this._configuration = configuration;
    this._container = container;
    this.ajax = new AjaxClient();


    this.loadDependencies();
    this.startListeners();
  }


  refreshGraph() {
    this.getGraph().refresh();
  }

  select(cell) {
    this.getGraph().setSelectionCell(cell);
  }



  startListeners() {


    this.getGraph().addListener(mxEvent.LABEL_CHANGED, (sender, evt) => {

      let cell = evt.getProperty("cell");

      if(cell) {
        for(let listener of this._listeners['entityLabelChanged']) {
          listener(cell);
        }
      }

      console.log(cell);

    });


    this.getGraph().addListener(mxEvent.CLICK, (sender, evt) => {
      let cell = evt.getProperty("cell"); // cell may be null

      if (cell != null) {
        // SelectGraphCell(cell);

        for(let listener of this._listeners['entityClick']) {
          listener(cell);
        }

        this.getGraph().setSelectionCell(cell);
      }
      else {
        // console.log(this.getGraph());
        this.getGraph().selectionModel.clear(cell);
        for(let listener of this._listeners['clearSelection']) {
          listener(cell);
        }
      }
      evt.consume();
    });
  }

  addEventListener(name, callback) {
    if(!this._listeners[name]) {
      this._listeners[name] = [];
    }

    this._listeners[name].push(callback);
  }

  async loadDependencies() {
    // TIPS MODULE import in a method
    let SaveAction = await import('./Actions/Save.js');
    let saveAction = new SaveAction.default(this);
    this._actions['save'] = saveAction;
  }

  // SECTION Ajax methods=======================
  async loadFromURL(url) {
    let xml = await this.ajax.get(url, false);
    this.loadXML(xml);
  }

  async postData(url = '', data = {}) {
    return await this.ajax.post(url, data);
  }




  // ===========================================

  fullscreen(value = true) {
    if(this._fullScreen != value) {
      document.querySelector('*[title="Fullscreen"]').click();
      this._fullScreen = value;
    }
  }


  // ===========================================

  getFile() {
    return this.currentFile;
  }

  getGraph() {
    return this.getEditor().graph;
  }

  getEditor() {
    return this.editor;
  }

  setUnmodified() {
    this.getCurrentFile().modified = false;
    return this;
  }

  linkGraphItems(vertexFrom, vertexTo) {
    return this.linkCells(vertexFrom.getMxCell(), vertexTo.getMxCell());
  }

  linkCells(from, to) {
    let graph = this.getGraph();
    graph.getModel().beginUpdate();
    let link = graph.insertEdge(this.getRoot(), null, '', from, to);
    graph.getModel().endUpdate();
    return link;
  }

  getRoot() {
    return this.getGraph().getDefaultParent();
  }






  insertVertex(x, y, width = 120, height = 30, caption = '', type = null, id = null, parent = null) {
    let vertex = null;

    vertex = new GraphItem(this, caption, type, id);
    vertex.setDimentions(width, height);
    vertex.setPositions(x, y);
    vertex.insert(parent);

    this._vertices.push(vertex);
    return vertex;
  }

  circleLayout(radius = 10) {
    let graph = this.getGraph();
    graph.getModel().beginUpdate();

    var circleLayout = new mxCircleLayout(graph, radius);
    circleLayout.execute(graph.getDefaultParent());
    console.log(circleLayout);
    graph.getModel().endUpdate();

    /*
    try
    {
      var circleLayout = new mxCircleLayout(graph, radius);
      console.log(circleLayout);
      circleLayout.execute(graph.getDefaultParent());
    }
    finally
    {
      var morph = new mxMorphing(graph);
      morph.addListener(mxEvent.DONE, function()
      {
        graph.getModel().endUpdate();
      });

      morph.startAnimation();
    }
    */
  }


  loadXML(xml) {



    /*
    console.log(this.getEditor());
    this.createFile(
      this.getCurrentFile().title,
      xml
    );
    return;
    */


    {
    /*
    console.log(this.getXML().innerHTML);
    this.currentFile = new LocalFile(
      this,
      '<mxGraphModel>' + this.getXML().innerHTML + '</mxGraphModel>',
      this.currentFile.title,
      this.currentFile.temp,
      this.currentFile.fileHandle,
      this.currentFile.desc
    );
    */



    let xmlNode = mxUtils.parseXml(xml).documentElement;
    this.getEditor().setGraphXml(xmlNode);
    this.setUnmodified();


    let model = this.getGraph().getModel();


    for(let id in model.cells) {

      let mxCell = model.cells[id];

      console.log(mxCell);

      let vertex = new GraphItem(
        this,
        mxCell.value,
        null,
        mxCell.id
      );
      vertex.setMxCell(mxCell);

      if(mxCell.geometry) {
        // vertex.setDimentions(mxCell.geometry.width, mxCell.geometry.height);
        // vertex.setPositions(mxCell.geometry.x, mxCell.geometry.y);
      }



      this._vertices.push(vertex);


      console.log(this);
    }



    /*
    this.getEditor().undoManager.clear();
    this.getEditor().setModified(false);
    this.getEditor().setStatus('');

    this.getCurrentFile().modified = false;

    this.getCurrentFile().setModified(false);
    this.getCurrentFile().synchronizeFile();
    console.log(this.modified());
    */
    return this;
    }
  }

  getXML() {
    return this.getEditor().getGraphXml();
  }

  // overrided method
  async doSaveLocalFile(data, filename, mimeType, base64Encoded, format, defaultExtension) {

    // return await this._actions['save'].uploadPNG(data, filename, mimeType, base64Encoded, format, defaultExtension)

    return await this._actions['save'].download(data, filename, mimeType, base64Encoded, format, defaultExtension)
 }
}

// Static methods/properties ===============================

SchemaBuilder.instance;

SchemaBuilder.getInstance = function() {
  return this.instance;
}

