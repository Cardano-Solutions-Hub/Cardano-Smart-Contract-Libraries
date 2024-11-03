import { Link } from "@nextui-org/react";

function Footer() {
  return (
    <footer className="px-4 sm:px-16 md:px-28 mt-1 py-6">
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row justify-end gap-4 sm:gap-8 md:gap-16">
        <Link href="#" className="text-sm text-customGray">
          Refund Policy
        </Link>
        <Link href="#" className="text-sm text-customGray">
          Community Guidelines
        </Link>
        <Link href="#" className="text-sm text-customGray">
          Terms & Conditions
        </Link>
        <Link href="#" className="text-sm text-customGray">
          Privacy Policy
        </Link>
      </div>
    </footer>

  );
}

export default Footer;
