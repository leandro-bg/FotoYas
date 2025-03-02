import React from 'react'

const FormarPriceHook = () => {

    const parserPrice = (price) => {
        const transformNumber = parseInt(price)
        return transformNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }



  return {parserPrice}
}

export default FormarPriceHook
