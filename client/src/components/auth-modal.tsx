import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, User as UserIcon, Mail, Lock } from "lucide-react";
import { GoogleLogin } from '@react-oauth/google';
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, loginUserSchema, type User } from "@shared/schema";
import { z } from "zod";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

const signupFormSchema = insertUserSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupFormSchema>;
type LoginFormData = z.infer<typeof loginUserSchema>;

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    },
  });

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignupFormData) => {
      const { confirmPassword, ...signupData } = data;
      const response = await apiRequest("POST", "/api/auth/signup", signupData);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Account Created!",
        description: "Welcome to CareerGuide! You can now save your favorite careers.",
      });
      onSuccess(data.user);
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Signup Failed",
        description: error.message || "Please try again with different credentials.",
        variant: "destructive",
      });
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await apiRequest("POST", "/api/auth/login", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Welcome Back!",
        description: "Successfully logged in to your account.",
      });
      onSuccess(data.user);
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    },
  });

  const handleSignup = (data: SignupFormData) => {
    signupMutation.mutate(data);
  };

  const handleLogin = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await apiRequest("POST", "/api/auth/google", {
        credential: credentialResponse.credential,
      });
      const data = await response.json();
      toast({
        title: "Welcome!",
        description: "Successfully signed in with Google.",
      });
      onSuccess(data.user);
      onClose();
    } catch (error: any) {
      toast({
        title: "Google Sign-In Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleError = () => {
    toast({
      title: "Google Sign-In Error",
      description: "Failed to sign in with Google. Please try again.",
      variant: "destructive",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glassmorphism border-border/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {isLogin ? "Welcome Back" : "Join CareerGuide"}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glassmorphism border-border/20">
                <CardContent className="p-6">
                  {/* Google Sign-In */}
                  <div className="mb-6">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      theme="outline"
                      size="large"
                      width="100%"
                      text="signin_with"
                    />
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-border"></div>
                    <span className="text-sm text-muted-foreground">or continue with email</span>
                    <div className="flex-1 h-px bg-border"></div>
                  </div>

                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-username" className="text-sm font-medium">
                        Username
                      </Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-username"
                          type="text"
                          placeholder="Enter your username"
                          className="pl-10 glassmorphism border-border/20"
                          {...loginForm.register("username")}
                          data-testid="login-username"
                        />
                      </div>
                      {loginForm.formState.errors.username && (
                        <p className="text-sm text-destructive">{loginForm.formState.errors.username.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-sm font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 glassmorphism border-border/20"
                          {...loginForm.register("password")}
                          data-testid="login-password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-2 p-1"
                          onClick={() => setShowPassword(!showPassword)}
                          data-testid="toggle-password"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:scale-105 transition-all"
                      disabled={loginMutation.isPending}
                      data-testid="login-submit"
                    >
                      {loginMutation.isPending ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <Button
                        variant="link"
                        className="p-0 text-primary hover:underline"
                        onClick={() => setIsLogin(false)}
                        data-testid="switch-to-signup"
                      >
                        Sign up here
                      </Button>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glassmorphism border-border/20">
                <CardContent className="p-6">
                  {/* Google Sign-Up */}
                  <div className="mb-6">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      theme="outline"
                      size="large"
                      width="100%"
                      text="signup_with"
                    />
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-border"></div>
                    <span className="text-sm text-muted-foreground">or sign up with email</span>
                    <div className="flex-1 h-px bg-border"></div>
                  </div>

                  <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-fullname" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-fullname"
                          type="text"
                          placeholder="Enter your full name"
                          className="pl-10 glassmorphism border-border/20"
                          {...signupForm.register("fullName")}
                          data-testid="signup-fullname"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-username" className="text-sm font-medium">
                        Username
                      </Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-username"
                          type="text"
                          placeholder="Choose a username"
                          className="pl-10 glassmorphism border-border/20"
                          {...signupForm.register("username")}
                          data-testid="signup-username"
                        />
                      </div>
                      {signupForm.formState.errors.username && (
                        <p className="text-sm text-destructive">{signupForm.formState.errors.username.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-sm font-medium">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 glassmorphism border-border/20"
                          {...signupForm.register("email")}
                          data-testid="signup-email"
                        />
                      </div>
                      {signupForm.formState.errors.email && (
                        <p className="text-sm text-destructive">{signupForm.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-sm font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="pl-10 pr-10 glassmorphism border-border/20"
                          {...signupForm.register("password")}
                          data-testid="signup-password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-2 p-1"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {signupForm.formState.errors.password && (
                        <p className="text-sm text-destructive">{signupForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password" className="text-sm font-medium">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-confirm-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="pl-10 glassmorphism border-border/20"
                          {...signupForm.register("confirmPassword")}
                          data-testid="signup-confirm-password"
                        />
                      </div>
                      {signupForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-destructive">{signupForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:scale-105 transition-all"
                      disabled={signupMutation.isPending}
                      data-testid="signup-submit"
                    >
                      {signupMutation.isPending ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Button
                        variant="link"
                        className="p-0 text-primary hover:underline"
                        onClick={() => setIsLogin(true)}
                        data-testid="switch-to-login"
                      >
                        Sign in here
                      </Button>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}