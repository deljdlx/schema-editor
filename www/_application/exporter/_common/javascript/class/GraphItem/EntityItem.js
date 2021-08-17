class EntityItem extends GraphItem
{


  _fields = [];

  _type = 'swimlane';

  _style = '';

  _entityType = 'entity';





  addField(caption) {
    this._fields.push({
      caption: caption
    })
  }


  setEntityType(type) {
    this._entityType = type;
    return this;
  }

  getEntityType() {
    return this._entityType;
  }



  render(parent = null) {


    // let graph = this.getGraph();
    // graph.getModel().beginUpdate();


    let cell = super.render(parent);

    let doc = mxUtils.createXmlDocument();
    let nodeValue = doc.createElement('MyNode')
    nodeValue.setAttribute('label', this.getAttribute('label'));
    cell.setValue(nodeValue);
    cell._entityType = this._entityType;


    for(let field of this._fields) {
      let attribute = new GraphItem(field.caption);
      attribute.render(cell);
    };


    // cell.__proto__ = EntityItem.prototype;
    // cell.constructor.call(cell);


    /*
    let entity = new EntityItem();
    entity.loadFromCell(cell);
    entity._entityType =  this._entityType;
    */


    // graph.getModel().endUpdate();
    // graph.refresh();

    return cell;
  }




  getCustomStyle() {
    return super.getCustomStyle() + ';childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;';
  }
}

