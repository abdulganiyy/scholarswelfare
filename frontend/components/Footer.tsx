const Footer = () => {
  return (
    <footer className="border-t border-[#e6e0d5] bg-[#f8f7f2] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center text-sm text-[#6b746d] lg:flex-row lg:px-10 lg:text-left">
        <div>
          <p className="font-semibold text-[#253328]">Scholars Welfare</p>
          <p className="mt-1">
            Transparent Islamic donations & community impact.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <a href="#" className="hover:text-[#2e5b3f]">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#2e5b3f]">
            Donation Transparency
          </a>
          <a href="#" className="hover:text-[#2e5b3f]">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
