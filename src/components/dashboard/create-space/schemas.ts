import * as z from 'zod';

// Step 1: Basic Information
export const step1Schema = z.object({
  name: z.string().min(5, 'Space name must be at least 5 characters').max(100),
  space_category: z.string().min(1, 'Please select a category'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000),
});

// Step 2: Location & Size
export const step2Schema = z.object({
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  size_sqm: z.coerce.number().min(1, 'Size must be at least 1 sqm').max(10000),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1').max(1000),
});

// Step 3: Pricing & Features
export const step3Schema = z.object({
  hourly_price: z.coerce.number().min(0, 'Hourly price must be 0 or greater'),
  daily_price: z.coerce.number().min(0, 'Daily price must be 0 or greater').optional(),
  minimum_booking_hours: z.coerce.number().min(1, 'Minimum booking must be at least 1 hour').max(24),
  amenities: z.array(z.string()).optional(),
  house_rules: z.array(z.string()).optional(),
  custom_house_rules: z.string().optional(),
});

// Custom schema for SpaceImageInput
const spaceImageInputSchema = z.union([
  z.instanceof(File),
  z.string(),
  z.object({
    file: z.instanceof(File).optional(),
    url: z.string().optional(),
    category: z.string().optional(),
    is_main: z.boolean().optional(),
    order: z.number(),
  }),
]);

// Step 4: Images
export const step4Schema = z.object({
  images: z.array(spaceImageInputSchema).optional(),
});

// Step 5: Review
export const step5Schema = z.object({});

// Combined schema for final submission
export const spaceFormSchema = z.object({
  name: z.string().min(5, 'Space name must be at least 5 characters').max(100),
  space_category: z.string().min(1, 'Please select a category'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  size_sqm: z.coerce.number().min(1, 'Size must be at least 1 sqm').max(10000),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1').max(1000),
  hourly_price: z.coerce.number().min(0, 'Hourly price must be 0 or greater'),
  daily_price: z.coerce.number().min(0, 'Daily price must be 0 or greater').optional(),
  minimum_booking_hours: z.coerce.number().min(1, 'Minimum booking must be at least 1 hour').max(24),
  amenities: z.array(z.string()).optional(),
  house_rules: z.array(z.string()).optional(),
  custom_house_rules: z.string().optional(),
  images: z.array(spaceImageInputSchema).optional(),
});

export type SpaceFormValues = z.infer<typeof spaceFormSchema>;

// Export step schemas as array for MultiStepFormProvider
export const spaceStepSchemas = [
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
];
