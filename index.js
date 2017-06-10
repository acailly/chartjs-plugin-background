(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chart.js')) :
	typeof define === 'function' && define.amd ? define(['chart.js'], factory) :
	(global['chartjs-plugin-background'] = factory(global.Chart));
}(this, (function (Chart) { 'use strict';

Chart = 'default' in Chart ? Chart['default'] : Chart;

var plugin = {
  beforeDraw: function beforeDraw(chartInstance) {
    var backgroundColor = chartInstance.chart.options.backgroundColor;


    if (backgroundColor) {
      var ctx = chartInstance.chart.ctx;
      var canvas = chartInstance.chart.canvas;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
};

Chart.pluginService.register(plugin);

return plugin;

})));
