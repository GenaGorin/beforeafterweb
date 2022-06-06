import { useEffect, useState } from "react";
import { getContacts } from "../../redux/actions";
import styles from "../Contacts/Contacts.module.css";
import instIcon from "../../images/instagram.svg";
import telegramIcon from "../../images/telegram.svg";

function BannedPage() {
  const [contacts, setContacts] = useState<any>();

  useEffect(() => {
    getContacts(setContacts);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ backgroundColor: "#fff", marginTop: "200px", padding: 20 }}>
        <div className={styles.contactsWrapper}>
          <div className={styles.title}>Ваш аккаунт был забанен :(</div>
          <div className={styles.text}>
            По вопросам блокировки обращайтесь сюда
          </div>
          <a
            href={"https://www.instagram.com/" + contacts?.instagram + "/"}
            className={styles.imgWrapp}
          >
            <img src={instIcon} alt="inst" />
            <div>{contacts?.instagram}</div>
          </a>
          <a
            href={"https://t.me/" + contacts?.telegram + "/"}
            className={styles.imgWrapp}
          >
            <img src={telegramIcon} alt="telegram" />
            <div>{contacts?.telegram}</div>
          </a>
        </div>
      </div>
    </div>
  );
}
export default BannedPage;
