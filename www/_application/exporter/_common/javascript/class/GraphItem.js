class GraphItem extends mxCell
{

  // _schemaBuilder;
  // _graph;


  _type = '';


  _fillColor = ''
  _strokeColor = '';


  _width = 140;
  _height = 26;


  _fillColor = ''
  _strokeColor = '#ffffff';
  _fontColor = '#f0f0f0';


  /*
  mxTransient = [
    '_schemaBuilder',
    '_graph',
    'parent',
    'children',
  ];
  */


  constructor(caption = '', type = null) {

    // super(caption, new mxGeometry(0,0, 140, 26));
    super();
    this._type = type;

    let doc = mxUtils.createXmlDocument();
    let nodeValue = doc.createElement('MyNode')
    nodeValue.setAttribute('label', caption);
    nodeValue.setAttribute('attribute1', 'value1');
    this.setValue(nodeValue);
  }

  loadFromCell(cell) {
    for(let attribute in cell) {
      this[attribute] = cell[attribute];
    }
    return this;
  }


  getCaption() {
    return this.getAttribute('label');
  }


  getGraph() {
    return window.$schemaBuilder.getGraph();
  }


  moveTo(x, y) {

    let graph = this.getGraph();
    graph.getModel().beginUpdate();


    try
    {
      var geo = graph.getCellGeometry(this._mxCell);
      geo = geo.clone();
      geo.x = x;
      geo.y = y;
      graph.getModel().setGeometry(this._mxCell, geo);
    }
    finally
    {
      var morph = new mxMorphing(graph);
      morph.addListener(mxEvent.DONE, () => {
        graph.getModel().endUpdate();
        this.setPositions(x, y);
        this._schemaBuilder.setUnmodified();
      });
      morph.startAnimation();
    }
  }

  render(parent = null) {

    let graph = this.getGraph();

    if(!parent) {
      parent = graph.getDefaultParent();
    }

    // graph.getModel().add(parent, this);
    // return this;
    let cell = graph.insertVertex(parent, this.getId(), this.value, this._left, this._top, this._width, this._height, this.getCustomStyle())
    return cell;

    // graph.getModel().endUpdate();
  }

  setFillColor(color) {
    this._fillColor = color;
    return this;
  }

  setCustomStyle(style) {
    this._style = style;
    return this;
  }

  getCustomStyle() {
    let style = '';
    if(this._type) {
      style += "shape=" + this._type;
    }

    return  style + ';fillColor=' + this._fillColor + ';strokeColor=' + this._strokeColor + ';fontColor=' + this._fontColor  +';';
  }
}
