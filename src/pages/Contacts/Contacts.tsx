import { useEffect, useState } from "react";
import { clickContact, getContacts } from "../../redux/actions";
import styles from "./Contacts.module.css";
import instIcon from "../../images/instagram.svg";
import telegramIcon from "../../images/telegram.svg";
import ynadexIcon from "../../images/yandex.jpeg";

function Contacts() {
  const [contacts, setContacts] = useState<any>([]);

  const clickOnContact = (e: any, contact: any) => {
    e.preventDefault();
    clickContact(contact.contact);
    window.open(contact.href, "_blank");
  };

  useEffect(() => {
    getContacts(setContacts);
  }, []);

  return (
    <div className={styles.contactsWrapper}>
      <div className={styles.title}>О приложении:</div>
      <div className={styles.text}>
        Добро пожаловать в приложении Before&After, приложение создано с целью
        того что бы дать возможность людям делиться своими целями и похвастаться
        прогрессом до и после , а так же получить поддрежку в своих начинаниях
        от других пользователей. Давайте достигать цели вместе и радоваться
        жизни!
      </div>
      <br />
      <div className={styles.title}>Контакты:</div>
      {contacts.length > 0 ? (
        <>
          <div className={styles.text}>
            Друзья, если у вас есть предложения по улучшению или сотрудничеству
            пишите сюда:
          </div>
          <a
            onClick={(e) => clickOnContact(e, contacts[0])}
            href={contacts[0]?.href}
            className={styles.imgWrapp}
          >
            <img src={instIcon} alt="inst" />
            <div>{contacts[0]?.contact}</div>
          </a>
          <a
            href={contacts[1]?.href}
            onClick={(e) => clickOnContact(e, contacts[1])}
            className={styles.imgWrapp}
          >
            <img src={telegramIcon} alt="telegram" />
            <div>{contacts[1]?.contact}</div>
          </a>
        </>
      ) : (
        <></>
      )}

      <br />
      <div className={styles.title}>Поддержите проект:</div>
      <div className={styles.text}>
        Тут можете финансово помочь на развитие и поддрежку проекта
      </div>
      {contacts.length > 0 ? (
        <>
          <a
            href={contacts[2]?.href}
            onClick={(e) => clickOnContact(e, contacts[2])}
            className={styles.imgWrapp}
          >
            <img src={ynadexIcon} alt="telegram" />
            <div>Пожертвовать</div>
          </a>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Contacts;
