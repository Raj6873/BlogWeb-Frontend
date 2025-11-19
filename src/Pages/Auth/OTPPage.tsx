// import { useState, useRef, useEffect } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router";
// import { FiArrowLeft, FiShield, FiEdit, FiClock, FiMail } from "react-icons/fi";
// import { motion } from "framer-motion";

// import toast from "react-hot-toast";
// import { authService } from "../../Services/AuthService";
// import { ButtonLoader } from "../../Components/ButtonLoader";
// import { routePath } from "../../Routes/routes";

// // Alerts
// const ErrorAlert = ({ message }: { message: string }) => (
//     <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-3"
//     >
//         <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//         <div>
//             <strong className="font-semibold">Verification Failed</strong>
//             <p className="text-sm mt-1">{message}</p>
//         </div>
//     </motion.div>
// );

// export default function OTPVerification() {
//     const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
//     const [loader, setLoader] = useState(false);
//     const [error, setError] = useState("");

//     const [timer, setTimer] = useState(120); // 2 minutes
//     const [email, setEmail] = useState("");

//     const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//     const navigate = useNavigate();
//     const location = useLocation();

//     // === Validate state email ===
//     useEffect(() => {
//         if (!location.state?.email) {
//             navigate(routePath.login, { replace: true });
//             return;
//         }
//         setEmail(location.state.email);
//     }, []);

//     // === Timer start ===
//     useEffect(() => {
//         if (timer <= 0) return;

//         const interval = setInterval(() => setTimer((t) => t - 1), 1000);
//         return () => clearInterval(interval);
//     }, [timer]);

//     // Format timer
//     const formatTimer = () => {
//         const m = Math.floor(timer / 60);
//         const s = timer % 60;
//         return `${m}:${s < 10 ? "0" : ""}${s}`;
//     };

//     // === OTP Input Handlers ===
//     const handleOtpChange = (index: number, value: string) => {
//         if (!/^\d*$/.test(value)) return;

//         const newOtp = [...otp];
//         newOtp[index] = value;
//         setOtp(newOtp);
//         setError("");

//         if (value && index < 5) {
//             inputRefs.current[index + 1]?.focus();
//         }

//         // Auto submit when all digits are filled
//         if (value && index === 5) {
//             const otpString = newOtp.join("");
//             if (otpString.length === 6) {
//                 handleSubmit(newOtp.join(""));
//             }
//         }
//     };

//     const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === "Backspace" && !otp[index] && index > 0) {
//             inputRefs.current[index - 1]?.focus();
//         }
//     };

//     const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
//         e.preventDefault();
//         const data = e.clipboardData.getData("text").slice(0, 6);

//         if (!/^\d+$/.test(data)) return;

//         const digits = data.split("");
//         const newOtp = [...otp];

//         digits.forEach((d, idx) => {
//             if (idx < 6) newOtp[idx] = d;
//         });

//         setOtp(newOtp);

//         const nextIndex = digits.length < 6 ? digits.length : 5;
//         inputRefs.current[nextIndex]?.focus();

//         // Auto submit if all digits are pasted
//         if (digits.length === 6) {
//             handleSubmit(digits.join(""));
//         }
//     };

//     // === Submit OTP ===
//     const handleSubmit = async (otpValue?: string) => {
//         const otpString = otpValue || otp.join("");

//         if (otpString.length !== 6) {
//             setError("Please enter the complete 6-digit OTP");
//             return;
//         }

//         setLoader(true);

//         try {
//             const data = await authService.verifyOtp({ email, otp: otpString });

//             if (!data.error) {
//                 toast.success("OTP verified successfully!");
//                 navigate(routePath.changePassword, {
//                     replace: true,
//                     state: { email },
//                 });
//             } else {
//                 setError(data.message);
//             }
//         } catch (err) {
//             setError("Something went wrong. Please try again.");
//         }

//         setLoader(false);
//     };

//     // === Resend OTP ===
//     const handleResend = async () => {
//         try {
//             setLoader(true);
//             setError("");

//             const res = await authService.forgotPassword({ email });

//             if (!res.error) {
//                 toast.success("New OTP sent to your email!");
//                 setTimer(120);
//                 setOtp(Array(6).fill(""));
//                 inputRefs.current[0]?.focus();
//             } else {
//                 setError(res.message);
//             }
//         } catch {
//             toast.error("Failed to resend OTP. Please try again.");
//         }

//         setLoader(false);
//     };

