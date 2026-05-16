import { useRef, useState, useEffect } from 'react'
import ReactGridLayout from 'react-grid-layout/legacy'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import type { GridItem } from '../types/store'

const ROW_HEIGHT = 60
const MARGIN: [number, number] = [4, 4]
const CONTAINER_PADDING: [number, number] = [4, 0]

interface TerrainCanvasProps {
  layout: GridItem[]
  onLayoutChange: (newLayout: GridItem[]) => void
}

export function TerrainCanvas({ layout, onLayoutChange }: TerrainCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setContainerSize({ width, height })
      }
    })
    observer.observe(el)
    // initial measure
    const rect = el.getBoundingClientRect()
    setContainerSize({ width: rect.width, height: rect.height })
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {containerSize.width > 0 && (
        <ReactGridLayout
          className="layout"
          width={containerSize.width}
          layout={layout}
          cols={12}
          rowHeight={ROW_HEIGHT}
          margin={MARGIN}
          containerPadding={CONTAINER_PADDING}
          autoSize={false}
          isDraggable={true}
          isResizable={false}
          isBounded={true}
          preventCollision={true}
          compactType={null}
          style={{ height: containerSize.height }}
          onLayoutChange={(newLayout) => onLayoutChange(newLayout as GridItem[])}
        >
          {layout.map((item) => (
            <div key={item.i} className="terrain-plot">
              <div className="plot-soil">
                <span className="plot-label">{item.i}</span>
              </div>
            </div>
          ))}
        </ReactGridLayout>
      )}
    </div>
  )
}
