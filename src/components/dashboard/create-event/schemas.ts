import * as z from 'zod';

// Step 1: Basic Information
export const step1Schema = z.object({
  name: z.string().min(5, 'Event name must be at least 5 characters').max(100),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000),
});

// Step 2: Location
export const step2Schema = z.object({
  venue_name: z.string().min(1, 'Venue name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  district: z.string().optional(),
});

// Step 3: Date & Time
export const step3Schema = z.object({
  start_datetime: z.date({ required_error: 'Start date and time is required' }),
  end_datetime: z.date({ required_error: 'End date and time is required' }),
}).refine((data) => data.end_datetime > data.start_datetime, {
  message: 'End time must be after start time',
  path: ['end_datetime'],
});

// Step 4: Pricing & Details
export const step4Schema = z.object({
  ticket_price: z.coerce.number().min(0, 'Price must be 0 or greater'),
  max_attendees: z.coerce.number().min(1, 'Must allow at least 1 attendee').max(10000),
  min_age: z.coerce.number().min(0).max(99).optional(),
  early_bird_enabled: z.boolean().optional().default(false),
  early_bird_price: z.coerce.number().min(0).optional(),
  early_bird_quota: z.coerce.number().min(1).optional(),
  dress_code: z.string().optional(),
  cancellation_policy: z.string().optional(),
});

// Step 4b: Amenities & Highlights
export const step4bSchema = z.object({
  highlights: z.array(z.string()).optional(),
  includes: z.array(z.string()).optional(),
});

// Step 5: Images
export const step5Schema = z.object({
  images: z.array(z.union([z.instanceof(File), z.string()])).optional(),
});

// Step 6: Review (no additional fields, just validation)
export const step6Schema = z.object({});

// Combined schema for final submission
export const eventFormSchema = z.object({
  name: z.string().min(5, 'Event name must be at least 5 characters').max(100),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000),
  venue_name: z.string().min(1, 'Venue name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  district: z.string().optional(),
  start_datetime: z.date({ required_error: 'Start date and time is required' }),
  end_datetime: z.date({ required_error: 'End date and time is required' }),
  ticket_price: z.coerce.number().min(0, 'Price must be 0 or greater'),
  max_attendees: z.coerce.number().min(1, 'Must allow at least 1 attendee').max(10000),
  min_age: z.coerce.number().min(0).max(99).optional(),
  early_bird_enabled: z.boolean().optional().default(false),
  early_bird_price: z.coerce.number().min(0).optional(),
  early_bird_quota: z.coerce.number().min(1).optional(),
  dress_code: z.string().optional(),
  cancellation_policy: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  includes: z.array(z.string()).optional(),
  images: z.array(z.union([z.instanceof(File), z.string()])).optional(),
}).refine((data) => data.end_datetime > data.start_datetime, {
  message: 'End time must be after start time',
  path: ['end_datetime'],
});

export type EventFormValues = z.infer<typeof eventFormSchema>;

// Export step schemas as array for MultiStepFormProvider
export const eventStepSchemas = [
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step4bSchema,
  step5Schema,
  step6Schema,
];
