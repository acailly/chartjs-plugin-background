import { Chart } from 'chart.js'

const plugin = {
  id: 'background',
  beforeDraw: function (chart, args, options) {
    const {color} = options

    if (color) {
      const ctx = chart.ctx
      const canvas = chart.canvas

      ctx.fillStyle = color
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }
}
Chart.register(plugin)
