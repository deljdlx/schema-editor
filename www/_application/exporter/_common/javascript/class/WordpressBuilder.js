console.log('Schema WordpressBuilder');


class WordpressBuilder extends SchemaBuilder
{

  _colors = {
    entity: {
      fill : '#60a917',
      stroke: '2D7600',
    },

    taxonomy: {
      fill : '#ff00ff',
      stroke: '2D7600',
    },

    role: {
      fill : '#aa0000',
      stroke: '2D7600',
    },
  };

  linkEntity(from, to, cardinalityFrom = '', cardinalityTo = '', caption = '') {
    // return this.linkCells(from, to);


    let relation = new RelationItem(from, to, cardinalityFrom, cardinalityTo, caption);
    relation.insert();
    return relation;


  }

  createItem(name = 'Entity', fields = null) {
    let entity = new EntityItem(name);



    for(let field of fields) {
      entity.addField(field);
    }
    return entity;
  }



  insertRole(name = 'Role', fields = null) {
    if(fields == null) {
      fields = [
        'Name',
      ];
    }

    let model = this.createItem(name, fields)
    model.setFillColor(this._colors.role.fill);
    model.setEntityType('role');
    let entity = model.render();
    this.setUnmodified();
    return entity;
  }


  insertEntity(name = 'Entity', fields = null) {
    if(fields == null) {
      fields = [
        'title',
        'content',
        'image'
      ];
    }

    let model = this.createItem(name, fields)
    model.setFillColor(this._colors.entity.fill);
    model.setEntityType('entity');
    let entity = model.render();
    this.setUnmodified();


    return entity;
  }

  insertTaxonomy(name = 'Taxonomy', fields = null) {

    if(fields == null) {
      fields = [
        'name',
        'description',
      ];
    }

    let model = this.createItem(name, fields)
    model.setFillColor(this._colors.taxonomy.fill);
    model.setEntityType('taxonomy');
    let entity = model.render();

    this.setUnmodified();

    return entity;
  }

}
