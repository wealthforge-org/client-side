import React from 'react'
import {fetchAssets} from '../../API/InternalApis/fetchAssets';

const Portfolio = () => {

  const user_id = 1;

  return (
    <div>Portfolio
      <br />
      <button onClick={() => fetchAssets(user_id)}>Hell</button>
    </div>
  )
}

export default Portfolio