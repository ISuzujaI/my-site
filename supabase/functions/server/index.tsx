import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";
import { seedDatabase } from "./seed-data.ts";

const app = new Hono();

// Retry helper for database operations
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 100
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      console.warn(`Retry ${i + 1}/${maxRetries} failed:`, error);
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError || new Error('Operation failed after retries');
}

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Storage bucket name
const DOCTORS_BUCKET = 'make-de695671-doctors';
const CONTENT_BUCKET = 'make-de695671-content';

// Initialize storage bucket on startup
async function initStorage() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    
    // Create doctors bucket
    const doctorsBucketExists = buckets?.some(bucket => bucket.name === DOCTORS_BUCKET);
    if (!doctorsBucketExists) {
      const { error } = await supabase.storage.createBucket(DOCTORS_BUCKET, {
        public: false,
      });
      
      if (error) {
        // Ignore "already exists" error (409)
        if (error.statusCode !== '409') {
          console.error('Error creating doctors bucket:', error);
        } else {
          console.log(`Storage bucket ${DOCTORS_BUCKET} already exists`);
        }
      } else {
        console.log(`Created storage bucket: ${DOCTORS_BUCKET}`);
      }
    } else {
      console.log(`Storage bucket ${DOCTORS_BUCKET} already exists`);
    }
    
    // Create content bucket
    const contentBucketExists = buckets?.some(bucket => bucket.name === CONTENT_BUCKET);
    if (!contentBucketExists) {
      const { error } = await supabase.storage.createBucket(CONTENT_BUCKET, {
        public: false,
      });
      
      if (error) {
        // Ignore "already exists" error (409)
        if (error.statusCode !== '409') {
          console.error('Error creating content bucket:', error);
        } else {
          console.log(`Storage bucket ${CONTENT_BUCKET} already exists`);
        }
      } else {
        console.log(`Created storage bucket: ${CONTENT_BUCKET}`);
      }
    } else {
      console.log(`Storage bucket ${CONTENT_BUCKET} already exists`);
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
}

// Initialize storage
initStorage();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-de695671/health", (c) => {
  return c.json({ status: "ok" });
});

// Seed database endpoint (run once to initialize)
app.post("/make-server-de695671/seed", async (c) => {
  try {
    const result = await seedDatabase(kv);
    return c.json(result);
  } catch (error) {
    console.error('Error seeding database:', error);
    return c.json({ success: false, error: 'Failed to seed database' }, 500);
  }
});

// === DOCTORS ENDPOINTS ===

// Get all doctors
app.get("/make-server-de695671/doctors", async (c) => {
  try {
    const doctors = await kv.getByPrefix("doctor:");
    return c.json({ success: true, data: doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return c.json({ success: false, error: 'Failed to fetch doctors' }, 500);
  }
});

// Get doctor by ID
app.get("/make-server-de695671/doctors/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const doctor = await kv.get(`doctor:${id}`);
    
    if (!doctor) {
      return c.json({ success: false, error: 'Doctor not found' }, 404);
    }
    
    return c.json({ success: true, data: doctor });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return c.json({ success: false, error: 'Failed to fetch doctor' }, 500);
  }
});

// Create/Update doctor (admin only)
app.post("/make-server-de695671/doctors", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    // For now, skip auth check in demo mode
    // In production, uncomment this:
    // const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    // if (!user) {
    //   return c.json({ success: false, error: 'Unauthorized' }, 401);
    // }

    const body = await c.req.json();
    const doctorId = body.id || `doctor:${Date.now()}`;
    
    const doctorData = {
      ...body,
      id: doctorId,
    };
    
    await kv.set(doctorId, doctorData);
    
    return c.json({ success: true, data: doctorData });
  } catch (error) {
    console.error('Error saving doctor:', error);
    return c.json({ success: false, error: 'Failed to save doctor' }, 500);
  }
});

// Update doctor (admin only)
app.put("/make-server-de695671/doctors/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    // For now, skip auth check in demo mode
    // In production, uncomment this:
    // const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    // if (!user) {
    //   return c.json({ success: false, error: 'Unauthorized' }, 401);
    // }

    const id = c.req.param('id');
    const body = await c.req.json();
    const doctorId = id.startsWith('doctor:') ? id : `doctor:${id}`;
    
    const updatedDoctor = { ...body, id: doctorId };
    await kv.set(doctorId, updatedDoctor);
    
    return c.json({ success: true, data: updatedDoctor });
  } catch (error) {
    console.error('Error updating doctor:', error);
    return c.json({ success: false, error: 'Failed to update doctor' }, 500);
  }
});

