import { createContext, useContext } from "react";

export const UserContext = createContext();
export const useUser = () => {
    return useContext(UserContext);
};
const UserProvider = ({ children, User }) => {
    const value = {
        CurrentUser: User,
    };
    return User ? (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    ) : (
        <>{children}</>
    );
};

export default UserProvider;
