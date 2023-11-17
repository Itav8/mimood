import { useState } from 'react'
import { Modal } from '../../components/Modal'
import { Form } from '../../components/Form';

import './Landing.css'

export const Landing = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div>
      <h1>Mi Mood</h1>
      <button onClick={() => {
        setIsFormOpen(true)
      }}>Sign Up
      </button>
      {isFormOpen ? (
        <Modal
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
        }}>
          <Form title="test" />
        </Modal>
      ) : null}

    </div>
  )
};