// Delete doctor (admin only)
app.delete("/make-server-de695671/doctors/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    // For now, skip auth check in demo mode
    // In production, uncomment this:
    // const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    // if (!user) {
    //   return c.json({ success: false, error: 'Unauthorized' }, 401);
    // }

    const id = c.req.param('id');
    const doctorId = id.startsWith('doctor:') ? id : `doctor:${id}`;
    
    await kv.del(doctorId);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    return c.json({ success: false, error: 'Failed to delete doctor' }, 500);
  }
});

// Upload doctor image
app.post("/make-server-de695671/doctors/upload-image", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    // For now, skip auth check in demo mode
    // In production, uncomment this:
    // const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    // if (!user) {
    //   return c.json({ success: false, error: 'Unauthorized' }, 401);
    // }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ success: false, error: 'No file provided' }, 400);
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return c.json({ 
        success: false, 
        error: 'Invalid file type. Only JPEG, PNG and WebP are allowed' 
      }, 400);
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return c.json({ 
        success: false, 
        error: 'File too large. Maximum size is 5MB' 
      }, 400);
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `doctors/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(DOCTORS_BUCKET)
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return c.json({ success: false, error: 'Failed to upload image' }, 500);
    }

    // Get signed URL (valid for 1 year)
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from(DOCTORS_BUCKET)
      .createSignedUrl(filePath, 365 * 24 * 60 * 60); // 1 year in seconds

    if (urlError || !signedUrlData) {
      console.error('Signed URL error:', urlError);
      return c.json({ success: false, error: 'Failed to generate image URL' }, 500);
    }

    return c.json({ 
      success: true, 
      data: { 
        url: signedUrlData.signedUrl,
        path: filePath 
      } 
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return c.json({ success: false, error: 'Failed to upload image' }, 500);
  }
});

// === SERVICES ENDPOINTS ===

// Get all services
app.get("/make-server-de695671/services", async (c) => {
  try {
    const services = await kv.getByPrefix("service:");
    return c.json({ success: true, data: services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return c.json({ success: false, error: 'Failed to fetch services' }, 500);
  }
});

// Create new service
app.post("/make-server-de695671/services", async (c) => {
  try {
    const serviceData = await c.req.json();
    const serviceId = `service:${Date.now()}-${Math.random().toString(36).substring(7)}`;
    
    const service = {
      ...serviceData,
      id: serviceId,
    };

    await kv.set(serviceId, service);
    return c.json({ success: true, data: service });
  } catch (error) {
    console.error('Error creating service:', error);
    return c.json({ success: false, error: 'Failed to create service' }, 500);
  }
});

// Update service
app.put("/make-server-de695671/services/:id", async (c) => {
  try {
    const serviceId = c.req.param('id');
    const serviceData = await c.req.json();
    
    const service = {
      ...serviceData,
      id: serviceId,
    };

    await kv.set(serviceId, service);
    return c.json({ success: true, data: service });
  } catch (error) {
    console.error('Error updating service:', error);
    return c.json({ success: false, error: 'Failed to update service' }, 500);
  }
});

// Delete service
app.delete("/make-server-de695671/services/:id", async (c) => {
  try {
    const serviceId = c.req.param('id');
    await kv.del(serviceId);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting service:', error);
    return c.json({ success: false, error: 'Failed to delete service' }, 500);
  }
});

// Upload service image
app.post("/make-server-de695671/services/upload-image", async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body['file'] as File;

    if (!file) {
      return c.json({ success: false, error: 'No file provided' }, 400);
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return c.json({ 
        success: false, 
        error: 'Invalid file type. Only JPEG, PNG and WebP are allowed' 
      }, 400);
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return c.json({ 
        success: false, 
        error: 'File too large. Maximum size is 5MB' 
      }, 400);
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `services/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(DOCTORS_BUCKET)
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return c.json({ success: false, error: 'Failed to upload image' }, 500);
    }

    // Get signed URL (valid for 1 year)
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from(DOCTORS_BUCKET)
      .createSignedUrl(filePath, 365 * 24 * 60 * 60); // 1 year in seconds

    if (urlError || !signedUrlData) {
      console.error('Signed URL error:', urlError);
      return c.json({ success: false, error: 'Failed to generate image URL' }, 500);
    }

    return c.json({ 
      success: true, 
      data: { 
        url: signedUrlData.signedUrl,
        path: filePath 
      } 
    });
  } catch (error) {
    console.error('Error uploading service image:', error);
    return c.json({ success: false, error: 'Failed to upload image' }, 500);
  }
});

