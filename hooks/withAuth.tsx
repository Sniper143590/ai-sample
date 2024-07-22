import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingPage from '@/app/loading';
import { verifyToken } from '@/lib/firebase/tokenHandler';

function withAuth(Component:any) {
    return function ProtectedComponent(props:any) {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true); // New state to track loading

        useEffect(() => {
            const checkAuth = async () => {
                const res = await verifyToken();
                if(res) {
                    setIsAuthenticated(true)
                    setLoading(false)
                } else {
                    setIsAuthenticated(false)
                    setLoading(false)
                    router.push("/")
                    
                }
                // const userData =localStorage.getItem('userData');
                // if (userData!=="") {
                //     setIsAuthenticated(true);
                //     setLoading(false); // Set loading to false after checking
                // } else {
                    
                //         setIsAuthenticated(false);
                //         setLoading(false); // Set loading to false if no refresh token
                //     // }
                // }
            };

            checkAuth();
        }, []);

        // Show a loading state while authentication is being checked
        if (loading) {
            return <LoadingPage />;
        }

        return isAuthenticated ? <Component {...props} /> : null;
    };
}

export default withAuth;
