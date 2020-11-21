import Masonry from 'react-masonry-css'
import PinCard from '../components/PinCard'
export default function Feed({pins, includeFooter}){
  return (

      <Masonry
        breakpointCols={{ default: 5, 1280: 4, 1024: 3, 768: 2, 640: 1 }}
        className="container mx-auto flex"
        columnClassName="mx-2"
      >
        { pins && pins.map((pin, index) => 
          <PinCard className="my-10" key={index} pin={pin} includeFooter={includeFooter} />
        ) }
      </Masonry>
  )
}
