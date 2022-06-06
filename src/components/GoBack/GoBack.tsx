import { useHistory } from "react-router-dom";
import backIcon from "../../images/goBack.svg";

function GoBack() {
  const history = useHistory();

  return (
    <div
      onClick={() => {
        history.goBack();
      }}
      style={{
        display: "flex",
        color: "#0087ff",
        marginBottom: "20px",
        cursor: "pointer",
      }}
    >
      <img src={backIcon} alt="back" />
      <div>Назад</div>
    </div>
  );
}

export default GoBack;
