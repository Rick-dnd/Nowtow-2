import * as z from 'zod';

// Step 1: Basic Information
export const step1Schema = z.object({
  title: z.string().min(5, 'Service title must be at least 5 characters').max(100),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000),
});

// Step 2: Location & Service Area
export const step2Schema = z.object({
  location: z.string().min(1, 'Location is required'),
  city: z.string().min(1, 'City is required'),
  service_area: z.string().optional(),
});

// Step 3: Pricing
export const step3Schema = z.object({
  price_from: z.coerce.number().min(0, 'Price must be 0 or greater'),
  price_unit: z.string().min(1, 'Please select a price unit'),
});

// Step 4: Images
export const step4Schema = z.object({
  images: z.array(z.union([z.instanceof(File), z.string()])).optional(),
});

// Step 5: Review
export const step5Schema = z.object({});

// Combined schema for final submission
export const serviceFormSchema = z.object({
  title: z.string().min(5, 'Service title must be at least 5 characters').max(100),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000),
  location: z.string().min(1, 'Location is required'),
  city: z.string().min(1, 'City is required'),
  service_area: z.string().optional(),
  price_from: z.coerce.number().min(0, 'Price must be 0 or greater'),
  price_unit: z.string().min(1, 'Please select a price unit'),
  images: z.array(z.union([z.instanceof(File), z.string()])).optional(),
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;

// Export step schemas as array for MultiStepFormProvider
export const serviceStepSchemas = [
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
];
