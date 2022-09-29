import './Footer.scss'

const Footer = () => {
  const now = new Date()

  return (
    <div className='footer'>
      <h6>
        COPYRIGHT © {now.getFullYear()} MIGHTY JAXX INTERNATIONAL PTE LTD. ALL
        RIGHTS RESERVED.
      </h6>
    </div>
  )
}
export default Footer
