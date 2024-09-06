import styles from "./ErrorMessage.module.css";

type Props = {
  message: string;
};

function ErrorMessage(props: Props) {
  const { message } = props;
  return <p id={styles.errormessage}>{message}</p>;
}
export default ErrorMessage;
