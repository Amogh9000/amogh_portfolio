const navItems = [
    { name: "ABOUT", id: "about" },
    { name: "EXPERIENCE", id: "experience" },
    { name: "CERTIFICATIONS", id: "certifications" },
    { name: "SKILLS", id: "skills" },
    { name: "PROJECTS", id: "projects" },
    { name: "CONTACT", id: "contact" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
        >
            <div className="pointer-events-auto bg-[#D1D1D1]/90 backdrop-blur-md border border-black p-1 shadow-[4px_4px_0px_#000000] flex items-center">
                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-0">
                    {navItems.map((item) => (
                        <li key={item.name} className="relative group">
                            <button
                                onClick={() => scrollToSection(item.id)}
                                className="block px-4 py-2 font-mono text-sm font-bold text-black border-l border-transparent hover:bg-black hover:text-[#D1D1D1] transition-colors uppercase"
                            >
                                {item.name}
                            </button>
                            {/* Connector line effect for brutalist feel */}
                            {!item.isButton && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-4 bg-black/20 group-last:hidden pointer-events-none"></div>}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.nav>
    );
};

export default Navbar;
