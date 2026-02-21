import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; action: string } }
) {
  try {
    const body = await request.json();
    const { id, action } = params;

    const response = await fetch(`${API_URL}/admin/bookings/${id}/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing booking action:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process booking action' },
      { status: 500 }
    );
  }
}
