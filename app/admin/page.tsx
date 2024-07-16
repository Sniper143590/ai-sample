'use client'

import AuthProvider from "@/providers/AuthProvider";
import Dashboard from "@/components/Pages/Dashboradpage";

const Chats = () => {
    return (
        <AuthProvider>
            <Dashboard />
        </AuthProvider>
    )
}

export default Chats