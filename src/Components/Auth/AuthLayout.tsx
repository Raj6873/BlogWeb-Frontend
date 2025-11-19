import { NavLink } from "react-router";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { FiEdit, FiFeather, FiPenTool, FiUsers, FiTrendingUp, FiAward, FiHeart, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AuthLayout({ children, title }: any) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Left Section - Brand Showcase */}
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
                    <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: 10,
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
                    {/* Logo */}
                    <motion.div
                        className="flex items-center justify-center gap-3 mb-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <motion.div
                            className="p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30"
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <FiFeather className="w-8 h-8 text-white" />
                        </motion.div>
                        <div>
                            <h1 className="text-5xl font-black text-white drop-shadow-lg">Blog</h1>
                            <p className="text-blue-100 text-lg font-medium mt-2 tracking-wider">SHARE YOUR STORY</p>
                        </div>
                    </motion.div>

                    {/* Hero Text */}
                    <motion.h2
                        className="text-4xl lg:text-5xl font-bold mb-6 leading-tight drop-shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-cyan-200">Great Stories</span> Begin
                    </motion.h2>

                    <motion.p
                        className="text-blue-100 text-lg lg:text-xl mb-12 leading-relaxed font-light"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        Join thousands of writers sharing their unique perspectives. Create, connect, and grow with our vibrant community of storytellers.
                    </motion.p>

                    {/* Features */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                    >
                        {[
                            { icon: FiPenTool, text: "Write Freely", color: "from-amber-400 to-amber-600" },
                            { icon: FiUsers, text: "Build Audience", color: "from-cyan-400 to-cyan-600" },
                            { icon: FiTrendingUp, text: "Grow Together", color: "from-purple-400 to-purple-600" }
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.text}
                                className="p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                            >
                                <div className={`p-3 bg-gradient-to-br ${feature.color} rounded-lg shadow-lg inline-block mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-white font-semibold text-sm">{feature.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Trust Metrics */}
                    <motion.div
                        className="flex justify-center gap-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                    >
                        {[
                            { number: "50K+", label: "Writers" },
                            { number: "1M+", label: "Readers" },
                            { number: "100K+", label: "Stories" }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1.7 + index * 0.2, type: "spring" }}
                            >
                                <div className="text-2xl font-black text-white drop-shadow-lg">{stat.number}</div>
                                <div className="text-blue-100 text-sm font-medium mt-1">{stat.label}</div>
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

                        {/* Tabs */}
                        <motion.div
                            className="flex mb-8 bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1.5 border border-gray-200/50"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `flex-1 py-3.5 px-4 text-sm font-semibold rounded-xl text-center transition-all duration-500 relative overflow-hidden group ${
                                        isActive
                                            ? "bg-white text-blue-600 shadow-lg border border-gray-200"
                                            : "text-gray-600 hover:text-blue-600 hover:bg-white/60"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <span className="relative z-10">Login</span>
                                        {isActive && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100"
                                                layoutId="activeTabBg"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>

                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `flex-1 py-3.5 px-4 text-sm font-semibold rounded-xl text-center transition-all duration-500 relative overflow-hidden group ${
                                        isActive
                                            ? "bg-white text-indigo-600 shadow-lg border border-gray-200"
                                            : "text-gray-600 hover:text-indigo-600 hover:bg-white/60"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <span className="relative z-10">Sign Up</span>
                                        {isActive && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100"
                                                layoutId="activeTabBg"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        </motion.div>

                        {/* Page Title */}
                        <motion.div
                            className="text-center mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
                            <p className="text-gray-600 text-sm">
                                {title === "Login" 
                                    ? "Welcome back! Please sign in to your account" 
                                    : "Create your account and start your writing journey"
                                }
                            </p>
                        </motion.div>

                        {/* Page Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                        >
                            {children}
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div
                            className="mt-8 pt-6 border-t border-gray-200/60"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1.1 }}
                        >
                            <div className="flex items-center justify-center gap-6">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <FiAward className="w-4 h-4 text-blue-500" />
                                    <span className="text-xs font-medium">Secure</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <FiHeart className="w-4 h-4 text-rose-500" />
                                    <span className="text-xs font-medium">Trusted</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <FiStar className="w-4 h-4 text-amber-500" />
                                    <span className="text-xs font-medium">Quality</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Footer */}
                <motion.div
                    className="text-center mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.3 }}
                >
                    <p className="text-gray-500 text-xs">
                        © 2024 Blog. <span className="text-gray-700 font-semibold">Share your voice with the world.</span>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}