import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import Spinner from '../spinner/Spinner';

const ModalBox = ({
  show,
  _handleCloseModal,
  _handleActionModal,
  _handleOnChange,
  requiredParam,
  formValue,
  isLoadingInButton,
  children,
  isLogout,
  isForm,
}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePassword = () => setPasswordShown(!passwordShown);

  const toggleConfirmPassword = () =>
    setConfirmPasswordShown(!confirmPasswordShown);

  return (
    <>
      {isForm ? (
        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          className="border-0 modal-change-password"
        >
          <form method="post" onSubmit={_handleActionModal}>
            <Modal.Header className="border-bottom-0">
              <Modal.Title className="fw-medium">Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body className="fs-6">
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-password">
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={_handleOnChange}
                    value={formValue.password}
                  />
                  <div className="eye-icon">
                    <button
                      onClick={togglePassword}
                      type="button"
                      className="bg-transparent p-0 border-0"
                    >
                      {passwordShown ? (
                        <FiEyeOff size="24" />
                      ) : (
                        <FiEye size="24" />
                      )}
                    </button>
                  </div>
                </div>
                <span className="fs-9 text-brand-vivid d-block mt-2">
                  {requiredParam('password')[0]?.message}
                </span>
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="input-password">
                  <input
                    type={confirmPasswordShown ? 'text' : 'password'}
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={_handleOnChange}
                    value={formValue.confirmPassword}
                  />
                  <div className="eye-icon">
                    <button
                      onClick={toggleConfirmPassword}
                      type="button"
                      className="bg-transparent p-0 border-0"
                    >
                      {confirmPasswordShown ? (
                        <FiEyeOff size="24" />
                      ) : (
                        <FiEye size="24" />
                      )}
                    </button>
                  </div>
                </div>
                <span className="fs-9 text-brand-vivid d-block mt-2">
                  {requiredParam('confirmPassword')[0]?.message}
                </span>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-start border-top-0">
              <Button
                className="btn btn-brand-amber py-2 px-3 fw-medium text-white"
                onClick={_handleCloseModal}
                disabled={isLoadingInButton}
                style={
                  isLoadingInButton
                    ? {
                        cursor: 'not-allowed',
                        pointerEvents: 'all',
                      }
                    : {}
                }
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="btn btn-outline-brand-amber text-brand-amber fw-medium py-2 px-3 btn-delete"
              >
                {isLoadingInButton ? (
                  <Spinner isInButton>{children}</Spinner>
                ) : (
                  children
                )}
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      ) : (
        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          className="border-0"
        >
          <Modal.Header className="border-bottom-0 justify-content-center">
            <Modal.Title className="fw-medium">
              {isLogout ? 'Ready to Leave?' : 'Are you sure to remove?'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="fs-6 text-center">
            {isLogout
              ? 'Select "Logout" below if you are ready to end your current session.'
              : 'This Contact data is non-refundable.'}
          </Modal.Body>
          <Modal.Footer className="justify-content-center border-top-0">
            <Button
              className="btn btn-brand-amber py-2 px-3 fw-medium text-white"
              onClick={_handleCloseModal}
              disabled={isLoadingInButton}
              style={
                isLoadingInButton
                  ? {
                      cursor: 'not-allowed',
                      pointerEvents: 'all',
                    }
                  : {}
              }
            >
              Cancel
            </Button>
            <Button
              className="btn btn-outline-brand-amber text-brand-amber fw-medium py-2 px-3 btn-delete"
              onClick={_handleActionModal}
            >
              {isLoadingInButton ? (
                <Spinner isInButton>{children}</Spinner>
              ) : (
                children
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ModalBox;
