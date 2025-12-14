// src/app/api/todos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('todoapp');
    const todos = await db.collection('todos').find({}).toArray();
    
    return NextResponse.json(todos);
  } catch (error) {
    console.error('GET /api/todos error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    
    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('todoapp');
    
    const result = await db.collection('todos').insertOne({
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    });

    return NextResponse.json({ 
      _id: result.insertedId,
      text,
      completed: false 
    });
  } catch (error) {
    console.error('POST /api/todos error:', error);
    return NextResponse.json(
      { error: 'Failed to create todo', details: String(error) },
      { status: 500 }
    );
  }
}