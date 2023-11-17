import { useState } from 'react'
import './Landing.css'
import { Modal } from '../../components/Modal'
import { Form } from '../../components/Form';

export const Landing = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div>
      <h1>Mi Mood</h1>
      <div>
        <button onClick={() => {
          setIsFormOpen(true)
        }}>Sign Up</button>
        {isFormOpen ? (
          <Modal
          open={isFormOpen}
          onClose={() => {
            setIsFormOpen(false)
          }}
          <Form title='HI'</Form>
          </Modal>
        ) : null}
      </div>
    </div>
  )
};
