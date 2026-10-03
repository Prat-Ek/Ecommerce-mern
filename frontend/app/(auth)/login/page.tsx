
import LoginForm from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Store } from "lucide-react";


export default function LoginPage() {
  return (
     <div className="flex min-h-screen flex-col lg:flex-row">
      {/* ── Hero / Branding panel ── */}
      <div className="relative hidden lg:flex lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1470&q=80"
          alt="Fashion collection"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-2 text-xl font-bold">
            <Store className="h-6 w-6" />
            ShopHub
          </div>
          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-tight">
              Discover your next favorite thing
            </h1>
            <p className="mt-4 text-white/80">
              Shop thousands of products across fashion, electronics, home and
              more — delivered right to your door.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/90">
              <li className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-red-500" />
                Free shipping on orders over $50
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-red-500" />
                30-day easy returns
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-red-500" />
                Secure checkout with eSewa & cards
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Form panel ── */}
       <LoginForm/>
     
    </div>
  )
}
