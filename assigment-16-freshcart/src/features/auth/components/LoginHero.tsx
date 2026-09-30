import Image from "next/image";
import { IconClock, IconShieldHalfFilled, IconTruck } from "@tabler/icons-react";
import heroImage from "@/assets/images/home-slider-1.png";

export default function LoginHero() {
  return (
    <div className="hidden lg:block">
      <div className="text-center space-y-6">
        <Image
          className="w-full h-96 object-cover rounded-2xl"
          src={heroImage}
          alt="Fresh vegetables and fruits shopping cart illustration"
          priority
        />
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of happy customers who trust FreshCart for their
            daily grocery needs
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <IconTruck className="text-primary-600 mr-2" stroke={2} />
              Free Delivery
            </div>
            <div className="flex items-center">
              <IconShieldHalfFilled className="text-primary-600 mr-2" />
              Secure Payment
            </div>
            <div className="flex items-center">
              <IconClock stroke={2} className="text-primary-600 mr-2" />
              24/7 Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
