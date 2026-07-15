import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import LoginModal from '../components/LoginModal'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowRight, Coins, LayoutTemplate, Play, Rocket, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { serverUrl } from '../App'
import axios from 'axios'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

function Home() {
    const highlights = [
        {
            title: 'AI Generated Code',
            description: 'Turn ideas into polished layouts with smart components and modern styling.',
            icon: Sparkles,
        },
        {
            title: 'Fully Responsive Layouts',
            description: 'Every page adapts smoothly across mobile, tablet, and desktop.',
            icon: LayoutTemplate,
        },
        {
            title: 'Production Ready Output',
            description: 'Publish confidently with clean structure, fast loading, and scalable foundations.',
            icon: Rocket,
        },
    ]

    const steps = [
        { title: 'Describe', description: 'Share your vision, brand, and goal in a few words.' },
        { title: 'Refine', description: 'Preview the generated experience and adjust with simple prompts.' },
        { title: 'Launch', description: 'Publish your polished site instantly and keep iterating.' },
    ]

    const testimonials = [
        {
            quote: 'It felt like having a designer and engineer in one tool.',
            name: 'Maya Chen',
            role: 'Product founder',
        },
        {
            quote: 'The launch experience was incredibly fast and professional.',
            name: 'Daniel Brooks',
            role: 'SaaS marketer',
        },
    ]

    const [openLogin, setOpenLogin] = useState(false)
    const { userData } = useSelector((state) => state.user)
    const [openProfile, setOpenProfile] = useState(false)
    const [websites, setWebsites] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            dispatch(setUserData(null))
            setOpenProfile(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!userData) return

        const handleGetAllWebsites = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-all`, { withCredentials: true })
                setWebsites(result.data || [])
            } catch (error) {
                console.log(error)
            }
        }

        handleGetAllWebsites()
    }, [userData])

    return (
        <div className='relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.2),_transparent_30%),linear-gradient(135deg,_#050816_0%,_#111827_45%,_#0f172a_100%)] text-slate-50'>
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl' />
                <div className='absolute bottom-[-5%] right-[-8%] h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl' />
                <div className='absolute left-[20%] top-[30%] h-56 w-56 rounded-full bg-amber-400/10 blur-3xl' />
            </div>

            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(2,6,23,0.35)]'
            >
                <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
                    <div className='text-lg font-semibold tracking-wide'>NovaSite AI</div>
                    <div className='flex items-center gap-5'>
                        <div className='hidden cursor-pointer text-sm text-zinc-400 hover:text-white md:inline' onClick={() => navigate('/pricing')}>
                            Pricing
                        </div>
                        {userData && (
                            <div className='hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm transition hover:bg-white/10 md:flex' onClick={() => navigate('/pricing')}>
                                <Coins size={14} className='text-yellow-400' />
                                <span className='text-zinc-300'>Credits</span>
                                <span>{userData.credits}</span>
                                <span className='font-semibold'>+</span>
                            </div>
                        )}

                        {!userData ? (
                            <button className='rounded-lg border border-white/20 px-4 py-2 text-sm transition hover:bg-white/10' onClick={() => setOpenLogin(true)}>
                                Get Started
                            </button>
                        ) : (
                            <div className='relative'>
                                <button className='flex items-center' onClick={() => setOpenProfile(!openProfile)}>
                                    <img src={userData?.avatar || `https://ui-avatars.com/api/?name=${userData.name}`} alt='' referrerPolicy='no-referrer' className='h-9 w-9 rounded-full border border-white/20 object-cover' />
                                </button>
                                <AnimatePresence>
                                    {openProfile && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            className='absolute right-0 mt-3 w-60 overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0b] shadow-2xl z-50'
                                        >
                                            <div className='border-b border-white/10 px-4 py-3'>
                                                <p className='truncate text-sm font-medium'>{userData.name}</p>
                                                <p className='truncate text-xs text-zinc-500'>{userData.email}</p>
                                            </div>

                                            <button className='flex w-full items-center gap-2 border-b border-white/10 px-4 py-3 text-left text-sm hover:bg-white/5 md:hidden'>
                                                <Coins size={14} className='text-yellow-400' />
                                                <span className='text-zinc-300'>Credits</span>
                                                <span>{userData.credits}</span>
                                                <span className='font-semibold'>+</span>
                                            </button>

                                            <button className='w-full px-4 py-3 text-left text-sm hover:bg-white/5' onClick={() => navigate('/dashboard')}>Dashboard</button>
                                            <button className='w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5' onClick={handleLogOut}>Logout</button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            <main className='relative z-10'>
                <section className='px-6 pb-24 pt-44 text-center md:pt-52'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-200 shadow-[0_0_30px_rgba(192,132,252,0.12)]'
                    >
                        <Sparkles size={16} />
                        AI website builder for modern brands
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className='mx-auto max-w-5xl text-5xl font-bold tracking-tight md:text-7xl'>
                        Build stunning websites
                        <span className='block bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent'>in minutes, not weeks.</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='mx-auto mt-8 max-w-2xl text-lg text-slate-300'>
                        Describe your idea, choose your style, and publish a polished, responsive experience with AI guidance.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
                        <button className='flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 font-semibold text-white shadow-[0_15px_40px_rgba(34,211,238,0.28)] transition hover:scale-105 hover:brightness-110' onClick={() => (userData ? navigate('/dashboard') : setOpenLogin(true))}>
                            {userData ? 'Go to dashboard' : 'Get Started'}
                            <ArrowRight size={18} />
                        </button>
                        <button className='flex items-center gap-2 rounded-xl border border-white/15 bg-slate-900/70 px-6 py-3 font-semibold text-slate-100 transition hover:bg-slate-800/80' onClick={() => navigate('/pricing')}>
                            <Play size={18} />
                            See pricing
                        </button>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className='mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3'>
                        {[
                            { value: '10k+', label: 'sites launched' },
                            { value: '4.9/5', label: 'user satisfaction' },
                            { value: '24/7', label: 'AI assistance' },
                        ].map((item) => (
                            <div key={item.label} className='rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-4 shadow-[0_12px_40px_rgba(2,6,23,0.24)] backdrop-blur'>
                                <div className='text-2xl font-semibold text-white'>{item.value}</div>
                                <div className='mt-1 text-sm text-zinc-400'>{item.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </section>

                <section className='mx-auto max-w-7xl px-6 pb-24'>
                    <div className='grid gap-6 lg:grid-cols-[1.2fr_0.8fr]'>
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className='rounded-[28px] border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/15 via-slate-900 to-cyan-500/10 p-8 shadow-[0_20px_70px_rgba(192,132,252,0.16)]'>
                            <div className='mb-6 flex items-center gap-2 text-sm font-medium text-cyan-300'>
                                <Zap size={16} />
                                What you can build
                            </div>
                            <h2 className='text-3xl font-semibold'>Launch polished landing pages, portfolios, and product sites faster.</h2>
                            <p className='mt-4 max-w-2xl text-zinc-400'>Whether you are promoting a startup, showcasing work, or selling a product, NovaSite AI helps you ship a refined site with less friction.</p>
                            <div className='mt-8 grid gap-4 md:grid-cols-2'>
                                {['SaaS homepage', 'Creative portfolio', 'Event launch page', 'Online store starter'].map((item) => (
                                    <div key={item} className='rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200'>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className='rounded-[28px] border border-cyan-400/20 bg-slate-900/80 p-8 shadow-[0_20px_70px_rgba(34,211,238,0.1)]'>
                            <div className='flex items-center gap-2 text-sm font-medium text-purple-300'>
                                <ShieldCheck size={16} />
                                Built for speed and trust
                            </div>
                            <div className='mt-6 space-y-4'>
                                {[
                                    'Instant previews for every iteration',
                                    'Mobile-first layouts with strong typography',
                                    'A smooth path from concept to launch',
                                ].map((item) => (
                                    <div key={item} className='flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4'>
                                        <div className='mt-0.5 rounded-full bg-emerald-400/20 p-1 text-emerald-300'>✓</div>
                                        <span className='text-sm text-zinc-300'>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className='mx-auto max-w-7xl px-6 pb-24'>
                    <div className='mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
                        <div>
                            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500'>Why it stands out</p>
                            <h2 className='text-3xl font-semibold'>Everything you need to ship a beautiful website.</h2>
                        </div>
                    </div>
                    <div className='grid gap-6 md:grid-cols-3'>
                        {highlights.map(({ title, description, icon: Icon }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className='rounded-2xl border border-white/10 bg-slate-900/70 p-8 shadow-[0_12px_40px_rgba(2,6,23,0.24)] backdrop-blur'
                            >
                                <div className='mb-4 inline-flex rounded-xl bg-white/10 p-3 text-cyan-300'>
                                    <Icon size={20} />
                                </div>
                                <h3 className='text-xl font-semibold'>{title}</h3>
                                <p className='mt-3 text-sm leading-6 text-zinc-400'>{description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className='mx-auto max-w-7xl px-6 pb-24'>
                    <div className='rounded-[32px] border border-white/10 bg-gradient-to-r from-fuchsia-500/10 via-slate-900/60 to-cyan-500/10 p-8 shadow-[0_20px_70px_rgba(15,23,42,0.3)] md:p-10'>
                        <div className='mb-8 max-w-2xl'>
                            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500'>How it works</p>
                            <h2 className='mt-2 text-3xl font-semibold'>Create your site in three smooth steps.</h2>
                        </div>
                        <div className='grid gap-6 md:grid-cols-3'>
                            {steps.map((step, index) => (
                                <div key={step.title} className='rounded-2xl border border-cyan-400/20 bg-slate-950/70 p-6 shadow-[0_12px_40px_rgba(2,6,23,0.22)]'>
                                    <div className='mb-4 text-sm font-semibold text-purple-300'>0{index + 1}</div>
                                    <h3 className='text-xl font-semibold'>{step.title}</h3>
                                    <p className='mt-3 text-sm leading-6 text-zinc-400'>{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className='mx-auto max-w-7xl px-6 pb-24'>
                    <div className='grid gap-6 lg:grid-cols-[1fr_0.9fr]'>
                        <div className='rounded-[28px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_20px_70px_rgba(2,6,23,0.22)]'>
                            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500'>Loved by builders</p>
                            <div className='mt-6 space-y-4'>
                                {testimonials.map((item) => (
                                    <div key={item.name} className='rounded-2xl border border-white/10 bg-slate-950/60 p-5'>
                                        <p className='text-zinc-200'>“{item.quote}”</p>
                                        <div className='mt-3 text-sm text-zinc-400'>
                                            <span className='font-semibold text-white'>{item.name}</span> • {item.role}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='rounded-[28px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 p-8 shadow-[0_20px_70px_rgba(34,211,238,0.1)]'>
                            <h3 className='text-3xl font-semibold'>Ready to make your next launch unforgettable?</h3>
                            <p className='mt-4 text-zinc-400'>Create your first site in minutes and give your ideas the polished home they deserve.</p>
                            <button className='mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105' onClick={() => (userData ? navigate('/dashboard') : setOpenLogin(true))}>
                                Start for free
                            </button>
                        </div>
                    </div>
                </section>

                {!userData && (
                    <section className='mx-auto max-w-7xl px-6 pb-24'>
                        <div className='rounded-[28px] border border-white/10 bg-slate-900/70 p-8 shadow-[0_20px_70px_rgba(2,6,23,0.22)]'>
                            <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                                <div>
                                    <h3 className='text-2xl font-semibold'>Turn your idea into a real website today.</h3>
                                    <p className='mt-2 text-zinc-400'>No design hassle, no blank page, just a smooth launch path.</p>
                                </div>
                                <button className='rounded-xl border border-white/15 bg-black/20 px-5 py-3 font-semibold transition hover:bg-black/30' onClick={() => setOpenLogin(true)}>Create your website</button>
                            </div>
                        </div>
                    </section>
                )}

                {userData && websites?.length > 0 && (
                    <section className='mx-auto max-w-7xl px-6 pb-24'>
                        <div className='mb-6 flex items-center justify-between'>
                            <h3 className='text-2xl font-semibold'>Your recent websites</h3>
                            <button className='text-sm text-zinc-400 hover:text-white' onClick={() => navigate('/dashboard')}>Open dashboard</button>
                        </div>

                        <div className='grid gap-6 md:grid-cols-3'>
                            {websites.slice(0, 3).map((w) => (
                                <motion.div
                                    key={w._id}
                                    whileHover={{ y: -6 }}
                                    onClick={() => navigate(`/editor/${w._id}`)}
                                    className='cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-[0_12px_40px_rgba(2,6,23,0.24)]'
                                >
                                    <div className='h-40 bg-black'>
                                        <iframe srcDoc={w.latestCode} className='h-[140%] w-[140%] scale-[0.72] origin-top-left bg-white pointer-events-none' />
                                    </div>
                                    <div className='p-4'>
                                        <h3 className='line-clamp-2 text-base font-semibold'>{w.title}</h3>
                                        <p className='mt-1 text-xs text-zinc-400'>Last updated {new Date(w.updatedAt).toLocaleDateString()}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <footer className='border-t border-white/10 py-10 text-center text-sm text-zinc-500'>
                &copy; {new Date().getFullYear()} NovaSite AI
            </footer>

            {openLogin && <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />}
        </div>
    )
}

export default Home
