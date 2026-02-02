import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { signupStep2Schema, type SignupStep2Data } from "@/lib/validations";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { toast } from "sonner";

const years = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "5", label: "5th Year" },
];

const SignupStep2 = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupStep2Data>({
    resolver: zodResolver(signupStep2Schema),
    mode: "onChange",
    defaultValues: {
      agreeTerms: false,
    },
  });

  const selectedYear = watch("year");
  const agreeTerms = watch("agreeTerms");

  useEffect(() => {
    // Check if step 1 was completed
    const step1Data = sessionStorage.getItem("signupStep1");
    if (!step1Data) {
      navigate("/signup");
    }
  }, [navigate]);

  const onSubmit = async (data: SignupStep2Data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Clear session storage
    sessionStorage.removeItem("signupStep1");
    
    toast.success("Account created successfully! Welcome to UniEasy.");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      {/* Left side - Decorative */}
      <div className="hidden lg:flex flex-1 hero-gradient items-center justify-center p-12">
        <div className="text-center text-primary-foreground animate-fade-up">
          <h2 className="text-4xl font-bold mb-4">Almost There!</h2>
          <p className="text-lg opacity-90 max-w-md">
            Just a few more details and you'll be ready to explore everything your campus area has to offer.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <div className="w-3 h-3 rounded-full bg-primary-foreground/40" />
            <div className="w-3 h-3 rounded-full bg-white" />
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8 animate-fade-up">
            <Logo />
          </div>

          <button
            onClick={() => navigate("/signup")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 animate-fade-up"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="animate-fade-up stagger-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Complete your profile
            </h1>
            <p className="text-muted-foreground mb-8">
              Step 2 of 2 - University Details
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="animate-fade-up stagger-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                University/College Name
              </label>
              <Input
                {...register("university")}
                placeholder="e.g., Stanford University"
                variant="accent"
              />
              {errors.university && (
                <p className="mt-1 text-sm text-destructive">{errors.university.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 animate-fade-up stagger-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Course/Program
                </label>
                <Input
                  {...register("course")}
                  placeholder="e.g., Computer Science"
                  variant="accent"
                />
                {errors.course && (
                  <p className="mt-1 text-sm text-destructive">{errors.course.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Year
                </label>
                <div className="flex flex-wrap gap-2">
                  {years.map((year) => (
                    <button
                      key={year.value}
                      type="button"
                      onClick={() => setValue("year", year.value as "1" | "2" | "3" | "4" | "5", { shouldValidate: true })}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedYear === year.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {year.label}
                    </button>
                  ))}
                </div>
                {errors.year && (
                  <p className="mt-1 text-sm text-destructive">{errors.year.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 animate-fade-up stagger-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <Input
                  {...register("phone")}
                  placeholder="10-digit number"
                  variant="accent"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  City
                </label>
                <Input
                  {...register("city")}
                  placeholder="Your city"
                  variant="accent"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-destructive">{errors.city.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3 animate-fade-up stagger-5">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setValue("agreeTerms", checked as boolean, { shouldValidate: true })}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="text-sm text-destructive">{errors.agreeTerms.message}</p>
            )}

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full mt-8 animate-fade-up"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <Check className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupStep2;
