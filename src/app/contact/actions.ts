"use server";

import { contactFormSchema, type ContactFormValues } from '@/lib/schemas';

interface FormState {
  message: string;
  type: 'success' | 'error' | null;
  errors?: Partial<Record<keyof ContactFormValues, string>>;
}

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
  };

  const validatedFields = contactFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
    validatedFields.error.errors.forEach(err => {
      if (err.path[0]) {
        fieldErrors[err.path[0] as keyof ContactFormValues] = err.message;
      }
    });
    return {
      message: "Please correct the errors in the form.",
      type: 'error',
      errors: fieldErrors,
    };
  }

  // Simulate sending an email or saving to database
  try {
    console.log("Form data submitted:", validatedFields.data);
    // await sendEmail(validatedFields.data); // Placeholder for actual email sending logic

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      message: "Thank you for your message! I'll get back to you as soon as possible.",
      type: 'success',
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      message: "An unexpected error occurred. Please try again later.",
      type: 'error',
    };
  }
}