//     return (
//         <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//             {/* Left Section */}
//             <motion.div
//                 className="w-full md:w-1/2 relative flex flex-col justify-center items-center text-white p-8 md:p-12 lg:p-16 overflow-hidden"
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8, ease: "easeOut" }}
//                 style={{
//                     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                 }}
//             >
//                 {/* Animated Background Elements */}
//                 <div className="absolute inset-0 overflow-hidden">
//                     <motion.div
//                         className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
//                         animate={{
//                             scale: [1, 1.2, 1],
//                             opacity: [0.3, 0.5, 0.3],
//                         }}
//                         transition={{
//                             duration: 6,
//                             repeat: Infinity,
//                             ease: "easeInOut"
//                         }}
//                     />
//                     <motion.div
//                         className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
//                         animate={{
//                             scale: [1.2, 1, 1.2],
//                             opacity: [0.2, 0.4, 0.2],
//                         }}
//                         transition={{
//                             duration: 8,
//                             repeat: Infinity,
//                             ease: "easeInOut"
//                         }}
//                     />
//                 </div>

//                 {/* Content */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 1, delay: 0.3 }}
//                     className="relative z-10 text-center max-w-lg"
//                 >
//                     {/* Security Icon */}
//                     <motion.div
//                         className="flex justify-center mb-8"
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.6, delay: 0.5 }}
//                     >
//                         <div className="p-6 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30">
//                             <FiShield className="w-12 h-12 text-white" />
//                         </div>
//                     </motion.div>

//                     {/* Hero Text */}
//                     <motion.h1
//                         className="text-4xl lg:text-5xl font-bold mb-6 leading-tight drop-shadow-lg"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, delay: 0.7 }}
//                     >
//                         Verify Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-cyan-200">Identity</span>
//                     </motion.h1>

//                     <motion.p
//                         className="text-blue-100 text-lg lg:text-xl mb-8 leading-relaxed font-light"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, delay: 0.9 }}
//                     >
//                         We've sent a 6-digit verification code to your email address. Enter it below to secure your account.
//                     </motion.p>

//                     {/* Security Features */}
//                     <motion.div
//                         className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
//                         initial={{ opacity: 0, y: 30 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, delay: 1.1 }}
//                     >
//                         {[
//                             { icon: FiClock, text: "Valid for 2 minutes", color: "from-amber-400 to-amber-600" },
//                             { icon: FiShield, text: "Secure verification", color: "from-cyan-400 to-cyan-600" },
//                         ].map((feature, index) => (
//                             <motion.div
//                                 key={feature.text}
//                                 className="p-3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
//                                 whileHover={{ y: -3 }}
//                                 initial={{ opacity: 0, scale: 0.8 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
//                             >
//                                 <div className={`p-2 bg-gradient-to-br ${feature.color} rounded-lg shadow-lg inline-block mb-2 group-hover:scale-110 transition-transform duration-300`}>
//                                     <feature.icon className="w-4 h-4 text-white" />
//                                 </div>
//                                 <p className="text-white font-semibold text-xs">{feature.text}</p>
//                             </motion.div>
//                         ))}
//                     </motion.div>
//                 </motion.div>
//             </motion.div>

//             {/* Right Section - OTP Form */}
//             <motion.div
//                 className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 sm:px-10 md:px-16 lg:px-20 py-12"
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8, ease: "easeOut" }}
//             >
//                 <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
                    
//                     {/* Subtle Background Gradient */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50" />
                    
//                     <div className="relative z-10">
//                         {/* Logo */}
//                         <motion.div
//                             className="flex items-center gap-3 mb-8 justify-center"
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.6, delay: 0.3 }}
//                         >
//                             <motion.div
//                                 className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg"
//                                 whileHover={{ scale: 1.05, rotate: 5 }}
//                                 transition={{ type: "spring", stiffness: 300 }}
//                             >
//                                 <FiEdit className="w-7 h-7 text-white" />
//                             </motion.div>
//                             <h2 className="text-3xl font-black bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                                 Blog
//                             </h2>
//                         </motion.div>

//                         {/* Header Icon */}
//                         <motion.div
//                             className="flex justify-center mb-6"
//                             initial={{ opacity: 0, scale: 0.8 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ duration: 0.6, delay: 0.5 }}
//                         >
//                             <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100">
//                                 <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
//                                     <FiMail className="w-8 h-8 text-white" />
//                                 </div>
//                             </div>
//                         </motion.div>

