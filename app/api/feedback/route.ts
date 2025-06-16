// pages/api/feedback.ts or app/api/feedback/route.ts
import { createFeedback } from '@/lib/actions/general.actions.server';

export async function POST(request: Request) {
  try {
    const params = await request.json();
    const result = await createFeedback(params);
    return Response.json(result);
  } catch (error) {
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}