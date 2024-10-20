import styles from "./ErrorMessage.module.css";

interface Props {
  message: string;
}

function ErrorMessage(props: Props) {
  const { message } = props;
  return <p id={styles.errorMessage}>{message}</p>;
}
export default ErrorMessage;
