import { useEffect, useState } from "react";
import { IAnswer } from "../../../interfaces/answer";
import { getAnswers } from "../../../redux/actions";
import Loader from "../../Loader/Loader";
import SingleAnswer from "./SingleAnswer";
import trangleIcon from "../../../images/trangleDown.png";

type TAnswersComponent = {
  commentId: number;
  count: number;
};

function AnswersComponent({ commentId, count }: TAnswersComponent) {
  const [answers, setAnswers] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);
  const addAnswers = (data: any) => {
    setAnswers([...answers, ...data]);
  };
  useEffect(() => {
    getAnswers(commentId, 0, addAnswers, setLoaded);
  }, []);

  const loadMoreAnswer = () => {
    console.log("offset", answers.length);

    getAnswers(commentId, answers.length, addAnswers, setLoaded);
  };

  return (
    <div>
      {loaded ? (
        <>
          {answers.map((answer: IAnswer) => (
            <SingleAnswer key={answer.id} answer={answer} />
          ))}
          {count > answers.length ? (
            <div
              style={{
                color: "#6997d3",
                fontWeight: 600,
                marginTop: "16px",
                cursor: "pointer",
              }}
              onClick={loadMoreAnswer}
            >
              Еще
              <img
                style={{ width: "20px", height: "12px", marginLeft: "5px" }}
                src={trangleIcon}
              />
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default AnswersComponent;
