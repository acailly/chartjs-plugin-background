import plugin from './chartjs-plugin-background'

describe('Chart.js background plugin', () => {
  it('should not fill the background rect if backgroundColor option is not set', () => {
    const fillRectMock = jest.fn()
    const chartInstance = {
      chart: {
        ctx: {
          fillRect: fillRectMock
        },
        options: {
          backgroundColor: null
        }
      }
    }

    plugin.beforeDraw(chartInstance)

    expect(fillRectMock.mock.calls.length).toBe(0)
  })

  it('should fill the background rect with color set in backgroundColor option', () => {
    const fillRectMock = jest.fn()
    const chartInstance = {
      chart: {
        canvas: {
          width: 200,
          height: 200
        },
        ctx: {
          fillRect: fillRectMock
        },
        options: {
          backgroundColor: 'pink'
        }
      }
    }

    plugin.beforeDraw(chartInstance)

    expect(fillRectMock.mock.calls.length).toBe(1)
  })
})
