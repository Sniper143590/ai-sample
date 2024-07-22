import AdminFullLayout from "@/components/Layout/AdminFullLayout"
import withAuth from "@/hooks/withAuth"
import Main from "./Main"

const Dashboard = () => {
    return (
        <AdminFullLayout>
            <Main />
        </AdminFullLayout>
    )
}

export default withAuth(Dashboard)