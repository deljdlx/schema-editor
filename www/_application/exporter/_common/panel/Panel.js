class JDLXPanel
{


  _container;
  _firstPanel;
  _secondPanel;
  _secondPanelContent;
  _handler;

  _wrapper;

  _splitDirection = 'vertical';

  constructor(container) {

    if(typeof(container) === 'string') {
      container = document.querySelector(container);
    }

    this._container = container;

    this._wrapper = document.createElement('div');
    this._wrapper.classList.add('jdlx-panel__wrapper');

    this._firstPanel = document.createElement('div');
    this._firstPanel.classList.add('jdlx-panel__panel');
    this._firstPanel.classList.add('jdlx-panel__panel--left');


    this._secondPanel = document.createElement('div');
    this._secondPanel.classList.add('jdlx-panel__panel');
    this._secondPanel.classList.add('jdlx-panel__panel--second');

    this._handler = document.createElement('div');
    this._handler.classList.add('jdlx-panel__handler');
    this._secondPanel.appendChild(this._handler);

    this._secondPanelContent = document.createElement('div');
    this._secondPanelContent.classList.add('jdlx-panel__panel');
    this._secondPanelContent.classList.add('jdlx-panel__panel--content');
    this._secondPanel.appendChild(this._secondPanelContent);

    this._wrapper.appendChild(this._firstPanel);
    this._wrapper.appendChild(this._secondPanel);
    this._container.appendChild(this._wrapper);

    this._handler.addEventListener('dblclick', (event) => {
      this.foldFirstPanel();
    })
  }


  setFirstPanelSize(size) {
    if(this._splitDirection == 'vertical') {

      this._firstPanel.style.width = parseInt(size) + 'px';
      this._secondPanel.style.width = 'calc(100% - ' + this._firstPanel.style.width +')';
    }
    else {
      this._firstPanel.style.height = parseInt(size) + 'px';
      this._secondPanel.style.height = 'calc(100% - ' + this._firstPanel.style.height +')';
    }
  }


  foldFirstPanel() {

    if(!parseInt(this._firstPanel.dataset.folded)) {
      this._firstPanel.dataset.folded = 1;
      this._firstPanel.dataset.lastSize = this._firstPanel.style.width;
      this._firstPanel.style.width = 0;
      this.setFirstPanelSize(0);
    }
    else {
      this._firstPanel.dataset.folded = 0;
      this.setFirstPanelSize(this._firstPanel.dataset.lastSize);
    }
  }

  verticalSplit() {
    this._splitDirection = 'vertical';
    this._wrapper.classList.add('jdlx-panel__wrapper--vertical');
    this._handler.addEventListener('mousedown', (event) => {
      this.resizeWidth(event);
    });
  }

  horizontalSplit() {

    this._splitDirection = 'horizontal';
    this._wrapper.classList.add('jdlx-panel__wrapper--horizontal');
    this._handler.addEventListener('mousedown', (event) => {
      this.resizeHeight(event);
    });
  }

  getFirstPanel() {
    return this._firstPanel;
  }

  getSecondPanel() {
    return this._secondPanel;
  }

  getSecondPanelContent() {
    return this._secondPanelContent;
  }

  getHandler() {
    return this._handler;
  }


  resizeWidth(e) {

    window.addEventListener('mousemove', mousemoveHorizontal);
    window.addEventListener('mouseup', mouseupHorizontal);

    let prevX = e.x;
    const leftPanel = this._firstPanel.getBoundingClientRect();

    const self = this;

    function mousemoveHorizontal(e) {
      let newX = prevX - e.x;
      self._firstPanel.style.width = leftPanel.width - newX + "px";
      self._secondPanel.style.width = 'calc(100% - ' + self._firstPanel.style.width +')';
    }

    function mouseupHorizontal() {
      window.removeEventListener('mousemove', mousemoveHorizontal);
      window.removeEventListener('mouseup', mouseupHorizontal);
    }
  }


  resizeHeight(e) {

    window.addEventListener('mousemove', mousemoveVertical);
    window.addEventListener('mouseup', mouseupVertical);

    let prevY = e.y;
    const panel = this._firstPanel.getBoundingClientRect();

    const self = this;

    function mousemoveVertical(e) {
      let newY = prevY - e.y;
      self._firstPanel.style.height = panel.height - newY + "px";
      self._secondPanel.style.height = 'calc(100% - ' + self._firstPanel.style.height +')';
    }

    function mouseupVertical() {
      window.removeEventListener('mousemove', mousemoveVertical);
      window.removeEventListener('mouseup', mouseupVertical);
    }
  }

}
