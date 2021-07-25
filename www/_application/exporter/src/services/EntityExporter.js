export default class EntityExporter
{
  exportCustomType(customPostType) {
    let descriptor = {
      attributes: {},
      data: {},
    };

    for(let attribute of customPostType.value.attributes) {
      descriptor.data[attribute.nodeName] = attribute.value;
    }


    if(typeof(customPostType.value) == 'string') {
      descriptor.caption = customPostType.value
    }

    for(let attribute of customPostType.children) {
      const attributeDescriptor = this.exportAttribute(attribute);
      descriptor.attributes[attributeDescriptor.data.label] = attributeDescriptor;
    }
    return descriptor;
  }

  exportAttribute(attribute) {
    let descriptor = {
      data: {}
    };

    for(let data of attribute.value.attributes) {
      descriptor.data[data.nodeName] = data.value;
    }
    return descriptor;
  }

}
