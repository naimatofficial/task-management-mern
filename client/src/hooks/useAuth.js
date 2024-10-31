import { useSelector } from "react-redux";

const useAuth = () => {
	// Get the userInfo from the Redux store
	const data = useSelector((state) => state.auth);

	const user = data?.userInfo?.user || null;

	return user;
};

export default useAuth;
