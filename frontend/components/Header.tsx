const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e7e2d6] bg-[#f8f7f2]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Scholars Welfare</h1>
          <p className="text-sm text-[#5c6a5f]">Transparent Islamic Giving</p>
        </div>

        <nav className="hidden gap-8 text-sm md:flex">
          <a href="#impact" className="transition hover:text-[#2e5b3f]">
            Impact
          </a>
          <a href="#donations" className="transition hover:text-[#2e5b3f]">
            Live Donations
          </a>
          <a href="#scholar" className="transition hover:text-[#2e5b3f]">
            Scholar
          </a>
        </nav>

        <a
          href="#donate"
          className="rounded-full bg-[#2e5b3f] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:scale-[1.02]"
        >
          Donate Now
        </a>
      </div>
    </header>
  );
};

export default Header;
