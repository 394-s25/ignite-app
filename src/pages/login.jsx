import { handleGoogleLogin } from "../db/firebaseAuth";

const onSuccessRoute = async () => {
    const user = await handleGoogleLogin()
    if (user) {
        // Redirect to the appropriate page based on user type
        window.location.href = "/studentswipe";
    }
}

const LoginPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Welcome to Ignite -- Northwestern Garage Job Matching Website</h1>
            <button
            onClick={onSuccessRoute}
            className="bg-purple-600 text-white px-4 py-2 rounded"
            >
            Sign in with Google
            </button>
        </div>
    )
}

export default LoginPage;