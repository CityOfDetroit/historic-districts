import './node_modules/mapbox-gl/dist/mapbox-gl.css';
import './node_modules/@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './sass/styles.scss';
import Controller from './components/controller.class';

(function start() {
  
  const controller = new Controller(document.querySelector('.content-section'));

  controller.map.map.on('mousemove', function (e, parent = this) {
    let features = this.queryRenderedFeatures(e.point, {
      layers: ['historic-locations-fill']
    });
    if (features.length) {
      this.setFilter('historic-locations-hover', ['==', 'OBJECTID', features[0].properties.OBJECTID]);
    }else{

    }
    this.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });
  controller.map.map.on('mouseleave', 'historic-locations-fill', function () {
    this.setFilter('historic-locations-hover', ['==', 'OBJECTID', '']);
  });
  controller.map.map.on('click', function (e, parent = this) {
    const features = this.queryRenderedFeatures(e.point, {
      layers: ['historic-locations-fill']
    });
    // console.log(e.point);
    if (features.length) {
      controller.updatePanel(features[0], controller);
    } else {

    }
    document.querySelector('.data-panel').className = 'data-panel active';
  });
  controller.map.geocoder.on('result', function (ev) {
    console.log(ev);
    if(controller.geocoderOff){
      controller.geocoderOff = false;
      controller.geoResults(ev, controller);
    }else{
      console.log('extra call');
    }
  });

  document.getElementById('close-panel-btn').addEventListener('click', function () {
    controller.panel.clearPanel();
    document.querySelector('.data-panel.active').className = 'data-panel';
  });
})(window);