// === APPOINTMENTS ENDPOINTS ===

// Get all appointments (admin only)
app.get("/make-server-de695671/appointments/all", async (c) => {
  try {
    // Skip auth check in demo mode
    const appointments = await kv.getByPrefix("appointment:");
    return c.json({ success: true, data: appointments });
  } catch (error) {
    console.error('Error fetching all appointments:', error);
    return c.json({ success: false, error: 'Failed to fetch appointments' }, 500);
  }
});

// Get appointments for user
app.get("/make-server-de695671/appointments", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const appointments = await kv.getByPrefix(`appointment:user:${user.id}`);
    return c.json({ success: true, data: appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return c.json({ success: false, error: 'Failed to fetch appointments' }, 500);
  }
});

// Create appointment
app.post("/make-server-de695671/appointments", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const appointmentId = `appointment:user:${user.id}:${Date.now()}`;
    
    const appointment = {
      ...body,
      id: appointmentId,
      userId: user.id,
      userEmail: user.email,
      userName: user.user_metadata?.name || user.email,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(appointmentId, appointment);
    
    // Also create a doctor-indexed entry for easy lookup
    const doctorAppointmentKey = `appointment:doctor:${body.doctorId}:${body.date}:${body.time}`;
    await kv.set(doctorAppointmentKey, appointment);
    
    return c.json({ success: true, data: appointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return c.json({ success: false, error: 'Failed to create appointment' }, 500);
  }
});

// Cancel appointment
app.delete("/make-server-de695671/appointments/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const appointmentId = c.req.param('id');
    
    // Get appointment to delete doctor-indexed entry
    const appointment = await kv.get(appointmentId);
    if (appointment) {
      const doctorAppointmentKey = `appointment:doctor:${appointment.doctorId}:${appointment.date}:${appointment.time}`;
      await kv.del(doctorAppointmentKey);
    }
    
    await kv.del(appointmentId);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error canceling appointment:', error);
    return c.json({ success: false, error: 'Failed to cancel appointment' }, 500);
  }
});

// Admin cancel appointment
app.delete("/make-server-de695671/admin/appointments/:id", async (c) => {
  try {
    // Skip auth check in demo mode
    const appointmentId = c.req.param('id');
    
    // Get appointment to delete doctor-indexed entry
    const appointment = await kv.get(appointmentId);
    if (appointment) {
      const doctorAppointmentKey = `appointment:doctor:${appointment.doctorId}:${appointment.date}:${appointment.time}`;
      await kv.del(doctorAppointmentKey);
    }
    
    await kv.del(appointmentId);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error canceling appointment:', error);
    return c.json({ success: false, error: 'Failed to cancel appointment' }, 500);
  }
});

// Get available time slots
app.get("/make-server-de695671/available-slots", async (c) => {
  try {
    const doctorId = c.req.query('doctorId');
    const date = c.req.query('date');
    
    if (!doctorId || !date) {
      return c.json({ success: false, error: 'Missing doctorId or date' }, 400);
    }

    // Get doctor schedule
    const doctor = await kv.get(doctorId);
    if (!doctor) {
      return c.json({ success: false, error: 'Doctor not found' }, 404);
    }

    // Get default working hours or use 9-18
    const workingHours = doctor.workingHours || {
      start: '09:00',
      end: '18:00',
      slotDuration: 30, // minutes
      daysOff: [] // e.g., [0, 6] for Sunday and Saturday
    };

    // Parse working hours
    const [startHour, startMinute] = workingHours.start.split(':').map(Number);
    const [endHour, endMinute] = workingHours.end.split(':').map(Number);
    
    const slots = [];
    
    // Generate time slots based on working hours
    for (let hour = startHour; hour < endHour; hour++) {
      const intervals = workingHours.slotDuration === 30 ? [0, 30] : [0];
      for (const minute of intervals) {
        // Skip if we've reached end time
        if (hour === endHour && minute >= endMinute) break;
        if (hour === startHour && minute < startMinute) continue;
        
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Check if slot is already booked
        const appointmentKey = `appointment:doctor:${doctorId}:${date}:${time}`;
        const existingAppointment = await kv.get(appointmentKey);
        
        slots.push({ 
          time, 
          available: !existingAppointment 
        });
      }
    }
    
    return c.json({ success: true, data: slots });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    return c.json({ success: false, error: 'Failed to fetch available slots' }, 500);
  }
});

