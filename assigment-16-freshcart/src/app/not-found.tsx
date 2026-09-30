import Link from "next/link";
import Image from "next/image";
import notFoundImg from "@/assets/images/404.svg";
import logo from "@/assets/images/freshcart-logo.svg";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container py-6">
        <Link href="/">
          <Image src={logo} alt="FreshCart" className="h-8 w-auto" />
        </Link>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pb-16">
        <Image src={notFoundImg} alt="Page not found" priority className="w-full max-w-sm h-auto mb-8" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Oops! Page not found
        </h1>
        <p className="text-gray-500 max-w-md mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link href="/" className="btn bg-primary-600 text-white hover:bg-primary-700">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
