import PropTypes from 'prop-types' // Import PropTypes
import { Modal, Button, Form } from 'react-bootstrap'

const EditCardModal = ({
  show,
  handleClose,
  cardDetails,
  handleChange,
  handleSubmit
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <h4>Card Number</h4>
          <Form.Control
            type='text'
            name='number'
            placeholder='XXXX XXXX XXXX XXXX'
            value={cardDetails.number}
            onChange={handleChange}
            required
          />
          <div className='row mt-3'>
            <div className='col-md-9'>
              <h4>Cardholder Name</h4>
              <Form.Control
                type='text'
                name='name'
                placeholder='John Brown'
                value={cardDetails.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='col-md-3'>
              <h4>Valid Thru</h4>
              <Form.Control
                type='text'
                name='validThru'
                placeholder='mm/yy'
                value={cardDetails.validThru}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Button variant='primary' type='submit' className='mt-3'>
            Save Edit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

EditCardModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  cardDetails: PropTypes.shape({
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    validThru: PropTypes.string.isRequired
  }).isRequired, 
  handleChange: PropTypes.func.isRequired, 
  handleSubmit: PropTypes.func.isRequired 
}

export default EditCardModal
