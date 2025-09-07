import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonBack() {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        // Need to prevent default because this btn inside the form will reload
        e.preventDefault();
        navigate(-1); // to go back need count num of step want to back in the browswe history
      }}
    >
      &larr; Back
    </Button>
  );
}

export default ButtonBack;
