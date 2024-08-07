"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Toaster, resolveValue } from "react-hot-toast";
import AuthProvider from "@/providers/AuthProvider";
import ChatModuleProvider from "@/providers/ChatModuleProvider";
import theme from "./theme";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <AuthProvider>
                    <ChatModuleProvider>
                        <ChakraProvider>{children}</ChakraProvider>
                    </ChatModuleProvider>
                </AuthProvider>
                <Toaster
                    containerStyle={{
                        bottom: 40,
                        left: 20,
                        right: 20,
                    }}
                    position="top-center"
                    gutter={10}
                    toastOptions={{
                        duration: 2000,
                    }}
                >
                    {(t) => (
                        <div
                            style={{
                                opacity: t.visible ? 1 : 0,
                                transform: t.visible
                                    ? "translatey(0)"
                                    : "translatey(0.75rem)",
                                transition: "all .2s",
                            }}
                        >
                            {resolveValue(t.message, t)}
                        </div>
                    )}
                </Toaster>
            
        </>
    );
}
