import { NextResponse } from "next/server";
import { createClient } from 'contentful';

export async function GET(request) {
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    });
    
    const contClient = client;
    const resp = await contClient.getEntries({ content_type: 'recipe' });
    return NextResponse.json(resp.items);
    
}