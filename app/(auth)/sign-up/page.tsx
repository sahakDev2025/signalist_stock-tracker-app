'use client'
import { CountrySelectField } from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { Button } from "@/components/ui/button";
import {  INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import {  useForm } from "react-hook-form";


const SignUp = () => {  

    const {
    register,
    handleSubmit,
    control,
    formState: { errors ,isSubmitting},
  } = useForm<SignUpFormData>({
   defaultValues: {
    fullName: "",
    email: "",
    password: "",
    country: "AF",
    investmentGoals: "Growth",
    riskTolerance: "Medium",
    preferredIndustry: "Technology",
   },
   mode:"onBlur"
  });

   const  onSubmit=async(data:SignUpFormData)=>{
   
    try{
        console.log("Form Data:", data);

    } catch(e){
        console.error("Sign up failed:", e);
    }
   }


  return (
   <>
   <h1 className="form-title">Sign Up & Personalize</h1>

   <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

    {/* INPUT */}
    <InputField 
         name="fullName"
         label="Full Name"
         placeholder="Sahak"
         register={register}
         error={errors.fullName}
         validation={{ required: "Full name is required",minLength:2 }}
    /> 
    <InputField 
         name="Email"
         label="Email"
         placeholder="email@example.com"
         register={register}
         error={errors.email}
         validation={{ required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } }}
    />
     <InputField 
         name="Password"
         label="Password"
         placeholder="Enter a strong password"
         type="password"
         register={register}
         error={errors.password}
         validation={{ required: "Password is required", minLength: 8 }}
    /> 
    {/* Select Country */}
    <CountrySelectField

    name="country"
    label="Country"
    control={control as any}
    error={errors.country}  
    required

    
    />

        {/* SELECT  */}
        <SelectField
            name="InvestmentGoals"
            label="Investment Goals"
            placeholder="Select your investment goals"
            options={INVESTMENT_GOALS}
            control={control}
            error={errors.investmentGoals}
            required

        /> 
          <SelectField
            name="riskTolerance"
            label="Risk Tolerance"
            placeholder="Select your  risk level"
            options={RISK_TOLERANCE_OPTIONS}
            control={control}
            error={errors.riskTolerance}
            required

        />  
         <SelectField
            name="preferredIndustry"
            label="Preferred Industry"
            placeholder="Select your preferred industry "
            options={PREFERRED_INDUSTRIES}
            control={control}
            error={errors.preferredIndustry}
            required

        />  


    <Button type="submit" onSubmit={handleSubmit(onSubmit)} disabled={isSubmitting} className="yellow-btn w-full mt-5">
        {
            isSubmitting ? "Creating account..." : "Start Your Investing Journey"
        }
        
    </Button>
        <FooterLink text="Already have an account?" linkText="Sign In or Login" href="/sign-in" />
   </form>
   </>
  )
}

export default SignUp