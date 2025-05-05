import { useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { Slideshow } from "./SlideShow"
import { useAppDispatch } from "../../hooks/hook"
import { setPostToDisplay } from "../../redux/reducer/ViewImg.slice"
import { IPost } from "../../types"
const ImageCarousel = ({ images, post }: { images: string[]; post: IPost }) => {
  const dispatch = useAppDispatch()
  const numberOfImages = images.length
  const [currentSlide, setCurrentSlide] = useState(0)
  function handlesSlide(type: "prev" | "next") {
    switch (type) {
      case "prev":
        if (currentSlide === 0) {
          setCurrentSlide(numberOfImages - 1)
        } else {
          setCurrentSlide(prev => prev - 1)
        }

        break
      case "next":
        if (currentSlide === numberOfImages - 1) {
          setCurrentSlide(0)
        } else {
          setCurrentSlide(prev => prev + 1)
        }
        break
      default:
        setCurrentSlide(0)
        break
    }
  }
  return (
    <div
      className=" gap-5 flex items-center overflow-hidden h-auto relative hover:cursor-pointer"
      onClick={() => {
        dispatch(setPostToDisplay(post))
      }}
    >
      <button
        onClick={() => {
          handlesSlide("prev")
        }}
        className="btn btn-circle btn-sm btn-primary absolute left-0"
      >
        <IoIosArrowBack />
      </button>
      <div className="flex overflow-hidden flex-1 h-[500px] justify-center ">
        <Slideshow image={images[currentSlide]} key={currentSlide} />
      </div>
      <button
        onClick={() => {
          handlesSlide("next")
        }}
        className="btn btn-circle btn-primary btn-sm absolute right-0"
      >
        <IoIosArrowForward />
      </button>
    </div>
  )
}

export default ImageCarousel