//                         {/* Title */}
//                         <motion.div
//                             className="text-center mb-8"
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.6, delay: 0.7 }}
//                         >
//                             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                                 Enter Verification Code
//                             </h2>
//                             <p className="text-gray-600 text-sm">
//                                 We sent a 6-digit code to <span className="font-semibold text-blue-600">{email}</span>
//                             </p>
//                         </motion.div>

//                         {/* Error Alert */}
//                         {error && (
//                             <ErrorAlert message={error} />
//                         )}

//                         {/* OTP Input */}
//                         <motion.div
//                             className="space-y-6"
//                             initial={{ opacity: 0, y: 30 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.6, delay: 0.9 }}
//                         >
//                             <div className="flex justify-center gap-3 mb-2">
//                                 {otp.map((digit, i) => (
//                                     <motion.input
//                                         key={i}
//                                         ref={(el) => (inputRefs.current[i] = el)}
//                                         type="text"
//                                         maxLength={1}
//                                         inputMode="numeric"
//                                         value={digit}
//                                         onChange={(e) => handleOtpChange(i, e.target.value)}
//                                         onKeyDown={(e) => handleKeyDown(i, e)}
//                                         onPaste={i === 0 ? handlePaste : undefined}
//                                         className="w-14 h-14 text-center text-xl font-bold rounded-xl 
//                                             border-2 border-gray-300 bg-white focus:border-blue-500 
//                                             focus:ring-2 focus:ring-blue-200 outline-none shadow-sm
//                                             transition-all duration-300 hover:border-gray-400"
//                                         whileFocus={{ scale: 1.05 }}
//                                         whileHover={{ scale: 1.02 }}
//                                     />
//                                 ))}
//                             </div>

//                             {/* Timer */}
//                             <div className="text-center">
//                                 <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
//                                     <FiClock className="w-4 h-4" />
//                                     <span className="text-sm font-medium">Code expires in: </span>
//                                     <span className={`font-bold ${timer < 30 ? 'text-red-500' : 'text-blue-600'}`}>
//                                         {formatTimer()}
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* Verify Button */}
//                             <motion.button
//                                 onClick={() => handleSubmit()}
//                                 disabled={loader}
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.98 }}
//                                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 
//                                     rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 
//                                     transition-all duration-300 shadow-lg shadow-blue-500/25 
//                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
//                                     disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {loader ? (
//                                     <ButtonLoader message="Verifying..." />
//                                 ) : (
//                                     "Verify & Continue"
//                                 )}
//                             </motion.button>

//                             {/* Resend OTP */}
//                             <motion.div
//                                 className="text-center"
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ duration: 0.6, delay: 1.1 }}
//                             >
//                                 {timer === 0 ? (
//                                     <button
//                                         onClick={handleResend}
//                                         disabled={loader}
//                                         className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors duration-300 disabled:opacity-50"
//                                     >
//                                         Resend OTP
//                                     </button>
//                                 ) : (
//                                     <p className="text-gray-500 text-sm">
//                                         Didn't receive code? <span className="text-gray-400">Resend in {formatTimer()}</span>
//                                     </p>
//                                 )}
//                             </motion.div>

//                             {/* Back to Login */}
//                             <motion.div
//                                 className="text-center pt-4 border-t border-gray-200/60"
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ duration: 0.6, delay: 1.3 }}
//                             >
//                                 <NavLink
//                                     to={routePath.login}
//                                     className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300 group"
//                                 >
//                                     <FiArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
//                                     Back to Login
//                                 </NavLink>
//                             </motion.div>
//                         </motion.div>
//                     </div>
//                 </div>
//             </motion.div>
//         </div>
//     );
// }



