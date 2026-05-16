import { useRef, useState, useEffect, useMemo } from 'react'
import ReactGridLayout from 'react-grid-layout/legacy'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import type { GridItem } from '../types/store'

const ROW_HEIGHT = 60
const MARGIN: [number, number] = [4, 4]
const CONTAINER_PADDING: [number, number] = [4, 4]

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

  const maxRows = useMemo(() => {
    if (containerSize.height === 0) return Infinity
    // Formula: availableHeight = height - 2*paddingY
    // Each row occupies: rowHeight + marginY
    // maxRows = floor(availableHeight / (rowHeight + marginY))
    const availableHeight = containerSize.height - CONTAINER_PADDING[1] * 2
    const rowOccupancy = ROW_HEIGHT + MARGIN[1]
    return Math.max(1, Math.floor(availableHeight / rowOccupancy))
  }, [containerSize.height])

  return (
    <div ref={containerRef} style={{ width: '100%', flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
      {containerSize.width > 0 && (
        <ReactGridLayout
          className="layout"
          width={containerSize.width}
          layout={layout}
          cols={12}
          rowHeight={ROW_HEIGHT}
          margin={MARGIN}
          containerPadding={CONTAINER_PADDING}
          maxRows={maxRows}
          autoSize={false}
          isDraggable={true}
          isResizable={false}
          preventCollision={true}
          compactType={null}
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
