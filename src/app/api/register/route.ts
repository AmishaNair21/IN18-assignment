import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; 
import * as z from 'zod';

//zod schema
const RegistrationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
  dob: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  photo: z.string().nullable().optional(),
});

//post method
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


