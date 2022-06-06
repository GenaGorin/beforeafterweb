type TAlert = {
  text: string;
};

function Alert({ text }: TAlert) {
  return (
    <div
      className="alert alert-danger"
      style={{
        position: "fixed",
        zIndex: 10,
        bottom: "50px",
        left: "50% ",
        transform: "translate(-50%,-50%)",
      }}
      role="alert"
    >
      {text}
    </div>
  );
}

export default Alert;
