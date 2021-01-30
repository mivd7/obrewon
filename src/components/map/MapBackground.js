import { LayersControl, TileLayer } from "react-leaflet";
const { BaseLayer } = LayersControl;

const MapBackground = () => {
  return(<>
      <BaseLayer checked name="OpenStreetMap.Mapnik">
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </BaseLayer>
      <BaseLayer name="OpenStreetMap.BlackAndWhite">
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" />
      </BaseLayer>
    </>
  )
}

export default MapBackground;