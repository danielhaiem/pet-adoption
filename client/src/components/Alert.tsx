import { Toast, ToastContainer } from "react-bootstrap";
import { GiJumpingDog, GiCat } from "react-icons/gi";
import { alertsStore } from "../store";

type Props = {
  bgColorVariant: string;
  toastTitle: string;
  toastBody: string;
};

const Alert = (props: Props) => {
  const alertShow = alertsStore((state) => state.alertShow);
  const setAlertShow = alertsStore((state) => state.setAlertShow);
  const setAlertBool = alertsStore((state) => state.setAlertBool);
  return (
    <ToastContainer position="top-center">
      <Toast
        className="d-inline-block m-1"
        bg={props.bgColorVariant}
        onClose={() => {
          setAlertShow(false);
          if (alertShow === false) {
            setAlertBool(false);
          }
        }}
        show={alertShow}
        delay={3000}
        autohide
      >
        <Toast.Header>
          {props.bgColorVariant === "info" ? (
            <GiJumpingDog className="me-2" />
          ) : (
            <GiCat className="me-2" />
          )}
          <strong className="me-auto">{props.toastTitle}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{props.toastBody}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Alert;
