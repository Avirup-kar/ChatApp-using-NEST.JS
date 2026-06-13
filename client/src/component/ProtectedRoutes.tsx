import React, { useEffect } from "react";
import { useUserStore } from "../stores/userStore";
import { useGeneralStore } from "../stores/generalStore";

const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const userId = useUserStore((state) => state.id);
    const toggleLoginModal = useGeneralStore((state) => state.toggleLoginModal);

    
}