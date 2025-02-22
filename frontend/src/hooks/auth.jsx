import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchprofile } from "../store/slices/auth/authThunks";
import { AlertObject } from "../components/common/Config";

const useUserID = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [userID, setUserID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await dispatch(fetchprofile()).unwrap();
        setUserID(res.user?.userID);
      } catch (error) {
        toast.error("Failed to fetch profile", AlertObject);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProfileData();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, dispatch]);

  return { userID, isLoading };
};

export default useUserID;
