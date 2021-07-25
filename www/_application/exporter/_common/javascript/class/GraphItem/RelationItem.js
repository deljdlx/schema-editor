class RelationItem extends GraphItem
{

  _type = '';

  _style = 'endArrow=none;html=1;strokeWidth=2;startArrow=diamond;startFill=1;startSize=16;';
  _fillColor = ''
  _strokeColor = '#FFFFFF';

  // _entityType = 'entity';



  _from;
  _to;

  _cardinalityFrom = '';
  _cardinalityTo = '';



  constructor(from, to, cardinalityFrom = '', cardinalityTo = '', caption ='') {

    super(caption);


    this._cardinalityFrom = cardinalityFrom;
    this._cardinalityTo = cardinalityTo;


    this._from = from;
    this._to = to;

  }


  insert(parent = null) {


    let graph = this.getGraph();
    if(!parent) {
      parent = graph.getDefaultParent();
    }

    graph.getModel().beginUpdate();

    let link = graph.insertEdge(parent, null, '', this._from, this._to);


    link.setStyle('endArrow=none;html=1;strokeWidth=2;startArrow=diamond;startFill=1;startSize=16;');

    console.log(this);


    if(this.value) {

      let caption = new GraphItem(this.getCaption());
      caption = caption.render(link);
      caption.setStyle('edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];');
      caption.geometry.relative = true;

    }

    if(this._cardinalityFrom) {
      let cardinality = new GraphItem(this._cardinalityFrom);
      cardinality = cardinality.render(link);
      cardinality.setStyle('edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];');
      cardinality.geometry.relative = true;
      cardinality.geometry.x = -0.60;
      cardinality.geometry.y = -1;
      cardinality.geometry.width = null;
      cardinality.geometry.height = null;
      cardinality.geometry.offset = new mxPoint();
    }

    if(this._cardinalityTo) {

      let cardinality = new GraphItem(this._cardinalityTo);
      cardinality = cardinality.render(link);
      cardinality.setStyle('edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];');
      cardinality.geometry.relative = true;
      cardinality.geometry.x = 0.60;
      cardinality.geometry.y = -1;
      cardinality.geometry.width = null;
      cardinality.geometry.height = null;
      cardinality.geometry.offset = new mxPoint();
    }


    graph.getModel().endUpdate();
    return link;
  }




  getStyle() {
    return super.getStyle() + ';childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;';
  }
}

