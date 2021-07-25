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


    let entity = super.render(parent);
    entity._entityType =  this._entityType;



    for(let field of this._fields) {
      let attribute = new GraphItem(field.caption);
      attribute.render(entity);
    };

    // graph.getModel().endUpdate();
    // graph.refresh();

    return entity;
  }




  getCustomStyle() {
    return super.getCustomStyle() + ';childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;';
  }
}

