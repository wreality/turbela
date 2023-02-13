import { fabric } from 'fabric'

declare module 'fabric' {
  export namespace fabric {
    interface Canvas {
      setAsyncBackgroundImage(
        image: string | fabric.Image,
        options?: fabric.IImageOptions
      ): Promise<fabric.Image>
    }
    interface Object {
      turbelaType?: string
    }
    namespace Image {
      export function asyncFromURL(url: string): Promise<fabric.Image>
    }
  }
}

fabric.Canvas.prototype.setAsyncBackgroundImage = function (image, options) {
  return new Promise((resolve, reject) => {
    try {
      this.setBackgroundImage(
        image,
        (img: fabric.Image) => resolve(img),
        options
      )
    } catch (error) {
      reject(error)
    }
  })
}

fabric.Image.asyncFromURL = function (url) {
  return new Promise((resolve, reject) => {
    try {
      fabric.Image.fromURL(url, (image) => {
        resolve(image)
      })
    } catch (error) {
      reject(error)
    }
  })
}
