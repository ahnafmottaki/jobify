import { useNavigation } from "react-router";

interface SubmitBtnProp {
  formBtn?: boolean;
}

const SubmitBtn = ({ formBtn }: SubmitBtnProp) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      disabled={isSubmitting}
      type="submit"
      className={`btn btn-block ${formBtn && "form-btn"}`}
    >
      {isSubmitting ? "Submitting..." : "submit"}
    </button>
  );
};

export default SubmitBtn;
