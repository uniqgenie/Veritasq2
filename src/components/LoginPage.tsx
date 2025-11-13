import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FileCheck, Brain, ClipboardCheck, Shield } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-gray-900">VERITASQ</h1>
            <p className="text-gray-600">Automate Your ISO 9001 Checks</p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="h-12"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              Start Compliance Check
            </Button>

            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <button type="button" className="text-blue-600 hover:text-blue-700">
                Sign up free
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Right side - Background with icons */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-blue-50 to-blue-100 items-center justify-center p-8">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBjb21wbGlhbmNlfGVufDF8fHx8MTc2MDM4ODkxOHww&ixlib=rb-4.1.0&q=80&w=1080)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        <div className="relative z-10 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-gray-900">Compliance Made Simple</h2>
            <p className="text-gray-700 max-w-md mx-auto">
              AI-powered document analysis for ISO 9001 compliance. Save time, reduce errors, and stay audit-ready.
            </p>
          </div>

          {/* Floating icons */}
          <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <FileCheck className="w-10 h-10 text-blue-600 mb-3 mx-auto" />
              <p className="text-gray-700">Document Checking</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <Brain className="w-10 h-10 text-blue-600 mb-3 mx-auto" />
              <p className="text-gray-700">AI Analysis</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <ClipboardCheck className="w-10 h-10 text-blue-600 mb-3 mx-auto" />
              <p className="text-gray-700">Compliance Tracking</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <Shield className="w-10 h-10 text-blue-600 mb-3 mx-auto" />
              <p className="text-gray-700">Audit Ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
