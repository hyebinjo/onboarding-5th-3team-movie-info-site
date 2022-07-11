import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { checkExistEmail, createAccount, login } from "../utils/useAccount";
import { errorMessages } from "../utils/validation";
import {
  Button,
  ButtonContainer,
  checkError,
  Form,
  Input,
  InputBox,
  InputContainer,
  Title,
  validInput,
  Worning,
} from "./LoginForm";

function CreateAccountForm() {
  const [errors, setErrors] = useState({
    email: true,
    password: true,
    worning: "",
  });
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (checkError(errors)) return;

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (await checkExistEmail(email))
      return setErrors((prevState) => ({
        ...prevState,
        worning: errorMessages.duplicateEmail,
      }));

    await createAccount({ email, password });

    login(email);
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>계정 만들기</Title>
      <InputContainer>
        {errors.worning && <Worning>{errors.worning}</Worning>}
        <InputBox>
          <Input
            name="email"
            type={"text"}
            ref={emailRef}
            onChange={() => validInput(emailRef, setErrors)}
            error={errors.email}
          />
          <span>이메일 주소</span>
        </InputBox>
        <InputBox>
          <Input
            name="password"
            type={"password"}
            ref={passwordRef}
            onChange={() => validInput(passwordRef, setErrors)}
            error={errors.password}
          />
          <span>비밀번호</span>
        </InputBox>
      </InputContainer>
      <ButtonContainer>
        <Button type={"submit"}>회원가입</Button>
      </ButtonContainer>
    </Form>
  );
}

export default CreateAccountForm;
