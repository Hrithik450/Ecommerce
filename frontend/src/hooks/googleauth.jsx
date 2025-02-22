import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AlertObject } from "../components/common/Config";
import { Oauth } from "../store/slices/auth/authThunks";

const useOAuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleOAuthSuccess = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const userID = queryParams.get("tempToken");

      if (userID) {
        setIsLoading(true);
        try {
          const res = await dispatch(Oauth(userID)).unwrap();
          if (res?.success) {
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname
            );
            navigate("/");
          }
        } catch (error) {
          toast.error("OAuth failed:", AlertObject);
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleOAuthSuccess();
  }, [dispatch, navigate]);

  return isLoading;
};

export default useOAuthSuccess;
