import PropTypes from 'prop-types' // Import PropTypes
import { Modal, Button, Form } from 'react-bootstrap'

const AddCardModal = ({
  show,
  handleClose,
  newCardDetails,
  handleNewChange,
  handleNewSubmit
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleNewSubmit}>
          <h4>Card Number</h4>
          <Form.Control
            type='text'
            name='number'
            placeholder='XXXX XXXX XXXX XXXX'
            value={newCardDetails.number}
            onChange={handleNewChange}
            required
          />
          <div className='row mt-3'>
            <div className='col-md-9'>
              <h4>Cardholder Name</h4>
              <Form.Control
                type='text'
                name='name'
                placeholder='John Brown'
                value={newCardDetails.name}
                onChange={handleNewChange}
                required
              />
            </div>
            <div className='col-md-3'>
              <h4>Valid Thru</h4>
              <Form.Control
                type='text'
                name='validThru'
                placeholder='mm/yy'
                value={newCardDetails.validThru}
                onChange={handleNewChange}
                required
              />
            </div>
          </div>
          <Button variant='primary' type='submit' className='mt-3'>
            Save Card
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

AddCardModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired, 
  newCardDetails: PropTypes.shape({
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    validThru: PropTypes.string.isRequired
  }).isRequired,
  handleNewChange: PropTypes.func.isRequired,
  handleNewSubmit: PropTypes.func.isRequired 
}

export default AddCardModal
