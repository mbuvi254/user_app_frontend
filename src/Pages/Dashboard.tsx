import useUserStore from "../Store/userStore";

const Dashboard = () => {
    const { emailAddress, firstName } = useUserStore();
    
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                </div>
            </header>
            
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Welcome, {firstName}!
                        </h2>
                        <p className="text-gray-600">
                            You are successfully logged in as {emailAddress}.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
