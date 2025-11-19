import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { FiEdit, FiMail, FiShield, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";

import toast from "react-hot-toast";
import { authService } from "../../Services/AuthService";
import { ButtonLoader } from "../../Components/ButtonLoader";
import { ErrorAlert } from "../../Components/ErrorAlert";
import { routePath } from "../../Routes/routes";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [loader, setLoader] = useState(false);
    const [loginFailed, setLoginFailed] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Empty email
        if (!email) {
            setLoginFailed("Email is required.");
            return;
        }

        // Invalid email format check
        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setLoginFailed("Please enter a valid email address.");
            return;
        }

        try {
            setLoader(true);
            setLoginFailed("");

            const data = await authService.forgotPassword({ email });

            if (!data.error) {
                toast.success(data.message);

                navigate(routePath.otpVerify, {
                    replace: true,
                    state: { email },
                });
            } else {
                setLoginFailed(data.message);
            }

            setLoader(false);
        } catch (err) {
            console.log("Forgot Password Error:", err);
            toast.error("Something went wrong. Please try again.");
            setLoader(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Left Section */}
            <motion.div
                className="w-full md:w-1/2 relative flex flex-col justify-center items-center text-white p-8 md:p-12 lg:p-16 overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
            >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="relative z-10 text-center max-w-lg"
                >
                    {/* Security Icon */}
                    <motion.div
                        className="flex justify-center mb-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <div className="p-6 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30">
                            <FiShield className="w-12 h-12 text-white" />
                        </div>
                    </motion.div>

                    {/* Hero Text */}
                    <motion.h1
                        className="text-4xl lg:text-5xl font-bold mb-6 leading-tight drop-shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        Reset Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-cyan-200">Password</span>
                    </motion.h1>

                    <motion.p
                        className="text-blue-100 text-lg lg:text-xl mb-8 leading-relaxed font-light"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        Don't worry! Just enter your email address and we'll send you a secure one-time password to reset your account.
                    </motion.p>

                    {/* Features */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                    >
                        {[
                            { icon: FiMail, text: "Secure OTP", color: "from-amber-400 to-amber-600" },
                            { icon: FiShield, text: "Protected", color: "from-cyan-400 to-cyan-600" },
                            { icon: FiClock, text: "2 Min Valid", color: "from-purple-400 to-purple-600" }
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.text}
                                className="p-3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                                whileHover={{ y: -3 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                            >
                                <div className={`p-2 bg-gradient-to-br ${feature.color} rounded-lg shadow-lg inline-block mb-2 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-4 h-4 text-white" />
                                </div>
                                <p className="text-white font-semibold text-xs">{feature.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Right Section - Auth Form */}
            <motion.div
                className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 sm:px-10 md:px-16 lg:px-20 py-12"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
                    
                    {/* Subtle Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50" />
                    
                    <div className="relative z-10">
                        {/* Logo */}
                        <motion.div
                            className="flex items-center gap-3 mb-8 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <motion.div
                                className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg"
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <FiEdit className="w-7 h-7 text-white" />
                            </motion.div>
                            <h2 className="text-3xl font-black bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Blog
                            </h2>
                        </motion.div>

                        {/* Header Icon */}
                        <motion.div
                            className="flex justify-center mb-6"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <FiMail className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.div
                            className="text-center mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Forgot Password?
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Enter your email and we'll send you a secure reset OTP
                            </p>
                        </motion.div>

                        {/* Error Alert */}
                        {loginFailed && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <ErrorAlert message={loginFailed} />
                            </motion.div>
                        )}

                        {/* Form */}
                        <motion.form 
                            onSubmit={handleSubmit} 
                            className="space-y-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                        >
                            {/* Email Input */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Email Address
                                </label>

                                <div className="relative group">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300">
                                        <FaEnvelope className="text-lg" />
                                    </span>

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="akoliyaraj62@gmail.com"
                                        className="w-full pl-11 pr-4 py-4 border border-gray-300 rounded-xl text-gray-800 
                                            bg-white/80 backdrop-blur-sm
                                            focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none 
                                            transition-all duration-300 hover:border-gray-400 shadow-sm
                                            placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loader}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 
                                    rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 
                                    transition-all duration-300 shadow-lg shadow-blue-500/25 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                    disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loader ? (
                                    <ButtonLoader message="Sending OTP..." />
                                ) : (
                                    "Send Reset OTP"
                                )}
                            </motion.button>

                            {/* Back to Login */}
                            <motion.div
                                className="text-center pt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 1.1 }}
                            >
                                <NavLink
                                    to={routePath.login}
                                    className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300 group"
                                >
                                    <FaArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                                    Back to Login
                                </NavLink>
                            </motion.div>
                        </motion.form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}