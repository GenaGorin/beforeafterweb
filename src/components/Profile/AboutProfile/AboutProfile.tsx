import styles from "../Profile.module.css";

type TAboutProfile = {
  user: any;
};

function AboutProfile({ user }: TAboutProfile) {
  return (
    <div>
      <div className={styles.profileDesc}>
        <div>Описание</div>
        <div>{user.description}</div>
      </div>
      <div className={styles.profileContacts}>
        <div style={{ fontSize: 18 }}>Контакты:</div>
        <div>
          <span>vk:</span> {user.vk}
        </div>
        <div>
          <span>instagram:</span> {user.instagram}
        </div>
        <div>
          {" "}
          <span>telegram:</span> {user.telegram}
        </div>
        <div>
          <span>WhatsApp:</span> {user.whatsapp}
        </div>
      </div>
    </div>
  );
}

export default AboutProfile;
