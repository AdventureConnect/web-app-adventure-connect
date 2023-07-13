import React, { useState } from "react"

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = React.Children.count(children) - 1
    }

    setActiveIndex(newIndex)
  }

  return (
    <>
    <div className="carousel-container">
    <div className="carousel">
      <div className="inner" style={{transform: `translateX(-${activeIndex * 100}%)`}}>
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, {width: "100%"})
        })}
      </div>
    </div>
    <div className="indicators">
        <button onClick={() => updateIndex(activeIndex - 1)}>Dislike</button>
        <button onClick={() => updateIndex(activeIndex + 1)}>Like</button>
    </div>
    </div>
    </>
  )
}

export default Carousel;