// === DOCTOR SCHEDULE ENDPOINTS ===

// Update doctor working hours
app.put("/make-server-de695671/doctors/:id/schedule", async (c) => {
  try {
    // Skip auth check in demo mode
    const id = c.req.param('id');
    const doctorId = id.startsWith('doctor:') ? id : `doctor:${id}`;
    
    const doctor = await kv.get(doctorId);
    if (!doctor) {
      return c.json({ success: false, error: 'Doctor not found' }, 404);
    }
    
    const { workingHours } = await c.req.json();
    
    const updatedDoctor = {
      ...doctor,
      workingHours
    };
    
    await kv.set(doctorId, updatedDoctor);
    
    return c.json({ success: true, data: updatedDoctor });
  } catch (error) {
    console.error('Error updating doctor schedule:', error);
    return c.json({ success: false, error: 'Failed to update schedule' }, 500);
  }
});

// === CONTENT MANAGEMENT ENDPOINTS ===

// Get content by page and key
app.get("/make-server-de695671/content/:page/:key", async (c) => {
  try {
    const page = c.req.param('page');
    const key = c.req.param('key');
    const contentKey = `content:${page}:${key}`;
    
    const content = await retryOperation(() => kv.get(contentKey));
    
    if (!content) {
      return c.json({ success: false, error: 'Content not found' }, 404);
    }
    
    return c.json({ success: true, data: content });
  } catch (error) {
    console.error('Error fetching content:', error);
    return c.json({ success: false, error: 'Failed to fetch content' }, 500);
  }
});

// Get all content for a page
app.get("/make-server-de695671/content/:page", async (c) => {
  try {
    const page = c.req.param('page');
    const contentPrefix = `content:${page}:`;
    
    const content = await retryOperation(() => kv.getByPrefix(contentPrefix));
    
    return c.json({ success: true, data: content });
  } catch (error) {
    console.error('Error fetching page content:', error);
    return c.json({ success: false, error: 'Failed to fetch page content' }, 500);
  }
});

// Update content (admin only)
app.put("/make-server-de695671/content/:page/:key", async (c) => {
  try {
    // Skip auth check in demo mode - in production, add admin check here
    const page = c.req.param('page');
    const key = c.req.param('key');
    const contentKey = `content:${page}:${key}`;
    
    const { value, type } = await c.req.json();
    
    const contentData = {
      page,
      key,
      value,
      type, // 'text' or 'image'
      updatedAt: new Date().toISOString(),
    };
    
    await retryOperation(() => kv.set(contentKey, contentData));
    
    return c.json({ success: true, data: contentData });
  } catch (error) {
    console.error('Error updating content:', error);
    return c.json({ success: false, error: 'Failed to update content' }, 500);
  }
});

// Upload content image (admin only)
app.post("/make-server-de695671/content/upload-image", async (c) => {
  try {
    // Skip auth check in demo mode - in production, add admin check here
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const page = formData.get('page') as string;
    const key = formData.get('key') as string;
    
    if (!file) {
      return c.json({ success: false, error: 'No file provided' }, 400);
    }

    if (!page || !key) {
      return c.json({ success: false, error: 'Missing page or key parameter' }, 400);
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      return c.json({ 
        success: false, 
        error: 'Invalid file type. Only JPEG, PNG, WebP and SVG are allowed' 
      }, 400);
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return c.json({ 
        success: false, 
        error: 'File too large. Maximum size is 10MB' 
      }, 400);
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${page}-${key}-${Date.now()}.${fileExt}`;
    const filePath = `content/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(CONTENT_BUCKET)
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true, // Allow overwriting
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return c.json({ success: false, error: 'Failed to upload image' }, 500);
    }

    // Get signed URL (valid for 10 years)
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from(CONTENT_BUCKET)
      .createSignedUrl(filePath, 10 * 365 * 24 * 60 * 60); // 10 years

    if (urlError || !signedUrlData) {
      console.error('Signed URL error:', urlError);
      return c.json({ success: false, error: 'Failed to generate image URL' }, 500);
    }

    // Save content metadata to KV store
    const contentKey = `content:${page}:${key}`;
    const contentData = {
      page,
      key,
      value: signedUrlData.signedUrl,
      type: 'image',
      path: filePath,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(contentKey, contentData);

    return c.json({ 
      success: true, 
      data: contentData
    });
  } catch (error) {
    console.error('Error uploading content image:', error);
    return c.json({ success: false, error: 'Failed to upload image' }, 500);
  }
});

Deno.serve(app.fetch);