import { NavLink } from "react-router";
import { FiArrowLeft, FiShield, FiFeather, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";

export default function OTPVerification() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div 
                    className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute bottom-1/4 -right-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

            {/* Main Container */}
            <motion.div 
                className="w-full max-w-6xl relative z-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Section - Brand & Info */}
                    <motion.div 
                        className="text-center lg:text-left space-y-12"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 1 }}
                    >
                        {/* Logo */}
                        <motion.div 
                            className="flex items-center justify-center lg:justify-start gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                        >
                            <motion.div 
                                className="relative"
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="p-4 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-3xl shadow-2xl shadow-blue-500/25">
                                    <FiFeather className="w-10 h-10 text-white" />
                                </div>
                                <motion.div 
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-lg"
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                >
                                    <FiShield className="w-3 h-3 text-white" />
                                </motion.div>
                            </motion.div>
                            <div>
                                <h1 className="text-6xl font-black bg-gradient-to-r from-slate-800 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
                                    Blog
                                </h1>
                                <p className="text-lg text-slate-600 font-medium mt-2 tracking-wider">SECURE VERIFICATION</p>
                            </div>
                        </motion.div>

                        {/* Security Illustration */}
                        <motion.div 
                            className="flex justify-center lg:justify-start"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <div className="relative">
                                <div className="w-80 h-80 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-3xl flex items-center justify-center shadow-2xl border border-slate-200/50">
                                    <div className="relative">
                                        <div className="w-40 h-40 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-slate-200">
                                            <div className="text-center">
                                                <div className="flex gap-2 mb-4 justify-center">
                                                    {[1, 2, 3, 4, 5, 6].map((num) => (
                                                        <motion.div
                                                            key={num}
                                                            className="w-4 h-8 bg-blue-500 rounded-md"
                                                            animate={{ 
                                                                scale: [1, 1.2, 1],
                                                                opacity: [0.7, 1, 0.7]
                                                            }}
                                                            transition={{
                                                                duration: 2,
                                                                delay: num * 0.1,
                                                                repeat: Infinity
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                                <FiShield className="w-12 h-12 text-emerald-500 mx-auto" />
                                            </div>
                                        </div>
                                        <motion.div 
                                            className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <FiMail className="w-6 h-6 text-white" />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                        >
                            <h2 className="text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6">
                                Verify Your <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Identity</span>
                            </h2>
                            <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl">
                                We've sent a 6-digit verification code to your email address. Enter it below to secure your account access.
                            </p>
                            
                            {/* Security Features */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-slate-700">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span className="text-lg font-medium">6-digit secure code</span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-700">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                    <span className="text-lg font-medium">Valid for 15 minutes</span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-700">
                                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                                    <span className="text-lg font-medium">One-time use only</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Section - OTP Form */}
                    <motion.div 
                        className="w-full"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                    >
                        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-slate-200/50 relative overflow-hidden">
                            
                            {/* Subtle Border Gradient */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-emerald-500/5 to-cyan-500/5" />
                            
                            <div className="relative z-10">
                                {/* Header */}
                                <div className="text-center mb-12">
                                    <motion.div 
                                        className="flex justify-center mb-6"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <div className="p-5 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-3xl shadow-lg border border-slate-200/50">
                                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                                                <FiShield className="w-10 h-10 text-white" />
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.h3 
                                        className="text-4xl font-bold text-slate-800 mb-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        Enter Verification Code
                                    </motion.h3>
                                    <motion.p 
                                        className="text-slate-600 text-lg"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        Enter the 6-digit code sent to your email
                                    </motion.p>
                                </div>

                                {/* OTP Input Boxes */}
                                <motion.div 
                                    className="flex justify-center gap-4 mb-10"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                >
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <motion.input
                                            key={i}
                                            type="text"
                                            maxLength={1}
                                            className="w-16 h-16 text-center text-2xl font-bold rounded-2xl border-2 border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none shadow-lg transition-all duration-300"
                                            whileFocus={{ 
                                                scale: 1.1,
                                                borderColor: "#3B82F6",
                                                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)"
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                        />
                                    ))}
                                </motion.div>

                                {/* Verify Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-5 
                                    rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/25 
                                    hover:shadow-3xl hover:shadow-blue-500/30
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                    transition-all duration-300 border border-transparent hover:border-blue-600 mb-8"
                                >
                                    Verify & Continue
                                </motion.button>

                                {/* Back to Login */}
                                <motion.div 
                                    className="text-center pt-6 border-t border-slate-200/60"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.1 }}
                                >
                                    <NavLink
                                        to="/signIn"
                                        className="inline-flex items-center text-lg text-slate-600 hover:text-blue-600 font-semibold transition-all duration-300 group"
                                    >
                                        <FiArrowLeft className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:-translate-x-1" />
                                        Back to Login
                                    </NavLink>
                                </motion.div>

                                {/* Security Note */}
                                <motion.div 
                                    className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl border border-blue-200/50"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                >
                                    <div className="flex items-start gap-4">
                                        <FiShield className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-slate-700 font-semibold mb-2">
                                                Security Notice
                                            </p>
                                            <p className="text-sm text-slate-600">
                                                This code expires in 15 minutes. Do not share it with anyone.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Footer */}
                        <motion.div 
                            className="text-center mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4 }}
                        >
                            <p className="text-slate-500 text-sm">
                                © 2024 Blog. <span className="text-slate-700 font-semibold">Your security is our priority.</span>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}