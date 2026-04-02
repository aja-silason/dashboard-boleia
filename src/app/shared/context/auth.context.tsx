import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginOutput } from "../../infra/service/entity/UserOutput";

const STORAGE_KEY = "IkeiyeUnaKuTwalla";

type AuthState = {
    userInformation: LoginOutput | null;
    isLoadingAuth: boolean;
    isAuthenticated: boolean;
    addUserInformation: (value: LoginOutput) => void;
    logOut: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userInformation, setUserInformation] = useState<LoginOutput | null>(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadStorageData = () => {
            try {
                const userRaw = localStorage.getItem(STORAGE_KEY);
                if (userRaw) {
                    const parsedUser = JSON.parse(userRaw);
                    setUserInformation(parsedUser);
                }
            } catch (e) {
                console.error("Erro ao fazer parse dos dados de autenticação", e);
                localStorage.removeItem(STORAGE_KEY);
            } finally {
                setIsLoadingAuth(false);
            }
        };

        loadStorageData();
    }, []);

    const logOut = () => {
        setUserInformation(null);
        localStorage.clear();
        navigate("/login", { replace: true });
    };

    const addUserInformation = (value: LoginOutput) => {
        setUserInformation(value);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    };

    const isAuthenticated = !!userInformation;

    return (
        <AuthContext.Provider value={{ 
            addUserInformation, 
            userInformation, 
            isLoadingAuth, 
            isAuthenticated, 
            logOut 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext deve ser usado dentro de um AuthProvider");
    }
    return context;
};