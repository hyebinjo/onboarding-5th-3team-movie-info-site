import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateAccountForm from "../component/CreateAccountForm";
import { getLoggedInUser } from "../utils/useAccount";
import { Container } from "./Login";

function CreateAccount() {
  const navigate = useNavigate();

  const token = getLoggedInUser();
  useEffect(() => {
    if (token) navigate("/");
  }, []);

  return (
    <Container>
      <CreateAccountForm />
    </Container>
  );
}

export default CreateAccount;
