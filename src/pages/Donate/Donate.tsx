function Donate() {
  return (
    <div style={{ backgroundColor: "#fff", padding: "20px" }}>
      <h2>Поддержите проект Before&After </h2>
      <iframe
        src="https://yoomoney.ru/quickpay/shop-widget?writer=seller&targets=%D0%9F%D0%BE%D0%B6%D0%B5%D1%80%D1%82%D0%B2%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%BD%D0%B0%20%D0%BF%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D1%83%20Before%26After&targets-hint=&default-sum=&button-text=11&payment-type-choice=on&hint=&successURL=&quickpay=shop&account=410014945667050&"
        width="423"
        height="250"
        //frameborder="0"
        //allowtransparency="true"
        scrolling="no"
      ></iframe>
    </div>
  );
}

export default Donate;
