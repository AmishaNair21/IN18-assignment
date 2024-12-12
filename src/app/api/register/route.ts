import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import * as z from 'zod';
 // For generating unique file names

// zod schema
const RegistrationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
  dob: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
 
});



// POST method
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedData = RegistrationSchema.parse(body);

    
  

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('registereduser')
      .insert([{ ...parsedData }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'User registered successfully', data });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// GET method
export async function GET(req: Request) {
  try {
    // Get the search parameters directly from the request URL
    const { searchParams } = new URL(req.url);

    // Get the page number from the searchParams, default to 1 if not provided
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 4; // Limit for pagination
    const offset = (page - 1) * limit; // Calculate the offset based on the current page

    // Fetch the users with pagination from Supabase
    const { data, error, count } = await supabase
      .from('registereduser')
      .select('*', { count: 'exact' }) // Include the count in the response
      .range(offset, offset + limit - 1); // Apply pagination range

    // Handle any errors
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Calculate total pages (rounding up to ensure partial pages are counted as full pages)
    const totalPages = count ? Math.ceil(count / limit) : 0;

    
    const users = data.map(user => ({
      ...user,
     
    }));

    // Return the users and pagination info
    return NextResponse.json({
      users,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages, // Whether there is a next page
      hasPrevPage: page > 1, // Whether there is a previous page
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error in GET route:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
