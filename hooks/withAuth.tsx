import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { verifyToken } from '@/lib/firebase/tokenHandler';

function withAuth(Component:any) {
    return function ProtectedComponent(props:any) {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            const checkAuth = async () => {
                const res = await verifyToken();
                if(res) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                    router.push("/")
                    
                }
                // const userData =localStorage.getItem('userData');
                // if (userData!=="") {
                //     setIsAuthenticatred(true);
                //     setLoading(false); // Set loading to false after checking
                // } else {
                    
                //         setIsAuthenticated(false);
                //         setLoading(false); // Set loading to false if no refresh token
                //     // }
                // }
            };

            checkAuth();
        }, [router]);

        // Show a loading state while authentication is being checked
       
        return isAuthenticated ? <Component {...props} /> : null;
    };
}

export default withAuth;
