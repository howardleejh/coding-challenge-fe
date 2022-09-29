import { useNavigate } from 'react-router-dom'

import './CollectionCard.scss'

const CollectionCard = (props) => {
  const navigate = useNavigate()

  const productClickHandler = () => {
    navigate(`/collections/${props.id}`)
  }

  return (
    <div
      className={`card ${props.className}`}
      id={props.id}
      style={{
        background: `#fff url(${
          props.image || 'https://via.placeholder.com/500'
        }) no-repeat center center`,
        backgroundSize: `cover`,
      }}
      onClick={productClickHandler}
    >
      <ul>
        <li>
          <h3>{props.title}</h3>
        </li>
        <li>
          <h4>{props.collection}</h4>
        </li>
        <li>
          <h4>{props.sub_collection}</h4>
        </li>
        <li>
          <h5>{props.sku}</h5>
        </li>
        <li>
          <h5>Stock: {props.stock ? props.stock : 0}</h5>
        </li>
      </ul>
    </div>
  )
}
export default CollectionCard
