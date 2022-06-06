import styles from "./SubcribeBtn.module.css";

function SubscribeBtn({ callback, text }: any) {
  return (
    <div onClick={callback} className={styles.subscribeBtn}>
      {text}
    </div>
  );
}

export default SubscribeBtn;
