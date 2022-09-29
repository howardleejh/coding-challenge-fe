import './PillButton.scss'

const PillButton = (props) => {
  return (
    <button className='btn-34' id={props.id} onClick={props.onClick}>
      <span>{props.title}</span>
    </button>
  )
}
export default PillButton
