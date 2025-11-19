import { useNavigate } from 'react-router';
import { FiLogOut, FiUser, FiSettings, FiBell, FiSearch, FiPlus, FiTrendingUp, FiUsers, FiBook, FiStar, FiHeart, FiShare2, FiMessageCircle, FiHome, FiCompass, FiBookmark } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function HomePage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
    };

    // Mock data for demonstration
    const stats = [
        { label: 'Articles', value: '24', icon: FiBook, color: 'from-blue-500 to-cyan-500' },
        { label: 'Followers', value: '1.2K', icon: FiUsers, color: 'from-green-500 to-emerald-500' },
        { label: 'Following', value: '356', icon: FiUser, color: 'from-purple-500 to-pink-500' },
        { label: 'Likes', value: '4.8K', icon: FiHeart, color: 'from-red-500 to-rose-500' }
    ];

    const recentPosts = [
        {
            id: 1,
            title: 'The Future of Web Development in 2024',
            excerpt: 'Exploring the latest trends and technologies shaping the future of web development. From AI integration to new frameworks, discover what\'s next...',
            likes: 142,
            comments: 28,
            reads: '12.4K',
            time: '2 hours ago',
            category: 'Technology',
            author: 'John Doe',
            authorAvatar: 'JD'
        },
        {
            id: 2,
            title: 'Getting Started with React 18 Features',
            excerpt: 'A comprehensive guide to the new features and improvements in React 18. Learn about concurrent rendering, automatic batching, and new hooks...',
            likes: 289,
            comments: 45,
            reads: '24.7K',
            time: '1 day ago',
            category: 'Programming',
            author: 'Sarah Chen',
            authorAvatar: 'SC'
        },
        {
            id: 3,
            title: 'Mastering Tailwind CSS: Advanced Patterns',
            excerpt: 'Learn how to build beautiful, responsive layouts with Tailwind CSS. Advanced techniques, component patterns, and performance optimization...',
            likes: 456,
            comments: 67,
            reads: '37.2K',
            time: '3 days ago',
            category: 'Design',
            author: 'Mike Johnson',
            authorAvatar: 'MJ'
        },
        {
            id: 4,
            title: 'Building Scalable Backend Systems',
            excerpt: 'Architectural patterns and best practices for building scalable backend systems that can handle millions of requests...',
            likes: 321,
            comments: 42,
            reads: '18.9K',
            time: '5 days ago',
            category: 'Backend',
            author: 'Emma Wilson',
            authorAvatar: 'EW'
        }
    ];

    const trendingTopics = [
        { name: 'Web Development', posts: '12.4K', growth: '+12%' },
        { name: 'JavaScript', posts: '8.7K', growth: '+8%' },
        { name: 'React', posts: '6.3K', growth: '+15%' },
        { name: 'UI/UX Design', posts: '5.1K', growth: '+6%' },
        { name: 'TypeScript', posts: '4.8K', growth: '+22%' },
        { name: 'Node.js', posts: '3.9K', growth: '+9%' }
    ];

    const suggestedWriters = [
        { name: 'Sarah Chen', followers: '45K', avatar: 'SC', specialty: 'React & Frontend' },
        { name: 'Mike Johnson', followers: '32K', avatar: 'MJ', specialty: 'UI/UX Design' },
        { name: 'Emma Wilson', followers: '28K', avatar: 'EW', specialty: 'Backend Development' },
        { name: 'Alex Brown', followers: '51K', avatar: 'AB', specialty: 'DevOps & Cloud' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Header */}
            <motion.header 
                className="bg-white/90 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="w-full px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo and Navigation */}
                        <div className="flex items-center gap-8">
                            <motion.div 
                                className="flex items-center gap-3"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                                    <FiBook className="w-7 h-7 text-white" />
                                </div>
                                <h1 className="text-3xl font-black bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Blog
                                </h1>
                            </motion.div>

                            {/* Navigation Links */}
                            <nav className="hidden lg:flex items-center gap-6">
                                {[
                                    { icon: FiHome, label: 'Home', active: true },
                                    { icon: FiCompass, label: 'Discover' },
                                    { icon: FiBookmark, label: 'Bookmarks' },
                                    { icon: FiUsers, label: 'Community' }
                                ].map((item) => (
                                    <motion.button
                                        key={item.label}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all duration-300 ${
                                            item.active 
                                                ? 'bg-blue-50 text-blue-600' 
                                                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.label}</span>
                                    </motion.button>
                                ))}
                            </nav>
                        </div>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-2xl mx-8">
                            <div className="relative">
                                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search articles, topics, or authors..."
                                    className="w-full pl-12 pr-4 py-4 bg-gray-100/80 border border-gray-300/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 hover:bg-white text-lg"
                                />
                            </div>
                        </div>

                        {/* Navigation Icons */}
                        <div className="flex items-center gap-3">
                            <motion.button 
                                className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all duration-300 relative"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiBell className="w-6 h-6" />
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                    3
                                </span>
                            </motion.button>
                            
                            <motion.button 
                                className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiSettings className="w-6 h-6" />
                            </motion.button>

                            {/* User Avatar */}
                            <motion.div 
                                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-100/80 transition-all duration-300 cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <span className="text-white text-sm font-bold">JD</span>
                                </div>
                                <div className="hidden lg:block">
                                    <div className="text-gray-800 font-semibold">John Doe</div>
                                    <div className="text-gray-500 text-sm">@johndoe</div>
                                </div>
                            </motion.div>

                            {/* Logout Button */}
                            <motion.button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-5 py-3 text-red-600 hover:text-white hover:bg-red-500 rounded-2xl border border-red-200 hover:border-red-500 transition-all duration-300 font-semibold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiLogOut className="w-5 h-5" />
                                <span className="hidden lg:inline">Logout</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="w-full px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Left Sidebar */}
                    <div className="xl:col-span-3 space-y-6">
                        {/* User Profile Card */}
                        <motion.div 
                            className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200/60"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="text-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
                                    <span className="text-white text-3xl font-bold">JD</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">John Doe</h2>
                                <p className="text-gray-600 text-lg mb-1">@johndoe</p>
                                <p className="text-gray-500 text-sm mb-6">Senior Full Stack Developer & Tech Writer</p>
                                
                                <div className="flex justify-center gap-6 mb-6">
                                    <div className="text-center">
                                        <div className="font-bold text-gray-800 text-xl">24</div>
                                        <div className="text-gray-500 text-sm">Posts</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-gray-800 text-xl">1.2K</div>
                                        <div className="text-gray-500 text-sm">Followers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-gray-800 text-xl">356</div>
                                        <div className="text-gray-500 text-sm">Following</div>
                                    </div>
                                </div>

                                <motion.button
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-3"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FiPlus className="w-6 h-6" />
                                    <span className="text-lg">Create New Post</span>
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Trending Topics */}
                        <motion.div 
                            className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200/60"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center gap-3">
                                <FiTrendingUp className="w-6 h-6 text-blue-500" />
                                Trending Topics
                            </h3>
                            <div className="space-y-4">
                                {trendingTopics.map((topic, index) => (
                                    <motion.div
                                        key={topic.name}
                                        className="flex justify-between items-center p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 cursor-pointer group"
                                        whileHover={{ x: 5 }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                    >
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                {topic.name}
                                            </div>
                                            <div className="text-gray-500 text-sm">{topic.posts} posts</div>
                                        </div>
                                        <span className="text-green-600 text-sm font-semibold bg-green-50 px-3 py-1 rounded-lg">
                                            {topic.growth}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Feed */}
                    <div className="xl:col-span-6 space-y-8">
                        {/* Welcome Card */}
                        <motion.div 
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-10 text-white shadow-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h1 className="text-4xl font-bold mb-4">Welcome back, John! 👋</h1>
                            <p className="text-blue-100 text-xl mb-8">Ready to share your next great story with the world? Your audience is waiting!</p>
                            
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        className="text-center p-6 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                    >
                                        <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                            <stat.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-3xl font-bold mb-1">{stat.value}</div>
                                        <div className="text-blue-100 text-lg">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Recent Posts */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-800">Your Recent Posts</h2>
                                <button className="text-blue-600 hover:text-blue-700 font-semibold text-lg flex items-center gap-3">
                                    View All
                                    <FiTrendingUp className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {recentPosts.map((post, index) => (
                                    <motion.article
                                        key={post.id}
                                        className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200/60 hover:shadow-2xl transition-all duration-300 group"
                                        whileHover={{ y: -5 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                                                    <span className="text-white text-sm font-bold">{post.authorAvatar}</span>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-800">{post.author}</div>
                                                    <div className="text-gray-500 text-sm">{post.time}</div>
                                                </div>
                                            </div>
                                            <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                                                {post.category}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">{post.excerpt}</p>
                                        
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-6 text-gray-500">
                                                <div className="flex items-center gap-2">
                                                    <FiHeart className="w-5 h-5" />
                                                    <span className="font-medium">{post.likes}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FiMessageCircle className="w-5 h-5" />
                                                    <span className="font-medium">{post.comments}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FiUser className="w-5 h-5" />
                                                    <span className="font-medium">{post.reads}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <motion.button 
                                                    className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all duration-300"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <FiShare2 className="w-5 h-5" />
                                                </motion.button>
                                                <motion.button 
                                                    className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <FiHeart className="w-5 h-5" />
                                                </motion.button>
                                                <motion.button 
                                                    className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-colors duration-300"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Read More
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="xl:col-span-3 space-y-8">
                        {/* Quick Actions */}
                        <motion.div 
                            className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200/60"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <h3 className="font-bold text-gray-800 text-xl mb-6">Quick Actions</h3>
                            <div className="space-y-4">
                                {[
                                    { icon: FiPlus, label: 'Write Article', color: 'text-blue-600 bg-blue-50', description: 'Create a new blog post' },
                                    { icon: FiBook, label: 'My Drafts', color: 'text-green-600 bg-green-50', description: 'Continue writing' },
                                    { icon: FiUsers, label: 'Manage Followers', color: 'text-purple-600 bg-purple-50', description: 'View your audience' },
                                    { icon: FiSettings, label: 'Account Settings', color: 'text-gray-600 bg-gray-50', description: 'Customize profile' }
                                ].map((action, index) => (
                                    <motion.button
                                        key={action.label}
                                        className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 text-left group"
                                        whileHover={{ x: 5 }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                    >
                                        <div className={`p-3 rounded-xl ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                                            <action.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-800 text-lg">{action.label}</div>
                                            <div className="text-gray-500 text-sm">{action.description}</div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Suggested Writers */}
                        <motion.div 
                            className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200/60"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <h3 className="font-bold text-gray-800 text-xl mb-6">Suggested Writers</h3>
                            <div className="space-y-5">
                                {suggestedWriters.map((writer, index) => (
                                    <motion.div
                                        key={writer.name}
                                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 group"
                                        whileHover={{ x: 5 }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                    >
                                        <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                                            <span className="text-white text-lg font-bold">{writer.avatar}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-800 text-lg">{writer.name}</div>
                                            <div className="text-gray-500 text-sm mb-1">{writer.specialty}</div>
                                            <div className="text-gray-400 text-xs">{writer.followers} followers</div>
                                        </div>
                                        <motion.button 
                                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Follow
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Newsletter Subscription */}
                        <motion.div 
                            className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <h3 className="font-bold text-xl mb-3">Stay Updated</h3>
                            <p className="text-blue-100 mb-6">Get the latest articles and updates delivered to your inbox.</p>
                            <div className="space-y-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-blue-200 outline-none focus:bg-white/30 transition-all duration-300"
                                />
                                <motion.button
                                    className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Subscribe
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}